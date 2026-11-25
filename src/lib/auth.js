// import { betterAuth } from "better-auth";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { createAuthMiddleware, APIError } from "better-auth/api";
// import { db } from "./mongodb";
// import { getPasswordProblem } from "./validation";

// const googleLogin =
//   process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
//     ? {
//         google: {
//           clientId: process.env.GOOGLE_CLIENT_ID,
//           clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         },
//       }
//     : {};

// export const auth = betterAuth({
//   database: mongodbAdapter(db),
//   secret: process.env.BETTER_AUTH_SECRET,
//   baseURL: process.env.BETTER_AUTH_URL,

//   emailAndPassword: {
//     enabled: true,
//     minPasswordLength: 6,
//     autoSignIn: true,
//   },

//   socialProviders: googleLogin,

//   user: {
//     additionalFields: {

//       role: { type: "string", required: false, defaultValue: "customer", input: true },
//       phone: { type: "string", required: false },
//       address: { type: "string", required: false },
//     },
//   },

//   hooks: {
//     before: createAuthMiddleware(async (ctx) => {
//       if (ctx.path !== "/sign-up/email") return;

//       const problem = getPasswordProblem(ctx.body?.password || "");
//       if (problem) {
//         throw new APIError("BAD_REQUEST", { message: problem });
//       }

//       const requestedRole = ctx.body?.role;
//       const safeRole =
//         requestedRole === "owner" || requestedRole === "customer"
//           ? requestedRole
//           : "customer";

//       return {
//         context: {
//           ...ctx,
//           body: {
//             ...ctx.body,
//             role: safeRole,
//           },
//         },
//       };
//     }),
//   },
// });

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { db, mongoClient } from "./mongodb";
import { getPasswordProblem } from "./validation";

const googleClientId = process.env.GOOGLE_CLIENT_ID?.trim();
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();

const googleLogin =
  googleClientId && googleClientSecret
    ? {
        google: {
          clientId: googleClientId,
          clientSecret: googleClientSecret,
        },
      }
    : {};

const baseURL =
  process.env.BETTER_AUTH_URL?.trim() ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: mongoClient,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL,

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: true,
  },

  socialProviders: googleLogin,

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "customer",
        input: true,
      },
      phone: {
        type: "string",
        required: false,
      },
      address: {
        type: "string",
        required: false,
      },
    },
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") return;

      const problem = getPasswordProblem(ctx.body?.password || "");
      if (problem) {
        throw new APIError("BAD_REQUEST", { message: problem });
      }

      const requestedRole = ctx.body?.role;
      const safeRole =
        requestedRole === "owner" || requestedRole === "customer"
          ? requestedRole
          : "customer";

      return {
        context: {
          ...ctx,
          body: {
            ...ctx.body,
            role: safeRole,
          },
        },
      };
    }),
  },
});