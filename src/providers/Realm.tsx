import { PropsWithChildren } from 'react';
import { RealmProvider, AppProvider, UserProvider } from '@realm/react';
import { Task } from '../models/Task';
import AnonymousLogin from '../components/AnonymousLogin';

const appId = 'trello-mjcyr';

export default function RealmCustomProvider({ children }: PropsWithChildren) {
  return (
    <AppProvider id={appId}>
      <UserProvider fallback={AnonymousLogin}>
        <RealmProvider
          schema={[Task]}
          sync={{
            flexible: true,
            onError: (_session, error) => {
              console.log(error);
            },
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects('Task'));
              },
              rerunOnOpen: true,
            },
          }}
        >
          {children}
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
