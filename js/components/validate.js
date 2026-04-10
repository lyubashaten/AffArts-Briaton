export const form = document.querySelector('.questions__form');
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const checkbox = document.querySelector('#agree');

export function initValidation() {
  const validator = new JustValidate(form);

  validator
    .addField(inputName, [
      { rule: 'required', errorMessage: 'Пожалуйста, введите ваше имя' },
      { rule: 'minLength', value: 3, errorMessage: 'Имя должно содержать минимум 3 символа' },
      { rule: 'maxLength', value: 20, errorMessage: 'Имя не должно превышать 20 символов' },
    ])
    .addField(inputEmail, [
      { rule: 'required', errorMessage: 'Пожалуйста, введите вашу почту' },
      { rule: 'email', errorMessage: 'Пожалуйста, введите корректный адрес электронной почты' },
    ])
    .addField(checkbox, [
      { rule: 'required', errorMessage: 'Пожалуйста, подтвердите согласие на обработку данных' },
    ])
    .onSuccess(async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      try {
        const response = await fetch('https://httpbin.org/post', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          document.querySelector('.notification').classList.add('notification--success');
          document.querySelector('.overlay').style.display = 'block';
          form.reset();
        } else {
          throw new Error('Ошибка отправки');
        }
      } catch (error) {
        document.querySelector('.notification').classList.add('notification--error');
        document.querySelector('.overlay').style.display = 'block';
      }
    });
}

document.querySelector('.notification__btn').addEventListener('click', () => {
  const notification = document.querySelector('.notification')
  notification.classList.remove('notification--error', 'notification--success');
  document.querySelector('.overlay').style.display = 'none';
});
initValidation();
