import { useLocation, useNavigate } from "react-router-dom";
import { Heart, ArrowUp, ArrowUpRight, Download, Mail } from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import resume from "../assets/Naveed_Resume.pdf";
import { useOnlinePresence } from "../hooks/useOnlinePresence";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const { onlineCount, visits } = useOnlinePresence();

  const handleNavigation = (sectionId) => {
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate("/", { state: { activeSection: sectionId } });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", id: "Home" },
    { name: "Skills", id: "skills" },
    { name: "Experience", id: "experience" },
    { name: "Education", id: "education" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <footer className="relative border-t border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-[#07090e] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* ── LEFT COLUMN: Brand, Summary, Socials ── */}
          <div className="md:col-span-6 lg:col-span-6 space-y-4">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500/15 via-sky-500/10 to-blue-600/20 dark:from-cyan-500/20 dark:via-sky-500/15 dark:to-blue-600/25 border border-cyan-500/30 dark:border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-500/10 backdrop-blur-md select-none group-hover:border-cyan-400/60 group-hover:scale-105 transition-all duration-300">
                <span className="font-signature font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500">
                  NA
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                  Naveed Afraz
                </span>
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-medium">
                  Full Stack Developer
                </span>
              </div>
            </div>

            {/* Value Statement / Short Bio */}
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
              Full Stack Developer building scalable web apps, robust backend architectures, and high-impact digital experiences. Available for full-time roles &amp; freelance contracts.
            </p>

            {/* Social Icon Buttons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://github.com/NaveedAfraz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-10 h-10 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-xs"
              >
                <SiGithub className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/naveed-afraz-977a46310/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-10 h-10 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-xs"
              >
                <SiLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/NaveedAfrazX"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter Profile"
                className="w-10 h-10 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-xs"
              >
                <SiX className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:naveedafraz2003@gmail.com"
                aria-label="Send Email"
                className="w-10 h-10 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-xs"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ── MIDDLE COLUMN: Navigate ── */}
          <div className="md:col-span-3 lg:col-span-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-4">
              NAVIGATE
            </p>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors cursor-pointer text-left font-medium"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── RIGHT COLUMN: Get in Touch ── */}
          <div className="md:col-span-3 lg:col-span-3 space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-4">
              GET IN TOUCH
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://naveedafraz.live"
                  className="text-neutral-700 dark:text-neutral-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 font-medium group"
                >
                  <span className="break-all">naveedafraz.live</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:naveedafraz2003@gmail.com"
                  className="text-neutral-700 dark:text-neutral-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 font-medium group"
                >
                  <span className="break-all">naveedafraz2003@gmail.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href={resume}
                  download="Naveed_Afraz_Resume.pdf"
                  className="text-neutral-700 dark:text-neutral-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 font-medium group cursor-pointer"
                >
                  <span>Download CV</span>
                  <Download className="w-3.5 h-3.5 text-neutral-400 group-hover:text-cyan-400 group-hover:translate-y-0.5 transition-transform shrink-0" />
                </a>
              </li>
              <li className="pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  Open to Opportunities
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ── BOTTOM SUB-FOOTER BAR ── */}
        <div className="border-t border-neutral-200 dark:border-neutral-800/80 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1.5 flex-wrap justify-center md:justify-start">
            <span>© {new Date().getFullYear()} Naveed Afraz. Designed &amp; built from scratch.</span>
            <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">·</span>
            <span className="inline-flex items-center">
              (Handcrafted with <Heart className="w-3 h-3 text-red-500 mx-1 fill-red-500" />)
            </span>
          </div>

          {/* ── LIVE ONLINE & TOTAL VISITS COUNTER ── */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-200/50 dark:bg-neutral-900/80 border border-neutral-300/60 dark:border-neutral-800/80 font-mono text-xs text-neutral-600 dark:text-neutral-400 shadow-xs backdrop-blur-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{onlineCount} online</span>
            <span className="text-neutral-400 dark:text-neutral-600">·</span>
            <span className="font-semibold text-slate-800 dark:text-neutral-200">{visits.toLocaleString()}</span>
            <span>visits</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors group cursor-pointer"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
