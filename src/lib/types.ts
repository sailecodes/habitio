export type TServerActionResult = {
  success: boolean;
  error?: string;
  data?: any;
};

export type THabit = {
  id: string;
  name: string;
  streak: number;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
};
