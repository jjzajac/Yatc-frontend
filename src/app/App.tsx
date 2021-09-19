import React, { useMemo } from 'react';
import { Provider, useSelector } from 'react-redux';
import { useSocket } from '../hooks/useChatMessage';
import { Card } from '../components/Card';
import { RootState, store } from '../redux/store';

function AppChat() {
  const { messages } = useSocket('http://localhost:5000');

  const users = useSelector((state:RootState) => state.user.users);

  const mm = useMemo(() => messages.map((m) => ({
    user: users.find((u) => u.id === m.userId)!,
    ...m,
  })),
  [users, messages]);

  return (
    <div className="flex flex-col items-center m-2 border border-black">
      <p>CHAT!</p>
      {mm.length !== 0 && mm.map((x) => (<Card key={x.id} elem={x} />))}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppChat />
    </Provider>
  );
}

export default App;
