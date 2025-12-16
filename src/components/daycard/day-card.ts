import { Component, input } from '@angular/core';
import { ClientDay } from '../../weekPeek/util';

@Component({
  selector: 'day-card',
  standalone: true,
  templateUrl: './day-card.html',
})
export class DayCard {
  week = input.required<ClientDay | undefined>();

  getDate() {
    if (this.week() === undefined) return '';
    return new Date(this.week()![0]).toISOString();
  }

  getMeals() {
    if (this.week() === undefined) return '';
    return JSON.stringify(this.week()![1]?.meals);
  }
}
