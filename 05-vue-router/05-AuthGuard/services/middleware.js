import { isAuthenticated } from './authService.js';

export function log(to, from) {
    console.log('to', to);
    console.log('from', from);
}

export function auth(to, from) {
    return isAuthenticated()
        ? true
        : { path: '/login', query: { from: to.path } };
}

export function guest(to, from) {
    return isAuthenticated()
        ? { path: '/' }
        : true;
}