export type User = {
  id: string;
  username: string;
  password: string;
  days: Days;
  meals: string[];
  ingredients: string[];
  saved: {
    meals: Item[];
    ingredients: Item[];
  };
};

export type Days = Record<number, Day>;

export type Day = {
  meals: Meals;
};

export type Meals = {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
};
export type Meal = string[];

type Item = {
  id: string;
  name: string;
  timesUsed?: number;
  lastUsed?: number;
};
