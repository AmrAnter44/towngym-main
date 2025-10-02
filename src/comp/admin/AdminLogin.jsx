import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      if (data?.user) {
        localStorage.setItem('isAdminLoggedIn', 'true');
        navigate('/admin-dashboard');
      }
    } catch (err) {
      setError('حدث خطأ في تسجيل الدخول');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="glass-white p-8 rounded-2xl shadow-lg max-w-md w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 gymfont text-blue-600">
          Admin Login
        </h2>

        {error && (
          <motion.div
            className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
              placeholder="Enter admin email"
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
              placeholder="Enter admin password"
              disabled={loading}
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            disabled={loading}
          >
            {loading ? 'جاري التحميل...' : 'Login'}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}