// src/features/auth/store/authStore.ts
import { defineStore } from "pinia";
import { api } from "@/plugins/axios";
import { firebaseAuth, googleProvider } from "@/plugins/firebase";
import type { UserCredential } from "firebase/auth";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "" as string,
    userEmail: "" as string,
  }),
  actions: {
    async login(email: string, password: string) {
      const { data } = await api.post("/auth/login", { email, password });
      this.token = data.access_token;
      this.userEmail = email;
    },
    async register(email: string, password: string) {
      const { data } = await api.post("/auth/register", { email, password });
      this.token = data.access_token;
      this.userEmail = email;
    },
    async loginWithGoogle() {
      const cred: UserCredential = await signInWithPopup(
        firebaseAuth,
        googleProvider
      );
      const idToken = await cred.user.getIdToken();
      const { data } = await api.post("/auth/firebase/google", {
        token: idToken,
      });
      this.token = data.access_token;
      this.userEmail = cred.user.email || "";
    },
    logout() {
      this.token = "";
      this.userEmail = "";
    },
  },
});
