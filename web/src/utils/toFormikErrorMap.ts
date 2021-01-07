import { FieldError, PlantError } from '../generated/graphql';

export const toErrorMap = (errors: { field: string; message: string }[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => (errorMap[field] = message));
  return errorMap;
};
