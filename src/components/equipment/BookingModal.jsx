// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { FiX } from "react-icons/fi";
// import { apiFetch, buildQuery } from "@/lib/api";
// import { calculateTotal, countRentalDays } from "@/lib/pricing";
// import { formatCurrency, rentalUnit, todayInputValue } from "@/lib/format";


// export default function BookingModal({ equipment, user, onClose }) {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     startDate: "",
//     endDate: "",
//     quantity: 1,
//     contactNumber: user?.phone || "",
//     deliveryAddress: user?.address || "",
//     notes: "",
//   });
//   const [availability, setAvailability] = useState(null); 
//   const [checking, setChecking] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const today = todayInputValue();
//   const days = countRentalDays(form.startDate, form.endDate);
//   const quantity = Number(form.quantity) || 0;
//   const total = calculateTotal({ price: equipment.price, rentalType: equipment.rentalType, days, quantity });


//   useEffect(() => {
//     const onKeyDown = (event) => event.key === "Escape" && onClose();
//     window.addEventListener("keydown", onKeyDown);
//     return () => window.removeEventListener("keydown", onKeyDown);
//   }, [onClose]);


//   useEffect(() => {
//     const previous = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = previous;
//     };
//   }, []);


//   useEffect(() => {
//     setAvailability(null);
//     if (!form.startDate || !form.endDate || days <= 0) return;

//     let cancelled = false;
//     setChecking(true);
//     apiFetch(
//       `/api/equipment/${equipment._id}/availability${buildQuery({ startDate: form.startDate, endDate: form.endDate })}`,
//       { auth: true }
//     )
//       .then((result) => !cancelled && setAvailability(result))
//       .catch(() => !cancelled && setAvailability(null))
//       .finally(() => !cancelled && setChecking(false));

//     return () => {
//       cancelled = true;
//     };
//   }, [form.startDate, form.endDate, days, equipment._id]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setForm((current) => {
//       const next = { ...current, [name]: value };
//       if (name === "startDate" && next.endDate && next.endDate < value) next.endDate = value;
//       return next;
//     });
//   };

//   const maxQuantity = availability ? availability.remainingQuantity : equipment.availableQuantity;

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!form.startDate || !form.endDate) return toast.error("Please choose the rental start and end dates.");
//     if (form.endDate < form.startDate) return toast.error("The end date must be on or after the start date.");
//     if (!Number.isInteger(quantity) || quantity < 1) return toast.error("Required quantity must be at least 1.");
//     if (availability && quantity > availability.remainingQuantity) {
//       return toast.error(
//         availability.remainingQuantity === 0
//           ? "This equipment is not available on the selected dates."
//           : `Only ${availability.remainingQuantity} unit(s) are available on the selected dates.`
//       );
//     }
//     if (!/^\+?[0-9\s-]{7,20}$/.test(form.contactNumber.trim())) return toast.error("Please enter a valid contact number.");
//     if (form.deliveryAddress.trim().length < 5) return toast.error("Please enter your delivery address.");

//     setSubmitting(true);
//     try {

//       const result = await apiFetch("/api/bookings", {
//         method: "POST",
//         auth: true,
//         body: {
//           equipmentId: equipment._id,
//           startDate: form.startDate,
//           endDate: form.endDate,
//           quantity,
//           contactNumber: form.contactNumber.trim(),
//           deliveryAddress: form.deliveryAddress.trim(),
//           notes: form.notes.trim(),
//         },
//       });

