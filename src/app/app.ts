import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DayCard } from '../components/dayCard/day-card';
import { ClientWeek, getWeek } from '../weekPeek/util';
import { BigArrowRight } from '../components/icons/big-arrow-right-icon';
import { MealSelectionService } from '../injectors/meal-selection';
import { MealEditor } from '../components/mealEditior/meal-editor';
import { DuckIcon } from '../components/decorations/duck-icon';
import { BubbleIcon } from '../components/decorations/bubble-icon';
import { userService } from '../service/user-service';
import { User } from '../weekPeek/types';
import { UserContext } from '../injectors/user-context';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DayCard, BigArrowRight, MealEditor, DuckIcon, BubbleIcon],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [MealSelectionService, UserContext],
})
export class App {
  protected readonly title = 'Week Peek';
  protected readonly user = signal<User | null>(null);

  protected readonly date = signal(new Date(Date.now()));
  protected readonly buttonSize = 30;

  week = signal<ClientWeek | undefined>(undefined);

  constructor(protected mealService: MealSelectionService, protected userContext: UserContext) {
    effect(() => {
      userService.getUser('').then((usr) => {
        const user = usr ?? new User();
        this.user.set(user);
        this.week.set(getWeek(user, this.date()));
        this.userContext.set(user);
      });
    });
  }

  paginate(days: number) {
    if (this.user()) {
      const newDate = new Date(this.date());
      newDate.setDate(newDate.getDate() + days);
      this.date.set(newDate);
      this.week.set(getWeek(this.user()!, newDate));
    }
  }

  selectedMeal() {
    return this.mealService.selectedMeal();
  }

  clearMeal() {
    this.mealService.clear();
  }

  getWeekLabel() {
    const startDate = new Date(this.date());
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Get Sunday of the week
    return startDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
}
