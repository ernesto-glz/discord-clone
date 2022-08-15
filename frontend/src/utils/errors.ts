import { ErrorKey, ErrorCodes } from 'src/config/constants';

export interface ErrorObject {
  message: string;
  code: string;
}
export type Params = ErrorKey | ErrorKey[];

export function findError(errors: ErrorObject[], params: Params) {
  if (!errors.length) return undefined;
  const isArray = Array.isArray(params);

  const templateErrors = isArray ? [] : ErrorCodes[params];

  if (isArray) {
    const errorsArray = Array.from(Object.entries(ErrorCodes))
      .filter(([key]) => params.includes(key as ErrorKey))
      .flatMap(([k, v]) => v);
    templateErrors.push(...errorsArray);
  }

  const error = errors.find((error) => templateErrors.includes(error.code));
  if (!error) return;

  return error.message;
}
