import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const response = await axios.get(
      `${process.env.PUBLIC_NEXT_API_URL}/domains`
    );
    console.log(response.data);
    return { success: true, response: response.data };
  } catch (err) {
    return { success: false, error: err };
  }
};
