import { useState } from "react";
import { GradientText } from "../magicui/gradient-text";
import { Spotlight } from "../magicui/spotlight";

const educationData = [
  {
    id: "btech",
    year: "2019 - 2023",
    degree: "Bachelor of Technology",
    field: "Computer Science",
    university: "Example University",
    description:
      "Graduated with honors. Focused on software development and artificial intelligence. Completed multiple research projects and participated in hackathons and coding competitions.",
    courses: ["Data Structures", "Algorithms", "Machine Learning", "Web Development"],
  },
  {
    id: "highschool",
    year: "2017 - 2019",
    degree: "Higher Secondary Education",
    field: "Science",
    university: "Example High School",
    description:
      "Excelled in mathematics and computer science subjects. Class representative and member of the coding club.",
    courses: ["Computer Science", "Mathematics", "Physics", "Chemistry"],
  },
  {
    id: "secondary",
    year: "2015 - 2017",
    degree: "Secondary Education",
    field: "General",
    university: "Example Middle School",
    description:
      "Developed interest in programming and technology. Started learning programming basics and participated in science fairs.",
    courses: ["Basic Computing", "Science", "Mathematics", "English"],
  },
];

export function Education() {
  const [activeTab, setActiveTab] = useState(educationData[0].id);

  const activeEducation = educationData.find((edu) => edu.id === activeTab);

  return (
    <section id="education" className="py-16 md:py-24 relative overflow-hidden">
      <Spotlight
        className="hidden md:block"
        size={1000}
        spotlightClassName="opacity-20"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-16">
          <GradientText
            gradient="from-indigo-500 via-purple-500 to-pink-500"
            animate={true}
            className="text-4xl font-bold"
          >
            Education
          </GradientText>
        </h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Timeline/Years (Left Side) */}
          <div className="md:w-1/3 space-y-1">
            {educationData.map((education) => (
              <button
                key={education.id}
                onClick={() => setActiveTab(education.id)}
                className={`w-full text-left py-4 px-6 rounded-lg transition-all duration-300 flex items-center ${
                  activeTab === education.id
                    ? "bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border-l-4 border-indigo-500"
                    : "hover:bg-gradient-to-r hover:from-indigo-500/10 hover:via-purple-500/10 hover:to-pink-500/10"
                }`}
              >
                <div className="mr-4 flex flex-col items-center justify-center">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      activeTab === education.id
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  ></div>
                  {education.id !== educationData[educationData.length - 1].id && (
                    <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-1"></div>
                  )}
                </div>
                <div>
                  <p
                    className={`font-semibold ${
                      activeTab === education.id
                        ? "text-indigo-500 dark:text-indigo-400"
                        : ""
                    }`}
                  >
                    {education.year}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {education.degree}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Content (Right Side) - Fixed Height Container */}
          <div className="md:w-2/3 bg-gradient-to-br from-background/80 via-background/60 to-background/80 backdrop-blur-sm p-8 rounded-2xl border border-primary/10">
            {/* Use a fixed height container with overflow auto */}
            <div className="h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-2xl font-bold mb-2">
                  {activeEducation.degree} in {activeEducation.field}
                </h3>
                <h4 className="text-xl text-primary/80 mb-4">
                  {activeEducation.university}
                </h4>
                <p className="mb-6 text-muted-foreground">
                  {activeEducation.description}
                </p>

                <div>
                  <h5 className="font-semibold mb-3 text-primary/90">Key Courses</h5>
                  <div className="flex flex-wrap gap-2">
                    {activeEducation.courses.map((course, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0, 0, 0, 0.3);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background-color: rgba(255, 255, 255, 0.1);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
}
