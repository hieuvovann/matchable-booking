export interface Cart {
  sessionType: string;
  sessionId: string;
  startDate: string;
  endTime: string;
  trainer: string;
  trainerId: string;
  duration: number;
  price: number;
}

export interface Trainer {
  id: string;
  name: string;
  price?: number;
  costPerHour?: number;
};

export interface Session {
  id: string;
  name: string;
  trainers: Trainer[];
}

export interface Booking {
  id: string;
  session: Session;
  trainer: Trainer;
  startDate: string;
  duration: number;
  price: number;
}