import { PropsWithChildren } from 'react';
import Realm from 'realm';
import { RealmProvider, AppProvider, UserProvider } from '@realm/react';
import { Task } from '../models/Task';
import { Text } from 'react-native';
import Login from '../components/Login';

const appId = 'trello-mjcyr';

export default function RealmCustomProvider({ children }: PropsWithChildren) {
  return (
    <AppProvider id={appId}>
      <UserProvider fallback={Login}>
        <RealmProvider schema={[Task]}>{children}</RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
