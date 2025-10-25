import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('offers');
  const [offers, setOffers] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [classes, setClasses] = useState([]);
  const [ptPackages, setPtPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const navigate = useNavigate();

  // Forms
  const [offerForm, setOfferForm] = useState({
    duration: '',
    price: '0',
    price_new: '',
    private: '',
    inbody: '',
    invite: '',
  });

  const [coachForm, setCoachForm] = useState({
    name: '',
    img: '',
    title: '',
    link: '',
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [classForm, setClassForm] = useState({
    className: '',
    day: '',
    time1: '',
    coachName: '',
    mix: 'Mix',
    ladies: false,
    mem: false,
  });

  // ========== NEW: PT Package Form ==========
  const [ptForm, setPtForm] = useState({
    sessions: '',
    price: '',
    price_discount: '0',
  });

  useEffect(() => {
    checkAuth();
    fetchAllData();
  }, []);

  const checkAuth = () => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin-login');
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([fetchOffers(), fetchCoaches(), fetchClasses(), fetchPtPackages()]);
    setLoading(false);
  };

  const fetchOffers = async () => {
    const { data } = await supabase
      .from('offers')
      .select('*')
      .order('id', { ascending: true });
    if (data) setOffers(data);
  };

  const fetchCoaches = async () => {
    const { data } = await supabase
      .from('coaches')
      .select('*')
      .order('id', { ascending: true });
    if (data) setCoaches(data);
  };

  const fetchClasses = async () => {
    const { data } = await supabase
      .from('classes')
      .select('*')
      .order('id', { ascending: true });
    if (data) setClasses(data);
  };

  // ========== NEW: Fetch PT Packages ==========
  const fetchPtPackages = async () => {
    const { data } = await supabase
      .from('pt_packages')
      .select('*')
      .order('sessions', { ascending: true });
    if (data) setPtPackages(data);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin-login');
  };

  // ========== OFFERS ==========
  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await supabase.from('offers').update(offerForm).eq('id', editingItem.id);
    } else {
      await supabase.from('offers').insert([offerForm]);
    }
    resetOfferForm();
    fetchOffers();
  };

  const handleOfferEdit = (offer) => {
    setEditingItem(offer);
    setOfferForm({
      duration: offer.duration,
      price: offer.price,
      price_new: offer.price_new,
      private: offer.private,
      inbody: offer.inbody,
      invite: offer.invite,
    });
  };

  const handleOfferDelete = async (id) => {
    if (confirm('Are you sure?')) {
      await supabase.from('offers').delete().eq('id', id);
      fetchOffers();
    }
  };

  const resetOfferForm = () => {
    setOfferForm({
      duration: '',
      price: '',
      price_new: '0',
      private: '',
      inbody: '',
      invite: '',
    });
    setEditingItem(null);
  };

  // ========== COACHES ==========
  const compressAndCropImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          const targetWidth = 800;
          const targetHeight = 1200;
          
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          
          const imgRatio = img.width / img.height;
          const targetRatio = targetWidth / targetHeight;
          
          let sx, sy, sWidth, sHeight;
          
          if (imgRatio > targetRatio) {
            sHeight = img.height;
            sWidth = img.height * targetRatio;
            sx = (img.width - sWidth) / 2;
            sy = 0;
          } else {
            sWidth = img.width;
            sHeight = img.width / targetRatio;
            sx = 0;
            sy = (img.height - sHeight) / 2;
          }
          
          ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);
          
          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            'image/jpeg',
            0.7
          );
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
    
    const compressedFile = await compressAndCropImage(file);
    setImageFile(compressedFile);
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;
    
    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `coaches/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('coaches')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('coaches')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('فشل رفع الصورة');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCoachSubmit = async (e) => {
    e.preventDefault();
    
    let imageUrl = coachForm.img;
    
    if (imageFile) {
      const uploadedUrl = await handleImageUpload(imageFile);
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    const coachData = {
      ...coachForm,
      img: imageUrl
    };

    if (editingItem) {
      await supabase.from('coaches').update(coachData).eq('id', editingItem.id);
    } else {
      await supabase.from('coaches').insert([coachData]);
    }
    
    resetCoachForm();
    fetchCoaches();
  };

  const handleCoachEdit = (coach) => {
    setEditingItem(coach);
    setCoachForm({
      name: coach.name,
      img: coach.img,
      title: coach.title,
      link: coach.link,
    });
  };

  const handleCoachDelete = async (id) => {
    if (confirm('Are you sure?')) {
      await supabase.from('coaches').delete().eq('id', id);
      fetchCoaches();
    }
  };

  const resetCoachForm = () => {
    setCoachForm({
      name: '',
      img: '',
      title: '',
      link: '',
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingItem(null);
  };

  // ========== CLASSES ==========
  const handleClassSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await supabase.from('classes').update(classForm).eq('id', editingItem.id);
    } else {
      await supabase.from('classes').insert([classForm]);
    }
    resetClassForm();
    fetchClasses();
  };

  const handleClassEdit = (classItem) => {
    setEditingItem(classItem);
    setClassForm({
      className: classItem.classname,
      day: classItem.day,
      time1: classItem.time1,
      coachName: classItem.coachname,
      mix: classItem.mix,
      ladies: classItem.ladies,
      mem: classItem.mem,
    });
  };

  const handleClassDelete = async (id) => {
    if (confirm('Are you sure?')) {
      await supabase.from('classes').delete().eq('id', id);
      fetchClasses();
    }
  };

  const resetClassForm = () => {
    setClassForm({
      className: '',
      day: '',
      time1: '',
      coachName: '',
      mix: 'Mix',
      ladies: false,
      mem: false,
    });
    setEditingItem(null);
  };

  // ========== NEW: PT PACKAGES CRUD ==========
  const handlePtSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await supabase.from('pt_packages').update(ptForm).eq('id', editingItem.id);
    } else {
      await supabase.from('pt_packages').insert([ptForm]);
    }
    resetPtForm();
    fetchPtPackages();
  };

  const handlePtEdit = (ptPackage) => {
    setEditingItem(ptPackage);
    setPtForm({
      sessions: ptPackage.sessions,
      price: ptPackage.price,
      price_discount: ptPackage.price_discount || '0',
    });
  };

  const handlePtDelete = async (id) => {
    if (confirm('Are you sure you want to delete this PT package?')) {
      await supabase.from('pt_packages').delete().eq('id', id);
      fetchPtPackages();
    }
  };

  const resetPtForm = () => {
    setPtForm({
      sessions: '',
      price: '',
      price_discount: '0',
    });
    setEditingItem(null);
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
      <div className="max-w-7xl mx-auto">
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

        {/* Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap justify-center">
          <button
            onClick={() => setActiveTab('offers')}
            className={`px-6 py-2 rounded-lg ${
              activeTab === 'offers' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            Offers
          </button>
          <button
            onClick={() => setActiveTab('pt')}
            className={`px-6 py-2 rounded-lg ${
              activeTab === 'pt' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            PT Packages
          </button>
          <button
            onClick={() => setActiveTab('coaches')}
            className={`px-6 py-2 rounded-lg ${
              activeTab === 'coaches' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            Coaches
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            className={`px-6 py-2 rounded-lg ${
              activeTab === 'classes' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            Classes
          </button>
        </div>

        {/* ========== OFFERS TAB ========== */}
        {activeTab === 'offers' && (
          <>
            <motion.div
              className="glass-white p-4 md:p-6 rounded-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-black">
                {editingItem ? 'Edit Offer' : 'Add New Offer'}
              </h2>

              <form onSubmit={handleOfferSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Duration (e.g., 1 Month)"
                  value={offerForm.duration}
                  onChange={(e) => setOfferForm({ ...offerForm, duration: e.target.value })}
                  className="p-3 border rounded-lg text-black"
                  required
                />
                <input
                  type="text"
                  placeholder="Old Price"
                  value={offerForm.price}
                  onChange={(e) => setOfferForm({ ...offerForm, price: e.target.value })}
                  className="p-3 border rounded-lg text-black"
                />
                <input
                  type="text"
                  placeholder="New Price"
                  value={offerForm.price_new}
                  onChange={(e) => setOfferForm({ ...offerForm, price_new: e.target.value })}
                  className="p-3 border rounded-lg text-black"
                />
                <input
                  type="text"
                  placeholder="Private Sessions"
                  value={offerForm.private}
                  onChange={(e) => setOfferForm({ ...offerForm, private: e.target.value })}
                  className="p-3 border rounded-lg text-black"
                  required
                />
                <input
                  type="text"
                  placeholder="Inbody Sessions"
                  value={offerForm.inbody}
                  onChange={(e) => setOfferForm({ ...offerForm, inbody: e.target.value })}
                  className="p-3 border rounded-lg text-black"
                  required
                />
                <input
                  type="text"
                  placeholder="Invitations"
                  value={offerForm.invite}
                  onChange={(e) => setOfferForm({ ...offerForm, invite: e.target.value })}
                  className="p-3 border rounded-lg text-black"
                  required
                />

                <div className="col-span-1 md:col-span-2 flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                  >
                    {editingItem ? 'Update' : 'Add'} Offer
                  </button>
                  {editingItem && (
                    <button
                      type="button"
                      onClick={resetOfferForm}
                      className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </motion.div>

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
                      onClick={() => handleOfferEdit(offer)}
                      className="flex-1 bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleOfferDelete(offer.id)}
                      className="flex-1 bg-red-600 py-2 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* ========== NEW: PT PACKAGES TAB ========== */}
        {activeTab === 'pt' && (
          <>
            <motion.div
              className="glass-white p-4 md:p-6 rounded-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-black">
                {editingItem ? 'Edit PT Package' : 'Add New PT Package'}
              </h2>

              <form onSubmit={handlePtSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="Number of Sessions"
                  value={ptForm.sessions}
                  onChange={(e) => setPtForm({ ...ptForm, sessions: e.target.value })}
                  className="p-3 border rounded-lg text-black"
                  required
                  min="1"
                />
                <input
                  type="number"
                  placeholder="Price (EGP)"
                  value={ptForm.price}
                  onChange={(e) => setPtForm({ ...ptForm, price: e.target.value })}
                  className="p-3 border rounded-lg text-black"
                  required
                  min="0"
                  step="0.01"
                />
                <input
                  type="number"
                  placeholder="Discount Price (0 = no discount)"
                  value={ptForm.price_discount}
                  onChange={(e) => setPtForm({ ...ptForm, price_discount: e.target.value })}
                  className="p-3 border rounded-lg text-black"
                  min="0"
                  step="0.01"
                />

                <div className="col-span-1 md:col-span-3 flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                  >
                    {editingItem ? 'Update' : 'Add'} PT Package
                  </button>
                  {editingItem && (
                    <button
                      type="button"
                      onClick={resetPtForm}
                      className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ptPackages.map((pkg) => {
                const hasDiscount = pkg.price_discount && parseFloat(pkg.price_discount) > 0;
                const finalPrice = hasDiscount ? parseFloat(pkg.price_discount) : parseFloat(pkg.price);
                const pricePerSession = Math.round(finalPrice / pkg.sessions);

                return (
                  <motion.div
                    key={pkg.id}
                    className="glass p-4 md:p-6 rounded-2xl border-2 border-green-500/30"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="bg-green-600 text-white p-3 rounded-lg mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-center">
                        <i className="fa-solid fa-dumbbell pr-2"></i>
                        {pkg.sessions} Sessions
                      </h3>
                    </div>

                    <div className="space-y-2 text-sm md:text-base mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Price:</span>
                        {hasDiscount ? (
                          <div className="flex gap-2">
                            <span className="line-through text-gray-400">{pkg.price} EGP</span>
                            <span className="text-green-400 font-bold">{pkg.price_discount} EGP</span>
                          </div>
                        ) : (
                          <span className="font-bold">{pkg.price} EGP</span>
                        )}
                      </div>
                      
                      <div className="bg-green-900/30 p-3 rounded-lg border border-green-500/20">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Per Session:</span>
                          <span className="text-2xl font-bold text-green-400">
                            {pricePerSession} EGP
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePtEdit(pkg)}
                        className="flex-1 bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handlePtDelete(pkg.id)}
                        className="flex-1 bg-red-600 py-2 rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}

        {/* ========== COACHES TAB ========== */}
        {activeTab === 'coaches' && (
          <>
            <motion.div
              className="glass-white p-4 md:p-6 rounded-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-black">
                {editingItem ? 'Edit Coach' : 'Add New Coach'}
              </h2>

              <form onSubmit={handleCoachSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Coach Name"
                  value={coachForm.name}
                  onChange={(e) => setCoachForm({ ...coachForm, name: e.target.value })}
                  className="p-3 border rounded-lg text-black"
                  required
                />
                
                <div className="flex flex-col gap-2">
                  <label className="text-black font-semibold">صورة الكوتش</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="p-3 border rounded-lg text-black bg-white"
                  />
                  
                  {imagePreview && (
                    <div className="mt-2 border-2 border-blue-500 rounded-lg p-2 bg-gray-100">
                      <p className="text-sm text-black mb-2 font-semibold">معاينة الصورة:</p>
                      <div className="flex justify-center">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-48 rounded-lg shadow-lg object-cover"
                          style={{ aspectRatio: '2/3' }}
                        />
                      </div>
                      <p className="text-xs text-green-600 mt-2 text-center">
                        ✓ تم ضغط الصورة وتحسين الجودة
                      </p>
                    </div>
                  )}
                  
                  {coachForm.img && !imageFile && (
                    <div className="mt-2 p-2 bg-gray-100 rounded-lg">
                      <p className="text-sm text-gray-600">الصورة الحالية:</p>
                      <img
                        src={coachForm.img}
                        alt="Current"
                        className="max-h-32 rounded-lg mt-2 mx-auto"
                      />
                    </div>
                  )}
                </div>
                
                <input
                  type="text"
                  placeholder="Title (e.g., Fitness Manager)"
                  value={coachForm.title}
                  onChange={(e) => setCoachForm({ ...coachForm, title: e.target.value })}
                  className="p-3 border rounded-lg text-black"
                  required
                />
                <input
                  type="text"
                  placeholder="Instagram Link (optional)"
                  value={coachForm.link}
                  onChange={(e) => setCoachForm({ ...coachForm, link: e.target.value })}
                  className="p-3 border rounded-lg text-black"
                />

                <div className="col-span-1 md:col-span-2 flex gap-4">
                  <button
                    type="submit"
                    disabled={uploadingImage}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {uploadingImage ? (
                      <span className="flex items-center justify-center gap-2">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        جاري الرفع...
                      </span>
                    ) : (
                      <>{editingItem ? 'Update' : 'Add'} Coach</>
                    )}
                  </button>
                  {editingItem && (
                    <button
                      type="button"
                      onClick={resetCoachForm}
                      className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coaches.map((coach) => (
                <motion.div
                  key={coach.id}
                  className="glass p-4 md:p-6 rounded-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={coach.img}
                    alt={coach.name}
                    className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-center">{coach.name}</h3>
                  <p className="text-blue-400 text-center mb-4">{coach.title}</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCoachEdit(coach)}
                      className="flex-1 bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleCoachDelete(coach.id)}
                      className="flex-1 bg-red-600 py-2 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* ========== CLASSES TAB ========== */}
        {activeTab === 'classes' && (
          <>
            <motion.div
              className="glass-white p-4 md:p-6 rounded-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-black">
                {editingItem ? 'Edit Class' : 'Add New Class'}
              </h2>

              <form onSubmit={handleClassSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Class Name"
                  value={classForm.className}
                  onChange={(e) => setClassForm({ ...classForm, className: e.target.value })}
                  className="p-3 border rounded-lg text-black"
                  required
                />
                <select
                  value={classForm.day}
                  onChange={(e) => setClassForm({ ...classForm, day: e.target.value })}
                  className="p-3 border rounded-lg text-black"
                  required
                >
                  <option value="">Select Day</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
                <input
                  type="text"
                  placeholder="Time (e.g., 8:30)"
                  value={classForm.time1}
                  onChange={(e) => setClassForm({ ...classForm, time1: e.target.value })}
                  className="p-3 border rounded-lg text-black"
                  required
                />
                <input
                  type="text"
                  placeholder="Coach Name"
                  value={classForm.coachName}
                  onChange={(e) => setClassForm({ ...classForm, coachName: e.target.value })}
                  className="p-3 border rounded-lg text-black"
                  required
                />
                <select
                  value={classForm.mix}
                  onChange={(e) => setClassForm({ ...classForm, mix: e.target.value })}
                  className="p-3 border rounded-lg text-black"
                >
                  <option value="Mix">Mix</option>
                  <option value="Ladies">Ladies</option>
                  <option value="Men">Men</option>
                </select>

                <div className="flex items-center gap-4">
                  <label className="flex items-center text-black">
                    <input
                      type="checkbox"
                      checked={classForm.ladies}
                      onChange={(e) => setClassForm({ ...classForm, ladies: e.target.checked })}
                      className="mr-2"
                    />
                    Ladies Only
                  </label>
                  <label className="flex items-center text-black">
                    <input
                      type="checkbox"
                      checked={classForm.mem}
                      onChange={(e) => setClassForm({ ...classForm, mem: e.target.checked })}
                      className="mr-2"
                    />
                    Out of Membership
                  </label>
                </div>

                <div className="col-span-1 md:col-span-2 flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                  >
                    {editingItem ? 'Update' : 'Add'} Class
                  </button>
                  {editingItem && (
                    <button
                      type="button"
                      onClick={resetClassForm}
                      className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((classItem) => (
                <motion.div
                  key={classItem.id}
                  className={`glass p-4 md:p-6 rounded-2xl ${
                    classItem.mem ? 'glass-class-mem' : 'glass-class'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-xl font-bold mb-2">{classItem.classname}</h3>
                  <p>Day: {classItem.day}</p>
                  <p>Time: {classItem.time1} pm</p>
                  <p>Coach: {classItem.coachname}</p>
                  <p className={classItem.ladies ? 'text-fuchsia-400' : ''}>
                    {classItem.mix}
                  </p>
                  {classItem.mem && <p className="text-sm">Out of Membership</p>}

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleClassEdit(classItem)}
                      className="flex-1 bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleClassDelete(classItem.id)}
                      className="flex-1 bg-red-600 py-2 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
