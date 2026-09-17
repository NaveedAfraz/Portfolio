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
        <div className="relative rounded-3xl border border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-[#0b0f17]/90 backdrop-blur-xl p-8 sm:p-12 lg:p-16 shadow-2xl shadow-cyan-500/5 text-center">
          
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
            Have a product in mind, a system to modernize, or need a full stack developer? Reach me directly — I usually reply within a few hours.
          </p>

          {/* ── PRIMARY EMAIL CALL-TO-ACTION CARD ── */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-neutral-900/60 max-w-2xl mx-auto text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 dark:text-neutral-500">
                  Primary Email
                </p>
                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                  naveedafraz2003@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
              <button
                onClick={copyEmail}
                className="cursor-pointer flex-1 sm:flex-initial px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-semibold text-slate-800 dark:text-neutral-200 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2"
                title="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href="mailto:naveedafraz2003@gmail.com"
                className="cursor-pointer flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Send Email</span>
                <Send className="w-3.5 h-3.5" />
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
          <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-600 dark:text-neutral-400">
            <div className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-500" />
              <span>Bengaluru / Hyderabad, India · Available Worldwide (Remote)</span>
            </div>
            <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">•</span>
            <div className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-500" />
              <span>Response Time: Within a few hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
