import NextAuth, { AuthOptions, Session, SessionStrategy, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
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
        if (!credentials || !credentials.email || !credentials.password) {
          console.log("Invalid credentials");
          return null;
        }

        if (credentials.email === "admin.com" && credentials.password === "123") {
          console.log("Valid credentials");
          return {
            id: "1",
            email: "admin.com",
            name: "Admin",
            role: "admin",
          };
        } else if (credentials.email === "client.com" && credentials.password === "123") {
          return {
            id: "2",
            email: "client.com",
            name: "Cliente",
            role: "client",
          };
        } else {
          return {
            id: "3",
            email: "supplier.com",
            name: "Prestador",
            role: "supplier",
          };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.role && token?.email) {
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
