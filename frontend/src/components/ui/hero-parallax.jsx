"use client";
import React from "react";
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

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [10, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [0.25, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 1], [10, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 1], [50, 250]), springConfig);
  return (
    <div
      ref={ref}
      className="h-[105vh] md:h-[170vh] pt-24 md:pt-36 pb-0 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]">
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="">
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 mb-4 md:space-x-8 md:mb-8">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-4 space-x-4 md:mb-8 md:space-x-8">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 md:space-x-8">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
      {/* Smooth bottom transition fade so HeroParallax blends into project grid seamlessly */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-slate-50/60 dark:via-[#07090e]/60 to-slate-50 dark:to-[#07090e] pointer-events-none z-20" />
    </div>
  );
};

export const Header = () => {
  return (
    <div
      className="max-w-7xl relative mx-auto pt-10 pb-4 md:pt-16 md:pb-6 px-4 w-full left-0 top-0 z-20">
      <h1 className="text-3xl md:text-7xl font-bold dark:text-white text-slate-900">
        Crafting Premium <br /> Web & Mobile Apps
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-4 dark:text-neutral-300 text-neutral-700">
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
      className="group/product h-40 w-[14rem] md:h-56 md:w-[20rem] relative shrink-0">
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
