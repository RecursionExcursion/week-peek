import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DayCard } from '../components/dayCard/day-card';
import { mockUser } from '../weekPeek/mock';
import { getWeek } from '../weekPeek/util';
import { BigArrowRight } from '../components/icons/big-arrow-right';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DayCard, BigArrowRight],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('week-peek');
  protected readonly user = signal(mockUser);
  protected readonly date = signal(new Date(Date.now()));

  week = signal(getWeek(this.user(), this.date()));

  constructor() {}

  weekForward() {
    const newDate = new Date(this.date());
    newDate.setDate(newDate.getDate() + 7);
    this.date.set(newDate);
    this.week.set(getWeek(this.user(), newDate));
  }

  weekBackward() {
    const newDate = new Date(this.date());
    newDate.setDate(newDate.getDate() - 7);
    this.date.set(newDate);
    this.week.set(getWeek(this.user(), newDate));
  }
}
