const FAKE_EMAIL = '@fake.com';

export const createEmailFromUsername = (username: string) => {
  return username + FAKE_EMAIL;
};
