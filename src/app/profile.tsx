import { View, Text, Button } from 'react-native';
import { useUser, useAuth } from '@realm/react';

export default function Profile() {
  const user = useUser();
  const { logOut } = useAuth();

  return (
    <View>
      <Text style={{ color: 'white' }}>{user.id}</Text>
      <Button onPress={() => logOut()} title="Sign out" />
    </View>
  );
}
