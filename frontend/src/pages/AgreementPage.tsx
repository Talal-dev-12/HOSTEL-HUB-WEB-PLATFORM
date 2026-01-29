import { useEffect, useState } from "react";
import { FileText, AlertCircle, CheckCircle } from "lucide-react";
import { AgreementText } from "../data/mockData";
import { Hostel, Page } from "../types/index";
import { useNavigate, useParams } from "react-router-dom";
import { NotFound } from "../components/NotFound";
import { User } from "../types/index";
import { singleHostel } from "../api/hostels";

export function AgreementPage() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const Navigate = useNavigate();

  const { id } = useParams<string>();

  const [hostel , setHostel] = useState<Hostel>()

  useEffect(() => {
      if (!id) return;
      (async () => {
        try {
          const res = await singleHostel(id);
          console.log("Full Hostel Data:", res.data.hostel);
          setHostel(res.data.hostel);
        } catch (error) {
          console.error("Error fetching hostel:", error);
        }
      })();
    }, [id]);

  const [hasScrolled, setHasScrolled] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrolledToBottom =
      element.scrollHeight - element.scrollTop <= element.clientHeight + 50;

    if (scrolledToBottom && !hasScrolled) {
      setHasScrolled(true);
    }
  };
  const handleProceed = () => {
    if (agreed && hasScrolled) {
      Navigate(`/token-payment/${id}`);
    }
  };

  if(!hostel) return <NotFound/>

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Rental Agreement
              </h1>
              <p className="text-sm text-gray-600">
                Please read carefully before proceeding
              </p>
            </div>
          </div>

          {!hasScrolled && (
            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800">
                Please scroll through the entire agreement before you can
                proceed
              </p>
            </div>
          )}

          {hasScrolled && (
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">
                You have reviewed the complete agreement
              </p>
            </div>
          )}
        </div>

        {/* Agreement Text */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div
            onScroll={handleScroll}
            className="h-96 overflow-y-auto p-8 prose prose-sm max-w-none"
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {
                <AgreementText
                  Tenant={user?.name}
                  hostlerName={hostel?.hostlerName}
                />
              }
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Scroll to read the complete agreement</span>
              <span className={hasScrolled ? "text-green-600 font-medium" : ""}>
                {hasScrolled ? "✓ Complete" : "Reading..."}
              </span>
            </div>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <label className="flex items-start gap-4 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              disabled={!hasScrolled}
              className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <div className="flex-1">
              <p
                className={`font-medium ${hasScrolled ? "text-gray-900" : "text-gray-400"}`}
              >
                I have read and agree to the terms and conditions
              </p>
              <p className="text-sm text-gray-500 mt-1">
                By checking this box, you acknowledge that you have read and
                understood all terms
              </p>
            </div>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => Navigate(`/hostel-details/${id}`)}
            className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            Go Back
          </button>
          <button
            onClick={handleProceed}
            disabled={!agreed || !hasScrolled}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
          >
            Proceed to Payment
          </button>
        </div>

        {!hasScrolled && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Scroll through the agreement to enable the proceed button
          </p>
        )}
      </div>
    </div>
  );
}
