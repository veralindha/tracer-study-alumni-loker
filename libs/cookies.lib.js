export function setCookie(cookieName, cookieValue, hours) {
  let date = new Date();
  date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
  document.cookie = cookieName + " = " + cookieValue + "; expires = " + date.toGMTString();
}

export function getCookie(name) {
  let cookieName = name + "=";
  let cookieArray = document.cookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) == 0) {
      return JSON.parse(cookie.substring(cookieName.length, cookie.length));
    }
  }
  return "";
}

export function removeCookie(cookieName) {
  let date = new Date(null)
  date.setTime(date.getTime())
  document.cookie = cookieName + " = " + "''" + "; expires = " + date.toGMTString();
}