import { useState, useEffect } from "react";
import Pizza from "./Pizza";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("S");
  const [loading, setLoading] = useState(true);

  async function fetchPizzaTypes() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 10000)); // 10 second delay
    const pizzaRes = await fetch("/api/pizzas");
    const pizzaJson = await pizzaRes.json();

    console.info({
      pizzaJson,
    });

    setPizzaTypes(pizzaJson);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
  }

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form action="">
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              name="pizza-type"
              id="pizza-type"
              value={pizzaType}
              onChange={(e) => setPizzaType(e.target.value)}
            >
              {/* <option value="pepperoni">Pepperoni Pizza</option>
              <option value="hawaiian">Hawaiian Pizza</option>
              <option value="big_meat">Big Meat Pizza</option> */}
              {pizzaTypes.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              <span>
                <input
                  checked={pizzaSize === "S"}
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "M"}
                  type="radio"
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "L"}
                  type="radio"
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
        </div>
        <div>
          <Pizza
            name={pizzaType}
            description="The delicious one"
            image="/public/pizzas/pepperoni.webp"
          />
        </div>
      </form>
    </div>
  );
}
