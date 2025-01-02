import { create } from "zustand";
import { User } from "@/src/features/users/interfaces/user.interface";
import { AuthService } from "@/src/features/auth/services/auth.service";
import Storage from "@/src/core/infrastructure/storage/storage";

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

const storage = Storage.getInstance();
const authService = AuthService.getInstance();

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: true,

  initialize: async () => {
    try {
      const storedToken = await storage.getItem("userToken");
      const storedUser = await storage.getItem("userData");

      if (storedToken && storedUser) {
        set({
          token: storedToken,
          user: JSON.parse(storedUser),
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error loading auth info:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async (username: string, password: string) => {
    const response = await authService.login({ username, password });
    await storage.setItem("userToken", response.access_token);
    await storage.setItem("userData", JSON.stringify(response.user));

    set({
      token: response.access_token,
      user: response.user,
    });
  },

  signOut: async () => {
    try {
      await storage.removeItem("userToken");
      await storage.removeItem("userData");
      set({ token: null, user: null });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  },
}));
