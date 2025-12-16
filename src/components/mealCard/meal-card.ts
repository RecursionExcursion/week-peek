import { Component, input } from '@angular/core';
import { Meals } from '../../weekPeek/types';

@Component({
  selector: 'meal-card',
  standalone: true,
  templateUrl: './meal-card.html',
})
export class MealCard {
  meals = input.required<Meals | undefined>();

  getMeals() {
    // const m = this.meals();
    // if (m) {
      return Object.entries(this.meals()!);
    // }
  }
}
