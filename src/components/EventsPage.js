import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import mainImage from '../images/EventsPage/events_main.png';
import lecturerImage from '../images/EventsPage/lecturer_for_wide_room.png';
import scienceWorkshopsImage from '../images/EventsPage/science_workshops.png';
import dateIcon from '../images/EventsPage/date.svg';
import placeIcon from '../images/EventsPage/place.svg';

// Импорт шрифтов
import ProximaRegular from '../Proxima Nova/proximanova_regular.ttf';
import ProximaBold from '../Proxima Nova/proximanova_bold.otf';
import ProximaExtraBold from '../Proxima Nova/proximanova_extrabold.otf';
import RalewayRegular from '../Raleway/Raleway-v4020-Regular.otf';
import RalewaySemiBold from '../Raleway/Raleway-v4020-SemiBold.otf';
import RalewayBold from '../Raleway/Raleway-v4020-Bold.otf';
import FuturaPT from '../FuturaPT/FuturaPTBook.otf';

const PageContainer = styled.div`
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
  @font-face {
    font-family: 'Futura PT';
    src: url(${FuturaPT}) format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
`;

// Главная секция с фото
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

const HeroTitle = styled.h1`
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

// Основной контент
const ContentSection = styled.div`
  background: radial-gradient(ellipse at top left, rgba(221, 160, 221, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at bottom right, rgba(173, 216, 230, 0.2) 0%, transparent 50%),
              linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
  padding: 5rem 0;
  min-height: 100vh;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
        background: radial-gradient(ellipse at top left, rgba(221, 160, 221, 0.4) 0%, transparent 60%),
                radial-gradient(ellipse at bottom right, rgba(173, 216, 230, 0.3) 0%, transparent 60%);
      pointer-events: none;
      z-index: -1;
  }

  @media (max-width: 768px) {
    background: radial-gradient(ellipse at top left, rgba(221, 160, 221, 0.25) 0%, transparent 40%),
                radial-gradient(ellipse at bottom right, rgba(173, 216, 230, 0.15) 0%, transparent 40%),
                linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);

    &::before {
      background: radial-gradient(ellipse at top left, rgba(221, 160, 221, 0.3) 0%, transparent 50%),
                  radial-gradient(ellipse at bottom right, rgba(173, 216, 230, 0.2) 0%, transparent 50%);
    }
  }

  @media (max-width: 480px) {
    background: radial-gradient(ellipse at top left, rgba(221, 160, 221, 0.2) 0%, transparent 35%),
                radial-gradient(ellipse at bottom right, rgba(173, 216, 230, 0.1) 0%, transparent 35%),
                linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);

    &::before {
      background: radial-gradient(ellipse at top left, rgba(221, 160, 221, 0.25) 0%, transparent 45%),
                  radial-gradient(ellipse at bottom right, rgba(173, 216, 230, 0.15) 0%, transparent 45%);
    }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

// Левая панель с фильтрами
const FilterSidebar = styled.div`
  background: radial-gradient(ellipse at center, #ffffff 0%, #d8d8d8 100%);
  border: none;
  border-radius: 60px;
  padding: 2rem;
  height: fit-content;
  position: relative;

  /* Градиентная рамка с помощью псевдоэлемента */
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(90deg, #ffffff, #999999, #ffffff);
    border-radius: 60px;
    z-index: -1;
  }

  @media (max-width: 768px) {
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 40px;
  }

  @media (max-width: 400px) {
    width: 95%;
    max-width: 350px;
    padding: 1rem;
    border-radius: 30px;
  }
`;

const ApplyButton = styled.button`
  background: linear-gradient(83.48deg, #312684 0%, #019CE5 100%);
  background-clip: padding-box;
  color: white;
  border: none;
  padding: 0.7rem 2rem;
  border-radius: 60px;
  font-family: 'Futura PT', sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  cursor: pointer;
  width: 100%;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  position: relative;

  /* Градиентная рамка с помощью псевдоэлемента */
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(276.52deg, #312684 0%, #019CE5 100%);
    border-radius: 60px;
    z-index: 2;
  }

  &::before {
    content: 'ПРИМЕНИТЬ';
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: linear-gradient(83.48deg, #312684 0%, #019CE5 100%);
    border-radius: 60px;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: 'Futura PT', sans-serif;
    font-size: 1.5rem;
    font-weight: 400;
  }



  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(49, 38, 132, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1.5rem;
    font-size: 1.3rem;
    border-radius: 40px;
  }

  @media (max-width: 400px) {
    padding: 0.4rem 1.2rem;
    font-size: 1.1rem;
    border-radius: 30px;
  }
`;

