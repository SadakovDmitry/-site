#!/bin/bash
set -e

# Настройки для ФРСК сайта
APP_NAME="frsrk-website"
DOMAIN="frsrk.ru"  # Замените на ваш домен
BASE_DIR="/var/www/sites"
APP_DIR="$BASE_DIR/$APP_NAME"
REPO="https://github.com/your-username/frsrk-website.git"  # Замените на ваш репозиторий
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

echo "[4] Запускаем через PM2"
if pm2 list | grep -q "$APP_NAME"; then
  pm2 restart "$APP_NAME"
else
  pm2 start npm --name "$APP_NAME" -- run serve
fi
pm2 save

echo "[5] Настройка Nginx"
CONF="/etc/nginx/sites-available/$DOMAIN"
sudo bash -c "cat > $CONF" <<NGX
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

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

    location / {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;

        # Кэширование статических файлов
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            proxy_pass http://127.0.0.1:$PORT;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Безопасность
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
NGX

ln -sf "$CONF" "/etc/nginx/sites-enabled/$DOMAIN"
nginx -t
systemctl reload nginx

echo "=== ФРСК сайт развёрнут на http://$DOMAIN ==="
echo "=== Приложение запущено через PM2 на порту $PORT ==="






