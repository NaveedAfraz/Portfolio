import { useTheme } from "../ThemeProvider";
import { useEffect, useRef, useState } from "react";
import { Spotlight } from "../magicui/spotlight";
import { AuroraBackground } from "../ui/aurora-background";
import QuickViewModal from "../ui/quick-view-modal";
import resume from "../../assets/Naveed_Resume.pdf";
import { motion } from "framer-motion";
import { ArrowRight, Send, Download, Sparkles, Code2, MessageCircle, Eye, Timer, FolderGit2, GraduationCap, Briefcase, Layers } from "lucide-react";

const Hero = () => {
  const { theme } = useTheme();
  const heroRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

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
      clearTimeout(timer);
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

  const techRow1 = [
    { name: "React.js", icon: <svg viewBox="0 0 24 24" fill="#61DAFB" className="w-4 h-4"><path d="M12 10.11A1.87 1.87 0 1 1 10.13 12 1.88 1.88 0 0 1 12 10.11m0-8.11c5.52 0 10 2.24 10 5a3.15 3.15 0 0 1-1.59 2.57A3.15 3.15 0 0 1 22 12c0 2.76-4.48 5-10 5S2 14.76 2 12a3.15 3.15 0 0 1 1.59-2.43A3.15 3.15 0 0 1 2 7c0-2.76 4.48-5 10-5m0 1.67C7 3.67 3.67 5.57 3.67 7S7 10.33 12 10.33 20.33 8.43 20.33 7 17 3.67 12 3.67m0 16.66C17 20.33 20.33 18.43 20.33 17a1.52 1.52 0 0 0-.87-1.28A18.15 18.15 0 0 1 12 17a18.15 18.15 0 0 1-7.46-1.28A1.52 1.52 0 0 0 3.67 17c0 1.43 3.33 3.33 8.33 3.33m0-5.82a20.07 20.07 0 0 0 8.15-1.51A1.51 1.51 0 0 0 20.33 12a1.51 1.51 0 0 0-.18-1 20.07 20.07 0 0 0-8.15 1.5A20.07 20.07 0 0 0 3.85 11a1.51 1.51 0 0 0-.18 1 1.51 1.51 0 0 0 .18 1A20.07 20.07 0 0 0 12 14.51Z"/></svg> },
    { name: "React Native", icon: <svg viewBox="0 0 24 24" fill="#61DAFB" className="w-4 h-4"><path d="M12 10.11A1.87 1.87 0 1 1 10.13 12 1.88 1.88 0 0 1 12 10.11m0-8.11c5.52 0 10 2.24 10 5a3.15 3.15 0 0 1-1.59 2.57A3.15 3.15 0 0 1 22 12c0 2.76-4.48 5-10 5S2 14.76 2 12a3.15 3.15 0 0 1 1.59-2.43A3.15 3.15 0 0 1 2 7c0-2.76 4.48-5 10-5m0 1.67C7 3.67 3.67 5.57 3.67 7S7 10.33 12 10.33 20.33 8.43 20.33 7 17 3.67 12 3.67m0 16.66C17 20.33 20.33 18.43 20.33 17a1.52 1.52 0 0 0-.87-1.28A18.15 18.15 0 0 1 12 17a18.15 18.15 0 0 1-7.46-1.28A1.52 1.52 0 0 0 3.67 17c0 1.43 3.33 3.33 8.33 3.33m0-5.82a20.07 20.07 0 0 0 8.15-1.51A1.51 1.51 0 0 0 20.33 12a1.51 1.51 0 0 0-.18-1 20.07 20.07 0 0 0-8.15 1.5A20.07 20.07 0 0 0 3.85 11a1.51 1.51 0 0 0-.18 1 1.51 1.51 0 0 0 .18 1A20.07 20.07 0 0 0 12 14.51Z"/></svg> },
    { name: "Next.js", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.859 8.292 8.208 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0z"/></svg> },
    { name: "TypeScript", icon: <svg viewBox="0 0 24 24" fill="#3178C6" className="w-4 h-4"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg> },
    { name: "Node.js", icon: <svg viewBox="0 0 24 24" fill="#5FA04E" className="w-4 h-4"><path d="M11.998.016a1.343 1.343 0 0 0-.671.179L1.554 5.886a1.344 1.344 0 0 0-.671 1.164v11.415a1.344 1.344 0 0 0 .671 1.164l9.773 5.69a1.343 1.343 0 0 0 1.342 0l9.773-5.69a1.344 1.344 0 0 0 .671-1.164V7.05a1.344 1.344 0 0 0-.671-1.164L12.67.195a1.343 1.343 0 0 0-.671-.179zm-.014 5.43 4.586 2.654v2.654l-2.286-1.32v2.64l2.286 1.325v2.649l-4.586-2.654V10.74l2.286 1.325V9.42l-2.286-1.325zm-4.586 0 2.286 1.325v2.64L7.398 10.74v2.655l2.286 1.325v2.649l-4.586-2.654V7.1z"/></svg> },
    { name: "Express.js", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-80"><path d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.814 6.411zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.284.926.926 0 0 0-.139-.182zm1.114-.049h9.128c-.065-3.126-2.001-5.294-4.358-5.342-2.620-.053-4.690 2.086-4.77 5.342z"/></svg> },
    { name: "MySQL", icon: <svg viewBox="0 0 24 24" fill="#4479A1" className="w-4 h-4"><path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.133-.04-.048-.109-.09-.182-.158zM5.77 18.695h-.927a50.854 50.854 0 0 0-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 0 0-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.357-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.271 2.108-.44 0-.77-.167-.975-.505z"/></svg> },
    { name: "MongoDB", icon: <svg viewBox="0 0 24 24" fill="#47A248" className="w-4 h-4"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.908-.1-1.507-.198-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/></svg> },
  ];

  const techRow2 = [
    { name: "Docker", icon: <svg viewBox="0 0 24 24" fill="#2496ED" className="w-4 h-4"><path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.379-.raise1 1.36-.979 1.36-1.81a3.84 3.84 0 0 0-.002-.189c0-.014-.002-.027-.002-.041v-.053c0-.024-.001-.048-.003-.072a5.69 5.69 0 0 0-.024-.274 6.614 6.614 0 0 0-.098-.658 5.8 5.8 0 0 0-.177-.58 4.638 4.638 0 0 0-.259-.555 4.04 4.04 0 0 0-.337-.507 3.707 3.707 0 0 0-.413-.46 3.51 3.51 0 0 0-.487-.413 3.49 3.49 0 0 0-.554-.363 3.78 3.78 0 0 0-.616-.305 4.27 4.27 0 0 0-.673-.237 5.012 5.012 0 0 0-.726-.162 5.976 5.976 0 0 0-.773-.085 7.13 7.13 0 0 0-.813-.007c-.015 0-.03.001-.044.002a5.875 5.875 0 0 0-.565.053c-.018-.097-.038-.193-.06-.288a5.02 5.02 0 0 0-.194-.665 3.937 3.937 0 0 0-.303-.62 3.317 3.317 0 0 0-.407-.538 2.922 2.922 0 0 0-.507-.458 2.665 2.665 0 0 0-.6-.338 2.563 2.563 0 0 0-.686-.168 2.733 2.733 0 0 0-.765.006 3.12 3.12 0 0 0-.836.24 3.88 3.88 0 0 0-.9.54H2.182c-.267 0-.521.11-.71.305a1.04 1.04 0 0 0-.294.72v12.377c0 .276.106.542.294.736a1.01 1.01 0 0 0 .71.305h19.637a.99.99 0 0 0 .71-.305 1.04 1.04 0 0 0 .294-.736V10.588a.84.84 0 0 0-.06-.697z"/></svg> },
    { name: "Django", icon: <svg viewBox="0 0 24 24" fill="#092E20" className="w-4 h-4"><path d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4-.703-4.918-2.686-5.644V6.148c2.35-.384 3.294-1.393 3.294-4.386V0H7.23v1.428c0 3.775-1.57 5.218-5.53 5.593v1.939c2.498.422 3.6 1.44 3.6 5.12 0 3.69 2.072 5.32 6.196 5.32a24.9 24.9 0 0 0 2.65-.144V0h-3zm9.174 12.383h-3.13V0h-1.05v12.383h-2.072l3.126 4.01 3.126-4.01z"/></svg> },
    { name: "FastAPI", icon: <svg viewBox="0 0 24 24" fill="#009688" className="w-4 h-4"><path d="M12 0C5.376 0 0 5.376 0 12c0 6.627 5.376 12 12 12 6.627 0 12-5.373 12-12 0-6.624-5.373-12-12-12zm-.624 21.624v-7.256H7.19L13.5 2.393v7.25h4.19L11.376 21.624z"/></svg> },
    { name: "Tailwind CSS", icon: <svg viewBox="0 0 24 24" fill="#06B6D4" className="w-4 h-4"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg> },
    { name: "Redux", icon: <svg viewBox="0 0 24 24" fill="#764ABC" className="w-4 h-4"><path d="M16.634 16.504c.87-.075 1.543-.84 1.5-1.754-.043-.914-.78-1.635-1.694-1.635h-.06c-.94.043-1.678.824-1.635 1.765.044.418.197.793.436 1.07-1.065 1.04-2.36 1.65-3.75 1.65-1.346 0-2.547-.57-3.447-1.504-1.043-1.023-1.46-2.314-1.46-3.48 0-2.06 1.125-4.007 2.998-5.1.283.238.652.397 1.063.397.918 0 1.653-.744 1.653-1.652 0-.918-.735-1.65-1.653-1.65-.918 0-1.653.732-1.653 1.65v.063c-.15.025-.294.063-.432.1C9.55 6.74 9.55 6.74 9.55 6.74c-.3-.12-.643-.18-.998-.18-.15 0-.293.018-.428.05a5.68 5.68 0 0 0-.36-.05c-.155 0-.313.02-.46.055a4.5 4.5 0 0 0-.55-.082c-.89-.08-1.71.225-2.267.816-.555.576-.825 1.355-.752 2.185.03.26.09.51.182.743-.238.284-.372.648-.375 1.05-.006.52.192 1.01.557 1.383.36.365.84.56 1.363.56.03 0 .062 0 .09-.003h.048v.12c0 3.51 2.77 6.37 6.168 6.37 1.626 0 3.166-.66 4.31-1.8l.004-.004zm-7.085-11.2c.31 0 .56.25.56.56s-.25.56-.56.56-.56-.25-.56-.56.25-.56.56-.56zm9.87 10.18a5.94 5.94 0 0 0 .098-1.07c0-1.354-.5-2.594-1.32-3.547.067-.213.1-.437.1-.66 0-1.2-.96-2.165-2.148-2.165-1.19 0-2.15.965-2.15 2.165 0 1.196.96 2.164 2.15 2.164.14 0 .28-.015.415-.04C18.22 14.3 18.7 15.457 18.7 16.71c0 .236-.023.46-.06.677-.24.075-.452.2-.624.365-.316.3-.494.715-.494 1.146 0 .892.715 1.607 1.607 1.607.89 0 1.607-.715 1.607-1.607-.002-.74-.5-1.37-1.18-1.57-.013-.013-.02-.023-.02-.036zm-1.65 2.45a.497.497 0 0 1-.5-.5c0-.275.224-.5.5-.5s.5.225.5.5-.225.5-.5.5z"/></svg> },
    { name: "Razorpay", icon: <svg viewBox="0 0 24 24" fill="#072654" className="w-4 h-4"><path d="M5.554 0L0 24l4.59-2.087L15.09 0H5.554zm8.338 0l-4.616 9.535 1.48 5.508L24 0H13.892z"/></svg> },
    { name: "Git & GitHub", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
    { name: "Microservices", icon: <Layers className="w-4 h-4 text-neutral-400" /> },
  ];

  return (
    <>
      {/* ── DESKTOP Hero: min-h-screen, clean tight padding ─────── */}
      <div className="hidden lg:block relative min-h-screen overflow-hidden">

        {/* Portrait — desktop only: touches top and bottom of section */}
        <div
          className={`absolute top-0 right-0 h-full w-[48%] pointer-events-none z-[1] overflow-hidden transition-all duration-700 ease-in-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute top-1/2 right-12 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
          
          {/* Smooth left-to-right background gradient overlay — synchronized 500ms theme transition */}
          <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-slate-50 via-slate-50/30 to-transparent dark:from-[#07090e] dark:via-[#07090e]/30 dark:to-transparent z-10 pointer-events-none transition-colors duration-500" />

          <div
            className="w-full h-full relative"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 25%, black 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 25%, black 100%)",
            }}
          >
            <img
              src="/images/naveed-ai-portrait.png"
              alt="Naveed Afraz"
              className="w-full h-full object-cover object-[center_0%] dark:opacity-65 opacity-80 dark:brightness-85 brightness-95 filter contrast-105 transition-opacity duration-300"
            />
          </div>
        </div>

        <div
          id="Home"
          ref={heroRef}
          className="relative w-full flex items-center justify-center pt-20 pb-4"
        >
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 z-10 grid lg:grid-cols-12 gap-8 items-center pt-8 pb-0">
          <div className="lg:col-span-7 z-10 relative space-y-4 text-left pb-0">
            
            {/* Cursive Greeting */}
            <div
              className={`transition-all duration-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="font-serif italic text-cyan-500 dark:text-cyan-400 text-3xl sm:text-4xl font-normal tracking-wide">
                Hello, I'm
              </p>
            </div>

            {/* Name & Title Header */}
            <div className="space-y-2">
              <h1
                className={`text-5xl sm:text-7xl font-bold tracking-tight sour-gummy transition-all duration-1000 ease-out ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <span className={theme === "dark" ? "text-white" : "text-slate-900"}>
                  Naveed Afraz
                </span>
              </h1>

              <h2
                className={`text-xl sm:text-2xl font-medium tracking-tight text-neutral-600 dark:text-neutral-300 sour-gummy transition-all duration-1000 delay-200 ease-out ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                I build{" "}
                <span className="font-serif italic text-cyan-500 dark:text-cyan-400 font-normal pr-1">
                  Web Apps
                </span>{" "}
                &{" "}
                <span className="font-serif italic text-amber-500 dark:text-amber-400 font-normal">
                  Mobile Apps
                </span>
                <span className="animate-pulse text-cyan-500 font-bold ml-0.5">|</span>
              </h2>
            </div>

            {/* Quote / Bio Paragraph */}
            <div
              className={`relative border-l-2 border-cyan-500/50 pl-5 py-1 transition-all duration-1000 delay-300 ease-out ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mt-4 sm:mt-6 leading-relaxed sm:leading-loose">
                I enjoy building things that didn't exist yesterday. Every project begins with an idea and ends with something people can use. That's the part I never get tired of.
              </p>
            </div>

            {/* Action Buttons */}
            <div
              className={`flex flex-wrap items-center gap-4 pt-1 transition-all duration-1000 delay-400 ease-out ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="cursor-pointer group relative px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              >
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className={`cursor-pointer px-7 py-3.5 rounded-xl font-semibold text-sm border transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95 ${
                  theme === "dark"
                    ? "bg-neutral-900/60 border-neutral-700 text-white hover:bg-neutral-800"
                    : "bg-white border-neutral-300 text-slate-800 hover:bg-neutral-100 shadow-sm"
                }`}
              >
                Let's Connect
                <Send className="w-4 h-4 text-cyan-600 dark:text-cyan-500" />
              </button>

              <a href={resume} download="NaveedAfrazResume(Latest) (1).pdf">
                <button
                  className={`cursor-pointer px-4 py-3.5 rounded-xl font-medium text-xs border transition-all flex items-center gap-1.5 ${
                    theme === "dark"
                      ? "bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800/60"
                      : "bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-black hover:bg-neutral-200"
                  }`}
                >
                  <Download className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  Resume
                </button>
              </a>

              <button
                onClick={() => setIsQuickViewOpen(true)}
                className={`cursor-pointer px-4 py-3.5 rounded-xl font-medium text-xs border transition-all flex items-center gap-1.5 ${
                  theme === "dark"
                    ? "bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800/60"
                    : "bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-black hover:bg-neutral-200"
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                Quick View
              </button>
            </div>

            {/* Technologies I Work With - 2 Row Marquee Slider */}
            <div
              className={`pt-5 border-t border-neutral-200 dark:border-neutral-800/80 transition-all duration-1000 delay-500 ease-out overflow-hidden max-w-full ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-cyan-500" /> TECHNOLOGIES I WORK WITH
              </p>

              <div className="relative overflow-hidden w-full py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                {/* Row 1 - Sliding Left */}
                <motion.div
                  className="flex gap-3 w-max mb-3"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
                >
                  {[...techRow1, ...techRow1].map((tech, idx) => (
                    <span
                      key={idx}
                      className={`px-4 py-2 rounded-2xl text-xs font-semibold border flex items-center gap-2 backdrop-blur-md whitespace-nowrap shadow-sm cursor-default ${
                        theme === "dark"
                          ? "bg-neutral-900/80 border-neutral-800 text-neutral-200"
                          : "bg-white border-neutral-200 text-neutral-800"
                      }`}
                    >
                      <span className="text-sm flex items-center">{tech.icon}</span>
                      <span>{tech.name}</span>
                    </span>
                  ))}
                </motion.div>

                {/* Row 2 - Sliding Right */}
                <motion.div
                  className="flex gap-3 w-max"
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
                >
                  {[...techRow2, ...techRow2].map((tech, idx) => (
                    <span
                      key={idx}
                      className={`px-4 py-2 rounded-2xl text-xs font-semibold border flex items-center gap-2 backdrop-blur-md whitespace-nowrap shadow-sm cursor-default ${
                        theme === "dark"
                          ? "bg-neutral-900/80 border-neutral-800 text-neutral-200"
                          : "bg-white border-neutral-200 text-neutral-800"
                      }`}
                    >
                      <span className="text-sm">{tech.icon}</span>
                      <span>{tech.name}</span>
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Bottom 4 Metric Cards Grid */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 transition-all duration-1000 delay-600 ease-out ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <div className={`p-4 rounded-2xl border transition-all hover:scale-102 ${
                theme === "dark" ? "bg-neutral-900/60 border-neutral-800/80" : "bg-white border-neutral-200 shadow-sm"
              }`}>
                <div className="flex items-center gap-2 text-cyan-500 font-extrabold text-xl sour-gummy">
                  <Timer className="w-5 h-5" /> 1+ Yr
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-1 sour-gummy">Experience</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Full Stack Development</p>
              </div>

              <div className={`p-4 rounded-2xl border transition-all hover:scale-102 ${
                theme === "dark" ? "bg-neutral-900/60 border-neutral-800/80" : "bg-white border-neutral-200 shadow-sm"
              }`}>
                <div className="flex items-center gap-2 text-cyan-500 font-extrabold text-xl sour-gummy">
                  <FolderGit2 className="w-5 h-5" /> 20+
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-1 sour-gummy">Projects Delivered</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">7 Clients + 13 Final Year Projects</p>
              </div>

              <div className={`p-4 rounded-2xl border transition-all hover:scale-102 ${
                theme === "dark" ? "bg-neutral-900/60 border-neutral-800/80" : "bg-white border-neutral-200 shadow-sm"
              }`}>
                <div className="flex items-center gap-2 text-cyan-500 font-extrabold text-xl sour-gummy">
                  <GraduationCap className="w-5 h-5" /> BCA
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-1 sour-gummy">Degree</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">St. Joseph Degree College</p>
              </div>

              <div className={`p-4 rounded-2xl border transition-all hover:scale-102 ${
                theme === "dark" ? "bg-neutral-900/60 border-neutral-800/80" : "bg-white border-neutral-200 shadow-sm"
              }`}>
                <div className="flex items-center gap-2 text-cyan-500 font-extrabold text-xl sour-gummy">
                  <Briefcase className="w-5 h-5" /> 7+
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-1 sour-gummy">Engagements</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Internships &amp; Freelance</p>
              </div>
            </div>

          </div>
          </div>

          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/8 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-amber-500/8 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000 pointer-events-none" />
        </div>
      </div>

      {/* ── MOBILE Hero: normal flow, no height constraint, no overlap ──── */}
      <section
        id="Home"
        className="block lg:hidden relative w-full overflow-hidden bg-transparent"
      >
        <div className="relative z-10 px-5 pt-24 pb-12 space-y-5">

          {/* Cursive Greeting */}
          <p className="font-serif italic text-violet-500 dark:text-cyan-400 text-3xl font-normal tracking-wide">
            Hello, I'm
          </p>

          {/* Name */}
          <h1 className="text-5xl font-bold tracking-tight sour-gummy text-slate-900 dark:text-white leading-tight">
            Naveed Afraz
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl font-medium text-neutral-600 dark:text-neutral-300 sour-gummy">
            I build{" "}
            <span className="font-serif italic text-cyan-400 font-normal">Web Apps</span>{" "}
            &amp;{" "}
            <span className="font-serif italic text-amber-400 font-normal">Mobile Apps</span>
            <span className="animate-pulse text-cyan-500 font-bold ml-0.5">|</span>
          </h2>

          {/* Bio */}
          <div className="border-l-2 border-cyan-500/50 pl-4 py-1">
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              I enjoy building things that didn't exist yesterday. Every project begins with an idea and ends with something people can use. That's the part I never get tired of.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-1">
            <button
              onClick={() => scrollToSection("projects")}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-semibold text-sm shadow-lg flex items-center justify-center gap-2"
            >
              View My Work <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => scrollToSection("contact")}
                className="flex-1 py-3.5 rounded-xl font-semibold text-sm border bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-700 text-slate-800 dark:text-white flex items-center justify-center gap-2"
              >
                Let's Connect <Send className="w-4 h-4 text-cyan-600 dark:text-cyan-500" />
              </button>
              <a href={resume} download="NaveedAfrazResume(Latest) (1).pdf" className="flex-1">
                <button className="w-full py-3.5 rounded-xl font-medium text-sm border bg-neutral-100 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center gap-1.5">
                  <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Resume
                </button>
              </a>
            </div>
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="w-full py-3.5 rounded-xl font-medium text-sm border bg-neutral-100 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center gap-1.5"
            >
              <Eye className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Quick View
            </button>
          </div>

          {/* Tech marquee */}
          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800/80">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3 flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-cyan-500" /> TECHNOLOGIES I WORK WITH
            </p>
            <div className="relative overflow-hidden w-full py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <motion.div
                className="flex gap-3 w-max mb-3"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
              >
                {[...techRow1, ...techRow1].map((tech, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-2xl text-xs font-semibold border bg-white dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 text-slate-800 dark:text-neutral-200 flex items-center gap-2 whitespace-nowrap">
                    <span className="text-sm flex items-center">{tech.icon}</span><span>{tech.name}</span>
                  </span>
                ))}
              </motion.div>
              <motion.div
                className="flex gap-3 w-max"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
              >
                {[...techRow2, ...techRow2].map((tech, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-2xl text-xs font-semibold border bg-white dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 text-slate-800 dark:text-neutral-200 flex items-center gap-2 whitespace-nowrap">
                    <span className="text-sm flex items-center">{tech.icon}</span><span>{tech.name}</span>
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { icon: <Timer className="w-5 h-5" />, value: "1+ Yr", label: "Experience", sub: "Full Stack Development" },
              { icon: <FolderGit2 className="w-5 h-5" />, value: "20+", label: "Projects Delivered", sub: "7 Clients + 13 Final Year Projects" },
              { icon: <GraduationCap className="w-5 h-5" />, value: "BCA", label: "Degree", sub: "St. Joseph Degree College" },
              { icon: <Briefcase className="w-5 h-5" />, value: "7+", label: "Engagements", sub: "Internships & Freelance" },
            ].map((card, i) => (
              <div key={i} className="p-4 rounded-2xl border bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800/80 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-2 text-cyan-500 font-extrabold text-xl sour-gummy">
                  <span className="flex items-center">{card.icon}</span> {card.value}
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-1 sour-gummy">{card.label}</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{card.sub}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      <QuickViewModal isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />
    </>
  );
};

export default Hero;
