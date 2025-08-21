import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TG from '../TG.png';
import VK from '../VK.png';
import WhatsUp from '../WhatsUp.png';
import MainLogo from '../MainLogo.svg';

const ContactSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #533483 0%, #0f3460 50%, #16213e 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%2300ffff" opacity="0.2"/></pattern></defs><rect width="100" height="100" fill="url(%23circles)"/></svg>');
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
  font-weight: 700;
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactForm = styled(motion.form)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2.5rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FormTitle = styled.h3`
  font-family: 'Raleway', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #00ffff;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(45deg, #00ffff, #ff0080);
  border: none;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #000;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'Raleway', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactInfo = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2.5rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const InfoTitle = styled.h3`
  font-family: 'Raleway', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #00ffff;
  text-align: center;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(0, 255, 255, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 255, 0.15);
    transform: translateX(10px);
  }

  .icon {
    width: 40px;
    height: 40px;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #00ffff;
  }

  .text {
    flex: 1;

    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #fff;
      margin-bottom: 0.3rem;
    }

    p {
      font-size: 0.9rem;
      color: #ccc;
      margin: 0;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #00ffff, #0080ff);
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;

  img {
    width: 30px;
    height: 30px;
    filter: brightness(0) invert(1);
  }

  &:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 10px 25px rgba(0, 255, 255, 0.4);
  }
`;

const LogoSection = styled(motion.div)`
  text-align: center;
  margin-top: 3rem;

  img {
    height: 80px;
    width: auto;
    filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.3));
  }

  p {
    font-family: 'Proxima Nova', 'Raleway', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif;
    margin-top: 1rem;
    color: #ccc;
    font-size: 1rem;
  }
`;

const Contact = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Имитация отправки формы
        await new Promise(resolve => setTimeout(resolve, 2000));

        alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);
    };

    return (
        <ContactSection id="contact" ref={ref}>
            <Container>
                <SectionTitle
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    Свяжитесь с нами
                </SectionTitle>

                <SectionSubtitle
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                    У вас есть вопросы или предложения? Мы будем рады услышать от вас!
                </SectionSubtitle>

                <ContactGrid>
                    <ContactForm
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        onSubmit={handleSubmit}
                    >
                        <FormTitle>Отправить сообщение</FormTitle>

                        <FormGroup>
                            <Label htmlFor="name">Имя *</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Ваше имя"
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="your@email.com"
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="subject">Тема</Label>
                            <Input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                placeholder="Тема сообщения"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="message">Сообщение *</Label>
                            <TextArea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Ваше сообщение..."
                                required
                            />
                        </FormGroup>

                        <SubmitButton
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                        </SubmitButton>
                    </ContactForm>

                    <ContactInfo
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    >
                        <InfoTitle>Контактная информация</InfoTitle>

                        <InfoItem>
                            <div className="icon">📍</div>
                            <div className="text">
                                <h4>Адрес</h4>
                                <p>Москва, Россия<br />Центр космических исследований</p>
                            </div>
                        </InfoItem>

                        <InfoItem>
                            <div className="icon">📧</div>
                            <div className="text">
                                <h4>Email</h4>
                                <p>info@frsrk.ru<br />support@frsrk.ru</p>
                            </div>
                        </InfoItem>

                        <InfoItem>
                            <div className="icon">📱</div>
                            <div className="text">
                                <h4>Телефон</h4>
                                <p>+7 (495) 123-45-67<br />+7 (495) 123-45-68</p>
                            </div>
                        </InfoItem>

                        <InfoItem>
                            <div className="icon">🕒</div>
                            <div className="text">
                                <h4>Время работы</h4>
                                <p>Пн-Пт: 9:00 - 18:00<br />Сб-Вс: 10:00 - 16:00</p>
                            </div>
                        </InfoItem>

                        <SocialLinks>
                            <SocialLink
                                href="https://t.me/frsrk"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <img src={TG} alt="Telegram" />
                            </SocialLink>

                            <SocialLink
                                href="https://vk.com/frsrk"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <img src={VK} alt="VKontakte" />
                            </SocialLink>

                            <SocialLink
                                href="https://wa.me/74951234567"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <img src={WhatsUp} alt="WhatsApp" />
                            </SocialLink>
                        </SocialLinks>
                    </ContactInfo>
                </ContactGrid>

                <LogoSection
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                >
                    <img src={MainLogo} alt="ФРСК" />
                    <p>Федерация ракетно-космического моделирования</p>
                </LogoSection>
            </Container>
        </ContactSection>
    );
};

export default Contact;
