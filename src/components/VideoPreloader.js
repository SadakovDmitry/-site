import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useResourceHints } from '../hooks/useResourceHints';
import { videoSources, placeholderImages } from '../hooks/useVideoPreloader';

const VideoPreloader = () => {
    const location = useLocation();

    // Больше не предзагружаем все видео на старте, чтобы не перегружать сеть

    // Определяем вероятное следующее видео на основе текущего пути
    const currentPath = location.pathname;
    let nextVideoUrl = videoSources.main;
    if (currentPath === '/events') nextVideoUrl = videoSources.news;
    else if (currentPath === '/news') nextVideoUrl = videoSources.events;
    else if (currentPath === '/contact') nextVideoUrl = videoSources.fond;
    else if (currentPath === '/fond') nextVideoUrl = videoSources.contact;

    // Точечная подсказка: префетч следующего видео и ключевых плейсхолдеров
    useResourceHints(null, [nextVideoUrl], [], [
        placeholderImages.events,
        placeholderImages.news,
        placeholderImages.contact,
        placeholderImages.fond
    ]);

    return null; // Этот компонент не рендерит ничего
};

export default VideoPreloader;
