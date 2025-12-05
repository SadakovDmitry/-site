# Способы отправки email через форму обратной связи

## 1. EmailJS (текущий вариант) ✅

**Статус:** Уже настроен в проекте

**Плюсы:**
- Не требует backend сервера
- Простая настройка
- Бесплатный план: 200 писем/месяц
- Работает прямо из браузера

**Минусы:**
- Лимиты на бесплатном плане
- Публичный ключ виден в коде (но это безопасно)

**Когда использовать:** Для небольших сайтов, статических сайтов, когда нет backend

---

## 2. Backend API (Node.js + Express + Nodemailer) 🚀

**Плюсы:**
- Полный контроль над отправкой
- Безопасность (секреты на сервере)
- Нет лимитов
- Можно добавить валидацию, спам-защиту, логирование
- Можно использовать любой SMTP сервер

**Минусы:**
- Нужен backend сервер
- Больше кода для поддержки

**Пример реализации:**

### Backend (Node.js/Express):

```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Настройка SMTP (Gmail, Outlook, или ваш почтовый сервер)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, organization, contact, message } = req.body;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'info@fondcosmos.ru',
      replyTo: contact,
      subject: `Новое сообщение с сайта от ${name}`,
      html: `
        <h2>Новое сообщение с сайта</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Организация:</strong> ${organization || 'Не указано'}</p>
        <p><strong>Контактные данные:</strong> ${contact}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Письмо отправлено' });
  } catch (error) {
    console.error('Ошибка отправки:', error);
    res.status(500).json({ success: false, message: 'Ошибка отправки' });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
```

### Frontend (React):

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitStatus('loading');

  try {
    const response = await fetch('http://your-server.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (data.success) {
      setSubmitStatus('success');
      setFormData({ name: '', organization: '', contact: '', message: '' });
    } else {
      setSubmitStatus('error');
    }
  } catch (error) {
    setSubmitStatus('error');
  }
};
```

**Установка:**
```bash
npm install express nodemailer cors dotenv
```

---

## 3. Formspree 📧

**Плюсы:**
- Очень просто (просто указываете endpoint)
- Не требует backend
- Бесплатный план: 50 писем/месяц
- Встроенная защита от спама

**Минусы:**
- Лимиты на бесплатном плане
- Меньше контроля над форматированием

**Пример:**

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitStatus('loading');

  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        organization: formData.organization,
        contact: formData.contact,
        message: formData.message,
        _replyto: formData.contact,
        _subject: `Новое сообщение от ${formData.name}`
      })
    });

    if (response.ok) {
      setSubmitStatus('success');
      setFormData({ name: '', organization: '', contact: '', message: '' });
    } else {
      setSubmitStatus('error');
    }
  } catch (error) {
    setSubmitStatus('error');
  }
};
```

**Настройка:** Зарегистрируйтесь на https://formspree.io/, создайте форму, получите endpoint

---

## 4. SendGrid / Mailgun / AWS SES 📬

**Плюсы:**
- Очень надежные сервисы
- Масштабируемость
- Хорошая доставляемость писем
- Детальная аналитика

**Минусы:**
- Нужен backend (или использовать через EmailJS)
- Платные после бесплатного лимита
- Более сложная настройка

**Пример с SendGrid (через backend):**

```javascript
// Backend
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/api/contact', async (req, res) => {
  const msg = {
    to: 'info@fondcosmos.ru',
    from: process.env.SENDGRID_FROM_EMAIL,
    replyTo: req.body.contact,
    subject: `Новое сообщение от ${req.body.name}`,
    html: `...`
  };

  await sgMail.send(msg);
  res.json({ success: true });
});
```

**Бесплатные лимиты:**
- SendGrid: 100 писем/день
- Mailgun: 5000 писем/месяц (первые 3 месяца)
- AWS SES: 62000 писем/месяц (после верификации)

---

## 5. Google Apps Script 🌐

**Плюсы:**
- Полностью бесплатно
- Не требует отдельного сервера
- Работает через Google аккаунт
- Можно использовать Gmail для отправки

**Минусы:**
- Привязка к Google экосистеме
- Лимиты: 100 писем/день
- Нужен Google аккаунт

**Пример:**

1. Создайте Google Apps Script: https://script.google.com/
2. Код скрипта:

```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  MailApp.sendEmail({
    to: 'info@fondcosmos.ru',
    subject: `Новое сообщение от ${data.name}`,
    htmlBody: `
      <p><strong>Имя:</strong> ${data.name}</p>
      <p><strong>Организация:</strong> ${data.organization}</p>
      <p><strong>Контакт:</strong> ${data.contact}</p>
      <p><strong>Сообщение:</strong> ${data.message}</p>
    `,
    replyTo: data.contact
  });

  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Опубликуйте как веб-приложение
