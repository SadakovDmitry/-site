import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import image75 from '../image 75.png';
import image76 from '../image 76.png';
import image77 from '../image 77.png';

const ProjectsSection = styled.section`
  padding: 100px 0;
  /* Базовый светлый фон */
   background:
    radial-gradient(137% 70% at -65% -15%, rgba(1, 156, 229, 1) 0%, rgba(1,156,229,0) 100%),
    radial-gradient(205% 105% at 240% 80%, rgba(49, 38, 132, 1) 0%, rgba(49, 38, 132,0) 99%, rgba(49, 38, 132,0) 100%),
    linear-gradient(180deg, #ffffff 0%, #ffffff 38%, #ffffff 72%, #ffffff 100%);
  position: relative;
  overflow: hidden;

  /* Размытое эллиптическое свечение поверх, чтобы края были мягкими */
  &::before {
    content: "";
    position: absolute;
    inset: -220px; /* запас, чтобы блюр не обрезался */
     background:
    radial-gradient(137% 70% at -80% -30%, rgba(1,156,229,1) 0%, rgba(1,156,229,0) 60%);
    filter: blur(320px);
    opacity: 0.25;
    pointer-events: none;
  }

  &::before {
    content: "";
    position: absolute;
    inset: -220px; /* запас, чтобы блюр не обрезался */
     background:
    radial-gradient(137% 70% at 200% 80%, rgba(49, 38, 132, 1) 0%, rgba(49, 38, 132,0) 99%, rgba(49, 38, 132,0) 100%);
    filter: blur(320px);
    opacity: 1;
    pointer-events: none;
  }
`;

// const ProjectsSection = styled.section`
//   padding: 100px 0;
//   /* Лёгкая дымка + эллиптическое свечение как в макете */
//   background:
//     radial-gradient(137% 70% at -80% -30%, rgba(1, 156, 229, 1) 0%,rgba(1, 156, 229, 1) 90%, rgba(1,156,229,0) 100%),
//     linear-gradient(180deg, #ffffff 0%, #f6fbff 38%, #eef4ff 72%, #e7efff 100%);
//   position: relative;
//   overflow: hidden;
// `;


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
  color: #0b0d13;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    text-align: center;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
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

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto auto 1fr auto; /* дата/ссылка, заголовок, описание, картинка */
  width: 100%;
  max-width: 400px;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 255, 255, 0.1);
    border-color: rgba(0, 255, 255, 0.3);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .date {
    font-size: 0.9rem;
    color: #333333;
    font-weight: 400;

    &::before {
      content: '#';
      color: #00ffff;
      margin-right: 0.3rem;
    }
  }

  .details-link {
    color: #333333;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;

    &:hover {
      color: #00ffff;
    }

    &::before {
      content: '>';
      margin-right: 0.3rem;
    }
  }

  .project-title {
    font-family: 'Raleway', sans-serif;
    font-size: 1.7rem; /* чуть больше */
    font-weight: 500;
    color: #000000;
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  .project-description {
    font-family: 'Proxima Nova', 'Raleway', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif;
    font-size: 1rem;
    color: #000000;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .project-image {
    width: 100%;
    height: 200px;
    border-radius: 15px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  &:hover .project-image img {
    transform: scale(1.05);
  }
`;

const AllProjectsButton = styled(motion.button)`
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

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [shouldCenter, setShouldCenter] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 1200 && width > 768) {
        // На экранах 768px-1200px у нас 2 колонки
        // Если у нас 3 проекта, то 3-й будет в новой строке
        setShouldCenter(projects.length % 2 === 1);
      } else {
        setShouldCenter(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const projects = [
    {
      date: '23.07.2025',
      title: 'ОТКРЫТИЕ ПЛАНЕТАРИЯ',
      description: 'Создание современного планетария для популяризации астрономии и космической науки среди молодежи.',
      image: image77
    },
    {
      date: '15.08.2025',
      title: 'ЗАПУСК НОВОГО СПУТНИКА',
      description: 'Разработка и запуск образовательного спутника для проведения научных экспериментов в космосе.',
      image: image76
    },
    {
      date: '10.09.2025',
      title: 'ЛЕКЦИЯ КОСМОНАВТА',
      description: 'Организация встречи с действующим космонавтом для студентов и школьников.',
      image: image75
    }
  ];

  return (
    <ProjectsSection id="projects" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          ПРОЕКТЫ
        </SectionTitle>

        <ProjectsGrid className={shouldCenter ? 'center-single' : ''}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="card-header">
                <span className="date">{project.date}</span>
                <a href="/projects" className="details-link">ПОДРОБНЕЕ</a>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
            </ProjectCard>
          ))}
        </ProjectsGrid>

        <AllProjectsButton
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ВСЕ ПРОЕКТЫ
        </AllProjectsButton>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
