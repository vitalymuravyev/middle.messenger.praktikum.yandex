type TRule = 'login' | 'password' | 'email' | 'phone' | 'name';

export const validationRules: Record<TRule, { rule: RegExp, error: string }> = {
  login: {
    rule: /^[0-9a-zA-Z\-_]{3,20}/,
    error: 'от 3 до 20 символов, латиница, цифры, допустимы дефис и нижнее подчёркивание',
  },

  password: {
    rule: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    error: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  },

  email: {
    rule: /^[^\s@]+@[^\s@]+\.[\S]{2,}$/,
    error: 'латиница, цифры и спецсимволы',
  },

  phone: {
    rule: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/,
    error: 'от 10 до 15 символов, состоит из цифр, может начинается с плюса',
  },

  name: {
    rule: /^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/,
    error: 'первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов',
  },
};

export const showError = (errorText: string): void => {
  const errEl = document.querySelector('.input-error') as HTMLDivElement;
  errEl.textContent = errorText;
  errEl.style.display = 'block';
};

export const validate = (field: TRule, element: HTMLInputElement): void => {
  const { rule, error } = validationRules[field];

  if (!rule.test(element.value)) {
    showError(error);
  }
};

export const hideError = (): void => {
  const errEl = document.querySelector('.input-error') as HTMLDivElement;
  errEl.textContent = '';
  errEl.style.display = 'none';
};

export const isFormValid = (selector: string): boolean => {
  const form = document.querySelector(selector) as HTMLFormElement;
  let errors = 0;

  const fields = form.querySelectorAll('input');
  fields.forEach((field) => {
    if (!field.validity.valid) errors += 1;
  });
  return !errors;
};
