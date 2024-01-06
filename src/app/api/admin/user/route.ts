import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import {
  RowDataPacket,
  FieldPacket,
  ResultSetHeader,
  ProcedureCallPacket,
} from "mysql2";
import pool from "@/dbConfig/db";

type QueryResultType = [
  (
    | RowDataPacket[]
    | ResultSetHeader
    | RowDataPacket[][]
    | ProcedureCallPacket
    | RowDataPacket[]
  ),
  FieldPacket[]
];

export const GET = async (req: NextRequest) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    const rowData: RowDataPacket[] = rows as RowDataPacket[];
    const emptyPassword = rowData.map((user) => ({ ...user, password: "" }));
    return NextResponse.json(
      { ok: true, data: emptyPassword },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { email, password, name, role } = await req.json();
    const [results]: QueryResultType = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (Array.isArray(results) && results.length != 0) {
      return NextResponse.json(
        {
          message: "This email is already in use.",
          status: 409,
        },
        { status: 409 }
      );
    }

    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO  users (name, email, password, role, status) VALUES (?,?,?,?,?)",
      [name, email, hash, role, 1]
    );

    return NextResponse.json({ message: "User added" }, { status: 201 });
  } catch (er) {
    NextResponse.json({ message: "something went worng!" }, { status: 400 });
  }
};
