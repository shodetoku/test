import { saveToStorage, getFromStorage, removeFromStorage } from './StorageService';
import { mockUsers } from '../utils/SampleData';

const AUTH_MODE_KEY = 'authMode';
const MANUAL_AUTH_MODE = 'manual';
const BYPASS_AUTH_MODE = 'bypass';

export const login = (email, password) => {
  const user = mockUsers.find((userRecord) => userRecord.email === email && userRecord.password === password);

  if (user) {
    const { password: _password, ...userWithoutPassword } = user;
    saveToStorage('currentUser', userWithoutPassword);
    saveToStorage('isAuthenticated', true);
    saveToStorage(AUTH_MODE_KEY, MANUAL_AUTH_MODE);
    return { success: true, user: userWithoutPassword };
  }

  return { success: false, error: 'Invalid email or password' };
};

export const logout = () => {
  removeFromStorage('currentUser');
  removeFromStorage('isAuthenticated');
  removeFromStorage(AUTH_MODE_KEY);
};

export const getCurrentUser = () => {
  const authMode = getFromStorage(AUTH_MODE_KEY);
  if (authMode === MANUAL_AUTH_MODE) {
    return getFromStorage('currentUser');
  }

  // Temporary bypass: allow patient portal access without explicit login.
  return mockUsers[0] || null;
};

export const isAuthenticated = () => {
  const authMode = getFromStorage(AUTH_MODE_KEY);
  if (authMode === MANUAL_AUTH_MODE) {
    return getFromStorage('isAuthenticated') === true;
  }
  return authMode === BYPASS_AUTH_MODE;
};

export const updateUserProfile = (updates) => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const updatedUser = { ...currentUser, ...updates };
    saveToStorage('currentUser', updatedUser);
    return { success: true, user: updatedUser };
  }
  return { success: false, error: 'No user logged in' };
};
