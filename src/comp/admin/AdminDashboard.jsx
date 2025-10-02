import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOffer, setEditingOffer] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    duration: '',
    price: '0',
    price_new: '',
    private: '',
    inbody: '',
    invite: '',
  });

  useEffect(() => {
    checkAuth();
    fetchOffers();
  }, []);

  // ✅ التحقق من تسجيل الدخول
  const checkAuth = () => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin-login');
    }
  };

  const fetchOffers = async () => {
    const { data, error } = await supabase
      .from('offers')
      .select('*')
      .order('id', { ascending: true });

    if (!error) {
      setOffers(data);
    }
    setLoading(false);
  };

  // ✅ تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin-login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingOffer) {
      const { error } = await supabase
        .from('offers')
        .update(form)
        .eq('id', editingOffer.id);

      if (!error) {
        setEditingOffer(null);
        resetForm();
        fetchOffers();
      }
    } else {
      const { error } = await supabase.from('offers').insert([form]);

      if (!error) {
        resetForm();
        fetchOffers();
      }
    }
  };

  const handleEdit = (offer) => {
    setEditingOffer(offer);
    setForm({
      duration: offer.duration,
      price: offer.price,
      price_new: offer.price_new,
      private: offer.private,
      inbody: offer.inbody,
      invite: offer.invite,
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this offer?')) {
      await supabase.from('offers').delete().eq('id', id);
      fetchOffers();
    }
  };

  const resetForm = () => {
    setForm({
      duration: '',
      price: '0',
      price_new: '',
      private: '',
      inbody: '',
      invite: '',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <i className="text-4xl text-blue-600 fa-solid fa-spinner fa-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold gymfont">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 w-full md:w-auto"
          >
            Logout
          </button>
        </div>

        {/* Form */}
        <motion.div
          className="glass-white p-4 md:p-6 rounded-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-black">
            {editingOffer ? 'Edit Offer' : 'Add New Offer'}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Duration (e.g., 1 Month)"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              className="p-3 border rounded-lg text-black"
              required
            />
            <input
              type="text"
              placeholder="Old Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="p-3 border rounded-lg text-black"
            />
            <input
              type="text"
              placeholder="New Price"
              value={form.price_new}
              onChange={(e) => setForm({ ...form, price_new: e.target.value })}
              className="p-3 border rounded-lg text-black"
              required
            />
            <input
              type="text"
              placeholder="Private Sessions"
              value={form.private}
              onChange={(e) => setForm({ ...form, private: e.target.value })}
              className="p-3 border rounded-lg text-black"
              required
            />
            <input
              type="text"
              placeholder="Inbody Sessions"
              value={form.inbody}
              onChange={(e) => setForm({ ...form, inbody: e.target.value })}
              className="p-3 border rounded-lg text-black"
              required
            />
            <input
              type="text"
              placeholder="Invitations"
              value={form.invite}
              onChange={(e) => setForm({ ...form, invite: e.target.value })}
              className="p-3 border rounded-lg text-black"
              required
            />

            <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                {editingOffer ? 'Update' : 'Add'} Offer
              </button>
              {editingOffer && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingOffer(null);
                    resetForm();
                  }}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Offers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <motion.div
              key={offer.id}
              className="glass p-4 md:p-6 rounded-2xl"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4">{offer.duration}</h3>
              <div className="space-y-1 text-sm md:text-base">
                <p>Old Price: {offer.price} EGP</p>
                <p>New Price: {offer.price_new} EGP</p>
                <p>Private: {offer.private}</p>
                <p>Inbody: {offer.inbody}</p>
                <p>Invite: {offer.invite}</p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(offer)}
                  className="flex-1 bg-yellow-600 py-2 rounded-lg hover:bg-yellow-700 text-sm md:text-base"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(offer.id)}
                  className="flex-1 bg-red-600 py-2 rounded-lg hover:bg-red-700 text-sm md:text-base"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}