export interface NewTransaction {
  type: string;
  amount: string;
  id: number;
  description?: string;
  date: string;
}
