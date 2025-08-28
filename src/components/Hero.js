import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import EarthVideo from '../Earth Rotates.mp4';

const HeroSection = styled.section`
  position: relative;
  background: transparent;
  @media (max-width: 900px){
    padding-top: calc(env(safe-area-inset-top, 0px) + 72px);
  }
`;

const BackgroundStars = styled.div` display: none;`;

// Контейнер оверлея поверх видео
const OverlayLayer = styled.div`
  position: absolute; inset: 0; z-index: 2; pointer-events: none;
`;

const OverlayInner = styled.div`
  position: absolute;
  right: var(--container-x);
  left: auto;
  top: clamp(16px, 13vw, 500px);
  max-width: min(680px, 44vw);
  color: #ffffff;
  pointer-events: auto;
  @media (max-width: 900px) {
    top: clamp(100px, 22vw, 800px);
  }
  @media (max-width: 500px) {
    top: clamp(100px, 24vw, 800px);
  }

//   @media (max-width: 900px){ max-width: 92vw; right: var(--container-x); top: clamp(12px, 8vw, 100px); }
`;

const TextContent = styled(motion.div)`
  h1 {
    font-family: 'Raleway', sans-serif;
    font-size: clamp(0.4rem, 3.5vw, 9.2rem);
    font-weight: 400;
    margin-bottom: 2rem;
    color: #fff;
    line-height: 1.15;

    @media (max-width: 1100px) {
      font-size: clamp(1px, 4.2vw, 3.2rem);
      margin-bottom: 0.5rem;
    }
  }

  p {
    font-family: 'Proxima Nova', 'Raleway', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif;
    font-size: clamp(0.92rem, 1.4vw, 10.1rem);
    line-height: 1.7;
    color: #ccc;
    margin-bottom: 4rem;
    max-width: min(540px, 80vw);
    word-break: break-word; overflow-wrap: anywhere;
    @media (max-width: 1100px) {
      font-size: clamp(1px, 1.8vw, 3.2rem);
      margin-bottom: 1rem;
    }
  }
  p strong { display:block; font-weight:700; color:#fff; margin-bottom: 0.25rem; }
`;

const CTAButton = styled(motion.button)`
  background: #1a1a2e;
  border: 1px solid #00ffff;
  color: #fff;
  padding: clamp(0.6rem, 1.2vw, 11rem) clamp(1rem, 2vw, 10rem);
  font-size: clamp(0.85rem, 1.2vw, 4rem);
  font-weight: 600;
  border-radius: 9999px;
  cursor: pointer;
  font-family: 'Raleway', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  margin-bottom: 3rem;
  pointer-events: auto; /* кликабельно поверх видео */

    @media (max-width: 1100px) {
      padding: clamp(0.1rem, 1.2vw, 1rem) clamp(0.1rem, 2vw, 2rem);
      font-size: clamp(0.05rem, 1.2vw, 3rem);
      margin-bottom: 0.5rem;
    }

  &:hover {
    background: #00ffff;
    color: #000;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
  }
`;

const StatsContainer = styled(motion.div)`
  display: flex;
  gap: 5rem;

  @media (max-width: 1100px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  text-align: center;

  .number {
    font-family: 'Proxima Nova', sans-serif;
    font-size: clamp(1.2rem, 4.5vw, 9.6rem);
    font-weight: 600;
    color: #fff;
    margin-bottom: 0.25rem;
    display: block;

    @media (max-width: 1100px) {
      font-size: clamp(0.2rem, 3.5vw, 2.6rem);
      margin-bottom: 0.1rem;
    }

  }

  .label {
    font-size: clamp(0.7rem, 1.4vw, 4.9rem);
    color: #aaa;
    text-transform: uppercase;
    letter-spacing: 1px;

    @media (max-width: 1100px) {
      font-size: clamp(0.1rem, 1.5vw, 0.9rem);
    }
  }
`;

const EarthContainer = styled(motion.div)` display: none;`;

const EarthVideoStyled = styled.video`
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
  background: transparent;
`;

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const stats = [
    { number: '18', label: 'ПРОЕКТОВ' },
    { number: '42', label: 'ИНВЕСТОРА' },
    { number: '7', label: 'ЛЕТ РАБОТЫ' }
  ];

  return (
    <HeroSection ref={ref}>
      <BackgroundStars />

      <EarthVideoStyled autoPlay loop muted playsInline>
        <source src={EarthVideo} type="video/mp4" />
      </EarthVideoStyled>

      <OverlayLayer>
        <OverlayInner>
          <TextContent
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1>ЗВЕЗДЫ — НАШ ПУТЬ НАЗНАЧЕНИЯ</h1>
            <p>
              <b>Дорога в космос — это дорога зрелой нации.</b><br /> Мы здесь, чтобы сделать её прямой,
              открытой и вдохновляющей.
            </p>
            <CTAButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>Стать частью будущего</CTAButton>
          </TextContent>

          <StatsContainer
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <StatItem>
              <span className="number">18</span>
              <span className="label">проектов</span>
            </StatItem>
            <StatItem>
              <span className="number">42</span>
              <span className="label">инвестора</span>
            </StatItem>
            <StatItem>
              <span className="number">7</span>
              <span className="label">лет работы</span>
            </StatItem>
          </StatsContainer>
        </OverlayInner>
      </OverlayLayer>
    </HeroSection>
  );
};

export default Hero;
