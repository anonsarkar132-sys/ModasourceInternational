"use client";

import { useState, useEffect } from "react";
import { Loader2, Trash2, Mail, Calendar, User } from "lucide-react";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function ContactAdminPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/contact");
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/v1/contact/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchMessages(); // Refresh message list
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting message", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-neutral-500">
        <Loader2 size={40} className="animate-spin mb-4 text-amber-600" />
        <p>Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl space-y-6 pb-12">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-800 flex items-center gap-2">
            <Mail size={24} className="text-amber-600" />
            Contact Messages
          </h1>
          <p className="text-neutral-500 text-sm mt-1">Review messages sent by visitors through the Contact Us form.</p>
        </div>
      </div>

      {/* Message List */}
      {messages.length === 0 ? (
        <div className="bg-white p-12 text-center text-neutral-500 rounded-lg shadow-sm border border-neutral-100 flex flex-col items-center">
          <Mail size={48} className="mb-4 text-neutral-300" />
          <p>Inbox is empty. No new messages.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.map((msg) => (
            <div key={msg._id} className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 relative group transition-shadow hover:shadow-md">
              <button
                onClick={() => handleDelete(msg._id)}
                className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                title="Delete Message"
              >
                <Trash2 size={18} />
              </button>
              
              <div className="flex items-start gap-4 mb-4 border-b border-neutral-100 pb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 flex-shrink-0">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800">{msg.name}</h3>
                  <a href={`mailto:${msg.email}`} className="text-sm text-amber-600 hover:underline">
                    {msg.email}
                  </a>
                  <div className="flex items-center gap-1 text-xs text-neutral-400 mt-1">
                    <Calendar size={12} />
                    {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-neutral-800 mb-2">Subject: {msg.subject}</h4>
                <p className="text-sm text-neutral-600 whitespace-pre-wrap bg-neutral-50 p-4 rounded-md border border-neutral-100">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}