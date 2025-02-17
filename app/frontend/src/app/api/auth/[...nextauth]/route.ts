import NextAuth, { AuthOptions, Session, SessionStrategy, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import validator from "validator";

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

        const email = credentials?.email;
        const password = credentials?.password;

        if (!credentials || !email || !password) {
          console.log("credenciais invalidas");
          return null;
        }

        if (!validator.isEmail(email)) {
          throw new Error("Email inválido");
        }

        // Validar senha

        try {
          const user = await prisma.user.findUnique({ where: { email } });

          if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Credenciais inválidas");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Erro na autenticação:", error);
          throw new Error("Ocorreu um erro durante a autenticação"); // Mensagem genérica para o usuário
        }
        
        if (email === "admin.com" && password === "123") {
          console.log("Valid credentials");
          return {
            id: "1",
            email: "admin.com",
            name: "Admin",
            role: "admin",
          };
        } else if (email === "client.com" && password === "123") {
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        const user = await prisma.user.findUnique({ where: { id: token.id } });
        session.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
