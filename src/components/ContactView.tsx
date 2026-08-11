import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { SEO } from './SEO';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <SEO 
        title="Contact BuildMetric - Construction Calculator Support & Requests"
        description="Contact the BuildMetric civil engineering team for custom calculator requests, formula clarifications, or site estimation partnerships."
        canonicalUrl="https://buildmetric.com/contact"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F2D5C] bg-blue-100 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Contact BuildMetric Support
          </h1>
          <p className="text-slate-600 text-sm">
            Have questions about a custom formula, tool request, or site estimation partnership?
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-5 space-y-6">
            <h3 className="font-bold text-slate-900 text-lg">Contact Information</h3>
            
            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Mail className="w-5 h-5 text-[#0F2D5C] shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">Email Engineering Team</div>
                  <div>support@buildmetric.com</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Phone className="w-5 h-5 text-[#0F2D5C] shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">Direct Helpline</div>
                  <div>+1 (800) 555-METRIC</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <MapPin className="w-5 h-5 text-[#0F2D5C] shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">Global Headquarters</div>
                  <div>BuildMetric Engineering Center, CA</div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-8">
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center text-emerald-900 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-lg">Message Sent Successfully!</h3>
                <p className="text-xs text-emerald-700">
                  Thank you for reaching out to BuildMetric. Our engineering team will reply to <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' }); }}
                  className="mt-2 text-xs font-bold text-[#0F2D5C] bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                    placeholder="e.g. Eng. David Vance"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                    placeholder="e.g. david@construction.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-white"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Tool Formula Question">Tool Formula Question</option>
                    <option value="Request New Calculator">Request New Calculator</option>
                    <option value="Enterprise Partnership">Enterprise Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                    placeholder="Describe your inquiry or requested calculator tool..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
