import { useTheme } from "../ThemeProvider";
import { useEffect, useRef, useState } from "react";
import { GradientText } from "../magicui/gradient-text";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaNodeJs,
  FaGitAlt,
  FaGithub,

} from "react-icons/fa";

import {
  SiRedux,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiSocketdotio,
  SiGithubactions,
  SiShadcnui,
  SiReactquery,
  SiMysql,
  SiRedis,
  SiTypescript,
  SiRabbitmq,
  SiReact,
  SiNextdotjs,
  SiDjango,
  SiPython,
  SiJest,
  SiCypress
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { Cpu } from "lucide-react";

const getSkillsData = (theme) => [
  {
    title: "Frontend Development",
    skills: [
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: theme === "dark" ? "#FFFFFF" : "#000000" },
      { name: "React Native", icon: SiReact, color: "#61DAFB" },
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Shadcn", icon: SiShadcnui, color: theme === "dark" ? "#FFFFFF" : "#000000" },
    ],
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Django", icon: SiDjango, color: "#44B78B" },
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: theme === "dark" ? "#FFFFFF" : "#000000" },
      { name: "Redis", icon: SiRedis, color: "#D82C20" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "SQL", icon: SiMysql, color: "#00758F" },
      { name: "MicroServices", icon: Cpu, color: "#d22121" }
    ],
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Git", icon: FaGitAlt, color: "#F05032" },
      { name: "Jest", icon: SiJest, color: "#C21325" },
      { name: "Cypress", icon: SiCypress, color: "#04C38F" },
      { name: "RabbitMQ", icon: SiRabbitmq, color: "#FF6600" },
      { name: "Socket", icon: SiSocketdotio, color: theme === "dark" ? "#FFFFFF" : "#000000" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "TanStack Query", icon: SiReactquery, color: "#FF4154" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
    ],
  },
];

const Skills = () => {
  const { theme } = useTheme();
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);
  const skillsData = getSkillsData(theme);

  useEffect(() => {
    setAnimated(false);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          setAnimated(true);
        }, 300);
      }
    }, { threshold: 0.3 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-3 sour-gummy">
          <GradientText gradient="from-cyan-500 via-sky-500 to-blue-600" animate={true} className="text-4xl font-bold">
            My Skills
          </GradientText>
          <div className="h-1 w-20 mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />

        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">

          {skillsData.map((category, index) => (
            <CardContainer key={index} className="inter-var w-full">
              <CardBody className="bg-card text-card-foreground relative group/card border-black/[0.1] dark:border-white/[0.2] border w-full h-full rounded-xl p-6">
                <CardItem translateZ="50" className="text-xl font-bold sour-gummy text-foreground">
                  {category.title}
                </CardItem>
                <CardItem translateZ="60" className="mt-4 w-full">
                  <ul className="grid grid-cols-2 gap-4">
                    {category.skills.map((skill, skillIndex) => {
                      const IconComponent = skill.icon;
                      return (
                        <li key={skillIndex} className="flex flex-col items-center gap-2 p-2">
                          <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-muted/80 transition-all duration-500 ${animated ? "opacity-100 scale-100" : "opacity-0 scale-0"}`} style={{ transitionDelay: `${skillIndex * 50}ms` }}>
                            <IconComponent size={30} color={skill.color} className="transform transition-all duration-300 hover:rotate-12" />
                          </div>
                          <span className="text-sm font-medium text-center text-foreground">
                            {skill.name}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
