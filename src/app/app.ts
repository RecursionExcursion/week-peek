import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DayCard } from '../components/dayCard/day-card';
import { mockUser } from '../weekPeek/mock';
import { getWeek } from '../weekPeek/util';
import { BigArrowRight } from '../components/icons/big-arrow-right-icon';
import { MealSelectionService } from '../injectors/meal-selection';
import { MealEditor } from '../components/mealEditior/meal-editor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DayCard, BigArrowRight, MealEditor],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [MealSelectionService],
})
export class App {
  protected readonly title = 'Week Peek';
  protected readonly user = signal(mockUser);
  protected readonly date = signal(new Date(Date.now()));
  protected readonly buttonSize = 30;

  week = signal(getWeek(this.user(), this.date()));

  constructor(protected mealService: MealSelectionService) {}

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

  selectedMeal() {
    return this.mealService.selectedMeal();
  }

  clearMeal() {
    this.mealService.clear();
  }
}
