import { useEffect, useState } from "react";
import {
  Shield,
  Check,
  X,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Home,
} from "lucide-react";
import { Hostel } from "../types";
import { useNavigate } from "react-router-dom";
import { NotFound } from "../components/NotFound";
import { getAllHostels, updateHostelStatus } from "../api/hostels";
import toast from "react-hot-toast";

export function AdminDashboard() {
  // 1. Type define karein: Hostel[] ya null
  const [hostels, setHostels] = useState<Hostel[] | null>(null);
  const [selectedTab, setSelectedTab] = useState<
    "pending" | "approved" | "rejected"
  >("pending");
  const navigate = useNavigate();

  // Fetch Hostels on Mount
  useEffect(() => {
  (async () => {
    try {
      const res = await getAllHostels();
      // Aapne bataya res.data.data mein array hai
      setHostels(res.data.data); 
      console.log("Admin Hostels Array:", res.data.data);
    } catch (error) {
      toast.error("Hostels couldn't be fetched");
    }
  })();
}, []);

  const handleStatusChange = async (
    hostelId: string,
    newStatus: "approved" | "rejected",
  ) => {
    if (newStatus === "rejected") {
      const confirm = window.confirm(
        "Are you sure you want to REJECT this hostel?",
      );
      if (!confirm) return;
    }

    const toastId = toast.loading(`Marking as ${newStatus}...`);

    try {
      console.log(`Hostel ID : ${hostelId}  and new Status ${newStatus}`)
      await updateHostelStatus(hostelId, newStatus);

      // 2. Direct hostels state ko update karein
      setHostels((prev) =>
        prev
          ? prev.map((h) =>
              h._id === hostelId ? { ...h, status: newStatus } : h,
            )
          : null,
      );

      toast.success(`Hostel ${newStatus} successfully!`, { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status", { id: toastId });
    }
  };

  // 3. Loading state handle karein
  if (hostels === null)
    return <div className="p-10 text-center">Loading Hostels...</div>;
  if (hostels.length === 0) return <NotFound />;

  const pendingHostels = Array.isArray(hostels)
    ? hostels.filter((h) => h.status === "pending")
    : [];
  const approvedHostels = Array.isArray(hostels)
    ? hostels.filter((h) => h.status === "approved")
    : [];
  const rejectedHostels = Array.isArray(hostels)
    ? hostels.filter((h) => h.status === "rejected")
    : [];

  const getHostelsByTab = () => {
    switch (selectedTab) {
      case "pending":
        return pendingHostels;
      case "approved":
        return approvedHostels;
      case "rejected":
        return rejectedHostels;
      default:
        return [];
    }
  };

  const currentHostels = getHostelsByTab();

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage hostel listings and approvals
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Listings"
            count={hostels.length}
            icon={<Home />}
            color="blue"
          />
          <StatCard
            title="Pending Review"
            count={pendingHostels.length}
            icon={<Clock />}
            color="yellow"
          />
          <StatCard
            title="Approved"
            count={approvedHostels.length}
            icon={<CheckCircle />}
            color="green"
          />
          <StatCard
            title="Rejected"
            count={rejectedHostels.length}
            icon={<XCircle />}
            color="red"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="flex border-b border-gray-200">
            <TabButton
              active={selectedTab === "pending"}
              onClick={() => setSelectedTab("pending")}
              label="Pending"
              count={pendingHostels.length}
              color="yellow"
            />
            <TabButton
              active={selectedTab === "approved"}
              onClick={() => setSelectedTab("approved")}
              label="Approved"
              count={approvedHostels.length}
              color="green"
            />
            <TabButton
              active={selectedTab === "rejected"}
              onClick={() => setSelectedTab("rejected")}
              label="Rejected"
              count={rejectedHostels.length}
              color="red"
            />
          </div>
        </div>

        {/* Table */}
        {currentHostels.length > 0 ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4">Hostel</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Rent</th>
                  <th className="px-6 py-4">Owner</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {currentHostels.map((hostel) => (
                  <tr key={hostel._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={hostel.images[0]}
                        className="w-12 h-12 rounded object-cover"
                        alt=""
                      />
                      <span className="font-medium">{hostel.name}</span>
                    </td>
                    <td className="px-6 py-4 text-sm">{hostel.location}</td>
                    <td className="px-6 py-4 font-semibold text-sm">
                      Rs. {hostel.rent}
                    </td>
                    <td className="px-6 py-4 text-sm">{hostel.hostlerName}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          hostel.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : hostel.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {hostel.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            navigate(`/hostel-details/${hostel._id}`)
                          }
                          className="p-2 text-blue-600"
                        >
                          <Eye size={18} />
                        </button>
                        {hostel.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(hostel._id, "approved")
                              }
                              className="p-2 text-green-600"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(hostel._id, "rejected")
                              }
                              className="p-2 text-red-600"
                            >
                              <X size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-xl shadow">
            No {selectedTab} hostels found.
          </div>
        )}
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ title, count, icon, color }: any) {
  const colors: any = {
    blue: "border-blue-600 bg-blue-50",
    yellow: "border-yellow-500 bg-yellow-50",
    green: "border-green-600 bg-green-50",
    red: "border-red-600 bg-red-50",
  };
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${colors[color]}`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold">{count}</p>
        </div>
        <div className="text-gray-400">{icon}</div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label, count, color }: any) {
  const activeClass = active
    ? `bg-${color}-50 text-${color}-700 border-b-2 border-${color}-600`
    : "text-gray-600 hover:bg-gray-50";
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeClass}`}
    >
      {label} ({count})
    </button>
  );
}
