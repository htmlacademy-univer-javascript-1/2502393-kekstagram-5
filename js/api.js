const API_BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const Routes = {
  DATA: '/data',
  SUBMIT: '/',
};

const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorMessages = {
  LOAD_FAILURE: 'Не удалось загрузить данные. Проверьте соединение с интернетом и попробуйте еще раз.',
  SUBMISSION_FAILURE: 'Ошибка при отправке формы. Проверьте соединение с интернетом и попробуйте снова.',
};

const fetchFromServer = async (route, errorMessage, method = HttpMethods.GET, body = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}${route}`, { method, body });

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch {
    throw new Error(errorMessage);
  }
};

// получение данных из API
const fetchData = () => fetchFromServer(Routes.DATA, ErrorMessages.LOAD_FAILURE);
const submitData = (formData) => fetchFromServer(Routes.SUBMIT, ErrorMessages.SUBMISSION_FAILURE, HttpMethods.POST, formData);

export { fetchData, submitData };
