"use client";

const AUTH_COOKIE = 'helixx_admin_session';
const MOCK_CREDS = {
    user: 'admin',
    pass: 'helixx2026'
};

export const isAuthenticated = () => {
    if (typeof document === 'undefined') return false;
    return document.cookie.split(';').some((item) => item.trim().startsWith(`${AUTH_COOKIE}=true`));
};

export const login = (user: string, pass: string) => {
    if (user === MOCK_CREDS.user && pass === MOCK_CREDS.pass) {
        // Set cookie for 1 day
        const date = new Date();
        date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
        document.cookie = `${AUTH_COOKIE}=true; expires=${date.toUTCString()}; path=/`;
        return true;
    }
    return false;
};

export const logout = () => {
    document.cookie = `${AUTH_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
