import { useState, useEffect, useRef } from 'react';

// Импорт всех видео
import mainVideo from '../ФСРК видео/handshake-thank-you-and-business-people-meeting-f-4k-2025-08-28-14-53-46-utc_1.mp4';
import newsVideo from '../ФСРК видео/abstract-news-background-v3-2025-08-29-09-52-49-utc (video-converter.com).mp4';
import contactVideo from '../ФСРК видео/handshake-thank-you-and-business-people-meeting-f-4k-2025-08-28-14-53-46-utc.mp4';
import fondVideo from '../ФСРК видео/rocket-launch-2025-08-29-11-13-57-utc.mp4';

// Импорт placeholder изображений
import eventsMainImage from '../images/EventsPage/events_main.png';
import newsMainImage from '../images/NewsPage/main_image.png';
import contactMainImage from '../images/ContactPage/video_contact.png';
import aboutFondImage from '../images/AboutFondPage/pre_load_photo_about.png';

export const videoSources = {
    main: mainVideo,
    events: mainVideo,
    news: newsVideo,
    contact: contactVideo,
    fond: fondVideo
};

export const placeholderImages = {
    events: eventsMainImage,
    news: newsMainImage,
    contact: contactMainImage,
    fond: aboutFondImage
};

// Глобальный кэш для предзагруженных видео и изображений
const preloadCache = {
    videos: new Map(),
    images: new Map()
};

export const useVideoPreloader = (pageType) => {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;

        const videoSrc = videoSources[pageType] || videoSources.main;
        const imageSrc = placeholderImages[pageType] || placeholderImages.events;

        // Проверяем, загружено ли уже видео
        if (preloadCache.videos.has(videoSrc)) {
            setVideoLoaded(true);
            setShowVideo(true);
        }

        // Проверяем, загружено ли уже изображение
        if (preloadCache.images.has(imageSrc)) {
            setImageLoaded(true);
        }

        // Предзагрузка placeholder изображения
        const preloadImage = () => {
            if (preloadCache.images.has(imageSrc)) {
                setImageLoaded(true);
                return;
            }

            const img = new Image();
            img.onload = () => {
                if (mountedRef.current) {
                    preloadCache.images.set(imageSrc, true);
                    setImageLoaded(true);
                }
            };
            img.src = imageSrc;
        };

        // Предзагрузка видео
        const preloadVideo = () => {
            if (preloadCache.videos.has(videoSrc)) {
                setVideoLoaded(true);
                setShowVideo(true);
                return;
            }

            const video = document.createElement('video');
            video.preload = 'auto';
            video.muted = true;

            video.onloadeddata = () => {
                if (mountedRef.current) {
                    preloadCache.videos.set(videoSrc, true);
                    setVideoLoaded(true);
                    // Показываем видео только после полной загрузки
                    setTimeout(() => {
                        if (mountedRef.current) {
                            setShowVideo(true);
                        }
                    }, 100);
                }
            };

            video.onerror = () => {
                console.warn('Video failed to load, showing placeholder');
                if (mountedRef.current) {
                    setVideoLoaded(true);
                    setShowVideo(false);
                }
            };

            video.src = videoSrc;
        };

        // Начинаем загрузку
        preloadImage();
        preloadVideo();

        // Очистка при размонтировании
        return () => {
            mountedRef.current = false;
        };
    }, [pageType]);

    return {
        videoLoaded,
        imageLoaded,
        showVideo,
        placeholderImage: placeholderImages[pageType] || placeholderImages.events,
        videoSrc: videoSources[pageType] || videoSources.main
    };
};
