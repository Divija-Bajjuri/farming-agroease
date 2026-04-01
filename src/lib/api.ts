import { supabase } from './supabase';

// =============================================
// SCHEMES API
// =============================================

export interface Scheme {
  id: string;
  name_en: string;
  name_hi?: string;
  name_te?: string;
  description_en: string;
  description_hi?: string;
  description_te?: string;
  eligibility_en?: string;
  eligibility_hi?: string;
  eligibility_te?: string;
  benefits_en?: string;
  benefits_hi?: string;
  benefits_te?: string;
  category: string;
  sub_category?: string;
  provider: string;
  website?: string;
  apply_mode: string;
  state: string[];
  required_documents?: string[];
  image_url?: string;
  is_active: boolean;
  created_at: string;
}

export const fetchSchemes = async (filters?: {
  category?: string;
  state?: string;
}): Promise<Scheme[]> => {
  let query = supabase
    .from('schemes')
    .select('*')
    .eq('is_active', true);

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }
  if (filters?.state) {
    query = query.contains('state', [filters.state]);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching schemes:', error);
    throw error;
  }

  return data || [];
};

export const fetchSchemeById = async (id: string): Promise<Scheme | null> => {
  const { data, error } = await supabase
    .from('schemes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching scheme:', error);
    return null;
  }

  return data;
};

// =============================================
// FAQ API
// =============================================

export interface FAQ {
  id: string;
  question_en: string;
  question_hi?: string;
  question_te?: string;
  answer_en: string;
  answer_hi?: string;
  answer_te?: string;
  category: string;
  sub_category?: string;
  keywords?: string[];
  priority: number;
  is_active: boolean;
}

export const fetchFAQs = async (filters?: {
  category?: string;
  search?: string;
}): Promise<FAQ[]> => {
  let query = supabase
    .from('faqs')
    .select('*')
    .eq('is_active', true);

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  const { data, error } = await query.order('priority', { ascending: false });

  if (error) {
    console.error('Error fetching FAQs:', error);
    throw error;
  }

  // Client-side search if needed
  let faqs = data || [];
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    faqs = faqs.filter(faq => 
      faq.question_en.toLowerCase().includes(searchLower) ||
      faq.answer_en.toLowerCase().includes(searchLower) ||
      faq.keywords?.some(k => k.toLowerCase().includes(searchLower))
    );
  }

  return faqs;
};

// =============================================
// FERTILIZERS API
// =============================================

export interface Fertilizer {
  id: string;
  name_en: string;
  name_hi?: string;
  name_te?: string;
  type: string;
  npk_ratio?: string;
  description_en?: string;
  description_hi?: string;
  description_te?: string;
  usage_en?: string;
  usage_hi?: string;
  usage_te?: string;
  crops?: string[];
  stages?: string[];
  dosage_per_acre?: string;
  price_per_kg?: number;
  image_url?: string;
  is_organic: boolean;
  is_active: boolean;
}

export const fetchFertilizers = async (filters?: {
  type?: string;
  crop?: string;
  organicOnly?: boolean;
}): Promise<Fertilizer[]> => {
  let query = supabase
    .from('fertilizers')
    .select('*')
    .eq('is_active', true);

  if (filters?.type) {
    query = query.eq('type', filters.type);
  }
  if (filters?.organicOnly) {
    query = query.eq('is_organic', true);
  }

  const { data, error } = await query.order('name_en');

  if (error) {
    console.error('Error fetching fertilizers:', error);
    throw error;
  }

  // Filter by crop client-side
  let fertilizers = data || [];
  if (filters?.crop) {
    const cropLower = filters.crop.toLowerCase();
    fertilizers = fertilizers.filter(f => 
      f.crops?.some(c => c.toLowerCase().includes(cropLower))
    );
  }

  return fertilizers;
};

export const getFertilizerRecommendation = async (crop: string, stage: string): Promise<Fertilizer[]> => {
  const { data, error } = await supabase
    .from('fertilizers')
    .select('*')
    .eq('is_active', true)
    .contains('crops', [crop])
    .contains('stages', [stage]);

  if (error) {
    console.error('Error getting fertilizer recommendation:', error);
    throw error;
  }

  return data || [];
};

// =============================================
// DISEASES API
// =============================================

export interface Disease {
  id: string;
  name_en: string;
  name_hi?: string;
  name_te?: string;
  crop: string;
  symptoms_en: string;
  symptoms_hi?: string;
  symptoms_te?: string;
  causes_en?: string;
  causes_hi?: string;
  causes_te?: string;
  treatment_en?: string;
  treatment_hi?: string;
  treatment_te?: string;
  prevention_en?: string;
  prevention_hi?: string;
  prevention_te?: string;
  severity: string;
  image_urls?: string[];
  is_active: boolean;
}

export const fetchDiseases = async (filters?: {
  crop?: string;
  severity?: string;
}): Promise<Disease[]> => {
  let query = supabase
    .from('diseases')
    .select('*')
    .eq('is_active', true);

  if (filters?.crop) {
    query = query.eq('crop', filters.crop);
  }
  if (filters?.severity) {
    query = query.eq('severity', filters.severity);
  }

  const { data, error } = await query.order('name_en');

  if (error) {
    console.error('Error fetching diseases:', error);
    throw error;
  }

  return data || [];
};

export const fetchDiseaseById = async (id: string): Promise<Disease | null> => {
  const { data, error } = await supabase
    .from('diseases')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching disease:', error);
    return null;
  }

  return data;
};

// =============================================
// USER FAVORITES API
// =============================================

export interface UserFavorite {
  id: string;
  user_id: string;
  item_type: 'scheme' | 'machine' | 'fertilizer' | 'disease';
  item_id: string;
  notes?: string;
  created_at: string;
}

export const fetchUserFavorites = async (userId: string): Promise<UserFavorite[]> => {
  const { data, error } = await supabase
    .from('user_favorites')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }

  return data || [];
};

export const addFavorite = async (
  userId: string,
  itemType: UserFavorite['item_type'],
  itemId: string,
  notes?: string
): Promise<void> => {
  const { error } = await supabase
    .from('user_favorites')
    .insert({
      user_id: userId,
      item_type: itemType,
      item_id: itemId,
      notes: notes || null,
    });

  if (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

export const removeFavorite = async (
  userId: string,
  itemType: UserFavorite['item_type'],
  itemId: string
): Promise<void> => {
  const { error } = await supabase
    .from('user_favorites')
    .delete()
    .eq('user_id', userId)
    .eq('item_type', itemType)
    .eq('item_id', itemId);

  if (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};

// =============================================
// ACTIVITY LOG API
// =============================================

export interface ActivityLog {
  id: string;
  user_id?: string;
  action: string;
  entity_type?: string;
  entity_id?: string;
  metadata?: Record<string, any>;
  ip_address?: string;
  created_at: string;
}

export const logActivity = async (
  userId: string | null,
  action: string,
  entityType?: string,
  entityId?: string,
  metadata?: Record<string, any>
): Promise<void> => {
  const { error } = await supabase
    .from('activity_logs')
    .insert({
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      metadata: metadata || null,
    });

  if (error) {
    console.error('Error logging activity:', error);
  }
};

export const fetchUserActivity = async (userId: string, limit: number = 50): Promise<ActivityLog[]> => {
  const { data, error } = await supabase
    .from('activity_logs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching activity:', error);
    throw error;
  }

  return data || [];
};
