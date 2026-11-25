"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiUsers } from "react-icons/fi";
import RoleGuard from "@/components/auth/RoleGuard";
import { PageHeader, Panel, TableWrap } from "@/components/dashboard/DashboardUI";
import Avatar from "@/components/ui/Avatar";
import EmptyState, { ErrorState } from "@/components/ui/EmptyState";
import { SectionLoader } from "@/components/ui/Loader";
import StatusBadge from "@/components/ui/StatusBadge";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { apiFetch } from "@/lib/api";
import { confirmAction } from "@/lib/alerts";
import { formatDate } from "@/lib/format";

export default function AllUsersPage() {
  return (
    <RoleGuard allow={["admin"]}>
      <AllUsers />
    </RoleGuard>
  );
}

function AllUsers() {
  const { user: me } = useAuth();
  const { data, loading, error, refetch } = useApi("/api/admin/users", { auth: true });
  const [busyId, setBusyId] = useState(null);


  const runAction = async (userId, request, successMessage) => {
    setBusyId(userId);
    try {
      await request();
      toast.success(successMessage);
      refetch();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const handleRoleChange = async (user, role) => {
    if (role === user.role) return;
    const confirmed = await confirmAction({
      title: "Change role?",
      text: `${user.name} will become ${role}.`,
      confirmText: "Yes, change role",
    });
    if (!confirmed) return;

    runAction(user._id, () => apiFetch(`/api/admin/users/${user._id}/role`, { method: "PATCH", auth: true, body: { role } }), "Role updated");
  };

  const handleBlock = async (user) => {
    const block = !user.isBlocked;
    const confirmed = await confirmAction({
      title: block ? "Block this user?" : "Unblock this user?",
      text: block ? `${user.name} will not be able to use the platform.` : `${user.name} will get access again.`,
      confirmText: block ? "Yes, block" : "Yes, unblock",
    });
    if (!confirmed) return;

    runAction(
      user._id,
      () => apiFetch(`/api/admin/users/${user._id}/status`, { method: "PATCH", auth: true, body: { isBlocked: block } }),
      block ? "User blocked" : "User unblocked"
    );
  };

  const handleDelete = async (user) => {
    const confirmed = await confirmAction({
      title: "Delete this user?",
      text: `${user.name} (${user.email}) will be deleted permanently.`,
      confirmText: "Yes, delete",
    });
    if (!confirmed) return;

    runAction(user._id, () => apiFetch(`/api/admin/users/${user._id}`, { method: "DELETE", auth: true }), "User deleted");
  };

  return (
    <>
      <PageHeader title="All Users" subtitle="Change roles and manage every account on the platform." />

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : loading ? (
        <SectionLoader message="Loading users..." />
      ) : !data || data.length === 0 ? (
        <EmptyState icon={FiUsers} title="No users found" />
      ) : (
        <Panel>
          <TableWrap>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Registered</th>
                <th>Account</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => {
                const isMe = user.email === me?.email;
                const busy = busyId === user._id;
                return (
                  <tr key={user._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <Avatar src={user.image} name={user.name} size={40} />
                        <span className="font-semibold">{user.name}{isMe && <span className="ml-2 text-xs text-base-content/60">(you)</span>}</span>
                      </div>
                    </td>
                    <td className="break-all">{user.email}</td>
                    <td>
                      <select
                        className="select select-bordered select-sm"
                        value={user.role}
                        onChange={(event) => handleRoleChange(user, event.target.value)}
                        disabled={isMe || busy}
                        aria-label={`Role of ${user.name}`}
                      >
                        <option value="customer">Customer</option>
                        <option value="owner">Owner</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="whitespace-nowrap">{formatDate(user.createdAt)}</td>
                    <td><StatusBadge status={user.isBlocked ? "blocked" : "active"} /></td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <button type="button" className="btn btn-sm btn-warning btn-outline" onClick={() => handleBlock(user)} disabled={isMe || busy}>
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                        <button type="button" className="btn btn-sm btn-error btn-outline" onClick={() => handleDelete(user)} disabled={isMe || busy}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </TableWrap>
        </Panel>
      )}
    </>
  );
}
