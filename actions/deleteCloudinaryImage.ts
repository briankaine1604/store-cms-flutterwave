"use server";

import cloudinary from "cloudinary";

interface deleteOneprops {
  publicId: string | string[];
}

export async function deleteCloudinaryImage({ publicId }: deleteOneprops) {
  const publicIds = Array.isArray(publicId) ? publicId : [publicId];
  await cloudinary.v2.api.delete_resources(publicIds);
  console.log("Image deleted!");
}
