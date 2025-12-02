import { WORDPRESS_CONFIG, getImageUrl, formatDate } from '../config/wordpress';

// Функция для очистки HTML тегов (получение plain-text)
const cleanHtml = (html) => {
    if (!html) return '';
    return html
        .replace(/<\/?[^>]+(>|$)/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};

// Функция для декодирования HTML-сущностей
const decodeHtmlEntities = (text) => {
    if (!text) return '';

    // Создаем временный элемент для декодирования
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
};

export const wordpressApi = {
    // Получить все новости (записи с категорией "Новости" - ID 57498)
    async getNews() {
        try {
            const response = await fetch(`${WORDPRESS_CONFIG.API_URL}/posts?per_page=${WORDPRESS_CONFIG.NEWS.PER_PAGE}&_embed&categories=57498`);
            const posts = await response.json();

            return posts.map(post => ({
                id: post.id,
                title: decodeHtmlEntities(post.title.rendered),
                content: post.content?.rendered || '',
                contentPlain: cleanHtml(post.content?.rendered),
                excerpt: cleanHtml(post.excerpt.rendered),
                date: formatDate(post.date),
                featuredImage: post.jetpack_featured_media_url || getImageUrl(post._embedded?.['wp:featuredmedia']?.[0]?.source_url),
                slug: post.slug,
                link: post.link
            }));
        } catch (error) {
            console.error('Error fetching news:', error);
            return [];
        }
    },

    // Получить события (записи с категорией "События" - ID 36172)
    async getEvents() {
        try {
            const response = await fetch(`${WORDPRESS_CONFIG.API_URL}/posts?per_page=50&_embed&categories=36172`);
            const posts = await response.json();
            console.log(`API: Получено ${posts.length} событий из WordPress`);

            return posts.map(post => {
                const rawContent = post.content.rendered;

                // Парсим поля из исходного контента (исправленные регулярные выражения)
                const addressMatch = rawContent.match(/(\[АДРЕС\]|АДРЕС\])\s*([^<\n]+)/);
                const eventDateMatch = rawContent.match(/(\[ДАТА\]|ДАТА\])\s*([^<\n]+)/);
                const descriptionMatch = rawContent.match(/(\[ОПИСАНИЕ\]|ОПИСАНИЕ\])\s*([\s\S]*?)(?=\[|<\/p>|$)/);

                return {
                    id: post.id,
                    title: decodeHtmlEntities(post.title.rendered),
                    address: addressMatch ? cleanHtml(addressMatch[2].trim()) : 'Адрес не указан',
                    eventDate: eventDateMatch ? cleanHtml(eventDateMatch[2].trim()) : 'Дата не указана',
                    description: descriptionMatch ? cleanHtml(descriptionMatch[2].trim()) : cleanHtml(post.excerpt.rendered),
                    date: formatDate(post.date),
                    featuredImage: post.jetpack_featured_media_url || getImageUrl(post._embedded?.['wp:featuredmedia']?.[0]?.source_url),
                    slug: post.slug,
                    link: post.link
                };
            });
        } catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    },

    // Получить событие по ID
    async getEventById(id) {
        try {
            const response = await fetch(`${WORDPRESS_CONFIG.API_URL}/posts/${id}?_embed`);
            const post = await response.json();

            const rawContent = post.content.rendered;

            // Парсим поля из исходного контента
            const addressMatch = rawContent.match(/(\[АДРЕС\]|АДРЕС\])\s*([^<\n]+)/);
            const eventDateMatch = rawContent.match(/(\[ДАТА\]|ДАТА\])\s*([^<\n]+)/);
            const descriptionMatch = rawContent.match(/(\[ОПИСАНИЕ\]|ОПИСАНИЕ\])\s*([\s\S]*?)(?=\[|<\/p>|$)/);

            return {
                id: post.id,
                title: decodeHtmlEntities(post.title.rendered),
                address: addressMatch ? cleanHtml(addressMatch[2].trim()) : 'Адрес не указан',
                eventDate: eventDateMatch ? cleanHtml(eventDateMatch[2].trim()) : 'Дата не указана',
                description: descriptionMatch ? cleanHtml(descriptionMatch[2].trim()) : cleanHtml(post.excerpt.rendered),
                date: formatDate(post.date),
                featuredImage: post.jetpack_featured_media_url || getImageUrl(post._embedded?.['wp:featuredmedia']?.[0]?.source_url),
                slug: post.slug,
                link: post.link
            };
        } catch (error) {
            console.error('Error fetching event by ID:', error);
            return null;
        }
    },

    // Получить одну новость по ID
    async getNewsById(id) {
        try {
            const response = await fetch(`${WORDPRESS_CONFIG.API_URL}/posts/${id}?_embed`);
            const post = await response.json();

            return {
                id: post.id,
                title: decodeHtmlEntities(post.title.rendered),
                content: post.content?.rendered || '',
                contentPlain: cleanHtml(post.content?.rendered),
                excerpt: cleanHtml(post.excerpt.rendered),
                date: formatDate(post.date),
                featuredImage: post.jetpack_featured_media_url || getImageUrl(post._embedded?.['wp:featuredmedia']?.[0]?.source_url),
                slug: post.slug,
                link: post.link
            };
        } catch (error) {
            console.error('Error fetching news by ID:', error);
            return null;
        }
    },

    // Получить новости с пагинацией
    async getNewsWithPagination(page = 1, perPage = 6) {
        try {
            const response = await fetch(`${WORDPRESS_CONFIG.API_URL}/posts?page=${page}&per_page=${perPage}&_embed`);
            const posts = await response.json();

            return posts.map(post => ({
                id: post.id,
                title: decodeHtmlEntities(post.title.rendered),
                content: post.content?.rendered || '',
                contentPlain: cleanHtml(post.content?.rendered),
                excerpt: cleanHtml(post.excerpt.rendered),
                date: formatDate(post.date),
                featuredImage: post.jetpack_featured_media_url || getImageUrl(post._embedded?.['wp:featuredmedia']?.[0]?.source_url),
                slug: post.slug,
                link: post.link
            }));
        } catch (error) {
            console.error('Error fetching news with pagination:', error);
            return [];
        }
    }
};
