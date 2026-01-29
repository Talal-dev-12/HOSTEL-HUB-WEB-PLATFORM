import { Search, Home, ShieldCheck, Star, TrendingUp } from 'lucide-react';
import { Hostel , Page} from '../types';
import { HostelCard } from '../components/HostelCard';
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import { NotFound } from '../components/NotFound';

interface LandingProps {
  hostels: Hostel[] | undefined;
}

export function Landing({ hostels}: LandingProps) {

  const Navigate = useNavigate()

  if(!hostels) return <NotFound/>
  // Show only approved hostels
  const approvedHostels = hostels.filter(h => h.status === 'approved').slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="block text-blue-600 mt-2">Hostel Today</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Discover verified and featured hostels across Pakistan. Safe, affordable, and comfortable living spaces for students and professionals.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => Navigate('/all-hostels')}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Browse Hostels
              </button>
              <button
                onClick={() => Navigate('/hostler-dashboard')}
                className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl font-semibold text-lg flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                List Your Hostel
              </button>
            </div>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Hostel Hub?
            </h2>
            <p className="text-lg text-gray-600">
              Your trusted partner in finding quality accommodation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Hostels</h3>
              <p className="text-gray-600">
                All hostels are thoroughly verified to ensure quality and safety standards.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-yellow-50 to-white p-8 rounded-2xl border border-yellow-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-yellow-500 rounded-xl flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Featured Listings</h3>
              <p className="text-gray-600">
                Premium hostels with top-notch facilities and excellent reviews.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Booking</h3>
              <p className="text-gray-600">
                Simple token payment process and instant booking confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hostels */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Hostels
            </h2>
            <p className="text-lg text-gray-600">
              Explore our handpicked selection of quality hostels
            </p>
          </div>

          {approvedHostels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {approvedHostels.map((hostel) => (
                <HostelCard
                  key={hostel._id}
                  hostel={hostel}
                  onViewDetails={(id) => Navigate(`/hostel-details/${hostel._id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No hostels available at the moment</p>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={() => Navigate('/all-hostels')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              View All Hostels
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Find Your Hostel?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students and professionals who found their perfect stay
          </p>
          <button
            onClick={() => Navigate('sign-up')}
            className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all shadow-xl font-semibold text-lg"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
}
