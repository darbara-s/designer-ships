'use client';

import { School } from '@/lib/mockData';
import { X, MapPin, Star, Phone, Mail, Globe, Languages, Euro, CheckCircle, XCircle, Zap } from 'lucide-react';
import clsx from 'clsx';

interface SchoolDetailModalProps {
  school: School;
  onClose: () => void;
}

function PassRateBadge({ rate }: { rate: number }) {
  const { color, label } = rate >= 90
    ? { color: 'text-emerald-700 bg-emerald-50 border-emerald-200', label: 'Excellent' }
    : rate >= 80
    ? { color: 'text-green-700 bg-green-50 border-green-200', label: 'Very Good' }
    : rate >= 70
    ? { color: 'text-yellow-700 bg-yellow-50 border-yellow-200', label: 'Good' }
    : { color: 'text-orange-700 bg-orange-50 border-orange-200', label: 'Fair' };

  return (
    <div className={clsx('flex flex-col items-center p-4 rounded-2xl border-2', color)}>
      <span className="text-4xl font-extrabold">{rate}%</span>
      <span className="text-sm font-semibold mt-1">Pass Rate</span>
      <span className="text-xs mt-0.5 opacity-80">{label}</span>
    </div>
  );
}

export function SchoolDetailModal({ school, onClose }: SchoolDetailModalProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(school.overall_rating));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative overflow-hidden isolate">
        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image */}
          <div className="relative h-52 bg-gray-200 shrink-0 overflow-hidden">
            <img
              src={school.logo_url}
              alt={school.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors z-10"
            >
              <X size={18} className="text-gray-700" />
            </button>
            <div className="absolute bottom-4 left-6">
              <h2 className="text-2xl font-extrabold text-white">{school.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  {stars.map((filled, i) => (
                    <Star key={i} size={14} className={clsx('fill-current', filled ? 'text-yellow-400' : 'text-gray-400')} />
                  ))}
                </div>
                <span className="text-white font-bold text-sm">{school.overall_rating}</span>
                <span className="text-white/70 text-sm">({school.total_reviews} reviews)</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Quick Facts */}
            <div className="grid grid-cols-3 gap-3">
              <PassRateBadge rate={school.pass_rate} />

              <div className="flex flex-col items-center p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <Euro size={24} className="text-gray-500 mb-1" />
                <span className="text-2xl font-extrabold text-gray-800">{"€".repeat(school.price_class || 1)}</span>
                <span className="text-xs text-gray-500 mt-0.5">Price Range</span>
              </div>

              <div className="flex flex-col items-center p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <div className={clsx('w-3 h-3 rounded-full mb-2', true ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300')} />
                <span className="text-sm font-bold text-gray-800 text-center">
                  {'Accepting Students'}
                </span>
                <span className="text-xs text-gray-500 mt-0.5">Availability</span>
              </div>
            </div>

            {/* Address & Languages */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-2xl">
                <MapPin size={18} className="text-rose-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-gray-800">{school.address}</div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(school.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-rose-500 hover:underline font-medium"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-2xl">
                <Languages size={18} className="text-rose-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide">Languages Offered</div>
                  <div className="flex gap-2 flex-wrap">
                    {school.languages.map(lang => (
                      <span key={lang} className="text-sm font-semibold bg-rose-50 text-rose-700 px-2 py-1 rounded-lg">{lang}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Intensive Courses', value: school.has_intensive_course },
                  { label: 'Accepting Students', value: true },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-2 text-sm">
                    {value
                      ? <CheckCircle size={18} className="text-emerald-500" />
                      : <XCircle size={18} className="text-gray-300" />
                    }
                    <span className={value ? 'text-gray-800 font-medium' : 'text-gray-400'}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom CTA Bar */}
        <div className="p-4 bg-white border-t border-gray-100 flex items-stretch gap-2 shrink-0 rounded-b-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] w-full overflow-hidden">
          {/* WhatsApp style CTA - BIG */}
          <a
            href={`https://wa.me/?text=Hi, I'm interested in lessons at ${encodeURIComponent(school.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-0 flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-3 px-3 sm:px-4 rounded-full transition-colors text-xs sm:text-sm"
          >
            <Zap size={16} className="shrink-0" />
            <span className="truncate">Send WhatsApp Inquiry</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:info@school.de?subject=Inquiry from Fahrly - ${school.name}`}
            className="flex shrink-0 items-center justify-center gap-1.5 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-3 sm:px-4 rounded-full transition-colors text-xs sm:text-sm whitespace-nowrap"
          >
            <Mail size={16} className="text-gray-600 shrink-0" />
            <span>Email</span>
          </a>

          {/* Call */}
          <a
            href="tel:+4930000000"
            className="flex shrink-0 items-center justify-center gap-1.5 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-3 sm:px-4 rounded-full transition-colors text-xs sm:text-sm whitespace-nowrap"
          >
            <Phone size={16} className="text-gray-600 shrink-0" />
            <span>Call</span>
          </a>
        </div>
      </div>
    </div>
  );
}
