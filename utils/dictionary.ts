import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from '~/app/users/new';

export const TAB_TITLES = {
  login: 'Logowanie',
  horses_new: 'Dodaj konia',
  profile: 'Twój profil',
  users_new: 'Dodaj użytkownika',
};

export const BTN_TEXTS = {
  save: 'Zapisz zmiany',
  save_short: 'Zapisz',
  back: 'Wróć',
};

export const AUTH_TEXTS = {
  login: 'Zaloguj się',
  logout: 'Wyloguj się',
  username: 'Nazwa użytkownika',
  username_error_required: 'Nazwa użytkownika jest wymagana',
  username_error_minLength: `Nazwa użytkownika musi mieć minimum ${USERNAME_MIN_LENGTH} znaki`,
  username_error_maxLength: `Nazwa użytkownika może mieć maksymalnie ${USERNAME_MAX_LENGTH} znaków`,
  username_placeholder: 'Wpisz nazwę użytkownika',
  invite_create_btn: 'Wygeneruj zaproszenie',
};

// horse
export const HORSE_MENU_TEXTS = {
  placeholder: 'Wpisz informacje o tym posiłku',
  breakfast: 'Śniadanie',
  lunch: 'Obiad',
  dinner: 'Kolacja',
  error: 'Wystąpił błąd podczas pobierania danych',
  successful_update: 'Zmiany zapisane pomyślnie',
  error_update: 'Wystąpił błąd podczas zapisywania zmian',
};

export const HORSE_NAME_TEXTS = {
  placeholder: 'Wpisz nazwę konia',
  label: 'Nazwa konia',
  error_required: 'Nazwa konia jest wymagana',
  error_minLength: 'Nazwa musi mieć minimum 2 znaki',
};

export const HORSES_LIST_TEXTS = {
  title: 'Lista koni:',
  title_owner: 'Twoje konie:',
};
