import { useEffect, useMemo } from 'react';

// Injects <link> hints for current and future page media
// - current video/image: rel=preload as=video/image
// - future video/image: rel=prefetch as=video/image (scheduled in idle time)
export function useResourceHints(
    currentVideoSrc,
    futureVideoSrcs = [],
    currentImageSrcs = [],
    futureImageSrcs = []
) {
    // Мемоизируем строковые представления массивов для правильной работы зависимостей
    const futureVideoSrcsKey = useMemo(() =>
        (futureVideoSrcs || []).filter(Boolean).join(','),
        [futureVideoSrcs]
    );
    const currentImageSrcsKey = useMemo(() =>
        (currentImageSrcs || []).filter(Boolean).join(','),
        [currentImageSrcs]
    );
    const futureImageSrcsKey = useMemo(() =>
        (futureImageSrcs || []).filter(Boolean).join(','),
        [futureImageSrcs]
    );

    useEffect(() => {
        if (!currentVideoSrc && (!currentImageSrcs || currentImageSrcs.length === 0)) return;

        const head = document.head;
        const created = [];

        // Preload current page video
        if (currentVideoSrc) {
            const preloadVideo = document.createElement('link');
            preloadVideo.rel = 'preload';
            preloadVideo.as = 'video';
            preloadVideo.href = currentVideoSrc;
            preloadVideo.crossOrigin = 'anonymous';
            head.appendChild(preloadVideo);
            created.push(preloadVideo);
        }

        // Preload current page critical images (e.g., hero placeholder)
        (currentImageSrcs || []).forEach((src) => {
            if (!src) return;
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            link.crossOrigin = 'anonymous';
            head.appendChild(link);
            created.push(link);
        });

        // Prefetch other page videos in idle time (low priority)
        const schedulePrefetch = () => {
            (futureVideoSrcs || [])
                .filter(Boolean)
                .forEach((src) => {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.as = 'video';
                    link.href = src;
                    link.crossOrigin = 'anonymous';
                    head.appendChild(link);
                    created.push(link);
                });

            (futureImageSrcs || [])
                .filter(Boolean)
                .forEach((src) => {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.as = 'image';
                    link.href = src;
                    link.crossOrigin = 'anonymous';
                    head.appendChild(link);
                    created.push(link);
                });
        };

        if ('requestIdleCallback' in window) {
            // @ts-ignore
            window.requestIdleCallback(schedulePrefetch, { timeout: 2000 });
        } else {
            setTimeout(schedulePrefetch, 500);
        }

        return () => {
            created.forEach((el) => el && el.parentNode && el.parentNode.removeChild(el));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentVideoSrc, futureVideoSrcsKey, currentImageSrcsKey, futureImageSrcsKey]);
}


