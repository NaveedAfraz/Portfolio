import { Button } from "../ui/button";
import { GlowButton } from "../magicui/glow-button";
import { GradientText } from "../magicui/gradient-text";
import { Spotlight } from "../magicui/spotlight";
import { useTheme } from "../ThemeProvider";

const Contact = () => {
  const { theme } = useTheme();

  return (
    <Spotlight
      id="contact" 
      className="py-16 md:py-24 group"
      spotlightColor={theme === 'dark' ? "rgba(120, 119, 198, 0.25)" : "rgba(120, 119, 198, 0.15)"}
      size={1000}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter">
            <GradientText 
              gradient="from-indigo-500 via-purple-500 to-pink-500"
              animate={true}
              className="text-4xl font-bold"
            >
              Let's Work Together
            </GradientText>
          </h2>
          <p className="text-muted-foreground">
            I'm currently available for freelance work or full-time positions.
          </p>
          <GlowButton 
            variant="default"
            glowColor={theme === 'dark' ? "rgba(120, 119, 198, 0.6)" : "rgba(120, 119, 198, 0.4)"}
            gradientColors={["from-indigo-500", "via-purple-500", "to-pink-500"]}
            className="mt-6"
          >
            Contact Me
          </GlowButton>
        </div>
      </div>
      
      {/* MagicUI floating elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-indigo-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
    </Spotlight>
  );
};

export default Contact;
