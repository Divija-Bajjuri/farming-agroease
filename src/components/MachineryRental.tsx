import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, User } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import BookingModal, { BookingData } from './BookingModal';

// Local interface for UI (camelCase)
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

// Convert API machine to UI machine
const convertMachineFromAPI = (apiMachine: any): Machine => ({
  id: apiMachine.id,
  name: apiMachine.name,
  type: apiMachine.type,
  pricePerHour: apiMachine.price_per_hour,
  pricePerDay: apiMachine.price_per_day,
  location: apiMachine.location,
  contact: apiMachine.contact,
  available: apiMachine.available,
  owner: apiMachine.owner_name || 'Unknown Owner',
  image: apiMachine.image_url || '',
});

interface Booking {
  id: string;
  machineId: string;
  machineName: string;
  machineType: string;
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
  status: 'pending' | 'approved' | 'completed';
}

const MACHINE_TYPES = ['Tractor', 'Harvester', 'Rotavator', 'Seed Drill', 'Sprayer', 'Thresher', 'Plough', 'Cultivator'];

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

const SAMPLE_MACHINES: Machine[] = [
  { id: '1', name: 'Mahindra 575 DI', type: 'Tractor', pricePerHour: 500, pricePerDay: 3500, location: 'Warangal', contact: '9876543210', available: true, owner: 'Ramesh Kumar', image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=400&h=300&fit=crop' },
  { id: '2', name: 'John Deere 5310', type: 'Tractor', pricePerHour: 600, pricePerDay: 4000, location: 'Karimnagar', contact: '9876543211', available: true, owner: 'Suresh Reddy', image: 'https://images.unsplash.com/photo-1535040904129-5c4d3b16fdef?w=400&h=300&fit=crop' },
  { id: '3', name: 'Kubota DC-68G', type: 'Harvester', pricePerHour: 1200, pricePerDay: 8000, location: 'Nizamabad', contact: '9876543212', available: true, owner: 'Venkat Rao', image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400&h=300&fit=crop' },
  { id: '4', name: 'Shaktiman Rotavator', type: 'Rotavator', pricePerHour: 400, pricePerDay: 2500, location: 'Khammam', contact: '9876543213', available: true, owner: 'Prasad Goud', image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop' },
  { id: '5', name: 'Swaraj 744 FE', type: 'Tractor', pricePerHour: 550, pricePerDay: 3800, location: 'Adilabad', contact: '9876543214', available: false, owner: 'Narasimha', image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=400&h=300&fit=crop' },
  { id: '6', name: 'Preet 949', type: 'Harvester', pricePerHour: 1000, pricePerDay: 7000, location: 'Nalgonda', contact: '9876543215', available: true, owner: 'Srinivas', image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400&h=300&fit=crop' },
  { id: '7', name: 'Fieldking Seed Drill', type: 'Seed Drill', pricePerHour: 350, pricePerDay: 2000, location: 'Medak', contact: '9876543216', available: true, owner: 'Raju', image: 'https://images.unsplash.com/photo-1586190848861-99c8a3da799c?w=400&h=300&fit=crop' },
  { id: '8', name: 'Aspee Sprayer', type: 'Sprayer', pricePerHour: 200, pricePerDay: 1200, location: 'Rangareddy', contact: '9876543217', available: true, owner: 'Mahesh', image: 'https://images.unsplash.com/photo-1615816661694-999c9a1a1d47?w=400&h=300&fit=crop' },
  { id: '9', name: 'Sonalika Tiger', type: 'Tractor', pricePerHour: 450, pricePerDay: 3200, location: 'Mahabubnagar', contact: '9876543218', available: true, owner: 'Balaji', image: 'https://images.unsplash.com/photo-1535040904129-5c4d3b16fdef?w=400&h=300&fit=crop' },
  { id: '10', name: 'Landforce Cultivator', type: 'Cultivator', pricePerHour: 300, pricePerDay: 1800, location: 'Siddipet', contact: '9876543219', available: true, owner: 'Ganesh', image: 'https://images.unsplash.com/photo-1586190848861-99c8a3da799c?w=400&h=300&fit=crop' },
];

const MachineryRental: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { darkMode, setCurrentPage, addNotification } = useApp();
  const [machines, setMachines] = useState<Machine[]>(SAMPLE_MACHINES);
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [bookingModalMachine, setBookingModalMachine] = useState<Machine | null>(null);
  const [addForm, setAddForm] = useState({ 
    name: '', 
    type: 'Tractor', 
    pricePerHour: '', 
    pricePerDay: '', 
    location: '', 
    contact: '',
    image: ''
  });

  // Try to fetch machines from Supabase on mount
  useEffect(() => {
    const loadMachines = async () => {
      try {
        setIsLoading(true);
        // Import dynamically to avoid issues if Supabase is not configured
        const { fetchMachines } = await import('@/lib/machinery-api');
        const apiMachines = await fetchMachines();
        if (apiMachines && apiMachines.length > 0) {
          setMachines(apiMachines.map(convertMachineFromAPI));
        }
      } catch (error) {
        console.log('Using sample machines (Supabase not available)');
      } finally {
        setIsLoading(false);
      }
    };
    loadMachines();
  }, []);

  // Get user profile for booking modal
  const getUserProfile = () => {
    if (user) {
      return {
        name: user.name || '',
        mobile: user.phone || '',
        location: user.location || '',
      };
    }
    return null;
  };

  const filtered = machines.filter(m => {
    if (searchType && m.type !== searchType) return false;
    if (searchLocation && !m.location.toLowerCase().includes(searchLocation.toLowerCase())) return false;
    return true;
  });

  // Handle booking confirmation
  const handleBookingConfirm = (bookingData: BookingData) => {
    const newBooking: Booking = {
      id: Date.now().toString(),
      machineId: bookingData.machineId,
      machineName: bookingData.machineName,
      machineType: bookingData.machineType,
      farmerName: bookingData.farmerName,
      contactNumber: bookingData.contactNumber,
      location: bookingData.location,
      fromDate: bookingData.fromDate,
      toDate: bookingData.toDate,
      fromTime: bookingData.fromTime || '',
      toTime: bookingData.toTime || '',
      totalDays: bookingData.totalDays,
      totalHours: bookingData.totalHours || 0,
      totalPrice: bookingData.totalPrice,
      bookingType: bookingData.bookingType || 'daily',
      status: 'pending',
    };
    
    setBookings(prev => [...prev, newBooking]);
    setBookingModalMachine(null);
    
    addNotification({
      title: t('mach.bookingSuccessTitle'),
      message: bookingData.bookingType === 'hourly'
        ? `${bookingData.machineName} - ${bookingData.totalHours} ${t('mach.hours')} - ₹${bookingData.totalPrice}`
        : `${bookingData.machineName} - ${bookingData.totalDays} ${t('mach.days')} - ₹${bookingData.totalPrice}`,
      type: 'success',
    });
  };

  const handleAddMachine = () => {
    if (!addForm.name || !addForm.location) return;
    addNotification({
      title: language === 'hi' ? 'मशीन जोड़ी गई' : language === 'te' ? 'Machine added' : 'Machine Added',
      message: addForm.name,
      type: 'success',
    });
    setShowAddForm(false);
    setAddForm({ name: '', type: 'Tractor', pricePerHour: '', pricePerDay: '', location: '', contact: '', image: '' });
  };

  const getMachineImage = (type: string, imageUrl: string) => {
    if (imageUrl) return imageUrl;
    return MACHINE_IMAGES[type] || DEFAULT_IMAGE;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentPage('dashboard')} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
              <svg className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('mach.title')}</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowBookings(!showBookings)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              {t('mach.myBookings')} {bookings.length > 0 && `(${bookings.length})`}
            </button>
            <button onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition">
              + {t('mach.addListing')}
            </button>
          </div>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl p-6 mb-6`}>
            <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>{t('mach.addListing')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder={t('mach.machineName')} value={addForm.name} onChange={e => setAddForm({ ...addForm, name: e.target.value })}
                className={`px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'} focus:border-green-500`} />
              <select value={addForm.type} onChange={e => setAddForm({ ...addForm, type: e.target.value })}
                className={`px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'} focus:border-green-500`}>
                {MACHINE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              <input type="number" placeholder={`${t('mach.price')} ${t('mach.perHour')}`} value={addForm.pricePerHour} onChange={e => setAddForm({ ...addForm, pricePerHour: e.target.value })}
                className={`px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'} focus:border-green-500`} />
              <input type="number" placeholder={`${t('mach.price')} ${t('mach.perDay')}`} value={addForm.pricePerDay} onChange={e => setAddForm({ ...addForm, pricePerDay: e.target.value })}
                className={`px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'} focus:border-green-500`} />
              <input type="text" placeholder={t('weather.location')} value={addForm.location} onChange={e => setAddForm({ ...addForm, location: e.target.value })}
                className={`px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'} focus:border-green-500`} />
              <input type="tel" placeholder={t('mach.contact')} value={addForm.contact} onChange={e => setAddForm({ ...addForm, contact: e.target.value })}
                className={`px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'} focus:border-green-500`} />
              <input type="url" placeholder="Image URL (optional)" value={addForm.image} onChange={e => setAddForm({ ...addForm, image: e.target.value })}
                className={`px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'} focus:border-green-500`} />
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={handleAddMachine} className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700">{t('common.submit')}</button>
              <button onClick={() => setShowAddForm(false)} className={`px-6 py-3 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} font-semibold rounded-xl`}>{t('common.cancel')}</button>
            </div>
          </div>
        )}

        {/* Bookings */}
        {showBookings && bookings.length > 0 && (
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl p-6 mb-6`}>
            <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>{t('mach.myBookings')}</h3>
            <div className="space-y-3">
              {bookings.map(b => (
                <div key={b.id} className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-xl p-4`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{b.machineName}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{b.machineType}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      b.status === 'approved' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{t(`mach.${b.status}`)}</span>
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {b.bookingType === 'hourly' 
                      ? `${b.fromDate} (${b.fromTime} - ${b.toTime}) - ${b.totalHours} hours`
                      : `${b.fromDate} to ${b.toDate} (${b.totalDays} days)`
                    }
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>📍 {b.location}</span>
                    <span className={`font-bold text-lg ${darkMode ? 'text-green-400' : 'text-green-700'}`}>₹{b.totalPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Filters */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl p-4 mb-6`}>
          <div className="flex flex-col sm:flex-row gap-3">
            <select value={searchType} onChange={e => setSearchType(e.target.value)}
              className={`flex-1 px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'} focus:border-green-500`}>
              <option value="">{language === 'hi' ? 'सभी प्रकार' : language === 'te' ? 'All Types' : 'All Types'}</option>
              {MACHINE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
            <input type="text" value={searchLocation} onChange={e => setSearchLocation(e.target.value)}
              placeholder={language === 'hi' ? 'स्थान खोजें...' : language === 'te' ? 'Search location...' : 'Search location...'}
              className={`flex-1 px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'} focus:border-green-500`} />
          </div>
        </div>

        {/* Machine Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(machine => (
            <div key={machine.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl overflow-hidden hover:shadow-lg transition`}>
              {/* Machine Image */}
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={getMachineImage(machine.type, machine.image)} 
                  alt={machine.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
                  }}
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${machine.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {machine.available ? t('mach.available') : t('mach.booked')}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-2">
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{machine.name}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{machine.type}</p>
                </div>
                {/* Owner Info */}
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${darkMode ? 'bg-green-700' : 'bg-green-100'}`}>
                    <span className={`text-xs font-bold ${darkMode ? 'text-green-300' : 'text-green-700'}`}>{machine.owner.charAt(0)}</span>
                  </div>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{machine.owner}</span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{machine.location}</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{machine.pricePerHour}</span>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>/hour</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{machine.pricePerDay}</span>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>/day</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => machine.available && setBookingModalMachine(machine)} 
                    disabled={!machine.available}
                    className="flex-1 py-2.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition disabled:opacity-50 text-sm"
                  >
                    {t('mach.book')}
                  </button>
                  <a href={`tel:${machine.contact}`}
                    className={`px-3 py-2.5 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} rounded-xl flex items-center`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {bookingModalMachine && (
          <BookingModal 
            machine={bookingModalMachine}
            userProfile={getUserProfile()}
            onClose={() => setBookingModalMachine(null)}
            onConfirm={handleBookingConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default MachineryRental;
