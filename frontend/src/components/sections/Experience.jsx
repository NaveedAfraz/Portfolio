import { GradientText } from "../magicui/gradient-text";
import { Spotlight } from "../magicui/spotlight";
import { Timeline } from "../ui/timeline";

import { experienceData } from "../../config/experienceData";

export function Experience() {
    // Keep chronological order (newest/Present first)
    const sortedExperienceData = [...experienceData];

    // Structure data for Timeline component
    const timelineData = sortedExperienceData.map((exp) => ({
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
                <h3 className="text-2xl font-bold mb-2 sour-gummy">{exp.degree}</h3>
                <h4 className="text-xl text-primary/80 mb-4 sour-gummy">{exp.university}</h4>
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
                {exp.remote && (
                    <p className="mb-4 text-emerald-600 dark:text-emerald-400 text-sm font-medium">🌐 Remote</p>
                )}
                <p className="mb-6 text-muted-foreground">{exp.description}</p>
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

    return (
        <section id="experience" className="py-16 md:py-24 relative overflow-hidden">
            <Spotlight
                className="hidden md:block"
                size={1000}
                spotlightClassName="opacity-20"
            />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <h2 className="text-3xl font-bold tracking-tighter text-center mb-10 sour-gummy">
                    <GradientText gradient="from-cyan-500 via-sky-500 to-blue-600" className="text-4xl font-bold" animate={true}

                    >
                        Experience
                    </GradientText>
                    <div className="h-1 w-20 mt-3 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
                    <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto mt-4 font-normal tracking-normal normal-case font-sans">
                        10+ Months in Full Stack Development • Featuring 6+ Professional Projects and Remote Collaborations
                    </p>
                </h2>
                <Timeline
                    data={timelineData}
                    showHeader={true}
                    customTitle="10+ Months in Full Stack Development"
                    customDescription="Featuring 6+ Professional Projects and Remote Collaborations"
                />
            </div>
        </section>
    );
}
