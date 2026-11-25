"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import SafeImage from "@/components/ui/SafeImage";
import StatusBadge from "@/components/ui/StatusBadge";
import { CATEGORY_NAMES, CONDITIONS, RENTAL_TYPES } from "@/lib/constants";
import { uploadToImgbb } from "@/lib/imgbb";
import { isValidUrl } from "@/lib/validation";

const EMPTY_FORM = {
  name: "",
  description: "",
  category: "",
  location: "",
  price: "",
  rentalType: "Daily",
  availableQuantity: 1,
  condition: "Good",
  brand: "",
  model: "",
  image: "",
  terms: "",
};


export default function EquipmentForm({ initialValues, owner, status = "pending", submitLabel, submitting, onSubmit }) {
  const [form, setForm] = useState({ ...EMPTY_FORM, ...pickFormFields(initialValues) });
  const [uploading, setUploading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToImgbb(file);
      setForm((current) => ({ ...current, image: url }));
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const price = Number(form.price);
    const quantity = Number(form.availableQuantity);

    if (form.name.trim().length < 3) return toast.error("Equipment name must be at least 3 characters.");
    if (form.description.trim().length < 10) return toast.error("Description must be at least 10 characters.");
    if (!form.category) return toast.error("Please choose a category.");
    if (form.location.trim().length < 2) return toast.error("Please enter the location.");
    if (!Number.isFinite(price) || price <= 0) return toast.error("Rental price must be greater than 0.");
    if (!Number.isInteger(quantity) || quantity < 0) return toast.error("Available quantity must be a whole number.");
    if (!form.brand.trim()) return toast.error("Please enter the brand.");
    if (!form.model.trim()) return toast.error("Please enter the model.");
    if (!form.image.trim() || (!isValidUrl(form.image.trim()) && !form.image.trim().startsWith("/"))) {
      return toast.error("Please upload an equipment image (or paste a direct image link).");
    }
    if (form.terms.trim().length < 5) return toast.error("Please enter the rental terms and conditions.");

    onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      location: form.location.trim(),
      price,
      rentalType: form.rentalType,
      availableQuantity: quantity,
      condition: form.condition,
      brand: form.brand.trim(),
      model: form.model.trim(),
      image: form.image.trim(),
      terms: form.terms.trim(),
    });
  };

  const inputClass = "input input-bordered w-full";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-1 block text-sm font-semibold">Equipment name</span>
          <input name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="e.g. Canon EOS R5 Camera Kit" required />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-1 block text-sm font-semibold">Description</span>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="textarea textarea-bordered w-full" placeholder="Describe the equipment, what is included and what it is good for." required />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Category</span>
          <select name="category" value={form.category} onChange={handleChange} className="select select-bordered w-full" required>
            <option value="">Select a category</option>
            {CATEGORY_NAMES.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Location</span>
          <input name="location" value={form.location} onChange={handleChange} className={inputClass} placeholder="e.g. Dhaka" required />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Rental price (USD)</span>
          <input type="number" name="price" min="0" step="0.01" value={form.price} onChange={handleChange} className={inputClass} placeholder="e.g. 65" required />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Rental type (price is per)</span>
          <select name="rentalType" value={form.rentalType} onChange={handleChange} className="select select-bordered w-full">
            {RENTAL_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Available quantity</span>
          <input type="number" name="availableQuantity" min="0" step="1" value={form.availableQuantity} onChange={handleChange} className={inputClass} required />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Equipment condition</span>
          <select name="condition" value={form.condition} onChange={handleChange} className="select select-bordered w-full">
            {CONDITIONS.map((condition) => (
              <option key={condition} value={condition}>{condition}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Brand</span>
          <input name="brand" value={form.brand} onChange={handleChange} className={inputClass} placeholder="e.g. Canon" required />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Model</span>
          <input name="model" value={form.model} onChange={handleChange} className={inputClass} placeholder="e.g. EOS R5" required />
        </label>

    
        <div className="md:col-span-2">
          <span className="mb-1 block text-sm font-semibold">Equipment image</span>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <SafeImage src={form.image} alt="Equipment preview" className="h-32 w-44 shrink-0 rounded-xl border border-base-300 object-cover" />
            <div className="w-full">
              <input type="url" name="image" value={form.image} onChange={handleChange} className={inputClass} placeholder="Paste a direct image link, or upload below" />
              <label className="btn btn-sm btn-outline mt-3 cursor-pointer">
                {uploading ? <span className="loading loading-spinner loading-xs" /> : <FiUpload />}
                Upload image with imgbb
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              </label>
            </div>
          </div>
        </div>

        <label className="block md:col-span-2">
          <span className="mb-1 block text-sm font-semibold">Rental terms and conditions</span>
          <textarea name="terms" value={form.terms} onChange={handleChange} rows={4} className="textarea textarea-bordered w-full" placeholder="e.g. ID required at pick-up. Return in the same condition. Late return is charged." required />
        </label>

      
        <div className="rounded-xl bg-base-200 p-4">
          <p className="text-sm font-semibold">Status</p>
          <div className="mt-2 flex items-center gap-2">
            <StatusBadge status={status} />
            <span className="text-xs text-base-content/60">Only an admin can approve equipment.</span>
          </div>
        </div>
        <div className="rounded-xl bg-base-200 p-4">
          <p className="text-sm font-semibold">Owner information</p>
          <p className="mt-2 text-sm">{owner?.name}</p>
          <p className="break-all text-sm text-base-content/70">{owner?.email}</p>
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-lg" disabled={submitting || uploading}>
        {submitting && <span className="loading loading-spinner loading-sm" />}
        {submitLabel}
      </button>
    </form>
  );
}


function pickFormFields(item) {
  if (!item) return {};
  const picked = {};
  Object.keys(EMPTY_FORM).forEach((key) => {
    if (item[key] !== undefined && item[key] !== null) picked[key] = item[key];
  });
  return picked;
}
