import React, { useState } from 'react';
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

interface BookingModalProps {
machine: Machine;
userProfile: UserProfile | null;
onClose: () => void;
onConfirm: (bookingData: BookingData) => void;
}

const MACHINE_IMAGES: Record<string, string> = {
  Tractor: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=400&h=300&fit=crop",
  Harvester: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400&h=300&fit=crop",
  Rotavator: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop",
  "Seed Drill": "https://images.unsplash.com/photo-1586190848861-99c8a3da799c?w=400&h=300&fit=crop",
  Sprayer: "https://images.unsplash.com/photo-1615816661694-999c9a1a1d47?w=400&h=300&fit=crop",
  Thresher: "https://images.unsplash.com/photo-1535040904129-5c4d3b16fdef?w=400&h=300&fit=crop",
  Plough: "https://images.unsplash.com/photo-1599034363259-2560eb3325fc?w=400&h=300&fit=crop",
  Cultivator: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=400&h=300&fit=crop";

const BookingModal: React.FC<BookingModalProps> = ({
machine,
userProfile,
onClose,
onConfirm,
}) => {

const { language } = useLanguage();
const { darkMode, addNotification } = useApp();

const [farmerName, setFarmerName] = useState(userProfile?.name || "");
const [contactNumber, setContactNumber] = useState(userProfile?.mobile || "");
const [location, setLocation] = useState(machine.location || "");
const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");
const [fromTime, setFromTime] = useState("09:00");
const [toTime, setToTime] = useState("18:00");
const [bookingType, setBookingType] = useState<'hourly' | 'daily'>("daily");
const [isSubmitting, setIsSubmitting] = useState(false);

const today = new Date().toISOString().split("T")[0];

const calculateTotal = () => {
if (bookingType === "daily") {
if (!fromDate || !toDate) return { days: 0, hours: 0, price: 0 };


  const start = new Date(fromDate);
  const end = new Date(toDate);
  const diff = end.getTime() - start.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;

  return {
    days,
    hours: 0,
    price: days > 0 ? days * machine.pricePerDay : 0,
  };
} else {
  if (!fromDate) return { days: 0, hours: 0, price: 0 };

  const start = new Date(`${fromDate}T${fromTime}`);
  const end = new Date(`${fromDate}T${toTime}`);
  const diff = end.getTime() - start.getTime();
  const hours = Math.ceil(diff / (1000 * 60 * 60));

  return {
    days: 0,
    hours,
    price: hours > 0 ? hours * machine.pricePerHour : 0,
  };
}


};

const { days: totalDays, hours: totalHours, price: totalPrice } =
calculateTotal();

const getMachineImage = (type: string, image: string) => {
if (image) return image;
return MACHINE_IMAGES[type] || DEFAULT_IMAGE;
};

const handleConfirm = async () => {


if (!fromDate) {
  addNotification({
    title: "Select Date",
    message: "Please select booking date",
    type: "error",
  });
  return;
}

if (!farmerName) {
  setFarmerName("Farmer");
}

if (!contactNumber) {
  setContactNumber("9999999999");
}

setIsSubmitting(true);

const bookingData: BookingData = {
  machineId: machine.id,
  machineName: machine.name,
  machineType: machine.type,
  pricePerHour: machine.pricePerHour,
  pricePerDay: machine.pricePerDay,
  farmerName,
  contactNumber,
  location,
  fromDate,
  toDate: bookingType === "hourly" ? fromDate : toDate,
  fromTime: bookingType === "hourly" ? fromTime : "",
  toTime: bookingType === "hourly" ? toTime : "",
  totalDays,
  totalHours,
  totalPrice,
  bookingType,
};

await new Promise((r) => setTimeout(r, 500));

onConfirm(bookingData);

setIsSubmitting(false);


};

return ( <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">


  <div
    className={`${
      darkMode ? "bg-gray-800" : "bg-white"
    } rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto`}
  >

    <h2 className="text-xl font-bold mb-4">
      {language === "hi"
        ? "मशीन बुक करें"
        : language === "te"
        ? "యంత్రం బుక్ చేసుకోండి"
        : "Book Machine"}
    </h2>

    <div className="h-40 mb-4 rounded-xl overflow-hidden">
      <img
        src={getMachineImage(machine.type, machine.image)}
        alt={machine.name}
        className="w-full h-full object-cover"
        onError={(e) =>
          ((e.target as HTMLImageElement).src = DEFAULT_IMAGE)
        }
      />
    </div>

    <div className="space-y-3">

      <input
        value={farmerName}
        onChange={(e) => setFarmerName(e.target.value)}
        placeholder="Farmer Name"
        className="w-full px-4 py-3 border rounded-xl"
      />

      <input
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
        placeholder="Contact Number"
        className="w-full px-4 py-3 border rounded-xl"
      />

      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        className="w-full px-4 py-3 border rounded-xl"
      />

      <input
        type="date"
        value={fromDate}
        min={today}
        onChange={(e) => setFromDate(e.target.value)}
        className="w-full px-4 py-3 border rounded-xl"
      />

      {bookingType === "daily" && (
        <input
          type="date"
          value={toDate}
          min={fromDate || today}
          onChange={(e) => setToDate(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl"
        />
      )}

      <div className="flex gap-3 mt-4">

        <button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="flex-1 py-3 bg-green-600 text-white rounded-xl font-semibold"
        >
          {isSubmitting ? "Booking..." : "Confirm Booking"}
        </button>

        <button
          onClick={onClose}
          className="px-6 py-3 bg-gray-200 rounded-xl"
        >
          Cancel
        </button>

      </div>

    </div>
  </div>
</div>


);
};

export default BookingModal;
