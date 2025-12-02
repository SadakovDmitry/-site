function Card() {
  return (
    <div className="card">
      <div className="border">
        {/* Фотография директора убрана */}
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="text">
      <h2>Директор</h2>
      <h1>
        НУГМАНОВ
        <br />
        Рустам Ренатович
      </h1>
      <div className="block">
        <p className="left comma">&laquo;</p>
        <div className="info">
          Космос — это пространство, которое требует от людей максимальных усилий, оно
          объединяет и отставляет в сторону политические разногласия, это вызов для
          человечества. Нашей страной очень много сделано для развития космонавтики, это
          первенство необходимо популяризировать и укреплять.
        </div>
        <p className="right comma">&raquo;</p>
      </div>
    </div>
  );
}

function Director() {
  return (
    <div className="Director">
      <div className="shadow"></div>
      <div style={{ display: 'none' }}><Card></Card></div>
      <Text></Text>
    </div>
  );
}

export default Director;
