import { experienceData } from "../../config/experienceData";
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
                3rd-year BCA student and full-stack developer with 10+ months of hands-on experience, including two paid internships (Tech Students, MS Hygiene Industries) and freelance projects, building web & mobile systems, AI/ML applications, and microservices. Proficient in React, React Native, Next.js, TypeScript, Node.js, Express, Django, FastAPI, and MySQL. Exploring AI/ML applications in real products.
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
                    <h4 className="font-semibold">{exp.degree}</h4>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                      {exp.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{exp.university}</p>
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

          {/* Quick Stats */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-primary">Quick Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">Months Experience</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">6</div>
                <div className="text-sm text-muted-foreground">Professional Roles</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">22+</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Remote Work</div>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
