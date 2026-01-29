import { useEffect, useState } from 'react';
import { CheckCircle, Download, Home, Calendar, MapPin, CreditCard } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookingDetails } from '../api/booking'; // Ye function pehle banaya tha
import { NotFound } from '../components/NotFound';

export function BookingConfirmation() {
  const { id } = useParams<{ id: string }>(); // URL sy booking ID pakrein
  const onNavigate = useNavigate();
  
  // States
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!id) return;
        const res = await getBookingDetails(id);
        setBooking(res.data.data); 
        console.log(res.data.data)
      } catch (error) {
        console.error("Error fetching booking:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!booking) return <NotFound />;

  // Data mapping from Backend
  const hostel = booking.hostel;
  const tokenAmount = booking.payment.amount;
  const bookingDate = new Date(booking.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-pulse">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Booking Confirmed!</h1>
          <p className="text-lg text-gray-600">Your reservation has been successfully confirmed</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          {/* Header with REAL ID */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-blue-100">Booking ID</p>
                <p className="text-xl font-mono font-bold uppercase">{booking._id}</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Home className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Hostel Info - Dynamic */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Hostel Details</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Home className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">{hostel.name}</p>
                    <p className="text-sm text-gray-600">Rent: Rs. {hostel.rent.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                  <p className="text-gray-700">{hostel.address}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                  <p className="text-gray-700">Booked on {bookingDate}</p>
                </div>
              </div>
            </div>

            {/* Payment Info - Dynamic */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Payment Summary</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Token Paid (Online)</span>
                  <span className="font-semibold text-green-600 font-mono">Rs. {tokenAmount.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Remaining to Pay at Hostel</span>
                    <span className="font-bold text-gray-900">Rs. {(hostel.rent - tokenAmount).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Reference */}
            <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg text-xs">
              <CreditCard className="w-4 h-4" />
              <span>TXN ID: {booking.payment.transactionId}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold"
          >
            <Download className="w-5 h-5" /> Download PDF
          </button>
          <button
            onClick={() => onNavigate('/')}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg"
          >
            Go to My Bookings
          </button>
        </div>
      </div>
    </div>
  );
}