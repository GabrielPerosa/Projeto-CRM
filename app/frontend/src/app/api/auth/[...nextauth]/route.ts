// app/api/auth/[...nextauth]/route.ts
import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

interface Token {
  id?: string;
  email?: string;
  role?: string;
}
const authOptions = {
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password){
          console.log("Credenciais inválidas");
          return null;
        } 
        
        if (credentials.email === "admin.com" && credentials.password === "123") {
          console.log("Credenciais corretas");
          return { 
            id: "1", 
            email: "admin.com", 
            name: "Admin",
            role: "admin",
          };
        }else
        {
          return { 
            id: "2", 
            email: "test.com", 
            name: "Test",
            role: "client" 
          };
        } 
      }
    })
  ],
  callbacks: {
    async jwt({ token, user } : { token: JWT, user: User }) {
      if (user) {
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      if (token?.role && token?.email) {
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
    
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };