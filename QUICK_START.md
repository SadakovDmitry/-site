# ⚡ Быстрый старт - ФРСК сайт

## 🚀 Развертывание за 5 минут

### 1. Подготовка сервера
```bash
# Установка Docker (Ubuntu/Debian)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Установка Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Перезагрузка
sudo reboot
```

### 2. Загрузка проекта
```bash
# Создание директории
mkdir -p /opt/frsrk-website
cd /opt/frsrk-website

# Загрузка файлов (замените на ваш способ)
# Вариант 1: Git
git clone https://github.com/your-repo/frsrk-website.git .

# Вариант 2: SCP
scp -r /path/to/project/* user@server:/opt/frsrk-website/
```

### 3. Запуск
```bash
# Запуск приложения
./deploy.sh

# Проверка статуса
./manage.sh status
```

### 4. Проверка
Откройте браузер и перейдите по адресу: `http://YOUR_SERVER_IP`

## 🔧 Основные команды

| Команда | Описание |
|---------|----------|
| `./deploy.sh` | Полное развертывание |
| `./manage.sh start` | Запуск |
| `./manage.sh stop` | Остановка |
| `./manage.sh restart` | Перезапуск |
| `./manage.sh logs` | Просмотр логов |
| `./manage.sh status` | Статус контейнеров |
| `./manage.sh update` | Обновление |

## 🌐 Настройка домена

1. **DNS**: Создайте A-запись `your-domain.com` → `YOUR_SERVER_IP`
2. **SSL**: `sudo certbot --nginx -d your-domain.com`
3. **Проверка**: Откройте `https://your-domain.com`

## ❗ Если что-то не работает

```bash
# Проверьте логи
./manage.sh logs

# Перезапустите
./manage.sh restart

# Полное переразвертывание
./manage.sh stop
./deploy.sh
```

---
**Готово! Ваш сайт работает! 🎉**
