// Конфигурация WordPress API
export const WORDPRESS_CONFIG = {
    // URL вашего WordPress сайта
    API_URL: process.env.REACT_APP_WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2',

    // Настройки для новостей
    NEWS: {
        PER_PAGE: 10, // Количество новостей на странице
        EXCERPT_LENGTH: 150, // Длина краткого описания
        DATE_FORMAT: 'ru-RU' // Формат даты
    },

    // Настройки изображений
    IMAGES: {
        FALLBACK_IMAGE: '/images/fallback-news.jpg', // Изображение по умолчанию
        QUALITY: 'medium' // Качество изображений (thumbnail, medium, large, full)
    }
};

// Функция для получения полного URL изображения
export const getImageUrl = (imageUrl, size = 'medium') => {
    if (!imageUrl) return WORDPRESS_CONFIG.IMAGES.FALLBACK_IMAGE;

    // Если это уже полный URL, возвращаем как есть
    if (imageUrl.startsWith('http')) {
        return imageUrl;
    }

    // Иначе добавляем базовый URL WordPress
    return `${WORDPRESS_CONFIG.API_URL.replace('/wp-json/wp/v2', '')}${imageUrl}`;
};

// Функция для форматирования даты
export const formatDate = (dateString) => {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString(WORDPRESS_CONFIG.NEWS.DATE_FORMAT);
    } catch (error) {
        return dateString;
    }
};
