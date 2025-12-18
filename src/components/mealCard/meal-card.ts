import { Component, computed, input } from '@angular/core';
import { MealClass, Day, MealType } from '../../weekPeek/types';
import { MealSelectionService } from '../../injectors/meal-selection';

@Component({
  selector: 'meal-card',
  standalone: true,
  templateUrl: './meal-card.html',
})
export class MealCard {
  date = input.required<number>();
  day = input.required<Day | undefined>();
  readonly formattedMeals = computed(() => {
    const day = this.day();
    return {
      breakfast: {
        title: 'Breakfast',
        meal: day?.meals?.['breakfast'] ?? MealClass.newMeal(),
      },
      lunch: {
        title: 'Lunch',
        meal: day?.meals?.['lunch'] ?? MealClass.newMeal(),
      },
      dinner: {
        title: 'Dinner',
        meal: day?.meals?.['dinner'] ?? MealClass.newMeal(),
      },
    };
  });

  constructor(private mealService: MealSelectionService) {}

  select(mealType: MealType) {
    const fm = this.formattedMeals()[mealType];
    this.mealService.select({
      date: this.date(),
      type: mealType,
      meal: fm.meal,
    });
  }
}
