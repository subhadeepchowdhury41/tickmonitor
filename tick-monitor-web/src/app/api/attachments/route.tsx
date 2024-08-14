import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/attachments`,
      formData
    );
    return NextResponse.json({ success: true, response: res });
  } catch (err) {
    return NextResponse.json({ success: false, error: err });
  }
};
