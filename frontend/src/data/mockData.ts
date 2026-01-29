import { Hostel, User } from '../types';


interface AgreementText{
  Tenant: string, 
  hostlerName: string
}

// export const mockHostels: Hostel[] = [
//   {
//     id: '1',
//     name: 'Sunrise Student Hostel',
//     location: 'Gulshan-e-Iqbal, Karachi',
//     rent: 12000,
//     images: [
//       'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
//       'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
//       'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'
//     ],
//     description: 'A comfortable and well-maintained hostel with all modern amenities. Perfect for students and young professionals.',
//     amenities: ['WiFi', 'Laundry', 'Mess', 'Security', 'Parking', 'Study Room'],
//     isFeatured: true,
//     isVerified: true,
//     status: 'approved',
//     hostlerId: 'h1',
//     hostlerName: 'Ahmed Khan',
//     contactNumber: '+92-300-1234567'
//   },
//   {
//     id: '2',
//     name: 'Green Valley Hostel',
//     location: 'Johar Town, Lahore',
//     rent: 10000,
//     images: [
//       'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800',
//       'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800'
//     ],
//     description: 'Affordable and clean hostel near universities. Great community atmosphere.',
//     amenities: ['WiFi', 'Mess', 'Security', 'Common Area'],
//     isFeatured: false,
//     isVerified: true,
//     status: 'approved',
//     hostlerId: 'h2',
//     hostlerName: 'Sarah Ali',
//     contactNumber: '+92-301-2345678'
//   },
//   {
//     id: '3',
//     name: 'Elite Residence',
//     location: 'DHA Phase 5, Karachi',
//     rent: 18000,
//     images: [
//       'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
//       'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
//       'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
//     ],
//     description: 'Premium hostel with luxurious facilities and excellent service.',
//     amenities: ['WiFi', 'Laundry', 'Gym', 'Mess', 'Security', 'Parking', 'AC Rooms'],
//     isFeatured: true,
//     isVerified: true,
//     status: 'approved',
//     hostlerId: 'h3',
//     hostlerName: 'Usman Sheikh',
//     contactNumber: '+92-302-3456789'
//   },
//   {
//     id: '4',
//     name: 'Budget Stay Hostel',
//     location: 'Saddar, Karachi',
//     rent: 8000,
//     images: [
//       'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
//     ],
//     description: 'Basic facilities at affordable prices. Ideal for budget-conscious students.',
//     amenities: ['WiFi', 'Security', 'Common Kitchen'],
//     isFeatured: false,
//     isVerified: false,
//     status: 'approved',
//     hostlerId: 'h4',
//     hostlerName: 'Bilal Ahmed',
//     contactNumber: '+92-303-4567890'
//   },
//   {
//     id: '5',
//     name: 'University View Hostel',
//     location: 'Bahria Town, Islamabad',
//     rent: 15000,
//     images: [
//       'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
//       'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800'
//     ],
//     description: 'Modern hostel with great location near major universities.',
//     amenities: ['WiFi', 'Laundry', 'Mess', 'Security', 'Study Room', 'Parking'],
//     isFeatured: false,
//     isVerified: true,
//     status: 'approved',
//     hostlerId: 'h5',
//     hostlerName: 'Fatima Hussain',
//     contactNumber: '+92-304-5678901'
//   },
//   {
//     id: '6',
//     name: 'Royal Stay',
//     location: 'Model Town, Lahore',
//     rent: 13000,
//     images: [
//       'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'
//     ],
//     description: 'Comfortable stay with friendly environment.',
//     amenities: ['WiFi', 'Mess', 'Security', 'Laundry'],
//     isFeatured: false,
//     isVerified: false,
//     status: 'pending',
//     hostlerId: 'h6',
//     hostlerName: 'Hassan Raza',
//     contactNumber: '+92-305-6789012'
//   }
// ];

export const mockUsers: User[] = [
  {
    id: 's1',
    name: 'Ali Raza',
    email: 'ali@example.com',
    role: 'student'
  },
  {
    id: 'h1',
    name: 'Ahmed Khan',
    email: 'ahmed@example.com',
    role: 'hostler'
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@hostelhub.com',
    role: 'admin'
  }
];
const currentDate = new Date(); // TS automatically knows this is a Date
const displayDate = currentDate.toLocaleDateString(); // TS knows this is a string


export const AgreementText = ({ Tenant, hostlerName }: AgreementText): string => {
  return `
╔════════════════════════════════════════════════════════════════╗
║                  HOSTEL RENTAL AGREEMENT                       ║
╚════════════════════════════════════════════════════════════════╝

Date: ${displayDate}

PARTIES TO THIS AGREEMENT:

  Hostel Owner (Lessor): "${hostlerName.toUpperCase()}"
  Tenant (Lessee): "${Tenant.toUpperCase()}"

This agreement sets forth the terms and conditions governing the rental
of hostel accommodation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARTICLE 1: RENTAL DETAILS

  1.1  Monthly rent shall be paid on or before the 5th of each month
  1.2  Token amount: 5% of monthly rent (required to confirm booking)
  1.3  Token amount will be adjusted against the first month's rent

ARTICLE 2: DURATION & NOTICE

  2.1  Minimum stay period: Three (3) months
  2.2  Notice period for vacating: One (1) month in advance

ARTICLE 3: FACILITIES & AMENITIES

  3.1  All amenities as specified in the listing shall be provided
  3.2  Tenant shall be liable for any damage to hostel property
  3.3  Damage charges will be assessed and billed separately

ARTICLE 4: HOUSE RULES & REGULATIONS

  4.1  Maintain cleanliness and hygiene at all times
  4.2  Illegal activities are strictly prohibited on premises
  4.3  Visitor hours: 9:00 AM to 9:00 PM only
  4.4  Smoking and alcohol consumption are strictly prohibited

ARTICLE 5: SECURITY DEPOSIT

  5.1  Amount: One (1) month's rent (fully refundable)
  5.2  Deposit shall be refunded after satisfactory inspection
  5.3  Refund processed within 15 days of vacating

ARTICLE 6: UTILITIES & SERVICES

  6.1  Electricity and water: As per agreed terms
  6.2  Internet charges: Included in rent (where applicable)
  6.3  Utility usage shall be reasonable and monitored

ARTICLE 7: TERMINATION CLAUSE

  7.1  Either party may terminate with one (1) month written notice
  7.2  Immediate termination permitted for rule violations
  7.3  Refunds subject to terms and property condition

ARTICLE 8: DISPUTE RESOLUTION

  8.1  Disputes shall be resolved through amicable discussion
  8.2  Local jurisdiction shall apply in case of legal proceedings

ARTICLE 9: PAYMENT SCHEDULE

  9.1  Token Payment: 5% of monthly rent (non-refundable if tenant cancels)
  9.2  First Month Rent: Due before moving in
  9.3  Security Deposit: Due before moving in
  9.4  All payments to be made via agreed payment method

ARTICLE 10: BOOKING CONFIRMATION

  10.1  Booking confirmed only upon receipt of token payment
  10.2  Hostel owner reserves the right to accept or reject any booking
  10.3  Confirmation receipt will be provided via email/message

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ACKNOWLEDGMENT & ACCEPTANCE

By proceeding with the token payment, the Tenant acknowledges that they
have read, understood, and agree to be bound by all terms and conditions
set forth in this agreement.

This is a legally binding agreement. Please read all terms carefully
before confirming your booking.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Document Version: January 2026
Agreement Reference: HST-${displayDate.replace(/\//g, '')}-${Tenant.substring(0, 3).toUpperCase()}

© ${new Date().getFullYear()} All Rights Reserved

`;
};