//       router.push(`/payment/${result.bookingId}`);
//     } catch (error) {
//       toast.error(error.message);
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4"
//       onMouseDown={(event) => event.target === event.currentTarget && onClose()}
//     >
//       <div
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="booking-title"
//         className="max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-base-100 p-6 shadow-2xl sm:rounded-3xl sm:p-8"
//       >
//         <div className="mb-6 flex items-start justify-between gap-4">
//           <div>
//             <h2 id="booking-title" className="text-2xl font-extrabold">
//               Book this equipment
//             </h2>
//             <p className="mt-1 text-base-content/70">
//               {equipment.name} – {formatCurrency(equipment.price)} / {rentalUnit(equipment.rentalType)}
//             </p>
//           </div>
//           <button type="button" onClick={onClose} className="btn btn-ghost btn-circle" aria-label="Close">
//             <FiX className="text-xl" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4" noValidate>
//           <div className="grid gap-4 sm:grid-cols-2">
//             <label className="block">
//               <span className="mb-1 block text-sm font-semibold">Rental start date</span>
//               <input
//                 type="date"
//                 name="startDate"
//                 min={today}
//                 value={form.startDate}
//                 onChange={handleChange}
//                 className="input input-bordered w-full"
//                 required
//               />
//             </label>
//             <label className="block">
//               <span className="mb-1 block text-sm font-semibold">Rental end date</span>
//               <input
//                 type="date"
//                 name="endDate"
//                 min={form.startDate || today}
//                 value={form.endDate}
//                 onChange={handleChange}
//                 className="input input-bordered w-full"
//                 required
//               />
//             </label>
//           </div>

//           <div className="grid gap-4 sm:grid-cols-2">
//             <label className="block">
//               <span className="mb-1 block text-sm font-semibold">
//                 Required quantity <span className="font-normal text-base-content/60">(max {maxQuantity})</span>
//               </span>
//               <input
//                 type="number"
//                 name="quantity"
//                 min="1"
//                 max={Math.max(1, maxQuantity)}
//                 value={form.quantity}
//                 onChange={handleChange}
//                 className="input input-bordered w-full"
//                 required
//               />
//             </label>
//             <label className="block">
//               <span className="mb-1 block text-sm font-semibold">Contact number</span>
//               <input
//                 type="tel"
//                 name="contactNumber"
//                 value={form.contactNumber}
//                 onChange={handleChange}
//                 placeholder="+880 1XXX XXXXXX"
//                 className="input input-bordered w-full"
//                 autoComplete="tel"
//                 required
//               />
//             </label>
//           </div>

//           <label className="block">
//             <span className="mb-1 block text-sm font-semibold">Delivery address</span>
//             <textarea
//               name="deliveryAddress"
//               value={form.deliveryAddress}
//               onChange={handleChange}
//               rows={2}
//               placeholder="House, road, area, city"
//               className="textarea textarea-bordered w-full"
//               autoComplete="street-address"
//               required
//             />
//           </label>

//           <label className="block">
//             <span className="mb-1 block text-sm font-semibold">
//               Additional notes <span className="font-normal text-base-content/60">(optional)</span>
//             </span>
//             <textarea
//               name="notes"
//               value={form.notes}
//               onChange={handleChange}
//               rows={2}
//               maxLength={500}
//               placeholder="Anything the owner should know?"
//               className="textarea textarea-bordered w-full"
//             />
//           </label>

    
//           <div className="rounded-2xl bg-base-200 p-5" aria-live="polite">
//             <div className="flex justify-between text-sm">
//               <span className="text-base-content/70">Rental duration</span>
//               <span className="font-semibold">{days > 0 ? `${days} day${days > 1 ? "s" : ""}` : "-"}</span>
//             </div>
//             <div className="mt-2 flex justify-between text-sm">
//               <span className="text-base-content/70">Availability</span>
//               <span className="font-semibold">
//                 {checking
//                   ? "Checking..."
//                   : availability
//                     ? availability.remainingQuantity > 0
//                       ? `${availability.remainingQuantity} unit(s) free`
//                       : "Not available on these dates"
//                     : "Choose dates to check"}
//               </span>
//             </div>
//             <div className="mt-3 flex items-center justify-between border-t border-base-300 pt-3">
//               <span className="font-bold">Total rental amount</span>
//               <span className="text-2xl font-extrabold text-primary">{formatCurrency(total)}</span>
//             </div>
//           </div>

