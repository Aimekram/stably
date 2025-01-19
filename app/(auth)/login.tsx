import { Stack } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';

import { Button } from '~/components/Button';
import { createEmailFromUsername } from '~/utils/createEmailFromUsername';
import { supabase } from '~/utils/supabase';

const TAB_TITLE = 'Logowanie';
const SIGN_IN_TEXT = 'Zaloguj się';
const USERNAME_TEXT = 'Nazwa użytkownika';
const USERNAME_PLACEHOLDER = 'Użytkownik123';
const PASSWORD_TEXT = 'Hasło';
const PASSWORD_PLACEHOLDER = '••••••';

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const fakeEmail = createEmailFromUsername(username);

  async function signInWithUsername() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: fakeEmail,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View className="flex-1 gap-6 bg-white p-5 pt-10">
      <Stack.Screen options={{ title: TAB_TITLE }} />
      <View className="relative">
        <Text className="text-md absolute left-3 top-[-10px] z-10 bg-white px-2 font-semibold text-gray-600">
          {USERNAME_TEXT}
        </Text>
        <TextInput
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder={USERNAME_PLACEHOLDER}
          autoCapitalize="none"
          className="rounded-md border border-indigo-200 bg-white px-3 py-6"
        />
      </View>
      <View className="relative">
        <Text className="text-md absolute left-3 top-[-10px] z-10 bg-white px-2 font-semibold text-gray-600">
          {PASSWORD_TEXT}
        </Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          placeholder={PASSWORD_PLACEHOLDER}
          autoCapitalize="none"
          className="rounded-md border border-indigo-200 bg-white px-3 py-6"
        />
      </View>
      <View>
        <Button title={SIGN_IN_TEXT} disabled={loading} onPress={() => signInWithUsername()} />
      </View>
    </View>
  );
}
