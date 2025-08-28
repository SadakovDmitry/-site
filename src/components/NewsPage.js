import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import mainImage from '../images/NewsPage/main_image.png';
import astronautImage from '../images/NewsPage/austronaut.png';

// Импорт шрифтов
import ProximaRegular from '../Proxima Nova/proximanova_regular.ttf';
import ProximaBold from '../Proxima Nova/proximanova_bold.otf';
import ProximaExtraBold from '../Proxima Nova/proximanova_extrabold.otf';
import RalewayRegular from '../Raleway/Raleway-v4020-Regular.otf';
import RalewaySemiBold from '../Raleway/Raleway-v4020-SemiBold.otf';
import RalewayBold from '../Raleway/Raleway-v4020-Bold.otf';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #1a1a1a;

  @font-face {
    font-family: 'Proxima Nova';
    src: url(${ProximaRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Proxima Nova';
    src: url(${ProximaBold}) format('opentype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Proxima Nova';
    src: url(${ProximaExtraBold}) format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Raleway';
    src: url(${RalewayRegular}) format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Raleway';
    src: url(${RalewaySemiBold}) format('opentype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Raleway';
    src: url(${RalewayBold}) format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
`;

const HeroBanner = styled.div`
  position: relative;
  height: 55vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const BannerImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 3vw;
`;

const HeroTitle = styled(motion.h1)`
  font-family: 'Raleway', sans-serif;
  font-size: clamp(1.0rem, 5vw, 6.5rem);
  font-weight: 400;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
  text-decoration: none;
  border-bottom: none;
  outline: none;
  z-index: 3;
  margin: 0;
`;

const ContentSection = styled.section`
  background: #ffffff;
  padding: 5rem 0;
  min-height: 30vh;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at top left, rgba(1, 156, 229, 0.3) 0%, transparent 50%);
    pointer-events: none;
    z-index: 3;
  }
`;

const Container = styled.div`
  max-width: 95vw;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const NewsCarousel = styled(motion.div)`
  position: relative;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
  overflow-x: auto;
  overflow-y: hidden;
  min-height: 300px;
  touch-action: pan-x;
  -webkit-overflow-scrolling: touch;

  /* Скрываем скроллбар для красоты */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const NewsCardsContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem 0;
  min-width: max-content;
`;

const NewsCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 420px;
  flex-shrink: 0;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  @media (max-width: 768px) {
    width: 320px;
    border-radius: 15px;
  }

  @media (max-width: 480px) {
    width: 280px;
    border-radius: 12px;
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: center;

  @media (max-width: 768px) {
    height: 200px;
  }

  @media (max-width: 480px) {
    height: 180px;
  }
`;

const NewsContent = styled.div`
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.2rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const NewsDate = styled.div`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 1rem;
  color: #000000;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const NewsTitle = styled.h3`
  font-family: 'Raleway', sans-serif;
  font-size: 1.8rem;
  font-weight: 400;
  color: #212529;
  margin-bottom: 1rem;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 0.6rem;
  }
`;

const NewsDescription = styled.p`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 1rem;
  color: #495057;
  line-height: 1.5;
  margin-bottom: 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 1.3;
  }
`;

const TouchHint = styled.div`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.9rem;
  color: #6c757d;
  text-align: center;
  margin-top: 1rem;
  opacity: 0.7;
`;

const LeftFade = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100%;
  background: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 25%, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 0.6) 55%, rgba(255, 255, 255, 0.3) 77%, rgba(255, 255, 255, 0.1) 91%, rgba(255, 255, 255, 0) 100%);
  // background: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 20%, rgba(255, 255, 255, 0.8) 35%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.3) 75%, rgba(255, 255, 255, 0.1) 90%, rgba(255, 255, 255, 0) 100%);
  // background: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%);
  z-index: 4;
  pointer-events: none;

  @media (max-width: 768px) {
    width: 60px;
  }

  @media (max-width: 480px) {
    width: 40px;
  }
`;

const RightFade = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100%;
  background: linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 25%, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 0.6) 55%, rgba(255, 255, 255, 0.3) 77%, rgba(255, 255, 255, 0.1) 91%, rgba(255, 255, 255, 0) 100%);
  z-index: 4;
  pointer-events: none;

  @media (max-width: 768px) {
    width: 60px;
  }

  @media (max-width: 480px) {
    width: 40px;
  }
`;



const NewsPage = () => {
  const [inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const carouselRef = useRef(null);

  const news = [
    {
      id: 1,
      image: astronautImage,
      date: '# 05.07.2025',
      title: 'ИССЛЕДОВАНИЯ МАРСА',
      description: 'Планирование новой миссии на Марс. Разработка новых инструментов для исследования.'
    },
    {
      id: 2,
      image: astronautImage,
      date: '# 08.07.2025',
      title: 'КОСМИЧЕСКАЯ СТАНЦИЯ',
      description: 'Обновление систем космической станции. Модернизация оборудования и улучшение безопасности.'
    },
    {
      id: 3,
      image: astronautImage,
      date: '# 10.07.2025',
      title: 'НОВЫЕ ТЕХНОЛОГИИ',
      description: 'Внедрение инновационных технологий в космическую отрасль. Разработка новых материалов.'
    },
    {
      id: 4,
      image: astronautImage,
      date: '# 12.07.2025',
      title: 'МЕЖДУНАРОДНОЕ СОТРУДНИЧЕСТВО',
      description: 'Подписание соглашения о международном сотрудничестве в области космических исследований.'
    },
    {
      id: 5,
      image: astronautImage,
      date: '# 15.07.2025',
      title: 'ПОДГОТОВКА К ЗАПУСКУ',
      description: 'Подготовка к запуску новой ракеты-носителя. Проведены все необходимые испытания и проверки систем.'
    },
    {
      id: 6,
      image: astronautImage,
      date: '# 18.07.2025',
      title: 'ДОСТИЖЕНИЯ В РАКЕТОСТРОЕНИИ',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.'
    },
    {
      id: 7,
      image: astronautImage,
      date: '# 20.07.2025',
      title: 'НОВАЯ МИССИЯ В КОСМОС',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.'
    },
    {
      id: 8,
      image: astronautImage,
      date: '# 23.07.2025',
      title: 'ЗАГОЛОВОК НОВОСТИ',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  ];

  return (
    <PageContainer>
      <HeroBanner>
        <BannerImage src={mainImage} alt="News Banner" />
        <Overlay>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            НОВОСТИ
          </HeroTitle>
        </Overlay>
      </HeroBanner>

      <ContentSection>
        <Container>
          <NewsCarousel
            ref={carouselRef}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <NewsCardsContainer>
              {news.map((item, index) => (
                <NewsCard key={index}>
                  <NewsImage src={item.image} alt="News" />
                  <NewsContent>
                    <NewsDate>{item.date}</NewsDate>
                    <NewsTitle>{item.title}</NewsTitle>
                    <NewsDescription>{item.description}</NewsDescription>
                  </NewsContent>
                </NewsCard>
              ))}
            </NewsCardsContainer>

            <TouchHint>
              Используйте горизонтальный скролл для просмотра актуальных новостей
            </TouchHint>
          </NewsCarousel>

          <LeftFade />
          <RightFade />
        </Container>
      </ContentSection>
    </PageContainer>
  );
};

export default NewsPage;
