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
  static get = (user: User) => {
    return {
      day: (date: number) => {
        return Object.entries(user.days).reduce((acc, curr) => {
          //find and map
          if (parseInt(curr[0]) === date) {
            acc = curr[1];
          }
          return acc;
        }, undefined as Day | undefined);
      },
      meal: (date: number, mealType: MealType) => {
        return Object.entries(user.days[date].meals).reduce((acc, curr) => {
          //find and map
          if (curr[0] === mealType) {
            acc = curr[1];
          }
          return acc;
        }, undefined as Meal | undefined);
      },
      item: (id: string) => {
        return Object.entries(user.days)
          .flatMap((d) => Object.entries(d[1].meals).flatMap((m) => m[1].items.map((i) => i)))
          .find((item) => item.id === id);
      },
    };
  };
  static set = (user: User) => {
    return {
      day: (date: number, day: Day) => {
        user.days[date] = day;
      },
      meal: (date: number, mealType: MealType, meal: Meal) => {
        const day = this.get(user).day(date);
        if (!day) return;
        day.meals[mealType] = meal;
      },
    };
  };
}

export type Day = {
  meals: {
    [key: string]: Meal;
  };
};
export class DayClass {
  static newDay = (): Day => ({
    meals: {},
  });
  static addMealItem(day: Day, type: MealType, item: Item) {
    const meal = day.meals[type] ?? MealClass.newMeal();
    meal.items.push(item);
    day.meals[type] = meal;
    return day;
  }
  static removeMealItem(day: Day, mealType: MealType, id: string) {
    day.meals[mealType].items = day.meals[mealType].items.filter((i) => i.id !== id);
    return day;
  }
}

export type MealType = 'breakfast' | 'lunch' | 'dinner';
export type Meal = {
  items: Item[];
};
export class MealClass {
  static newMeal = (): Meal => ({
    items: [],
  });
}

export type Item = {
  id: string;
  name: string;
  timesUsed?: number;
  lastUsed?: number;
};
export class ItemClass {
  static newItem = (name?: string): Item => ({
    id: uuidv4(),
    name: name ?? '',
  });
}
