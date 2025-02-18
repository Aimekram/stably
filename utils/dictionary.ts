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
  new_horse: 'Dodaj konia',
};

// auth
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
  placeholder: 'Wpisz imię konia',
  label: 'Imię konia',
  error_required: 'Imię konia jest wymagane',
  error_minLength: 'Imię musi mieć minimum 2 znaki',
};

export const HORSES_LIST_TEXTS = {
  title: 'Lista koni:',
  title_owner: 'Twoje konie:',
};

// stock
export const STOCK_TEXTS = {
  form_title: 'Dodaj nową paszę / suplement',
  food_name: 'Nazwa',
  food_name_placeholder: 'Wpisz nazwę paszy lub suplementu',
  quantity_fodder: 'Liczba worków paszy',
  quantity_supplement: 'Liczba opakowań suplementu',
  type: 'Rodzaj',
  update_success: 'Stan magazynowy zmieniony pomyślnie',
  update_error: 'Wystąpił błąd podczas zmiany stanu magazynowego. Spróbuj ponownie',
  types: {
    fodder: 'Pasza',
    supplement: 'Suplement',
  },
  types_list_titles: {
    fodder: 'Pasze',
    supplement: 'Suplementy',
  },
  errors: {
    name_required: 'Nazwa paszy jest wymagana',
    name_length: 'Nazwa musi mieć od 2 do 50 znaków',
    quantity_required: 'Ilość jest wymagana',
    quantity_negative: 'Ilość nie może być ujemna',
    type_required: 'Rodzaj jest wymagany',
  },
};
