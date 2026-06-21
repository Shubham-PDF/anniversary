"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Countdown from "@/components/Countdown";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setMounted(true);

    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 1.0;
        audioRef.current.play()
          .then(() => {
            console.log("Audio started successfully on user interaction!");
            cleanup();
          })
          .catch((err) => {
            console.warn("Audio playback retry failed:", err);
          });
      }
    };

    const cleanup = () => {
      window.removeEventListener("click", playAudio);
      window.removeEventListener("touchstart", playAudio);
      window.removeEventListener("keydown", playAudio);
    };

    // Unconditionally bind interaction listeners immediately on mount
    window.addEventListener("click", playAudio);
    window.addEventListener("touchstart", playAudio);
    window.addEventListener("keydown", playAudio);

    // Silent initial autoplay attempt
    if (audioRef.current) {
      audioRef.current.volume = 1.0;
      audioRef.current.play()
        .then(() => {
          console.log("Autoplay succeeded!");
          cleanup();
        })
        .catch(() => {
          console.log("Autoplay blocked. Waiting for first user interaction (click/tap) to play music.");
        });
    }

    return cleanup;
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("couple-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="relative bg-ivory text-charcoal min-h-screen font-body overflow-x-hidden">
      {/* Section 1: Hero */}
      <motion.section
        className="min-h-[100svh] flex flex-col items-center justify-center relative px-6 bg-[#F5F0EB] overflow-hidden"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        {/* Subtle Paper Grain Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        {/* Stars and Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {mounted && [...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gold rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [Math.random() * 0.2, Math.random() * 0.6 + 0.2, Math.random() * 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="flex flex-col items-center justify-center text-center z-10 w-full">
          <motion.div
            className="flex text-[160px] md:text-[240px] leading-none font-heading font-light relative tracking-tighter"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 2.0, ease: "easeOut" }}
          >
            {["2", "5"].map((num, idx) => (
              <motion.span
                key={idx}
                className="relative text-transparent bg-clip-text pb-4"
                style={{
                  backgroundImage: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.8) 50%, transparent 70%), linear-gradient(45deg, #FFF5E1 0%, #D4AF37 50%, #8C6D3B 100%)',
                  backgroundSize: '200% auto, auto',
                  backgroundRepeat: 'no-repeat, no-repeat',
                  filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.15))',
                  WebkitTextStroke: '1px rgba(212, 175, 55, 0.35)',
                  WebkitBackgroundClip: 'text',
                }}
                animate={{
                  backgroundPosition: ['200% 0, 0 0', '-200% 0, 0 0'],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  repeatDelay: 2.0,
                  ease: "easeInOut",
                  delay: 1.0 + idx * 0.6
                }}
              >
                {num}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.6 }}
            className="mt-0 flex flex-col items-center"
          >
            {/* Small top flourish */}
            <motion.svg
              width="60" height="15" viewBox="0 0 60 15" fill="none" xmlns="http://www.w3.org/2000/svg"
              className="mb-6 opacity-60"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.5, delay: 1.6 }}
            >
              <path d="M0 7.5C15 7.5 25 0.5 30 0.5C35 0.5 45 7.5 60 7.5" stroke="#C7A66B" strokeWidth="1" />
              <path d="M0 7.5C15 7.5 25 14.5 30 14.5C35 14.5 45 7.5 60 7.5" stroke="#C7A66B" strokeWidth="1" />
              <circle cx="30" cy="7.5" r="2.5" fill="#C7A66B" />
            </motion.svg>

            <h1 className="font-heading text-3xl md:text-5xl text-charcoal tracking-[0.05em] md:tracking-[0.1em] font-medium">
              Years of Togetherness
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 2.4 }}
              className="w-16 md:w-24 h-[1px] bg-gold mt-6 mb-8 origin-center"
            />
          </motion.div>

          <div className="font-cursive text-5xl sm:text-7xl md:text-[100px] text-gold-dark mt-4 px-4 flex flex-wrap justify-center gap-x-4 drop-shadow-sm">
            {["Sanjay", "&", "Sangita"].map((word, wordIdx) => (
              <span key={wordIdx} className="flex whitespace-nowrap">
                {word.split("").map((char, charIdx) => {
                  const globalIdx = wordIdx * 10 + charIdx;
                  return (
                    <motion.span
                      key={charIdx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 3.0 + globalIdx * 0.05,
                        ease: [0.2, 0.65, 0.3, 0.9],
                      }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 4.0 }}
            className="mt-10 px-4"
          >
            <p className="font-heading text-softgray text-sm md:text-lg tracking-[0.15em] uppercase max-w-lg mx-auto leading-relaxed">
              Celebrating 25 Beautiful Years of <br className="hidden md:block" /> Love, Memories and Togetherness
            </p>
          </motion.div>
        </div>

        {/* Clickable Downward arrow indicator */}
        <motion.button
          onClick={scrollToNextSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          transition={{ delay: 5.0, duration: 1.5 }}
          className="absolute bottom-6 flex flex-col items-center text-charcoal cursor-pointer z-20 focus:outline-none"
        >
          <span className="font-heading text-[10px] tracking-[0.2em] uppercase mb-2 opacity-80">Scroll Down</span>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.0, ease: "easeInOut" }}
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </motion.svg>
        </motion.button>
      </motion.section>

      {/* Section 2: Couple Image & Note */}
      <section id="couple-section" className="min-h-[100svh] flex flex-col items-center justify-center py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="w-full max-w-lg mx-auto flex flex-col items-center"
        >
          <div className="relative w-[80vw] max-w-[400px] aspect-[4/5] mb-10">
            {/* Soft gold backdrop glow */}
            <div className="absolute inset-0 bg-[#D4AF37]/5 blur-3xl rounded-full pointer-events-none z-0"></div>

            {/* Premium concentric floating borders */}
            <motion.div
              className="absolute -inset-6 rounded-t-full border border-gold/20 z-0 pointer-events-none"
              animate={{
                scale: [1, 1.015, 1],
                rotate: [0, 0.5, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -inset-3 rounded-t-full border border-gold/30 z-0 pointer-events-none"
              animate={{
                scale: [1, 1.01, 1],
                rotate: [0, -0.5, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />

            {/* Elegant classic gold foil corner flourish notches */}
            <div className="absolute -top-4 -left-4 w-6 h-6 z-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-6 h-[1.5px] bg-gradient-to-r from-gold-light to-gold"></div>
              <div className="absolute top-0 left-0 w-[1.5px] h-6 bg-gradient-to-b from-gold-light to-gold"></div>
              <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-gold"></div>
            </div>
            <div className="absolute -top-4 -right-4 w-6 h-6 z-20 pointer-events-none">
              <div className="absolute top-0 right-0 w-6 h-[1.5px] bg-gradient-to-l from-gold-light to-gold"></div>
              <div className="absolute top-0 right-0 w-[1.5px] h-6 bg-gradient-to-b from-gold-light to-gold"></div>
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-gold"></div>
            </div>

            {/* Sparkle particles floating along the frame sides */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-gold/60 rounded-full z-20"
                style={{
                  top: `${20 + i * 20}%`,
                  left: i % 2 === 0 ? "-1.5rem" : "calc(100% + 1.2rem)",
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 0.9, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 4.5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            ))}

            {/* Main Arch Image Frame */}
            <div className="relative w-full h-full rounded-t-full overflow-hidden border-[6px] border-white shadow-[0_15px_35px_rgba(0,0,0,0.08)] z-10">
              {/* Fallback styling in case image is missing */}
              <div className="absolute inset-0 bg-gold-light/20 flex items-center justify-center text-gold text-sm font-heading">
                Image: public/images/couple.png
              </div>
              <Image
                src="/images/couple.png"
                alt="Sanjay and Sangita"
                fill
                className="object-cover relative z-10 hover:scale-105 transition-transform duration-1000"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-20 pointer-events-none" />
            </div>
          </div>

          <div className="text-center max-w-md">
            <h2 className="font-cursive text-5xl md:text-6xl text-gold-dark mb-6">Sanjay & Sangita</h2>
            <p className="text-softgray text-lg font-light leading-relaxed mb-6">
              Twenty-five years ago, two paths became one. A journey that started with a promise has blossomed into a beautiful lifetime of shared dreams, boundless laughter, and unconditional love.
            </p>
            <p className="text-charcoal italic font-heading text-xl">
              {"\"Here's to the love that brought us here, and the journey that still lies ahead.\""}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Section 3: Event Details (Improved) */}
      <section className="min-h-[100svh] flex flex-col items-center justify-center py-24 px-6 bg-white relative">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, #C7A66B 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="w-full max-w-2xl mx-auto relative z-10"
        >
          <div className="bg-ivory rounded-sm p-8 md:p-16 text-center border-[1px] border-gold-light shadow-md relative overflow-hidden">
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-12 h-12 md:w-16 md:h-16 border-t-[1px] border-l-[1px] border-gold opacity-50"></div>
            <div className="absolute top-4 right-4 w-12 h-12 md:w-16 md:h-16 border-t-[1px] border-r-[1px] border-gold opacity-50"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 md:w-16 md:h-16 border-b-[1px] border-l-[1px] border-gold opacity-50"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 md:w-16 md:h-16 border-b-[1px] border-r-[1px] border-gold opacity-50"></div>

            <span className="text-gold tracking-[0.2em] text-xs md:text-sm uppercase mb-4 block">You are cordially invited to the</span>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-10 md:mb-16">Silver Jubilee Celebration</h2>

            <div className="flex flex-col space-y-10 items-center mb-6">
              <div className="border-b-[1px] border-gold-light/50 pb-8 w-full max-w-[250px]">
                <span className="block text-gold font-bold tracking-widest mb-3 uppercase text-xs">Date</span>
                <span className="font-heading text-3xl">30th June 2026</span>
              </div>

              <div className="border-b-[1px] border-gold-light/50 pb-8 w-full max-w-[250px]">
                <span className="block text-gold font-bold tracking-widest mb-3 uppercase text-xs">Time</span>
                <span className="font-heading text-3xl">7:00 PM Onwards</span>
              </div>

              <div className="w-full max-w-[300px] pt-2">
                <span className="block text-gold font-bold tracking-widest mb-3 uppercase text-xs">Venue</span>
                <span className="font-heading text-3xl block mb-2">Raunak Hotel</span>
                <span className="text-softgray text-base tracking-wide uppercase text-sm">Pinjore, Haryana</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 4: Timeline of Events */}
      <section className="py-32 px-6 flex flex-col items-center justify-center bg-white relative">
        <div className="w-full max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold tracking-[0.2em] text-xs md:text-sm uppercase mb-4 block">Schedule of the Evening</span>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal">Order of Events</h2>
          </motion.div>

          <div className="relative border-l-[1px] border-gold-light/60 ml-4 md:ml-[50%]">
            {[
              { time: "7:00 PM", title: "Welcome Drinks & Starters", desc: "Arrival of guests with welcome drinks & delicious starters" },
              { time: "7:30 PM", title: "Couple Entry", desc: "Welcoming the beautiful couple as they make their grand entrance" },
              { time: "8:00 PM", title: "Cake Cutting", desc: "Celebrating 25 years of sweetness" },
              { time: "9:00 PM", title: "Dinner & Music", desc: "A lavish feast and dancing the night away" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className={`mb-12 relative ${i % 2 === 0 ? "md:-left-[calc(100%+2rem)] md:text-right ml-8 md:ml-0 md:pr-8" : "ml-8"}`}
              >
                <div className={`absolute top-1.5 w-4 h-4 rounded-full bg-ivory border-[1.5px] border-gold flex items-center justify-center ${i % 2 === 0 ? "-left-[37px] md:left-auto md:-right-[41px]" : "-left-[37px]"}`}>
                  <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                </div>
                <span className="text-gold font-bold tracking-widest text-[10px] md:text-xs uppercase block mb-2">{item.time}</span>
                <h3 className="font-heading text-2xl md:text-3xl text-charcoal mb-2">{item.title}</h3>
                <p className="text-softgray text-sm md:text-base font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Countdown */}
      <section className="py-24 px-6 flex justify-center items-center relative overflow-hidden min-h-[60vh] bg-ivory/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 w-full max-w-4xl"
        >
          <h3 className="font-heading text-3xl text-center text-charcoal mb-12">The Celebration Begins In</h3>
          <Countdown />
        </motion.div>
      </section>

      {/* Section 5: Footer Invitation & Details */}
      <section className="py-32 px-6 flex flex-col items-center justify-center bg-charcoal text-ivory text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full max-w-2xl"
        >
          <h2 className="font-cursive text-5xl md:text-7xl text-gold-light mb-8">Join Us</h2>
          <p className="font-heading text-xl md:text-2xl font-light mb-12 max-w-lg mx-auto leading-relaxed text-ivory/80">
            {"We can't wait to share this beautiful milestone with our closest family and friends."}
          </p>

          {/* More Information */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-ivory/80 text-sm md:text-base mb-12 max-w-xl mx-auto tracking-wide font-light">
            <div>
              <span className="block text-gold font-bold tracking-widest uppercase text-xs mb-2">Venue Address</span>
              <p className="opacity-90">Raunak Hotel, Kalka Shimla Highway</p>
              <p className="opacity-90">Pinjore, Haryana 134102</p>
            </div>
          </div>

          {/* Spacer */}
          <div className="mb-8" />

          {/* Courtesy */}
          <div className="pt-8 border-t border-gold-light/10 w-full max-w-md mx-auto">
            <span className="block text-gold font-bold tracking-[0.2em] uppercase text-[10px] mb-2 opacity-80">With Best Compliments From</span>
            <p className="font-cursive text-3xl text-gold-light">Friends & Family</p>
          </div>
        </motion.div>
      </section>

      {/* Background Audio */}
      <audio ref={audioRef} src="/Audio/sound.mp3" loop preload="auto" autoPlay />
    </div>
  );
}
