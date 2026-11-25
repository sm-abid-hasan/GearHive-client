
export function getPasswordProblem(password = "") {
  if (password.length < 6) return "Password must be at least 6 characters long.";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
  return "";
}

export const isValidEmail = (email = "") => /^\S+@\S+\.\S+$/.test(email.trim());


export const isValidUrl = (value = "") => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};


export function getSafeRedirect(path, fallback = "/") {
  if (typeof path === "string" && path.startsWith("/") && !path.startsWith("//")) return path;
  return fallback;
}
