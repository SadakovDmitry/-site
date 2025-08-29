import director from "../../images/AboutFondPage/people/director.png";

function Card() {
  return (
    <div className="card">
      <div className="border">
        <img src={director} alt="Директор" />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="text">
      <h2>Директор</h2>
      <h1>
        ИВАНОВ
        <br />
        Иван Иванович
      </h1>
      <div className="block">
        <p className="left comma">&laquo;</p>
        <div className="info">
          Космос — это не только вызов, но и шанс: расширяя <br /> горизонты
          науки и техники, мы расширяем горизонты <br />
          самого человека. Наша задача — помочь тем, кто создает <br />
          будущее, чтобы однажды человечество сказало: звезды <br />
          стали ближе, потому что мы верили и действовали вместе
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
      <Card></Card>
      <Text></Text>
    </div>
  );
}

export default Director;
