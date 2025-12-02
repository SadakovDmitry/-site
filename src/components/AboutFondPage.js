import Mission from "./AboutFond-components/Mission";
import Director from "./AboutFond-components/Director";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import voenmeh from "../images/AboutFondPage/военммех.png";
import nauchnyePribory from "../images/AboutFondPage/научные_приборы.png";
import federatsiyaKosmonavtiki from "../images/AboutFondPage/федерация_космонавтики.png";
import logoVoenmeh from "../images/AboutFondPage/лого_военмех.png";
import logoNauchnyePribory from "../images/AboutFondPage/лого_научные_приборы.png";

// Импорт иконок для стратегических направлений
import atomIcon from "../images/AboutFondPage/icons/chrome-atom-molecule-icon-white-background-3d-rendering_476612-2231.png";
import rocketIcon from "../images/AboutFondPage/icons/chrome-rocket-ship-ready-launch-space-exploration-adventure_632498-37867 1.png";
import documentIcon from "../images/AboutFondPage/icons/png-3d-metallic-book-education-remix-transparent-background_53876-979856.png";
import gearIcon from "../images/AboutFondPage/icons/mega-creator_-_2024-.png";
import planetIcon from "../images/AboutFondPage/icons/y2k-chrome-planet-free-png.png";
import ufoIcon from "../images/AboutFondPage/icons/y2k-chrome-atom-11486669-9316773.png";

import infographik from "../images/AboutFondPage/infographik.svg";
import Frame49 from "../Frame 49.png";
import charterPdf from "../images/main/ФСРК Устав новый.pdf";


// TODO: перенести в файл с константами






// Стили для блока "История и статус"
const HistoryStatusSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: #ffffff;
`;

const HistoryStatusContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 1024px) {
    gap: 3rem;
    padding: 0 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 0 3rem;
    grid-template-areas:
      "title"
      "image"
      "text";
  }

  @media (max-width: 480px) {
     gap: 1rem;
    padding: 0 3rem;
  }
`;

const InfographicContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    height: 350px;
  }

  @media (max-width: 768px) {
    height: 350px;
    grid-area: image;
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    height: 70vw;
  }
`;

const HistoryText = styled.div`
  text-align: left;
  font-family: "Proxima Nova", sans-serif;
  color: #000;
  line-height: 1.6;

  @media (max-width: 768px) {
    grid-area: text;
    margin-top: 2rem;
  }

  h3 {
    font-family: "Raleway", sans-serif;
    font-size: clamp(2rem, 4vw, 3.4rem);
    font-weight: 400;
    margin-bottom: 1.5rem;
    color: #000;
    text-transform: uppercase;

    @media (max-width: 768px) {
      text-align: center;
      grid-area: title;
      margin-bottom: 3rem;
      margin-top: -44rem;
      display: block;
    }

    @media (min-width: 769px) {
      display: none;
    }
  }

  h3.mobile-title {
    display: none;

    @media (max-width: 768px) {
      display: block;
    }
  }

  h3.desktop-title {
    display: none;

    @media (min-width: 769px) {
      display: block;
    }
  }

  p {
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    margin-bottom: 1rem;
    line-height: 1.1rem;
    color: #000;
  }
`;

const MobileTitleContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    grid-area: title;
  }

  h3 {
    font-family: "Raleway", sans-serif;
    font-size: clamp(2rem, 4vw, 3.4rem);
    font-weight: 400;
    color: #000;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 3rem;
    margin-top: 1rem;

    @media (max-width: 768px) {
      font-size: clamp(2rem, 6.5vw, 20rem);
    }
  }
`;

const FoundersSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: #ffffff;
`;

const FoundersTitle = styled.h2`
  font-family: 'Raleway', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  color: #000000;
  text-transform: uppercase;
  text-align: left;
  margin: 0 0 3rem 9vw;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    text-align: center;
    font-size: clamp(2rem, 6.5vw, 20rem);
    margin: 0 0 3rem 2rem;
  }

  @media (max-width: 480px) {
    text-align: center;
    margin: 0 0 3rem 1rem;
  }
