import { v4 as uuidv4 } from 'uuid';

export type User = {
  id: string;
  username: string;
  password: string;
  days: Record<number, Day>;
  meals: string[];
  ingredients: string[];
  saved: {
    meals: Item[];
    ingredients: Item[];
  };
};
export class UserClass {
  static newUser(): User {
    return {
      id: '',
      username: '',
      password: '',
      days: {},
      meals: [],
      ingredients: [],
      saved: ({
        meals: [],
        ingredients: [],
      } = {
        meals: [],
        ingredients: [],
      }),
    };
  }
}

export type Day = {
  meals: {
  [key: string]: Meal
}
}
export class DayClass {
  static newDay = (): Day => ({
    meals: {},
  });
  static addMeal(day: Day, type: MealType, meal: string) {
    if (!day.meals[type]) {
      day.meals[type] = MealClass.newMeal();
    }
    day.meals[type].items.push(meal);
    return day;
  }
}

export type MealType = 'breakfast' | 'lunch' | 'dinner';
export type Meal = {
  id: string;
  items: string[];
};
export class MealClass {
  static newMeal = (): Meal => ({
    id: uuidv4(),
    items: [],
  });
}

type Item = {
  id: string;
  name: string;
  timesUsed?: number;
  lastUsed?: number;
};
