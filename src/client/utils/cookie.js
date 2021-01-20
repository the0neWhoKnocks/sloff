export function setCookie(name, value, days) {
  let expires = '';
  
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
}

export function getCookie(name) {
  const _name = `${name}=`;
  const cookies = document.cookie.split(';');
  
  for(let i=0; i<cookies.length; i++) {
    let c = cookies[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(_name) === 0) return c.substring(_name.length, c.length);
  }
  
  return null;
}

export function deleteCookie(name) {   
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}