`;

const FoundersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin: 0 9vw;
  padding: 0 0rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FounderCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    gap: 1rem;
  }
`;

const FounderImageContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    min-width: 100px;
  }
`;

const FounderImage = styled.img`
  width: 100%;
  height: 25vw;
  object-fit: cover;
  border-radius: 15px;

  @media (max-width: 768px) {
    height: 45vw;
  }

  @media (max-width: 480px) {
    height: 45vw;
  }
`;

const FounderLogo = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: auto;
  z-index: 2;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
`;

const FounderText = styled.p`
  font-family: 'Proxima Nova', sans-serif;
  font-size: clamp(0.9rem, 1.7vw, 2rem);
  font-weight: 500;
  color: #333;
  text-align: center;
  line-height: 1.1;
  margin: 0;

  @media (max-width: 768px) {
    font-size: clamp(0.1rem, 3vw, 1.3rem);
  }

  @media (max-width: 480px) {
    font-size: clamp(0.2rem, 3.5vw, 1.4rem);
  }
`;

// Стили для секции "ЧЛЕНЫ ПРАВЛЕНИЯ"
const BoardMembersSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: #ffffff;
`;

// Стили для секции "ЧЛЕНЫ ПОПЕЧИТЕЛЬСКОГО СОВЕТА"
const TrusteesSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: #ffffff;
`;

const BoardMembersTitle = styled.h2`
  font-family: 'Raleway', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  color: #000000;
  text-transform: uppercase;
  text-align: left;
  margin: 0 0 3rem 9vw;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    text-align: center;
    font-size: clamp(2rem, 6.5vw, 20rem);
    margin: 0 0 3rem 2rem;
  }

  @media (max-width: 480px) {
    text-align: center;
    margin: 0 0 3rem 1rem;
  }
`;

const TrusteesTitle = styled.h2`
  font-family: 'Raleway', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  color: #000000;
  text-transform: uppercase;
  text-align: left;
  margin: 0 0 3rem 9vw;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    text-align: center;
    font-size: clamp(2rem, 6.5vw, 20rem);
    margin: 0 0 3rem 2rem;
  }

  @media (max-width: 480px) {
    text-align: center;
    margin: 0 0 3rem 1rem;
  }
`;

const BoardMembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  max-width: 1400px;
  margin: 0 9vw;
  padding: 0 0rem;

  @media (max-width: 768px) {
    display: flex;
    gap: 1.25rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    padding-bottom: 0.5rem;
    margin: 0;
    padding-left: 1rem;
    padding-right: 1rem;
    scrollbar-width: none;
    &::-webkit-scrollbar { height: 0; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb { background: transparent; border-radius: 8px; }

    &.scrolling {
      scrollbar-width: thin;
    }
    &.scrolling::-webkit-scrollbar { height: 8px; }
    &.scrolling::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); }
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const TrusteesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  max-width: 1400px;
  margin: 0 9vw;
  padding: 0 0rem;

  @media (max-width: 768px) {
    display: flex;
    gap: 1.25rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    padding-bottom: 0.5rem;
    margin: 0;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const BoardMemberCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
    min-width: 80vw;
    scroll-snap-align: center;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    min-width: 85vw;
    gap: 0.8rem;
  }
`;

// eslint-disable-next-line no-unused-vars
const MemberImage = styled.img`
  width: 40%;
  height: 20vw;
  object-fit: cover;
  border-radius: 15px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 50%;
    height: 55vw;
  }

  @media (max-width: 480px) {
    width: 50%;
    height: 60vw;
  }
`;

// eslint-disable-next-line no-unused-vars
const MemberTopSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: stretch;
`;

// eslint-disable-next-line no-unused-vars
const MemberRightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;



// eslint-disable-next-line no-unused-vars
const MemberRole = styled.h3`
  font-family: 'Futura PT', sans-serif;
  font-size: clamp(0.4rem, 1.1vw, 1rem);
  font-weight: 600;
  color: #333;
  text-align: left;
  text-transform: uppercase;
  margin: 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: clamp(0.9rem, 3.8vw, 1.2rem);
  }
`;

