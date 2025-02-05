import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, // chave de criptografia
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Credenciais inválidas");
        }

        // Simulação de busca no banco (substituir por sua lógica real)
        const user = { 
          id: "1", 
          email: "admin.com", 
          password: "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9", 
          role: "admin" 
        };

        // Utilize o compare para validar a senha
        if (!(await compare(credentials.password, user.password))) {
          throw new Error("Credenciais inválidas");
        }

        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
