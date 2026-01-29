import { useState, useMemo } from 'react';
import { Search, Home } from 'lucide-react';
import { Hostel } from '../types';
import { HostelCard } from '../components/HostelCard';
import { FilterPanel } from '../components/FilterPanel';
import {Page} from "../types/index";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import { NotFound } from '../components/NotFound';

interface StudentDashboardProps {
  hostels: Hostel[] | undefined;
}

export function StudentDashboard({ hostels}: StudentDashboardProps) {

  const Navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const [showFeatured, setShowFeatured] = useState(false);
  const [showVerified, setShowVerified] = useState(false);

  // Get unique locations

   if(!hostels) return <NotFound/>

  const locations = useMemo(() => {
    const locs = hostels
      .filter(h => h.status === 'approved')
      .map(h => h.location);
    return Array.from(new Set(locs)).sort();
  }, [hostels]);

  // Filter hostels
  const filteredHostels = useMemo(() => {
    return hostels.filter(hostel => {
      // Only show approved hostels
      if (hostel.status !== 'approved') return false;

      // Search term
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        if (
          !hostel.name.toLowerCase().includes(search) &&
          !hostel.location.toLowerCase().includes(search)
        ) {
          return false;
        }
      }

      // Location filter
      if (selectedLocation && hostel.location !== selectedLocation) {
        return false;
      }

      // Rent range filter
      if (minRent && hostel.rent < parseInt(minRent)) {
        return false;
      }
      if (maxRent && hostel.rent > parseInt(maxRent)) {
        return false;
      }

      // Badge filters
      if (showFeatured && !hostel.isFeatured) {
        return false;
      }
      if (showVerified && !hostel.isVerified) {
        return false;
      }

      return true;
    });
  }, [hostels, searchTerm, selectedLocation, minRent, maxRent, showFeatured, showVerified]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Hostel</h1>
          <p className="text-gray-600">
            Showing {filteredHostels.length} of {hostels.filter(h => h.status === 'approved').length} available hostels
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <FilterPanel
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedLocation={selectedLocation}
                onLocationChange={setSelectedLocation}
                minRent={minRent}
                maxRent={maxRent}
                onMinRentChange={setMinRent}
                onMaxRentChange={setMaxRent}
                showFeatured={showFeatured}
                onFeaturedChange={setShowFeatured}
                showVerified={showVerified}
                onVerifiedChange={setShowVerified}
                locations={locations}
              />
            </div>
          </div>

          {/* Hostels Grid */}
          <div className="lg:col-span-3">
            {filteredHostels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHostels.map((hostel) => (
                  <HostelCard
                    key={hostel._id}
                    hostel={hostel}
                    onViewDetails={(id) => Navigate(`/hostel-details/${hostel._id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Home className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No hostels found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters to see more results
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedLocation('');
                    setMinRent('');
                    setMaxRent('');
                    setShowFeatured(false);
                    setShowVerified(false);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
