#!/bin/bash
set -e

# Настройки для ФРСК сайта
APP_NAME="frsrk-website"
DOMAIN="frsrk.ru"  # Замените на ваш домен
BASE_DIR="/var/www/sites"
APP_DIR="$BASE_DIR/$APP_NAME"
REPO="https://github.com/SadakovDmitry/frsrk-website"  # Замените на ваш репозиторий
PORT=3000

echo "[1] Создаём директорию для проекта"
mkdir -p "$BASE_DIR"

if [ ! -d "$APP_DIR" ]; then
  echo "[2] Клонируем репозиторий"
  git clone "$REPO" "$APP_DIR"
else
  echo "[2] Обновляем репозиторий"
  cd "$APP_DIR"
  git pull
fi

cd "$APP_DIR"

echo "[3] Устанавливаем зависимости и собираем проект"
npm install
npm run build

echo "[4] Настройка Nginx для статического контента"
CONF="/etc/nginx/sites-available/$DOMAIN"
sudo bash -c "cat > $CONF" <<NGX
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    root $APP_DIR/build;
    index index.html;

    # Сжатие файлов
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    # Кэширование статических файлов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files \$uri =404;
    }

    # Обработка React Router (SPA)
    location / {
        try_files \$uri \$uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # Безопасность
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Обработка ошибок
    error_page 404 /index.html;
}
NGX

# Активируем сайт
ln -sf "$CONF" "/etc/nginx/sites-enabled/$DOMAIN"

# Удаляем дефолтный сайт если он есть
rm -f /etc/nginx/sites-enabled/default

# Проверяем конфигурацию nginx
nginx -t

# Перезагружаем nginx
systemctl reload nginx

echo "=== ФРСК сайт развёрнут на http://$DOMAIN ==="
echo "=== Статические файлы находятся в $APP_DIR/build ==="






