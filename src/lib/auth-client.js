"use client";


import { createAuthClient } from "better-auth/react";
import { clearAccessToken } from "./api";

export const authClient = createAuthClient();


export async function logoutUser() {
  clearAccessToken();
  await authClient.signOut();
}
