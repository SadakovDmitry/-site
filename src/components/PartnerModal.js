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
  padding: 1rem;
  border-radius: 60px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 1200px;
  width: 100%;
  position: relative;
  text-align: center;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 10px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  color: #212529;
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const FormTitle = styled.h2`
  font-family: 'Futura PT', sans-serif;
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 200;
  color: #ffffff;
  text-transform: uppercase;
  text-align: center;
  margin: 0 auto 1.5rem auto;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #312684 0%, #019CE5 100%);
  padding: 1.2rem 2rem;
  border-radius: 40px;
  box-shadow: 0 4px 15px rgba(49, 38, 132, 0.3);
  width: 70%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  margin-bottom: 0.2rem;

  label {
    display: none;
  }

  input, textarea {
    font-family: 'Proxima Nova', sans-serif;
    padding: 0.6rem;
    border: 1px solid #000000;
    border-radius: 40px;
    font-size: clamp(16px, 1.9vw, 124px);
    transition: border-color 0.3s ease;
    background: white;
    width: 70%;
    margin: 0 auto;
    line-height: 1.5;
    text-align: center;

    &::placeholder {
      color: rgb(202, 206, 210);
      font-size: clamp(20px, 2vw, 100px);
      font-weight: 600;
    }

    &:focus {
      outline: none;
      border-color: #000000;
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
    min-height: 60px;
    resize: vertical;
  }
`;

const SubmitButton = styled(motion.button)`
  font-family: 'Futura PT', sans-serif;
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
  padding: 1.0rem 4rem;
  border-radius: 50px;
  font-size: 2rem;
  font-weight: 200;
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
