import { RegisterCredentials } from '../inputTypes/registerCredentials';
import { OptimalConditionsInput } from '../resolvers/PlantExtras';
import { FieldError } from '../shared/graphqlTypes';

export const validateOptimalConditions = (
  conditions: OptimalConditionsInput
): FieldError[] | null => {
  const errors: FieldError[] = [];
  if (conditions.airHumidityHigh > 100) {
    errors.push({
      field: 'airHumidityHigh',
      message: 'Wilgotność powietrza nie może być większa niż 100%',
    });
  }

  if (conditions.airHumidityHigh < 0) {
    errors.push({
      field: 'airHumidityHigh',
      message: 'Wilgotność powietrza nie może być mniejsza niż 0%',
    });
  }

  if (conditions.airHumidityLow > 100) {
    errors.push({
      field: 'airHumidityLow',
      message: 'Wilgotność powietrza nie może być większa niż 100%',
    });
  }

  if (conditions.airHumidityLow < 0) {
    errors.push({
      field: 'airHumidityLow',
      message: 'Wilgotność powietrza nie może być mniejsza niż 0%',
    });
  }

  if (conditions.temperatureHigh > 50) {
    errors.push({
      field: 'temperatureHigh',
      message: 'Temperatura nie może być większa niż 50°C',
    });
  }

  if (conditions.temperatureLow < 0) {
    errors.push({
      field: 'temperatureLow',
      message: 'Temperatura nie może być mniejsza niż 0°C',
    });
  }

  if (conditions.temperatureLow > 50) {
    errors.push({
      field: 'temperatureLow',
      message: 'Temperatura nie może być większa niż 50°C',
    });
  }

  if (conditions.temperatureHigh < 0) {
    errors.push({
      field: 'temperatureHigh',
      message: 'Temperatura nie może być mniejsza niż 0°C',
    });
  }

  if (conditions.temperatureHigh < conditions.temperatureLow) {
    errors.push({
      field: 'temperatureHigh',
      message: 'Minimalna temperatura większa niż maksymalna',
    });
    errors.push({
      field: 'temperatureLow',
      message: 'Minimalna temperatura większa niż maksymalna',
    });
  }

  if (conditions.airHumidityHigh < conditions.airHumidityLow) {
    errors.push({
      field: 'airHumidityLow',
      message: 'Minimalna wilgotność większa niż maksymalna',
    });
    errors.push({
      field: 'airHumidityHigh',
      message: 'Minimalna wilgotność większa niż maksymalna',
    });
  }
  return errors.length > 0 ? errors : null;
};

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
