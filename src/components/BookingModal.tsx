import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';

interface Machine {
  id: string;
  name: string;
  type: string;
  pricePerHour: number;
  pricePerDay: number;
  location: string;
  contact: string;
  available: boolean;
  owner: string;
  image: string;
}

interface UserProfile {
  name: string;
  mobile: string;
  location?: string;
  village?: string;
  district?: string;
  state?: string;
}

interface BookingModalProps {
  machine: Machine;
  userProfile: UserProfile | null;
  onClose: () => void;
  onConfirm: (bookingData: BookingData) => void;
}

export interface BookingData {
  machineId: string;
  machineName: string;
  machineType: string;
  pricePerHour: number;
  pricePerDay: number;
  farmerName: string;
  contactNumber: string;
  location: string;
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
  totalDays: number;
  totalHours: number;
  totalPrice: number;
  bookingType: 'hourly' | 'daily';
}

// Machine images based on type
const MACHINE_IMAGES: Record<string, string> = {
  'Tractor': 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=400&h=300&fit=crop',
  'Harvester': 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400&h=300&fit=crop',
  'Rotavator': 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop',
  'Seed Drill': 'https://images.unsplash.com/photo-1586190848861-99c8a3da799c?w=400&h=300&fit=crop',
  'Sprayer': 'https://images.unsplash.com/photo-1615816661694-999c9a1a1d47?w=400&h=300&fit=crop',
  'Thresher': 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=400&h=300&fit=crop',
  'Plough': 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop',
  'Cultivator': 'https://images.unsplash.com/photo-1586190848861-99c8a3da799c?w=400&h=300&fit=crop',
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=400&h=300&fit=crop';

const BookingModal: React.FC<BookingModalProps> = ({ machine, userProfile, onClose, onConfirm }) => {
  const { t, language } = useLanguage();
  const { darkMode, addNotification } = useApp();

  // Form state
  const [farmerName, setFarmerName] = useState(userProfile?.name || '');
  const [contactNumber, setContactNumber] = useState(userProfile?.mobile || '');
  const [location, setLocation] = useState(machine.location || '');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [fromTime, setFromTime] = useState('09:00');
  const [toTime, setToTime] = useState('18:00');
  const [bookingType, setBookingType] = useState<'hourly' | 'daily'>('daily');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get today's date for min date
  const today = new Date().toISOString().split('T')[0];

  // Calculate total
  const calculateTotal = () => {
    if (bookingType === 'daily') {
      if (!fromDate || !toDate) return { days: 0, hours: 0, price: 0 };
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return { days: diffDays > 0 ? diffDays : 0, hours: 0, price: diffDays > 0 ? diffDays * machine.pricePerDay : 0 };
    } else {
      // Hourly booking
      if (!fromDate || !fromTime || !toTime) return { days: 0, hours: 0, price: 0 };
      const start = new Date(`${fromDate}T${fromTime}`);
      const end = new Date(`${fromDate}T${toTime}`);
      const diffTime = end.getTime() - start.getTime();
      const hours = Math.ceil(diffTime / (1000 * 60 * 60));
      return { days: 0, hours: hours > 0 ? hours : 0, price: hours > 0 ? hours * machine.pricePerHour : 0 };
    }
  };

  const { days: totalDays, hours: totalHours, price: totalPrice } = calculateTotal();

  // Get machine image
  const getMachineImage = (type: string, imageUrl: string) => {
    if (imageUrl) return imageUrl;
    return MACHINE_IMAGES[type] || DEFAULT_IMAGE;
  };

  // GPS Location detection
  const detectLocation = () => {
    if (!navigator.geolocation) {
      addNotification({
        title: language === 'hi' ? 'GPS समर्थित नहीं' : language === 'te' ? 'GPS support లేదు' : 'GPS Not Supported',
        message: language === 'hi' ? 'आपका ब्राउज़र GPS सपोर्ट नहीं करता' : language === 'te' ? 'Your browser does not support GPS' : 'Your browser does not support GPS',
        type: 'error',
      });
      return;
    }

    setIsLoadingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Try to get location name using reverse geocoding
          // Using a free geocoding API
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          const locationName = data.address?.city || 
                              data.address?.town || 
                              data.address?.village || 
                              data.address?.county ||
                              data.display_name?.split(',')[0] ||
                              `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
          
          setLocation(locationName);
          addNotification({
            title: language === 'hi' ? 'स्थान मिला' : language === 'te' ? 'Location found' : 'Location Found',
            message: locationName,
            type: 'success',
          });
        } catch (error) {
          // If reverse geocoding fails, use coordinates
          setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
          console.error('Geocoding error:', error);
        }
        
        setIsLoadingLocation(false);
      },
      (error) => {
        setIsLoadingLocation(false);
        let errorMessage = language === 'hi' ? 'स्थान पता नहीं चला' : language === 'te' ? 'Location not detected' : 'Could not detect location';
        
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = language === 'hi' ? 'स्थान की अनुमति अस्वीकृत' : language === 'te' ? 'Location permission denied' : 'Location permission denied';
        }
        
        addNotification({
          title: language === 'hi' ? 'GPS त्रुटि' : language === 'te' ? 'GPS error' : 'GPS Error',
          message: errorMessage,
          type: 'error',
        });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Validation
  const validateForm = () => {
    if (!farmerName.trim()) {
      addNotification({
        title: language === 'hi' ? 'नाम आवश्यक' : language === 'te' ? 'Name required' : 'Name Required',
        message: language === 'hi' ? 'कृपया अपना नाम दर्ज करें' : language === 'te' ? 'Please enter your name' : 'Please enter your name',
        type: 'error',
      });
      return false;
    }

    if (!contactNumber.trim() || contactNumber.length < 10) {
      addNotification({
        title: language === 'hi' ? 'संपर्क आवश्यक' : language === 'te' ? 'Contact required' : 'Contact Required',
        message: language === 'hi' ? 'कृपया सही संपर्क दर्ज करें' : language === 'te' ? 'Please enter valid contact' : 'Please enter a valid contact number',
        type: 'error',
      });
      return false;
    }

    if (!location.trim()) {
      addNotification({
        title: language === 'hi' ? 'स्थान आवश्यक' : language === 'te' ? 'Location required' : 'Location Required',
        message: language === 'hi' ? 'कृपया स्थान दर्ज करें' : language === 'te' ? 'Please enter location' : 'Please enter location',
        type: 'error',
      });
      return false;
    }

    if (bookingType === 'daily') {
      if (!fromDate || !toDate) {
        addNotification({
          title: language === 'hi' ? 'तारीखें आवश्यक' : language === 'te' ? 'Dates required' : 'Dates Required',
          message: language === 'hi' ? 'कृपया तारीखें चुनें' : language === 'te' ? 'Please select dates' : 'Please select both dates',
          type: 'error',
        });
        return false;
      }

      if (totalDays <= 0) {
        addNotification({
          title: language === 'hi' ? 'अमान्य तारीखें' : language === 'te' ? 'Invalid dates' : 'Invalid Dates',
          message: language === 'hi' ? 'कृपया वैध तारीखें चुनें' : language === 'te' ? 'Please select valid dates' : 'Please select valid dates',
          type: 'error',
        });
        return false;
      }
    } else {
      // Hourly booking validation
      if (!fromDate || !fromTime || !toTime) {
        addNotification({
          title: language === 'hi' ? 'समय आवश्यक' : language === 'te' ? 'Time required' : 'Time Required',
          message: language === 'hi' ? 'कृपया समय चुनें' : language === 'te' ? 'Please select time' : 'Please select time slots',
          type: 'error',
        });
        return false;
      }

      if (totalHours <= 0) {
        addNotification({
          title: language === 'hi' ? 'अमान्य समय' : language === 'te' ? 'Invalid time' : 'Invalid Time',
          message: language === 'hi' ? 'कृपया वैध समय चुनें' : language === 'te' ? 'Please select valid time' : 'Please select valid time range',
          type: 'error',
        });
        return false;
      }
    }

    return true;
  };

  // Handle booking confirmation
  const handleConfirm = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    const { days: totalDays, hours: totalHours, price: totalPrice } = calculateTotal();

    const bookingData: BookingData = {
      machineId: machine.id,
      machineName: machine.name,
      machineType: machine.type,
      pricePerHour: machine.pricePerHour,
      pricePerDay: machine.pricePerDay,
      farmerName: farmerName.trim(),
      contactNumber: contactNumber.trim(),
      location: location.trim(),
      fromDate,
      toDate: bookingType === 'hourly' ? fromDate : toDate,
      fromTime: bookingType === 'hourly' ? fromTime : '',
      toTime: bookingType === 'hourly' ? toTime : '',
      totalDays,
      totalHours,
      totalPrice,
      bookingType,
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onConfirm(bookingData);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 w-full max-w-lg max-h-[95vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {language === 'hi' ? 'मशीन बुक करें' : language === 'te' ? 'యంత్రం బుక్ చేసుకోండి' : 'Book Machine'}
          </h3>
          <button onClick={onClose} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Machine Image */}
        <div className="mb-4 rounded-xl overflow-hidden h-40 relative">
          <img 
            src={getMachineImage(machine.type, machine.image)} 
            alt={machine.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
            }}
          />
          <div className="absolute top-2 right-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${machine.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {machine.available ? (language === 'hi' ? 'उपलब्ध' : language === 'te' ? 'ailable' : 'Available') : (language === 'hi' ? 'बुक' : language === 'te' ? 'Booked' : 'Booked')}
            </span>
          </div>
        </div>

        {/* Machine Info (Read Only) */}
        <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-xl p-4 mb-4`}>
          <h4 className={`font-bold text-sm mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {language === 'hi' ? 'मशीन जानकारी' : language === 'te' ? 'యంత్ర సమాచారం' : 'Machine Information'}
          </h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className={`block ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
                {language === 'hi' ? 'नाम' : language === 'te' ? 'पేరు' : 'Name'}
              </span>
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{machine.name}</span>
            </div>
            <div>
              <span className={`block ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
                {language === 'hi' ? 'प्रकार' : language === 'te' ? 'రకం' : 'Type'}
              </span>
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{machine.type}</span>
            </div>
            <div>
              <span className={`block ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
                {language === 'hi' ? 'प्रति घंटा' : language === 'te' ? ' గంటకు' : '/Hour'}
              </span>
              <span className={`font-semibold text-green-600`}>₹{machine.pricePerHour}</span>
            </div>
            <div>
              <span className={`block ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
                {language === 'hi' ? 'प्रति दिन' : language === 'te' ? 'రోజుకు' : '/Day'}
              </span>
              <span className={`font-semibold text-green-600`}>₹{machine.pricePerDay}</span>
            </div>
          </div>
        </div>

        {/* Owner Details */}
        <div className={`${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'} rounded-xl p-4 mb-4`}>
          <h4 className={`font-bold text-sm mb-3 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
            {language === 'hi' ? 'मालिक जानकारी' : language === 'te' ? 'Owner Details' : 'Owner Details'}
          </h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-purple-700' : 'bg-purple-100'}`}>
                <span className={`text-lg font-bold ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>{machine.owner.charAt(0)}</span>
              </div>
              <div>
                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{machine.owner}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>📍 {machine.location}</p>
              </div>
            </div>
            <a 
              href={`tel:${machine.contact}`}
              className="px-4 py-2 bg-green-600 text-white rounded-xl flex items-center gap-2 hover:bg-green-700 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {language === 'hi' ? 'कॉल' : language === 'te' ? 'Call' : 'Call'}
            </a>
          </div>
        </div>

        {/* Booking Type Selection */}
        <div className={`${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'} rounded-xl p-4 mb-4`}>
          <h4 className={`font-bold text-sm mb-3 ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>
            {language === 'hi' ? 'बुकिंग प्रकार' : language === 'te' ? 'Booking Type' : 'Booking Type'}
          </h4>
          <div className="flex gap-3">
            <button
              onClick={() => setBookingType('daily')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition ${
                bookingType === 'daily' 
                  ? 'bg-orange-600 text-white' 
                  : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`
              }`}
            >
              📅 {language === 'hi' ? 'दैनिक' : language === 'te' ? 'Daily' : 'Daily'}
              <span className="block text-xs opacity-75">₹{machine.pricePerDay}/{language === 'hi' ? 'दिन' : language === 'te' ? 'day' : 'day'}</span>
            </button>
            <button
              onClick={() => setBookingType('hourly')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition ${
                bookingType === 'hourly' 
                  ? 'bg-orange-600 text-white' 
                  : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`
              }`}
            >
              ⏰ {language === 'hi' ? 'प्रति घंटा' : language === 'te' ? 'Hourly' : 'Hourly'}
              <span className="block text-xs opacity-75">₹{machine.pricePerHour}/{language === 'hi' ? 'घंटा' : language === 'te' ? 'hr' : 'hr'}</span>
            </button>
          </div>
        </div>

        {/* User Information (Editable) */}
        <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-xl p-4 mb-4`}>
          <h4 className={`font-bold text-sm mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
            {language === 'hi' ? 'किसान जानकारी' : language === 'te' ? 'రైతు సమాచారం' : 'Farmer Information'}
          </h4>
          <div className="space-y-3">
            <div>
              <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
                {language === 'hi' ? 'किसान का नाम' : language === 'te' ? 'రైతు పేరు' : 'Farmer Name'} *
              </label>
              <input 
                type="text" 
                value={farmerName} 
                onChange={e => setFarmerName(e.target.value)}
                placeholder={language === 'hi' ? 'अपना नाम दर्ज करें' : language === 'te' ? 'Your name' : 'Enter your name'}
                className={`w-full px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
                {language === 'hi' ? 'संपर्क नंबर' : language === 'te' ? 'Contact number' : 'Contact Number'} *
              </label>
              <input 
                type="tel" 
                value={contactNumber} 
                onChange={e => setContactNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="9876543210"
                maxLength={10}
                className={`w-full px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
                {language === 'hi' ? 'स्थान' : language === 'te' ? 'Location' : 'Location'} *
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={location} 
                  onChange={e => setLocation(e.target.value)}
                  placeholder={language === 'hi' ? 'अपना स्थान दर्ज करें' : language === 'te' ? 'Enter location' : 'Enter location'}
                  className={`flex-1 px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'}`}
                />
                <button 
                  type="button"
                  onClick={detectLocation}
                  disabled={isLoadingLocation}
                  className={`px-4 py-3 rounded-xl flex items-center gap-2 ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition`}
                >
                  {isLoadingLocation ? (
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Dates */}
        <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-xl p-4 mb-4`}>
          <h4 className={`font-bold text-sm mb-3 ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
            {bookingType === 'hourly' 
              ? (language === 'hi' ? 'समय स्लॉट' : language === 'te' ? 'Time Slots' : 'Time Slots')
              : (language === 'hi' ? 'बुकिंग तारीखें' : language === 'te' ? 'Booking Dates' : 'Booking Dates')
            }
          </h4>
          {bookingType === 'hourly' ? (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
                  {language === 'hi' ? 'तारीख' : language === 'te' ? 'Date' : 'Date'} *
                </label>
                <input 
                  type="date" 
                  value={fromDate} 
                  onChange={e => setFromDate(e.target.value)}
                  min={today}
                  className={`w-full px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
                  {language === 'hi' ? 'से' : language === 'te' ? 'From' : 'From'} *
                </label>
                <select 
                  value={fromTime} 
                  onChange={e => setFromTime(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'}`}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 6).map(hour => (
                    <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                      {hour.toString().padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
                  {language === 'hi' ? 'तक' : language === 'te' ? 'To' : 'To'} *
                </label>
                <select 
                  value={toTime} 
                  onChange={e => setToTime(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'}`}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 6).map(hour => (
                    <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                      {hour.toString().padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
                  {language === 'hi' ? 'से' : language === 'te' ? 'From' : 'From'} *
                </label>
                <input 
                  type="date" 
                  value={fromDate} 
                  onChange={e => setFromDate(e.target.value)}
                  min={today}
                  className={`w-full px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
                  {language === 'hi' ? 'तक' : language === 'te' ? 'To' : 'To'} *
                </label>
                <input 
                  type="date" 
                  value={toDate} 
                  onChange={e => setToDate(e.target.value)}
                  min={fromDate || today}
                  className={`w-full px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'}`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Price Summary */}
        {(bookingType === 'daily' ? totalDays > 0 : totalHours > 0) && (
          <div className={`${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'} rounded-xl p-4 mb-4`}>
            {bookingType === 'daily' ? (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {language === 'hi' ? 'कुल दिन' : language === 'te' ? 'Total days' : 'Total Days'}:
                  </span>
                  <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {totalDays} {totalDays === 1 ? 'day' : 'days'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {language === 'hi' ? 'कुल कीमत' : language === 'te' ? 'Total price' : 'Total Price'}:
                  </span>
                  <span className={`font-bold text-2xl ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    ₹{totalPrice}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {language === 'hi' ? 'कुल घंटे' : language === 'te' ? 'Total hours' : 'Total Hours'}:
                  </span>
                  <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {totalHours} {totalHours === 1 ? 'hour' : 'hours'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {language === 'hi' ? 'कुल कीमत' : language === 'te' ? 'Total price' : 'Total Price'}:
                  </span>
                  <span className={`font-bold text-2xl ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    ₹{totalPrice}
                  </span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={handleConfirm}
            disabled={isSubmitting || !machine.available}
            className="flex-1 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2 transition"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {language === 'hi' ? 'बुक हो रहा है...' : language === 'te' ? 'Booking...' : 'Booking...'}
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {language === 'hi' ? 'बुकिंग की पुष्टि करें' : language === 'te' ? 'Confirm booking' : 'Confirm Booking'}
              </>
            )}
          </button>
          <button 
            onClick={onClose}
            className={`px-6 py-4 ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-semibold rounded-xl transition`}
          >
            {language === 'hi' ? 'रद्द करें' : language === 'te' ? 'Cancel' : 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
