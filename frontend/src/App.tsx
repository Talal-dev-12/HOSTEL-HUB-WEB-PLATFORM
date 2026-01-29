import { useEffect, useState } from "react";
import { User, Hostel, UserRole, Page } from "./types";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Landing } from "./pages/Landing";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { StudentDashboard } from "./pages/StudentDashboard";
import { HostelDetails } from "./pages/HostelDetails";
import { AgreementPage } from "./pages/AgreementPage";
import { TokenPayment } from "./pages/TokenPayment";
import { BookingConfirmation } from "./pages/BookingConfirmation";
import { HostlerDashboard } from "./pages/HostlerDashboard";
import { ListHostel } from "./pages/ListHostel";
import { BuyBadges } from "./pages/BuyBadges";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import { NotFound } from "./components/NotFound";
import { login, register } from "./api/auth";
import { Toaster, toast } from "react-hot-toast";
import { getHostels } from "./api/hostels";

export default function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setloading] = useState(true);



  const [hostels, setHostels] = useState<Hostel[]>();
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    // IIFE used to call async inside useEffect
    (async () => {
      try {
        const res = await getHostels();
        const transformedData = res.data.data.map((h: any) => ({
          ...h,
          id: h._id,
        }));
        setHostels(transformedData);
        setloading(false)
      } catch (error) {
        toast.error("Can't fetch Hostels");
      }
    })();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user"); // Ye zaroori hai
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/");
  };
  const handlePurchaseBadges = (hostelId: string, badges: string[]) => {
    if (!hostels) return <NotFound />;
    setHostels(
      hostels.map((h) => {
        if (h._id === hostelId) {
          return {
            ...h,
            isFeatured: badges.includes("featured") || h.isFeatured,
            isVerified: badges.includes("verified") || h.isVerified,
          };
        }
        return h;
      }),
    );
  };
  if (loading) {
    return <span className="loading loading-dots loading-xs"></span>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentUser={currentUser} onSignOut={handleSignOut} />
      <main className="flex-1">
        <Routes>
          {/* Har "case" ab ek "Route" ban jayega */}
          <Route path="/" element={<Landing hostels={hostels} />} />
          <Route path="/sign-in" element={<SignIn setCurrentUser={setCurrentUser}/>} />
          <Route path="/sign-up" element={<SignUp setCurrentUser={setCurrentUser} />} />

          <Route
            path="/all-hostels"
            element={<StudentDashboard hostels={hostels} />}
          />
          {/* Dashboard Routes */}

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRole={"admin"}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/buy-badges/:id"
            element={
              <ProtectedRoute allowedRole={"hostler"}>
                <BuyBadges onPurchase={handlePurchaseBadges} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hostler-dashboard"
            element={
              <ProtectedRoute allowedRole={"hostler"}>
                <HostlerDashboard userId={currentUser?.id || ""} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/token-payment/:id"
            element={
              <ProtectedRoute allowedRole={"student"}>
                <TokenPayment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/agreement/:id"
            element={
              <ProtectedRoute allowedRole={"student"}>
                <AgreementPage />
              </ProtectedRoute>
            }
          />

          {/* Dynamic Routes (ID ke saath) */}
          <Route path="/hostel-details/:id" element={<HostelDetails />} />

          <Route path="/list-hostel" element={<ListHostel />} />
          <Route
            path="/signup-hostler"
            element={<SignIn userType="Hostler" setCurrentUser={setCurrentUser} />}
          />

          <Route
            path="/booking-confirmation/:id"
            element={
              <ProtectedRoute allowedRole={"student"}>
                <BookingConfirmation />
              </ProtectedRoute>
            }
          />

          {/* 404 Protection */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
