import { Sun } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        backgroundColor: "#171717",
        color: "#a3a3a3",
        padding: "80px 0 40px",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sun size={24} className="text-amber-500" />
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Solara
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#a3a3a3" }}>
              Premium residential solar installations for modern homes. Power
              your life with clean energy.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2">
              {["Solutions", "Gallery", "Process", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-sm hover:text-amber-400 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2">
              {[
                "Home Solar",
                "Battery Storage",
                "EV Charging",
                "Maintenance",
              ].map((item) => (
                <li key={item}>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Admin
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/login"
                  className="text-sm hover:text-amber-400 transition-colors"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-sm hover:text-amber-400 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "#737373" }}>
            &copy; {new Date().getFullYear()} Solara Home. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-xs hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
