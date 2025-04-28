import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/verticals`,
      req.body
    );
    return NextResponse.json({ success: true, response: response.data });
  } catch (err) {
    return NextResponse.json({ success: false, error: err });
  }
};
