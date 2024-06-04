import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export const useFileUpload = () => {
  const [fileUrl, setFileUrl] = useState("");

  const handleUpload = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*,application/pdf";

    fileInput.onchange = async (e: any) => {
      const image = e.target.files[0];
      if (!image) {
        alert("Please select an image to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ap7vvzoa");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dqful4bvp/upload`,
          formData
        );
        setFileUrl(response.data.secure_url);
        toast.success("File uploaded.");
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image");
      }
    };

    fileInput.click();
  };
  return { fileUrl, handleUpload };
};
