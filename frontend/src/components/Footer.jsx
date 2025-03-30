import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-6 md:py-12 border-t">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Naveed. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              to="https://github.com/NaveedAfraz"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              GitHub
            </Link>
            <Link
              to="https://www.linkedin.com/in/naveed-afraz-977a46310/"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              LinkedIn
            </Link>
            <Link
              to="https://twitter.com/NaveedAfraz2"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
