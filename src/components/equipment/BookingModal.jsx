"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
import { apiFetch, buildQuery } from "@/lib/api";
import { calculateTotal, countRentalDays } from "@/lib/pricing";
import { formatCurrency, rentalUnit, todayInputValue } from "@/lib/format";


export default function BookingModal({ equipment, user, onClose }) {
  const router = useRouter();

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    quantity: 1,
    contactNumber: user?.phone || "",
    deliveryAddress: user?.address || "",
    notes: "",
  });
  const [availability, setAvailability] = useState(null); 
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const today = todayInputValue();
  const days = countRentalDays(form.startDate, form.endDate);
  const quantity = Number(form.quantity) || 0;
  const total = calculateTotal({ price: equipment.price, rentalType: equipment.rentalType, days, quantity });


  useEffect(() => {
    const onKeyDown = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);


  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);


  useEffect(() => {
    setAvailability(null);
    if (!form.startDate || !form.endDate || days <= 0) return;

    let cancelled = false;
    setChecking(true);
    apiFetch(
      `/api/equipment/${equipment._id}/availability${buildQuery({ startDate: form.startDate, endDate: form.endDate })}`,
      { auth: true }
    )
      .then((result) => !cancelled && setAvailability(result))
      .catch(() => !cancelled && setAvailability(null))
      .finally(() => !cancelled && setChecking(false));

    return () => {
      cancelled = true;
    };
  }, [form.startDate, form.endDate, days, equipment._id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => {
      const next = { ...current, [name]: value };
      if (name === "startDate" && next.endDate && next.endDate < value) next.endDate = value;
      return next;
    });
  };

  const maxQuantity = availability ? availability.remainingQuantity : equipment.availableQuantity;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.startDate || !form.endDate) return toast.error("Please choose the rental start and end dates.");
    if (form.endDate < form.startDate) return toast.error("The end date must be on or after the start date.");
    if (!Number.isInteger(quantity) || quantity < 1) return toast.error("Required quantity must be at least 1.");
    if (availability && quantity > availability.remainingQuantity) {
      return toast.error(
        availability.remainingQuantity === 0
          ? "This equipment is not available on the selected dates."
          : `Only ${availability.remainingQuantity} unit(s) are available on the selected dates.`
      );
    }
    if (!/^\+?[0-9\s-]{7,20}$/.test(form.contactNumber.trim())) return toast.error("Please enter a valid contact number.");
    if (form.deliveryAddress.trim().length < 5) return toast.error("Please enter your delivery address.");

    setSubmitting(true);
    try {

      const result = await apiFetch("/api/bookings", {
        method: "POST",
        auth: true,
        body: {
          equipmentId: equipment._id,
          startDate: form.startDate,
          endDate: form.endDate,
          quantity,
          contactNumber: form.contactNumber.trim(),
          deliveryAddress: form.deliveryAddress.trim(),
          notes: form.notes.trim(),
        },
      });

      router.push(`/payment/${result.bookingId}`);
    } catch (error) {
      toast.error(error.message);
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-base-100 p-6 shadow-2xl sm:rounded-3xl sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id="booking-title" className="text-2xl font-extrabold">
              Book this equipment
            </h2>
            <p className="mt-1 text-base-content/70">
              {equipment.name} – {formatCurrency(equipment.price)} / {rentalUnit(equipment.rentalType)}
            </p>
          </div>
          <button type="button" onClick={onClose} className="btn btn-ghost btn-circle" aria-label="Close">
            <FiX className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Rental start date</span>
              <input
                type="date"
                name="startDate"
                min={today}
                value={form.startDate}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Rental end date</span>
              <input
                type="date"
                name="endDate"
                min={form.startDate || today}
                value={form.endDate}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">
                Required quantity <span className="font-normal text-base-content/60">(max {maxQuantity})</span>
              </span>
              <input
                type="number"
                name="quantity"
                min="1"
                max={Math.max(1, maxQuantity)}
                value={form.quantity}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Contact number</span>
              <input
                type="tel"
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
                placeholder="+880 1XXX XXXXXX"
                className="input input-bordered w-full"
                autoComplete="tel"
                required
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Delivery address</span>
            <textarea
              name="deliveryAddress"
              value={form.deliveryAddress}
              onChange={handleChange}
              rows={2}
              placeholder="House, road, area, city"
              className="textarea textarea-bordered w-full"
              autoComplete="street-address"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold">
              Additional notes <span className="font-normal text-base-content/60">(optional)</span>
            </span>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={2}
              maxLength={500}
              placeholder="Anything the owner should know?"
              className="textarea textarea-bordered w-full"
            />
          </label>

    
          <div className="rounded-2xl bg-base-200 p-5" aria-live="polite">
            <div className="flex justify-between text-sm">
              <span className="text-base-content/70">Rental duration</span>
              <span className="font-semibold">{days > 0 ? `${days} day${days > 1 ? "s" : ""}` : "-"}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-base-content/70">Availability</span>
              <span className="font-semibold">
                {checking
                  ? "Checking..."
                  : availability
                    ? availability.remainingQuantity > 0
                      ? `${availability.remainingQuantity} unit(s) free`
                      : "Not available on these dates"
                    : "Choose dates to check"}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-base-300 pt-3">
              <span className="font-bold">Total rental amount</span>
              <span className="text-2xl font-extrabold text-primary">{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting || checking}>
              {submitting && <span className="loading loading-spinner loading-sm" />}
              Confirm &amp; Continue to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
