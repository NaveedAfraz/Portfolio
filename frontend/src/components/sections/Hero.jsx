import { useTheme } from "../ThemeProvider";
import { useEffect, useRef, useState } from "react";
import { Spotlight } from "../magicui/spotlight";
import { AuroraBackground } from "../ui/aurora-background";
import QuickViewModal from "../ui/quick-view-modal";
import resume from "../../assets/Naveed_Resume.pdf";
import { motion } from "framer-motion";
import { ArrowRight, Send, Download, Sparkles, Code2, MessageCircle, Eye, Timer, FolderGit2, GraduationCap, Briefcase, Layers } from "lucide-react";
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiExpress, SiMysql, SiMongodb, SiDocker, SiDjango, SiFastapi, SiTailwindcss, SiRedux, SiRazorpay, SiGithub } from "react-icons/si";

const Hero = () => {
  const { theme } = useTheme();
  const heroRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      heroRef.current.style.setProperty("--x", `${x}px`);
      heroRef.current.style.setProperty("--y", `${y}px`);
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      clearTimeout(timer);
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

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
    { name: "Docker", icon: <SiDocker className="w-4 h-4 text-[#2496ED]" /> },
    { name: "Django", icon: <SiDjango className="w-4 h-4" /> },
    { name: "FastAPI", icon: <SiFastapi className="w-4 h-4 text-[#009688]" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="w-4 h-4 text-[#06B6D4]" /> },
    { name: "Redux", icon: <SiRedux className="w-4 h-4 text-[#764ABC]" /> },
    { name: "Razorpay", icon: <SiRazorpay className="w-4 h-4 text-[#3395FF]" /> },
    { name: "Git & GitHub", icon: <SiGithub className="w-4 h-4" /> },
    { name: "Microservices", icon: <Layers className="w-4 h-4 text-cyan-500" /> },
  ];

  return (
    <>
      {/* ── DESKTOP / TABLET Hero: normal flow on mobile/tablet, min-h-screen on laptop ─────── */}
      <div id="Home" className="hidden md:block relative min-h-[auto] xl:min-h-screen overflow-hidden pt-24 md:pt-28 pb-10 scroll-mt-32">

        {/* Portrait — full-bleed overlay only on wide laptops/desktops (xl+) */}
        <div
          className={`hidden xl:block absolute top-0 right-0 h-full w-[48%] pointer-events-none z-[1] overflow-hidden transition-all duration-700 ease-in-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute top-1/2 right-12 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
          
          {/* Smooth left-to-right background gradient overlay — synchronized 500ms theme transition */}
          <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-slate-50 via-slate-50/30 to-transparent dark:from-[#07090e] dark:via-[#07090e]/30 dark:to-transparent z-10 pointer-events-none transition-colors duration-500" />

          <div
            className="w-full h-full relative"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 25%, black 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 25%, black 100%)",
            }}
          >
            <img
              src="/images/naveed-ai-portrait.png"
              alt="Naveed Afraz"
              className="w-full h-full object-cover object-[center_0%] dark:opacity-65 opacity-80 dark:brightness-85 brightness-95 filter contrast-105 transition-opacity duration-300"
            />
          </div>
        </div>

        <div
          ref={heroRef}
          className="relative w-full flex items-center justify-center"
        >
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 z-10 grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
          <div className="w-full xl:col-span-7 z-10 relative space-y-4 text-left pb-0">
            
            <div className="flex items-center justify-between gap-6">
              <div className="space-y-2">
                {/* Cursive Greeting */}
                <div
                  className={`transition-all duration-700 ${
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <p className="font-serif italic text-cyan-500 dark:text-cyan-400 text-3xl sm:text-4xl font-normal tracking-wide">
                    Hello, I'm
                  </p>
                </div>

                {/* Name & Title Header */}
                <h1
                  className={`text-5xl sm:text-7xl font-bold tracking-tight sour-gummy transition-all duration-1000 ease-out ${
                    isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <span className={theme === "dark" ? "text-white" : "text-slate-900"}>
                    Naveed Afraz
                  </span>
                </h1>

                <h2
                  className={`text-xl sm:text-2xl font-medium tracking-tight text-neutral-600 dark:text-neutral-300 sour-gummy transition-all duration-1000 delay-200 ease-out ${
                    isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  I build{" "}
                  <span className="font-serif italic text-cyan-500 dark:text-cyan-400 font-normal pr-1">
                    Web Apps
                  </span>{" "}
                  &{" "}
                  <span className="font-serif italic text-amber-500 dark:text-amber-400 font-normal">
                    Mobile Apps
                  </span>
                  <span className="animate-pulse text-cyan-500 font-bold ml-0.5">|</span>
                </h2>
              </div>

              {/* Framed Portrait for mobile & tablet desktop-site view (hidden on xl+ laptops where overlay shows) */}
              <div className="block xl:hidden shrink-0">
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-3xl overflow-hidden border-2 border-cyan-500/40 shadow-xl shadow-cyan-500/20 bg-neutral-900/40">
                  <img
                    src="/images/naveed-ai-portrait.png"
                    alt="Naveed Afraz"
                    className="w-full h-full object-cover object-[center_10%]"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Quote / Bio Paragraph */}
            <div
              className={`relative border-l-2 border-cyan-500/50 pl-5 py-1 transition-all duration-1000 delay-300 ease-out ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mt-4 sm:mt-6 leading-relaxed sm:leading-loose">
                I enjoy building things that didn't exist yesterday. Every project begins with an idea and ends with something people can use. That's the part I never get tired of.
              </p>
            </div>

            {/* Action Buttons */}
            <div
              className={`flex flex-wrap items-center gap-4 pt-1 transition-all duration-1000 delay-400 ease-out ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="cursor-pointer group relative px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              >
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className={`cursor-pointer px-7 py-3.5 rounded-xl font-semibold text-sm border transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95 ${
                  theme === "dark"
                    ? "bg-neutral-900/60 border-neutral-700 text-white hover:bg-neutral-800"
                    : "bg-white border-neutral-300 text-slate-800 hover:bg-neutral-100 shadow-sm"
                }`}
              >
                Let's Connect
                <Send className="w-4 h-4 text-cyan-600 dark:text-cyan-500" />
              </button>

              <a href={resume} download="Naveed_Afraz_Resume.pdf">
                <button
                  className={`cursor-pointer px-4 py-3.5 rounded-xl font-medium text-xs border transition-all flex items-center gap-1.5 ${
                    theme === "dark"
                      ? "bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800/60"
                      : "bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-black hover:bg-neutral-200"
                  }`}
                >
                  <Download className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  Resume
                </button>
              </a>

              <button
                onClick={() => setIsQuickViewOpen(true)}
                className={`cursor-pointer px-4 py-3.5 rounded-xl font-medium text-xs border transition-all flex items-center gap-1.5 ${
                  theme === "dark"
                    ? "bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800/60"
                    : "bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-black hover:bg-neutral-200"
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                Quick View
              </button>
            </div>

            {/* Technologies I Work With - 2 Row Marquee Slider */}
            <div
              className={`pt-5 border-t border-neutral-200 dark:border-neutral-800/80 transition-all duration-1000 delay-500 ease-out overflow-hidden max-w-full min-w-0 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-cyan-500" /> TECHNOLOGIES I WORK WITH
              </p>

              <div className="relative overflow-hidden w-full min-w-0 py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                {/* Row 1 - Sliding Left */}
                <motion.div
                  className="flex gap-3 w-max mb-3"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
                >
                  {[...techRow1, ...techRow1].map((tech, idx) => (
                    <span
                      key={idx}
                      className={`px-4 py-2 rounded-2xl text-xs font-semibold border flex items-center gap-2 backdrop-blur-md whitespace-nowrap shadow-sm cursor-default ${
                        theme === "dark"
                          ? "bg-neutral-900/80 border-neutral-800 text-neutral-200"
                          : "bg-white border-neutral-200 text-neutral-800"
                      }`}
                    >
                      <span className="text-sm flex items-center">{tech.icon}</span>
                      <span>{tech.name}</span>
                    </span>
                  ))}
                </motion.div>

                {/* Row 2 - Sliding Right */}
                <motion.div
                  className="flex gap-3 w-max"
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
                >
                  {[...techRow2, ...techRow2].map((tech, idx) => (
                    <span
                      key={idx}
                      className={`px-4 py-2 rounded-2xl text-xs font-semibold border flex items-center gap-2 backdrop-blur-md whitespace-nowrap shadow-sm cursor-default ${
                        theme === "dark"
                          ? "bg-neutral-900/80 border-neutral-800 text-neutral-200"
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

            {/* Bottom 4 Metric Cards Grid */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 transition-all duration-1000 delay-600 ease-out ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <div className={`p-4 rounded-2xl border transition-all hover:scale-102 min-w-0 overflow-hidden ${
                theme === "dark" ? "bg-neutral-900/60 border-neutral-800/80" : "bg-white border-neutral-200 shadow-sm"
              }`}>
                <div className="flex items-center gap-2 text-cyan-500 font-extrabold text-xl sour-gummy">
                  <Timer className="w-5 h-5 shrink-0" /> <span className="truncate">1+ Yr</span>
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-1 sour-gummy truncate">Experience</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">Full Stack Development</p>
              </div>

              <div className={`p-4 rounded-2xl border transition-all hover:scale-102 min-w-0 overflow-hidden ${
                theme === "dark" ? "bg-neutral-900/60 border-neutral-800/80" : "bg-white border-neutral-200 shadow-sm"
              }`}>
                <div className="flex items-center gap-2 text-cyan-500 font-extrabold text-xl sour-gummy">
                  <FolderGit2 className="w-5 h-5 shrink-0" /> <span className="truncate">20+</span>
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-1 sour-gummy truncate">Projects Delivered</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">7 Clients + 13 Final Year</p>
              </div>

              <div className={`p-4 rounded-2xl border transition-all hover:scale-102 min-w-0 overflow-hidden ${
                theme === "dark" ? "bg-neutral-900/60 border-neutral-800/80" : "bg-white border-neutral-200 shadow-sm"
              }`}>
                <div className="flex items-center gap-2 text-cyan-500 font-extrabold text-xl sour-gummy">
                  <GraduationCap className="w-5 h-5 shrink-0" /> <span className="truncate">BCA</span>
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-1 sour-gummy truncate">Degree</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">St. Joseph Degree College</p>
              </div>

              <div className={`p-4 rounded-2xl border transition-all hover:scale-102 min-w-0 overflow-hidden ${
                theme === "dark" ? "bg-neutral-900/60 border-neutral-800/80" : "bg-white border-neutral-200 shadow-sm"
              }`}>
                <div className="flex items-center gap-2 text-cyan-500 font-extrabold text-xl sour-gummy">
                  <Briefcase className="w-5 h-5 shrink-0" /> <span className="truncate">7+</span>
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-1 sour-gummy truncate">Engagements</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">Internships &amp; Freelance</p>
              </div>
            </div>

          </div>
          </div>

          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/8 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-amber-500/8 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000 pointer-events-none" />
        </div>
      </div>

      {/* ── MOBILE Hero: normal flow, no height constraint, no overlap ──── */}
      <section
        id="Home-mobile"
        className="block md:hidden relative w-full overflow-hidden bg-transparent scroll-mt-32"
      >
        <div className="relative z-10 px-4 sm:px-6 pt-24 pb-12 space-y-5">

          <div className="flex items-center justify-between gap-4">
            <div>
              {/* Cursive Greeting */}
              <p className="font-serif italic text-violet-500 dark:text-cyan-400 text-3xl font-normal tracking-wide">
                Hello, I'm
              </p>

              {/* Name */}
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight sour-gummy text-slate-900 dark:text-white leading-tight">
                Naveed Afraz
              </h1>
            </div>

            {/* Mobile portrait avatar */}
            <div className="shrink-0">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/20 bg-neutral-900/40">
                <img
                  src="/images/naveed-ai-portrait.png"
                  alt="Naveed Afraz"
                  className="w-full h-full object-cover object-[center_10%]"
                />
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <h2 className="text-xl font-medium text-neutral-600 dark:text-neutral-300 sour-gummy">
            I build{" "}
            <span className="font-serif italic text-cyan-400 font-normal">Web Apps</span>{" "}
            &amp;{" "}
            <span className="font-serif italic text-amber-400 font-normal">Mobile Apps</span>
            <span className="animate-pulse text-cyan-500 font-bold ml-0.5">|</span>
          </h2>

          {/* Bio */}
          <div className="border-l-2 border-cyan-500/50 pl-4 py-1">
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              I enjoy building things that didn't exist yesterday. Every project begins with an idea and ends with something people can use. That's the part I never get tired of.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-1">
            <button
              onClick={() => scrollToSection("projects")}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-semibold text-sm shadow-lg flex items-center justify-center gap-2"
            >
              View My Work <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => scrollToSection("contact")}
                className="flex-1 py-3.5 rounded-xl font-semibold text-sm border bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-700 text-slate-800 dark:text-white flex items-center justify-center gap-2"
              >
                Let's Connect <Send className="w-4 h-4 text-cyan-600 dark:text-cyan-500" />
              </button>
              <a href={resume} download="Naveed_Afraz_Resume.pdf" className="flex-1">
                <button className="w-full py-3.5 rounded-xl font-medium text-sm border bg-neutral-100 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center gap-1.5">
                  <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Resume
                </button>
              </a>
            </div>
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="w-full py-3.5 rounded-xl font-medium text-sm border bg-neutral-100 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center gap-1.5"
            >
              <Eye className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Quick View
            </button>
          </div>

          {/* Tech marquee */}
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
                  <span key={idx} className="px-4 py-2 rounded-2xl text-xs font-semibold border bg-white dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 text-slate-800 dark:text-neutral-200 flex items-center gap-2 whitespace-nowrap">
                    <span className="text-sm flex items-center">{tech.icon}</span><span>{tech.name}</span>
                  </span>
                ))}
              </motion.div>
              <motion.div
                className="flex gap-3 w-max"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
              >
                {[...techRow2, ...techRow2].map((tech, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-2xl text-xs font-semibold border bg-white dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 text-slate-800 dark:text-neutral-200 flex items-center gap-2 whitespace-nowrap">
                    <span className="text-sm flex items-center">{tech.icon}</span><span>{tech.name}</span>
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { icon: <Timer className="w-5 h-5" />, value: "1+ Yr", label: "Experience", sub: "Full Stack Development" },
              { icon: <FolderGit2 className="w-5 h-5" />, value: "20+", label: "Projects Delivered", sub: "7 Clients + 13 Final Year Projects" },
              { icon: <GraduationCap className="w-5 h-5" />, value: "BCA", label: "Degree", sub: "St. Joseph Degree College" },
              { icon: <Briefcase className="w-5 h-5" />, value: "7+", label: "Engagements", sub: "Internships & Freelance" },
            ].map((card, i) => (
              <div key={i} className="p-4 rounded-2xl border bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800/80 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-2 text-cyan-500 font-extrabold text-xl sour-gummy">
                  <span className="flex items-center">{card.icon}</span> {card.value}
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-1 sour-gummy">{card.label}</p>
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
