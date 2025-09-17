import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Model } from './Model';
import './InteractiveModelSection.css';

// USPs to display at different scroll stages
const usps = [
  { text: 'Like every piece is designed just for you.', position: { top: '20%', left: '25%' } },
  { text: 'Comfort that hugs, style that truly stays.', position: { top: '20%', left: '70%' } },
  { text: 'A wardrobe choice you’ll never regret making.', position: { top: '60%', left: '25%' } },
  { text: 'Outfits that vibe with every mood and moment.', position: { top: '60%', left: '70%' } },
  { text: 'Quality that speaks before you even say a word.', position: { top: '90%', left: '50%' } },
];

const UspItem = ({ usp, index, scrollYProgress }) => {
  const start = index * 0.2;
  const end = start + 0.2;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <motion.div
      className="usp-text"
      style={{ top: usp.position.top, left: usp.position.left, opacity }}
    >
      {usp.text}
    </motion.div>
  );
};

const InteractiveModelSection = ({ nextSectionRef }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Rotate 360° across the scroll
  const modelRotation = useTransform(scrollYProgress, [0, 1], [0, 2 * Math.PI]);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest >= 0.98 && nextSectionRef?.current) {
        nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }, [scrollYProgress, nextSectionRef]);

  return (
    <section ref={sectionRef} className="interactive-section">
      <div className="sticky-container">
        <Canvas camera={{ position: [0, 0, 6.5], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <Model modelRotation={modelRotation} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>

        {usps.map((usp, index) => (
          <UspItem
            key={index}
            usp={usp}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};

export default InteractiveModelSection;
