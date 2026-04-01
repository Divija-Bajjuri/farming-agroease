import { supabase } from './supabase';

// Machine types
export interface Machine {
  id: string;
  owner_id: string;
  name: string;
  type: string;
  brand: string | null;
  model: string | null;
  description: string | null;
  price_per_hour: number;
  price_per_day: number;
  location: string;
  district: string | null;
  state: string | null;
  contact: string;
  image_url: string | null;
  available: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  // Joined fields
  owner_name?: string;
}

export interface Booking {
  id: string;
  machine_id: string;
  farmer_id: string | null;
  farmer_name: string;
  contact_number: string;
  location: string;
  booking_type: 'hourly' | 'daily';
  from_date: string;
  to_date: string;
  from_time: string | null;
  to_time: string | null;
  total_days: number;
  total_hours: number;
  total_price: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  machine_name?: string;
  machine_type?: string;
}

// Fetch all available machines
export const fetchMachines = async (filters?: {
  type?: string;
  location?: string;
  district?: string;
}): Promise<Machine[]> => {
  let query = supabase
    .from('machines')
    .select('*, users!machines_owner_id_fkey(name)')
    .eq('available', true);

  if (filters?.type) {
    query = query.eq('type', filters.type);
  }
  if (filters?.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }
  if (filters?.district) {
    query = query.eq('district', filters.district);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching machines:', error);
    throw error;
  }

  // Transform data to include owner name
  return (data || []).map(machine => ({
    ...machine,
    owner_name: (machine as any).users?.name || 'Unknown'
  }));
};

// Fetch single machine by ID
export const fetchMachineById = async (id: string): Promise<Machine | null> => {
  const { data, error } = await supabase
    .from('machines')
    .select('*, users!machines_owner_id_fkey(name)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching machine:', error);
    return null;
  }

  return {
    ...data,
    owner_name: (data as any).users?.name || 'Unknown'
  };
};

// Fetch machines by owner
export const fetchMachinesByOwner = async (ownerId: string): Promise<Machine[]> => {
  const { data, error } = await supabase
    .from('machines')
    .select('*')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching owner machines:', error);
    throw error;
  }

  return data || [];
};

// Add new machine
export const addMachine = async (machine: Omit<Machine, 'id' | 'created_at' | 'updated_at' | 'is_verified'>): Promise<Machine> => {
  const { data, error } = await supabase
    .from('machines')
    .insert(machine)
    .select()
    .single();

  if (error) {
    console.error('Error adding machine:', error);
    throw error;
  }

  return data;
};

// Update machine availability
export const updateMachineAvailability = async (id: string, available: boolean): Promise<void> => {
  const { error } = await supabase
    .from('machines')
    .update({ available, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error updating machine:', error);
    throw error;
  }
};

// Delete machine
export const deleteMachine = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('machines')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting machine:', error);
    throw error;
  }
};

// Fetch bookings for a farmer
export const fetchFarmerBookings = async (farmerId: string): Promise<Booking[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, machines!bookings_machine_id_fkey(name, type)')
    .eq('farmer_id', farmerId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }

  return (data || []).map(booking => ({
    ...booking,
    machine_name: (booking as any).machines?.name,
    machine_type: (booking as any).machines?.type
  }));
};

// Fetch bookings for a machine owner
export const fetchOwnerBookings = async (ownerId: string): Promise<Booking[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, machines!bookings_machine_id_fkey(name, type, owner_id)')
    .eq('machines.owner_id', ownerId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching owner bookings:', error);
    throw error;
  }

  return (data || []).map(booking => ({
    ...booking,
    machine_name: (booking as any).machines?.name,
    machine_type: (booking as any).machines?.type
  }));
};

// Create new booking
export const createBooking = async (booking: Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<Booking> => {
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      ...booking,
      status: 'pending'
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating booking:', error);
    throw error;
  }

  return data;
};

// Update booking status
export const updateBookingStatus = async (id: string, status: Booking['status'], notes?: string): Promise<void> => {
  const { error } = await supabase
    .from('bookings')
    .update({ 
      status, 
      notes: notes || null,
      updated_at: new Date().toISOString() 
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

// Cancel booking (by farmer)
export const cancelBooking = async (id: string): Promise<void> => {
  await updateBookingStatus(id, 'cancelled');
};

// Seed sample machines (for demo purposes)
export const seedSampleMachines = async (): Promise<void> => {
  const sampleMachines = [
    {
      name: 'Mahindra 575 DI',
      type: 'Tractor',
      brand: 'Mahindra',
      model: '575 DI',
      description: 'Powerful 45 HP tractor suitable for all farming operations',
      price_per_hour: 500,
      price_per_day: 3500,
      location: 'Warangal',
      district: 'Warangal',
      state: 'Telangana',
      contact: '9876543210',
      image_url: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=400&h=300&fit=crop',
      available: true
    },
    {
      name: 'John Deere 5310',
      type: 'Tractor',
      brand: 'John Deere',
      model: '5310',
      description: 'Premium 55 HP tractor with advanced features',
      price_per_hour: 600,
      price_per_day: 4000,
      location: 'Karimnagar',
      district: 'Karimnagar',
      state: 'Telangana',
      contact: '9876543211',
      image_url: 'https://images.unsplash.com/photo-1535040904129-5c4d3b16fdef?w=400&h=300&fit=crop',
      available: true
    },
    {
      name: 'Kubota DC-68G',
      type: 'Harvester',
      brand: 'Kubota',
      model: 'DC-68G',
      description: 'High-efficiency combine harvester for paddy and wheat',
      price_per_hour: 1200,
      price_per_day: 8000,
      location: 'Nizamabad',
      district: 'Nizamabad',
      state: 'Telangana',
      contact: '9876543212',
      image_url: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400&h=300&fit=crop',
      available: true
    },
    {
      name: 'Shaktiman Rotavator',
      type: 'Rotavator',
      brand: 'Shaktiman',
      model: 'RT 125',
      description: 'Heavy-duty rotavator for soil preparation',
      price_per_hour: 400,
      price_per_day: 2500,
      location: 'Khammam',
      district: 'Khammam',
      state: 'Telangana',
      contact: '9876543213',
      image_url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop',
      available: true
    },
    {
      name: 'Swaraj 744 FE',
      type: 'Tractor',
      brand: 'Swaraj',
      model: '744 FE',
      description: '48 HP tractor with power steering',
      price_per_hour: 550,
      price_per_day: 3800,
      location: 'Adilabad',
      district: 'Adilabad',
      state: 'Telangana',
      contact: '9876543214',
      image_url: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=400&h=300&fit=crop',
      available: false
    },
    {
      name: 'Preet 949',
      type: 'Harvester',
      brand: 'Preet',
      model: '949',
      description: 'Multi-crop combine harvester',
      price_per_hour: 1000,
      price_per_day: 7000,
      location: 'Nalgonda',
      district: 'Nalgonda',
      state: 'Telangana',
      contact: '9876543215',
      image_url: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400&h=300&fit=crop',
      available: true
    }
  ];

  for (const machine of sampleMachines) {
    const { error } = await supabase
      .from('machines')
      .upsert(machine, { onConflict: 'name' });
    
    if (error) {
      console.error('Error seeding machine:', machine.name, error);
    }
  }
};
