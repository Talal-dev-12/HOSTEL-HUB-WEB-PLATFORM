import { Home, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Hostel Hub</span>
            </div>
            <p className="text-sm text-gray-400">
              Your trusted platform for finding the perfect hostel. Connecting students and job holders with quality accommodation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">List Your Hostel</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>support@hostelhub.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+92-300-1234567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Karachi, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Hostel Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
