import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { CheckCircle, Loader2 } from "lucide-react";

export default function Hero() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", address: "" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    submitMutation.mutate(formData);
  };

  // Generate 24 blades
  const blades = Array.from({ length: 24 }, (_, i) => ({
    delay: -(i * 0.6),
    z: i * 2,
  }));

  return (
    <section
      id="solutions"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#fcfcfc" }}
    >
      {/* 3D Solar Fan Array */}
      <div
        className="solar-hero-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <div
          className="fan-assembly"
          style={{
            position: "relative",
            width: 400,
            height: 400,
            transformStyle: "preserve-3d",
            animation: "fanTilt 12s ease-in-out infinite",
            pointerEvents: "auto",
          }}
        >
          {blades.map((blade, i) => (
            <div
              key={i}
              className="blade"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 300,
                height: 50,
                marginTop: -25,
                marginLeft: -150,
                transformStyle: "preserve-3d",
                animation: `bladeSpin 6s linear infinite`,
                animationDelay: `${blade.delay}s`,
                transform: `translateZ(${blade.z}px)`,
              }}
            >
              <div
                className="blade-face front"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  borderRadius: "50%",
                  background: "rgba(255, 183, 0, 0.55)",
                  transform: "rotateY(0deg)",
                  boxShadow: "inset 0 0 20px rgba(255, 140, 0, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                }}
              />
              <div
                className="blade-face back"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  borderRadius: "50%",
                  background: "rgba(255, 200, 50, 0.4)",
                  transform: "rotateY(180deg)",
                  boxShadow: "inset 0 0 20px rgba(255, 160, 0, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              />
            </div>
          ))}
          {/* Center hub */}
          <div
            style={{
              content: '""',
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 40,
              height: 40,
              background: "radial-gradient(circle, #fff 0%, #e5e5e5 100%)",
              borderRadius: "50%",
              transform: "translate(-50%, -50%) translateZ(50px)",
              boxShadow: "0 0 30px rgba(255, 183, 0, 0.4)",
              zIndex: 100,
            }}
          />
        </div>
      </div>

      {/* Content overlay */}
      <div
        className="relative z-10 flex flex-col items-center justify-center px-6 py-20"
        style={{ marginTop: 80 }}
      >
        {/* Glass panel */}
        <div
          className="max-w-xl w-full text-center p-8 md:p-12 rounded-2xl transition-all duration-300 hover:bg-white/80"
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
          }}
        >
          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
            style={{
              fontFamily: "Outfit, sans-serif",
              color: "#171717",
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}
          >
            Power your home with sunlight
          </h1>
          <p
            className="text-lg md:text-xl mb-8"
            style={{ color: "#525252", lineHeight: 1.6 }}
          >
            Premium solar installations designed for modern living. Save money,
            increase your home value, and protect the planet.
          </p>

          {/* Contact mini-form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  style={{ color: "#171717" }}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  style={{ color: "#171717" }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  style={{ color: "#171717" }}
                />
                <input
                  type="text"
                  placeholder="Address (optional)"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  style={{ color: "#171717" }}
                />
              </div>
              <button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              >
                {submitMutation.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Get a Free Quote"
                )}
              </button>
              {submitMutation.isError && (
                <p className="text-sm text-red-500 mt-2">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          ) : (
            <div className="flex flex-col items-center gap-3 py-4">
              <CheckCircle size={40} className="text-green-500" />
              <p
                className="text-lg font-medium"
                style={{ color: "#171717" }}
              >
                Thank you!
              </p>
              <p className="text-sm" style={{ color: "#525252" }}>
                We will contact you shortly about your solar installation.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm text-amber-600 hover:text-amber-700 underline mt-2"
              >
                Submit another request
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes bladeSpin {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes fanTilt {
          0%, 100% { transform: rotateX(20deg) rotateY(10deg) rotateZ(0deg); }
          25% { transform: rotateX(30deg) rotateY(-10deg) rotateZ(5deg); }
          50% { transform: rotateX(20deg) rotateY(10deg) rotateZ(0deg); }
          75% { transform: rotateX(30deg) rotateY(-10deg) rotateZ(-5deg); }
        }
      `}</style>
    </section>
  );
}
