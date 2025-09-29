import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
`;

const PlaceholderImage = styled.img`
  position: relative;
  width: 100%;
  height: auto;
  object-fit: contain;
  z-index: 1;
  transition: opacity 0.3s ease;
`;

const StyledVideo = styled.video`
  position: relative;
  width: 100%;
  height: auto;
  object-fit: contain;
  z-index: 2;
  transition: opacity 0.3s ease;
`;

const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 3;

  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

const OptimizedVideo = ({
    videoSrc,
    placeholderImage,
    videoLoaded,
    imageLoaded,
    showVideo,
    onVideoLoad
}) => {
    return (
        <VideoContainer>
            {/* Placeholder изображение */}
            <AnimatePresence>
                {imageLoaded && !showVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <PlaceholderImage
                            src={placeholderImage}
                            alt="Placeholder"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Видео */}
            <AnimatePresence>
                {showVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <StyledVideo
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            onLoadedData={onVideoLoad}
                        >
                            <source src={videoSrc} type="video/mp4" />
                        </StyledVideo>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Спиннер загрузки */}
            <AnimatePresence>
                {!videoLoaded && !imageLoaded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <LoadingSpinner />
                    </motion.div>
                )}
            </AnimatePresence>
        </VideoContainer>
    );
};

export default OptimizedVideo;
