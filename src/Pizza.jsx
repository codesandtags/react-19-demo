const Pizza = ({ name, description, image }) => {
  return (
    <div className="pizza">
      <h1>{name}</h1>
      <p>{description}</p>
      <img src={image} alt="" />
    </div>
  );
};

export default Pizza;
