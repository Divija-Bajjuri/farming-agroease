import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const { t } = useLanguage();
  const { setCurrentPage } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    password: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (isLogin) {
      const result = await login(form.mobile, form.password);
      if (result.success) {
        setSuccess(t('auth.loginSuccess'));
        setTimeout(() => { onClose(); setCurrentPage('dashboard'); }, 800);
      } else {
        // Provide more helpful error message for connection issues
        const errorMsg = result.error || 'Login failed';
        if (errorMsg.includes('Cannot connect to server') || errorMsg.includes('Failed to fetch')) {
          setError('Cannot connect to server. Please ensure the backend server is running. See SETUP.md for instructions.');
        } else {
          setError(errorMsg);
        }
      }
    } else {
      // Registration
      if (!form.name || !form.mobile || !form.password) {
        setError('Please fill all fields');
        setLoading(false);
        return;
      }
      
      if (form.mobile.length !== 10) {
        setError('Mobile number must be 10 digits');
        setLoading(false);
        return;
      }

      if (form.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      const result = await register({
        name: form.name,
        mobile: form.mobile,
        password: form.password,
      });
      
      if (result.success) {
        setSuccess(t('auth.registerSuccess'));
        setTimeout(() => { onClose(); setCurrentPage('dashboard'); }, 800);
      } else {
        // Provide more helpful error message for connection issues
        const errorMsg = result.error || 'Registration failed';
        if (errorMsg.includes('Cannot connect to server') || errorMsg.includes('Failed to fetch')) {
          setError('Cannot connect to server. Please ensure the backend server is running. See SETUP.md for instructions.');
        } else {
          setError(errorMsg);
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-t-2xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{isLogin ? t('auth.login') : t('auth.register')}</h2>
              <p className="text-green-100 text-sm mt-1">{t('auth.welcome')}</p>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              {success}
            </div>
          )}

          {/* Name - only for registration */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Name *</label>
              <input 
                type="text" 
                value={form.name} 
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your name" 
              />
            </div>
          )}

          {/* Mobile */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Mobile *</label>
            <input 
              type="tel" 
              value={form.mobile} 
              onChange={e => setForm({ ...form, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="9876543210" 
              maxLength={10} 
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Password *</label>
            <input 
              type="password" 
              value={form.password} 
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter password" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-lg rounded-xl hover:from-green-700 hover:to-green-800 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Loading...</>
            ) : (
              isLogin ? 'Login' : 'Register'
            )}
          </button>

          <div className="text-center">
            <button 
              type="button" 
              onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); setForm({ name: '', mobile: '', password: '' }); }}
              className="text-green-600 hover:text-green-700 font-medium text-sm"
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="ml-1 underline">{isLogin ? 'Register' : 'Login'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
