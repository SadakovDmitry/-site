import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import EarthVideo from '../Earth Rotates.mp4';
import EarthVideoMobile from '../images/main/Earth Rotates_alpha_3.mp4';
import EarthImage from '../pre_load_image.png'; // Изображение для десктопа
import EarthImageMobile from '../images/main/pre_load_mobile.png'; // Изображение для мобильной версии

const HeroSection = styled.section`
  position: relative;
  background: transparent;
  @media (max-width: 900px){
  }
`;

const BackgroundStars = styled.div` display: none;`;

// Контейнер оверлея поверх видео
const OverlayLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    position: absolute;
    z-index: 3;
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
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

  @media (max-width: 900px) {
    position: relative;
    top: auto;
    right: auto;
    left: auto;
    max-width: 100%;
    width: 100%;
    text-align: center;
    padding: 0 20px;
    z-index: 4;
  }
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

    @media (max-width: 900px) {
      text-align: center;
      font-size: clamp(10px, 9vw, 62px);
      margin-bottom: 10vw;
      margin-top: 13vw;
      line-height: 1.2;
    }

    @media (max-width: 540px) {
      text-align: center;
      font-size: clamp(10px, 9vw, 62px);
      margin-bottom: 10vw;
      margin-top: 33vw;
      line-height: 1.2;
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

    @media (max-width: 900px) {
      text-align: center;
      font-size: clamp(8px, 4vw, 20px);
      margin-bottom: 2rem;
      line-height: 1.5;
      max-width: 100%;
    }

    @media (max-width: 540px) {
      text-align: center;
      font-size: clamp(8px, 4vw, 20px);
      margin-bottom: 2rem;
      line-height: 1.5;
      max-width: 100%;
    }
  }
  p strong {
    display: block;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.5rem;

    @media (max-width: 900px) {
      margin-bottom: 0.5rem;
      padding-top: 70vw;
    }

    @media (max-width: 540px) {
      margin-bottom: 0.5rem;
      padding-top: 70vw;
    }
  }
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

    @media (max-width: 900px) {
      background: #000;
      border: 1px solid #fff;
      color: #fff;
      padding: clamp(12px, 3vw, 16px) clamp(24px, 6vw, 32px);
      font-size: clamp(14px, 3.5vw, 18px);
      margin-bottom: 2rem;
      border-radius: 25px;
      min-width: 200px;
    }

  &:hover {
    background: #00ffff;
    color: #000;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);

    @media (max-width: 900px) {
      background: #fff;
      color: #000;
    }
  }
`;

const StatsContainer = styled(motion.div)`
  display: flex;
  gap: 5rem;

  @media (max-width: 1100px) {
    flex-wrap: wrap;
    gap: 1rem;
  }

  @media (max-width: 900px) {
    display: none;
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

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  background: transparent;
`;

const EarthVideoStyled = styled.video`
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
  background: transparent;
  opacity: ${props => props.isLoaded ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const EarthImageStyled = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: ${props => props.isLoaded ? 0 : 1};
  transition: opacity 0.3s ease;
  z-index: 1;
`;

const LoadingIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Предзагрузка видео
  useEffect(() => {
    const videoSrc = isMobile ? EarthVideoMobile : EarthVideo;
    const video = new Audio(videoSrc);
    video.load();
  }, [isMobile]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleVideoPlay = () => {
    setVideoPlaying(true);
  };

  // Дополнительная логика для надежного переключения
  useEffect(() => {
    if (videoLoaded && !videoPlaying) {
      // Если видео загружено, но еще не воспроизводится, ждем немного
      const timer = setTimeout(() => {
        setVideoPlaying(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [videoLoaded, videoPlaying]);

  return (
    <HeroSection ref={ref}>
      <BackgroundStars />

      <VideoContainer>
        <EarthImageStyled
          src={isMobile ? EarthImageMobile : EarthImage}
          alt="Earth preview"
          isLoaded={videoPlaying}
          onLoad={handleImageLoad}
        />
        <LoadingIndicator isVisible={!videoPlaying && imageLoaded}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            borderTop: '3px solid #00ffff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </LoadingIndicator>
        <EarthVideoStyled
          key={isMobile ? 'mobile' : 'desktop'}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          isLoaded={videoPlaying}
          onLoadedData={handleVideoLoad}
          onPlay={handleVideoPlay}
        >
          <source src={isMobile ? EarthVideoMobile : EarthVideo} type="video/mp4" />
        </EarthVideoStyled>
      </VideoContainer>

      <OverlayLayer>
        <OverlayInner>
          <TextContent
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1>ЗВЕЗДЫ — НАШ ПУТЬ НАЗНАЧЕНИЯ</h1>
            <p>
              <strong>Дорога в космос — это дорога зрелой нации.</strong>
              Мы здесь, чтобы сделать её прямой,
              открытой и вдохновляющей.
            </p>
            <CTAButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>СТАТЬ ЧАСТЬЮ БУДУЩЕГО</CTAButton>
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
