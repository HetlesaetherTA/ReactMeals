import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useState, useEffect, useCallback } from "react";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const getMeals = useCallback(async () => {
    let response;
    // try to fetch API json file
    try {
      response = await fetch(
        process.env.REACT_APP_DB_GET_URL
        );

      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }

      setMeals(await response.json());

    } catch (error) {
      setHttpError(error.message);
      setIsLoading(false);
    }

    setIsLoading(false);
  }, [setMeals]);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      id={meal.id}
    />
  ));

  useEffect(() => {
    getMeals();
  }, [getMeals]);

  return (
    <section className={styles.meals}>
      {isLoading ? (
        <p style={{ textAlign: "center", color: "white" }}>Loading...</p>
      ) : httpError ? (
        <p style={{ textAlign: "center", color: "red" }}>{httpError}</p>
      ) : (
        <Card>{mealsList}</Card>
      )}
    </section>
  );
};

export default AvailableMeals;
