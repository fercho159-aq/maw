
const GlitchTitle = ({ text }: { text: string }) => {
  return (
    <h2 className="text-5xl font-bold glitch" data-text={text}>
      <span>{text}</span>
      {text}
      <span>{text}</span>
    </h2>
  );
};

export default GlitchTitle;
