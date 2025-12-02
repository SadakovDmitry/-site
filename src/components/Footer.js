import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MobileLogo from '../images/main/logo_mobile.svg';

const FooterContainer = styled.footer`
  background: #0b0d13;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 56px 0 24px;
`;

const FooterTopRow = styled.div`
  width: min(1600px, 94vw);
  margin: 0 auto 22px;
  padding: 0 8px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 14px;
    align-items: center;
  }
`;

const FooterContent = styled.div`
  width: min(1600px, 94vw);
  margin: 0 auto;
  padding: 0 8px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: clamp(16px, 2vw, 28px);
  margin-bottom: 26px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-family:'Raleway', sans-serif;
    font-size: clamp(1rem, 2.1vw, 1.35rem);
    font-weight: 400;
    color: #ffffff;
    margin-bottom: 10px;

    @media (max-width: 600px) {
      font-size: 1.15rem;
    }
  }
  }
  p, a {
    color: #c9d6e5;
    text-decoration:none;
    line-height:1.7;
    font-size: 1.15rem;
    font-family: 'Proxima Nova', 'Raleway', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif;
  }
  a:hover { color: #019CE5; }
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: clamp(8px, 1vw, 12px);
  margin: 0;

  img {
    height: clamp(56px, 5vw, 56px);
    width: auto;
    display: block;
    @media (max-width: 400px) {
      height: clamp(44px, 5vw, 44px);
    }
  }
`;

const BrandText = styled.div`
  color: #ffffff;
  font-family: 'Raleway', sans-serif;
  font-size: clamp(14px, 1.8vw, 28px);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1.3;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: clamp(16px, 4.4vw, 24px);
  }
`;

const FooterNav = styled.nav`
  display: flex;
  align-items: center;
  gap: clamp(14px, 2.8vw, 36px);

  a {
    color: #ffffff;
    text-decoration: none;
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: clamp(14px, 1.4vw, 20px);
    transition: color 0.2s ease;
  }

  a:hover { color: #019CE5; }

  @media (min-width: 700px) and (max-width: 800px) {
    display: grid;
    grid-template-columns: repeat(2, auto);
    justify-content: center;
    align-items: center;
    gap: 14px 106px;
  }

  @media (min-width: 600px) and (max-width: 700px) {
    display: grid;
    grid-template-columns: repeat(2, auto);
    justify-content: center;
    align-items: center;
    gap: 14px 86px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    a {
      font-size: clamp(16px, 5vw, 24px);
    }
  }
`;

const BottomBar = styled.div`
  width: min(1600px, 94vw); margin: 0 auto; padding-top: 12px;
  border-top: 1px solid rgba(255,255,255,0.08);
  display:flex; align-items:center; justify-content: space-between; color:#7f8fa6; font-size:0.9rem;
  @media (max-width: 600px){ flex-direction: column; gap: 10px; text-align:center; }
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: #7f8fa6;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #c9d6e5;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterTopRow>
        <Brand to="/">
          <img src={MobileLogo} alt="Логотип" />
          <BrandText>
            ФОНД СОДЕЙСТВИЯ<br />РАЗВИТИЮ КОСМОНАВТИКИ
          </BrandText>
        </Brand>
        <FooterNav>
          <Link to="/fond">/ О ФОНДЕ</Link>
          {/* <Link to="/events">/ СОБЫТИЯ</Link> */}
          <Link to="/news">/ НОВОСТИ</Link>
          <Link to="/contact">/ КОНТАКТЫ</Link>
        </FooterNav>
      </FooterTopRow>
      <FooterContent>
        <FooterSection>
          <p>123112, Россия, г. Москва,<br />Пресненская наб., 12</p>
          <p>info@fondcosmos.ru</p>
          <p>+7 (495) 922 8994</p>
        </FooterSection>
      </FooterContent>

      <BottomBar>
        <div>© 2025 Фонд содействия развитию космонавтики</div>
        <LegalLinks>
          <Link to="/privacy" style={{ whiteSpace: 'nowrap' }}>Политика конфиденциальности</Link>
          <Link to="/terms" style={{ whiteSpace: 'nowrap' }}>Условия пользования</Link>
        </LegalLinks>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;
