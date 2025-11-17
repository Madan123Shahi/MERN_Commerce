import React, { useState } from "react";
import axios from "axios";

const ImageUpload = ({ onUploaded }) => {
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files) return;
    const form = new FormData();
    for (const file of files) form.append("images", file);

    setLoading(true);
    const { data } = await axios.post("/api/uploads", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setLoading(false);
    onUploaded(data.uploaded);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded">
      <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
      <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">
        Upload
      </button>
      {loading && <p>Uploading...</p>}
    </form>
  );
};

export default ImageUpload;
