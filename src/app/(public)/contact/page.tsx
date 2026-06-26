"use client";

import { useState } from "react";
import { MapPin, Mail, Phone, Send, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        // 🔥 Popup message updated per client request
        alert("Message sent successfully! We will get back to you soon within 24 hours.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error sending message", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white font-sans selection:bg-[#C89B3C] selection:text-white">
      
      {/* Header Section */}
      <div className="pt-16 pb-12">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
           {/* Header Area */}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* LEFT SIDE: Contact Info & Map */}
          <div className="flex flex-col pr-0 lg:pr-10">
            <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 mb-10" style={{ fontFamily: "Georgia, serif" }}>
              Our Offices
            </h2>
            
            <div className="space-y-10 mb-16">
              {/* Location */}
              <div className="flex items-start gap-4">
                <MapPin className="text-[#C89B3C] mt-1 flex-shrink-0" size={24} strokeWidth={1.5} />
                <div>
                  <h4 className="font-bold text-neutral-800 text-lg mb-1.5" style={{ fontFamily: "Georgia, serif" }}>Bangladesh</h4>
                  <p className="text-neutral-600 text-base leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
                    Moda Source Ltd, 13th Floor, Autograph Tower, Banani, Dhaka.
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail className="text-[#C89B3C] mt-1 flex-shrink-0" size={24} strokeWidth={1.5} />
                <div>
                  <h4 className="font-bold text-neutral-800 text-lg mb-1.5" style={{ fontFamily: "Georgia, serif" }}>Email Us</h4>
                  <p className="text-neutral-600 text-base" style={{ fontFamily: "Georgia, serif" }}>
                    hello@modasource.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <Phone className="text-[#C89B3C] mt-1 flex-shrink-0" size={24} strokeWidth={1.5} />
                <div>
                  <h4 className="font-bold text-neutral-800 text-lg mb-1.5" style={{ fontFamily: "Georgia, serif" }}>Call Us</h4>
                  <p className="text-neutral-600 text-base" style={{ fontFamily: "Georgia, serif" }}>
                    +880 1234-567890
                  </p>
                </div>
              </div>
            </div>

            {/* World Map Image */}
            <div className="w-full mt-auto rounded-sm overflow-hidden border border-neutral-100 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1589519160732-57fc498494f8?auto=format&fit=crop&w=1000&q=80" 
                alt="Global Presence Map" 
                className="w-full h-auto object-cover grayscale opacity-80 mix-blend-multiply hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>

          {/* RIGHT SIDE: Contact Form */}
          <div className="bg-[#fafafa] border border-neutral-100 p-8 md:p-12 lg:p-16 rounded-sm shadow-sm h-fit">
            <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 mb-2" style={{ fontFamily: "Georgia, serif" }}>
              Send a Message
            </h2>
            
            {/* 🔥 New text added above the form per client request */}
            <p className="text-sm md:text-base text-[#C89B3C] font-medium mb-10 flex items-center gap-1.5" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              <span className="text-lg leading-none">*</span> Our team will contact you within 24 hours.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Your Name" 
                  className="w-full border border-neutral-200 bg-white px-5 py-4 text-base outline-none focus:border-[#C89B3C] transition-colors shadow-sm"
                  style={{ fontFamily: "Georgia, serif" }}
                />
                {/* Email Input */}
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Email Address" 
                  className="w-full border border-neutral-200 bg-white px-5 py-4 text-base outline-none focus:border-[#C89B3C] transition-colors shadow-sm"
                  style={{ fontFamily: "Georgia, serif" }}
                />
              </div>

              {/* Subject Input */}
              <input 
                type="text" 
                name="subject"
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="Subject" 
                className="w-full border border-neutral-200 bg-white px-5 py-4 text-base outline-none focus:border-[#C89B3C] transition-colors shadow-sm"
                style={{ fontFamily: "Georgia, serif" }}
              />

              {/* Message Input */}
              <textarea 
                name="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="How can we help you?" 
                rows={7}
                className="w-full border border-neutral-200 bg-white px-5 py-4 text-base outline-none focus:border-[#C89B3C] transition-colors resize-none shadow-sm"
                style={{ fontFamily: "Georgia, serif" }}
              />

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#222222] hover:bg-[#C89B3C] text-white font-medium px-6 py-5 flex items-center justify-center gap-3 transition-colors disabled:opacity-70 tracking-widest text-sm uppercase shadow-md"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    SEND MESSAGE
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}