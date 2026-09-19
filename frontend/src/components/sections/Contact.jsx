import { useState } from "react";
import { Mail, MapPin, Send, ArrowUpRight, Copy, Check, Download, Sparkles, Clock, MessageSquare } from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import resume from "../../assets/Naveed_Resume.pdf";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("naveedafraz2003@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const contactMethods = [
    {
      name: "LinkedIn",
      handle: "naveed-afraz",
      url: "https://www.linkedin.com/in/naveed-afraz-977a46310/",
      icon: <SiLinkedin className="w-5 h-5 text-[#0A66C2]" />,
      actionText: "Connect",
    },
    {
      name: "GitHub",
      handle: "NaveedAfraz",
      url: "https://github.com/NaveedAfraz",
      icon: <SiGithub className="w-5 h-5 text-slate-800 dark:text-white" />,
      actionText: "Follow",
    },
    {
      name: "Twitter / X",
      handle: "@NaveedAfrazX",
      url: "https://twitter.com/NaveedAfrazX",
      icon: <SiX className="w-4 h-4 text-slate-800 dark:text-white" />,
      actionText: "Message",
    },
    {
      name: "Resume / CV",
      handle: "Naveed_Resume.pdf",
      url: resume,
      icon: <Download className="w-5 h-5 text-cyan-500" />,
      actionText: "Download",
      isDownload: true,
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 overflow-hidden scroll-mt-20"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[600px] rounded-full opacity-30 dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Glassmorphic Contact Card */}
        <div className="relative rounded-3xl border border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-[#0b0f17]/90 backdrop-blur-xl p-5 sm:p-10 lg:p-14 shadow-2xl shadow-cyan-500/5 text-center">
          
          {/* Section Tag Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.18em] border border-cyan-500/30 bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            CONTACT
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15] max-w-2xl mx-auto">
            Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500">worth shipping.</span>
          </h2>

          {/* Sub-headline */}
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Have a product in mind, a system to modernize, or need a full stack developer? Reach me directly, I usually reply within a few hours.
          </p>

          {/* ── PRIMARY EMAIL CALL-TO-ACTION CARD ── */}
          <div className="mt-8 sm:mt-10 p-5 sm:p-7 rounded-2xl border border-cyan-500/30 dark:border-cyan-500/35 bg-neutral-50/90 dark:bg-[#0c121d]/90 backdrop-blur-xl max-w-2xl mx-auto text-left shadow-xl shadow-cyan-500/5 relative overflow-hidden group">
            {/* Top subtle cyan glow line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80" />

            {/* Top row: Label + Live Status */}
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/25 text-cyan-500 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">
                  Primary Email
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for work</span>
              </div>
            </div>

            {/* Email Address - Centered and Fully Visible */}
            <div className="my-2.5 text-center">
              <a
                href="mailto:naveedafraz2003@gmail.com"
                className="text-base sm:text-xl md:text-2xl font-bold font-mono text-slate-900 dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors select-all break-all block tracking-tight text-center"
                title="Click to compose email"
              >
                naveedafraz2003@gmail.com
              </a>
            </div>

            {/* Action Buttons Row - Centered horizontally */}
            <div className="mt-4 pt-4 border-t border-neutral-200/70 dark:border-neutral-800/80 grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:justify-center sm:gap-3.5">
              <button
                type="button"
                onClick={copyEmail}
                className="cursor-pointer px-4 py-2.5 sm:py-3 sm:min-w-[140px] rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800/80 text-xs sm:text-sm font-semibold text-slate-800 dark:text-neutral-200 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs whitespace-nowrap"
                title="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-emerald-500 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-neutral-500 dark:text-neutral-400 shrink-0" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href="mailto:naveedafraz2003@gmail.com?subject=Project%20Inquiry%20-%20Naveed%20Afraz"
                className="cursor-pointer px-4 py-2.5 sm:py-3 sm:min-w-[150px] rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:via-sky-400 hover:to-blue-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Send Email</span>
                <Send className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>
          </div>

          {/* ── 4 QUICK CONNECT TILES ── */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-4xl mx-auto">
            {contactMethods.map((method) => {
              const Tag = method.isDownload ? "a" : "a";
              return (
                <Tag
                  key={method.name}
                  href={method.url}
                  target={method.isDownload ? undefined : "_blank"}
                  rel={method.isDownload ? undefined : "noopener noreferrer"}
                  download={method.isDownload ? "Naveed_Afraz_Resume.pdf" : undefined}
                  className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all flex items-center justify-between gap-3 text-left group cursor-pointer hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {method.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {method.name}
                      </p>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                        {method.handle}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </Tag>
              );
            })}
          </div>

          {/* ── BOTTOM INFO PILLS: Location & Status ── */}
          <div className="mt-8 pt-6 border-t border-neutral-200/80 dark:border-neutral-800/80 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 shadow-2xs whitespace-nowrap">
              <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              <span>Hyderabad, India</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 shadow-2xs whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Available Worldwide (Remote)</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 shadow-2xs whitespace-nowrap">
              <Clock className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              <span>Response Time: Within a few hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
