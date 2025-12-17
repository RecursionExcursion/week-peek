import { Component, computed, input, output } from '@angular/core';
import { MealSelectionService, SelectedMeal } from '../../injectors/meal-selection';
import { PenIcon } from '../icons/pen-icon';
import { XIcon } from '../icons/x-icon';
import { SaveIcon } from '../icons/save-icon';
import { AddIcon } from '../icons/add-icon';

@Component({
  selector: 'meal-editor',
  standalone: true,
  templateUrl: './meal-editor.html',
  imports: [PenIcon, XIcon, SaveIcon, AddIcon],
})
export class MealEditor {
  close = output<void>();
  iconSize = 18;

  readonly selectedMeal = computed(() => this.mealService.selectedMeal());

  meals = computed(() => {
    const mealServ = this.selectedMeal();
    if (!mealServ) return [];
    const meals = mealServ.meal;
    return meals;
  });
  date = computed(() => {
    const mealServ = this.selectedMeal();
    if (!mealServ) return '';
    return new Date(mealServ.date).toLocaleDateString();
  });
  type = computed(() => {
    const mealServ = this.selectedMeal();
    if (!mealServ) return '';
    const t = mealServ.type;
    return t[0].toUpperCase() + t.slice(1).toLowerCase();
  });

  constructor(protected mealService: MealSelectionService) {}
}
