import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserContext } from '../../injectors/user-context';
import { SaveIcon } from '../icons/save-icon';
import { CirclePlusIcon } from '../icons/circle-plus-icon';
import { MealSelectionService } from '../../injectors/meal-selection';
import { DayClass } from '../../weekPeek/types';

@Component({
  selector: 'meal-input',
  standalone: true,
  templateUrl: './meal-input.html',
  imports: [ReactiveFormsModule, SaveIcon, CirclePlusIcon],
})
export class MealInput {
  searchCtrl = new FormControl('');
  constructor(protected mealService: MealSelectionService, protected userContext: UserContext) {}
  iconSize = 20;

  ngOnInit() {
    this.searchCtrl.valueChanges.subscribe(async (value) => {
      console.log(value);
    });
  }

  onAdd() {
    try {
      const usr = this.userContext.user();
      const mealService = this.mealService.selectedMeal();
      const newMeal = this.searchCtrl.value;

      if (usr && mealService && newMeal) {
        const { date, type } = mealService;
        this.userContext.addMealItem(date, type, newMeal);
        this.searchCtrl.setValue('');
      }
    } catch (err) {
      console.error(err);
    }
  }

  onSave() {
    console.log('Saved: ', this.searchCtrl.value);
  }
}
