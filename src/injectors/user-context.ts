import { Injectable, signal } from '@angular/core';
import { User } from '../weekPeek/types';
import { IWeekPeekService } from '../weekPeek/week-peek';
import { userService } from '../service/user-service';

@Injectable()
export class UserContext implements IWeekPeekService {
  user = signal<User | null>(null);

  set(sm: User) {
    this.user.set(sm);
  }

  clear() {
    this.user.set(null);
  }

  getUser(id: string) {
    return userService.getUser(id);
  }

  async saveUser(usr: User) {
    console.log('Saving');

    try {
      const res = await userService.saveUser(usr);
      if (res) {
        this.update((oldUser) => (oldUser = usr));
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  update(mutator: (user: User) => void) {
    const current = this.user();
    if (!current) return;
    const copy = structuredClone(current); 
    mutator(copy);
    this.user.set(copy);
  }
}
