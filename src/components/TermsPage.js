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

const TermsPage = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <ContentContainer>
          <Link to="/" className="back-link">← Назад на главную</Link>
          <h1>УСЛОВИЯ ПОЛЬЗОВАНИЯ</h1>

          <p>
            <strong>Дата вступления в силу: 2025</strong>
          </p>

          <h2>1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
          <p>
            Настоящие Условия пользования (далее — «Условия») регулируют отношения между Фондом содействия
            развитию космонавтики (далее — «Фонд») и пользователями официального сайта Фонда (далее — «Сайт»).
          </p>
          <p>
            Используя Сайт, вы соглашаетесь с настоящими Условиями. Если вы не согласны с какими-либо
            положениями, пожалуйста, не используйте Сайт.
          </p>

          <h2>2. ИСПОЛЬЗОВАНИЕ САЙТА</h2>
          <p>
            Пользователи имеют право:
          </p>
          <ul>
            <li>Просматривать информацию, размещенную на Сайте</li>
            <li>Использовать материалы Сайта в личных, некоммерческих целях</li>
            <li>Обращаться в Фонд через формы обратной связи</li>
          </ul>

          <h2>3. ОГРАНИЧЕНИЯ</h2>
          <p>
            Пользователям запрещается:
          </p>
          <ul>
            <li>Использовать Сайт в незаконных целях</li>
            <li>Распространять вредоносное программное обеспечение</li>
            <li>Попытки несанкционированного доступа к системам Сайта</li>
            <li>Копирование и распространение материалов Сайта без разрешения Фонда</li>
          </ul>

          <h2>4. ИНТЕЛЛЕКТУАЛЬНАЯ СОБСТВЕННОСТЬ</h2>
          <p>
            Все материалы Сайта, включая тексты, изображения, логотипы, дизайн, являются собственностью
            Фонда или используются с разрешения правообладателей и защищены законодательством об
            интеллектуальной собственности.
          </p>

          <h2>5. ОТВЕТСТВЕННОСТЬ</h2>
          <p>
            Фонд не несет ответственности за:
          </p>
          <ul>
            <li>Точность информации, предоставленной третьими лицами</li>
            <li>Временные сбои в работе Сайта</li>
            <li>Действия пользователей, нарушающие настоящие Условия</li>
          </ul>

          <h2>6. ИЗМЕНЕНИЯ УСЛОВИЙ</h2>
          <p>
            Фонд оставляет за собой право вносить изменения в настоящие Условия в любое время.
            Продолжение использования Сайта после внесения изменений означает согласие с новыми Условиями.
          </p>

          <h2>7. КОНТАКТНАЯ ИНФОРМАЦИЯ</h2>
          <p>
            По вопросам, связанным с использованием Сайта, обращайтесь:
          </p>
          <p>
            <strong>Email:</strong> info@fondcosmos.ru<br />
            <strong>Телефон:</strong> +7 (495) 922 8994<br />
            <strong>Адрес:</strong> 123112, Россия, г. Москва, Пресненская наб., 12
          </p>

          <h2>8. ПРИМЕНИМОЕ ПРАВО</h2>
          <p>
            Настоящие Условия регулируются законодательством Российской Федерации. Все споры разрешаются
            в соответствии с действующим законодательством РФ.
          </p>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default TermsPage;

