import { Button } from "../ui/button";
import { GlowButton } from "../magicui/glow-button";
import { GradientText } from "../magicui/gradient-text";
import { Spotlight } from "../magicui/spotlight";
import { useTheme } from "../ThemeProvider";
import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const handleContactClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Spotlight
      id="contact"
      className="py-16 md:py-24 group"
      spotlightColor={
        theme === "dark"
          ? "rgba(120, 119, 198, 0.25)"
          : "rgba(120, 119, 198, 0.15)"
      }
      size={1000}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter font-cursive">
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
            className="mt-6"
            onClick={handleContactClick}
          >
            Contact Me
          </GlowButton>
        </div>
      </div>

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className={`bg-${
              theme === "dark" ? "gray-800" : "white"
            } rounded-lg shadow-xl p-6 max-w-md w-full relative transform transition-all duration-300 scale-100`}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-bold mb-4 text-center">
              <GradientText
                gradient="from-indigo-500 via-purple-500 to-pink-500"
                className="text-2xl font-bold"
              >
                Get In Touch
              </GradientText>
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Email</h4>
                <p className="text-muted-foreground">
                  <a
                    href="mailto:your.email@example.com"
                    className="text-indigo-500 hover:underline"
                  >
                    NaveedAfraz2003@gmail.com
                  </a>
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Social Media</h4>
                <div className="flex space-x-4 justify-center">
                  <Link
                    to="https://github.com/naveedafraz"
                    className="text-indigo-500 hover:text-indigo-700"
                  >
                    GitHub
                  </Link>
                  <Link
                    to="https://www.linkedin.com/in/naveed-afraz-977a46310/"
                    className="text-indigo-500 hover:text-indigo-700"
                  >
                    LinkedIn
                  </Link>
                  <Link
                    to="https://twitter.com/naveedafraz2"
                    className="text-indigo-500 hover:text-indigo-700"
                  >
                    Twitter
                  </Link>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() =>
                    (window.location.href = "mailto:your.email@example.com")
                  }
                  className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                >
                  Send Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MagicUI floating elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-indigo-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob animation-delay-2000"></div>
    </Spotlight>
  );
};

export default Contact;
