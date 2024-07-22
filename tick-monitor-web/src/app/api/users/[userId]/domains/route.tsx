import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, {params} : {params: {userId: string}}) => {
  try {
    const response = await axios.get(`${process.env.PUBLIC_NEXT_API_URL}/users/${params.userId}/domains`);
  } catch (err) {
    return {success: false, error: err};
  }
}