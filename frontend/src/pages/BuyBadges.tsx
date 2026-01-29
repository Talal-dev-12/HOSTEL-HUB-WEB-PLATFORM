import { Star, ShieldCheck, Check, CreditCard } from "lucide-react";
import { Hostel } from "../types";
import { Page } from "../types/index";
import { useNavigate, useParams } from "react-router-dom";
import { NotFound } from "../components/NotFound";
import { useEffect, useState } from "react";
import { singleHostel, updateHostelBadges } from "../api/hostels";
import toast from "react-hot-toast";
interface BuyBadgesProps {
  onPurchase: (hostelId: string, badges: string[]) => void;
}

export function BuyBadges({ onPurchase }: BuyBadgesProps) {
  const [hostel, setHostel] = useState<Hostel | null>(null);
  const [loading, setLoading] = useState(true); // Loading state added
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
  const fetchHostel = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await singleHostel(id);
      const hostelData = res.data.hostel || res.data;
      setHostel({
        ...hostelData,
        id: hostelData._id || hostelData.id
      });
    } catch (error) {
      toast.error("Hostel Not Found");
    } finally {
      setLoading(false);
    }
  };
  fetchHostel(); // Call it here!
}, [id]);

  // Handle Loading
  if (loading)
    return (
      <div className="p-20 text-center font-bold">Fetching Hostel Data...</div>
    );

  // Handle Not Found
  if (!hostel) return <NotFound />;

 const handlePurchase = async (badgeType: "featured" | "verified" | "both") => {
  const isBuyingFeatured = badgeType === "featured" || badgeType === "both";
  const isBuyingVerified = badgeType === "verified" || badgeType === "both";

  const toastId = toast.loading("Processing Payment...");

  try {
    // Backend API call: Existing state ko preserve rakhein
    await updateHostelBadges(hostel._id, { 
      isFeatured: isBuyingFeatured || hostel.isFeatured, 
      isVerified: isBuyingVerified || hostel.isVerified 
    });

    // Parent state update
    onPurchase(hostel._id, badgeType === "both" ? ["featured", "verified"] : [badgeType]);

    toast.success("Payment Successful!", { id: toastId });
    
    // Page reload/navigate se pehle state sync ka waqt dein
    setTimeout(() => navigate("/hostler-dashboard"), 500);
  } catch (error) {
    toast.error("Payment failed", { id: toastId });
  }
};
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Boost Your Hostel Visibility
          </h1>
          <p className="text-gray-600">
            Purchase badges to make your hostel stand out
          </p>
        </div>

        {/* Hostel Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center gap-4">
            <img
              src={hostel.images[0]}
              alt={hostel.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">{hostel.name}</h3>
              <p className="text-gray-600">{hostel.location}</p>
              <p className="text-lg font-semibold text-blue-600 mt-1">
                Rs. {hostel.rent.toLocaleString()}/month
              </p>
            </div>
          </div>
        </div>

        {/* Badge Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Featured Badge */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-yellow-200 hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-6 text-white">
              <Star className="w-12 h-12 mb-3 fill-white" />
              <h3 className="text-2xl font-bold mb-2">Featured</h3>
              <p className="text-yellow-50">Stand out from the crowd</p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <p className="text-4xl font-bold text-gray-900 mb-2">
                  Rs. 5,000
                </p>
                <p className="text-sm text-gray-600">One-time payment</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Appears at top of listings
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Featured badge display
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    3x more visibility
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Valid for 6 months
                  </span>
                </div>
              </div>

              <button
                onClick={() => handlePurchase("featured")}
                disabled={hostel.isFeatured} // Sahi: Agar pehle se featured hai toh disable
                className="..."
              >
                {hostel.isFeatured ? "Featured Active" : "Purchase Featured"}
              </button>
            </div>
          </div>

          {/* Verified Badge */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-green-200 hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 text-white">
              <ShieldCheck className="w-12 h-12 mb-3" />
              <h3 className="text-2xl font-bold mb-2">Verified</h3>
              <p className="text-green-50">Build trust with renters</p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <p className="text-4xl font-bold text-gray-900 mb-2">
                  Rs. 10,000
                </p>
                <p className="text-sm text-gray-600">One-time payment</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Official verification badge
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Higher trust rating
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Priority in search filters
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Lifetime validity
                  </span>
                </div>
              </div>

              <button
                onClick={() => handlePurchase("verified")}
                disabled={hostel.isVerified} // Sahi: Agar pehle se verified hai toh disable
                className="..."
              >
                {hostel.isVerified ? "Verified Active" : "Purchase Verified"}
              </button>
            </div>
          </div>

          {/* Both Badges - Best Value */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-blue-500 hover:shadow-xl transition-shadow relative">
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              BEST VALUE
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white">
              <div className="flex gap-2 mb-3">
                <Star className="w-10 h-10 fill-white" />
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Featured + Verified</h3>
              <p className="text-blue-50">Maximum visibility & trust</p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <p className="text-sm text-gray-500 line-through">Rs. 15,000</p>
                <p className="text-4xl font-bold text-gray-900 mb-2">
                  Rs. 12,000
                </p>
                <p className="text-sm text-green-600 font-semibold">
                  Save Rs. 3,000
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    All Featured benefits
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    All Verified benefits
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Maximum conversion rate
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">
                    20% discount
                  </span>
                </div>
              </div>

              <button
                onClick={() => handlePurchase("both")}
                disabled={hostel.isFeatured && hostel.isVerified}
                className="..."
              >
                {hostel.isFeatured && hostel.isVerified
                  ? "All Badges Active"
                  : "Purchase Bundle"}
              </button>
            </div>
          </div>
        </div>

        {/* Payment Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <CreditCard className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Secure Payment
              </h3>
              <p className="text-sm text-gray-700">
                All payments are processed securely. Once purchased, badges will
                be activated immediately and visible on your listing.
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/hostler-dashboard")}
            className="px-6 py-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
