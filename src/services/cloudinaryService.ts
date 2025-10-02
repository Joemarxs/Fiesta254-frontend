export const uploadToCloudinary = async (file: File): Promise<string> => {
  // 1. Get signed params from Django
  const sigRes = await fetch("http://localhost:8000/api/events/upload-image/");
  const { signature, timestamp, api_key, cloud_name } = await sigRes.json();

  // 2. Prepare form data for Cloudinary
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", api_key);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);

  // 3. Upload to Cloudinary
  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await uploadRes.json();
  if (data.secure_url) {
    return data.secure_url; // return Cloudinary URL
  } else {
    throw new Error("Cloudinary upload failed");
  }
};
