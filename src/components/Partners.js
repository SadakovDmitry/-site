import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import RusSpace from '../RusSpace.svg';
import Frame49 from '../Frame 49.png';

const PartnersSection = styled.section`
  padding: 90px 0;
  position: relative;
  overflow: hidden;
`;

const BgImage = styled.img`
  position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0;
`;

const Container = styled.div`
  width: var(--container-w);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--page-x);
  padding-right: var(--page-x);
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'Raleway', sans-serif;
  font-size: clamp(2rem, 3.8vw, 3.2rem);
  font-weight: 400;
  margin-bottom: 2rem;
  color: #fff;
`;

const Overflow = styled.div`
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
`;

const scrollRight = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
`;

const Track = styled.div`
  display: flex; align-items: center; gap: 5rem; width: max-content;
  animation: ${scrollRight} 32s linear infinite;
`;

const LogoItem = styled.div`
  flex: none; display: flex; align-items: center; justify-content: center;
  height: clamp(110px, 16vw, 180px);
  img { height: 100%; width: auto; background: transparent; mix-blend-mode: screen; filter: drop-shadow(0 0 12px rgba(255,255,255,0.2)); }
`;

const logos = [RusSpace, RusSpace, RusSpace, RusSpace, RusSpace, RusSpace];

const Partners = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    return (
        <PartnersSection id="partners" ref={ref}>
            <BgImage src={Frame49} alt="" />
            <Container>
                <SectionTitle initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>ПАРТНЕРЫ</SectionTitle>
                <Overflow>
                    <Track>
                        {logos.concat(logos).map((src, i) => (
                            <LogoItem key={i}><img src={src} alt="Роскосмос" /></LogoItem>
                        ))}
                    </Track>
                </Overflow>
            </Container>
        </PartnersSection>
    );
};

export default Partners;
