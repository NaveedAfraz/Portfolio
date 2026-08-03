import { motion } from "motion/react";
import { GradientText } from "../magicui/gradient-text";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import { educationData } from "../../config/educationData";

export function Education() {
  const stickyContent = educationData.map((edu) => ({
    title: `${edu.degree} ${edu.field}`,
    description: `${edu.university} - ${edu.year}`,
    content: (
      <div className="h-full w-full bg-neutral-900/80 text-white backdrop-blur-xl p-5 md:p-6 rounded-2xl border border-neutral-700/50 shadow-xl flex flex-col justify-between">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}>
          <h3 className="text-xl md:text-2xl font-bold mb-1.5 sour-gummy text-cyan-400">
            {edu.degree} {edu.field}
          </h3>
          <h4 className="text-base text-neutral-400 mb-2 font-semibold">
            {edu.university}
          </h4>
          <p className="mb-4 text-neutral-400 text-xs md:text-sm leading-relaxed">
            {edu.description}
          </p>
          <div>
            <h5 className="font-semibold mb-2 text-neutral-300 text-xs uppercase tracking-wider">
              Key Courses
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {edu.courses.map((course, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="px-2.5 py-1 bg-neutral-800 text-neutral-300 rounded-full text-xs font-medium border border-neutral-700 hover:border-cyan-500/40 transition-colors cursor-default"
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
    <section id="education" className="py-12 md:py-16 relative overflow-hidden bg-transparent">
      <div className="max-w-full mx-auto px-4 sm:px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-3 sour-gummy">
            <GradientText gradient="from-cyan-400 to-cyan-200" animate={true} className="text-4xl font-bold">
              Education
            </GradientText>
            <div className="h-1 w-20 mt-2 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto rounded-full" />
          </h2>
        </motion.div>

        <StickyScroll content={stickyContent} />
      </div>
    </section>
  );
}