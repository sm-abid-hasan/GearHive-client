"use client";


import Swal from "sweetalert2";


export const showSuccess = (title, text = "") =>
  Swal.fire({
    icon: "success",
    title,
    text,
    timer: 1800,
    showConfirmButton: false,
    confirmButtonColor: "#0b7a64",
  });

export const showError = (title, text = "") =>
  Swal.fire({ icon: "error", title, text, confirmButtonColor: "#0b7a64" });


export async function confirmAction({
  title = "Are you sure?",
  text = "",
  confirmText = "Yes, continue",
  icon = "warning",
} = {}) {
  const result = await Swal.fire({
    icon,
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    confirmButtonColor: "#0b7a64",
    cancelButtonColor: "#6b7280",
    reverseButtons: true,
  });
  return result.isConfirmed;
}
