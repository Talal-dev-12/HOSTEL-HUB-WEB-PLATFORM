import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  User,
  Wifi,
  Utensils,
  Shield,
  Car,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Hostel } from "../types";
import { Badge } from "../components/Badge";

import { useNavigate, useParams } from "react-router-dom";
import { NotFound } from "../components/NotFound";

import { singleHostel } from "../api/hostels";

const amenityIcons: Record<string, any> = {
  WiFi: Wifi,
  Mess: Utensils,
  Security: Shield,
  Parking: Car,
  "Study Room": BookOpen,
  Laundry: Check,
  Gym: Check,
  "AC Rooms": Check,
  "Common Area": Check,
  "Common Kitchen": Utensils,
};

export function HostelDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hostel, setHostel] = useState<Hostel | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await singleHostel(id);
        console.log("Full Hostel Data:", res.data.hostel);
        setHostel(res.data.hostel);
      } catch (error) {
        console.error("Error fetching hostel:", error);
      }
    })();
  }, [id]);
  if (!id) return <NotFound />;
  if (!hostel)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  // Helper Functions
 const nextImage = () => {
  if (hostel.images && hostel.images.length > 0) {
    setCurrentImageIndex((prev) => (prev + 1) % hostel.images.length);
  }
};

const prevImage = () => {
  if (hostel.images && hostel.images.length > 0) {
    setCurrentImageIndex(
      (prev) => (prev - 1 + hostel.images.length) % hostel.images.length
    );
  }
};

  if (!id) return <NotFound />;
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/all-hostels")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back to listings</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-96 bg-gray-200">
                <img
                  src={hostel.images?.[currentImageIndex]}
                  alt={`${hostel.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Image Navigation */}
              {hostel.images && hostel.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>

                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {hostel.images?.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? "bg-white w-8"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {hostel.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-5 h-5 mr-2" />
                    <p>{hostel.location}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {hostel.isFeatured && <Badge type="featured" />}
                  {hostel.isVerified && <Badge type="verified" />}
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {hostel.description}
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hostel.amenities?.map((amenity) => {
                  const Icon = amenityIcons[amenity] || Check;
                  return (
                    <div
                      key={`${amenity}`}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {amenity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <User className="w-5 h-5 text-blue-600" />
                  <span>{hostel.hostlerName}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span>{hostel.contactNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Monthly Rent</p>
                  <p className="text-4xl font-bold text-blue-600">
                    Rs. {hostel.rent?.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Token: Rs. {(hostel.rent * 0.05).toLocaleString()} (5%)
                  </p>
                </div>

                <div className="space-y-3 mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Instant booking confirmation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Token adjustable in first rent</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Verified property</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/agreement/${hostel._id}`)}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg"
                >
                  Book Now
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By booking, you agree to our terms and conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
