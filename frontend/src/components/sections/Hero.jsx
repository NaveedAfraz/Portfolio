import { Button } from "../ui/button";
import { useTheme } from "../ThemeProvider";
import { useEffect, useRef } from "react";
import { GlowButton } from "../magicui/glow-button";
import { GradientText } from "../magicui/gradient-text";
import { Spotlight } from "../magicui/spotlight";

const Hero = () => {
  const { theme } = useTheme();
  const heroRef = useRef(null);

  // Handle spotlight effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      heroRef.current.style.setProperty("--x", `${x}px`);
      heroRef.current.style.setProperty("--y", `${y}px`);
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Spotlight
      id="hero"
      ref={heroRef}
      className="min-h-[90vh] flex items-center justify-center group overflow-hidden"
      spotlightColor={
        theme === "dark"
          ? "rgba(120, 119, 198, 0.25)"
          : "rgba(120, 119, 198, 0.15)"
      }
      size={1200}
    >
      {/* Top-left spotlight gradient */}
      <div className="absolute inset-0 -z-10 opacity-80 bg-gradient-to-br from-primary/20 via-background to-background"></div>

      <div className="flex flex-col items-center justify-center text-center space-y-6 w-full max-w-5xl px-4 md:px-8 mx-auto z-10">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
            <GradientText
              gradient={
                theme === "dark"
                  ? "from-indigo-400 via-purple-400 to-pink-400"
                  : "from-indigo-600 via-purple-600 to-pink-600"
              }
              animate={true}
            >
              Hi, I'm Naveed
            </GradientText>
          </h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            A passionate developer focused on creating elegant solutions to
            complex problems.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <GlowButton
            variant="default"
            glowColor={
              theme === "dark"
                ? "rgba(120, 119, 198, 0.6)"
                : "rgba(120, 119, 198, 0.4)"
            }
            gradientColors={[
              "from-indigo-500",
              "via-purple-500",
              "to-pink-500",
            ]}
            onClick={() => scrollToSection("projects")}
          >
            View My Work
          </GlowButton>
          <GlowButton
            variant="outline"
            glowColor={
              theme === "dark"
                ? "rgba(120, 119, 198, 0.4)"
                : "rgba(120, 119, 198, 0.2)"
            }
            onClick={() => scrollToSection("contact")}
          >
            Contact Me
          </GlowButton>
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-secondary/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/2 right-1/2 w-72 h-72 bg-accent/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-1/2 right-1/2 w-72 h-72 bg-accent/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
      <div className="absolute bottom-1/2 right-1/2 w-72 h-72 bg-accent/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-8000"></div>
      {/* Decorative elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 border border-primary/10 rounded-full"></div>
      <div className="absolute top-60 left-10 w-80 h-80 border border-primary/10 rounded-full"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 border border-primary/10 rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-grid-primary/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    </Spotlight>
  );
};

export default Hero;
