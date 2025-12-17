import { Injectable, signal } from '@angular/core';
import { Meal } from '../weekPeek/types';

export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface SelectedMeal {
  date: number;
  type: MealType;
  meal: Meal;
}

@Injectable()
export class MealSelectionService {
  selectedMeal = signal<SelectedMeal | null>(null);

  select(sm: SelectedMeal) {
    this.selectedMeal.set(sm);
  }

  clear() {
    this.selectedMeal.set(null);
  }
}
