import NextAuth from "next-auth/next";
import { authOptions } from "./authOptions";

const handler = async (req: any, res: any) => {
  const params = await req.params; // Await the params object
  return NextAuth(req, res, authOptions);
};

export { handler as GET, handler as POST };