4. Используйте URL в React:

```javascript
const response = await fetch('YOUR_GOOGLE_SCRIPT_URL', {
  method: 'POST',
  body: JSON.stringify(formData)
});
```

---

## 6. Netlify Forms / Vercel Forms 🎯

**Плюсы:**
- Встроено в платформу хостинга
- Очень просто настроить
- Бесплатно на базовом плане
- Автоматическая защита от спама

**Минусы:**
- Работает только если сайт на Netlify/Vercel
- Меньше контроля

**Пример (Netlify):**

Просто добавьте атрибут `netlify` к форме:

```jsx
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  {/* поля формы */}
</form>
```

Netlify автоматически обработает форму и отправит email на указанный адрес.

---

## 7. Mailto: ссылки (не рекомендуется) ⚠️

**Плюсы:**
- Очень просто

**Минусы:**
- Открывает почтовый клиент пользователя
- Не работает, если у пользователя нет настроенного почтового клиента
- Ненадежно

**Пример:**

```javascript
const mailtoLink = `mailto:info@fondcosmos.ru?subject=Сообщение от ${formData.name}&body=${encodeURIComponent(formData.message)}`;
window.location.href = mailtoLink;
```

---

## Рекомендации для вашего проекта:

### Вариант 1: EmailJS (текущий) ✅
- **Подходит если:** Нужно быстро, без backend, небольшой трафик
- **Действия:** Настроить по инструкции в `EMAILJS_SETUP.md`

### Вариант 2: Backend API (Node.js) 🚀
- **Подходит если:** Есть сервер, нужен полный контроль, много писем
- **Действия:**
  1. Создать простой Express сервер
  2. Настроить Nodemailer с SMTP
  3. Обновить форму для отправки на ваш API

### Вариант 3: Formspree 📧
- **Подходит если:** Нужно быстро, без backend, простое решение
- **Действия:** Зарегистрироваться на formspree.io, заменить endpoint в форме

### Вариант 4: Google Apps Script 🌐
- **Подходит если:** Есть Google аккаунт, нужно бесплатно, без сервера
- **Действия:** Создать скрипт, опубликовать, использовать URL

---

## Сравнительная таблица:

| Способ | Нужен Backend | Сложность | Лимиты | Стоимость |
|--------|---------------|-----------|--------|-----------|
| EmailJS | ❌ | Низкая | 200/мес | Бесплатно |
| Backend API | ✅ | Средняя | Нет | Бесплатно* |
| Formspree | ❌ | Очень низкая | 50/мес | Бесплатно |
| SendGrid | ✅ | Средняя | 100/день | Бесплатно |
| Google Script | ❌ | Низкая | 100/день | Бесплатно |
| Netlify Forms | ❌ | Очень низкая | Нет | Бесплатно** |

*Требует хостинг сервера
**Только на Netlify

---

## Какой выбрать?

1. **Сейчас (быстро):** EmailJS - уже настроен, нужно только добавить ключи
2. **Долгосрочно (надежно):** Backend API - полный контроль, масштабируемость
3. **Простота:** Formspree - минимальная настройка
4. **Бесплатно:** Google Apps Script - если есть Google аккаунт




