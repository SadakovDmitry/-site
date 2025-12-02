import mainVideo from '../../ФСРК видео/converted/rocket-launch-2025-08-29-11-13-57-utc-1080p.mp4';
import { useVideoPreloader } from '../../hooks/useVideoPreloader';
import { useResourceHints } from '../../hooks/useResourceHints';
import OptimizedVideo from '../OptimizedVideo';
import aboutFondImage from '../../images/AboutFondPage/pre_load_photo_about.png';

function Block({ h2, p }) {
  return (
    <div className="block">
      <h2>{h2}</h2>
      <p>{p}</p>
    </div>
  );
}

function Mission() {
  // Хук для предзагрузки видео
  const { videoLoaded, imageLoaded, showVideo } = useVideoPreloader('fond');
  // Подсказки загрузчику: текущее видео preload + критичный плейсхолдер
  useResourceHints(mainVideo, [], [aboutFondImage], []);

  // Блокируем показ, пока не готов контент
  const blockReady = showVideo || imageLoaded;
  return (
    <div className="Mission" style={{ visibility: blockReady ? 'visible' : 'hidden' }}>
      <OptimizedVideo
        videoSrc={mainVideo}
        placeholderImage={null}
        videoLoaded={videoLoaded}
        imageLoaded={imageLoaded}
        showVideo={showVideo}
        onVideoLoad={() => { }}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to left, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0))',
          zIndex: 1
        }}
      />

      <div className="text" style={{ color: '#ffffff' }}>
        <h1 style={{ color: '#ffffff' }}>Миссия и цели</h1>
        <Block
          h2={""}
          p={
            "Популяризация достижений советской и российской космических отраслей."
          }
        ></Block>
        <Block
          h2={""}
          p={
            "Содействие в развитии российской космической отрасли."
          }
        ></Block>
        <Block
          h2={""}
          p={
            "Объединение сообщества экспертов космической отрасли, интеграция лидеров мнений в области космонавтики в социально-значимые и образовательные проекты, способствующие развитию и укреплению технологического лидерства России."
          }
        ></Block>
        <Block
          h2={""}
          p={
            "Профориентация подрастающего поколения на основе передовых достижений науки и техники в космической отрасли, развитие патриотического воспитания молодежи."
          }
        ></Block>
      </div>
    </div>
  );
}

export default Mission;
