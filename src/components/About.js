import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import banner from '../kosmos-solnce-yarkost-svet.png';
import founder1 from '../image 75.png';
import founder2 from '../image 76.png';
import founder3 from '../image 77.png';

const HeadingBar = styled.div`
  width: 100%;
  background: #ffffff;
  color: #0b0d13;
  padding-top: clamp(28px, 6vw, 56px);
  padding-bottom: clamp(12px, 3vw, 24px);
  padding-left: var(--container-x);
  padding-right: var(--container-x);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  margin-top: 0;
`;

const Heading = styled.h2`
  font-family: 'Raleway', sans-serif;
  font-size: clamp(2rem, 5.4vw, 4rem);
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const FullBleed = styled.section`
  position: relative;
  width: 100vw; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; /* full-bleed */
  height: clamp(320px, 52vw, 620px);
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.06);
`;

const Bg = styled(motion.img)`
  position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.7) 100%);
`;

const OverlayText = styled(motion.div)`
  position: absolute; left: var(--container-x); bottom: clamp(18px, 5vw, 40px);
  max-width: min(1200px, 92vw);

  .sub {
    font-family: 'Raleway', sans-serif;
    color: #e9faff;
    font-weight: 400;
    letter-spacing: 0.03em;
    font-size: clamp(1.1rem, 3vw, 2.2rem);
    margin-bottom: 12px;
  }
  .sub::before{ content: '/ '; opacity: 0.9; }

  .text {
    color:#e7f5ff;
    font-size: clamp(0.6rem, 1.6vw, 1.25rem);
    line-height: 1.9;
    letter-spacing: 0.01em;
    text-shadow: 0 1px 1px rgba(0,0,0,0.25);
  }
`;

const FoundersSection = styled.section`
  padding: clamp(40px, 6vw, 72px) 0 clamp(40px, 6vw, 72px);
  background:
    radial-gradient(137% 103% at -60% 55%, rgba(1, 156, 229, 1) 0%, rgba(1,156,229,0) 100%),
    linear-gradient(180deg, #ffffff 0%, #ffffff 38%, #ffffff 72%, #ffffff 100%);
//   border-top: 1px solid rgba(0,0,0,0.06);
//   border-bottom: 1px solid rgba(0,0,0,0.06);
  position: relative;
  overflow: hidden;

  /* продолжение размытого эллипса как в следующих секциях */
  &::before {
    content: "";
    position: absolute;
    inset: -220px; /* запас, чтобы блюр не обрезался */
    background:
      radial-gradient(137% 103% at -60% 55%, rgba(1, 156, 229, 1) 0%, rgba(1,156,229,0) 100%),
      linear-gradient(180deg, #ffffff 0%, #ffffff 38%, #ffffff 72%, #ffffff 100%);
    filter: blur(320px);
    opacity: 0.22;
    pointer-events: none;
  }
`;

const FoundersContainer = styled.div`
  width: var(--container-w);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--page-x);
  padding-right: var(--page-x);
  position: relative;
  z-index: 1;
`;

const SubTitle = styled(motion.h3)`
  font-family:'Raleway', sans-serif;
  color:#0b0d13;
  font-weight:600;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  letter-spacing: .02em;
  margin-bottom: clamp(18px, 2vw, 24px);
  &::before{ content:'/ '; color:#0b0d13; opacity:.9; margin-right: 0; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(24px, 3vw, 40px);
  align-items: stretch;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  &.center-single {
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;

    /* Принудительно центрируем последний элемент */
    > *:nth-child(3) {
      grid-column: 1 / -1;
      justify-self: center;
      max-width: 400px;
    }
  }
`;
const FounderTile = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: clamp(16px, 2.6vw, 28px);
  width: 100%;
  max-width: 400px;
`;

const ImageWrap = styled.div`
  width: clamp(160px, 20vw, 240px);
  height: clamp(160px, 20vw, 240px);
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 20px rgba(30, 167, 255, 0.2);
  outline: 4px solid #2ba7ff;
  outline-offset: -4px;
  img{ width:100%; height:100%; object-fit: cover; display:block; }
`;

const Info = styled.div`
  .role{ color:#51657e; font-size: clamp(.9rem, 1.6vw, 1rem); margin-bottom: 6px; }
  .name{ font-family:'Raleway', sans-serif; color:#0b0d13; font-weight:600; font-size: clamp(1.2rem, 2.4vw, 1.6rem); margin-bottom: 8px; }
  .desc{ color:#5d708a; font-size: clamp(.92rem, 1.6vw, 1rem); line-height: 1.6; max-width: 28ch; }
`;

const About = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const [shouldCenter, setShouldCenter] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 1400 && width > 760) {
                // На экранах 760px-1400px у нас 2 колонки
                // Если у нас 3 учредителя, то 3-й будет в новой строке
                setShouldCenter(true); // У нас всегда 3 учредителя
            } else {
                setShouldCenter(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section id="about" ref={ref}>
            <HeadingBar>
                <Heading>О ФОНДЕ</Heading>
            </HeadingBar>

            <FullBleed>
                <Bg src={banner} alt="Космический горизонт" initial={{ scale: 1.08 }} animate={inView ? { scale: 1 } : {}} transition={{ duration: 1.2 }} />
                <Overlay />
                <OverlayText initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
                    <div className="sub">ЦЕЛИ СОЗДАНИЯ</div>
                    <div className="text">
                        Цели создания Фонд был основан в 2018 году с целью популяризации космических исследований,
                        поддержки молодых ученых и инженеров, а также содействия развитию технологий в области
                        космонавтики. Мы стремимся вдохновлять новое поколение на освоение космоса и создание
                        инновационных решений для будущего человечества.
                    </div>
                </OverlayText>
            </FullBleed>

            <FoundersSection>
                <FoundersContainer>
                    <SubTitle initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>УЧРЕДИТЕЛИ</SubTitle>
                    <Grid className={shouldCenter ? 'center-single' : ''}>
                        <FounderTile initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.05 }}>
                            <ImageWrap><img src={founder1} alt="Петр Небесный" /></ImageWrap>
                            <Info>
                                <div className="role">Частный благотворитель</div>
                                <div className="name">Петр Небесный</div>
                                <div className="desc">Активный сторонник космических исследований</div>
                            </Info>
                        </FounderTile>
                        <FounderTile initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
                            <ImageWrap><img src={founder2} alt="AstroTech" /></ImageWrap>
                            <Info>
                                <div className="role">Технологическая компания</div>
                                <div className="name">“AstroTech”</div>
                                <div className="desc">Разработчик передовых космических технологий</div>
                            </Info>
                        </FounderTile>
                        <FounderTile initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}>
                            <ImageWrap><img src={founder3} alt="Роскосмос" /></ImageWrap>
                            <Info>
                                <div className="role">Космическое агентство</div>
                                <div className="name">“Роскосмос”</div>
                                <div className="desc">Стратегический партнер фонда</div>
                            </Info>
                        </FounderTile>
                    </Grid>
                </FoundersContainer>
            </FoundersSection>
        </section>
    );
};

export default About;
