export type UserRole = 'student' | 'hostler' | 'admin';

export type BadgeType = 'featured' | 'verified' | 'both';

export type HostelStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Hostel {
  _id: string;
  name: string;
  location: string;
  rent: number;
  images: string[];
  description: string;
  amenities: string[];
  isFeatured: boolean;
  isVerified: boolean;
  status: HostelStatus;
  hostlerId: string;
  hostlerName: string;
  contactNumber: string;
}

export interface Booking {
  id: string;
  hostelId: string;
  studentId: string;
  tokenAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookingDate: string;
}

export type Page =
  | "landing"
  | "sign-in"
  | "sign-up"
  | "signup-hostler"
  | "student-dashboard"
  | "hostel-details"
  | "agreement"
  | "token-payment"
  | "booking-confirmation"
  | "hostler-dashboard"
  | "list-hostel"
  | "buy-badges"
  | "admin-dashboard";
