import { Search, SlidersHorizontal, MapPin, DollarSign, Star, ShieldCheck } from 'lucide-react';

interface FilterPanelProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedLocation: string;
  onLocationChange: (value: string) => void;
  minRent: string;
  maxRent: string;
  onMinRentChange: (value: string) => void;
  onMaxRentChange: (value: string) => void;
  showFeatured: boolean;
  onFeaturedChange: (value: boolean) => void;
  showVerified: boolean;
  onVerifiedChange: (value: boolean) => void;
  locations: string[];
}

export function FilterPanel({
  searchTerm,
  onSearchChange,
  selectedLocation,
  onLocationChange,
  minRent,
  maxRent,
  onMinRentChange,
  onMaxRentChange,
  showFeatured,
  onFeaturedChange,
  showVerified,
  onVerifiedChange,
  locations
}: FilterPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
      </div>

      <div className="space-y-5">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search hostels..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Location
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Rent Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="inline w-4 h-4 mr-1" />
            Rent Range (Rs.)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              value={minRent}
              onChange={(e) => onMinRentChange(e.target.value)}
              placeholder="Min"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              value={maxRent}
              onChange={(e) => onMaxRentChange(e.target.value)}
              placeholder="Max"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Badge Filters */}
        <div className="space-y-3 pt-2 border-t border-gray-200">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={showFeatured}
              onChange={(e) => onFeaturedChange(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="flex items-center gap-2 text-sm font-medium text-gray-700 group-hover:text-gray-900">
              <Star className="w-4 h-4 text-yellow-600" />
              Featured Only
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={showVerified}
              onChange={(e) => onVerifiedChange(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="flex items-center gap-2 text-sm font-medium text-gray-700 group-hover:text-gray-900">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              Verified Only
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
