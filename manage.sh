#!/bin/bash

# Скрипт для управления ФРСК сайтом
# Использование: ./manage.sh [start|stop|restart|status|logs|update]

set -e

COMMAND=${1:-help}
PROJECT_NAME="frsrk-website"

case $COMMAND in
    start)
        echo "▶️ Запускаем ФРСК сайт..."
        docker-compose up -d
        echo "✅ Сайт запущен"
        ;;
    stop)
        echo "🛑 Останавливаем ФРСК сайт..."
        docker-compose down
        echo "✅ Сайт остановлен"
        ;;
    restart)
        echo "🔄 Перезапускаем ФРСК сайт..."
        docker-compose restart
        echo "✅ Сайт перезапущен"
        ;;
    status)
        echo "📊 Статус контейнеров:"
        docker-compose ps
        ;;
    logs)
        echo "📝 Логи приложения:"
        docker-compose logs -f
        ;;
    update)
        echo "🔄 Обновляем приложение..."
        docker-compose down
        docker-compose build --no-cache
        docker-compose up -d
        echo "✅ Приложение обновлено"
        ;;
    clean)
        echo "🧹 Очищаем неиспользуемые ресурсы Docker..."
        docker system prune -f
        docker volume prune -f
        echo "✅ Очистка завершена"
        ;;
    backup)
        echo "💾 Создаем резервную копию..."
        BACKUP_DIR="./backups/$(date +%Y%m%d_%H%M%S)"
        mkdir -p "$BACKUP_DIR"
        docker-compose logs > "$BACKUP_DIR/logs.txt"
        echo "✅ Резервная копия создана в $BACKUP_DIR"
        ;;
    help|*)
        echo "🔧 Управление ФРСК сайтом"
        echo ""
        echo "Доступные команды:"
        echo "  start    - Запустить сайт"
        echo "  stop     - Остановить сайт"
        echo "  restart  - Перезапустить сайт"
        echo "  status   - Показать статус"
        echo "  logs     - Показать логи"
        echo "  update   - Обновить приложение"
        echo "  clean    - Очистить неиспользуемые ресурсы"
        echo "  backup   - Создать резервную копию"
        echo "  help     - Показать эту справку"
        echo ""
        echo "Примеры использования:"
        echo "  ./manage.sh start"
        echo "  ./manage.sh logs"
        echo "  ./manage.sh update"
        ;;
esac


