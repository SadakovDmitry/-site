import { WORDPRESS_CONFIG, getImageUrl, formatDate } from '../config/wordpress';

export const wordpressApi = {
    // Получить все новости
    async getNews() {
        try {
            const response = await fetch(`${WORDPRESS_CONFIG.API_URL}/posts?per_page=${WORDPRESS_CONFIG.NEWS.PER_PAGE}&_embed`);
            const posts = await response.json();

            return posts.map(post => ({
                id: post.id,
                title: post.title.rendered,
                content: post.content.rendered,
                excerpt: post.excerpt.rendered,
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

    // Получить одну новость по ID
    async getNewsById(id) {
        try {
            const response = await fetch(`${WORDPRESS_CONFIG.API_URL}/posts/${id}?_embed`);
            const post = await response.json();

            return {
                id: post.id,
                title: post.title.rendered,
                content: post.content.rendered,
                excerpt: post.excerpt.rendered,
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
                title: post.title.rendered,
                content: post.content.rendered,
                excerpt: post.excerpt.rendered,
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
