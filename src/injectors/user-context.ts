import { Injectable, signal } from '@angular/core';
import { DayClass, Item, ItemClass, MealType, User, UserClass } from '../weekPeek/types';
import { userService } from '../service/user-service';

@Injectable()
export class UserContext {
  user = signal<User | null>(null);

  set(usr: User) {
    this.user.set(usr);
  }

  clear() {
    this.user.set(null);
  }

  getUser(id: string) {
    return userService.getUser(id);
  }

  async saveUser(usr: User) {
    try {
      const res = await userService.saveUser(usr);
      if (res) {
        this.user.set(structuredClone(usr));
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  addMealItem(date: number, type: MealType, item: string) {
    const usr = this.user();
    if (!usr) return;
    const copy = structuredClone(usr);
    const day = copy.days[date] ?? DayClass.newDay();
    DayClass.addMealItem(day, type, ItemClass.newItem(item));
    copy.days[date] = day;
    this.saveUser(copy);
  }
  
  updateMealItem(args: { date: number; item: Item; mealType: MealType }) {
    const usr = this.user();
    if (!usr) return;
    const copy = structuredClone(usr);
    UserClass.set(copy).item(args.date, args.mealType, args.item);
    this.saveUser(copy);
  }

  deleteMealItem(id: string) {
    const usr = this.user();
    if (!usr) return;
    const copy = structuredClone(usr);
    //Find item and map to params needed
    const item = Object.entries(copy.days)
      .flatMap((d) =>
        Object.entries(d[1].meals).flatMap((m) =>
          m[1].items.map((i) => {
            return {
              date: parseInt(d[0]),
              type: m[0] as MealType,
              items: i,
            };
          })
        )
      )
      .find((item) => item.items.id === id);

    if (item) {
      const day = copy.days[item.date];
      if (day) {
        DayClass.removeMealItem(day, item.type, item.items.id);
        copy.days[item.date] = day;
        this.saveUser(copy);
      }
    }
  }
}
