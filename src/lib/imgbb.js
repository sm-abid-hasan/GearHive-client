
export async function uploadToImgbb(file) {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey || apiKey.startsWith("replace_with")) {
    throw new Error("Image upload is not set up yet. Add NEXT_PUBLIC_IMGBB_API_KEY to your .env.local file.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file (JPG, PNG or WebP).");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("The image is too big. Please choose an image smaller than 5 MB.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });
  const result = await response.json();

  if (!response.ok || !result?.data?.url) {
    throw new Error(result?.error?.message || "Image upload failed. Please try again.");
  }

  return result.data.url;
}
