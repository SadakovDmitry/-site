import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import videoContact from '../images/ContactPage/video_contact.png';
import phoneIcon from '../images/ContactPage/phone.svg';
import emailIcon from '../images/ContactPage/e-mail.svg';
import clockIcon from '../images/ContactPage/clock.svg';
import mapIcon from '../images/ContactPage/map.svg';
import telegramIcon from '../images/ContactPage/Telegram.svg';
import whatsappIcon from '../images/ContactPage/WhatsApp.svg';
import vkIcon from '../images/ContactPage/VK.svg';
import underWhatsappIcon from '../images/ContactPage/under_whatsapp.svg';
import underLogoIcon from '../images/ContactPage/under_logo.svg';

// Импорт шрифтов
import ProximaRegular from '../Proxima Nova/proximanova_regular.ttf';
import ProximaBold from '../Proxima Nova/proximanova_bold.otf';
import ProximaExtraBold from '../Proxima Nova/proximanova_extrabold.otf';
import RalewayRegular from '../Raleway/Raleway-v4020-Regular.otf';
import RalewaySemiBold from '../Raleway/Raleway-v4020-SemiBold.otf';
import RalewayBold from '../Raleway/Raleway-v4020-Bold.otf';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #1a1a1a;

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
`;

const HeroBanner = styled.div`
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

const HeroTitle = styled(motion.h1)`
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

const ContentSection = styled.section`
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const ContactInfo = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  @media (max-width: 480px) {
    gap: 2rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  .icon {
    width: 130px;
    height: 130px;
    background: transparent;
    border: none;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    img {
      width: 120px;
      height: 120px;
    }
  }

  .content {
    h4 {
      font-family: 'Proxima Nova', sans-serif;
      font-size: 2.9rem;
      font-weight: 400;
      color: #212529;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.0rem;
    }

    p {
      font-family: 'Proxima Nova', sans-serif;
      font-size: 1.8rem;
      color: #212529;
      margin: 0;
      line-height: 1.0;
    }
  }

  @media (max-width: 950px) {
    gap: 2rem;

    .icon {
      width: 110px;
      height: 110px;

      img {
        width: 100px;
        height: 100px;
      }
    }

    .content {
      h4 {
        font-size: 1.6rem;
      }

      p {
        font-size: 1.6rem;
      }
    }
  }

  @media (max-width: 480px) {
    gap: 1.5rem;

    .icon {
      width: 95px;
      height: 95px;

      img {
        width: 85px;
        height: 85px;
      }
    }

    .content {
      h4 {
        font-size: 1.4rem;
      }

      p {
        font-size: 1.4rem;
      }
    }
  }
`;

const FormSection = styled(motion.div)`
  background: transparent;
  padding: 1rem;
  border-radius: 0;
  box-shadow: none;
  margin-bottom: 3rem;
  text-align: center;
`;

const FormTitle = styled.h2`
  font-family: 'Raleway', sans-serif;
  font-size: clamp(30px, 3.5vw, 100px);
  font-weight: 400;
  color: #212529;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: 0.05em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.1rem;

  label {
    display: none;
  }

  input, textarea {
    font-family: 'Proxima Nova', sans-serif;
    padding: 1.2rem;
    border: 1px solid #000000;
    border-radius: 40px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    background: white;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    &::placeholder {
      color:rgb(202, 206, 210);
      font-size: clamp(20px, 2vw, 100px);
      font-weight: 600;

    }

    &:focus {
      outline: none;
      border-color: #000000;
    }
  }

  textarea {
    min-height: 200px;
    resize: vertical;
  }
`;

const SubmitButton = styled(motion.button)`
  font-family: 'Proxima Nova', sans-serif;
  background: ${props => {
        if (props.status === 'success') {
            return 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)';
        } else if (props.status === 'error') {
            return '#f8f9fa';
        } else {
            return '#212529';
        }
    }};
  color: ${props => props.status === 'error' ? '#6c757d' : 'white'};
  border: none;
  padding: 1.2rem 4rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  align-self: center;
  transition: all 0.3s ease;
  text-transform: uppercase;
  margin-top: 1rem;
  box-shadow: ${props => {
        if (props.status === 'success') {
            return '0 4px 15px rgba(0, 123, 255, 0.3)';
        } else if (props.status === 'error') {
            return '0 4px 15px rgba(108, 117, 125, 0.2)';
        } else {
            return '0 4px 15px rgba(33, 37, 41, 0.3)';
        }
    }};
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${props => {
        if (props.status === 'success') {
            return 'linear-gradient(135deg, #0056b3 0%, #004085 100%)';
        } else if (props.status === 'error') {
            return '#e9ecef';
        } else {
            return '#343a40';
        }
    }};
    box-shadow: ${props => {
        if (props.status === 'success') {
            return '0 6px 20px rgba(0, 123, 255, 0.4)';
        } else if (props.status === 'error') {
            return '0 6px 20px rgba(108, 117, 125, 0.3)';
        } else {
            return '0 6px 20px rgba(33, 37, 41, 0.4)';
        }
    }};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SocialSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
`;

const SocialTitle = styled.h2`
  font-family: 'Raleway', sans-serif;
  font-size: clamp(30px, 3.5vw, 100px);
  font-weight: 400;
  color: #212529;
  text-transform: uppercase;
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;

  @media (max-width: 768px) {
    gap: 2.5rem;
  }

  @media (max-width: 480px) {
    gap: 2rem;
  }
