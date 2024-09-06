import { handleAuth } from "@auth0/nextjs-auth0";

export const GET = handleAuth();
// import { handleAuth } from "@auth0/nextjs-auth0";

// export default handleAuth({
//   async post(req, res) {
//     const result = await handleAuth()(req, res);
//     if (result?.redirectTo) {
//       res.redirect(result.redirectTo);
//     }
//   },
// });
