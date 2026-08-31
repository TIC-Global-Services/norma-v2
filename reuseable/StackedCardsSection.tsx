"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Card {
  id: number;
  title: string;
  video: string;
}

const cards: Card[] = [
  { id: 1, title: "Maxion Water Tank Covers", video: "/videos/maxion-covers.mp4" },
  { id: 2, title: "PVC Pipes", video: "/videos/pvc-pipes.mp4" },
  { id: 3, title: "Flexi Sink", video: "/videos/flexi-sink.mp4" },
  { id: 4, title: "Brass Thread Taps", video: "/videos/brass-thread-taps.mp4" },
  { id: 5, title: "Health Faucet", video: "/videos/health-faucet.mp4" }
];

const StackedCardsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isNarrowMobile, setIsNarrowMobile] = useState(false);
  const [isSmallDesktop, setIsSmallDesktop] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsNarrowMobile(window.innerWidth <= 380);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const checkSmallDesktop = () => setIsSmallDesktop(window.innerWidth <= 1350 && window.innerWidth >= 768);
    checkSmallDesktop();
    window.addEventListener('resize', checkSmallDesktop);
    return () => window.removeEventListener('resize', checkSmallDesktop);
  }, []);

  const [expandedCard, setExpandedCard] = useState<Card | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Touch swipe tracking
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwiping = useRef(false);
  // Pause auto-rotation briefly after manual interaction
  const [userInteracted, setUserInteracted] = useState(false);
  const interactionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setUserInteracted(true);
    if (interactionTimer.current) clearTimeout(interactionTimer.current);
    interactionTimer.current = setTimeout(() => setUserInteracted(false), 5000);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setUserInteracted(true);
    if (interactionTimer.current) clearTimeout(interactionTimer.current);
    interactionTimer.current = setTimeout(() => setUserInteracted(false), 5000);
  }, []);

  useEffect(() => {
    if (expandedCard || userInteracted) return; // Pause auto rotation when modal is open or user just swiped

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 3000); // Change card every 3 seconds

    return () => clearInterval(interval);
  }, [expandedCard, userInteracted]);

  // Touch swipe handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = Math.abs(e.touches[0].clientX - touchStartX.current);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current);
    // Only count as swipe if horizontal movement is dominant
    if (deltaX > deltaY && deltaX > 10) {
      isSwiping.current = true;
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const minSwipeDistance = 50;

    if (isSwiping.current && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isSwiping.current = false;
  }, [goToNext, goToPrev]);

  useEffect(() => {
    if (expandedCard && rect && modalContentRef.current && modalOverlayRef.current) {
      const overlay = modalOverlayRef.current;
      const content = modalContentRef.current;

      gsap.killTweensOf([overlay, content]);

      // 1. Position modal content exactly over the clicked card initially
      gsap.set(overlay, { opacity: 0 });
      gsap.set(content, {
        position: "fixed",
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius: "32px",
        scale: 1,
        opacity: 1,
      });

      // 2. Fade in the background overlay
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // 3. Fade in UI elements slightly later
      gsap.fromTo(".modal-ui",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, delay: 0.25, ease: "power2.out" }
      );

      // 4. Animate width, height, and coordinates to center on screen
      const targetWidth = window.innerWidth < 768 ? window.innerWidth * 0.92 : 850;
      const targetHeight = window.innerWidth < 768 ? 420 : 480;
      const targetLeft = (window.innerWidth - targetWidth) / 2;
      const targetTop = (window.innerHeight - targetHeight) / 2;

      gsap.to(content, {
        top: targetTop,
        left: targetLeft,
        width: targetWidth,
        height: targetHeight,
        borderRadius: "24px",
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, [expandedCard, rect]);

  const handleCloseModal = () => {
    if (!modalContentRef.current || !modalOverlayRef.current || !rect) return;

    const overlay = modalOverlayRef.current;
    const content = modalContentRef.current;

    gsap.killTweensOf([overlay, content]);

    gsap.to(".modal-ui", {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.45,
      ease: "power2.in",
    });

    gsap.to(content, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      borderRadius: "32px",
      duration: 0.45,
      ease: "power3.inOut",
      onComplete: () => {
        setExpandedCard(null);
        setRect(null);
      }
    });
  };

  const getVisibleCards = () => {
    const visible = [];
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex + i) % cards.length;
      visible.push({ ...cards[index], stackPosition: i });
    }
    return visible;
  };

  const visibleCards = getVisibleCards();

  return (

    <>
      <section className="lg:pt-[2%]  bg-background mb-10">
        <div className="relative">
          <div className="grid grid-cols-1 w-full md:grid-cols-2 gap-0 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-foreground font-hoves-pro font-medium text-2xl lg:text-[44px] mb-4 tracking-tighter leading-tight">
                Aqua Excel in Motion
              </h2>
              <p className="text-foreground font-inter-tight font-[400] text-base lg:text-[24px] mb-6 leading-[120%] max-w-[300px] md:max-w-3xl">
                Discover immersive glimpses of the style, performance, and craftsmanship behind our products, beautifully captured through every reel.
              </p>
              {/* <Link href="/products"><Button variant="primary" className="hidden lg:block ">Watch More</Button></Link> */}
            </motion.div>

            {/* Right Stacked Cards */}
            <div
              className="relative h-[400px] lg:h-[550px] flex items-center justify-center touch-manipulation"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative w-full max-w-[700px] h-[300px] lg:h-[520px]">
                <AnimatePresence mode="popLayout">
                  {visibleCards.map((card) => {
                    const stackPosition = card.stackPosition;
                    const isActive = stackPosition === 0;

                    return (
                      <motion.div
                        key={card.id}
                        initial={{
                          scale: 1 - stackPosition * 0.08,
                          x: isNarrowMobile
                            ? -137.5 + stackPosition * 25
                            : isMobile
                              ? -170 + stackPosition * 30
                              : -310 + stackPosition * 70,
                          y: stackPosition * (isNarrowMobile ? 6 : isMobile ? 8 : 12),
                          opacity: 0,
                          rotateY: 0,
                          rotateZ: 0,
                        }}
                        animate={{
                          scale: 1 - stackPosition * 0.08,
                          x: isNarrowMobile
                            ? -145 + stackPosition * 30
                            : isMobile
                              ? -177.5 + stackPosition * 35
                              : isSmallDesktop
                                ? -265 + stackPosition * 60
                                : -310 + stackPosition * 90,
                          y: stackPosition * (isNarrowMobile ? 6 : isMobile ? 8 : 12),
                          opacity: 1,
                          rotateY: 0,
                          rotateZ: 0,
                          zIndex: 10 - stackPosition,
                        }}
                        exit={{
                          scale: 0.9,
                          x: isNarrowMobile ? -200 : isMobile ? -300 : -450,
                          opacity: 0,
                          rotateY: -25,
                        }}
                        transition={{
                          duration: 0.7,
                          ease: [0.32, 0.72, 0, 1],
                        }}
                        className="absolute top-0 left-1/2"
                        style={{
                          transformStyle: "preserve-3d",
                          perspective: "1500px",
                          opacity: expandedCard?.id === card.id ? 0 : 1,
                          visibility: expandedCard?.id === card.id ? "hidden" : "visible",
                        }}
                      >
                        <div
                          style={{
                            width: isNarrowMobile ? 200 : isMobile ? 250 : 350,
                            height: isNarrowMobile ? 240 : isMobile ? 300 : 450,
                          }}
                          className="relative rounded-[32px] overflow-hidden bg-white cursor-pointer"
                          onClick={(e) => {
                            // Don't open modal if user was swiping
                            if (expandedCard || isSwiping.current) return;
                            const target = e.currentTarget as HTMLElement;
                            setRect(target.getBoundingClientRect());
                            setExpandedCard(card);
                          }}
                        >
                          <video
                            src={card.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover pointer-events-none"
                          />
                          {/* Dark Overlay (Top vignette effect) */}
                          <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />
                        </div>
                        {isActive && expandedCard?.id !== card.id && (
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center text-foreground font-inter-tight font-regular text-lg lg:text-[24px] mt-3"
                          >
                            {card.title}
                          </motion.p>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Mobile-only Navigation Buttons */}
              <div className="absolute bottom-20 -left-170 flex items-start gap-3 z-20">
                <button
                  type="button"
                  onClick={goToPrev}
                  aria-label="Previous video"
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-black border border-[#E5E5E5] text-white shadow-md active:scale-90 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Next video"
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-[#323232] text-white shadow-md active:scale-90 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Video Player */}
      {expandedCard && rect && (
        <div
          ref={modalOverlayRef}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
          onClick={handleCloseModal}
        >
          <div
            ref={modalContentRef}
            style={{
              position: "fixed",
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
              borderRadius: "32px",
            }}
            className="absolute bg-black overflow-hidden shadow-2xl border border-white/10 flex flex-col justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="modal-ui absolute cursor-pointer top-6 right-6 z-50 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/85 hover:scale-105 border border-white/10 transition-all duration-200"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Video Player (Unmuted / playing with audio) */}
            <video
              src={expandedCard.video}
              autoPlay
              loop
              playsInline
              controls
              className="w-full h-full object-contain md:object-cover"
            />

            {/* Title Overlay */}
            <div className="modal-ui absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10">
              <h3 className="text-white font-hoves-pro font-medium text-2xl">
                {expandedCard.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StackedCardsSection;
