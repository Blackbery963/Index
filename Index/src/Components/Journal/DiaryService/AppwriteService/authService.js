import { account, ID } from "../../../../appwriteConfig";

class AuthService {
  // Register new user
  async register(email, password, name) {
    try {
      const user = await account.create(ID.unique(), email, password, name);
      await this.login(email, password);
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Login
  async login(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Logout
  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  // Check if user is logged in
  async isLoggedIn() {
    try {
      const user = await this.getCurrentUser();
      return !!user;
    } catch (error) {
      return false;
    }
  }
}

export default new AuthService();