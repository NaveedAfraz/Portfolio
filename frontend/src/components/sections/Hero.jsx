import { useTheme } from "../ThemeProvider";
import { useEffect, useRef, useState } from "react";
import QuickViewModal from "../ui/quick-view-modal";
import resume from "../../assets/Naveed_Resume.pdf";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Send,
  Download,
  Sparkles,
  Code2,
  Eye,
  Timer,
  FolderGit2,
  GraduationCap,
  Briefcase,
  Layers,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiPostgresql,
  SiSocketdotio,
  SiTailwindcss,
  SiRedux,
  SiRazorpay,
  SiGithub,
} from "react-icons/si";

const easeCubic = [0.65, 0, 0.35, 1];

// Huzaifa Awan style masked overflow-hidden slide-up text reveal
function MaskedText({ children, delay = 0, duration = 0.85, className = "" }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration, delay, ease: easeCubic }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const Hero = () => {
  const { theme } = useTheme();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Mobile detection helper (< 768px)
  const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

  // Hero Intro Animation Phase:
  // 1 = "Hi." in hero center (desktop only)
  // 2 = "I AM Naveed Afraz" + stats in hero center (desktop only)
  // 3 = Final Hero layout revealed (instant on mobile phones)
  const [heroPhase, setHeroPhase] = useState(() => (isMobile() ? 3 : 1));

  useEffect(() => {
    // Mobile devices skip intro animations immediately — zero waiting or loading delay
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      if (heroPhase !== 3) setHeroPhase(3);
      return;
    }

    if (heroPhase === 1) {
      const t1 = setTimeout(() => setHeroPhase(2), 1200); // switch to "I AM"
      return () => clearTimeout(t1);
    }
    if (heroPhase === 2) {
      const t2 = setTimeout(() => setHeroPhase(3), 3600); // switch to full Hero
      return () => clearTimeout(t2);
    }
  }, [heroPhase]);

  // Freeze scroll until animations are completely completed (heroPhase === 3) — desktop only
  useEffect(() => {
    // Never lock scroll or block touchmove on mobile phones
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      return;
    }

    if (heroPhase < 3) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.scrollTo(0, 0);

      const preventScroll = (e) => {
        e.preventDefault();
      };
      const preventKeys = (e) => {
        if (["Space", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(e.code)) {
          e.preventDefault();
        }
      };

      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventKeys);

      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
        window.removeEventListener("keydown", preventKeys);
      };
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [heroPhase]);

  // Immediately transition to phase 3 if resized to mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && heroPhase < 3) {
        setHeroPhase(3);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [heroPhase]);

  const skipToHero = () => {
    setHeroPhase(3);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const techRow1 = [
    { name: "React.js", icon: <SiReact className="w-4 h-4 text-[#61DAFB]" /> },
    { name: "React Native", icon: <SiReact className="w-4 h-4 text-[#61DAFB]" /> },
    { name: "Next.js", icon: <SiNextdotjs className="w-4 h-4" /> },
    { name: "TypeScript", icon: <SiTypescript className="w-4 h-4 text-[#3178C6]" /> },
    { name: "Node.js", icon: <SiNodedotjs className="w-4 h-4 text-[#5FA04E]" /> },
    { name: "Express.js", icon: <SiExpress className="w-4 h-4" /> },
    { name: "MySQL", icon: <SiMysql className="w-4 h-4 text-[#4479A1]" /> },
    { name: "MongoDB", icon: <SiMongodb className="w-4 h-4 text-[#47A248]" /> },
  ];

  const techRow2 = [
    { name: "PostgreSQL", icon: <SiPostgresql className="w-4 h-4 text-[#4169E1]" /> },
    { name: "Socket.io", icon: <SiSocketdotio className="w-4 h-4" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="w-4 h-4 text-[#06B6D4]" /> },
    { name: "Redux", icon: <SiRedux className="w-4 h-4 text-[#764ABC]" /> },
    { name: "Razorpay", icon: <SiRazorpay className="w-4 h-4 text-[#3395FF]" /> },
    { name: "Git & GitHub", icon: <SiGithub className="w-4 h-4" /> },
    { name: "Microservices", icon: <Layers className="w-4 h-4 text-cyan-500" /> },
  ];

  const isFinalHero = heroPhase === 3;

  return (
    <>
      {/* ── DESKTOP / TABLET HERO CONTAINER (Below Navbar, Navbar is fully visible!) ── */}
      {/* ── DESKTOP / TABLET HERO CONTAINER (Strictly 100vh, fits fully without scrolling) ── */}
      <section
        id="Home"
        className="hidden md:flex relative h-screen max-h-screen items-center overflow-hidden pt-16 pb-3 lg:pt-18 lg:pb-5 scroll-mt-20"
      >
        {/* ── AMBIENT BACKGROUND LIGHTING — GPU Radial Gradient (Zero repaints) ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)",
          }}
        />

        {/* ── STEP 1 OF HERO INTRO: "Hi." (Rendered within Hero section, below Navbar) ── */}
        <AnimatePresence>
          {heroPhase === 1 && (
            <motion.div
              key="hero-hi"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: easeCubic }}
              className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer select-none"
              onClick={skipToHero}
            >
              <h1 className="font-bold text-7xl sm:text-8xl tracking-tight text-slate-900 dark:text-white">
                Hi<span className="text-cyan-500">.</span>
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── STEP 2 OF HERO INTRO: "I AM Naveed Afraz" + Stats (Inside Hero) ── */}
        <AnimatePresence>
          {heroPhase === 2 && (
            <motion.div
              key="hero-iam"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center select-none cursor-pointer"
              onClick={skipToHero}
            >
              {/* Top Accent Line */}
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: easeCubic }}
                className="block h-px w-16 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent sm:w-24"
              />

              {/* "I AM" */}
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.45em] text-neutral-400 sm:mt-7 sm:text-xs">
                <MaskedText delay={0.2} duration={0.7}>
                  I AM
                </MaskedText>
              </p>

              {/* Big Name Typography */}
              <h2 className="mt-3 sm:mt-4 font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] text-slate-900 dark:text-white leading-[1.1]">
                <MaskedText delay={0.35} duration={0.85}>
                  Naveed
                </MaskedText>
                <MaskedText delay={0.48} duration={0.85}>
                  Afraz
                </MaskedText>
              </h2>

              {/* Subtitles */}
              <div className="mt-5 max-w-xs text-[10px] font-semibold uppercase leading-[2] tracking-[0.34em] text-neutral-500 dark:text-neutral-400 sm:mt-6 sm:max-w-none sm:text-xs sm:tracking-[0.42em]">
                <MaskedText delay={0.75} duration={0.75}>
                  Full Stack Developer
                </MaskedText>
                <MaskedText delay={0.85} duration={0.75}>
                  Web &amp; Mobile Applications
                </MaskedText>
              </div>

              {/* Horizontal Divider Line */}
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.0, ease: easeCubic }}
                className="mt-7 block h-px w-full max-w-[18rem] bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-800 to-transparent sm:mt-9 sm:max-w-2xl"
              />

              {/* 4 Stats Columns */}
              <dl className="mt-6 grid grid-cols-2 gap-y-5 sm:mt-8 sm:flex sm:items-start sm:gap-0">
                {[
                  { value: "1+ Yr", label: "Experience" },
                  { value: "20+", label: "Projects Built" },
                  { value: "BCA", label: "Degree" },
                  { value: "7+", label: "Engagements" },
                ].map((stat, idx) => (
                  <div
                    key={stat.label}
                    className={`px-5 sm:px-8 ${
                      idx > 0 ? "sm:border-l border-neutral-300 dark:border-neutral-800" : ""
                    }`}
                  >
                    <dt className="text-2xl sm:text-[2.4rem] font-bold tabular-nums text-slate-900 dark:text-white">
                      <MaskedText delay={1.15 + 0.15 * idx} duration={0.75}>
                        {stat.value}
                      </MaskedText>
                    </dt>
                    <dd className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400 sm:text-[10px]">
                      <MaskedText delay={1.25 + 0.15 * idx} duration={0.75}>
                        {stat.label}
                      </MaskedText>
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── STEP 3: FINAL REVEALED HERO (Matches Image 1!) ── */}
        <div
          className={`w-full transition-opacity duration-1000 ${
            isFinalHero ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* ── PORTRAIT & GRADIENT OVERLAYS (Huzaifa Awan 1-to-1 Architecture) ── */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
            {/* Cinematic cover image matching Huzaifa's exact 16:9 layout */}
            <div className="absolute inset-0 w-full h-full md:animate-float will-change-transform">
              <img
                src="/images/naveed-hero-cover.jpg"
                alt="Naveed Afraz"
                className="w-full h-full object-cover object-[78%_center] lg:object-[86%_center] xl:object-[90%_center] brightness-[0.98] contrast-[1.02]"
              />
            </div>

            {/* Gradient 1: Left-to-Right Fade across whole hero (Solid dark on left for text, melts seamlessly into photo on right) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 z-[1] bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent sm:via-slate-50/85 lg:via-slate-50/88 dark:from-[#07090e] dark:via-[#07090e]/80 dark:to-transparent sm:dark:via-[#07090e]/85 lg:dark:via-[#07090e]/88 pointer-events-none"
            />

            {/* Gradient 2: Bottom-to-Top Fade (Grounds suit naturally into dark canvas) */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-50 dark:from-[#07090e] to-transparent z-[1] pointer-events-none"
            />

            {/* Gradient 3: Top Vignette Fade (Dissolves top of photo into navbar) */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-slate-50 dark:from-[#07090e] to-transparent z-[1] pointer-events-none"
            />
          </div>

          {/* ── FLOATING CREDENTIAL BADGE (Bottom Right — Huzaifa 1-to-1) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFinalHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5, ease: easeCubic }}
            className="hidden lg:flex absolute bottom-4 right-6 xl:bottom-5 xl:right-10 z-20 items-center gap-3 px-3.5 py-2.5 rounded-xl border bg-white/90 dark:bg-neutral-900/90 border-neutral-200 dark:border-neutral-800 shadow-lg shadow-cyan-500/5 hover:border-cyan-500/40 hover:scale-[1.02] transition-all group pointer-events-auto"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="pr-1 text-left">
              <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                BCA Graduate · Computer Science
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </p>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                St. Joseph Degree College
              </p>
            </div>
          </motion.div>

          {/* ── HERO TEXT CONTENT (Left Column) ── */}
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFinalHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: easeCubic }}
              className="w-full lg:col-span-7 z-10 relative space-y-3.5 lg:space-y-4 text-left pb-0"
            >
              {/* Available for roles badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border bg-white/80 dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 text-slate-800 dark:text-neutral-200 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                </span>
                Available for full-time roles &amp; freelance projects
              </div>

              {/* Big Name Header */}
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                <span className="block">Naveed</span>
                <span className="block">Afraz</span>
              </h1>

              {/* Sparkle Title */}
              <p className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-cyan-500 dark:text-cyan-400">
                <Sparkles className="w-5 h-5 text-cyan-500 shrink-0" />
                Full Stack Developer
              </p>

              {/* Bio Paragraph */}
              <div className="border-l-2 border-cyan-500/50 pl-5 py-1">
                <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 max-w-xl leading-relaxed">
                  I enjoy building things that didn't exist yesterday. Every project begins with an idea and ends with something people can use. That's the part I never get tired of.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1 sm:pt-1.5">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="cursor-pointer group relative px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold text-sm shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => scrollToSection("contact")}
                  className={`cursor-pointer px-6 py-3 rounded-full font-semibold text-sm border transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95 ${
                    theme === "dark"
                      ? "bg-neutral-900/80 border-neutral-700 text-white hover:bg-neutral-800"
                      : "bg-white border-neutral-300 text-slate-800 hover:bg-neutral-100 shadow-xs"
                  }`}
                >
                  Let's Connect
                  <Send className="w-4 h-4 text-cyan-500" />
                </button>

                <a href={resume} download="Naveed_Afraz_Resume.pdf">
                  <button
                    className={`cursor-pointer px-4.5 py-3 rounded-full font-medium text-xs sm:text-sm border transition-all flex items-center gap-1.5 ${
                      theme === "dark"
                        ? "bg-neutral-900/50 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800"
                        : "bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-black hover:bg-neutral-200"
                    }`}
                  >
                    <Download className="w-4 h-4 text-cyan-500" />
                    Resume
                  </button>
                </a>

                <button
                  onClick={() => setIsQuickViewOpen(true)}
                  className={`cursor-pointer px-4.5 py-3 rounded-full font-medium text-xs sm:text-sm border transition-all flex items-center gap-1.5 ${
                    theme === "dark"
                      ? "bg-neutral-900/50 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800"
                      : "bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-black hover:bg-neutral-200"
                  }`}
                >
                  <Eye className="w-4 h-4 text-cyan-500" />
                  Quick View
                </button>
              </div>

              {/* Technologies Marquee — Hardware-accelerated without backdrop-blur overhead */}
              <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800/80 overflow-hidden max-w-full min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-cyan-500" /> TECHNOLOGIES I WORK WITH
                </p>

                <div className="relative overflow-hidden w-full min-w-0 py-0.5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                  <motion.div
                    className="flex gap-2.5 w-max mb-2 will-change-transform"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
                  >
                    {[...techRow1, ...techRow1].map((tech, idx) => (
                      <span
                        key={idx}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-2 whitespace-nowrap shadow-xs cursor-default ${
                          theme === "dark"
                            ? "bg-neutral-900/90 border-neutral-800 text-neutral-200"
                            : "bg-white border-neutral-200 text-neutral-800"
                        }`}
                      >
                        <span className="text-sm flex items-center">{tech.icon}</span>
                        <span>{tech.name}</span>
                      </span>
                    ))}
                  </motion.div>

                  <motion.div
                    className="flex gap-2.5 w-max will-change-transform"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
                  >
                    {[...techRow2, ...techRow2].map((tech, idx) => (
                      <span
                        key={idx}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-2 whitespace-nowrap shadow-xs cursor-default ${
                          theme === "dark"
                            ? "bg-neutral-900/90 border-neutral-800 text-neutral-200"
                            : "bg-white border-neutral-200 text-neutral-800"
                        }`}
                      >
                        <span className="text-sm">{tech.icon}</span>
                        <span>{tech.name}</span>
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Bottom 4 Metric Cards (Spacious & fully visible under 100vh) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div
                  className={`p-3 sm:p-3.5 rounded-2xl border transition-all hover:scale-[1.02] min-w-0 overflow-hidden ${
                    theme === "dark"
                      ? "bg-neutral-900/60 border-neutral-800/80"
                      : "bg-white border-neutral-200 shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-cyan-500 font-extrabold text-lg">
                    <Timer className="w-4.5 h-4.5 shrink-0" /> <span className="truncate">1+ Yr</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-1 truncate">
                    Experience
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                    Full Stack Dev
                  </p>
                </div>

                <div
                  className={`p-3 sm:p-3.5 rounded-2xl border transition-all hover:scale-[1.02] min-w-0 overflow-hidden ${
                    theme === "dark"
                      ? "bg-neutral-900/60 border-neutral-800/80"
                      : "bg-white border-neutral-200 shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-cyan-500 font-extrabold text-lg">
                    <FolderGit2 className="w-4.5 h-4.5 shrink-0" /> <span className="truncate">20+</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-1 truncate">
                    Projects Delivered
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                    7 Clients + 13 Final Year
                  </p>
                </div>

                <div
                  className={`p-3 sm:p-3.5 rounded-2xl border transition-all hover:scale-[1.02] min-w-0 overflow-hidden ${
                    theme === "dark"
                      ? "bg-neutral-900/60 border-neutral-800/80"
                      : "bg-white border-neutral-200 shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-cyan-500 font-extrabold text-lg">
                    <GraduationCap className="w-4.5 h-4.5 shrink-0" />{" "}
                    <span className="truncate">BCA</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-1 truncate">
                    Degree
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                    Computer Science
                  </p>
                </div>

                <div
                  className={`p-3 sm:p-3.5 rounded-2xl border transition-all hover:scale-[1.02] min-w-0 overflow-hidden ${
                    theme === "dark"
                      ? "bg-neutral-900/60 border-neutral-800/80"
                      : "bg-white border-neutral-200 shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-cyan-500 font-extrabold text-lg">
                    <Briefcase className="w-4.5 h-4.5 shrink-0" /> <span className="truncate">7+</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-1 truncate">
                    Engagements
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                    Intern &amp; Freelance
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MOBILE HERO (Phones) ── */}
      <section
        id="Home-mobile"
        className="block md:hidden relative w-full overflow-hidden bg-transparent scroll-mt-32"
      >
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          {/* Clean ambient glow on mobile without background photo */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[320px] w-[320px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 px-4 sm:px-6 pt-24 pb-12 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border bg-white/70 dark:bg-neutral-900/70 border-neutral-200 dark:border-neutral-800 text-slate-800 dark:text-neutral-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            </span>
            Available for full-time roles &amp; freelance projects
          </div>

          <h1 className="text-3xl min-[360px]:text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight whitespace-nowrap">
            Naveed Afraz
          </h1>

          <p className="flex items-center gap-2 text-base font-semibold text-cyan-500 dark:text-cyan-400">
            <Sparkles className="w-4 h-4 text-cyan-500 shrink-0" />
            Full Stack Developer
          </p>

          <div className="border-l-2 border-cyan-500/50 pl-4 py-1">
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              I enjoy building things that didn't exist yesterday. Every project begins with an idea and ends with something people can use. That's the part I never get tired of.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-1">
            <button
              onClick={() => scrollToSection("projects")}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold text-sm shadow-lg flex items-center justify-center gap-2"
            >
              View My Work <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => scrollToSection("contact")}
                className="flex-1 py-3.5 rounded-full font-semibold text-sm border bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-700 text-slate-800 dark:text-white flex items-center justify-center gap-2"
              >
                Let's Connect <Send className="w-4 h-4 text-cyan-500" />
              </button>
              <a href={resume} download="Naveed_Afraz_Resume.pdf" className="flex-1">
                <button className="w-full py-3.5 rounded-full font-medium text-sm border bg-neutral-100 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center gap-1.5">
                  <Download className="w-4 h-4 text-cyan-500" /> Resume
                </button>
              </a>
            </div>
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="w-full py-3.5 rounded-full font-medium text-sm border bg-neutral-100 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center gap-1.5"
            >
              <Eye className="w-4 h-4 text-cyan-500" /> Quick View
            </button>
          </div>

          {/* Marquee on mobile */}
          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800/80">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3 flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-cyan-500" /> TECHNOLOGIES I WORK WITH
            </p>
            <div className="relative overflow-hidden w-full py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <motion.div
                className="flex gap-3 w-max mb-3"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
              >
                {[...techRow1, ...techRow1].map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-2xl text-xs font-semibold border bg-white dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 text-slate-800 dark:text-neutral-200 flex items-center gap-2 whitespace-nowrap"
                  >
                    <span className="text-sm flex items-center">{tech.icon}</span>
                    <span>{tech.name}</span>
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Metric cards on mobile */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { icon: <Timer className="w-5 h-5" />, value: "1+ Yr", label: "Experience", sub: "Full Stack Development" },
              { icon: <FolderGit2 className="w-5 h-5" />, value: "20+", label: "Projects Delivered", sub: "7 Clients + 13 Final Year" },
              { icon: <GraduationCap className="w-5 h-5" />, value: "BCA", label: "Degree", sub: "St. Joseph Degree College" },
              { icon: <Briefcase className="w-5 h-5" />, value: "7+", label: "Engagements", sub: "Internships & Freelance" },
            ].map((card, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl border bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800/80 shadow-sm dark:shadow-none"
              >
                <div className="flex items-center gap-2 text-cyan-500 font-extrabold text-xl">
                  <span className="flex items-center">{card.icon}</span> {card.value}
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">{card.label}</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{card.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuickViewModal isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />
    </>
  );
};

export default Hero;
