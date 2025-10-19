import { motion } from "motion/react";
import { GradientText } from "../magicui/gradient-text";
import { Spotlight } from "../magicui/spotlight";
import { StickyScroll } from "../ui/sticky-scroll-reveal";

import { educationData } from "../../config/educationData";

export function Education() {
  const stickyContent = educationData.map((edu) => ({
    title: `${edu.degree} ${edu.field}`,
    description: `${edu.university} - ${edu.year}`,
    content: (
      <div className="h-full w-full bg-card text-card-foreground backdrop-blur-2xl p-8 rounded-2xl border border-border shadow-inner">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}>
          <h3 className="text-2xl font-bold mb-2 sour-gummy bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            {edu.degree} {edu.field}
          </h3>
          <h4 className="text-lg text-muted-foreground mb-4 font-semibold">
            {edu.university}
          </h4>
          <p className="mb-6 text-muted-foreground text-sm leading-relaxed">
            {edu.description}
          </p>
          <div>
            <h5 className="font-semibold mb-3 text-foreground text-sm uppercase tracking-wider">
              Key Courses
            </h5>
            <div className="flex flex-wrap gap-2">
              {edu.courses.map((course, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-xs font-medium border border-border hover:border-primary/50 transition-colors cursor-default"
                >
                  {course}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    ),
  }));

  return (
    <section id="education" className="py-20 md:py-32 relative overflow-hidden bg-background">

      <div className="max-w-full mx-auto px-4 sm:px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-3 sour-gummy">
            <GradientText gradient="from-indigo-500 via-purple-500 to-pink-500" className="text-4xl font-bold" animate={true}

            >
               Education
            </GradientText>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
        </motion.div>

        <StickyScroll content={stickyContent} />
      </div>
    </section>
  );
}