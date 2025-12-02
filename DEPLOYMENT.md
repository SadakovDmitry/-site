# 🚀 Развертывание ФРСК сайта на облачном сервере

## 📋 Предварительные требования

### На вашем локальном компьютере:
- Docker Desktop
- Git
- SSH доступ к облачному серверу

### На облачном сервере:
- Ubuntu 20.04+ или CentOS 7+
- Docker и Docker Compose
- Минимум 1GB RAM
- Минимум 10GB свободного места

## 🔧 Подготовка сервера

### 1. Установка Docker на Ubuntu/Debian:
```bash
# Обновляем систему
sudo apt update && sudo apt upgrade -y

# Устанавливаем Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Добавляем пользователя в группу docker
sudo usermod -aG docker $USER

# Устанавливаем Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Перезагружаемся для применения изменений
sudo reboot
```

### 2. Установка Docker на CentOS/RHEL:
```bash
# Устанавливаем Docker
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce docker-ce-cli containerd.io

# Запускаем Docker
sudo systemctl start docker
sudo systemctl enable docker

# Устанавливаем Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## 📦 Развертывание приложения

### 1. Клонирование репозитория на сервер:
```bash
# Создаем директорию для проекта
mkdir -p /opt/frsrk-website
cd /opt/frsrk-website

# Клонируем репозиторий (замените URL на ваш)
git clone https://github.com/your-username/frsrk-website.git .

# Или загружаем файлы через SCP
scp -r /path/to/local/project/* user@server:/opt/frsrk-website/
```

### 2. Настройка файрвола (если используется):
```bash
# Открываем порты 80 и 443
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 3. Запуск приложения:
```bash
# Переходим в директорию проекта
cd /opt/frsrk-website

# Запускаем развертывание
./deploy.sh production
```

## 🔧 Управление приложением

### Основные команды:
```bash
# Запуск
./manage.sh start

# Остановка
./manage.sh stop

# Перезапуск
./manage.sh restart

# Просмотр статуса
./manage.sh status

# Просмотр логов
./manage.sh logs

# Обновление приложения
./manage.sh update

# Очистка неиспользуемых ресурсов
./manage.sh clean
```

## 🌐 Настройка домена и SSL

### 1. Настройка DNS:
- Создайте A-запись, указывающую на IP вашего сервера
- Например: `frsrk.ru` → `YOUR_SERVER_IP`

### 2. Настройка SSL с Let's Encrypt:
```bash
# Устанавливаем Certbot
sudo apt install certbot python3-certbot-nginx -y

# Получаем сертификат
sudo certbot --nginx -d frsrk.ru -d www.frsrk.ru

# Настраиваем автообновление
sudo crontab -e
# Добавляем строку:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

### 3. Обновление nginx.conf для HTTPS:
```nginx
server {
    listen 80;
    server_name frsrk.ru www.frsrk.ru;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name frsrk.ru www.frsrk.ru;

    ssl_certificate /etc/letsencrypt/live/frsrk.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/frsrk.ru/privkey.pem;

    # Остальная конфигурация...
}
```

## 📊 Мониторинг и логи

### Просмотр логов:
```bash
# Логи приложения
docker-compose logs -f

# Логи nginx
docker-compose exec frsrk-website tail -f /var/log/nginx/access.log
docker-compose exec frsrk-website tail -f /var/log/nginx/error.log
```

### Мониторинг ресурсов:
```bash
# Использование ресурсов контейнерами
docker stats

# Использование диска
df -h

# Использование памяти
free -h
```

## 🔄 Автоматическое обновление

### Настройка CI/CD с GitHub Actions:
Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Server

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /opt/frsrk-website
          git pull origin main
          ./manage.sh update
```

## 🛠️ Устранение неполадок

### Проблема: Приложение не запускается
```bash
# Проверяем логи
docker-compose logs

# Проверяем статус контейнеров
docker-compose ps

# Перезапускаем с пересборкой
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Проблема: Не работает маршрутизация React Router
- Убедитесь, что nginx.conf содержит правильную конфигурацию для SPA
- Проверьте, что все маршруты ведут на `index.html`

### Проблема: Медленная загрузка
```bash
# Проверяем сжатие
curl -H "Accept-Encoding: gzip" -I http://your-domain.com

# Оптимизируем образ
docker image prune -f
```

## 📈 Оптимизация производительности

### 1. Настройка кэширования:
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

### Автоматическое резервное копирование:
```bash
# Создаем скрипт резервного копирования
cat > /opt/backup-frsrk.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups/frsrk-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Копируем конфигурацию
cp -r /opt/frsrk-website "$BACKUP_DIR/"

# Создаем архив
tar -czf "$BACKUP_DIR.tar.gz" -C /opt/backups "frsrk-$(date +%Y%m%d_%H%M%S)"
rm -rf "$BACKUP_DIR"

# Удаляем старые резервные копии (старше 30 дней)
find /opt/backups -name "frsrk-*.tar.gz" -mtime +30 -delete
EOF

chmod +x /opt/backup-frsrk.sh

# Добавляем в crontab (ежедневно в 2:00)
echo "0 2 * * * /opt/backup-frsrk.sh" | sudo crontab -
```

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи: `./manage.sh logs`
2. Проверьте статус: `./manage.sh status`
3. Перезапустите: `./manage.sh restart`
4. Обновите приложение: `./manage.sh update`

---

**Удачного развертывания! 🚀**






