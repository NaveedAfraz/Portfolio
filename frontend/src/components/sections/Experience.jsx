import { GradientText } from "../magicui/gradient-text";
import { Spotlight } from "../magicui/spotlight";
import { Timeline } from "../ui/timeline";
import { GitBranch, GitMerge, Calendar, MapPin, ExternalLink, Briefcase } from "lucide-react";
import { experienceData } from "../../config/experienceData";

export function Experience() {
    // Separate present concurrent roles from past merged history
    const presentRoles = experienceData.filter((exp) =>
        ["klipp", "techstudents"].includes(exp.id)
    );

    const pastRoles = experienceData.filter(
        (exp) => !["klipp", "techstudents"].includes(exp.id)
    );

    // Structure past roles for Timeline component
    const timelineData = pastRoles.map((exp) => ({
        title: exp.year,
        content: (
            <div className="text-foreground">
                {exp.category === "Internships" && (
                    <div className="mb-4">
                        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 rounded-full text-sm font-semibold">
                            Internships
                        </span>
                    </div>
                )}
                {exp.category === "Freelance" && (
                    <div className="mb-4">
                        <span className="px-3 py-1 bg-teal-500/20 text-teal-600 dark:text-teal-400 rounded-full text-sm font-semibold">
                            Freelance
                        </span>
                    </div>
                )}
                <h3 className="text-2xl font-bold mb-2 sour-gummy">{exp.role || exp.degree}</h3>
                <h4 className="text-xl text-primary/80 mb-3 sour-gummy">{exp.company || exp.university}</h4>
                <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-medium">
                    {exp.location && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-800/80 border border-neutral-700/60 text-neutral-300">
                            <MapPin className="w-3 h-3 text-cyan-400" />
                            {exp.location}
                        </span>
                    )}
                    {exp.remote && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                            🌐 Remote
                        </span>
                    )}
                </div>
                {exp.link && (
                    <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-4 inline-block text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 underline text-sm"
                    >
                        🔗 View Project
                    </a>
                )}
                <p className="mb-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">{exp.description}</p>
                {exp.projectsList && (
                    <div className="mb-6 bg-black/5 dark:bg-white/5 rounded-lg p-4 border border-black/10 dark:border-white/10">
                        <h5 className="font-semibold mb-3 text-foreground sour-gummy text-base">Delivered Projects & Live Links</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {exp.projectsList.map((proj, pIdx) => (
                                <div key={pIdx} className="flex justify-between items-center bg-black/5 dark:bg-white/5 px-3 py-2 rounded border border-black/10 dark:border-white/5 text-sm">
                                    <span className="font-medium text-foreground">{proj.name}</span>
                                    <div className="flex gap-2 text-xs">
                                        {proj.demo && (
                                             <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                                                {proj.demoLabel || "Demo"}
                                            </a>
                                        )}
                                        {proj.demo && proj.github && (
                                            <span className="text-muted-foreground">|</span>
                                        )}
                                        {proj.github && (
                                            <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-sky-600 dark:text-sky-400 hover:underline">
                                                GitHub
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div>
                    <h5 className="font-semibold mb-3 text-primary/90 sour-gummy">Tech Stack</h5>
                    <div className="flex flex-wrap gap-2">
                        {exp.courses.map((course, idx) => (
                            <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                {course}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        ),
    }));

    // Bullet points for the 2 concurrent present roles
    const presentBullets = {
        klipp: [
            "Built commercial Adobe After Effects CEP plugin with companion web platform (fx.klipp.in) for licensing, automated payments, and user provisioning.",
            "Integrated Whisper.cpp for offline AI audio transcription and IndicTrans2 for accurate multilingual subtitle generation.",
            "Engineered secure native HWID licensing engine, encrypted model delivery, and admin dashboard with Razorpay and Whop billing."
        ],
        techstudents: [
            "Designed and built an end-to-end EdTech platform on microservices architecture, spanning UI/UX, full-stack APIs, and Docker containers.",
            "Delivered 6 role-based dashboards with 13+ production modules covering student authentication, real-time analytics, and assessments.",
            "Architected scalable backend services using Node.js, Express, and MySQL with TanStack Query state hydration and JWT authentication."
        ]
    };

    return (
        <section id="experience" className="py-16 md:py-24 relative overflow-hidden bg-transparent">
            {/* Ambient background glow & tech dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cyan-500/5 dark:bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />

            <Spotlight
                className="hidden md:block"
                size={1000}
                spotlightClassName="opacity-20"
            />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Section Header */}
                <h2 className="text-3xl font-bold tracking-tighter text-center mb-6 sour-gummy">
                    <GradientText gradient="from-cyan-400 to-cyan-200" className="text-4xl font-bold" animate={true}>
                        Experience
                    </GradientText>
                    <div className="h-1 w-20 mt-3 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto rounded-full" />
                    <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mt-4 font-normal tracking-normal normal-case sour-gummy">
                        1 Year in Full Stack Development • Featuring 20+ Paid Startup &amp; Academic Projects
                    </p>
                </h2>

                {/* ── GIT-STYLE CONCURRENT ACTIVE BRANCHES (PRESENT ROLES) ── */}
                <div className="mt-12 mb-6">
                    {/* Top Pill: HEAD · Present */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-semibold shadow-lg shadow-cyan-500/10 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            <span>HEAD · Present</span>
                            <span className="text-cyan-500/40 dark:text-cyan-400/40">·</span>
                            <span className="text-neutral-500 dark:text-neutral-300 font-normal">2 concurrent roles</span>
                        </div>
                    </div>

                    {/* Desktop SVG Fork Connector — Mathematically aligned with card centers at 244 and 756 */}
                    <div className="hidden lg:block w-full max-w-5xl mx-auto h-9 relative my-0.5 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 1000 36" preserveAspectRatio="none" fill="none">
                            {/* Left Branch */}
                            <path
                                d="M 500 0 C 500 20, 244 10, 244 36"
                                stroke="#06b6d4"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                opacity="0.75"
                            />
                            {/* Right Branch */}
                            <path
                                d="M 500 0 C 500 20, 756 10, 756 36"
                                stroke="#06b6d4"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                opacity="0.75"
                            />
                            {/* Center junction dot */}
                            <circle cx="500" cy="2" r="3.5" fill="#06b6d4" />
                            {/* Left card landing dot */}
                            <circle cx="244" cy="33" r="3.5" fill="#06b6d4" />
                            {/* Right card landing dot */}
                            <circle cx="756" cy="33" r="3.5" fill="#06b6d4" />
                        </svg>
                    </div>

                    {/* Mobile vertical line connector */}
                    <div className="lg:hidden w-0.5 h-6 bg-cyan-500/50 mx-auto my-2" />

                    {/* Concurrent Role Cards Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {presentRoles.map((role) => {
                            const bullets = presentBullets[role.id] || [];

                            return (
                                <div
                                    key={role.id}
                                    className="bg-neutral-900/80 dark:bg-[#0c0e14]/90 backdrop-blur-2xl rounded-3xl overflow-hidden border border-neutral-800 hover:border-cyan-500/50 p-6 sm:p-7 transition-all duration-300 shadow-2xl shadow-black/40 relative flex flex-col justify-between group"
                                >
                                    {/* Top Ambient Corner Glow with matching radius & gradient to prevent outline mismatch */}
                                    <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-cyan-500/10 via-cyan-500/5 to-transparent rounded-tr-3xl rounded-bl-full pointer-events-none group-hover:from-cyan-500/20 transition-all duration-500" />

                                    <div>
                                        {/* Active Branch Tag */}
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-semibold w-fit mb-4">
                                            <GitBranch className="w-3.5 h-3.5" />
                                            <span>Active branch</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                        </div>

                                        {/* Header: Title + Company + Metadata */}
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg sm:text-xl font-bold sour-gummy text-white leading-snug">
                                                    {role.role || role.degree}
                                                </h3>
                                                <h4 className="mt-1 text-sm font-semibold text-cyan-400">
                                                    {role.company || role.university}
                                                </h4>
                                            </div>

                                            {/* Date & Location Badges — Always pinned to the right side on desktop */}
                                            <div className="flex flex-row sm:flex-col items-start sm:items-end gap-1.5 text-xs text-neutral-400 shrink-0 flex-wrap sm:flex-nowrap">
                                                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-800/80 border border-neutral-700/60 font-medium whitespace-nowrap text-[11px] sm:text-xs">
                                                    <Calendar className="w-3 h-3 text-cyan-400" />
                                                    {role.year}
                                                </span>
                                                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-800/80 border border-neutral-700/60 font-medium text-[10px] sm:text-[11px] text-neutral-300 whitespace-nowrap">
                                                    <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                                                    {role.location && (
                                                        <span>{role.location} · </span>
                                                    )}
                                                    <span className="text-emerald-400 font-semibold">Remote</span>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Bullet Points */}
                                        <div className="space-y-3 my-6 text-sm text-neutral-300 dark:text-neutral-300 leading-relaxed">
                                            {bullets.map((bullet, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <div className="mt-1 p-1 rounded-md bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 shrink-0 border border-cyan-500/20">
                                                        <Briefcase className="w-3.5 h-3.5" />
                                                    </div>
                                                    <span>{bullet}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer: Tech Stack + Live Site Link */}
                                    <div className="pt-4 border-t border-neutral-800/80">
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                                            {role.courses.slice(0, 8).map((course, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-neutral-800/80 text-neutral-300 border border-neutral-700/60"
                                                >
                                                    {course}
                                                </span>
                                            ))}
                                            {role.courses.length > 8 && (
                                                <span className="px-2 py-1 rounded-lg text-xs font-medium bg-neutral-800/50 text-neutral-400 border border-neutral-800">
                                                    +{role.courses.length - 8}
                                                </span>
                                            )}
                                        </div>

                                        {role.link && (
                                            <a
                                                href={role.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                                            >
                                                <span>Visit Platform ({role.link.replace("https://", "")})</span>
                                                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                            </a>
                                        )}
                                        {role.projectsList?.[0]?.demo && !role.link && (
                                            <a
                                                href={role.projectsList[0].demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                                            >
                                                <span>Visit Platform ({role.projectsList[0].demo.replace("https://", "")})</span>
                                                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Desktop SVG Merge Connector — Mathematically aligned with card centers at 244 and 756 */}
                    <div className="hidden lg:block w-full max-w-5xl mx-auto h-9 relative my-0.5 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 1000 36" preserveAspectRatio="none" fill="none">
                            {/* Left Branch converge */}
                            <path
                                d="M 244 0 C 244 26, 500 18, 500 36"
                                stroke="#06b6d4"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                opacity="0.75"
                            />
                            {/* Right Branch converge */}
                            <path
                                d="M 756 0 C 756 26, 500 18, 500 36"
                                stroke="#06b6d4"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                opacity="0.75"
                            />
                            {/* Left card exit dot */}
                            <circle cx="244" cy="3" r="3.5" fill="#06b6d4" />
                            {/* Right card exit dot */}
                            <circle cx="756" cy="3" r="3.5" fill="#06b6d4" />
                            {/* Center merge dot */}
                            <circle cx="500" cy="33" r="3.5" fill="#06b6d4" />
                        </svg>
                    </div>

                    {/* Mobile vertical line connector */}
                    <div className="lg:hidden w-0.5 h-6 bg-cyan-500/50 mx-auto my-2" />

                    {/* Bottom Pill: Merged History */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-700/80 bg-neutral-900/90 text-neutral-400 text-xs font-mono font-medium shadow-md backdrop-blur-md">
                            <GitMerge className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Merged history</span>
                        </div>
                    </div>
                </div>

                {/* ── TIMELINE FOR PAST / MERGED ROLES ── */}
                <Timeline
                    data={timelineData}
                    showHeader={false}
                />
            </div>
        </section>
    );
}
