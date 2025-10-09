import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import MainLogo from '../MainLogo.svg';
import MobileLogo from '../images/main/logo_mobile.svg';
import PartnerModal from './PartnerModal';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0px; left: 0; right: 0;
  z-index: 1000;
  background: transparent;
  transition: background 0.3s ease, backdrop-filter 0.3s ease;
`;

const HeaderContent = styled.div`
  width: 100%;
  padding-left: var(--page-x);
  padding-right: var(--page-x);
  padding-top: 1.2rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: clamp(8px, 1vw, 12px);
  flex: 0 0 auto;

  img {
    height: clamp(34px, 5.2vw, 84px);
    width: auto;
    display: block;

    @media (max-width: 900px) {
      height: clamp(30px, 6vw, 75px);
    }

    @media (max-width: 390px) {
      height: clamp(24px, 3vw, 40px);
    }
  }

  @media (max-width: 900px) {
    gap: clamp(4px, 0.5vw, 8px);
  }
`;

const BrandText = styled.div`
  color: #ffffff;
  font-family: 'Raleway', sans-serif;
  font-size: clamp(12px, 1.5vw, 60px);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  white-space: nowrap;
  margin-left: clamp(6px, 0.8vw, 12px);
  line-height: 1.3;

  @media (max-width: 900px) {
    font-size: clamp(8px, 1.6vw, 100px);
    margin-left: clamp(4px, 0.5vw, 8px);
  }

  @media (max-width: 480px) {
    font-size: clamp(7px, 0.9vw, 100px);
  }

  @media (max-width: 390px) {
    font-size: clamp(6px, 0.8vw, 80px);
  }
`;

const Capsule = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0px, 1vw, 102px);
  padding: clamp(0px, 1vw, 12px);
  border-radius: 9999px;
  background: linear-gradient(180deg, #f2f2f2, #dcdcdc);
  border: 1px solid rgba(0,0,0,0.15);
  box-shadow: 0 6px 18px rgba(0,0,0,.25) inset, 0 8px 24px rgba(0,0,0,.2);
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  flex: 0 0 auto;
  @media (max-width: 900px){ display: none; }
`;

const NavLink = styled(Link)`
  flex: 0 1 auto;
  text-align: center;
  background: transparent;
  color: #000000;
  border-radius: 9999px;
  padding: clamp(0px, 0.5vw, 12px) clamp(1px, 0.5vw, 18px);
  text-decoration: none;
  font-weight: 400;
  font-family: 'Raleway', sans-serif;
  letter-spacing: 0.02em;
  font-size: clamp(12px, 1.05vw, 16px);
  cursor: pointer;
  white-space: nowrap;
`;

const PrimaryButton = styled(motion.a)`
  text-align: center;
  padding: clamp(8px, .9vw, 12px) clamp(16px, 1.4vw, 22px); border-radius: 9999px; min-width: clamp(120px, 12vw, 180px);
  background: linear-gradient(83.48deg, #312684 0%, #019CE5 100%);
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  font-size: clamp(12px, 1.1vw, 16px);
  box-shadow: 0 6px 14px rgba(0, 136, 255, 0.45);
  white-space: nowrap;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.6rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 900px){
    display: block;
    font-size: 2rem;
  }
`;

const CurrentPageTitle = styled.div`
  display: none;
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-size: clamp(1rem, 2vw, 3.2rem);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.02em;

  @media (max-width: 900px){
    display: block;
  }
`;

const MobileDropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 9vw;
  // left: 4rem;
  // transform: translateX(-20%);
  background: linear-gradient(180deg, #f2f2f2, #dcdcdc);
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 30px;
  padding: clamp(8px, 1vw, 12px);
  min-width: clamp(140px, 16vw, 180px);
  z-index: 2000;
  box-shadow: 0 6px 18px rgba(0,0,0,.25) inset, 0 8px 24px rgba(0,0,0,.2);
  margin-top: 4px;

  @media (max-width: 480px){
    left: 2rem;
    padding: clamp(6px, 0.8vw, 10px);
    min-width: clamp(110px, 16vw, 150px);
    border-radius: 20px;
  }

  @media (max-width: 390px){
    left: 1.5rem;
    padding: clamp(4px, 0.6vw, 8px);
    min-width: clamp(90px, 14vw, 130px);
    border-radius: 15px;
  }
`;

const MobileDropdownLink = styled(Link)`
  display: block;
  padding: clamp(1px, 0.2vw, 12px) clamp(1px, 0.2vw, 16px);
  color: #000000;
  text-decoration: none;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  letter-spacing: 0.02em;
  font-size: clamp(14px, 1.5vw, 20px);
  border-radius: 6px;
  transition: background-color 0.3s ease;
  text-align: left;
  padding-left: 2vw;

  &:hover {
    background-color: rgba(0,0,0,0.05);
    color: #019CE5;
  }

  @media (max-width: 480px) {
    padding: clamp(1px, 0.2vw, 8px) clamp(1px, 0.3vw, 12px);
    font-size: clamp(12px, 1.2vw, 16px);
    border-radius: 4px;
    padding-left: 10px;
  }

  @media (max-width: 390px) {
    padding: clamp(1px, 0.1vw, 6px) clamp(1px, 0.2vw, 10px);
    font-size: clamp(9px, 1vw, 14px);
    border-radius: 3px;
    padding-left: 10px;
  }
`;

const MobileRow = styled.div`
  display: none;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  @media (max-width: 900px){ display: flex; }
`;

const MobileCapsule = styled.div`
  display: none;
  align-items: center;
  gap: clamp(0px, 2vw, 24px);
  // gap: 0px;
  padding: clamp(12px, 2vw, 16px);
  padding-top: clamp(8px, 1.5vw, 12px);
  padding-bottom: clamp(8px, 1.5vw, 12px);
  border-radius: 9999px;
  background: linear-gradient(180deg, #f2f2f2, #dcdcdc);
  border: 1px solid rgba(0,0,0,0.15);
  box-shadow: 0 6px 18px rgba(0,0,0,.25) inset, 0 8px 24px rgba(0,0,0,.2);
  max-width: 100%;
  min-width: 0;
  overflow: visible;
  flex: 0 0 auto;
  position: relative;
  @media (max-width: 900px){ display: flex; }

  @media (max-width: 480px) {
    gap: clamp(0px, 1.5vw, 16px);
    padding: clamp(10px, 1.5vw, 12px);
    padding-top: clamp(6px, 1.2vw, 10px);
    padding-bottom: clamp(6px, 1.2vw, 10px);
  }

  @media (max-width: 390px) {
    gap: clamp(0px, 1vw, 12px);
    padding: clamp(8px, 1.2vw, 10px);
    padding-top: clamp(5px, 1vw, 8px);
    padding-bottom: clamp(5px, 1vw, 8px);
  }
`;

const MobileNavButton = styled.button`
  background: none;
  border: none;
  color: #000000;
  font-size: 2.8rem;
  cursor: pointer;
  padding: clamp(10px, 1.5vw, 20px);
  padding-top: clamp(8px, 1.2vw, 16px);
  padding-bottom: clamp(8px, 1.2vw, 16px);
  border-radius: 50%;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
  margin-top: 1px;

  &::before,
  &::after,
  & > span {
    content: '';
    display: block;
    width: 24px;
    height: 2px;
    background-color: #000000;
    border-radius: 1px;
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: rgba(0,0,0,0.1);
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
    padding: clamp(8px, 1.2vw, 16px);
    padding-top: clamp(6px, 1vw, 12px);
    padding-bottom: clamp(6px, 1vw, 12px);
    margin-top: 1px;
    gap: 5px;

    &::before,
    &::after,
    & > span {
      width: 22px;
      height: 1.8px;
    }
  }

  @media (max-width: 390px) {
    font-size: 1.8rem;
    padding: clamp(6px, 1vw, 12px);
    padding-top: clamp(5px, 0.8vw, 10px);
    padding-bottom: clamp(5px, 0.8vw, 10px);
    margin-top: 0px;
    gap: 4px;

    &::before,
    &::after,
    & > span {
      width: 20px;
      height: 1.5px;
    }
  }
`;

const MobilePageTitle = styled.span`
  color: #000000;
  font-weight: 400;
  font-family: 'Raleway', sans-serif;
  letter-spacing: 0.02em;
  font-size: clamp(12px, 2.2vw, 23px);
  white-space: nowrap;
  flex: 1;
  text-align: center;
  margin-right: clamp(0px, 2vw, 24px);

  @media (max-width: 480px) {
    font-size: clamp(10px, 1vw, 14px);
    margin-right: clamp(0px, 1.5vw, 16px);
  }

  @media (max-width: 390px) {
    font-size: clamp(8px, 0.8vw, 12px);
    margin-right: clamp(0px, 1vw, 12px);
  }
`;

const MobilePrimaryButton = styled(motion.button)`
  text-align: center;
  padding: clamp(8px, 1vw, 14px) clamp(16px, 1.5vw, 24px);
  border-radius: 9999px;
  min-width: clamp(80px, 10vw, 120px);
  background: linear-gradient(83.48deg, #312684 0%, #019CE5 100%);
  color: #fff;
  font-weight: 700;
  font-size: clamp(10px, 2vw, 20px);
  box-shadow: 0 6px 14px rgba(0, 136, 255, 0.45);
  white-space: nowrap;
  border: none;
  cursor: pointer;

  @media (max-width: 480px) {
    padding: clamp(6px, 0.8vw, 10px) clamp(12px, 1.2vw, 16px);
    min-width: clamp(60px, 8vw, 90px);
    font-size: clamp(8px, 2vw, 14px);
  }

  @media (max-width: 390px) {
    padding: clamp(4px, 0.6vw, 8px) clamp(8px, 1vw, 12px);
    min-width: clamp(50px, 6vw, 70px);
    font-size: clamp(6px, 0.6vw, 8px);
  }
`;

const DesktopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 900px){ display: none; }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const closeMobileMenu = () => {
    setOpen(false);
  };

  // Определяем текущую страницу
  const isHomePage = location.pathname === '/';
  const isNewsPage = location.pathname === '/news';
  const isContactPage = location.pathname === '/contact';
  const isEventsPage = location.pathname === '/events';

  const getCurrentPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return '/ ГЛАВНАЯ';
      case '/fond':
        return '/ О ФОНДЕ';
      case '/events':
        return '/ СОБЫТИЯ';
      case '/news':
        return '/ НОВОСТИ';
      case '/contact':
        return '/ КОНТАКТЫ';
      // case '/projects':
      //   return '/ ПРОЕКТЫ';
      default:
        return '/ ГЛАВНАЯ';
    }
  };

  const getMobileMenuLinks = () => {
    const allLinks = [
      { to: '/', title: '/ ГЛАВНАЯ' },
      { to: '/fond', title: '/ О ФОНДЕ' },
      { to: '/events', title: '/ СОБЫТИЯ' },
      { to: '/news', title: '/ НОВОСТИ' },
      { to: '/contact', title: '/ КОНТАКТЫ' },
      // { to: '/projects', title: '/ ПРОЕКТЫ' }
    ];

    // Исключаем текущую страницу
    return allLinks.filter(link => link.to !== location.pathname);
  };

  const Items = (
    <Capsule>
      {isHomePage ? (
        <>
          <NavLink to="/fond">/ О ФОНДЕ</NavLink>
          <NavLink to="/events">/ СОБЫТИЯ</NavLink>
          <NavLink to="/news">/ НОВОСТИ</NavLink>
          <NavLink to="/contact">/ КОНТАКТЫ</NavLink>
        </>
      ) : isNewsPage ? (
        <>
          <NavLink to="/">/ ГЛАВНАЯ</NavLink>
          <NavLink to="/fond">/ О ФОНДЕ</NavLink>
          <NavLink to="/events">/ СОБЫТИЯ</NavLink>
          <NavLink to="/contact">/ КОНТАКТЫ</NavLink>
        </>
      ) : isContactPage ? (
        <>
          <NavLink to="/">/ ГЛАВНАЯ</NavLink>
          <NavLink to="/fond">/ О ФОНДЕ</NavLink>
          <NavLink to="/events">/ СОБЫТИЯ</NavLink>
          <NavLink to="/news">/ НОВОСТИ</NavLink>
        </>
      ) : isEventsPage ? (
        <>
          <NavLink to="/">/ ГЛАВНАЯ</NavLink>
          <NavLink to="/fond">/ О ФОНДЕ</NavLink>
          <NavLink to="/news">/ НОВОСТИ</NavLink>
          <NavLink to="/contact">/ КОНТАКТЫ</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/">/ ГЛАВНАЯ</NavLink>
          <NavLink to="/fond">/ О ФОНДЕ</NavLink>
          <NavLink to="/events">/ СОБЫТИЯ</NavLink>
          <NavLink to="/news">/ НОВОСТИ</NavLink>
          <NavLink to="/contact">/ КОНТАКТЫ</NavLink>
        </>
      )}
      <PrimaryButton onClick={() => setIsPartnerModalOpen(true)}>
        ПОДДЕРЖАТЬ
      </PrimaryButton>
    </Capsule>
  );

  return (
    <HeaderContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: isScrolled ? "rgba(0,0,0,0.8)" : "transparent",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
      }}
    >
      <HeaderContent>
        <DesktopRow>
          <Brand to="/">
            <img src={MobileLogo} alt="Логотип" />
            <BrandText>
              ФОНД<br />
              СОДЕЙСТВИЯ РАЗВИТИЮ<br />
              КОСМОНАВТИКИ
            </BrandText>
          </Brand>
          {Items}
        </DesktopRow>

        <MobileRow>
          <Brand to="/">
            <img src={MobileLogo} alt="Логотип" />
            <BrandText>
              ФОНД<br />
              СОДЕЙСТВИЯ РАЗВИТИЮ<br />
              КОСМОНАВТИКИ
            </BrandText>
          </Brand>
          <MobileCapsule>
            <MobileNavButton onClick={() => setOpen(!open)}>
              <span></span>
            </MobileNavButton>
            <MobilePageTitle>{getCurrentPageTitle()}</MobilePageTitle>
            <MobilePrimaryButton onClick={() => setIsPartnerModalOpen(true)}>
              ПОДДЕРЖАТЬ
            </MobilePrimaryButton>
            <AnimatePresence>
              {open && (
                <MobileDropdownMenu
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {getMobileMenuLinks().map((link) => (
                    <MobileDropdownLink
                      key={link.to}
                      to={link.to}
                      onClick={closeMobileMenu}
                    >
                      {link.title}
                    </MobileDropdownLink>
                  ))}
                </MobileDropdownMenu>
              )}
            </AnimatePresence>
          </MobileCapsule>
        </MobileRow>
      </HeaderContent>

      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />
    </HeaderContainer>
  );
};

export default Header;