const MemberName = styled.h4`
  font-family: 'Raleway', sans-serif;
  font-size: clamp(0.5rem, 2.1vw, 10.2rem);
  font-weight: 400;
  color: #000;
  text-align: left;
  margin: 0;
  line-height: 1.0;
  align-self: flex-start;

  @media (max-width: 768px) {
    font-size: clamp(0.2rem, 6.2vw, 2rem);
    line-height: 1.1;
  }

  @media (max-width: 600px) {
    font-size: clamp(0.2rem, 5.0vw, 2rem);
  }
`;

const MemberDescription = styled.p`
  font-family: 'Raleway', sans-serif;
  font-size: clamp(0.4rem, 1.8vw, 20.9rem);
  font-weight: 400;
  color: #666;
  text-align: left;
  line-height: 1.2;
  margin: 0;

  @media (max-width: 768px) {
    font-size: clamp(0.9rem, 4.5vw, 1.3rem);
    line-height: 1.3;
  }
`;

const StrategicDirectionsSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: #ffffff;

  @media (max-width: 1024px) {
    padding: 3rem 0;
  }

  @media (max-width: 768px) {
    padding: 2rem 0;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0;
  }
`;

const StrategicGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 1000px) {
    gap: 2.5rem;
  }

  @media (max-width: 480px) {
    gap: 2rem;
  }
`;

const StrategicCard = styled(motion.div)`
  background: transparent;
  border-radius: 50px;
  padding: 2rem 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  border: none;
  width: 280px;
  height: 280px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    width: clamp(220px, 25vw, 280px);
    height: clamp(220px, 25vw, 280px);
  }

  @media (max-width: 480px) {
    padding: 1rem 0.8rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(180deg, #019CE5 0%, #312684 100%);
    border-radius: 20px;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffff;
    border-radius: 20px;
    z-index: 2;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  }
`;

const StrategicIcon = styled.img`
  width: clamp(50px, 8vw, 85px);
  height: clamp(50px, 8vw, 85px);
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  display: block;
  object-fit: contain;
  z-index: 3;
`;

const StrategicTitle = styled.h3`
  font-family: 'Raleway', sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  font-weight: 500;
  color: #000;
  margin-bottom: 0.3rem;
  line-height: 1.0;
  text-align: left;
  margin-top: 5rem;
  white-space: pre-line;
  position: relative;
  z-index: 3;

  @media (max-width: 768px) {
    margin-top: 4rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    margin-top: 3.5rem;
    text-align: center;
  }
`;

const StrategicDescription = styled.p`
  font-family: 'Raleway', sans-serif;
  font-size: clamp(0.7rem, 1.8vw, 0.80rem);
  font-weight: 300;
  color: #000;
  line-height: 1.1;
  margin: 0;
  text-align: left;
  white-space: pre-line;
  position: relative;
  z-index: 3;
`;

const SectionTitle = styled.h2`
  font-family: 'Raleway', sans-serif;
  font-size: clamp(2.5rem, 6vw, 60px);
  font-weight: 400;
  color: rgba(16, 16, 16, 1);
  margin-bottom: 3rem;
  text-align: left;
  text-transform: uppercase;
  padding-left: 9.4vw;
  padding-right: 9.4vw;

  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 2rem;
    padding-left: 5vw;
    padding-right: 5vw;
  }
`;

// Документы и политика (фон как у секции "Партнеры")
const DocsSection = styled.section`
  padding: 60px 0;
  position: relative;
  overflow: hidden;
`;

const DocsBgImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const DocsContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
`;

const DocsTitle = styled(motion.h2)`
  font-family: 'Raleway', sans-serif;
  font-size: clamp(2.0rem, 6vw, 60px);
  font-weight: 400;
  margin-bottom: 2rem;
  color: #ffffff;
  text-transform: uppercase;
  padding-left: 9.4vw;
  padding-right: 9.4vw;

  @media (max-width: 768px) {
    text-align: center;
    padding-left: 5vw;
    padding-right: 5vw;
  }
