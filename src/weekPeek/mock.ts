import { User } from './types';

export const mockUser: User = {
  id: '123',
  username: 'testuser',
  password: 'password123',
  days: {
    1765843200000: {
      meals: {
        breakfast: ['Oatmeal with banana'],
        lunch: ['Grilled chicken salad','Oatmeal with banana'],
        dinner: ['Spaghetti bolognese'],
      },
    },
    1766016000000: {
      meals: {
        breakfast: ['Eggs and toast'],
        lunch: ['Turkey sandwich'],
        dinner: ['Salmon with rice'],
      },
    },
  },
  meals: [
    'Oatmeal with banana',
    'Grilled chicken salad',
    'Spaghetti bolognese',
    'Eggs and toast',
    'Turkey sandwich',
    'Salmon with rice',
  ],
  ingredients: ['oats', 'banana', 'chicken', 'lettuce', 'pasta', 'eggs', 'bread', 'salmon', 'rice'],
  saved: {
    meals: [
      {
        id: '1',
        name: 'Spaghetti bolognese',
        timesUsed: 5,
        lastUsed: 1700000000,
      },
      {
        id: '2',
        name: 'Salmon with rice',
        timesUsed: 2,
      },
    ],
    ingredients: [
      {
        id: '3',
        name: 'chicken',
        timesUsed: 10,
        lastUsed: 1700000500,
      },
      {
        id: '4',
        name: 'rice',
        timesUsed: 7,
      },
    ],
  },
};
