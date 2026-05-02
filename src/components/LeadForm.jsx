import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const STORAGE_KEY = 'lead_form_dismissed';
const SCROLL_THRESHOLD = 0.5;

/**
 * Popup lead form. Appears once per session after the user scrolls past 50%
 * of the page. Submits to Supabase via the `submit_website_lead` RPC, which
 * resolves the gym slug server-side and writes to `website_leads`.
 *
 * Each gym's Fitboost-System polls that table and creates Visitors locally
 * with source = "website".
 */
export default function LeadForm() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', interestedIn: '' });

  // Trigger when scroll passes 50%, once per session.
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const ratio = scrollTop / docHeight;
      if (ratio >= SCROLL_THRESHOLD) {
        setOpen(true);
        sessionStorage.setItem(STORAGE_KEY, '1');
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, '1');
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const name = form.name.trim();
    const phone = form.phone.trim();
    if (!name || !phone) {
      setError('من فضلك ادخل الاسم ورقم التليفون');
      return;
    }

    const gymSlug = import.meta.env.VITE_GYM_SLUG;
    if (!gymSlug) {
      setError('إعداد الموقع غير مكتمل');
      return;
    }

    setSubmitting(true);
    try {
      const { error: rpcError } = await supabase.rpc('submit_website_lead', {
        p_gym_slug: gymSlug,
        p_name: name,
        p_phone: phone,
        p_interested_in: form.interestedIn.trim() || null,
        p_source_path: window.location.pathname,
        p_user_agent: navigator.userAgent.slice(0, 240)
      });
      if (rpcError) throw rpcError;
      setSubmitted(true);
      setTimeout(close, 2500);
    } catch (err) {
      console.warn('Lead submit error:', err);
      setError('حصل خطأ في الإرسال. حاول تاني.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="إغلاق"
          className="absolute top-3 left-3 text-gray-400 hover:text-gray-700 text-2xl leading-none"
        >
          ×
        </button>

        <div className="bg-gradient-to-l from-blue-500 to-blue-600 px-6 py-5 text-white">
          <h2 className="text-2xl font-bold">سجّل اهتمامك</h2>
          <p className="text-sm opacity-90 mt-1">سيب لنا اسمك ورقمك وهنرجع لك</p>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="text-5xl mb-3">✅</div>
            <p className="text-lg font-bold text-gray-800">تم الإرسال بنجاح</p>
            <p className="text-sm text-gray-600 mt-1">هنتواصل معاك قريباً</p>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الاسم <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-800"
                placeholder="مثلاً: أحمد محمد"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رقم التليفون <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                inputMode="numeric"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-800"
                placeholder="01xxxxxxxxx"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                مهتم بإيه؟
              </label>
              <input
                type="text"
                value={form.interestedIn}
                onChange={(e) => setForm({ ...form, interestedIn: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-800"
                placeholder="مثلاً: اشتراك / مدرب خاص / كلاسات…"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-l from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
            >
              {submitting ? 'جاري الإرسال…' : 'إرسال'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              بياناتك بتروح للجيم مباشرة وهنتواصل معاك بأسرع وقت
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
