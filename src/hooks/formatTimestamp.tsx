import { ChatMessage } from '../model/ChatMessage';

const t = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'short',
  timeStyle: 'medium',
  timeZone: 'Europe/Warsaw',
});
export const formatTimestamp = (data: ChatMessage) => ({
  ...data,
  timestamp: t.format(new Date(Number(data.timestamp))),
});
