

export const SITE_NAME = "GearHive";

export const ROLES = {
  CUSTOMER: "customer",
  OWNER: "owner",
  ADMIN: "admin",
};



export const CATEGORIES = [
  {
    name: "Construction Equipment",
    description: "Excavators, mixers, lifts and more",
    image: "/images/categories/construction.png",
  },
  {
    name: "Photography Equipment",
    description: "Cameras, lenses, drones and lights",
    image: "/images/categories/photography.png",
  },
  {
    name: "Vehicles & Transportation",
    description: "Vans, trucks and cargo bikes",
    image: "/images/categories/vehicles.png",
  },
  {
    name: "Agriculture Equipment",
    description: "Tractors, tillers and pumps",
    image: "/images/categories/agriculture.png",
  },
  {
    name: "Electronics",
    description: "Laptops, projectors and gadgets",
    image: "/images/categories/electronics.png",
  },
  {
    name: "Event Equipment",
    description: "Sound systems, tents and lighting",
    image: "/images/categories/events.png",
  },
];

export const CATEGORY_NAMES = CATEGORIES.map((category) => category.name);

export const RENTAL_TYPES = ["Daily", "Weekly", "Monthly"];

export const CONDITIONS = ["New", "Like New", "Good", "Fair"];


export const PRICE_RANGES = [
  { label: "Any price", min: "", max: "" },
  { label: "Under $50", min: "", max: "50" },
  { label: "$50 – $100", min: "50", max: "100" },
  { label: "$100 – $250", min: "100", max: "250" },
  { label: "$250 and above", min: "250", max: "" },
];

export const SORT_OPTIONS = [
  { value: "newest", label: "Recently Added" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];
