import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquare, PenTool, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    icon: MessageSquare,
    title: "Consultation",
    description:
      "We begin with a free consultation to understand your energy needs, roof structure, and goals. Our experts analyze your electricity usage and sun exposure to design the perfect system.",
  },
  {
    icon: PenTool,
    title: "Custom Design",
    description:
      "Our engineers create a tailored solar panel layout optimized for your roof's dimensions and angle. We handle all permits, utility approvals, and HOA requirements on your behalf.",
  },
  {
    icon: Wrench,
    title: "Installation",
    description:
      "Certified installers complete your setup in 1-3 days with minimal disruption. We use premium Tier-1 panels and inverters, backed by 25-year warranties for complete peace of mind.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean);

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        backgroundColor: "#fcfcfc",
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
            How It Works
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#525252", lineHeight: 1.6 }}
          >
            From first call to flip of the switch — a seamless journey to
            energy independence.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                className="group p-8 rounded-2xl border border-neutral-100 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Step number */}
                <div
                  className="text-5xl font-black mb-6 opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ fontFamily: "Outfit, sans-serif", color: "#f59e0b" }}
                >
                  0{i + 1}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-5 group-hover:bg-amber-100 transition-colors">
                  <Icon size={24} className="text-amber-600" />
                </div>

                {/* Content */}
                <h3
                  className="text-xl font-bold mb-3"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    color: "#171717",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#525252", lineHeight: 1.6 }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
