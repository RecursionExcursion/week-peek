import { IWeekPeekService, WeekPeekService } from '../weekPeek/week-peek';
import { User } from '../weekPeek/types';
import { createZipStore } from '../lib/zip-store';

class LocalUserService implements IWeekPeekService {
  private zipStore = createZipStore<{ user: User }>();
  async getUser(id: string) {
    try {
      const usr = await this.zipStore.get('user');
      return id === usr?.id ? usr : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async saveUser(usr: User) {
    try {
      await this.zipStore.save('user', usr);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

export const userService = new WeekPeekService(new LocalUserService());
