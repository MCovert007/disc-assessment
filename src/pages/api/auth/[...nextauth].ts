import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import clientPromise  from "@/lib/mongodb"
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<any | undefined> {
  try {
    const client = await clientPromise;
    const db = client.db("disc-assessment");
    const users : any = await db.collection("users").find({email}).toArray();
    if(users[0]){
      return users[0]
    }else{
      return null
    }
  } catch (error:any) {
    return null
  }
}

async function getDISCAssessment(email: string): Promise<any | undefined> {
  try {
    const client = await clientPromise;
    const db = client.db("disc-assessment");
    const result : any = await db.collection("testResult").find({userID:email}).toArray();
    if(result[0]){
      return result[0]
    }else{
      return null
    }
  } catch (error:any) {
    return null
  }
}

async function getBuyResult(email: string): Promise<any | undefined> {
  try {
    const client = await clientPromise;
    const db = client.db("disc-assessment");
    const results : any[] = await db.collection("payments").find({email:email}).toArray();
    if(results[0]){
      const buyResult : any = {}
      for(let result in results){
        // if ((results[result] as any)?.buyResult) continue
        const key:string = (results[result] as any)?.productName;
        buyResult[key]={
          paymentOrderId:(results[result] as any)?.paymentOrderId,
          buyResult:(results[result] as any)?.buyResult
        }
      }
      return buyResult
    }else{
      return null
    }
  } catch (error:any) {
    return null
  }
}

const checkPassword = async (password:string, hashedPassword:string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const authOptions : any = {
  session: {
    jwt: true,
    maxAge:  24 * 60 * 60,
    updateAge: 24 * 60 * 60, // The session will be updated in the database every 24 hours
  },
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
    GithubProvider({
      clientId: String(process.env.GITHUB_ID),
      clientSecret: String(process.env.GITHUB_SECRET),
    }),
    Credentials({      
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" },
      },
      async authorize(credentials:any) {
        const user = await getUser(credentials?.email)
        if (user) {
          if(user?.email === "funny.softdev@gmail.com") user.role = "Admin"
          const passwordsMatch = await checkPassword(credentials?.password, user.password);
          if(passwordsMatch){
            const result = await getDISCAssessment(credentials?.email)
            const buyResult = await getBuyResult(credentials?.email)
            return {...user, access_token : credentials.csrfToken, password:credentials?.password, discValue:result?result.result:null, discProfile:result?result.profile:null, buyResult:buyResult}
          }
          return null
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: null, // If you want to redirect to a different page after a new user signs in
  },
  callbacks: {
    async jwt({ token, user }:any) {
      if (user) {
        token.role = user.role
        token.allow = user.allow
        token.discValue = user.discValue
        token.discProfile = user.discProfile
        token.accessToken = user.access_token
        token.password = user.password
        token.buyResult = user.buyResult
      }
      return token
    },
    async session({ session, token}:any) {
      session.accessToken = token.accessToken
      session.user.role = token.role
      session.user.allow = token.allow
      session.user.discValue = token.discValue
      session.user.discProfile = token.discProfile
      session.user.password = token.password
      session.user.buyResult = token.buyResult
      return session
    }
  }
}
export default NextAuth(authOptions)