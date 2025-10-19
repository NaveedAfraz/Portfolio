import { GradientText } from "../magicui/gradient-text";
import { Spotlight } from "../magicui/spotlight";
import { Timeline } from "../ui/timeline";

import { experienceData } from "../../config/experienceData";

export function Experience() {
    // Structure data for Timeline component
    const timelineData = experienceData.map((exp) => ({
        title: exp.year,
        content: (
            <div className="text-white">
                {exp.category === "Internships" && (
                    <div className="mb-4">
                        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-semibold">
                            Internships
                        </span>
                    </div>
                )}
                {exp.category === "Freelance" && (
                    <div className="mb-4">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
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
                        className="mb-4 inline-block text-blue-500 hover:text-blue-700 underline text-sm"
                    >
                        🔗 View Project
                    </a>
                )}
                {exp.remote && (
                    <p className="mb-4 text-green-400 text-sm font-medium">🌐 Remote</p>
                )}
                <p className="mb-6 text-muted-foreground">{exp.description}</p>
                <div>
                    <h5 className="font-semibold mb-3 text-primary/90 sour-gummy">Tech Stack</h5>
                    <div className="flex flex-wrap gap-2">
                        {exp.courses.map((course, idx) => (
                            <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
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
                    <GradientText gradient="from-indigo-500 via-purple-500 to-pink-500" className="text-4xl font-bold" animate={true}

                    >
                        Experience
                    </GradientText>
                    <div className="h-1 w-20 mt-3 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
                </h2>
                <Timeline
                    data={timelineData}
                    showHeader={true}
                    customTitle="8+ Months in Full Stack Development"
                    customDescription="Featuring 4 Professional Projects and Remote Collaborations"
                />
            </div>
        </section>
    );
}
