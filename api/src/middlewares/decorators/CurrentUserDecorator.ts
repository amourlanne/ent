import { Action, createParamDecorator } from 'routing-controllers';

export function CurrentUser(options?: { required?: boolean }) {
  return createParamDecorator({
    required: options && options.required ? true : false,
    value: ({ request } : Action) => {
      return request.user;
    }
  });
}
