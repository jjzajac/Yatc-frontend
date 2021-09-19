import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import { ChatMessage, chatMesstoCMess } from '../model/ChatMessage';
import { CMessage } from '../model/CMessage';
import { addUser } from '../redux/slice/userSlice';
import { AppDispatch, store } from '../redux/store';
import { formatTimestamp } from './formatTimestamp';

const init :ChatMessage[] = [
  {
    id: '1',
    user: {
      id: 'test',
      avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/60d8aff8-d8e6-4582-aafc-8ae2d14363be-profile_image-300x300.png',
      brodcaster: true,
      displayName: 'undefinedrabbit',
      username: 'undefinedrabbit',
      isLurking: true,
    },
    message: 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest',
    timestamp: '1629990716703',
  }, {
    id: '2',
    user: {
      id: 'test1',
      isLurking: false,
      brodcaster: false,
      username: 'undefinedrabbit',
      displayName: 'undefinedrabbit',
    },
    message: 'new',
    timestamp: '1629990716703',
  },
];

const initT :CMessage[] = [
  {
    id: '1',
    userId: 'test',
    message: 'test',
    timestamp: '1629990716703',
  }, {
    id: '2',
    userId: 'test1',
    message: 'new',
    timestamp: '1629990716703',
  },
];

const useChatMessage = () => {
  const [cMessages, setCMessages] = useState<CMessage[]>(initT);
  const { dispatch } = store;

  const setMessages = (mess:ChatMessage):void => {
    console.log(mess);
    dispatch(addUser(mess.user));
    setCMessages((prevState) => [...prevState, chatMesstoCMess(mess)]);
  };
  const clear = () => setCMessages([]);

  return { messages: cMessages, setMessages, clear };
};

export const useSocket = (url: string) => {
  const { messages: c, setMessages: setC } = useChatMessage();
  const [messages, setMessages] = useState<ChatMessage[]>(init);

  const ref = useRef<Socket>();

  useEffect(() => {
    ref.current = io(url);
    ref.current.on('connect', () => {
      console.log('Connected');

      ref.current!.on('events_messages', (data:ChatMessage) => {
        setC(formatTimestamp(data));
        setMessages((prev) => [...prev, formatTimestamp(data)]);
      });

      // ref.current!.on('events_users', (data:ChatMessage) => {
      //   setC(formatTimestamp(data));
      //   setMessages((prev) => [...prev, formatTimestamp(data)]);
      // });

      ref.current!.on('clear', () => {
        setMessages([]);
        // clear();
      });
    });
  }, []);

  return ({
    messages: c,
  });
};
