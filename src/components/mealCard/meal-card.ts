import { Component, computed, input } from '@angular/core';
import { Meal, Meals } from '../../weekPeek/types';
import { MealSelectionService, MealType } from '../../injectors/meal-selection';

@Component({
  selector: 'meal-card',
  standalone: true,
  templateUrl: './meal-card.html',
})
export class MealCard {
  date = input.required<number>();
  meals = input.required<Meals | undefined>();
  readonly formattedMeals = computed(() => {
    const meals = this.meals();
    if (!meals) return [];

    return Object.entries(meals).map(([k, v]) => [k.toUpperCase(), v] as const);
  });

  constructor(private mealService: MealSelectionService) {}

  selectMeal(type: string, meal: Meal) {
    this.mealService.select({
      date: this.date(),
      type: type as MealType,
      meal: meal,
    });
  }
}
