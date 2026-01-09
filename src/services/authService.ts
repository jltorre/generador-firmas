
import { User } from '../types';
import usersData from '../data/users.json';

const MOCK_DELAY = 1000;

export const AuthService = {
  /**
   * Simulates fetching the authenticated user's profile.
   * In a real Azure AD environment, this would call an endpoint protected 
   * by the certificate-based session.
   */
  getUserProfile: async (): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // For simulation purposes, we'll return a specific user if no ID is provided,
        // or we could check a secure cookie/token here.
        // In the "real world", the server would identify the user via the certificate.
        const defaultUserDNI = '48526525K'; // Simulating that the server identified this DNI
        const user = (usersData as any)[defaultUserDNI];
        
        if (user) {
          resolve({
            id: defaultUserDNI,
            ...user
          });
        } else {
          resolve(null);
        }
      }, MOCK_DELAY);
    });
  }
};
