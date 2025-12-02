#!/bin/bash

# Скрипт для развертывания ФРСК сайта на облачном сервере
# Использование: ./deploy.sh [production|staging]

set -e

ENVIRONMENT=${1:-production}
PROJECT_NAME="frsrk-website"
DOCKER_IMAGE="$PROJECT_NAME:$ENVIRONMENT"

echo "🚀 Начинаем развертывание ФРСК сайта в режиме: $ENVIRONMENT"

# Проверяем, что Docker установлен
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен. Установите Docker и попробуйте снова."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose не установлен. Установите Docker Compose и попробуйте снова."
    exit 1
fi

# Останавливаем существующие контейнеры
echo "🛑 Останавливаем существующие контейнеры..."
docker-compose down || true

# Удаляем старые образы (опционально)
echo "🧹 Очищаем старые образы..."
docker image prune -f || true

# Собираем новый образ
echo "🔨 Собираем Docker образ..."
docker-compose build --no-cache

# Запускаем контейнеры
echo "▶️ Запускаем контейнеры..."
docker-compose up -d

# Проверяем статус
echo "📊 Проверяем статус контейнеров..."
docker-compose ps

# Проверяем, что приложение отвечает
echo "🔍 Проверяем доступность приложения..."
sleep 10

if curl -f http://localhost > /dev/null 2>&1; then
    echo "✅ Приложение успешно развернуто и доступно на http://localhost"
else
    echo "⚠️ Приложение может быть еще не готово. Проверьте логи:"
    echo "docker-compose logs"
fi

echo "🎉 Развертывание завершено!"
echo "📝 Для просмотра логов используйте: docker-compose logs -f"
echo "🛑 Для остановки используйте: docker-compose down"






