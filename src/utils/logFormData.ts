export const logFormData = (selector: string): Record<string, string> | void => {
  const form = document.querySelector(selector) as HTMLFormElement;
  if (!form) {
    console.log('Такой формы не существует');
    return;
  }
  const formData = new FormData(form);

  const data: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') {
      data[key] = value;
    }
  }
  return data;
};
