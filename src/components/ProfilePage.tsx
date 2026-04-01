import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';

const STATES = ['Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu', 'Maharashtra', 'Madhya Pradesh', 'Uttar Pradesh', 'Punjab', 'Haryana', 'Rajasthan', 'Gujarat', 'Bihar', 'West Bengal', 'Odisha', 'Kerala'];
const CROPS = ['Rice', 'Wheat', 'Cotton', 'Maize', 'Sugarcane', 'Groundnut', 'Soybean', 'Tomato', 'Chilli', 'Turmeric', 'Onion', 'Potato'];

const ProfilePage: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, updateProfile } = useAuth();
  const { darkMode, setCurrentPage } = useApp();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    village: user?.village || '',
    district: user?.district || '',
    state: user?.state || 'Telangana',
    farm_size: user?.farm_size || '',
    crop_types: user?.crop_types || [],
    preferred_language: user?.preferred_language || 'en',
  });

  const handleSave = async () => {
    setLoading(true);
    const result = await updateProfile(form);
    if (result.success) {
      setSuccess(true);
      setEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    }
    setLoading(false);
  };

  const toggleCrop = (crop: string) => {
    setForm(prev => ({
      ...prev,
      crop_types: prev.crop_types.includes(crop)
        ? prev.crop_types.filter(c => c !== crop)
        : [...prev.crop_types, crop],
    }));
  };

  if (!user) return null;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setCurrentPage('dashboard')} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
            <svg className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('nav.profile')}</h1>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            {t('common.success')}
          </div>
        )}

        {/* Profile Header */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl p-6 mb-6`}>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-1`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {user.mobile}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {language === 'hi' ? 'सदस्य बने' : language === 'te' ? 'సభ్యుడయ్యారు' : 'Member since'} {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl p-6`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {language === 'hi' ? 'खेत की जानकारी' : language === 'te' ? 'పొలం సమాచారం' : 'Farm Details'}
            </h3>
            {!editing && (
              <button onClick={() => setEditing(true)}
                className="px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 font-semibold rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 text-sm">
                {language === 'hi' ? 'संपादित करें' : language === 'te' ? 'సవరించండి' : 'Edit'}
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>{t('auth.name')}</label>
                {editing ? (
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'} focus:border-green-500`} />
                ) : (
                  <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
                )}
              </div>
              <div>
                <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>{t('auth.village')}</label>
                {editing ? (
                  <input type="text" value={form.village} onChange={e => setForm({ ...form, village: e.target.value })}
                    className={`w-full px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'} focus:border-green-500`} />
                ) : (
                  <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.village || '-'}</p>
                )}
              </div>
              <div>
                <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>{t('auth.district')}</label>
                {editing ? (
                  <input type="text" value={form.district} onChange={e => setForm({ ...form, district: e.target.value })}
                    className={`w-full px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'} focus:border-green-500`} />
                ) : (
                  <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.district || '-'}</p>
                )}
              </div>
              <div>
                <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>{t('auth.state')}</label>
                {editing ? (
                  <select value={form.state} onChange={e => setForm({ ...form, state: e.target.value })}
                    className={`w-full px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'} focus:border-green-500`}>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                ) : (
                  <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.state || '-'}</p>
                )}
              </div>
              <div>
                <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>{t('auth.farmSize')}</label>
                {editing ? (
                  <input type="text" value={form.farm_size} onChange={e => setForm({ ...form, farm_size: e.target.value })}
                    className={`w-full px-4 py-3 border-2 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'} focus:border-green-500`} />
                ) : (
                  <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.farm_size ? `${user.farm_size} acres` : '-'}</p>
                )}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>{t('auth.cropTypes')}</label>
              {editing ? (
                <div className="flex flex-wrap gap-2">
                  {CROPS.map(crop => (
                    <button key={crop} onClick={() => toggleCrop(crop)}
                      className={`px-3 py-2 rounded-full text-sm font-medium transition ${
                        form.crop_types.includes(crop) ? 'bg-green-600 text-white' : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`
                      }`}>
                      {crop}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {(user.crop_types || []).map(crop => (
                    <span key={crop} className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">{crop}</span>
                  ))}
                  {(!user.crop_types || user.crop_types.length === 0) && <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>-</span>}
                </div>
              )}
            </div>

            {editing && (
              <div className="flex gap-3 pt-4">
                <button onClick={handleSave} disabled={loading}
                  className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading && <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                  {t('common.save')}
                </button>
                <button onClick={() => setEditing(false)}
                  className={`px-6 py-3 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} font-semibold rounded-xl`}>
                  {t('common.cancel')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
