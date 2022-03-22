import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All")

  function handleFilterChange(event) {
    setFilterBy(event.target.value);
  }

  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  })

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    const newFoodsAll = [...foods, newFood]
    console.log(newFoodsAll)
    setFoods(newFoodsAll)
  }

  function handleLiClick(foodID) {
    const incHeat = foods.map(food => {
      if (food.id === foodID) {
        return {
          ...food, heatLevel: food.heatLevel + 1
        }
      } else {
        return food
      }
    })

    console.log(incHeat)
    setFoods(incHeat)

    // const removedFood = foods.filter((food) => food.id !== foodID)
    // console.log(removedFood)
    // setFoods(removedFood)
  }

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
