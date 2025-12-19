import { Component, computed, output, signal } from '@angular/core';
import { MealSelectionService } from '../../injectors/meal-selection';
import { PenIcon } from '../icons/pen-icon';
import { XIcon } from '../icons/x-icon';
import { SaveIcon } from '../icons/save-icon';
import { AddIcon } from '../icons/add-icon';
import { MealInput } from '../mealInput/meal-input';
import { Item } from '../../weekPeek/types';
import { UserContext } from '../../injectors/user-context';
import { DeleteIcon } from '../icons/delete-icon';
import { CheckIcon } from '../icons/check-icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'meal-editor',
  standalone: true,
  templateUrl: './meal-editor.html',
  imports: [
    PenIcon,
    XIcon,
    SaveIcon,
    AddIcon,
    MealInput,
    DeleteIcon,
    CheckIcon,
    ReactiveFormsModule,
  ],
})
export class MealEditor {
  formMode = signal(false);
  editCtrl = new FormControl('');

  close = output<void>();
  iconSize = 18;
  showAddMeal = signal(false);

  readonly selectedMeal = computed(() => this.mealService.selectedMeal());

  onInput(el: HTMLInputElement) {
    console.log(el.value);
  }

  meals = computed(() => {
    const user = this.userContext.user();
    const sel = this.mealService.selectedMeal();
    if (!user || !sel) return [];
    return user.days[sel.date]?.meals[sel.type]?.items ?? [];
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

  constructor(protected mealService: MealSelectionService, protected userContext: UserContext) {}

  setForm(item: Item) {
    this.editCtrl.setValue(item.name);
    this.formMode.set(true);
  }

  onDelete(item: Item) {
    this.userContext.deleteMealItem(item.id);
  }

  onConfirmEdit(item: Item) {
    const serv = this.mealService.selectedMeal();
    const newVal = this.editCtrl.value;
    if (!serv || !newVal) return;
    const itemCopy = { ...item };
    itemCopy.name = newVal;
    this.userContext.updateMealItem({ item: itemCopy, date: serv.date, mealType: serv.type });
  }
}
