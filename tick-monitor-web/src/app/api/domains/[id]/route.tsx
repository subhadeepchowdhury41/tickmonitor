import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/domains/${params.id}`
    );
    return { success: true, response: response.data };
  } catch (err) {
    return { success: false, error: err };
  }
};
