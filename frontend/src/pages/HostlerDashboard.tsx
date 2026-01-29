import {
  Plus,
  Home,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Hostel } from "../types";
import { Badge } from "../components/Badge";
import { Page } from "../types/index";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import { NotFound } from "../components/NotFound";
import { useEffect, useState } from "react";
import { deleteHostel, hostlerHostler } from "../api/hostels";
import toast from "react-hot-toast";

interface HostlerDashboardProps {
  userId: string;
}

export function HostlerDashboard({ userId }: HostlerDashboardProps) {
  const navigate = useNavigate(); // 'Navigate' variable name convention sahi ki
  const [myHostels, setMyHostels] = useState<Hostel[]>([]); // Default empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) return toast.error("Can't Fetch Hostel Token Not Found");
      try {
        const res = await hostlerHostler(token);
        const transformedData = res.data.data.map((h: any) => ({
          ...h,
          id: h._id,
        }));
        setMyHostels(transformedData);
        console.log("Transform Data", transformedData);
        console.log("res.data", res.data);
        setLoading(false);
      } catch (error) {
        toast.error("Can't fetch Hostels");
      }
    })();
  }, []);

const handleDelete = (hostelId: string) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 overflow-hidden border border-red-100`}
    >
      <div className="flex-1 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <h2 className="text-sm font-bold text-red-600 flex items-center gap-2">
              <Trash2 className="w-4 h-4" /> Confirm Delete
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Do you really want to remove this hostel record? This process is permanent.
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="px-4 py-1.5 text-xs font-medium rounded-lg !bg-gray-100 !text-gray-700 hover:bg-gray-200 transition-colors"
              >
                No, Cancel
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  executeDelete(hostelId);
                }}
               // className="px-4 py-1.5 text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all shadow-sm" // isko mai baad mai dekhunga
              >
              Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ), {
    duration: 5000,
    position: 'top-center',
  });
};

// Asli delete logic yahan shift kar dein
const executeDelete = async (hostelId: string) => {
  const toastId = toast.loading("Deleting hostel...");
  try {
    const res = await deleteHostel(hostelId);
    
    // UI update
    setMyHostels((prev) => prev.filter((h) => h._id !== hostelId));
    
    toast.success("Hostel removed successfully", { id: toastId });
  } catch (error) {
    toast.error("Failed to delete hostel", { id: toastId });
    console.error(error);
  }
};

  const pendingHostels = myHostels.filter((h) => h.status === "pending");
  const approvedHostels = myHostels.filter((h) => h.status === "approved");
  const rejectedHostels = myHostels.filter((h) => h.status === "rejected");

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === "pending") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
          <Clock className="w-4 h-4" />
          Pending
        </span>
      );
    }
    if (status === "approved") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
          <CheckCircle className="w-4 h-4" />
          Approved
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
        <XCircle className="w-4 h-4" />
        Rejected
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Hostels
            </h1>
            <p className="text-gray-600">Manage your hostel listings</p>
          </div>
          <button
            onClick={() => navigate("/list-hostel")}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            List New Hostel
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Listings</p>
                <p className="text-3xl font-bold text-gray-900">
                  {myHostels.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-3xl font-bold text-gray-900">
                  {pendingHostels.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Approved</p>
                <p className="text-3xl font-bold text-gray-900">
                  {approvedHostels.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Rejected</p>
                <p className="text-3xl font-bold text-gray-900">
                  {rejectedHostels.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Hostels List */}
        {myHostels.length > 0 ? (
          <div className="space-y-4">
            {myHostels.map((hostel) => (
              <div
                key={hostel._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image */}
                    <div className="lg:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={hostel.images[0]}
                        alt={hostel.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {hostel.name}
                          </h3>
                          <p className="text-gray-600">{hostel.location}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <StatusBadge status={hostel.status} />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {hostel.isFeatured && (
                          <Badge type="featured" size="sm" />
                        )}
                        {hostel.isVerified && (
                          <Badge type="verified" size="sm" />
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Monthly Rent</p>
                          <p className="text-2xl font-bold text-blue-600">
                            Rs. {hostel.rent.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => handleDelete(hostel._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                            title="Delete Hostel"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          {hostel.status === "approved" &&
                            (!hostel.isFeatured || !hostel.isVerified) && (
                              <button
                                onClick={() =>
                                  navigate(`/buy-badges/${hostel._id}`)
                                }
                                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium flex items-center gap-2"
                              >
                                <Star className="w-4 h-4" />
                                {hostel.isFeatured || hostel.isVerified
                                  ? "Upgrade Badges"
                                  : "Buy Badges"}
                              </button>
                            )}

                          <button
                            onClick={() =>
                              navigate(`/hostel-details/${hostel._id}`)
                            } // Fixed: simple ID pass karein
                            className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Home className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hostels listed yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start listing your hostel to reach thousands of potential tenants
            </p>
            <button
              onClick={() => navigate("/list-hostel")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              List Your First Hostel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
