"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET_DATE = new Date("2026-06-30T19:00:00+05:30"); // 7:00 PM IST

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +TARGET_DATE - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center items-center gap-3 md:gap-6 w-full max-w-lg mx-auto">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
          className="flex flex-col items-center justify-center w-16 h-20 sm:w-20 sm:h-24 rounded-2xl bg-white/40 border border-gold/30 backdrop-blur-md shadow-[0_4px_30px_rgba(199,166,107,0.15)] relative overflow-hidden"
        >
          {/* Subtle gold line on top of each card */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-gold-light via-gold to-gold-dark" />
          
          <motion.span
            key={unit.value}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-2xl sm:text-3xl font-heading font-semibold text-charcoal"
          >
            {String(unit.value).padStart(2, "0")}
          </motion.span>
          
          <span className="text-[10px] sm:text-xs font-medium tracking-widest uppercase text-gold mt-1">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
