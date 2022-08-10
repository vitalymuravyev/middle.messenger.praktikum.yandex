export const logFormData = (selector: string): any => {
  const form = document.querySelector(selector) as HTMLFormElement;
  if (!form) {
    console.log('Такой формы не существует');
    return;
  }
  const formData = new FormData(form);

  const data: Record<string, string> = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') {
      data[key] = value;
    }
  }
  // eslint-disable-next-line consistent-return
  return data;
};
