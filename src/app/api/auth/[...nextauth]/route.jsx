// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { getUsersCollection } from "@/lib/db";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: { email: {}, password: {} },
//       async authorize(credentials) {
//         const usersCol = await getUsersCollection();
//         const user = await usersCol.findOne({ email: credentials.email });
//         if (!user) throw new Error("No user found with this email");

//         const isMatch = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );
//         if (!isMatch) throw new Error("Invalid credentials");

//         return {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//           image: user.image,
//           role: user.role || "user",
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account.provider === "google") {
//         const usersCol = await getUsersCollection();
//         const existing = await usersCol.findOne({ email: user.email });
//         if (!existing) {
//           await usersCol.insertOne({
//             name: user.name,
//             email: user.email,
//             image: user.image,
//             role: "user",
//             createdAt: new Date(),
//           });
//         }
//       }
//       return true;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role || "user";
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/login",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };