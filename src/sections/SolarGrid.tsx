import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GRID_IMAGES = [
  "/images/solar-1.jpg",
  "/images/solar-2.jpg",
  "/images/solar-3.jpg",
  "/images/solar-4.jpg",
  "/images/solar-5.jpg",
  "/images/solar-6.jpg",
  "/images/solar-7.jpg",
  "/images/solar-8.jpg",
];

const TALL_INDICES = [0, 4, 2, 6];

export default function SolarGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridWrapRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const gridWrap = gridWrapRef.current;
    const grid = gridRef.current;
    if (!section || !gridWrap || !grid) return;

    const gridItems = grid.querySelectorAll<HTMLDivElement>(".grid__item");
    const gridItemsInner = grid.querySelectorAll<HTMLDivElement>(".grid__item-inner");

    // Wait for images to load before calculating animations
    const images = grid.querySelectorAll(".grid__item-inner");
    let loadedCount = 0;
    const totalImages = images.length;

    const initAnimation = () => {
      gsap.set(gridWrap, { rotationX: 50 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: gridWrap,
          start: "top bottom+=10%",
          end: "bottom top-=10%",
          scrub: true,
        },
      });

      tl.fromTo(
        gridItems,
        {
          z: 500,
          rotationX: -30,
          filter: "brightness(200%)",
          yPercent: -15,
        },
        {
          yPercent: 0,
          rotationX: 10,
          filter: "brightness(80%)",
          z: 0,
          stagger: 0.03,
        }
      )
        .fromTo(
          gridItems,
          { x: (index: number) => (index % 2 === 0 ? -400 : 400) },
          { x: 0, stagger: 0.03 },
          "<"
        )
        .fromTo(
          gridItemsInner,
          { scale: 2 },
          { scale: 1, stagger: 0.03 },
          "<"
        )
        .fromTo(gridWrap, { z: 3000 }, { z: 0 }, "<")
        .fromTo(gridWrap, { rotationZ: 10 }, { rotationZ: -5 }, "<")
        .fromTo(
          gridItems,
          {
            filter: "brightness(100%)",
            yPercent: 0,
          },
          {
            yPercent: 20,
            rotationX: -10,
            filter: "brightness(40%)",
            stagger: { amount: 0.6, from: "edges" },
          }
        );

      tlRef.current = tl;
    };

    if (totalImages === 0) {
      initAnimation();
    } else {
      images.forEach((img) => {
        const bgImg = img as HTMLElement;
        const bgUrl = bgImg.style.backgroundImage;
        if (bgUrl) {
          const url = bgUrl.replace(/url\(["']?/, "").replace(/["']?\)/, "");
          const imageObj = new Image();
          imageObj.onload = () => {
            loadedCount++;
            if (loadedCount >= totalImages) initAnimation();
          };
          imageObj.onerror = () => {
            loadedCount++;
            if (loadedCount >= totalImages) initAnimation();
          };
          imageObj.src = url;
        } else {
          loadedCount++;
          if (loadedCount >= totalImages) initAnimation();
        }
      });
    }

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === gridWrap) st.kill();
      });
    };
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="solar-grid-section"
      style={{
        perspective: 1000,
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: "#f5f5f5",
        padding: "120px 0",
      }}
    >
      {/* Section header */}
      <div className="relative z-10 text-center mb-16 px-6">
        <h2
          className="text-3xl md:text-5xl font-bold mb-4"
          style={{
            fontFamily: "Outfit, sans-serif",
            color: "#171717",
            lineHeight: 1.2,
          }}
        >
          The Solar Grid
        </h2>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "#525252", lineHeight: 1.6 }}
        >
          See how solar transforms homes into self-sustaining power stations.
        </p>
      </div>

      <div
        ref={gridWrapRef}
        className="grid-wrap"
        style={{
          height: "100%",
          width: "100%",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          ref={gridRef}
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2vw",
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 4vw",
            transformStyle: "preserve-3d",
          }}
        >
          {GRID_IMAGES.map((img, i) => (
            <div
              key={i}
              className={`grid__item ${TALL_INDICES.includes(i) ? "grid__item--tall" : ""}`}
              style={{
                width: "100%",
                aspectRatio: TALL_INDICES.includes(i) ? "0.8" : "1",
                position: "relative",
                overflow: "hidden",
                borderRadius: 4,
                transformStyle: "preserve-3d",
                gridRow: TALL_INDICES.includes(i) ? "span 2" : "auto",
              }}
            >
              <div
                className="grid__item-inner"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "50% 50%",
                  backfaceVisibility: "hidden",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
