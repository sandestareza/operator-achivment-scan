
import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["rezadev2498@gmail.com"],
      subject: "[Penting] Diskusi Peningkatan Kinerja dan Dukungan - Pencapaian [Bulan/Periode]",
      react: EmailTemplate({ name }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.log(error);
    
    return Response.json({ error }, { status: 500 });
  }
}
