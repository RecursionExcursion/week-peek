export type User = {
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
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
  };
};

export type Meal = string;

type Item = {
  name: string;
  timesUsed?: number;
  lastUsed?: number;
};
