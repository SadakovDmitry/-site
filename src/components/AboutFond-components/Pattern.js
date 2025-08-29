function Block({ h2, h1, desc, quote, text, img }) {
  return (
    <div className="block">
      {img && <img src={img} />}
      <div className="personDesc">
        {h2 && <h2>{h2}</h2>}
        {h1 && <h1>{h1}</h1>}
        {desc && <p className="desc">{desc}</p>}
        {quote && (
          <div className="qSection">
            <p className="comma left">&laquo;</p>
            <blockquote className="quote">{quote}</blockquote>
            <p className="comma right">&raquo;</p>
          </div>
        )}

        {text && <p className="text">{text}</p>}
      </div>
    </div>
  );
}

function Section({ title, blocks }) {
  return (
    <div className="Section">
      <div className="shadow"></div>
      <h1 className="title">{title}</h1>
      <div className="blocks">
        {blocks.map((block, index) => (
          <Block key={index} {...block} />
        ))}
      </div>
    </div>
  );
}

export default Section;
