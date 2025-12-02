import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from './Header';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  padding-top: 80px;
  color: #000000 !important;

  * {
    color: #000000 !important;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  color: #000000 !important;
  font-family: 'Proxima Nova', 'Raleway', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif;
  line-height: 1.8;

  * {
    color: #000000 !important;
  }

  h1 {
    font-family: 'Raleway', sans-serif;
    font-size: 2.5rem;
    font-weight: 400;
    margin-bottom: 2rem;
    color: #000000 !important;
  }

  h2 {
    font-family: 'Raleway', sans-serif;
    font-size: 1.8rem;
    font-weight: 400;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #000000 !important;
  }

  p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: #000000 !important;
  }

  p strong {
    color: #000000 !important;
  }

  ul {
    margin-bottom: 1rem;
    padding-left: 2rem;
    color: #000000 !important;

    li {
      margin-bottom: 0.5rem;
      color: #000000 !important;
    }
  }

  .back-link {
    display: inline-block;
    margin-bottom: 2rem;
    color: #019CE5;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;

    &:hover {
      color: #312684;
    }
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

const PrivacyPage = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <ContentContainer>
          <Link to="/" className="back-link">← Назад на главную</Link>
          <h1>ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</h1>

          <p>
            <strong>Дата вступления в силу: 2025</strong>
          </p>

          <h2>1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
          <p>
            Фонд содействия развитию космонавтики (далее — «Фонд») обязуется защищать конфиденциальность
            персональных данных пользователей сайта. Настоящая Политика конфиденциальности определяет порядок
            обработки и защиты персональных данных пользователей.
          </p>

          <h2>2. СБОР ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
          <p>
            Фонд собирает следующие категории персональных данных:
          </p>
          <ul>
            <li>Имя и контактная информация (при заполнении форм обратной связи)</li>
            <li>Адрес электронной почты</li>
            <li>Номер телефона</li>
            <li>Информация об организации (при указании)</li>
          </ul>

          <h2>3. ИСПОЛЬЗОВАНИЕ ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
          <p>
            Персональные данные используются исключительно для:
          </p>
          <ul>
            <li>Обработки запросов и обращений пользователей</li>
            <li>Предоставления информации о деятельности Фонда</li>
            <li>Улучшения качества работы сайта</li>
          </ul>

          <h2>4. ЗАЩИТА ДАННЫХ</h2>
          <p>
            Фонд принимает необходимые технические и организационные меры для защиты персональных данных
            от несанкционированного доступа, изменения, раскрытия или уничтожения.
          </p>

          <h2>5. ПЕРЕДАЧА ДАННЫХ ТРЕТЬИМ ЛИЦАМ</h2>
          <p>
            Фонд не передает персональные данные третьим лицам без согласия пользователя, за исключением
            случаев, предусмотренных законодательством Российской Федерации.
          </p>

          <h2>6. ПРАВА ПОЛЬЗОВАТЕЛЕЙ</h2>
          <p>
            Пользователи имеют право:
          </p>
          <ul>
            <li>Получать информацию о своих персональных данных</li>
            <li>Требовать исправления или удаления персональных данных</li>
            <li>Отозвать согласие на обработку персональных данных</li>
          </ul>

          <h2>7. КОНТАКТНАЯ ИНФОРМАЦИЯ</h2>
          <p>
            По вопросам, связанным с обработкой персональных данных, обращайтесь:
          </p>
          <p>
            <strong>Email:</strong> info@fondcosmos.ru<br />
            <strong>Телефон:</strong> +7 (495) 922 8994<br />
            <strong>Адрес:</strong> 123112, Россия, г. Москва, Пресненская наб., 12
          </p>

          <h2>8. ИЗМЕНЕНИЯ В ПОЛИТИКЕ</h2>
          <p>
            Фонд оставляет за собой право вносить изменения в настоящую Политику конфиденциальности.
            Актуальная версия всегда доступна на данной странице.
          </p>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default PrivacyPage;

