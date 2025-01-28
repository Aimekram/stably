import { Stack } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';

import { Button } from '~/components/Button';

// TODO: figure out the registration flow

const TAB_TITLE = 'Utwórz hasło';
const SIGN_UP_TEXT = 'Zapisz';
const USERNAME_TEXT = 'Nazwa użytkownika';
const USERNAME_PLACEHOLDER = 'Użytkownik123';
const PASSWORD_TEXT = 'Nowe hasło';
const PASSWORD_PLACEHOLDER = '••••••';
const PASSWORD_2_TEXT = 'Powtórz hasło';
const PASSWORD_2_PLACEHOLDER = '••••••';
const SAME_PASSWORDS_ERROR = 'Hasła muszą być takie same';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);

  //   const fakeEmail = createEmailFromUsername(username);

  async function setPasswordWithUsername() {
    if (password !== password2) {
      Alert.alert(SAME_PASSWORDS_ERROR);
      setPassword2('');
      return;
    }

    setLoading(true);
    try {
      // check if user already exists
      alert('Feature not implemented yet');
    } catch (error) {
      Alert.alert('Invalid username or user already registered');
    } finally {
      setLoading(false);
    }
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
          className="rounded-md border border-green-200 bg-white px-3 py-6"
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
          className="rounded-md border border-green-200 bg-white px-3 py-6"
        />
      </View>
      <View className="relative">
        <Text className="text-md absolute left-3 top-[-10px] z-10 bg-white px-2 font-semibold text-gray-600">
          {PASSWORD_2_TEXT}
        </Text>
        <TextInput
          onChangeText={(text) => setPassword2(text)}
          value={password2}
          secureTextEntry
          placeholder={PASSWORD_2_PLACEHOLDER}
          autoCapitalize="none"
          className="rounded-md border border-green-200 bg-white px-3 py-6"
        />
      </View>
      <Button
        title={SIGN_UP_TEXT}
        disabled={loading || !username.length || !password.length || !password2.length}
        onPress={() => setPasswordWithUsername()}
      />
    </View>
  );
}
