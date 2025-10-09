# 🚀 Развертывание ФРСК сайта на существующем сервере

## 📋 Предварительные требования

На вашем сервере уже должны быть установлены:
- ✅ Node.js и npm
- ✅ PM2
- ✅ Nginx
- ✅ Git

## 🔧 Подготовка к развертыванию

### 1. Настройка переменных в скриптах

Перед развертыванием отредактируйте следующие файлы:

**В файле `deploy-server.sh` или `deploy-pm2.sh`:**
```bash
# Замените на ваши настройки
APP_NAME="frsrk-website"
DOMAIN="your-domain.com"  # Ваш домен
REPO="https://github.com/your-username/frsrk-website.git"  # Ваш репозиторий
```

### 2. Загрузка проекта на сервер

```bash
# Загрузите все файлы проекта на сервер
scp -r /path/to/local/project/* user@server:/var/www/sites/frsrk-website/

# Или клонируйте репозиторий
cd /var/www/sites
git clone https://github.com/your-username/frsrk-website.git
```

## 🚀 Варианты развертывания

### Вариант 1: Статический контент через Nginx (Рекомендуется)

Этот вариант более производительный и не требует Node.js в продакшене:

```bash
# Запустите скрипт развертывания
./deploy-server.sh
```

**Что происходит:**
1. Клонируется/обновляется репозиторий
2. Устанавливаются зависимости
3. Собирается статический build
4. Настраивается Nginx для раздачи статических файлов
5. Сайт становится доступен по вашему домену

### Вариант 2: Через PM2 (как ваш оригинальный скрипт)

Если вы хотите использовать PM2 для управления процессом:

```bash
# Запустите скрипт развертывания
./deploy-pm2.sh
```

**Что происходит:**
1. Клонируется/обновляется репозиторий
2. Устанавливаются зависимости
3. Собирается статический build
4. Запускается serve через PM2
5. Настраивается Nginx как прокси
6. Сайт становится доступен по вашему домену

## 🔧 Управление приложением

### Для статического развертывания:

```bash
# Обновление сайта
cd /var/www/sites/frsrk-website
git pull
npm install
npm run build
sudo systemctl reload nginx

# Проверка статуса nginx
sudo systemctl status nginx

# Просмотр логов nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Для PM2 развертывания:

```bash
# Используйте скрипт управления
./manage-pm2.sh start    # Запуск
./manage-pm2.sh stop     # Остановка
./manage-pm2.sh restart  # Перезапуск
./manage-pm2.sh status   # Статус
./manage-pm2.sh logs     # Логи
./manage-pm2.sh update   # Обновление
./manage-pm2.sh monitor  # Мониторинг
```

## 🌐 Настройка домена и SSL

### 1. Настройка DNS
Создайте A-запись в вашем DNS провайдере:
```
your-domain.com → YOUR_SERVER_IP
www.your-domain.com → YOUR_SERVER_IP
```

### 2. Настройка SSL с Let's Encrypt
```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx -y

# Получение сертификата
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Автообновление сертификатов
sudo crontab -e
# Добавьте строку:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 Мониторинг и логи

### Просмотр логов:

**Nginx:**
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

**PM2 (если используется):**
```bash
pm2 logs frsrk-website
pm2 monit
```

### Проверка статуса:
```bash
# Nginx
sudo systemctl status nginx

# PM2
pm2 status

# Проверка портов
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :3000
```

## 🔄 Автоматическое обновление

### Создание cron задачи для автообновления:

```bash
# Открываем crontab
sudo crontab -e

# Добавляем задачу (обновление каждый день в 3:00)
0 3 * * * cd /var/www/sites/frsrk-website && git pull && npm install && npm run build && sudo systemctl reload nginx
```

### Или создайте скрипт автообновления:

```bash
# Создаем скрипт
sudo nano /usr/local/bin/update-frsrk.sh

# Содержимое скрипта:
#!/bin/bash
cd /var/www/sites/frsrk-website
git pull
npm install
npm run build
sudo systemctl reload nginx
echo "$(date): ФРСК сайт обновлен" >> /var/log/frsrk-update.log

# Делаем исполняемым
sudo chmod +x /usr/local/bin/update-frsrk.sh

# Добавляем в crontab
echo "0 3 * * * /usr/local/bin/update-frsrk.sh" | sudo crontab -
```

## 🛠️ Устранение неполадок

### Проблема: Сайт не открывается
```bash
# Проверяем статус nginx
sudo systemctl status nginx

# Проверяем конфигурацию nginx
sudo nginx -t

# Перезапускаем nginx
sudo systemctl restart nginx

# Проверяем, что файлы существуют
ls -la /var/www/sites/frsrk-website/build/
```

### Проблема: 404 ошибки на маршрутах React Router
Убедитесь, что в nginx.conf есть правильная обработка SPA:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Проблема: Медленная загрузка
```bash
# Проверяем сжатие
curl -H "Accept-Encoding: gzip" -I http://your-domain.com

# Проверяем кэширование
curl -I http://your-domain.com/static/js/main.js
```

## 📈 Оптимизация производительности

### 1. Настройка кэширования в nginx:
- Статические файлы кэшируются на 1 год
- HTML файлы не кэшируются для обновлений

### 2. Сжатие:
- Gzip включен для всех текстовых файлов
- Минимальный размер для сжатия: 1024 байта

### 3. Безопасность:
- Заголовки безопасности настроены
- XSS защита включена
- Clickjacking защита включена

## 🔐 Резервное копирование

### Создание скрипта резервного копирования:

```bash
# Создаем скрипт
sudo nano /usr/local/bin/backup-frsrk.sh

# Содержимое:
#!/bin/bash
BACKUP_DIR="/opt/backups/frsrk-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Копируем файлы проекта
cp -r /var/www/sites/frsrk-website "$BACKUP_DIR/"

# Копируем конфигурацию nginx
cp /etc/nginx/sites-available/frsrk.ru "$BACKUP_DIR/nginx.conf"

# Создаем архив
tar -czf "$BACKUP_DIR.tar.gz" -C /opt/backups "frsrk-$(date +%Y%m%d_%H%M%S)"
rm -rf "$BACKUP_DIR"

# Удаляем старые резервные копии (старше 30 дней)
find /opt/backups -name "frsrk-*.tar.gz" -mtime +30 -delete

echo "$(date): Резервная копия создана: $BACKUP_DIR.tar.gz" >> /var/log/frsrk-backup.log

# Делаем исполняемым
sudo chmod +x /usr/local/bin/backup-frsrk.sh

# Добавляем в crontab (еженедельно в воскресенье в 2:00)
echo "0 2 * * 0 /usr/local/bin/backup-frsrk.sh" | sudo crontab -
```

## 📞 Поддержка

При возникновении проблем:

1. **Проверьте логи:**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

2. **Проверьте статус сервисов:**
   ```bash
   sudo systemctl status nginx
   ```

3. **Перезапустите сервисы:**
   ```bash
   sudo systemctl restart nginx
   ```

4. **Проверьте конфигурацию:**
   ```bash
   sudo nginx -t
   ```

---

**Удачного развертывания! 🚀**

## 📋 Краткая шпаргалка

```bash
# Развертывание (выберите один вариант)
./deploy-server.sh    # Статический контент
./deploy-pm2.sh       # Через PM2

# Управление
./manage-pm2.sh status    # Статус (для PM2)
sudo systemctl status nginx  # Статус nginx

# Обновление
git pull && npm install && npm run build && sudo systemctl reload nginx

# Логи
sudo tail -f /var/log/nginx/error.log
pm2 logs frsrk-website  # Для PM2
```
