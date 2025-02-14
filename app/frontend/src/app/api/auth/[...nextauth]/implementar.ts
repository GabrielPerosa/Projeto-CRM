/// pages/api/auth/[...nextauth].js
/*import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import validator from "validator";
import { PrismaClient } from "@prisma/client"; // Ou seu ORM preferido

const prisma = new PrismaClient();

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
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
          throw new Error("Credenciais inválidas"); // Lança um erro para ser tratado
        }

        const { email, password } = credentials;

        // Validação de entrada
        if (!validator.isEmail(email)) {
          throw new Error("Email inválido");
        }
        if (password.length < 8) {
          throw new Error("Senha muito curta");
        }

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
  events: {
    async signIn({ user, account, credentials }) {
      // Log do evento de login (para auditoria)
      console.log(`Usuário ${user.id} fez login.`);
    },
  },
});

// pages/login.js
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpa qualquer erro anterior

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Evita o redirecionamento automático
      });

      if (result?.error) {
        setError(result.error); // Exibe a mensagem de erro do NextAuth.js
      } else {
        // Redireciona o usuário para a página desejada após o login
        window.location.href = "/";
      }
    } catch (err) {
      setError("Ocorreu um erro durante o login."); // Mensagem de erro genérica
    }
  };

  return (
    <form onSubmit={handleSubmit}>
//
//      {error && <p style={{ color: "red" }}>{error}</p>}
//      <button type="submit">Entrar</button>
//    </form>
//  );
//}*/

/*
// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;

  const protectedPaths = ["/protected", "/admin"]; // Rotas protegidas

  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname === "/admin" && (!token || token.role !== "admin")) {
    return NextResponse.redirect(new URL("/", req.url)); // Redireciona para outra página ou exibe um erro
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"], // Rotas para o middleware
};
*/