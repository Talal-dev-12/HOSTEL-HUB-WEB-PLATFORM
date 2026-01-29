import { MapPin, Eye } from 'lucide-react';
import { Hostel } from '../types';
import { Badge } from './Badge';
import { useParams } from 'react-router-dom';



interface HostelCardProps {
  hostel: Hostel;
  onViewDetails: (hostelId: string) => void;
}

export function HostelCard({ hostel, onViewDetails }: HostelCardProps) {



  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gray-200">
        <img
          src={hostel.images[0]}
          alt={hostel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {hostel.isFeatured && <Badge type="featured" size="sm" />}
          {hostel.isVerified && <Badge type="verified" size="sm" />}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {hostel.name}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
          <p className="text-sm line-clamp-1">{hostel.location}</p>
        </div>

        <div className="flex items-end justify-between mt-4">
          <div>
            <p className="text-sm text-gray-500">Monthly Rent</p>
            <p className="text-2xl font-bold text-blue-600">
              Rs. {hostel.rent.toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => onViewDetails(hostel.id)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
