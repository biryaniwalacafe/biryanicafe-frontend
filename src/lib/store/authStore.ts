// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import axios from "axios";

// const API_BASE = "http://localhost:8000/api/auth";

// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   phone?: string;
//   is_profile_complete: boolean;
// }

// interface AuthState {
//   user: User | null;
//   accessToken: string | null;
//   refreshToken: string | null;

//   login: (email: string, password: string) => Promise<void>;
//   register: (
//     name: string,
//     email: string,
//     password: string,
//     confirmPassword: string
//   ) => Promise<void>;
//   googleLogin: (idToken: string) => Promise<void>;

//   logout: () => void;
//   changePassword: (currentPassword: string, newPassword: string) => Promise<void>;

//   setUser: (user: User, access: string, refresh: string) => void;
//   autoLogin: () => void;
// }

// export const useAuthStore = create<AuthState>((set, get) => ({
//   user: null,
//   accessToken: null,
//   refreshToken: null,

//   autoLogin: () => {
//     const accessToken = localStorage.getItem("accessToken");
//     const refreshToken = localStorage.getItem("refreshToken");
//     const user = localStorage.getItem("user");

//     if (accessToken && refreshToken && user) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//       set({
//         user: JSON.parse(user),
//         accessToken,
//         refreshToken,
//       });
//     }
//   },

//   login: async (email, password) => {
//     const res = await axios.post(`${API_BASE}/login/`, { email, password });

//     const { user, access, refresh } = res.data;

//     localStorage.setItem("accessToken", access);
//     localStorage.setItem("refreshToken", refresh);
//     localStorage.setItem("user", JSON.stringify(user));

//     axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
//     set({ user, accessToken: access, refreshToken: refresh });
//   },

//   register: async (name, email, password, confirmPassword) => {
//     const res = await axios.post(`${API_BASE}/registration/`, {
//       username: name,
//       email,
//       password1: password,
//       password2: confirmPassword,
//     });

//     const { user, access, refresh } = res.data;

//     localStorage.setItem("accessToken", access);
//     localStorage.setItem("refreshToken", refresh);
//     localStorage.setItem("user", JSON.stringify(user));

//     axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
//     set({ user, accessToken: access, refreshToken: refresh });
//   },

//   googleLogin: async (idToken) => {
//     const res = await axios.post(`${API_BASE}/google-login/`, { id_token: idToken });

//     const { user, access, refresh } = res.data;

//     localStorage.setItem("accessToken", access);
//     localStorage.setItem("refreshToken", refresh);
//     localStorage.setItem("user", JSON.stringify(user));

//     axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
//     set({ user, accessToken: access, refreshToken: refresh });
//   },

//   changePassword: async (currentPassword, newPassword) => {
//     const token = get().accessToken;
//     if (!token) throw new Error("Not authenticated");

//     await axios.post(
//       `${API_BASE}/change-password/`,
//       { current_password: currentPassword, new_password: newPassword },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//   },

//   setUser: (user, access, refresh) => {
//     localStorage.setItem("accessToken", access);
//     localStorage.setItem("refreshToken", refresh);
//     localStorage.setItem("user", JSON.stringify(user));

//     axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
//     set({ user, accessToken: access, refreshToken: refresh });
//   },

//   logout: () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("user");

//     delete axios.defaults.headers.common["Authorization"];
//     set({ user: null, accessToken: null, refreshToken: null });
//   },
// }));


import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

// const API_BASE = "http://localhost:8000/api/auth";
const API_BASE = import.meta.env.VITE_API_AUTH_URL;

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  is_profile_complete: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  googleLogin: (idToken: string) => Promise<void>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  setUser: (user: User, access: string, refresh: string) => void;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      login: async (email, password) => {
        const res = await axios.post(`${API_BASE}/login/`, { email, password });
        const { user, access, refresh } = res.data;
        axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
        set({ user, accessToken: access, refreshToken: refresh });
      },

      register: async (name, email, password, confirmPassword) => {
        const res = await axios.post(`${API_BASE}/registration/`, {
          username: name,
          email,
          password1: password,
          password2: confirmPassword,
        });
        const { user, access, refresh } = res.data;
        axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
        set({ user, accessToken: access, refreshToken: refresh });
      },

      googleLogin: async (idToken) => {
        const res = await axios.post(`${API_BASE}/google-login/`, { id_token: idToken });
        const { user, access, refresh } = res.data;
        axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
        set({ user, accessToken: access, refreshToken: refresh });
      },

      changePassword: async (currentPassword, newPassword) => {
        const token = get().accessToken;
        if (!token) throw new Error("Not authenticated");
        await axios.post(
          `${API_BASE}/change-password/`,
          { current_password: currentPassword, new_password: newPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      },

      setUser: (user, access, refresh) => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
        set({ user, accessToken: access, refreshToken: refresh });
      },

      logout: () => {
        delete axios.defaults.headers.common["Authorization"];
        set({ user: null, accessToken: null, refreshToken: null });
      },
      setAccessToken: (token: string) => {
        set({ accessToken: token });
      },
    }),
    {
      name: "auth-storage", // Key for the localStorage item
      onRehydrateStorage: () => (state) => {
        if (state?.accessToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${state.accessToken}`;
        }
      },
    }
  )
);

