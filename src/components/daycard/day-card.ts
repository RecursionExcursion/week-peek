import { Component, input } from '@angular/core';
import { ClientDay } from '../../weekPeek/util';
import { MealCard } from '../mealCard/meal-card';

@Component({
  selector: 'day-card',
  standalone: true,
  templateUrl: './day-card.html',
  imports: [MealCard],
})
export class DayCard {
  week = input.required<ClientDay | undefined>();

  getDate() {
    if (this.week() === undefined) return '';
    return new Date(this.week()![0]).toLocaleDateString();
  }

  getDay() {
    return this.week()![1] ?? undefined;
  }

  getRawDate() {
    return this.week()?.[0] ?? 0;
  }
}
