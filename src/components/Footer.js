import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TG from '../TG.png';
import VK from '../VK.png';
import WhatsUp from '../WhatsUp.png';
import MainLogo from '../MainLogo.svg';

const FooterContainer = styled.footer`
  background: #0b0d13;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 48px 0 18px;
`;

const FooterContent = styled.div`
  width: min(1600px, 94vw);
  margin: 0 auto;
  padding: 0 8px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: clamp(16px, 2vw, 28px);
  margin-bottom: 26px;
  @media (max-width: 1000px){ grid-template-columns: 1fr 1fr; }
  @media (max-width: 600px){ grid-template-columns: 1fr; text-align: center; }
`;

const FooterSection = styled.div`
  h3 { font-family:'Raleway', sans-serif; font-size: 1.1rem; font-weight: 400; color:#aaf8ff; margin-bottom: 10px; }
  p, a { color: #c9d6e5; text-decoration:none; line-height:1.7; font-size: 0.95rem; font-family: 'Proxima Nova', 'Raleway', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif; }
  a:hover { color: #00ffff; }
`;

const Brand = styled.div`
  display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
  img { height: clamp(28px, 4vw, 40px); width:auto; display:block; }
`;

const SocialLinks = styled.div`
  display: flex; gap: 10px; margin-top: 10px; justify-content: flex-start;
  @media (max-width: 600px){ justify-content: center; }
`;

const SocialLink = styled(motion.a)`
  display:flex; align-items:center; justify-content:center;
  width:40px; height:40px; border-radius:50%; background:rgba(0,255,255,0.1); border:1px solid rgba(0,255,255,0.35);
  img{ width:22px; height:22px; filter:brightness(0) invert(1); }
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
      <FooterContent>
        <FooterSection>
          <Brand>
            <img src={MainLogo} alt="Логотип" />
          </Brand>
          <p>Москва, Россия</p>
          <p>info@cosmosfund.ru</p>
          <p>+7 (495) 123-45-67</p>
          <SocialLinks>
            <SocialLink href="https://t.me/cosmosfund" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.08 }}><img src={TG} alt="Telegram" /></SocialLink>
            <SocialLink href="https://vk.com/cosmosfund" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.08 }}><img src={VK} alt="VK" /></SocialLink>
            <SocialLink href="https://wa.me/74951234567" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.08 }}><img src={WhatsUp} alt="WhatsApp" /></SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>О ФОНДЕ</h3>
          <Link to="/about">Карта сайта</Link>
        </FooterSection>

        <FooterSection>
          <h3>ПРОЕКТЫ</h3>
          <Link to="/projects">Карта сайта</Link>
        </FooterSection>

        <FooterSection>
          <h3>НОВОСТИ</h3>
          <Link to="/news">Карта сайта</Link>
        </FooterSection>

        <FooterSection>
          <h3>ПАРТНЕРЫ</h3>
          <Link to="/partners">Карта сайта</Link>
        </FooterSection>
      </FooterContent>

      <BottomBar>
        <div>© 2025 Фонд содействия развитию космонавтики</div>
        <LegalLinks>
          <Link to="/privacy">Политика конфиденциальности</Link>
          <Link to="/terms">Условия пользования</Link>
        </LegalLinks>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;
