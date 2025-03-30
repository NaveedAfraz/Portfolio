import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MagicCard, MagicCardContent, MagicCardHeader, MagicCardTitle } from "../ui/magic-card";
import { ShineCard, ShineCardContent, ShineCardHeader, ShineCardTitle } from "../magicui/shine-card";
import { GradientText } from "../magicui/gradient-text";
import { useTheme } from "../ThemeProvider";

const skillsData = [
  {
    title: "Frontend Development",
    skills: ["React", "Next.js", "HTML/CSS", "JavaScript", "Tailwind CSS"]
  },
  {
    title: "Backend Development",
    skills: ["Node.js", "Express", "RESTful APIs", "MongoDB", "SQL"]
  },
  {
    title: "Tools & Technologies",
    skills: ["Git", "GitHub", "VS Code", "Agile", "CI/CD"]
  },
];

const Skills = () => {
  const { theme } = useTheme();
  
  const getShimmerColor = (index) => {
    const colors = [
      theme === 'dark' ? 'rgba(129, 140, 248, 0.6)' : 'rgba(99, 102, 241, 0.6)', // Indigo
      theme === 'dark' ? 'rgba(192, 132, 252, 0.6)' : 'rgba(168, 85, 247, 0.6)', // Purple
      theme === 'dark' ? 'rgba(244, 114, 182, 0.6)' : 'rgba(236, 72, 153, 0.6)', // Pink
    ];
    return colors[index % colors.length];
  };

  return (
    <section id="skills" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
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
                <ShineCardTitle>{category.title}</ShineCardTitle>
              </ShineCardHeader>
              <ShineCardContent>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 group-hover:scale-125 transition-transform duration-300"></div>
                      <span>{skill}</span>
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
