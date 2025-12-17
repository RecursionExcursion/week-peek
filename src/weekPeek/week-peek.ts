import { User } from './types';

export interface IWeekPeekService {
  getUser: (id: string) => Promise<User | undefined>;
  saveUser: (usr: User) => Promise<boolean>;
  login?: (un: string, pw: string) => Promise<string | undefined>;
}

export class WeekPeekService {
  constructor(private service: IWeekPeekService) {}

  getUser = async (id: string) => this.service.getUser(id);
  saveUser = async (usr: User) => this.service.saveUser(usr);
}
