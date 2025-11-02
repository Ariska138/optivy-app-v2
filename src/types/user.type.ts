export interface User {
  id: number;
  username: string;
  role: 'admin' | 'customer';
  name: string;
  status: string;
}