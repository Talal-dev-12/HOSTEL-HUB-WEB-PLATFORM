import { useState } from "react";
import {
  Home,
  MapPin,
  DollarSign,
  Upload,
  Image as ImageIcon,
  Check,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { listHostel} from "../api/hostels";

export function ListHostel() {
  const onNavigate = useNavigate();

  const [images, setImages] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rent: "",
    description: "",
    contactNumber: "",
    cnic: "",
    amenities: [] as string[],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const availableAmenities = [
    "WiFi",
    "Laundry",
    "Mess",
    "Security",
    "Parking",
    "Study Room",
    "Gym",
    "AC Rooms",
    "Common Area",
    "Common Kitchen",
  ];

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (
    !formData.name ||
    !formData.location ||
    !formData.rent ||
    !formData.description ||
    !formData.contactNumber
  ) {
    setError("Please fill in all required fields");
    return;
  }

  if (parseInt(formData.rent) < 1000) {
    setError("Rent must be at least Rs. 1,000");
    return;
  }

  if (formData.amenities.length === 0) {
    setError("Please select at least one amenity");
    return;
  }

  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("rent", formData.rent);
    data.append("description", formData.description);
    data.append("contactNumber", formData.contactNumber);
    data.append("cnic", formData.cnic);
    formData.amenities.forEach((a) => {
      data.append("amenities", a);
    });

    images.forEach((img) => {
      data.append("images", img); // must match backend upload.array("images")
    });

   // await api.post("/hostels/create", data);
   await listHostel(data)

    setSuccess(true);

    setTimeout(() => {
      onNavigate("/hostler-dashboard");
    }, 1500);

  } catch (err: any) {
    setError(err.response?.data?.message || "Hostel creation failed");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            List Your Hostel
          </h1>
          <p className="text-gray-600">
            Fill in the details to get your hostel listed on our platform
          </p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800">
                Hostel submitted successfully!
              </p>
              <p className="text-sm text-green-700 mt-1">
                Your listing is under review. You'll be notified once it's
                approved.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>

            <div className="space-y-4">
              {/* Hostel Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hostel Name *
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Sunrise Student Hostel"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g., Gulshan-e-Iqbal, Karachi"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Rent */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Rent (Rs.) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    min="0"
                    value={formData.rent}
                    onChange={(e) =>
                      setFormData({ ...formData, rent: e.target.value })
                    }
                    placeholder="e.g., 12000"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  maxLength={11}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length !== 11) {
                      setError("Contact Number must be 11 digits");
                    } else {
                      setError("");
                      setFormData({ ...formData, contactNumber: value });
                    }
                  }}
                  placeholder="e.g., 0300-1234567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {/* NIC Number */}
              <input
                type="tel"
                maxLength={13}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value.length !== 13) {
                    setError("CNIC must be 13 digits");
                  } else {
                    setError("");
                    setFormData({ ...formData, cnic: value });
                  }
                }}
                placeholder="e.g., 4210112345671"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe your hostel, facilities, rules, etc."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Amenities *
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Select all amenities available at your hostel
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableAmenities.map((amenity) => (
                <label
                  key={amenity}
                  className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.amenities.includes(amenity)
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span
                    className={`text-sm font-medium ${
                      formData.amenities.includes(amenity)
                        ? "text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {amenity}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Images</h2>
            <p className="text-sm text-gray-600 mb-4">
              Upload high-quality images of your hostel (max 5 images)
            </p>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  if (!e.target.files) return;
                  setImages(Array.from(e.target.files));
                }}
                className="hidden"
                id="imageUpload"
              />

              <label
                htmlFor="imageUpload"
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer block"
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Click to upload images
                </p>
                <p className="text-xs text-gray-500">PNG, JPG up to 5MB each</p>
              </label>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(img)}
                  className="h-24 w-full object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => onNavigate("/hostler-dashboard")}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={success}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {success ? "Submitted!" : "Submit for Review"}
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Your listing will be reviewed by our admin team and published within
            24-48 hours
          </p>
        </form>
      </div>
    </div>
  );
}
