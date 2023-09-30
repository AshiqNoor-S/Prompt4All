import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const generateValidUsername = (name) => {
  // Generate a random alphanumeric string to make the username unique
  const randomString = Math.random().toString(36).substr(2, 10);
  // Combine the name and random string to create the username
  const username = (name.replace(/\s+/g, '').toLowerCase() + randomString).slice(0, 20);
  return username;
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          const username = generateValidUsername(profile.name);
          console.log(username);
          await User.create({
            email: profile.email,
            username: username,//profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true
      } catch (error) {
        console.log("Error checking , if user exists: ", error.message);
        return false
      }
    },
    async redirect({ url, baseUrl }) {
      const redirectUrl = url.startsWith('/') ? new URL(url, baseUrl).toString() : url;
      console.log(`[next-auth] Redirecting to "${redirectUrl}" (resolved from url "${url}" and baseUrl "${baseUrl}")`);
      return redirectUrl;
    },
  }
})

export { handler as GET, handler as POST }