`;

const SocialIcon = styled(motion.div)`
  width: 80px;
  height: 80px;
  background: url(${props => props.bgImage}) center center;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
//   box- hadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;

  img {
    width: 45px;
    height: 45px;
    filter: brightness(0) invert(1);
  }

  &:hover {
    transform: scale(1.05);
    // box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;

    img {
      width: 40px;
      height: 40px;
    }
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;

    img {
      width: 35px;
      height: 35px;
    }
  }
`;

const ContactPage = () => {
    const [inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [formData, setFormData] = useState({
        name: '',
        organization: '',
        contact: '',
        message: ''
    });
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Имитация отправки формы
        const isSuccess = Math.random() > 0.3; // 70% успех
        setSubmitStatus(isSuccess ? 'success' : 'error');

        // Сброс статуса через 5 секунд
        setTimeout(() => setSubmitStatus(null), 5000);

        // Очистка формы при успехе
        if (isSuccess) {
            setFormData({
                name: '',
                organization: '',
                contact: '',
                message: ''
            });
        }
    };

    return (
        <PageContainer>
            <HeroBanner>
                <BannerImage src={videoContact} alt="Contact Banner" />
                <Overlay>
                    <HeroTitle
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        КОНТАКТЫ
                    </HeroTitle>
                </Overlay>
            </HeroBanner>

            <ContentSection>
                <Container>
                    <ContactInfo
                        initial={{ opacity: 0, y: 50 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <ContactItem>
                            <div className="icon">
                                <img src={mapIcon} alt="Адрес" />
                            </div>
                            <div className="content">
                                <h4>АДРЕС</h4>
                                <p>123112, г. Москва, Пресненская наб., 12</p>
                            </div>
                        </ContactItem>

                        <ContactItem>
                            <div className="icon">
                                <img src={emailIcon} alt="Email" />
                            </div>
                            <div className="content">
                                <h4>E-MAIL</h4>
                                <p>info@cosmosfond.ru</p>
                            </div>
                        </ContactItem>

                        <ContactItem>
                            <div className="icon">
                                <img src={phoneIcon} alt="Телефон" />
                            </div>
                            <div className="content">
                                <h4>ТЕЛЕФОН</h4>
                                <p>+7 (495) 922 8994</p>
                            </div>
                        </ContactItem>

                        <ContactItem>
                            <div className="icon">
                                <img src={clockIcon} alt="Часы работы" />
                            </div>
                            <div className="content">
                                <h4>ЧАСЫ РАБОТЫ</h4>
                                <p>10:00 – 19:00</p>
                            </div>
                        </ContactItem>
                    </ContactInfo>

                    <FormSection
                        initial={{ opacity: 0, y: 50 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <FormTitle>ОБРАТНАЯ СВЯЗЬ</FormTitle>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Имя"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <input
                                    type="text"
                                    id="organization"
                                    name="organization"
                                    placeholder="Организация"
                                    value={formData.organization}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    placeholder="Контактные данные"
                                    value={formData.contact}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Сообщение"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>

                            <SubmitButton
                                type="submit"
                                status={submitStatus}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {submitStatus === 'success' ? 'ПОЛУЧЕНО' :
                                    submitStatus === 'error' ? 'ОШИБКА' : 'ОТПРАВИТЬ'}
                            </SubmitButton>

                            {submitStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        textAlign: 'center',
                                        color: '#28a745',
                                        marginTop: '1rem',
                                        padding: '1rem',
                                        background: '#d4edda',
                                        borderRadius: '8px',
                                        border: '1px solid #c3e6cb'
                                    }}
                                >
                                    Благодарим вас за обращение! Наши специалисты свяжутся с вами в самое ближайшее время!
                                </motion.div>
                            )}

                            {submitStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        textAlign: 'center',
                                        color: '#dc3545',
                                        marginTop: '1rem',
                                        padding: '1rem',
                                        background: '#f8d7da',
                                        borderRadius: '8px',
                                        border: '1px solid #f5c6cb'
                                    }}
                                >
                                    Приносим свои извинения, что-то пошло не так. Пожалуйста, повторите отправку запроса, либо свяжитесь с нами через один из каналов связи выше:
                                </motion.div>
                            )}
                        </Form>
                    </FormSection>

                    <SocialSection
                        initial={{ opacity: 0, y: 50 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        <SocialTitle>СОЦИАЛЬНЫЕ СЕТИ</SocialTitle>
                        <SocialIcons>
                            <SocialIcon
                                bgImage={underLogoIcon}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => window.open('https://vk.com/cosmosfund', '_blank')}
                            >
                                <img src={vkIcon} alt="VK" />
                            </SocialIcon>
                            <SocialIcon
                                bgImage={underWhatsappIcon}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => window.open('https://wa.me/74959228994', '_blank')}
                            >
                                <img src={whatsappIcon} alt="WhatsApp" />
                            </SocialIcon>
                            <SocialIcon
                                bgImage={underLogoIcon}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => window.open('https://t.me/cosmosfund', '_blank')}
                            >
                                <img src={telegramIcon} alt="Telegram" />
                            </SocialIcon>
                        </SocialIcons>
                    </SocialSection>
                </Container>
            </ContentSection>
        </PageContainer>
    );
};

export default ContactPage;
