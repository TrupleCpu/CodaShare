let _token: any;

function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2 && parts[1]) {
        const part = parts.pop()
       if(part){
        return part.split(';').shift();
       }
    }
    return undefined;
  }

function insertCookie(cookie: any){
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = `accessible-token=${cookie};expires=${expiration.toUTCString()}; path=/`
}

export function setToken(token: any) {
    _token = token;
    insertCookie(token);
}

export function getToken() {
   return _token || getCookie('accessible-token');
}

export function deleteToken() {
    
    return _token = null;
}
