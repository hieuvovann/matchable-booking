export interface SessionResponse {
  id: number;
  name: string;
  trainers: {
    id: number;
    name: string;
    costPerHour: number;
  }[];
}
