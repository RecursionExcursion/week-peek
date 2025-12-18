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

  getUser = userService.getUser;
  saveUser = userService.saveUser;
}
