import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import MainLogo from '../MainLogo.svg';

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

const Brand = styled.div`
  display: flex; align-items: center; gap: clamp(8px, 1vw, 12px);
  flex: 0 0 auto;
  img { height: clamp(34px, 5.2vw, 64px); width: auto; display: block; }
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

const NavButton = styled(motion.a)`
  flex: 0 1 auto;
  text-align: center;
  background: transparent;
  color: #5b5b5b;
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

const NavLink = styled(Link)`
  flex: 0 1 auto;
  text-align: center;
  background: transparent;
  color: #5b5b5b;
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
  background: linear-gradient(180deg, #1aa0ff 0%, #1161b7 100%);
  color: #fff; font-weight: 700; text-decoration: none; font-size: clamp(12px, 1.05vw, 16px);
  box-shadow: 0 6px 14px rgba(0, 136, 255, 0.45);
  white-space: nowrap;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none; border: none; color: #fff; font-size: 1.6rem; cursor: pointer;
  @media (max-width: 900px){ display: block; }
`;

const MobileRow = styled.div`
  display: none; align-items: center; justify-content: space-between; gap: 0.5rem;
  width: 100%;
  @media (max-width: 900px){ display: flex; }
`;

const DesktopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 900px){ display: none; }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  z-index: 3000;
  backdrop-filter: blur(10px);
  display: none;
  @media (max-width: 900px){ display: flex; }
  flex-direction: column; justify-content: flex-start; align-items: center; gap: 0.75rem;
  padding: calc(env(safe-area-inset-top, 0px) + 80px) 1rem 1rem; /* чтобы не обрезалось под фикс‑хедером */
`;

const MobileList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding: 20px;
  padding-top: 0;
  align-items: center;
`;

const MobileLink = styled(motion.a)`
  display: block;
  width: 60%;
  text-align: center;
  padding: clamp(8px, 2vw, 16px) clamp(12px, 3vw, 24px);
  border-radius: 9999px;
  background: #1c1f27;
  color: #dbe7ff;
  text-decoration: none;
  font-family: 'Raleway', sans-serif;
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  border: 1px solid rgba(255,255,255,0.1);
  margin: 0 auto;
`;

const MobileNavLink = styled(Link)`
  display: block;
  width: 60%;
  text-align: center;
  padding: clamp(8px, 2vw, 16px) clamp(12px, 3vw, 24px);
  border-radius: 9999px;
  background: #1c1f27;
  color: #dbe7ff;
  text-decoration: none;
  font-family: 'Raleway', sans-serif;
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  border: 1px solid rgba(255,255,255,0.1);
  margin: 0 auto;
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const closeMobileMenu = () => {
    setOpen(false);
  };

  const isHomePage = location.pathname === '/';
  const isNewsPage = location.pathname === '/news';
  const isContactPage = location.pathname === '/contact';
  const isEventsPage = location.pathname === '/events';

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
      <PrimaryButton onClick={() => alert("Спасибо за поддержку!")}>
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
          <Brand>
            <img src={MainLogo} alt="Логотип" />
          </Brand>
          {Items}
        </DesktopRow>

        <MobileRow>
          <Brand>
            <img src={MainLogo} alt="Логотип" />
          </Brand>
          <MobileMenuButton onClick={() => setOpen(!open)}>☰</MobileMenuButton>
        </MobileRow>
      </HeaderContent>

      <AnimatePresence>
        {open && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
          >
            <MobileList onClick={(e) => e.stopPropagation()}>
              {isHomePage ? (
                <>
                  <MobileLink onClick={() => scrollTo("about")}>
                    О ФОНДЕ
                  </MobileLink>
                  <MobileNavLink to="/events" onClick={closeMobileMenu}>СОБЫТИЯ</MobileNavLink>
                  <MobileNavLink to="/news" onClick={closeMobileMenu}>НОВОСТИ</MobileNavLink>
                  <MobileNavLink to="/contact" onClick={closeMobileMenu}>КОНТАКТЫ</MobileNavLink>
                </>
              ) : isNewsPage ? (
                <>
                  <MobileNavLink to="/" onClick={closeMobileMenu}>ГЛАВНАЯ</MobileNavLink>
                  <MobileNavLink to="/fond" onClick={closeMobileMenu}>О ФОНДЕ</MobileNavLink>
                  <MobileNavLink to="/events" onClick={closeMobileMenu}>СОБЫТИЯ</MobileNavLink>
                  <MobileNavLink to="/contact" onClick={closeMobileMenu}>КОНТАКТЫ</MobileNavLink>
                </>
              ) : isContactPage ? (
                <>
                  <MobileNavLink to="/" onClick={closeMobileMenu}>ГЛАВНАЯ</MobileNavLink>
                  <MobileNavLink to="/fond" onClick={closeMobileMenu}>О ФОНДЕ</MobileNavLink>
                  <MobileNavLink to="/events" onClick={closeMobileMenu}>СОБЫТИЯ</MobileNavLink>
                  <MobileNavLink to="/news" onClick={closeMobileMenu}>НОВОСТИ</MobileNavLink>
                </>
              ) : isEventsPage ? (
                <>
                  <MobileNavLink to="/" onClick={closeMobileMenu}>ГЛАВНАЯ</MobileNavLink>
                  <MobileNavLink to="/fond" onClick={closeMobileMenu}>О ФОНДЕ</MobileNavLink>
                  <MobileNavLink to="/news" onClick={closeMobileMenu}>НОВОСТИ</MobileNavLink>
                  <MobileNavLink to="/contact" onClick={closeMobileMenu}>КОНТАКТЫ</MobileNavLink>
                </>
              ) : (
                <>
                  <MobileNavLink to="/" onClick={closeMobileMenu}>ГЛАВНАЯ</MobileNavLink>
                  <MobileNavLink to="/fond" onClick={closeMobileMenu}>О ФОНДЕ</MobileNavLink>
                  <MobileNavLink to="/events" onClick={closeMobileMenu}>СОБЫТИЯ</MobileNavLink>
                  <MobileNavLink to="/news" onClick={closeMobileMenu}>НОВОСТИ</MobileNavLink>
                  <MobileNavLink to="/contact" onClick={closeMobileMenu}>КОНТАКТЫ</MobileNavLink>
                </>
              )}
              <PrimaryButton onClick={() => {
                alert("Спасибо за поддержку!");
                closeMobileMenu();
              }}>
                ПОДДЕРЖАТЬ
              </PrimaryButton>
            </MobileList>
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
