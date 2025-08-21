import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import RusSpace from '../RusSpace.svg';
import Logo from '../Logo.svg';

const ServicesSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #16213e 0%, #0f3460 50%, #533483 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%2300ffff" stroke-width="0.1" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.1;
  }
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
  text-align: center;
  font-family: 'Raleway', sans-serif;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #00ffff, #ff0080);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 25px 50px rgba(0, 255, 255, 0.15);
    border-color: rgba(0, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(45deg, #00ffff, #0080ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);

  img {
    width: 50px;
    height: 50px;
    filter: brightness(0) invert(1);
  }
`;

const ServiceTitle = styled.h3`
  font-family: 'Raleway', sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #00ffff;
`;

const ServiceDescription = styled.p`
  font-family: 'Proxima Nova', 'Raleway', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 1.5rem;
`;

const ServiceFeatures = styled.ul`
  font-family: 'Proxima Nova', 'Raleway', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif;
  list-style: none;
  padding: 0;
  text-align: left;

  li {
    font-size: 0.9rem;
    color: #aaa;
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
    position: relative;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #00ffff;
      font-weight: bold;
    }
  }
`;

const SpecialOffer = styled(motion.div)`
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 128, 0.1));
  border: 2px solid rgba(0, 255, 255, 0.3);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  margin-top: 3rem;

  h3 {
    font-family: 'Raleway', sans-serif;
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #00ffff, #ff0080);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 1.1rem;
    color: #ccc;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .offer-button {
    background: linear-gradient(45deg, #00ffff, #ff0080);
    border: none;
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: #000;
    border-radius: 50px;
    cursor: pointer;
    font-family: 'Raleway', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 40px rgba(0, 255, 255, 0.5);
    }
  }
`;

const Services = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const services = [
        {
            icon: '🚀',
            title: 'Ракетное моделирование',
            description: 'Создание и запуск моделей ракет различных классов и назначений',
            features: [
                'Проектирование и сборка моделей',
                'Запуски на полигонах',
                'Соревнования и выставки',
                'Обучение технике безопасности'
            ]
        },
        {
            icon: '🛰️',
            title: 'Спутниковые технологии',
            description: 'Разработка малых космических аппаратов и образовательных программ',
            features: [
                'CubeSat проекты',
                'Образовательные программы',
                'Сотрудничество с вузами',
                'Международные проекты'
            ]
        },
        {
            icon: '🎓',
            title: 'Образовательные программы',
            description: 'Проведение лекций, мастер-классов и практических занятий',
            features: [
                'Лекции по космонавтике',
                'Практические занятия',
                'Мастер-классы',
                'Научные конференции'
            ]
        },
        {
            icon: '🔬',
            title: 'Научные исследования',
            description: 'Проведение экспериментов и исследований в области космических технологий',
            features: [
                'Экспериментальные проекты',
                'Научные публикации',
                'Сотрудничество с институтами',
                'Инновационные разработки'
            ]
        }
    ];

    return (
        <ServicesSection id="services" ref={ref}>
            <Container>
                <SectionTitle
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    Наши услуги
                </SectionTitle>

                <SectionSubtitle
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                    Мы предлагаем широкий спектр услуг в области космического моделирования и образования
                </SectionSubtitle>

                <ServicesGrid>
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.title}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <ServiceIcon>
                                <span>{service.icon}</span>
                            </ServiceIcon>
                            <ServiceTitle>{service.title}</ServiceTitle>
                            <ServiceDescription>{service.description}</ServiceDescription>
                            <ServiceFeatures>
                                {service.features.map((feature, featureIndex) => (
                                    <li key={featureIndex}>{feature}</li>
                                ))}
                            </ServiceFeatures>
                        </ServiceCard>
                    ))}
                </ServicesGrid>

                <SpecialOffer
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                >
                    <h3>Специальное предложение</h3>
                    <p>
                        Присоединяйтесь к нашему сообществу и получите доступ к эксклюзивным
                        материалам, мастер-классам и возможности участвовать в реальных космических проектах!
                    </p>
                    <button className="offer-button">
                        Присоединиться сейчас
                    </button>
                </SpecialOffer>
            </Container>
        </ServicesSection>
    );
};

export default Services;
