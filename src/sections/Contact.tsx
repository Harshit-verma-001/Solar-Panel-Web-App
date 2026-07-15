import { useState } from "react";
import { trpc } from "@/providers/trpc";
import {
  CheckCircle,
  Loader2,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", address: "", message: "" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    submitMutation.mutate(formData);
  };

  return (
    <section
      id="contact"
      style={{
        backgroundColor: "#f5f5f5",
        padding: "120px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: "Outfit, sans-serif",
              color: "#171717",
              lineHeight: 1.2,
            }}
          >
            Get In Touch
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#525252", lineHeight: 1.6 }}
          >
            Ready to start saving with solar? Send us a message and our team
            will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-amber-600" />
              </div>
              <div>
                <h4
                  className="font-semibold mb-1"
                  style={{ color: "#171717" }}
                >
                  Office
                </h4>
                <p style={{ color: "#525252" }}>
                  123 Solar Avenue, Suite 400
                  <br />
                  San Francisco, CA 94105
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-amber-600" />
              </div>
              <div>
                <h4
                  className="font-semibold mb-1"
                  style={{ color: "#171717" }}
                >
                  Phone
                </h4>
                <p style={{ color: "#525252" }}>(555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-amber-600" />
              </div>
              <div>
                <h4
                  className="font-semibold mb-1"
                  style={{ color: "#171717" }}
                >
                  Email
                </h4>
                <p style={{ color: "#525252" }}>hello@solarahome.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-amber-600" />
              </div>
              <div>
                <h4
                  className="font-semibold mb-1"
                  style={{ color: "#171717" }}
                >
                  Hours
                </h4>
                <p style={{ color: "#525252" }}>
                  Mon – Fri: 8:00 AM – 6:00 PM
                  <br />
                  Sat: 9:00 AM – 2:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "#171717" }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    style={{ color: "#171717" }}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "#171717" }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    style={{ color: "#171717" }}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "#171717" }}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    style={{ color: "#171717" }}
                    placeholder="(555) 000-0000"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "#171717" }}
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    style={{ color: "#171717" }}
                    placeholder="Your home address"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "#171717" }}
                  >
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none"
                    style={{ color: "#171717" }}
                    placeholder="Tell us about your home and energy goals..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {submitMutation.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>

                {submitMutation.isError && (
                  <p className="text-sm text-red-500 text-center mt-2">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                <CheckCircle size={48} className="text-green-500" />
                <h3
                  className="text-xl font-bold"
                  style={{ color: "#171717" }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: "#525252" }}>
                  Thank you for reaching out. Our team will contact you within
                  24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-amber-600 hover:text-amber-700 underline mt-2"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
