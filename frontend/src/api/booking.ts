import api from "../api/axios"; // Ensure path is correct (e.g., ../api/api)

export interface BookingPayload {
  hostelId: string;
  paymentMethod: 'card' | 'wallet' | 'bank';
  transactionId: string;
  moveInDate?: Date;
  agreementAccepted?: boolean;
}

// 1. Create Booking
export const createBooking = async (data: BookingPayload) => {
  // Backend route "/api/booking" hai, toh yahan "/booking/create" aayega
  return await api.post("/booking/create", data);
};

export const getBookingDetails = async (id: string) => {
  const token = localStorage.getItem("token");
  return await api.get(`/booking/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
};