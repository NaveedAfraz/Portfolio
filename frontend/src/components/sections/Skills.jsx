import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MagicCard, MagicCardContent, MagicCardHeader, MagicCardTitle } from "../ui/magic-card";
import { ShineCard, ShineCardContent, ShineCardHeader, ShineCardTitle } from "../magicui/shine-card";
import { GradientText } from "../magicui/gradient-text";
import { useTheme } from "../ThemeProvider";
import { useEffect, useRef, useState } from "react";

const skillsData = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React", proficiency: 80 },
      { name: "Next.js", proficiency: 75 },
      { name: "HTML/CSS", proficiency: 90 },
      { name: "JavaScript", proficiency: 85 },
      { name: "Tailwind CSS", proficiency: 80 }
    ]
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", proficiency: 75 },
      { name: "Express", proficiency: 70 },
      { name: "RESTful APIs", proficiency: 80 },
      { name: "MongoDB", proficiency: 65 },
      { name: "SQL", proficiency: 60 }
    ]
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Git", proficiency: 85 },
      { name: "GitHub", proficiency: 80 },
      { name: "VS Code", proficiency: 90 },
      { name: "Agile", proficiency: 70 },
      { name: "CI/CD", proficiency: 65 }
    ]
  },
];

const Skills = () => {
  const { theme } = useTheme();
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // Initialize animation state to false
    setAnimated(false);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a small delay before starting the animation
          setTimeout(() => {
            setAnimated(true);
          }, 300);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const getShimmerColor = (index) => {
    const colors = [
      theme === 'dark' ? 'rgba(129, 140, 248, 0.6)' : 'rgba(99, 102, 241, 0.6)', // Indigo
      theme === 'dark' ? 'rgba(192, 132, 252, 0.6)' : 'rgba(168, 85, 247, 0.6)', // Purple
      theme === 'dark' ? 'rgba(244, 114, 182, 0.6)' : 'rgba(236, 72, 153, 0.6)', // Pink
    ];
    return colors[index % colors.length];
  };

  return (
    <section id="skills" ref={sectionRef} className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 font-cursive">
          <GradientText 
            gradient="from-indigo-500 via-purple-500 to-pink-500"
            animate={true}
            className="text-4xl font-bold"
          >
            My Skills
          </GradientText>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {skillsData.map((category, index) => (
            <ShineCard 
              key={index} 
              className="group"
              shimmerColor={getShimmerColor(index)}
              shineHover={true}
            >
              <ShineCardHeader>
                <ShineCardTitle className="font-cursive">{category.title}</ShineCardTitle>
              </ShineCardHeader>
              <ShineCardContent>
                <ul className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 group-hover:scale-125 transition-transform duration-300"></div>
                          <span>{skill.name}</span>
                        </div>
                        <span className="text-sm font-medium">{animated ? skill.proficiency : 0}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: animated ? `${skill.proficiency}%` : '0%',
                            transitionDelay: `${skillIndex * 100}ms`
                          }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </ShineCardContent>
            </ShineCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
