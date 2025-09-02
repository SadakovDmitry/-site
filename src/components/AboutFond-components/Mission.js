import mainVideo from '../../ФСРК видео/rocket-launch-2025-08-29-11-13-57-utc.mp4';
import { useVideoPreloader } from '../../hooks/useVideoPreloader';
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

  return (
    <div className="Mission">
      <OptimizedVideo
        videoSrc={mainVideo}
        placeholderImage={aboutFondImage}
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
          background: 'linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
          zIndex: 2
        }}
      />

      <div className="text">
        <h1>Миссия и цели</h1>
        <Block
          h2={"Поддержка научных исследований"}
          p={
            "Фонд обеспечивает финансирование и ресурсную базу для развития передовых космических и смежных научных проектов."
          }
        ></Block>
        <Block
          h2={"Инвестиция в стартапы"}
          p={
            "Организация выступает площадкой для привлечения капитала в технологические инициативы и инновационные компании."
          }
        ></Block>
        <Block
          h2={"Образование и координирование межсекторального сотрудничества"}
          p={
            "Фонд объединяет науку, бизнес и государство через образовательные программы и партнерские проекты."
          }
        ></Block>
      </div>
    </div>
  );
}

export default Mission;
