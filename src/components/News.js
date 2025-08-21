import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import image76 from '../image 76.png';
import image77 from '../image 77.png';

const NewsSection = styled.section`
  padding: 100px 0;
  /* Базовый фон */
  background:
    radial-gradient(205% 105% at 240% -15%, rgba(49, 38, 132, 1) 0%, rgba(49, 38, 132,0) 99%, rgba(49, 38, 132,0) 100%),
    radial-gradient(205% 105% at -100% 120%, rgba(1,156,229, 1) 0%, rgba(1,156,229,0) 99%, rgba(1,156,229,0) 100%),
    linear-gradient(180deg, #ffffff 0%, #ffffff 55%, #ffffff 100%);
  position: relative;
  overflow: hidden;

  /* Размытое эллиптическое свечение поверх */
//   &::before {
//     content: "";
//     position: absolute;
//     inset: -220px;
//     background: radial-gradient(1000px 430px at 22% 64%, rgba(49, 38, 132,1) 0%, rgba(49, 38, 132,0) 60%);
//     filter: blur(320px);
//     opacity: 0.25;
//     pointer-events: none;
//   }
`;

const Container = styled.div`
  width: var(--container-w);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--page-x);
  padding-right: var(--page-x);
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'Raleway', sans-serif;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 4rem;
  color: #000; /* чёрный заголовок */
  text-align: left;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    text-align: center;
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 1150px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 950px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const NewsCard = styled(motion.div)`
  background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 24px;
  padding: 1.5rem 1.75rem;
  display: grid;
  grid-template-rows: auto auto 1fr;
  min-height: 240px;
  transition: all 0.3s ease;
  position: relative;
  overflow: visible;

  @media (max-width: 1150px) {
    padding: 1.25rem 1.5rem;
    min-height: 220px;
  }

  @media (max-width: 950px) {
    padding: 1rem 1.25rem;
    min-height: 200px;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.14);
  }

  .news-title {
    font-family: 'Raleway', sans-serif;
    font-size: 1.7rem; /* чуть больше */
    font-weight: 400;
    text-transform: uppercase;
    color: #000000;
    margin: 0 0 .25rem 0;
    line-height: 1.25;

    @media (max-width: 1150px) {
      font-size: 1.5rem;
    }

    @media (max-width: 950px) {
      font-size: 1.3rem;
    }
  }

  .date {
    font-size: 0.9rem;
    color: #333333;
    margin-bottom: .75rem;
    &::before { content: '# '; color: #00aaff; }
  }

  .news-body {
    display: grid;
    grid-template-columns: 230px 1fr;
    gap: 1.25rem;
    align-items: start;

    @media (max-width: 1150px) {
      grid-template-columns: 200px 1fr;
      gap: 1rem;
    }

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  .thumb {
    width: 100%;
    height: 180px;
    border-radius: 16px;
    overflow: hidden;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1150px) {
      height: 160px;
    }

    @media (max-width: 950px) {
      height: 140px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
      transition: transform .3s ease;
    }
  }

  .content { font-family: 'Proxima Nova', 'Raleway', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif; }
  .news-description { color: #000000; font-size: 1rem; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

  &:hover .thumb img { transform: scale(1.03); }
`;

const AllNewsButton = styled(motion.button)`
  background: #1a1a2e;
  border: 1px solid #00ffff;
  color: #fff;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 25px;
  cursor: pointer;
  font-family: 'Raleway', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;

  &:hover {
    background: #00ffff;
    color: #000;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
  }
`;

const News = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const news = [
        {
            date: '20.07.2025',
            title: 'ЗАПУСК НОВОГО СПУТНИКА',
            description: 'Успешно завершен запуск образовательного спутника "Звездочка-1" для проведения научных экспериментов в космосе.',
            image: image76
        },
        {
            date: '18.07.2025',
            title: 'ОТКРЫТИЕ ПЛАНЕТАРИЯ',
            description: 'В Москве состоялось торжественное открытие современного планетария, созданного при поддержке фонда.',
            image: image77
        }
    ];

    return (
        <NewsSection id="news" ref={ref}>
            <Container>
                <SectionTitle
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    НОВОСТИ
                </SectionTitle>

                <NewsGrid>
                    {news.map((item, index) => (
                        <NewsCard
                            key={item.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                        >
                            <div className="news-body">
                                <div className="thumb">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="content">
                                    <h3 className="news-title">{item.title}</h3>
                                    <div className="date">{item.date}</div>
                                    <p className="news-description">{item.description}</p>
                                </div>
                            </div>
                        </NewsCard>
                    ))}
                </NewsGrid>

                <AllNewsButton
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    ВСЕ НОВОСТИ
                </AllNewsButton>
            </Container>
        </NewsSection>
    );
};

export default News;


