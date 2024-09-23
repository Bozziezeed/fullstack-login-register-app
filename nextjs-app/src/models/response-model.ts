export type Base_Response = {
  success: boolean;
  message: string;
  data?: User;
};

export type User = {
  id: number;
  name: string;
  email: string;
};
