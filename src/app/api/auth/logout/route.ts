import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    cookies().delete("token");
    cookies().delete("role");

    return NextResponse.json(
      { message: "Logged out", status: 200 },
      { status: 200 }
    );
  } catch (er) {
    return NextResponse.json(
      { message: "Something went wrong!", status: 400 },
      { status: 400 }
    );
  }
};
