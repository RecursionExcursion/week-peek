import { Component, computed, input } from '@angular/core';
import { DayClass, MealType } from '../../weekPeek/types';
import { MealSelectionService } from '../../injectors/meal-selection';
import { ClientDay } from '../../weekPeek/util';

@Component({
  selector: 'meal-card',
  standalone: true,
  templateUrl: './meal-card.html',
})
export class MealCard {
  cd = input.required<ClientDay>();

  readonly formattedMeals = computed(() => {
    const mapToItems = (type: string) => {
      const day = this.cd()[1];
      const meal = day?.meals?.[type];
      const itemStrings = meal?.items.map((itm) => itm.name) ?? [];
      return itemStrings;
    };

    return {
      breakfast: {
        title: 'Breakfast',
        meal: mapToItems('breakfast'),
      },
      lunch: {
        title: 'Lunch',
        meal: mapToItems('lunch'),
      },
      dinner: {
        title: 'Dinner',
        meal: mapToItems('dinner'),
      },
    };
  });

  constructor(private mealService: MealSelectionService) {}

  select(mealType: MealType) {
    const [date, day = DayClass.newDay()] = this.cd();

    if (day) {
      this.mealService.select({
        date: date,
        type: mealType,
        meal: day.meals[mealType],
      });
    }
  }
}