const FilterCategory = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 15;

  @media (max-width: 768px) {
    margin-bottom: 1.2rem;
  }

  @media (max-width: 400px) {
    margin-bottom: 1rem;
  }
`;

const FilterButton = styled.button`
  background: #000000;
  color: white;
  border: none;
  padding: 0.0rem 1.0rem;
  border-radius: 25px;
  font-family: 'Futura PT', sans-serif;
  font-size: 1.6rem;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  text-align: left;
  position: relative;
  transition: all 0.3s ease;
  z-index: 15;

  &:hover {
    background: #333333;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
    padding: 0.3rem 0.8rem;
    font-size: 1.4rem;
    border-radius: 20px;
  }

  @media (max-width: 400px) {
    max-width: 300px;
    padding: 0.2rem 0.7rem;
    font-size: 1.2rem;
    border-radius: 18px;
  }
`;

const FilterCount = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.7rem;
  color: white;
  font-weight: bold;
  z-index: 20;
  font-family: 'Futura PT', sans-serif;

  @media (max-width: 768px) {
    font-size: 0.6rem;
    right: 0.8rem;
  }

  @media (max-width: 400px) {
    font-size: 0.5rem;
    right: 0.6rem;
  }
`;

const SubFilters = styled.div`
  margin-top: -1rem;
  margin-left: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
  align-items: center;
  border: 2px solid;
  border-image: linear-gradient(45deg, #ffffff, #999999, #ffffff) 1;
  border-radius: 0px;
  padding: 0.5rem;
  padding-top: 2rem;

  @media (max-width: 768px) {
    gap: 0.4rem;
    padding: 0.4rem;
    padding-top: 1.5rem;
  }

  @media (max-width: 400px) {
    gap: 0.3rem;
    padding: 0.3rem;
    padding-top: 1.2rem;
  }
`;

const SubFilterButton = styled.button`
  background: ${props => props.selected ? 'linear-gradient(89.28deg, #019CE5 0%, #312684 100%)' : '#f8f9fa'};

  color: ${props => props.selected ? 'white' : '#6c757d'};
  border: none;
  padding: 0.2rem 0.9rem;
  border-radius: 20px;
  font-family: 'Futura PT', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;
  z-index: 15;
  position: relative;
  overflow: hidden;

  /* Эффектный блок для активного состояния */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.selected ? 'linear-gradient(89.28deg, #019CE5 0%, #312684 100%)' : 'transparent'};
    opacity: ${props => props.selected ? '1' : '0'};
    transition: all 0.3s ease;
    z-index: -1;
  }

  /* Эффектный блок для неактивного состояния */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f8f9fa;
    opacity: ${props => props.selected ? '0' : '1'};
    transition: all 0.3s ease;
    z-index: -2;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.selected ? '0 4px 15px rgba(195, 195, 247, 0.4)' : '0 4px 15px rgba(0, 0, 0, 0.1)'};
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    padding: 0.15rem 0.7rem;
    font-size: 0.78rem;
    border-radius: 18px;
  }

  @media (max-width: 400px) {
    max-width: 280px;
    padding: 0.1rem 0.6rem;
    font-size: 0.75rem;
    border-radius: 15px;
  }
`;

// Правая панель с карточками событий
const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const EventCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s ease;
  min-height: 280px;
  display: flex;
  flex-direction: column;

    &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.hoverImage ? `url(${props.hoverImage}) center center` : 'transparent'};
    background-size: cover;
    opacity: 0.8;
    transition: all 0.4s ease;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    transition: all 0.4s ease;
    z-index: 2;
  }

    &:hover {
    background: rgba(255, 255, 255, 0.95);
    border-color: rgba(0, 0, 0, 0.1);

    &::before {
      opacity: 1;
    }

    &::after {
      opacity: 0;
    }




  }
`;

const EventContent = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const EventTitle = styled.h3`
  font-family: 'Raleway', sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
  transition: color 0.4s ease;
`;

const EventLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: white;
  transition: color 0.4s ease;

  img {
    width: 16px;
    height: 16px;
    filter: brightness(0) invert(1);
  }

  span {
    font-family: 'Proxima Nova', sans-serif;
    font-size: 0.9rem;
  }
`;

const EventDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: white;
  transition: color 0.4s ease;

  img {
    width: 16px;
    height: 16px;
    filter: brightness(0) invert(1);
  }

  span {
    font-family: 'Proxima Nova', sans-serif;
    font-size: 0.9rem;
  }
`;



const EventDescriptionHover = styled.div`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.9rem;
  line-height: 1.5;
  color: white;
  margin-top: auto;
  margin-bottom: 1rem;
  opacity: 1;
  transition: all 0.4s ease;
  z-index: 4;
`;

const DetailsButton = styled.button`
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.6);
  padding: 0.5rem 0.8rem;
  border-radius: 15px;
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.3s ease;
  width: fit-content;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
    border-color: rgba(255, 255, 255, 0.8);
  }
`;

const EventsPage = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        theme: ['science', 'education', 'technology'],
        foundation: ['coordination', 'technical'],
        scale: ['local', 'regional', 'national'],
        stage: ['planning', 'development', 'implementation'],
        audience: ['students', 'professionals', 'general']
    });

    // Состояние для активных (примененных) фильтров
    const [activeFilters, setActiveFilters] = useState({
        theme: ['science', 'education', 'technology'],
        foundation: ['coordination', 'technical'],
        scale: ['local', 'regional', 'national'],
        stage: ['planning', 'development', 'implementation'],
        audience: ['students', 'professionals', 'general']
    });

    const [expandedFilters, setExpandedFilters] = useState({
        theme: false,
        foundation: true,
        scale: false,
        stage: false,
        audience: false
    });

    const toggleFilter = (filterName) => {
        setExpandedFilters(prev => ({
            ...prev,
            [filterName]: !prev[filterName]
        }));
    };

    const toggleSubFilter = (category, filterValue) => {
        setSelectedFilters(prev => {
            const current = prev[category] || [];
            if (current.includes(filterValue)) {
                return {
                    ...prev,
                    [category]: current.filter(item => item !== filterValue)
                };
            } else {
                return {
                    ...prev,
                    [category]: [...current, filterValue]
                };
            }
        });
    };

    // Функция применения фильтров
    const applyFilters = () => {
        setActiveFilters(selectedFilters);
    };

    // Проверяем, есть ли несохраненные изменения в фильтрах
    const hasUnsavedChanges = JSON.stringify(selectedFilters) !== JSON.stringify(activeFilters);

    const events = [
        {
            id: 1,
            title: 'ЛЕКТОРИЙ ДЛЯ ШИРОКОЙ АУДИТОРИИ',
            location: 'Королев, Московская область',
            date: '12 апреля',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt convallis velit.',
            hoverImage: lecturerImage,
            theme: 'education',
            foundation: 'technical',
            scale: 'local',
            stage: 'implementation',
            audience: 'general'
        },
        {
            id: 2,
            title: 'НАУЧНЫЕ ВОРКШОПЫ',
            location: 'Королев, Московская область',
            date: '15 апреля',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt convallis velit.',
            hoverImage: scienceWorkshopsImage,
            theme: 'science',
            foundation: 'technical',
            scale: 'regional',
            stage: 'development',
            audience: 'students'
        },
        {
            id: 3,
            title: 'ОБРАЗОВАТЕЛЬНЫЕ КУРСЫ',
            location: 'Королев, Московская область',
            date: '18 апреля',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt convallis velit.',
            hoverImage: lecturerImage,
            theme: 'education',
            foundation: 'technical',
            scale: 'national',
            stage: 'planning',
            audience: 'students'
        },
        {
            id: 4,
            title: 'СТУДЕНЧЕСКИЕ ЛАБОРАТОРИИ',
            location: 'Королев, Московская область',
            date: '20 апреля',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt convallis velit.',
            hoverImage: scienceWorkshopsImage,
            theme: 'science',
            foundation: 'coordination',
            scale: 'local',
            stage: 'implementation',
            audience: 'students'
        },
        {
            id: 5,
            title: 'КАРЬЕРА В НАУКЕ',
            location: 'Королев, Московская область',
            date: '22 апреля',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt convallis velit.',
            hoverImage: lecturerImage,
            theme: 'science',
            foundation: 'coordination',
            scale: 'regional',
            stage: 'development',
            audience: 'professionals'
        },
        {
            id: 6,
            title: 'ОТКРЫТЫЕ ЛЕКЦИИ',
            location: 'Королев, Московская область',
            date: '25 апреля',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt convallis velit.',
            hoverImage: lecturerImage,
            theme: 'education',
            foundation: 'technical',
            scale: 'national',
            stage: 'planning',
            audience: 'general'
        }
    ];

    const getFilterCount = (category) => {
        return selectedFilters[category]?.length || 0;
    };

    const getActiveFilterCount = (category) => {
        return activeFilters[category]?.length || 0;
    };

    const getFilterSymbol = (count) => {
        if (count === 0) return '';
        if (count === 1) return '★';
        if (count === 2) return '★★';
        if (count === 3) return '★★★';
        return '★★★★';
    };

    // Функция фильтрации событий
    const filteredEvents = events.filter(event => {
        // Проверяем каждый тип фильтра по активным (примененным) фильтрам
        const themeMatch = activeFilters.theme.length === 0 || activeFilters.theme.includes(event.theme);
        const foundationMatch = activeFilters.foundation.length === 0 || activeFilters.foundation.includes(event.foundation);
        const scaleMatch = activeFilters.scale.length === 0 || activeFilters.scale.includes(event.scale);
        const stageMatch = activeFilters.stage.length === 0 || activeFilters.stage.includes(event.stage);
        const audienceMatch = activeFilters.audience.length === 0 || activeFilters.audience.includes(event.audience);

        // Событие должно соответствовать ВСЕМ выбранным фильтрам
        return themeMatch && foundationMatch && scaleMatch && stageMatch && audienceMatch;
    });

    return (
        <PageContainer>
            <HeroSection>
                <BannerImage src={mainImage} alt="События" />
                <Overlay>
                    <HeroTitle>СОБЫТИЯ</HeroTitle>
                </Overlay>
            </HeroSection>

            <ContentSection>
                <Container>
                    <ContentGrid>
                        <FilterSidebar>
                            <ApplyButton
                                onClick={applyFilters}
                                style={{
                                    background: hasUnsavedChanges
                                        ? 'linear-gradient(83.48deg, #ff6b6b 0%, #ee5a24 100%)'
                                        : 'linear-gradient(83.48deg, #312684 0%, #019CE5 100%)'
                                }}
                            >
                                {hasUnsavedChanges ? 'ПРИМЕНИТЬ*' : 'ПРИМЕНИТЬ'}
                            </ApplyButton>

                            <FilterCategory>
                                <FilterButton onClick={() => toggleFilter('theme')}>
                                    Тематика
                                    <FilterCount>{getFilterSymbol(getFilterCount('theme'))}</FilterCount>
                                </FilterButton>
                                {expandedFilters.theme && (
                                    <SubFilters>
                                        <SubFilterButton
                                            selected={selectedFilters.theme.includes('science')}
                                            onClick={() => toggleSubFilter('theme', 'science')}
                                        >
                                            Наука
                                        </SubFilterButton>
                                        <SubFilterButton
                                            selected={selectedFilters.theme.includes('education')}
                                            onClick={() => toggleSubFilter('theme', 'education')}
                                        >
                                            Образование
                                        </SubFilterButton>
                                        <SubFilterButton
                                            selected={selectedFilters.theme.includes('technology')}
                                            onClick={() => toggleSubFilter('theme', 'technology')}
                                        >
                                            Технологии
                                        </SubFilterButton>
                                    </SubFilters>
                                )}
                            </FilterCategory>

                            <FilterCategory>
                                <FilterButton onClick={() => toggleFilter('foundation')}>
                                    Участие Фонда
                                    <FilterCount>{getFilterSymbol(getFilterCount('foundation'))}</FilterCount>
                                </FilterButton>
                                {expandedFilters.foundation && (
                                    <SubFilters>
                                        <SubFilterButton
                                            selected={selectedFilters.foundation.includes('coordination')}
                                            onClick={() => toggleSubFilter('foundation', 'coordination')}
                                        >
                                            Координация / партнерство
                                        </SubFilterButton>
                                        <SubFilterButton
                                            selected={selectedFilters.foundation.includes('technical')}
                                            onClick={() => toggleSubFilter('foundation', 'technical')}
                                        >
                                            Научно-техническое сопровождение
                                        </SubFilterButton>
                                    </SubFilters>
                                )}
                            </FilterCategory>

                            <FilterCategory>
                                <FilterButton onClick={() => toggleFilter('scale')}>
                                    Масштаб
                                    <FilterCount>{getFilterSymbol(getFilterCount('scale'))}</FilterCount>
                                </FilterButton>
                                {expandedFilters.scale && (
                                    <SubFilters>
                                        <SubFilterButton
                                            selected={selectedFilters.scale.includes('local')}
                                            onClick={() => toggleSubFilter('scale', 'local')}
                                        >
                                            Локальный
                                        </SubFilterButton>
                                        <SubFilterButton
                                            selected={selectedFilters.scale.includes('regional')}
                                            onClick={() => toggleSubFilter('scale', 'regional')}
                                        >
                                            Региональный
                                        </SubFilterButton>
                                        <SubFilterButton
                                            selected={selectedFilters.scale.includes('national')}
                                            onClick={() => toggleSubFilter('scale', 'national')}
                                        >
                                            Национальный
                                        </SubFilterButton>
                                    </SubFilters>
                                )}
                            </FilterCategory>

                            <FilterCategory>
                                <FilterButton onClick={() => toggleFilter('stage')}>
                                    Стадия проекта
                                    <FilterCount>{getFilterSymbol(getFilterCount('stage'))}</FilterCount>
                                </FilterButton>
                                {expandedFilters.stage && (
                                    <SubFilters>
                                        <SubFilterButton
                                            selected={selectedFilters.stage.includes('planning')}
                                            onClick={() => toggleSubFilter('stage', 'planning')}
                                        >
                                            Планирование
                                        </SubFilterButton>
                                        <SubFilterButton
                                            selected={selectedFilters.stage.includes('development')}
                                            onClick={() => toggleSubFilter('stage', 'development')}
                                        >
                                            Разработка
                                        </SubFilterButton>
                                        <SubFilterButton
                                            selected={selectedFilters.stage.includes('implementation')}
                                            onClick={() => toggleSubFilter('stage', 'implementation')}
                                        >
                                            Реализация
                                        </SubFilterButton>
                                    </SubFilters>
                                )}
                            </FilterCategory>

                            <FilterCategory>
                                <FilterButton onClick={() => toggleFilter('audience')}>
                                    Аудитория
                                    <FilterCount>{getFilterSymbol(getFilterCount('audience'))}</FilterCount>
                                </FilterButton>
                                {expandedFilters.audience && (
                                    <SubFilters>
                                        <SubFilterButton
                                            selected={selectedFilters.audience.includes('students')}
                                            onClick={() => toggleSubFilter('audience', 'students')}
                                        >
                                            Студенты
                                        </SubFilterButton>
                                        <SubFilterButton
                                            selected={selectedFilters.audience.includes('professionals')}
                                            onClick={() => toggleSubFilter('audience', 'professionals')}
                                        >
                                            Профессионалы
                                        </SubFilterButton>
                                        <SubFilterButton
                                            selected={selectedFilters.audience.includes('general')}
                                            onClick={() => toggleSubFilter('audience', 'general')}
                                        >
                                            Широкая аудитория
                                        </SubFilterButton>
                                    </SubFilters>
                                )}
                            </FilterCategory>
                        </FilterSidebar>

                        <EventsGrid>
                            {filteredEvents.length > 0 ? (
                                filteredEvents.map((event) => (
                                    <EventCard
                                        key={event.id}
                                        hoverImage={event.hoverImage}
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <EventContent>
                                            <EventTitle>{event.title}</EventTitle>
                                            <EventLocation>
                                                <img src={placeIcon} alt="Место" />
                                                <span>{event.location}</span>
                                            </EventLocation>
                                            <EventDate>
                                                <img src={dateIcon} alt="Дата" />
                                                <span>{event.date}</span>
                                            </EventDate>
                                            <EventDescriptionHover>
                                                {event.description}
                                            </EventDescriptionHover>
                                            <DetailsButton>
                                                <span>&gt; ПОДРОБНЕЕ</span>
                                            </DetailsButton>
                                        </EventContent>
                                    </EventCard>
                                ))
                            ) : (
                                <div style={{
                                    gridColumn: '1 / -1',
                                    textAlign: 'center',
                                    padding: '2rem',
                                    fontSize: '1.2rem',
                                    color: '#666'
                                }}>
                                    По выбранным фильтрам событий не найдено
                                </div>
                            )}
                        </EventsGrid>
                    </ContentGrid>
                </Container>
            </ContentSection>
        </PageContainer>
    );
};

export default EventsPage;
