import Mission from "./AboutFond-components/Mission";
import Director from "./AboutFond-components/Director";
import Section from "./AboutFond-components/Pattern";
import { motion } from "framer-motion";
import styled from "styled-components";

import benefactor from "../images/AboutFondPage/people/benefactor.png";
import astrotech from "../images/AboutFondPage/buildings/astrotech.png";
import roscosmos from "../images/AboutFondPage/buildings/roscosmos.png";

// Импорт иконок для стратегических направлений
import atomIcon from "../images/AboutFondPage/icons/chrome-atom-molecule-icon-white-background-3d-rendering_476612-2231.png";
import rocketIcon from "../images/AboutFondPage/icons/chrome-rocket-ship-ready-launch-space-exploration-adventure_632498-37867 1.png";
import documentIcon from "../images/AboutFondPage/icons/png-3d-metallic-book-education-remix-transparent-background_53876-979856.png";
import gearIcon from "../images/AboutFondPage/icons/mega-creator_-_2024-.png";
import planetIcon from "../images/AboutFondPage/icons/y2k-chrome-planet-free-png.png";
import ufoIcon from "../images/AboutFondPage/icons/y2k-chrome-atom-11486669-9316773.png";

import infographik from "../images/AboutFondPage/infographik.svg";


// TODO: перенести в файл с константами
const constitutiveData = [
  {
    h2: "Частный благотворитель",
    h1: "Петр небесный",
    desc: "Активный сторонник космических исследований",
    quote:
      "Каждый шаг вперёд в науке — это шаг к пониманию нашего будущего. Поддержка таких инициатив для меня — способ быть частью общего пути.",
    text: "Человек, которая поддерживает проекты, способные вдохновлять и объединять людей. Его внимание сосредоточено на инициативах, несущих новые смыслы и открывающих перспективы. Для фонда он олицетворяет ценность индивидуального вклада в общее дело.",
    img: benefactor,
  },

  {
    h2: "Частный благотворитель",
    h1: "Петр небесный",
    desc: "Активный сторонник космических исследований",
    quote:
      "Каждый шаг вперёд в науке — это шаг к пониманию нашего будущего. Поддержка таких инициатив для меня — способ быть частью общего пути.",
    text: "Человек, которая поддерживает проекты, способные вдохновлять и объединять людей. Его внимание сосредоточено на инициативах, несущих новые смыслы и открывающих перспективы. Для фонда он олицетворяет ценность индивидуального вклада в общее дело.",
    img: benefactor,
  },
];

const trusteesData = [
  {
    h2: "Частный благотворитель",
    h1: "Петр небесный",
    desc: "Активный сторонник космических исследований",
    quote:
      "Каждый шаг вперёд в науке — это шаг к пониманию нашего будущего. Поддержка таких инициатив для меня — способ быть частью общего пути.",
    text: "Человек, которая поддерживает проекты, способные вдохновлять и объединять людей. Его внимание сосредоточено на инициативах, несущих новые смыслы и открывающих перспективы. Для фонда он олицетворяет ценность индивидуального вклада в общее дело.",
    img: benefactor,
  },

  {
    h2: "Частный благотворитель",
    h1: "Петр небесный",
    desc: "Активный сторонник космических исследований",
    quote:
      "Каждый шаг вперёд в науке — это шаг к пониманию нашего будущего. Поддержка таких инициатив для меня — способ быть частью общего пути.",
    text: "Человек, которая поддерживает проекты, способные вдохновлять и объединять людей. Его внимание сосредоточено на инициативах, несущих новые смыслы и открывающих перспективы. Для фонда он олицетворяет ценность индивидуального вклада в общее дело.",
    img: benefactor,
  },
];

const directorateData = [
  {
    h2: "Технологическая компания",
    h1: "AstroTech",
    quote:
      "Мы верим, что самые большие открытия рождаются там, где встречаются идеи, технологии и смелость мечтать. Именно поэтому для нас важно сотрудничество с фондом",
    text: "Современная организация, ориентированная на движение вперёд и поиск новых возможностей. Компания связывает в себе стремление к инновациям и желание быть частью больших перемен. Для фонда она выступает примером партнёра, готового к совместным шагам в будущее.",
    img: astrotech,
  },

  {
    h2: "Космическое агентство",
    h1: "Роскосмос",
    quote:
      "Когда усилия разных организаций объединяются, открываются новые горизонты. Наше партнёрство с фондом — это вклад в движение вперёд, к целям, которые выходят за пределы сегодняшнего дня.",
    text: "Структура, с которой фонд объединяет усилия ради достижения масштабных целей. Агентство отражает дух сотрудничества и стремление к новым горизонтам. Его участие подчёркивает важность синергии науки, общества и будущего",
    img: roscosmos,
  },
];

// Стили для блока "История и статус"
const HistoryStatusSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
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
    gap: 2rem;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    gap: 1.5rem;
    padding: 0 0.5rem;
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
  }

  @media (max-width: 480px) {
    height: 100vw;
  }
`;

const HistoryText = styled.div`
  text-align: left;
  font-family: 'Proxima Nova', sans-serif;
  color: #000;
  line-height: 1.6;

  h3 {
    font-family: 'Raleway', sans-serif;
    font-size: clamp(2rem, 4vw, 3.4rem);
    font-weight: 400;
    margin-bottom: 1.5rem;
    color: #000;
    text-transform: uppercase;
  }

  p {
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    margin-bottom: 1.0rem;
    line-height: 1.1rem;
    color: #000;
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
  width: clamp(60px, 8vw, 85px);
  height: clamp(60px, 8vw, 85px);
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
  }

  @media (max-width: 480px) {
    margin-top: 3.5rem;
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
    margin-bottom: 2rem;
    padding-left: 5vw;
    padding-right: 5vw;
  }
`;

function AboutFond() {
  return (
    <>
      <Mission></Mission>
      <Director></Director>
      <Section title={"Учредители"} blocks={constitutiveData}></Section>
      <Section
        title={"Попечительский совет"}
        blocks={trusteesData}
      ></Section>
      <Section
        title={"Правление"}
        blocks={directorateData}
      ></Section>



      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <HistoryStatusSection>
          <HistoryStatusContainer>
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
              <h3>ИСТОРИЯ И СТАТУС</h3>
              <p>
                Фонд возник как ответ на стремление объединить людей, которым небезразлично будущее науки и технологий. В его основе лежала простая идея: поддерживать те инициативы, что способны открывать новые горизонты и вдохновлять общество.
              </p>
              <p>
                С самого начала он задумывался не как узкая структура, а как пространство для сотрудничества — место, где встречаются учёные, предприниматели, государственные институты и энтузиасты. Каждый из них приносит свой вклад, и вместе эти усилия превращаются в проекты, которые помогают двигаться вперёд.
              </p>
              <p>
                Сегодня фонд продолжает эту миссию: создавать условия, при которых наука и технологии становятся ближе к людям, а партнёрство разных сфер открывает дорогу к новым достижениям. Его история — это история поиска, объединения и веры в то, что совместная работа способна изменить будущее.
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
    </>
  );
}

export default AboutFond;
