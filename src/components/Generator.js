import axios from "axios";
import { useEffect, useState } from "react";


export default function TicketGenerator() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        avatarUrl: ""
    });

  const [errors, setErrors] = useState({});
  const [ticket, setTicket] = useState(null);
  const [uploading, setUploading] = useState(false);
  

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("ticketForm"));
    if (savedData) setFormData(savedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("ticketForm", JSON.stringify(formData));
  }, [formData]);

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Valid Email is required";
    }
    if (!formData.avatarUrl) newErrors.avatarUrl = "Avatar is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Jeremy"); // Replace with your Cloudinary preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dqks53y71/image/upload",
        formData
      );
      setFormData((prev) => ({ ...prev, avatarUrl: response.data.secure_url }));
    } catch (error) {
      console.error("Upload failed", error);
    }

    setUploading(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setTicket(formData);
    }
  };

  return (



    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Conference Ticket Generator</h2>
        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            aria-describedby="fullNameError"
          />
          {errors.fullName && <p id="fullNameError" className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            aria-describedby="emailError"
          />
          {errors.email && <p id="emailError" className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Upload Avatar</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded" />
          {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
          {formData.avatarUrl && <div><img src={formData.avatarUrl} alt="Avatar" className="w-36 h-36 object-cover rounded-full"  /></div>}
          {errors.avatarUrl && <p className="text-red-500 text-sm">{errors.avatarUrl}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Generate Ticket
        </button>
      </form>

      {ticket && (
        <div className="ticket">
        <div className="congratulations">Congratulations! Here is your ticket:</div>
        <img src={formData.avatarUrl} alt="Avatar" />
        <p><strong>Name:</strong> {formData.fullName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
      </div>
      )}
    </div>
  );
}
