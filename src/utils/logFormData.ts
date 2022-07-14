export const logFormData = (selector: string): void => {
  const form = document.querySelector(selector) as HTMLFormElement;
  if (!form) {
    console.log('Такой формы не существует');
    return;
  }
  const formData = new FormData(form);

  let data: Record<string, string> = {};
  for (let [key, value] of formData.entries()) {
    if (typeof value === "string") {
      data[key] = value;
    }
  }
  console.log(data)
}
