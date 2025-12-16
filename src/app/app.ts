import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DayCard } from '../components/daycard/day-card';
import { mockUser } from '../weekPeek/mock';
import { dateService } from '../service/date-service';
import { Day, User } from '../weekPeek/types';
import { getWeek } from '../weekPeek/util';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DayCard],
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
