import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactRequestBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactRequestBody = await request.json();
    const { firstName, lastName, email, subject, message } = body;

    // Validation
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields (First Name, Last Name, Email, Subject, Message) are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || "info@saviora.app";
    const fromEmail = process.env.SMTP_FROM_EMAIL || "noreply@saviora.app";
    const senderFullName = `${firstName.trim()} ${lastName.trim()}`;

    const apiKey = process.env.SMTP2GO_API_KEY?.trim();
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPass = process.env.SMTP_PASS?.trim();
    const smtpHost = process.env.SMTP_HOST?.trim() || "mail.smtp2go.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);

    const emailHtmlBody = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>New Contact Form Submission from Saviora</title>
</head>

<body style="margin:0;padding:0;background:#f3f6f9;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f6f9;padding:40px 20px;">
<tr>
<td align="center">

<table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">

    <!-- Header -->
    <tr>
        <td style="background:#15803D;padding:40px 30px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:34px;font-weight:bold;">
                Saviora
            </h1>

            <p style="margin:8px 0 0;color:#dcfce7;font-size:15px;">
                Track • Save • Grow
            </p>
        </td>
    </tr>

    <!-- Title -->
    <tr>
        <td style="padding:35px 35px 20px;">
            <h2 style="margin:0;color:#111827;font-size:28px;">
                📩 New Contact Form Submission
            </h2>

            <p style="margin-top:12px;color:#6b7280;font-size:15px;line-height:1.7;">
                A visitor has submitted a new message through the Saviora website contact form.
            </p>
        </td>
    </tr>

    <!-- Contact Details -->
    <tr>
        <td style="padding:0 35px;">

            <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:24px;">

                <tr>
                    <td style="padding:10px 0;width:140px;color:#6b7280;font-weight:bold;">
                        Full Name
                    </td>

                    <td style="padding:10px 0;color:#111827;">
                        ${senderFullName}
                    </td>
                </tr>

                <tr>
                    <td style="padding:10px 0;color:#6b7280;font-weight:bold;">
                        Email Address
                    </td>

                    <td style="padding:10px 0;">
                        <a href="mailto:${email.trim()}"
                        style="color:#15803D;text-decoration:none;font-weight:600;">
                            ${email.trim()}
                        </a>
                    </td>
                </tr>

                <tr>
                    <td style="padding:10px 0;color:#6b7280;font-weight:bold;">
                        Subject
                    </td>

                    <td style="padding:10px 0;color:#111827;">
                        ${subject.trim()}
                    </td>
                </tr>

                <tr>
                    <td style="padding:10px 0;color:#6b7280;font-weight:bold;">
                        Submitted
                    </td>

                    <td style="padding:10px 0;color:#111827;">
                        ${new Date().toLocaleString()}
                    </td>
                </tr>

            </table>

        </td>
    </tr>

    <!-- Message -->
    <tr>
        <td style="padding:30px 35px;">

            <h3 style="margin:0 0 15px;color:#111827;font-size:18px;">
                Message
            </h3>

            <div
                style="
                    background:#ffffff;
                    border:1px solid #e5e7eb;
                    border-left:5px solid #15803D;
                    padding:20px;
                    border-radius:10px;
                    color:#374151;
                    font-size:15px;
                    line-height:1.8;
                    white-space:pre-wrap;
                ">

                ${message.trim()}

            </div>

        </td>
    </tr>

    <!-- CTA -->
    <tr>
        <td align="center" style="padding:0 35px 35px;">

            <a href="mailto:${email.trim()}"

            style="
                display:inline-block;
                background:#15803D;
                color:#ffffff;
                text-decoration:none;
                padding:14px 34px;
                border-radius:10px;
                font-size:15px;
                font-weight:bold;
            ">

                Reply to Sender

            </a>

        </td>
    </tr>

    <!-- Footer -->
    <tr>
        <td style="background:#f9fafb;padding:30px;text-align:center;border-top:1px solid #e5e7eb;">

            <p style="margin:0;color:#111827;font-weight:bold;">
                Saviora
            </p>

            <p style="margin:8px 0;color:#6b7280;font-size:14px;">
                Grow Your Financial Future
            </p>

            <p style="margin:15px 0 0;color:#94a3b8;font-size:12px;line-height:1.7;">
                This message was automatically generated from the
                Saviora website contact form.<br>
                Please reply directly to the sender if a response is required.
            </p>

            <p style="margin-top:18px;color:#cbd5e1;font-size:12px;">
                © ${new Date().getFullYear()} Saviora. All rights reserved.
            </p>

        </td>
    </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

    const emailTextBody = `New Contact Form Submission\n\nName: ${senderFullName}\nEmail: ${email.trim()}\nSubject: ${subject.trim()}\n\nMessage:\n${message.trim()}`;

    // Attempt 1: Direct SMTP2GO REST API if API key exists
    if (apiKey) {
      const response = await fetch("https://api.smtp2go.com/v3/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          to: [recipientEmail],
          sender: fromEmail,
          custom_headers: [
            {
              header: "Reply-To",
              value: `${senderFullName} <${email.trim()}>`,
            },
          ],
          subject: `New Contact Form Submission - ${subject.trim()}`,
          text_body: emailTextBody,
          html_body: emailHtmlBody,
        }),
      });

      const data = await response.json();
      if (!response.ok || data.data?.error) {
        console.error("SMTP2GO API Error:", data);
        return NextResponse.json(
          { error: data.data?.error || "Failed to send email via SMTP2GO API." },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, message: "Email sent successfully via SMTP2GO." });
    }

    // Attempt 2: SMTP server connection via Nodemailer
    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${senderFullName} via Saviora" <${fromEmail}>`,
        to: recipientEmail,
        replyTo: `"${senderFullName}" <${email.trim()}>`,
        subject: `New Contact Form Submission - ${subject.trim()}`,
        text: emailTextBody,
        html: emailHtmlBody,
      });

      return NextResponse.json({ success: true, message: "Email sent successfully via SMTP2GO SMTP server." });
    }

    // Fallback if environment variables are not configured yet
    return NextResponse.json(
      {
        error: "SMTP2GO server connection is not configured yet. Please set SMTP_USER and SMTP_PASS (or SMTP2GO_API_KEY) in .env.local.",
      },
      { status: 500 }
    );
  } catch (error: unknown) {
    console.error("Error in contact API route:", error);
    const errMessage = error instanceof Error ? error.message : "An unexpected error occurred while sending email.";
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
