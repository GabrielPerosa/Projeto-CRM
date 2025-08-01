import axios from "axios";
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
        /*const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("Credenciais inválidas");
        }
        try {
          const user_token: any = await axios.post(`http://127.0.0.1:5555/login`, {
            "email": email,
            "senha": password
          });
          if (!user_token) {
            throw new Error("Não foi possível autenticar o usuário.");
          }
          console.log(user_token)
          return {
            id: '10',  
            email: user_token.data.email,
            name: "Gilberto",
            role: user_token.data.tipo,
          };
        } catch (error) {
          console.error("Erro na autenticação:", error);
          throw new Error("Erro na autenticação");
        }
         */ return{
          id: '10',  
          email: "josmar@gmail.com",
          name: "Josmar",
          role: "client",
          }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persiste o token na sessão JWT
      if (user) {
        token.role = user.role;
        token.email = user.email;
        token.id = user.id;
      }      
      return token;
    },

    async session({ session, token }) {
      // Passa os dados do token para a sessão do usuário
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email!,
          name: token.name!,
          role: token.role as string,
        };
        session.token = token;
      }
      return session;
    },    
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 dia
      },
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
