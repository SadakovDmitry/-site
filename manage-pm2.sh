#!/bin/bash

# Скрипт для управления ФРСК сайтом через PM2
# Использование: ./manage-pm2.sh [start|stop|restart|status|logs|update]

set -e

COMMAND=${1:-help}
APP_NAME="frsrk-website"
APP_DIR="/var/www/sites/$APP_NAME"

case $COMMAND in
    start)
        echo "▶️ Запускаем ФРСК сайт через PM2..."
        cd "$APP_DIR"
        pm2 start npm --name "$APP_NAME" -- run serve
        pm2 save
        echo "✅ Сайт запущен"
        ;;
    stop)
        echo "🛑 Останавливаем ФРСК сайт..."
        pm2 stop "$APP_NAME"
        echo "✅ Сайт остановлен"
        ;;
    restart)
        echo "🔄 Перезапускаем ФРСК сайт..."
        pm2 restart "$APP_NAME"
        echo "✅ Сайт перезапущен"
        ;;
    status)
        echo "📊 Статус приложения:"
        pm2 list
        pm2 show "$APP_NAME"
        ;;
    logs)
        echo "📝 Логи приложения:"
        pm2 logs "$APP_NAME" --lines 50
        ;;
    update)
        echo "🔄 Обновляем приложение..."
        cd "$APP_DIR"
        git pull
        npm install
        npm run build
        pm2 restart "$APP_NAME"
        echo "✅ Приложение обновлено"
        ;;
    build)
        echo "🔨 Пересобираем приложение..."
        cd "$APP_DIR"
        npm run build
        pm2 restart "$APP_NAME"
        echo "✅ Приложение пересобрано"
        ;;
    clean)
        echo "🧹 Очищаем неиспользуемые ресурсы PM2..."
        pm2 delete all
        pm2 save
        echo "✅ Очистка завершена"
        ;;
    monitor)
        echo "📊 Запускаем мониторинг PM2..."
        pm2 monit
        ;;
    help|*)
        echo "🔧 Управление ФРСК сайтом через PM2"
        echo ""
        echo "Доступные команды:"
        echo "  start    - Запустить сайт"
        echo "  stop     - Остановить сайт"
        echo "  restart  - Перезапустить сайт"
        echo "  status   - Показать статус"
        echo "  logs     - Показать логи"
        echo "  update   - Обновить приложение"
        echo "  build    - Пересобрать приложение"
        echo "  clean    - Очистить все процессы PM2"
        echo "  monitor  - Запустить мониторинг"
        echo "  help     - Показать эту справку"
        echo ""
        echo "Примеры использования:"
        echo "  ./manage-pm2.sh start"
        echo "  ./manage-pm2.sh logs"
        echo "  ./manage-pm2.sh update"
        ;;
esac


