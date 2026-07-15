import { useState, useEffect } from "react";
import { Sun, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm"
          : "bg-transparent"
      }`}
      style={{ height: 80 }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Sun
            size={24}
            className="text-amber-500 transition-transform duration-300 group-hover:rotate-45"
          />
          <span
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif", color: "#171717" }}
          >
            Solara
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Solutions", id: "solutions" },
            { label: "Gallery", id: "gallery" },
            { label: "Process", id: "process" },
            { label: "Contact", id: "contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-base font-medium transition-colors duration-200 hover:text-amber-600"
              style={{ color: "#525252" }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          {isAdmin && (
            <Link
              to="/admin"
              className="text-sm font-medium px-4 py-2 rounded-full border border-neutral-300 hover:border-neutral-400 transition-colors"
              style={{ color: "#525252" }}
            >
              Dashboard
            </Link>
          )}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm" style={{ color: "#525252" }}>
                {user?.name}
              </span>
              <button
                onClick={logout}
                className="text-sm font-medium px-5 py-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium px-5 py-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-all hover:scale-[1.02]"
            >
              Get a Quote
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X size={24} style={{ color: "#171717" }} />
          ) : (
            <Menu size={24} style={{ color: "#171717" }} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 px-6 py-4 space-y-3">
          {[
            { label: "Solutions", id: "solutions" },
            { label: "Gallery", id: "gallery" },
            { label: "Process", id: "process" },
            { label: "Contact", id: "contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left py-2 text-base font-medium"
              style={{ color: "#525252" }}
            >
              {item.label}
            </button>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className="block py-2 text-base font-medium"
              style={{ color: "#525252" }}
              onClick={() => setMobileOpen(false)}
            >
              Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
