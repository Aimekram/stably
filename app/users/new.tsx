import { useMutation } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Button } from '~/components/Button';
import { useAuth } from '~/contexts/AuthProvider';
import { AUTH_TEXTS, BTN_TEXTS, TAB_TITLES } from '~/utils/dictionary';
import { queries } from '~/utils/queries';

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 65;

type NewProfileFormValues = {
  username: string;
};

export default function NewProfile() {
  const { userRole } = useAuth();

  const { control, handleSubmit, reset } = useForm<NewProfileFormValues>({
    defaultValues: {
      username: '',
    },
  });

  const createInviteRequest = useMutation({
    ...queries.invites.create,
    onSuccess: (invite) => {
      Toast.show({
        type: 'success',
        text1: 'Profile created successfully',
        text2: `Share this invite code: ${invite.code}`,
        visibilityTime: 6000,
      });
      reset();
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Failed to create invite',
        text2: error.message,
      });
    },
  });

  const onSubmit = handleSubmit(({ username }) => {
    if (username.length < USERNAME_MIN_LENGTH) {
      return;
    }

    createInviteRequest.mutate(username);
  });

  if (userRole !== 'stable_owner') {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="color-red-600">Access denied</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: TAB_TITLES.users_new, headerBackTitle: BTN_TEXTS.back }} />
      <View className="flex-column my-4 gap-4 bg-white p-2 pt-4">
        <View className="relative">
          <Text className="text-md absolute left-3 top-[-10px] z-10 bg-white px-2 font-semibold text-gray-600">
            {AUTH_TEXTS.username}
          </Text>
          <Controller
            control={control}
            name="username"
            rules={{
              required: AUTH_TEXTS.username_error_required,
              minLength: {
                value: USERNAME_MIN_LENGTH,
                message: AUTH_TEXTS.username_error_minLength,
              },
              maxLength: {
                value: USERNAME_MAX_LENGTH,
                message: AUTH_TEXTS.username_error_maxLength,
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder={AUTH_TEXTS.username_placeholder}
                  textAlignVertical="top"
                  className={`rounded-md border bg-white px-3 py-3 ${error ? 'border-red-500' : 'border-green-200'}`}
                />
                {error && <Text className="mt-1 px-1 text-sm text-red-500">{error.message}</Text>}
              </>
            )}
          />
        </View>
      </View>
      <Button
        title={AUTH_TEXTS.invite_create_btn}
        onPress={onSubmit}
        disabled={createInviteRequest.isPending}
        className="mx-4"
      />
      {createInviteRequest.isSuccess && (
        <InviteData
          username={createInviteRequest.data.username}
          code={createInviteRequest.data.code}
        />
      )}
      <Text className="my-10 px-4">TODO: Lista nieodebranych zaproszeń</Text>
    </View>
  );
}

type InviteDataProps = {
  username: string;
  code: string;
};

const InviteData = ({ username, code }: InviteDataProps) => {
  // TODO: make the text easy to copy
  return (
    <View className="my-4 bg-white p-4">
      <Text className="text-lg font-semibold">{username}</Text>
      <Text className="text-gray-600">{code}</Text>
    </View>
  );
};
