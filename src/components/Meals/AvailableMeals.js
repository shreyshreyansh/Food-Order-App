import { useEffect } from "react";

import { APP_BACKEND_BASE_URL } from "../../constants";
import useApi from "../../hooks/use-api";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const { data: meals, error, isLoading, sendRequest: fetchMeals } = useApi();

  useEffect(() => {
    fetchMeals({
      url: `${APP_BACKEND_BASE_URL}/meals.json`
    });
  }, [fetchMeals]);

  const mealsList = [];
  for (const meal in meals) {
    mealsList.push(
      <MealItem
        id={meal}
        key={meal}
        name={meals[meal].name}
        description={meals[meal].description}
        price={meals[meal].price}
      />
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Something went wrong!</p>
        ) : (
          <ul>{mealsList}</ul>
        )}
      </Card>
    </section>
  );
};

export default AvailableMeals;
