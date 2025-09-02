import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Импорт всех видео
import mainVideo from '../ФСРК видео/handshake-thank-you-and-business-people-meeting-f-4k-2025-08-28-14-53-46-utc_1.mp4';
import newsVideo from '../ФСРК видео/abstract-news-background-v3-2025-08-29-09-52-49-utc (video-converter.com).mp4';
import contactVideo from '../ФСРК видео/handshake-thank-you-and-business-people-meeting-f-4k-2025-08-28-14-53-46-utc.mp4';
import fondVideo from '../ФСРК видео/rocket-launch-2025-08-29-11-13-57-utc.mp4';

const videoUrls = [mainVideo, newsVideo, contactVideo, fondVideo];

const VideoPreloader = () => {
    const [preloadedVideos, setPreloadedVideos] = useState(new Set());
    const location = useLocation();

    useEffect(() => {
        // Предзагрузка всех видео при загрузке приложения
        videoUrls.forEach((videoUrl) => {
            if (!preloadedVideos.has(videoUrl)) {
                const video = document.createElement('video');
                video.preload = 'auto';
                video.muted = true;

                video.onloadeddata = () => {
                    setPreloadedVideos(prev => new Set([...prev, videoUrl]));
                    console.log(`Video preloaded: ${videoUrl}`);
                };

                video.onerror = () => {
                    console.warn(`Failed to preload video: ${videoUrl}`);
                };

                video.src = videoUrl;
            }
        });
    }, [preloadedVideos]);

    // Предзагрузка видео для следующей страницы при навигации
    useEffect(() => {
        const preloadNextPageVideo = () => {
            const currentPath = location.pathname;
            let nextVideoUrl = mainVideo; // по умолчанию

            if (currentPath === '/events') {
                nextVideoUrl = mainVideo;
            } else if (currentPath === '/news') {
                nextVideoUrl = newsVideo;
            } else if (currentPath === '/contact') {
                nextVideoUrl = contactVideo;
            } else if (currentPath === '/fond') {
                nextVideoUrl = fondVideo;
            }

            if (!preloadedVideos.has(nextVideoUrl)) {
                const video = document.createElement('video');
                video.preload = 'auto';
                video.muted = true;

                video.onloadeddata = () => {
                    setPreloadedVideos(prev => new Set([...prev, nextVideoUrl]));
                };

                video.src = nextVideoUrl;
            }
        };

        preloadNextPageVideo();
    }, [location.pathname, preloadedVideos]);

    return null; // Этот компонент не рендерит ничего
};

export default VideoPreloader;
