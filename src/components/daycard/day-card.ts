import { Component, computed, input } from '@angular/core';
import { ClientDay } from '../../weekPeek/util';
import { MealCard } from '../mealCard/meal-card';

@Component({
  selector: 'day-card',
  standalone: true,
  templateUrl: './day-card.html',
  imports: [MealCard],
})
export class DayCard {
  day = input.required<ClientDay>();
  date = computed(() => {
    return new Date(this.day()[0]).toLocaleDateString();
  });
}
