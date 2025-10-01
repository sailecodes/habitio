import { THabit } from "./types";

export interface IHabits {
  habitsData: THabit[];
}

export interface IHabitsHeader {
  setHabits: React.Dispatch<React.SetStateAction<THabit[]>>;
}

export interface IHabitsNewForm {
  setHabits: React.Dispatch<React.SetStateAction<THabit[]>>;
}

export interface IHabitsCarousel {
  habits: THabit[];
}

export interface IHabitsCard {
  id: string;
  name: string;
  streak: number;
  startDate: string;
}
