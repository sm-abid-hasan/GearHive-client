"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { isValidEmail } from "@/lib/validation";
import { showSuccess } from "@/lib/alerts";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.name.trim().length < 2) return toast.error("Please enter your name.");
    if (!isValidEmail(form.email)) return toast.error("Please enter a valid email address.");
    if (form.message.trim().length < 10) return toast.error("Your message must be at least 10 characters.");

    await showSuccess("Message sent!", "Thank you. Our team will reply soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <section className="bg-base-200">
        <div className="container-page py-14">
          <span className="section-eyebrow">Contact Us</span>
          <h1 className="section-title mt-2">We would love to hear from you</h1>
          <p className="section-subtitle">Questions about a rental or about listing your equipment? Send us a message.</p>
        </div>
      </section>

      <section className="container-page grid gap-8 py-14 lg:grid-cols-3">
        <div className="space-y-4">
          {[
            { icon: FiMapPin, label: "Address", value: "24 Gulshan Avenue, Dhaka 1212, Bangladesh" },
            { icon: FiPhone, label: "Phone", value: "+880 1700 000 000" },
            { icon: FiMail, label: "Email", value: "support@gearhive.example" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4 rounded-2xl border border-base-300 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
                <Icon aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm text-base-content/60">{label}</p>
                <p className="font-semibold">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-base-300 p-6 sm:p-8 lg:col-span-2" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Your name</span>
              <input name="name" value={form.name} onChange={handleChange} className="input input-bordered w-full" required />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Email</span>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="input input-bordered w-full" required />
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Message</span>
            <textarea name="message" value={form.message} onChange={handleChange} rows={6} className="textarea textarea-bordered w-full" required />
          </label>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </section>
    </>
  );
}
