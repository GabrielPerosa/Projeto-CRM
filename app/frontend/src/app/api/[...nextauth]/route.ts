import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Substitua esta parte pela sua lógica real de autenticação
        if (credentials.email === "admin.com" && credentials.password === "123") {
          return { id: "1", name: "Admin", email: "admin.com" };
        }
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };