export const saveUser = (data) => localStorage.setItem('userInfo', JSON.stringify(data));
export const clearUser = () => localStorage.removeItem('userInfo');
export const getUser = () => JSON.parse(localStorage.getItem('userInfo') || 'null');