//           <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
//             <button type="button" onClick={onClose} className="btn btn-ghost">
//               Cancel
//             </button>
//             <button type="submit" className="btn btn-primary" disabled={submitting || checking}>
//               {submitting && <span className="loading loading-spinner loading-sm" />}
//               Confirm &amp; Continue to Payment
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiLayers,
  FiMapPin,
  FiPhone,
  FiShield,
  FiX,
  FiXCircle,
} from "react-icons/fi";
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
  const total = calculateTotal({
    price: equipment.price,
    rentalType: equipment.rentalType,
    days,
    quantity,
  });

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
      `/api/equipment/${equipment._id}/availability${buildQuery({
        startDate: form.startDate,
        endDate: form.endDate,
      })}`,
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
      if (name === "startDate" && next.endDate && next.endDate < value) {
        next.endDate = value;
      }
      return next;
    });
  };

  const maxQuantity = availability
    ? availability.remainingQuantity
    : equipment.availableQuantity;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.startDate || !form.endDate) {
      return toast.error("Please choose the rental start and end dates.");
    }
    if (form.endDate < form.startDate) {
      return toast.error("The end date must be on or after the start date.");
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      return toast.error("Required quantity must be at least 1.");
    }
    if (availability && quantity > availability.remainingQuantity) {
      return toast.error(
        availability.remainingQuantity === 0
          ? "This equipment is not available on the selected dates."
          : `Only ${availability.remainingQuantity} unit(s) are available on the selected dates.`
      );
    }
    if (!/^\+?[0-9\s-]{7,20}$/.test(form.contactNumber.trim())) {
      return toast.error("Please enter a valid contact number.");
    }
    if (form.deliveryAddress.trim().length < 5) {
      return toast.error("Please enter your delivery address.");
    }

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

  const isAvailableOnDates = availability && availability.remainingQuantity > 0;
  const isSoldOutOnDates = availability && availability.remainingQuantity === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="relative flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-base-300/80 bg-base-100 shadow-2xl sm:rounded-3xl"
      >
        {/* Top Gradient Accent Strip */}
        <div
          aria-hidden="true"
          className="h-1.5 w-full shrink-0 bg-gradient-to-r from-primary via-primary/75 to-secondary"
        />

        {/* Pinned Header */}
        <div className="relative shrink-0 border-b border-base-300/70 bg-gradient-to-br from-base-100 via-base-100 to-base-200/60 px-6 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold tracking-wide uppercase text-primary">
                <FiShield className="h-3.5 w-3.5" aria-hidden="true" />
                Instant Reservation
              </span>

              <h2
                id="booking-title"
                className="mt-2.5 text-2xl font-black tracking-tight text-base-content"
              >
                Book this equipment
              </h2>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                <span className="font-semibold text-base-content/80">
                  {equipment.name}
                </span>
                <span className="text-base-content/30">&bull;</span>
                <span className="inline-flex items-baseline gap-1 rounded-lg border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-extrabold text-primary">
                  {formatCurrency(equipment.price)}
                  <span className="text-xs font-semibold text-primary/80">
                    / {rentalUnit(equipment.rentalType)}
                  </span>
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost btn-circle btn-sm shrink-0 border border-base-300/70 bg-base-100/80 hover:border-error/40 hover:bg-error/10 hover:text-error"
              aria-label="Close"
            >
              <FiX className="text-lg" />
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 space-y-6 overflow-y-auto px-6 py-6 sm:px-8"
          noValidate
        >
          {/* Section 1: Rental Schedule */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-base-content/60">
              <FiCalendar className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span>Rental Schedule</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-base-content/85">
                  Rental start date
                </span>
                <input
                  type="date"
                  name="startDate"
                  min={today}
                  value={form.startDate}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-xl bg-base-200/40 font-medium transition-colors focus:border-primary focus:bg-base-100 focus:outline-none"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-base-content/85">
                  Rental end date
                </span>
                <input
                  type="date"
                  name="endDate"
                  min={form.startDate || today}
                  value={form.endDate}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-xl bg-base-200/40 font-medium transition-colors focus:border-primary focus:bg-base-100 focus:outline-none"
                  required
                />
              </label>
            </div>
          </div>

          {/* Section 2: Quantity & Contact */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-base-content/60">
              <FiLayers className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span>Units &amp; Contact</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 flex items-center justify-between text-sm font-semibold text-base-content/85">
                  <span>Required quantity</span>
                  <span className="rounded-md bg-base-200 px-2 py-0.5 text-xs font-bold text-base-content/70">
                    max {maxQuantity}
                  </span>
                </span>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max={Math.max(1, maxQuantity)}
                  value={form.quantity}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-xl bg-base-200/40 font-semibold transition-colors focus:border-primary focus:bg-base-100 focus:outline-none"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-base-content/85">
                  <FiPhone className="h-3.5 w-3.5 text-base-content/50" aria-hidden="true" />
                  <span>Contact number</span>
                </span>
                <input
                  type="tel"
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={handleChange}
                  placeholder="+880 1XXX XXXXXX"
                  className="input input-bordered w-full rounded-xl bg-base-200/40 font-medium transition-colors focus:border-primary focus:bg-base-100 focus:outline-none"
                  autoComplete="tel"
                  required
                />
              </label>
            </div>
          </div>

          {/* Section 3: Delivery & Notes */}
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-base-content/85">
                <FiMapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <span>Delivery address</span>
              </span>
              <textarea
                name="deliveryAddress"
                value={form.deliveryAddress}
                onChange={handleChange}
                rows={2}
                placeholder="House, road, area, city"
                className="textarea textarea-bordered w-full rounded-xl bg-base-200/40 leading-relaxed transition-colors focus:border-primary focus:bg-base-100 focus:outline-none"
                autoComplete="street-address"
                required
              />
            </label>

            <label className="block">
              <span className="mb-1.5 flex items-center justify-between text-sm font-semibold text-base-content/85">
                <span className="flex items-center gap-1.5">
                  <FiFileText className="h-3.5 w-3.5 text-base-content/50" aria-hidden="true" />
                  <span>Additional notes</span>
                </span>
                <span className="text-xs font-normal text-base-content/55">
                  optional
                </span>
              </span>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={2}
                maxLength={500}
                placeholder="Anything the owner should know?"
                className="textarea textarea-bordered w-full rounded-xl bg-base-200/40 leading-relaxed transition-colors focus:border-primary focus:bg-base-100 focus:outline-none"
              />
            </label>
          </div>

          {/* Ticket-Style Summary & Availability Card */}
          <div
            className="relative overflow-hidden rounded-2xl border border-base-300/90 bg-gradient-to-br from-base-200/80 via-base-200/50 to-primary/[0.04] p-5"
            aria-live="polite"
          >
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 font-medium text-base-content/70">
                  <FiClock className="h-4 w-4 text-primary" aria-hidden="true" />
                  Rental duration
                </span>
                <span className="rounded-lg bg-base-100 px-2.5 py-1 font-bold text-base-content shadow-2xs">
                  {days > 0 ? `${days} day${days > 1 ? "s" : ""}` : "-"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 font-medium text-base-content/70">
                  {isSoldOutOnDates ? (
                    <FiXCircle className="h-4 w-4 text-error" aria-hidden="true" />
                  ) : (
                    <FiCheckCircle
                      className={`h-4 w-4 ${
                        isAvailableOnDates ? "text-success" : "text-base-content/45"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  Availability
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                    checking
                      ? "bg-base-100 text-base-content/70"
                      : isAvailableOnDates
                        ? "bg-success/15 text-success"
                        : isSoldOutOnDates
                          ? "bg-error/15 text-error"
                          : "bg-base-100 text-base-content/65"
                  }`}
                >
                  {checking && (
                    <span className="loading loading-spinner loading-xs" aria-hidden="true" />
                  )}
                  {checking
                    ? "Checking..."
                    : availability
                      ? availability.remainingQuantity > 0
                        ? `${availability.remainingQuantity} unit(s) free`
                        : "Not available on these dates"
                      : "Choose dates to check"}
                </span>
              </div>
            </div>

            {/* Dashed Ticket Divider */}
            <div className="my-4 border-t border-dashed border-base-300" />

            <div className="flex items-baseline justify-between gap-4">
              <div>
                <span className="block text-xs font-bold tracking-wider uppercase text-base-content/60">
                  Total rental amount
                </span>
              </div>
              <span className="text-2xl font-black tracking-tight text-primary sm:text-3xl">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-base-300/70 pt-4 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost rounded-xl font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary rounded-xl px-6 font-bold shadow-lg shadow-primary/25 transition-all"
              disabled={submitting || checking}
            >
              {submitting ? (
                <span className="loading loading-spinner loading-sm" />
              ) : null}
              <span>Confirm &amp; Continue to Payment</span>
              {!submitting && <FiArrowRight className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}