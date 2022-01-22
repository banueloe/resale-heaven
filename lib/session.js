// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
export const sessionOptions = {
    password: "aa7f7aaa-bece-4c8d-84c4-7750eccb6d06",
    cookieName: "token",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  };