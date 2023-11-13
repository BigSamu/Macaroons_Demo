"use server";

import { cookies } from "next/headers";

export const settingCookiesFromSharedMacaroon = (macaroon) => {
  cookies().set({
    name: "access_token",
    value: "Bearer " + macaroon,
    path: "/",
    sameSite: "strict",
    httpOnly: true,
  });
  cookies().set({
    name: "shared_token",
    value: "yes",
    path: "/",
    sameSite: "strict",
    httpOnly: true,
  });
};
