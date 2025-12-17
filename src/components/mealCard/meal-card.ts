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
  readonly fm = computed(() => {
    const meals = this.meals();

    return {
      breakfast: {
        title: 'Breakfast',
        meals: meals?.breakfast ?? [],
      },
      lunch: {
        title: 'Lunch',
        meals: meals?.lunch ?? [],
      },
      dinner: {
        title: 'Dinner',
        meals: meals?.dinner ?? [],
      },
    };
  });

  constructor(private mealService: MealSelectionService) {}

  select(mealType: MealType) {
    const meal = this.fm()[mealType];
    this.mealService.select({
      date: this.date(),
      type: mealType,
      meal: meal.meals,
    });
  }
}
