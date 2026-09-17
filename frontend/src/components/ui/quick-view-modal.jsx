import { experienceData } from "../../config/experienceData";
import { Timer, FolderGit2, GraduationCap, Briefcase } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import "./quick-view-modal.css";

const QuickViewModal = ({ isOpen, onClose }) => {
  // Extract important skills from Skills component
  const importantSkills = [
    "React", "Next.js", "React Native", "TypeScript", "JavaScript", "Tailwind CSS",
    "Python", "Django", "Node.js", "Express", "MongoDB", "SQL", "Redis", "Docker",
    "scikit-learn", "NumPy", "Pandas", "Git", "Jest", "Cypress", "Postman", "GitHub Actions"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle>Quick Overview</DialogTitle>
          <DialogDescription>
            A summary of my experience, skills, and key achievements
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* Profile Overview */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-primary">Profile Overview</h3>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-muted-foreground leading-relaxed">
                Full-Stack Developer with 1+ year of hands-on experience across web, mobile apps, microservices, and end-to-end system architecture. Delivered 20+ production applications, including Klipp (AI AE Plugin), Tech Students EdTech platform, and custom client solutions. Proficient in React, Next.js, React Native, Node.js, Express, Python, Django, FastAPI, Docker, and MySQL (complex 80+ table schema architecture).
              </p>
            </div>
          </section>

          {/* Experience Summary */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-primary">Experience</h3>
            <div className="space-y-4">
              {experienceData.map((exp) => (
                <div key={exp.id} className="border-l-2 border-primary/20 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{exp.role || exp.degree}</h4>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                      {exp.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{exp.company || exp.university}</p>
                  <p className="text-sm font-medium">{exp.year}</p>
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline mt-1 inline-block"
                    >
                      🔗 View Project
                    </a>
                  )}
                  {exp.projectsList && (
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Projects Delivered ({exp.projectsList.length}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.projectsList.map((project, i) => (
                          <a
                            key={i}
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded text-xs text-primary transition-colors"
                            title={project.demoLabel || "View Live"}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500/80 animate-pulse"></span>
                            {project.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Skills Summary */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-primary">Technical Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {importantSkills.map((skill) => (
                <div
                  key={skill}
                  className="bg-muted/50 border border-border rounded-md px-3 py-2 text-sm font-medium"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>

          {/* Quick Stats - 100% consistent with Hero section */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-primary">Quick Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted/30 dark:bg-neutral-900/60 border border-border rounded-xl">
                <div className="flex items-center gap-1.5 text-cyan-500 font-extrabold text-xl mb-1">
                  <Timer className="w-5 h-5 shrink-0" />
                  <span>1+ Yr</span>
                </div>
                <div className="text-sm font-bold text-foreground">Experience</div>
                <div className="text-xs text-muted-foreground mt-0.5">Full Stack Dev</div>
              </div>

              <div className="p-4 bg-muted/30 dark:bg-neutral-900/60 border border-border rounded-xl">
                <div className="flex items-center gap-1.5 text-cyan-500 font-extrabold text-xl mb-1">
                  <FolderGit2 className="w-5 h-5 shrink-0" />
                  <span>20+</span>
                </div>
                <div className="text-sm font-bold text-foreground">Projects Delivered</div>
                <div className="text-xs text-muted-foreground mt-0.5">7 Clients + 13 Final Year</div>
              </div>

              <div className="p-4 bg-muted/30 dark:bg-neutral-900/60 border border-border rounded-xl">
                <div className="flex items-center gap-1.5 text-cyan-500 font-extrabold text-xl mb-1">
                  <GraduationCap className="w-5 h-5 shrink-0" />
                  <span>BCA</span>
                </div>
                <div className="text-sm font-bold text-foreground">Degree</div>
                <div className="text-xs text-muted-foreground mt-0.5">Computer Science</div>
              </div>

              <div className="p-4 bg-muted/30 dark:bg-neutral-900/60 border border-border rounded-xl">
                <div className="flex items-center gap-1.5 text-cyan-500 font-extrabold text-xl mb-1">
                  <Briefcase className="w-5 h-5 shrink-0" />
                  <span>7+</span>
                </div>
                <div className="text-sm font-bold text-foreground">Engagements</div>
                <div className="text-xs text-muted-foreground mt-0.5">Intern &amp; Freelance</div>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
