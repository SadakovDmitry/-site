import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import FuturaPT from '../FuturaPT/FuturaPTBook.otf';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 10px;
    align-items: flex-start;
    padding-top: 20px;
  }

  @media (max-width: 480px) {
    padding: 5px;
    padding-top: 10px;
  }

  @font-face {
    font-family: 'Futura PT';
    src: url(${FuturaPT}) format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
`;

const ModalContent = styled(motion.div)`
  background: #ffffff;
  padding: 2rem;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 90%;
  position: relative;
  text-align: center;
  z-index: 1;
  margin: 20px auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 10px;
    width: 95%;
    border-radius: 25px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin: 5px;
    width: 98%;
    border-radius: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  color: #666;
  font-size: 1.5rem;
  cursor: pointer;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    color: #333;
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    top: 8px;
    right: 8px;
    width: 28px;
    height: 28px;
    font-size: 1rem;
  }
`;

const FormTitle = styled.h2`
  font-family: 'Futura PT', sans-serif;
  font-size: clamp(1rem, 2.2vw, 1.8rem);
  font-weight: 200;
  color: #ffffff;
  text-transform: uppercase;
  text-align: center;
  margin: 0 auto 1.5rem auto;
  letter-spacing: 0.5px;
  background: linear-gradient(90deg, #312684 0%, #019CE5 100%);
  padding: 1rem 1.5rem;
  border-radius: 30px;
  box-shadow: 0 4px 15px rgba(49, 38, 132, 0.3);
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    width: 90%;
    padding: 0.8rem 1rem;
    font-size: clamp(0.8rem, 3vw, 1.2rem);
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 0.6rem 0.8rem;
    font-size: clamp(0.7rem, 2.5vw, 1rem);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.5rem;

  label {
    display: none;
  }

  @media (max-width: 768px) {
    margin-bottom: 0.3rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 0.2rem;
  }

  input, textarea {
    font-family: 'Proxima Nova', sans-serif;
    padding: 0.8rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 25px;
    font-size: clamp(14px, 1.5vw, 18px);
    transition: all 0.3s ease;
    background: white;
    width: 80%;
    margin: 0 auto;
    line-height: 1.4;
    text-align: left;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &::placeholder {
      color: #999;
      font-size: clamp(12px, 1.2vw, 16px);
      font-weight: 400;
    }

    &:focus {
      outline: none;
      border-color: #019CE5;
      box-shadow: 0 0 0 2px rgba(1, 156, 229, 0.2);
    }

    @media (max-width: 768px) {
      width: 90%;
      padding: 0.6rem 0.8rem;
      font-size: clamp(12px, 2vw, 16px);

      &::placeholder {
        font-size: clamp(10px, 1.8vw, 14px);
      }
    }

    @media (max-width: 480px) {
      width: 95%;
      padding: 0.5rem 0.7rem;
      font-size: clamp(10px, 1.5vw, 14px);

      &::placeholder {
        font-size: clamp(8px, 1.5vw, 12px);
      }
    }


    /* Дополнительные стили для лучшего контроля */
    &::-webkit-input-placeholder {
      font-size: clamp(20px, 2vw, 100px);
    }

    &::-moz-placeholder {
      font-size: clamp(20px, 2vw, 100px);
    }

    &:-ms-input-placeholder {
      font-size: clamp(20px, 2vw, 100px);
    }
  }

  textarea {
    min-height: 80px;
    resize: vertical;
    text-align: left;
    line-height: 1.4;

    @media (max-width: 768px) {
      min-height: 70px;
    }

    @media (max-width: 480px) {
      min-height: 60px;
    }
  }
`;

const SubmitButton = styled(motion.button)`
  font-family: 'Futura PT', sans-serif;
  background: ${props => {
        if (props.status === 'success') {
            return 'linear-gradient(135deg, #019CE5 0%, #312684 100%)';
        } else if (props.status === 'error') {
            return '#f8f9fa';
        } else {
            return '#212529';
        }
    }};
  color: ${props => props.status === 'error' ? '#6c757d' : 'white'};
  border: none;
  padding: 0.8rem 2.5rem;
  border-radius: 30px;
  font-size: clamp(14px, 1.5vw, 18px);
  font-weight: 400;
  cursor: pointer;
  align-self: center;
  transition: all 0.3s ease;
  text-transform: uppercase;
  margin-top: 1rem;
  box-shadow: ${props => {
        if (props.status === 'success') {
            return '0 4px 15px rgba(1, 156, 229, 0.3)';
        } else if (props.status === 'error') {
            return '0 4px 15px rgba(108, 117, 125, 0.2)';
        } else {
            return '0 4px 15px rgba(49, 38, 132, 0.3)';
        }
    }};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    padding: 0.6rem 2rem;
    font-size: clamp(12px, 2vw, 16px);
    width: 80%;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1.5rem;
    font-size: clamp(10px, 1.5vw, 14px);
    width: 90%;
  }
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

const SuccessMessage = styled(motion.div)`
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  font-family: 'Proxima Nova', sans-serif;
  font-size: 1rem;
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
`;

const PartnerModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        organization: '',
        contact: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        // Имитация отправки формы
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                onClose();
                setFormData({
                    name: '',
                    organization: '',
                    contact: '',
                    message: ''
                });
                setStatus('idle');
            }, 2000);
        }, 1500);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <ModalOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleOverlayClick}
                >
                    <ModalContent
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <CloseButton onClick={onClose}>×</CloseButton>

                        <FormTitle>ОБРАТНАЯ СВЯЗЬ</FormTitle>

                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <input
                                    type="text"
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
                                    name="organization"
                                    placeholder="Организация"
                                    value={formData.organization}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <input
                                    type="text"
                                    name="contact"
                                    placeholder="Контактные данные"
                                    value={formData.contact}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <textarea
                                    name="message"
                                    placeholder="Сообщение"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>

                            <SubmitButton
                                type="submit"
                                status={status}
                                disabled={status === 'loading'}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.96 }}
                            >
                                {status === 'loading' ? 'Отправка...' : 'ОТПРАВИТЬ'}
                            </SubmitButton>

                            {status === 'success' && (
                                <SuccessMessage
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.
                                </SuccessMessage>
                            )}
                        </Form>
                    </ModalContent>
                </ModalOverlay>
            )}
        </AnimatePresence>
    );
};

export default PartnerModal;
