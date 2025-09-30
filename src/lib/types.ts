export type TServerActionResult = {
  success: boolean;
  error?: string;
  data?: any;
};

export type TProject = {
  id: string;
  habitName: string;
  streak: number;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
};
