import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Eager Beaver" }] }),
  component: ContactPage,
});

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4";

function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

const OPTIONS = ["Brand", "Digital", "Campaign", "Other"];

function ContactPage() {
  const { displayed, done } = useTypewriter("we'd love to\nhear from you!");
  const [services, setServices] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.innerWidth < 1024) {
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.play().catch(() => {});
      return;
    }
    let prevX: number | null = null;
    const onMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      if (prevX == null) {
        prevX = e.clientX;
        return;
      }
      const delta = e.clientX - prevX;
      prevX = e.clientX;
      if (!video.duration || Number.isNaN(video.duration)) return;
      const target = video.currentTime + (delta / window.innerWidth) * 0.8 * video.duration;
      video.currentTime = Math.max(0, Math.min(video.duration, target));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const toggle = (opt: string) =>
    setServices((prev) => (prev.includes(opt) ? prev.filter((p) => p !== opt) : [...prev, opt]));

  return (
    <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
      {/* Navbar */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 lg:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
            Mainframe®
          </span>
          <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1">
            ✱
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-3 text-[18px] text-black">
          <a className="hover:opacity-60 transition-opacity" href="#">Labs</a>
          <span>,</span>
          <a className="hover:opacity-60 transition-opacity" href="#">Studio</a>
          <span>,</span>
          <a className="hover:opacity-60 transition-opacity" href="#">Openings</a>
          <span>,</span>
          <a className="hover:opacity-60 transition-opacity" href="#">Shop</a>
        </nav>
        <a
          href="mailto:ebeaver091@gmail.com"
          className="hidden md:inline text-[18px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>
      </header>

      {/* Video */}
      <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-right lg:object-right-bottom"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 lg:absolute lg:inset-0 lg:z-10 flex items-center px-6 lg:px-16 py-20 lg:py-0">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[1.02] text-[#1C2E1E] whitespace-pre-line">
              {displayed}
              {!done && <span className="animate-blink">|</span>}
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="mt-6 text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14 max-w-2xl">
              Whether you have questions, feedback, drop us a message and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <h2 className="text-2xl font-medium tracking-tight mb-2 text-[#1C2E1E]">What sort of service?</h2>
          <p className="opacity-85 text-[#738273] mb-8">Select all that apply</p>
          <div className="flex flex-wrap gap-3">
            {OPTIONS.map((opt) => {
              const active = services.includes(opt);
              return (
                <motion.button
                  key={opt}
                  type="button"
                  onClick={() => toggle(opt)}
                  whileTap={{ scale: 0.96 }}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5"
                      : "bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55"
                  }`}
                >
                  <AnimatePresence>
                    {active && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Check className="w-4 h-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {opt}
                </motion.button>
              );
            })}
          </div>

          <div className="mt-6">
            {services.length === 0 ? (
              <p className="italic text-xs" style={{ opacity: 0.5 }}>
                Please click to select services above.
              </p>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-[#FAFBF9] border border-[#F1F3F1] rounded-2xl p-5 flex items-center justify-between gap-4"
              >
                <p className="text-sm text-[#1C2E1E]">
                  Ready to inquire about: <span className="font-medium">{services.join(", ")}</span>
                </p>
                <a
                  href={`mailto:ebeaver091@gmail.com?subject=Inquiry: ${encodeURIComponent(services.join(", "))}`}
                  className="inline-flex items-center gap-1.5 text-[#4D6D47] uppercase text-xs font-semibold hover:opacity-70"
                >
                  Let's Go <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
