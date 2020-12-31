import { RegisterCredentials } from '../inputTypes/registerCredentials';

export const validateRegister = (credentials: RegisterCredentials) => {
  const errors = [];
  if (!credentials.email.includes('@')) {
    errors.push({
      field: 'email',
      message: 'Niepoprawny adres email',
    });
  }
  if (credentials.username.length <= 3) {
    errors.push({
      field: 'username',
      message: 'Nazwa użytkownika musi mieć więcej niż 3 znaki',
    });
  }

  if (credentials.username.includes('@')) {
    errors.push({
      field: 'username',
      message: 'Niepoprawna nazwa użytkownika',
    });
  }

  if (credentials.username.trim().length !== credentials.username.length) {
    errors.push({
      field: 'username',
      message: 'Nazwa użytkownika nie może zawierać białych znaków',
    });
  }

  if (credentials.password.length <= 5) {
    errors.push({
      field: 'password',
      message: 'Hasło musi mieć więcej niż 5 znaków',
    });
  }
  return errors.length > 0 ? errors : null;
};
