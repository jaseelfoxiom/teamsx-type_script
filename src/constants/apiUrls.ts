export const URLS = {
    LOGINURL : "user/login",
    USER: "user",
  } as const;
  
  export type URLS = keyof typeof URLS;
  