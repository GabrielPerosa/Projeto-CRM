// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/login",
    error: "/login",
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
        
        // Modificação aqui ↓
        if (credentials.email === "admin.com" && credentials.password === "123") {
          console.log("Credenciais corretas");
          return { 
            id: "1", 
            email: "admin.com", 
            name: "Admin",
            role: "admin" 
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
        
        return null;
      }
    })
  ],
  //callbacks: {
  //  async jwt({ token, user }) {
  //    if (user) {
  //      token.role = user.role;
  //      token.id = user.id;
  //    }
  //    return token;
  //  },
  //  async session({ session, token }) {
  //    if (token?.role) {
  //      session.user.role = token.role;
  //      session.user.id = token.id;
  //    }
  //    return session;
  //  }
  //}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };