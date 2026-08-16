"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export const HeroParallax = ({
  products
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Detect if we're at medium viewport (desktop-site mode on phones ~768-1279px)
  const [isXl, setIsXl] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1280 : true
  );

  useEffect(() => {
    const check = () => setIsXl(window.innerWidth >= 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [10, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [isXl ? 0.25 : 0.7, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 1], [10, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 80]), springConfig);

  // On medium viewports: flat presentation, no 3D push
  const motionStyle = isXl
    ? { rotateX, rotateZ, translateY, opacity }
    : { opacity };

  return (
    <div
      ref={ref}
      className="h-[85vh] md:h-fit xl:h-[160vh] pt-20 md:pt-28 xl:pt-36 pb-8 md:pb-12 xl:pb-0 overflow-hidden antialiased relative flex flex-col self-auto xl:[perspective:1000px] xl:[transform-style:preserve-3d] bg-slate-50 dark:bg-[#07090e]">
      <Header />
      <motion.div
        style={motionStyle}
        className="pb-4 md:pb-0">
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-2 mb-2 md:space-x-6 md:mb-6 xl:space-x-8 xl:mb-8">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-2 space-x-2 md:mb-6 md:space-x-6 xl:mb-8 xl:space-x-8">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-2 md:space-x-6 xl:space-x-8">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
      {/* Smooth bottom transition fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-slate-50/60 dark:via-[#07090e]/60 to-slate-50 dark:to-[#07090e] pointer-events-none z-20" />
    </div>
  );
};

export const Header = () => {
  return (
    <div
      className="max-w-7xl relative mx-auto pt-6 pb-4 md:pt-10 md:pb-6 px-4 w-full left-0 top-0 z-20">
      <h1 className="text-2xl md:text-5xl xl:text-7xl font-bold dark:text-white text-slate-900">
        Crafting Premium <br /> Web & Mobile Apps
      </h1>
      <p className="max-w-2xl text-sm md:text-base xl:text-xl mt-3 dark:text-neutral-300 text-neutral-700">
        A comprehensive showcase of my work. As a web and mobile developer, I specialize in building scalable microservices, native mobile applications, premium client platforms, and high-converting e-commerce systems with real-world impact.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-24 w-[9rem] sm:h-32 sm:w-[11rem] md:h-44 md:w-[16rem] xl:h-56 xl:w-[20rem] relative shrink-0">
      <a href={product.link} className="block group-hover/product:shadow-2xl ">
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title} />
      </a>
      <div
        className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2
        className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
