import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Импорт изображений
import mainImage from '../images/EventPage/main_image.png';
import image1 from '../images/EventPage/image_1.png';
import rocketIcon from '../images/EventPage/rocket.svg';
import computerIcon from '../images/EventPage/computer.svg';
import houseIcon from '../images/EventPage/house.svg';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
`;

const HeroSection = styled.div`
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
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 3vw;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-family: 'Proxima Nova', sans-serif;
  font-size: clamp(1.5rem, 4vw, 4rem);
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 0.05em;
  text-decoration: none;
  border-bottom: none;
  text-align: center;
  outline: none;
  z-index: 3;
  margin: 0;
`;

const ContentSection = styled.div`
  // background: linear-gradient(135deg, #312684 0%, #ffffff 50%, #019CE5 100%);
  background: radial-gradient(ellipse at calc(100% + 40vw) top, rgba(49, 38, 132, 0.5) 0%, #ffffff 50%, transparent 100%),
              radial-gradient(ellipse at calc(0% - 20vw) calc(50% - 10vh), rgba(1, 156, 229, 0.9) 0%, #ffffff 50%, transparent 100%);
  padding: 5rem 0;
  min-height: 100vh;
  position: relative;
`;

const Container = styled.div`
  max-width: 2000px;
  margin: 0 auto;
  padding: 0 4rem;
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const GallerySection = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Raleway', sans-serif;
  font-size: 2.5rem;
  font-weight: 500;
  color: #212529;
  margin-bottom: 2rem;
  text-align: center;
`;

const GalleryContainer = styled.div`
  width: 90vw;
  margin: 0 auto;
  padding: 0;
  position: relative;
  overflow: visible;
  background: transparent;

  @media (max-width: 768px) {
    width: 86vw;
    margin-left: 2.5vw;
    margin-right: auto;
  }
`;

const GalleryCarousel = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  overflow-y: hidden;
  touch-action: pan-x;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const GalleryCard = styled.div`
  min-width: 420px;
  min-height: 300px;
  background: transparent;
  backdrop-filter: none;
  border: none;
  border-radius: 0;
  padding: 20px;
  transition: none;
  position: relative;
  overflow: visible;
  cursor: pointer;

  &:hover {
    transform: none;
    box-shadow: none;
    border-color: transparent;
  }

  @media (max-width: 768px) {
    min-width: 320px;
    min-height: 250px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    min-width: 280px;
    min-height: 220px;
    padding: 10px;
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 15px;
  transition: transform 0.3s ease;
  z-index: 10;

  ${GalleryCard}:hover & {
    transform: scale(1.1);
    z-index: 20;
  }

  @media (max-width: 768px) {
    height: 200px;
  }

  @media (max-width: 480px) {
    height: 180px;
  }
`;





const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: pointer;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 10px;
`;

const ProjectDescription = styled.section`
  margin-bottom: 4rem;
  text-align: center;
  position: relative;
  padding: 2rem;
  width: 90%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;

  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   border: 2px solid #ffffff;
  //   border-radius: 20px;
  //   pointer-events: none;
  //   z-index: 1;
  // }

  &::after {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 2px solid rgba(255, 255, 255, 0.6);
    border-radius: 15px;
    pointer-events: none;
    z-index: 1;
  }
`;

const DescriptionText = styled.p`
  font-family: 'Proxima Nova', sans-serif;
  // font-size: 1.2rem;
  font-size: clamp(1.0rem, 1.5vw, 100rem);
  line-height: 1.2;
  color: #333;
  text-align: center;
  margin: 0;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding: 0.1rem 1rem;
  position: relative;
  z-index: 2;
`;

const StagesSection = styled.section`
  margin-bottom: 4rem;
  text-align: center;
`;

const StagesContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;

  @media (max-width: 768px) {
    padding: 1rem 0;
    min-height: 400px;
  }
`;

const TimelineLine = styled.div`
  position: relative;
  height: 4px;
  background: linear-gradient(90deg, #019CE5 0%, #312684 100%);
  border-radius: 2px;
  margin: 2rem 0 3rem 0;
  width: 100vw;
  margin-left: calc(-50vw + 50%);

  @media (max-width: 768px) {
    display: none;
  }
`;

const StagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 1rem;
  }
`;

const StageItem = styled(motion.div)`
  background: ${props => props.active ? 'linear-gradient(135deg, #019CE5, #312684)' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : '#333'};
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  text-align: center;
  position: relative;
  box-shadow: ${props => props.active ? '0 8px 25px rgba(1, 156, 229, 0.3)' : '0 4px 15px rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0.2rem 0.6rem;
    max-width: 250px;
    margin: 0 auto;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 2rem;
    background: ${props => props.active ? '#019CE5' : '#dee2e6'};
    z-index: 2;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.active ? '0 12px 30px rgba(1, 156, 229, 0.4)' : '0 8px 20px rgba(0, 0, 0, 0.15)'};
  }
`;

const StageText = styled.p`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 1rem;
  // font-size: calc(1px, 2vw, 100px);
  line-height: 1.5;
  margin: 0;
  font-weight: 500;
`;

const ResultsSection = styled.section`
  margin-bottom: 4rem;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  background: transparent;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ResultIcon = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;

const ResultText = styled.p`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 1rem;
  color: #333;
  margin: 0;
  flex: 1;
`;



const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentStage, setCurrentStage] = useState(0);

  const [galleryRef, galleryInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Данные событий (аналогично EventsPage)
  const eventsData = {
    1: {
      title: 'ЛЕКТОРИЙ ДЛЯ ШИРОКОЙ АУДИТОРИИ',
      description: 'Проект направлен на популяризацию науки и технологий через цикл публичных лекций, доступных широкой аудитории. Лекции читают эксперты из университетов, исследовательских институтов и инновационных компаний, раскрывая сложные темы простым и вдохновляющим языком.',
      gallery: [
        { image: image1, title: 'Лекция по космонавтике', description: 'Публичная лекция о современных достижениях в космической отрасли' },
        { image: image1, title: 'Встреча с экспертом', description: 'Интерактивная сессия с ведущим специалистом в области астрофизики' },
        { image: image1, title: 'Научный эксперимент', description: 'Демонстрация физических опытов для аудитории' },
        { image: image1, title: 'Обсуждение проектов', description: 'Круглый стол по актуальным научным темам' },
        { image: image1, title: 'Презентация исследований', description: 'Представление результатов научных работ' },
        { image: image1, title: 'Мастер-класс', description: 'Практическое занятие по космическим технологиям' },
        { image: image1, title: 'Интерактивная сессия', description: 'Обсуждение вопросов с аудиторией' },
        { image: image1, title: 'Демонстрация оборудования', description: 'Показ современных научных приборов' },
        { image: image1, title: 'Групповое фото', description: 'Памятное фото участников мероприятия' },
        { image: image1, title: 'Финальная встреча', description: 'Подведение итогов и планы на будущее' }
      ],
      stages: [
        'Подготовка лекционных материалов совместно с научным сообществом.',
        'Проведение встреч в очном и онлайн-форматах.',
        'Публикация видеозаписей и материалов в открытом доступе.'
      ],
      results: [
        'Запущено в пилотном формате в 2024 году.',
        'Проведено более 10 лекций, охват — несколько тысяч зрителей онлайн и офлайн.',
        'В разработке расширение программы на новые города и университеты.'
      ]
    },
    2: {
      title: 'НАУЧНЫЕ ВОРКШОПЫ',
      description: 'Интерактивные научные воркшопы для студентов и молодых ученых, направленные на практическое освоение современных методов исследований в области космонавтики и смежных наук.',
      gallery: [
        { image: image1, title: 'Практические занятия', description: 'Студенты проводят эксперименты в лаборатории' },
        { image: image1, title: 'Работа с оборудованием', description: 'Обучение использованию современных приборов' },
        { image: image1, title: 'Групповые проекты', description: 'Коллективная работа над научными задачами' },
        { image: image1, title: 'Презентация результатов', description: 'Защита проектов участниками воркшопа' },
        { image: image1, title: 'Экскурсия в музей', description: 'Посещение музея космонавтики' },
        { image: image1, title: 'Финальная встреча', description: 'Подведение итогов воркшопа' },
        { image: image1, title: 'Лабораторные работы', description: 'Выполнение индивидуальных заданий' },
        { image: image1, title: 'Семинар по результатам', description: 'Обсуждение полученных данных' },
        { image: image1, title: 'Сертификация навыков', description: 'Проверка освоения методов' },
        { image: image1, title: 'Выпускной вечер', description: 'Торжественное завершение воркшопа' }
      ],
      stages: [
        'Разработка программы воркшопов с ведущими специалистами.',
        'Проведение серии практических занятий и экспериментов.',
        'Создание методических материалов для самостоятельного изучения.'
      ],
      results: [
        'Проведено 15 воркшопов в 2024 году.',
        'Участие приняли более 200 студентов из 8 университетов.',
        'Создана база методических материалов для дальнейшего использования.'
      ]
    },
    3: {
      title: 'ОБРАЗОВАТЕЛЬНЫЕ КУРСЫ',
      description: 'Специализированные образовательные курсы по космонавтике, астрономии и космическим технологиям для студентов технических специальностей.',
      gallery: [
        { image: image1, title: 'Лекционное занятие', description: 'Теоретический материал по космическим технологиям' },
        { image: image1, title: 'Практическая работа', description: 'Выполнение лабораторных заданий' },
        { image: image1, title: 'Экзаменационная сессия', description: 'Проверка знаний студентов' },
        { image: image1, title: 'Выдача сертификатов', description: 'Вручение документов об окончании курса' },
        { image: image1, title: 'Групповое фото', description: 'Памятное фото выпускников курса' },
        { image: image1, title: 'Финальная встреча', description: 'Подведение итогов обучения' },
        { image: image1, title: 'Семинарские занятия', description: 'Углубленное изучение тем' },
        { image: image1, title: 'Консультации', description: 'Индивидуальная помощь студентам' },
        { image: image1, title: 'Промежуточная аттестация', description: 'Контроль усвоения материала' },
        { image: image1, title: 'Выпускной экзамен', description: 'Итоговая проверка знаний' }
      ],
      stages: [
        'Разработка учебных программ и материалов.',
        'Проведение лекционных и практических занятий.',
        'Организация итоговой аттестации и выдача сертификатов.'
      ],
      results: [
        'Запущено 3 образовательных курса.',
        'Обучение прошли 150 студентов.',
        'Разработаны стандарты для тиражирования курсов.'
      ]
    },
    4: {
      title: 'СТУДЕНЧЕСКИЕ ЛАБОРАТОРИИ',
      description: 'Создание и поддержка студенческих лабораторий для проведения научных исследований в области космонавтики.',
      gallery: [
        { image: image1, title: 'Новое оборудование', description: 'Современные приборы для исследований' },
        { image: image1, title: 'Обучение работе', description: 'Инструктаж по использованию оборудования' },
        { image: image1, title: 'Проведение опытов', description: 'Студенты за работой в лаборатории' },
        { image: image1, title: 'Анализ результатов', description: 'Обработка полученных данных' },
        { image: image1, title: 'Научная конференция', description: 'Презентация результатов исследований' },
        { image: image1, title: 'Публикация работ', description: 'Подготовка научных статей' },
        { image: image1, title: 'Техническое обслуживание', description: 'Уход за лабораторным оборудованием' },
        { image: image1, title: 'Калибровка приборов', description: 'Настройка точности измерений' },
        { image: image1, title: 'Безопасность в лаборатории', description: 'Инструктаж по технике безопасности' },
        { image: image1, title: 'Открытие лаборатории', description: 'Торжественное открытие новой лаборатории' }
      ],
      stages: [
        'Оснащение лабораторий современным оборудованием.',
        'Обучение студентов работе с оборудованием.',
        'Проведение научных исследований и экспериментов.'
      ],
      results: [
        'Создано 5 студенческих лабораторий.',
        'Проведено 25 научных экспериментов.',
        'Подготовлено 12 научных публикаций.'
      ]
    },
    5: {
      title: 'КАРЬЕРА В НАУКЕ',
      description: 'Программа поддержки молодых ученых и специалистов, направленная на развитие карьеры в научной сфере.',
      gallery: [
        { image: image1, title: 'Отбор участников', description: 'Интервью с кандидатами программы' },
        { image: image1, title: 'Тренинг по карьере', description: 'Мастер-класс по развитию навыков' },
        { image: image1, title: 'Сетевое взаимодействие', description: 'Встреча с потенциальными работодателями' },
        { image: image1, title: 'Индивидуальные консультации', description: 'Персональное планирование карьеры' },
        { image: image1, title: 'Трудоустройство', description: 'Подписание трудовых договоров' },
        { image: image1, title: 'Выпуск программы', description: 'Торжественное завершение обучения' },
        { image: image1, title: 'Менторская поддержка', description: 'Работа с опытными наставниками' },
        { image: image1, title: 'Развитие soft skills', description: 'Тренинг коммуникативных навыков' },
        { image: image1, title: 'Портфолио проектов', description: 'Создание профессионального портфолио' },
        { image: image1, title: 'Карьерный форум', description: 'Встреча с представителями компаний' }
      ],
      stages: [
        'Отбор участников программы.',
        'Проведение тренингов и мастер-классов.',
        'Трудоустройство в научные организации.'
      ],
      results: [
        'В программе участвуют 30 молодых ученых.',
        'Проведено 20 тренингов по развитию карьеры.',
        'Трудоустроено 15 участников программы.'
      ]
    },
    6: {
      title: 'ОТКРЫТЫЕ ЛЕКЦИИ',
      description: 'Цикл открытых лекций по актуальным темам космонавтики и космических технологий для широкой аудитории.',
      gallery: [
        { image: image1, title: 'Подготовка материалов', description: 'Работа над лекционным контентом' },
        { image: image1, title: 'Проведение лекции', description: 'Выступление перед аудиторией' },
        { image: image1, title: 'Интерактивная сессия', description: 'Ответы на вопросы слушателей' },
        { image: image1, title: 'Запись лекции', description: 'Создание видеоматериалов' },
        { image: image1, title: 'Публикация онлайн', description: 'Размещение в открытом доступе' },
        { image: image1, title: 'Библиотека лекций', description: 'Архив всех проведенных мероприятий' },
        { image: image1, title: 'Модерация комментариев', description: 'Работа с обратной связью аудитории' },
        { image: image1, title: 'Аналитика просмотров', description: 'Изучение статистики популярности' },
        { image: image1, title: 'Обновление контента', description: 'Добавление новых материалов' },
        { image: image1, title: 'Форум обсуждений', description: 'Платформа для дискуссий' }
      ],
      stages: [
        'Подготовка лекционных материалов.',
        'Проведение лекций в различных форматах.',
        'Публикация материалов в открытом доступе.'
      ],
      results: [
        'Проведено 18 открытых лекций.',
        'Общий охват аудитории составил 5000 человек.',
        'Создана библиотека видеоматериалов.'
      ]
    }
  };

  const event = eventsData[eventId];

  useEffect(() => {
    if (!event) {
      navigate('/events');
      return;
    }

    // Анимация этапов по мере скролла
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPosition > windowHeight * 0.8) {
        setCurrentStage(1);
      }
      if (scrollPosition > windowHeight * 1.2) {
        setCurrentStage(2);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [event, navigate]);

  if (!event) {
    return null;
  }

  return (
    <PageContainer>

      <HeroSection>
        <BannerImage src={mainImage} alt={event.title} />
        <Overlay>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <HeroTitle>{event.title}</HeroTitle>
          </motion.div>
        </Overlay>
      </HeroSection>

      <ContentSection>
        <Container>
          <GallerySection ref={galleryRef}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={galleryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <SectionTitle>ГАЛЕРЕЯ</SectionTitle>
            </motion.div>
            <GalleryContainer>
              <GalleryCarousel>
                {event.gallery.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <GalleryCard onClick={() => setSelectedImage(item.image)}>
                      <GalleryImage
                        src={item.image}
                        alt={item.title}
                      />
                    </GalleryCard>
                  </motion.div>
                ))}
              </GalleryCarousel>
            </GalleryContainer>
          </GallerySection>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <ProjectDescription>
              <DescriptionText>{event.description}</DescriptionText>
            </ProjectDescription>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <StagesSection>
              <SectionTitle>ЭТАПЫ И УЧАСТНИКИ</SectionTitle>
              <motion.div
                style={{ marginBottom: '1rem' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setCurrentStage(0)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: currentStage >= 0 ? '#019CE5' : '#f8f9fa',
                      color: currentStage >= 0 ? 'white' : '#333',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    Этап 1
                  </button>
                  <button
                    onClick={() => setCurrentStage(1)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: currentStage >= 1 ? '#019CE5' : '#f8f9fa',
                      color: currentStage >= 1 ? 'white' : '#333',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    Этап 2
                  </button>
                  <button
                    onClick={() => setCurrentStage(2)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: currentStage >= 2 ? '#019CE5' : '#f8f9fa',
                      color: currentStage >= 2 ? 'white' : '#333',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    Этап 3
                  </button>
                </div>
              </motion.div>
              <StagesContainer>
                <StagesGrid>
                  {event.stages.map((stage, index) => (
                    <StageItem
                      key={index}
                      active={index <= currentStage}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{
                        opacity: index <= currentStage ? 1 : 0.3,
                        y: 0
                      }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <StageText>{stage}</StageText>
                    </StageItem>
                  ))}
                </StagesGrid>
                <TimelineLine />
              </StagesContainer>
            </StagesSection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <ResultsSection>
              <SectionTitle>РЕЗУЛЬТАТЫ</SectionTitle>
              <ResultsGrid>
                {event.results.map((result, index) => (
                  <ResultItem key={index}>
                    <ResultIcon
                      src={index === 0 ? rocketIcon : index === 1 ? computerIcon : houseIcon}
                      alt="Иконка результата"
                    />
                    <ResultText>{result}</ResultText>
                  </ResultItem>
                ))}
              </ResultsGrid>
              <motion.div
                style={{ textAlign: 'center', marginTop: '3rem' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              >
                <button
                  style={{
                    background: '#000000',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2.5rem',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontFamily: 'Proxima Nova, sans-serif',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  СТАТЬ ПАРТНЕРОМ ПРОЕКТА
                </button>
              </motion.div>
            </ResultsSection>
          </motion.div>
        </Container>
      </ContentSection>

      <AnimatePresence>
        {selectedImage && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <ModalImage
              src={selectedImage}
              alt="Увеличенное фото"
              onClick={(e) => e.stopPropagation()}
            />
          </Modal>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default EventDetailPage;
