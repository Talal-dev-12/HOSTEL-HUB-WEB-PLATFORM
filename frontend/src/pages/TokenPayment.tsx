import { useEffect, useState } from 'react';
import { CreditCard, Wallet, Building2, Check, ArrowRight } from 'lucide-react';
import { Hostel } from '../types';
import {Page} from "../types/index";
import { useNavigate, useParams } from 'react-router-dom';
import { User } from '../types';
import { singleHostel } from '../api/hostels';
import { NotFound } from '../components/NotFound';
import { BookingPayload, createBooking } from '../api/booking';


export function TokenPayment() {
type PaymentMethod = 'card' | 'wallet' | 'bank';

const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [processing, setProcessing] = useState(false);
  const [hostel, setHostel] = useState<Hostel | null>(null);

  // --- NAYA: Fake Data Form State ---
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    holderName: '',
    walletNumber: '',
    transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}` // Auto-generated fake ID
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await singleHostel(id);
        setHostel(res.data.hostel);
      } catch (error) {
        console.error("Error fetching hostel:", error);
      }
    })();
  }, [id]);
const handlePayment = async () => {
  if (!id) return;
 
  setProcessing(true);
  try {
    // Interface ke mutabiq data tayyar karein
    const payload: BookingPayload = {
      hostelId: id,
      paymentMethod: paymentMethod,
      transactionId: formData.transactionId, // Jo humne state mein generate kiya tha
      moveInDate: new Date(), // Aaj ki date bhej dete hain
      agreementAccepted: true
    };

    console.log(payload)
    const response = await createBooking(payload);
    if (response.status === 201 || response.status === 200) {
      navigate(`/booking-confirmation/${response.data.bookingId}`);
    }
  } catch (error) {
    console.error("Booking failed:", error);
    alert("Payment failed. Please try again.");
  } finally {
    setProcessing(false);
  }
};

  if (!id) return <NotFound />;
  if (!hostel) return <div className="animate-spin ..."></div>;

  const tokenAmount = hostel.rent * 0.05;
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
          <p className="text-gray-600">Pay token amount to confirm your reservation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h2>
              
              <div className="space-y-3">
                {/* Credit/Debit Card */}
                <label className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Credit / Debit Card</p>
                    <p className="text-sm text-gray-500">Visa, Mastercard, etc.</p>
                  </div>
                </label>

                {/* Digital Wallet */}
                <label className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'wallet'}
                    onChange={() => setPaymentMethod('wallet')}
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Digital Wallet</p>
                    <p className="text-sm text-gray-500">JazzCash, Easypaisa, etc.</p>
                  </div>
                </label>

                {/* Bank Transfer */}
                <label className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Bank Transfer</p>
                    <p className="text-sm text-gray-500">Direct bank transfer</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Details Form */}
            {paymentMethod === 'card' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Card Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'wallet' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Wallet Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      placeholder="03XX-XXXXXXX"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Bank Transfer Details</h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <p className="text-gray-700"><strong>Bank:</strong> ABC Bank</p>
                  <p className="text-gray-700"><strong>Account Title:</strong> Hostel Hub</p>
                  <p className="text-gray-700"><strong>Account Number:</strong> 1234567890</p>
                  <p className="text-gray-700"><strong>IBAN:</strong> PK12ABCD1234567890</p>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Please transfer the amount and upload the receipt
                </p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Hostel</span>
                    <span className="font-medium text-gray-900">{hostel.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monthly Rent</span>
                    <span className="font-medium text-gray-900">Rs. {hostel.rent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Token (5%)</span>
                    <span className="font-medium text-gray-900">Rs. {tokenAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 mb-6">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total to Pay</span>
                    <span className="font-bold text-2xl text-blue-600">
                      Rs. {tokenAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-6 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Token will be adjusted in first month rent</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Instant booking confirmation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Secure payment</span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay Now
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Your payment is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
