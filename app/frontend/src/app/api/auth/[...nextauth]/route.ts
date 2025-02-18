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
          throw new Error("credenciais invalidas");
        }

        if (!validator.isEmail(email)) {
          throw new Error("Email inválido");
        }

        // Validar senha

        try { 
          // Buscar no banco
          const user = {
            id: "1",
            email: "admin@example.com",
            name: "John Doe",
            password: "$2y$10$tnK2G0BYGMcmYdbwJ7eMq.OFleSkve.EPkF/9Rr966zQ7gmJmWsV6",
            role: "admin",
            };

          if (!user) {
            throw new Error("Sem usuário");
          }
          if (!bcrypt.compare(password, user.password)) {
            throw new Error("Senha incorreta");
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
        const user = {
          id: "1",
          email: "admin@example.com",
          name: "John Doe",
          password: "$2y$10$tnK2G0BYGMcmYdbwJ7eMq.OFleSkve.EPkF/9Rr966zQ7gmJmWsV6",
          role: "admin",
          };
          
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
