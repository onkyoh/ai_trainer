const storagePrefix = 'trAIner_'

export const getToken = () => {
  return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`) as string);
}

export const setToken = (token: string) => {
  window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
}

export const clearToken = () => {
  window.localStorage.removeItem(`${storagePrefix}token`);
}

