import { User } from './User';

export interface ChatMessage {
  id: string;
  user: User;
  message: string;
  timestamp: string;
}

export const chatMesstoCMess = (mess:ChatMessage) => (
  {
    id: mess.id,
    userId: mess.user.id,
    message: mess.message,
    timestamp: mess.timestamp,
  }
);
