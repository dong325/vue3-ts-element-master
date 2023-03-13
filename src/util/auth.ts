import Cookies from 'js-cookie'
const TokenKey = "Token";
export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  Cookies.set(TokenKey, token);
}

export function removeToken() {
  window.localStorage.clear()
  window.sessionStorage.clear()
  Cookies.remove(TokenKey);
}
