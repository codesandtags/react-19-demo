const DEFAULT_IMAGE = "https://picsum.photos/200";

const Pizza = ({ name, description, image }) => {
  return (
    <div className="pizza">
      <h1>{name}</h1>
      <p>{description}</p>
      <img src={image ? image : DEFAULT_IMAGE} alt={name} />
    </div>
  );
};

export default Pizza;