`;

const DocsButtonsRow = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1rem, 3vw, 2.5rem);
  padding-left: 9.4vw;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 0;
  }
`;

const DocButton = styled.a`
  background: linear-gradient(180deg, #f2f2f2, #dcdcdc);
  border: 1px solid rgba(0,0,0,0.15);
  box-shadow: 0 6px 18px rgba(0,0,0,.25) inset, 0 8px 24px rgba(0,0,0,.2);
  color: #000000;
  border-radius: 9999px;
  padding: clamp(10px, 1vw, 14px) clamp(20px, 2vw, 32px);
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  letter-spacing: 0.02em;
  font-size: clamp(0.9rem, 1.4vw, 1.2rem);
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  display: inline-block;

  &:hover {
    filter: brightness(0.98);
  }

  @media (max-width: 768px) {
    width: auto;
    text-align: center;
  }
`;

function AboutFond() {
  const [isMembersScrolling, setIsMembersScrolling] = useState(false);
  const scrollHideTimerRef = useRef(null);

  const handleMembersScroll = () => {
    setIsMembersScrolling(true);
    if (scrollHideTimerRef.current) clearTimeout(scrollHideTimerRef.current);
    scrollHideTimerRef.current = setTimeout(() => setIsMembersScrolling(false), 700);
  };

  return (
    <>
      <Mission></Mission>
      <Director></Director>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        <FoundersSection>
          <FoundersTitle>УЧРЕДИТЕЛИ ФОНДА</FoundersTitle>
          <FoundersGrid>
            <FounderCard
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <FounderImageContainer>
                <FounderImage src={federatsiyaKosmonavtiki} alt="Федерация космонавтики России" />
              </FounderImageContainer>
              <FounderText>
                САНКТ-ПЕТЕРБУРГСКАЯ РЕГИОНАЛЬНАЯ ОРГАНИЗАЦИЯ ОБЩЕРОССИЙСКОЙ ОБЩЕСТВЕННОЙ ОРГАНИЗАЦИИ <b>«ФЕДЕРАЦИЯ КОСМОНАВТИКИ РОССИИ»</b>
              </FounderText>
            </FounderCard>

            <FounderCard
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <FounderImageContainer>
                <FounderImage src={nauchnyePribory} alt="Научные приборы" />
                <FounderLogo src={logoNauchnyePribory} alt="Логотип Научные приборы" />
              </FounderImageContainer>
              <FounderText>
                АО <b>НАУЧНЫЕ ПРИБОРЫ</b>
              </FounderText>
            </FounderCard>

            <FounderCard
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <FounderImageContainer>
                <FounderImage src={voenmeh} alt="БГТУ ВОЕНМЕХ" />
                <FounderLogo src={logoVoenmeh} alt="Логотип ВОЕНМЕХ" />
              </FounderImageContainer>
              <FounderText>
                <b>БГТУ «ВОЕНМЕХ»</b> ИМ. Д.Ф. УСТИНОВА
              </FounderText>
            </FounderCard>
          </FoundersGrid>
        </FoundersSection>
      </motion.div >

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      >
        <BoardMembersSection>
          <BoardMembersTitle>ЧЛЕНЫ НАБЛЮДАТЕЛЬНОГО СОВЕТА</BoardMembersTitle>
          <BoardMembersGrid
            onScroll={handleMembersScroll}
            className={isMembersScrolling ? 'scrolling' : ''}
          >
            <BoardMemberCard
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <MemberName>
                ШКАПЛЕРОВ<br />
                Антон<br />
                Николаевич
              </MemberName>
              <MemberDescription>
                Шкаплеров Антон Николаевич.<br />
                Российский космонавт-испытатель, герой России, кандидат технических наук
              </MemberDescription>
            </BoardMemberCard>

            <BoardMemberCard
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <MemberName>
                МУХИН<br />
                Олег<br />
                Петрович
              </MemberName>
              <MemberDescription>
                Мухин Олег Петрович.<br />
                Первый заместитель Председателя Совета Санкт-Петербургской региональной организации ООО «Федерация космонавтики России»
              </MemberDescription>
            </BoardMemberCard>

            <BoardMemberCard
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <MemberName>
                СМИРНОВ<br />
                Анатолий<br />
                Александрович
              </MemberName>
              <MemberDescription>
                Смирнов Анатолий Александрович.<br />
                Заслуженный юрист Российской Федерации, кандидат экономических наук
              </MemberDescription>
            </BoardMemberCard>

            <BoardMemberCard
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <MemberName>
                НУГМАНОВ<br />
                Рустам<br />
                Ренатович
              </MemberName>
              <MemberDescription>
                Нугманов Рустам Ренатович.<br />
                Председатель Правления Фонда сохранения исторического культурного наследия
              </MemberDescription>
            </BoardMemberCard>

            <BoardMemberCard
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <MemberName>
                ВОСТРЕЦОВ<br />
                Сергей<br />
                Алексеевич
              </MemberName>
              <MemberDescription>
                Вострецов Сергей Алексеевич.<br />
                Российский общественный и политический деятель, кандидат педагогических наук, председатель Объединения профсоюзов России СОЦПРОФ, депутат Государственной думы РФ VI и VII созывов
              </MemberDescription>
            </BoardMemberCard>

            <BoardMemberCard
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <MemberName>
                ШАШУРИН<br />
                Александр<br />
                Евгеньевич
              </MemberName>
              <MemberDescription>
                Шашурин Александр Евгеньевич.<br />
                Ректор БГТУ «ВОЕНМЕХ» им. Д.Ф. Устинова, доктор технических наук, профессор, руководитель ведущего технического университета России
              </MemberDescription>
            </BoardMemberCard>
          </BoardMembersGrid>
        </BoardMembersSection>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
      >
        <TrusteesSection>
          <TrusteesTitle>ЧЛЕНЫ ПОПЕЧИТЕЛЬСКОГО СОВЕТА</TrusteesTitle>
          <TrusteesGrid>
            <BoardMemberCard
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <MemberName>
                КРИКАЛЁВ<br />
                Сергей<br />
                Константинович
              </MemberName>
              <MemberDescription>
                Крикалёв Сергей Константинович.<br />
                Герой Советского Союза и Герой Российской Федерации<br />
                Лётчик-космонавт СССР<br />
                Рекордсмен по суммарному времени пребывания в космосе
              </MemberDescription>
            </BoardMemberCard>

            <BoardMemberCard
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <MemberName>
                АРЦЕБАРСКИЙ<br />
                Анатолий<br />
                Павлович
              </MemberName>
              <MemberDescription>
                Арцебарский Анатолий Павлович.<br />
                Герой Советского Союза<br />
                Лётчик-космонавт СССР<br />
                Участник программы "Союз" - "Мир"
              </MemberDescription>
            </BoardMemberCard>

            <BoardMemberCard
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <MemberName>
                МОВЧАН<br />
                Сергей<br />
                Николаевич
              </MemberName>
              <MemberDescription>
                Мовчан Сергей Николаевич.<br />
                Советник Губернатора Санкт-Петербурга.<br />
                Заслуженный юрист Российской Федерации.
              </MemberDescription>
            </BoardMemberCard>
          </TrusteesGrid>
        </TrusteesSection>
      </motion.div>



      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <HistoryStatusSection>
          <HistoryStatusContainer>
            <MobileTitleContainer>
              <h3>О ФОНДЕ</h3>
            </MobileTitleContainer>
            <InfographicContainer>
              <motion.img
                src={infographik}
                alt="Инфографика фонда"
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  height: 'auto'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
              />
            </InfographicContainer>

            <HistoryText>
              <h3 className="desktop-title">О ФОНДЕ</h3>
              <p>
                Роль России как одного из лидеров космической отрасли трудно переоценить. На сегодняшний день Россия вместе с США и Китаем входит в тройку главных космических держав. Наша страна была первопроходцем во многих космических достижениях: это теоретическое обоснование полетов в космос, первый искусственный спутник, первый полет человека в космос, первый межпланетный перелет и другие свершения.
              </p>
              <p>
                Фонд содействия развитию космонавтики был создан для развития международных и общероссийских проектов, рассказывающих о достижениях российской космонавтики, для того, чтобы подчеркнуть роль России как одного из мировых технологических лидеров.
              </p>
            </HistoryText>
          </HistoryStatusContainer>
        </HistoryStatusSection>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
      >
        <StrategicDirectionsSection>
          <SectionTitle>СТРАТЕГИЧЕСКИЕ НАПРАВЛЕНИЯ</SectionTitle>
          <StrategicGrid>
            <StrategicCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <StrategicIcon src={atomIcon} alt="Научные исследования" />
              <StrategicTitle>НАУЧНЫЕ<br />ИССЛЕДОВАНИЯ<br />И ТЕХНОЛОГИИ</StrategicTitle>
              <StrategicDescription>
                Поддержка прикладных<br />
                и фундаментальных<br />
                исследований,<br />
                связанных с космосом<br />
                и смежными областями.
              </StrategicDescription>
            </StrategicCard>

            <StrategicCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <StrategicIcon src={rocketIcon} alt="Инвестиции в стартапы" />
              <StrategicTitle>ИНВЕСТИЦИИ<br />В СТАРТАПЫ<br />И ПРОЕКТЫ</StrategicTitle>
              <StrategicDescription>
                Финансирование<br />
                инновационных<br />
                технологических<br />
                компаний и инициатив<br />
                в космической отрасли.
              </StrategicDescription>
            </StrategicCard>

            <StrategicCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <StrategicIcon src={documentIcon} alt="Образование и просвещение" />
              <StrategicTitle>ОБРАЗОВАНИЕ<br />И ПРОСВЕЩЕНИЕ<br />В НАУКЕ</StrategicTitle>
              <StrategicDescription>
                Организация программ,<br />
                лекций и мероприятий<br />
                для популяризации<br />
                научных знаний<br />
                и космических исследований.
              </StrategicDescription>
            </StrategicCard>

            <StrategicCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <StrategicIcon src={gearIcon} alt="Международное сотрудничество" />
              <StrategicTitle>МЕЖДУНАРОДНОЕ<br />СОТРУДНИЧЕСТВО<br />И ПАРТНЕРСТВО</StrategicTitle>
              <StrategicDescription>
                Развитие связей<br />
                с зарубежными<br />
                организациями<br />
                и исследовательскими<br />
                центрами по всему миру.
              </StrategicDescription>
            </StrategicCard>

            <StrategicCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <StrategicIcon src={planetIcon} alt="Государственная поддержка" />
              <StrategicTitle>ГОСУДАРСТВЕННАЯ<br />ПОДДЕРЖКА<br />И РАЗВИТИЕ</StrategicTitle>
              <StrategicDescription>
                Сотрудничество<br />
                с государственными<br />
                структурами для<br />
                развития космической<br />
                отрасли и технологий.
              </StrategicDescription>
            </StrategicCard>

            <StrategicCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <StrategicIcon src={ufoIcon} alt="Технологические инновации" />
              <StrategicTitle>ТЕХНОЛОГИЧЕСКИЕ<br />ИННОВАЦИИ<br />И РАЗРАБОТКИ</StrategicTitle>
              <StrategicDescription>
                Поддержка создания<br />
                новых технологий<br />
                и инновационных<br />
                решений для<br />
                космических исследований.
              </StrategicDescription>
            </StrategicCard>
          </StrategicGrid>
        </StrategicDirectionsSection>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
      >
        <DocsSection>
          <DocsBgImage src={Frame49} alt="" />
          <DocsContainer>
            <DocsTitle>ДОКУМЕНТЫ И ПОЛИТИКА</DocsTitle>
            <DocsButtonsRow>
              <DocButton href={charterPdf} target="_blank" rel="noopener noreferrer" download>
                Устав
              </DocButton>
            </DocsButtonsRow>
          </DocsContainer>
        </DocsSection>
      </motion.div>
    </>
  );
}

export default AboutFond;
