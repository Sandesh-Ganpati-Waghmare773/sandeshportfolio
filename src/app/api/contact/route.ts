import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Email format regex (RFC 5322 compliant simplified)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Helper to escape HTML characters in email body to prevent injection
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    // 1. Verify JSON payload
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const {
      name: rawName,
      email: rawEmail,
      inquiryType: rawInquiryType,
      message: rawMessage,
      hp: honeypot, // Honeypot field for bot spam prevention
    } = body ?? {};

    // 2. Honeypot check: If bot filled the hidden field, silently return success
    if (honeypot && typeof honeypot === "string" && honeypot.trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Message sent successfully!" },
        { status: 200 }
      );
    }

    // 3. Server-side validation
    if (typeof rawName !== "string" || !rawName.trim()) {
      return NextResponse.json(
        { success: false, error: "Please provide your name." },
        { status: 400 }
      );
    }

    if (typeof rawEmail !== "string" || !rawEmail.trim() || !EMAIL_REGEX.test(rawEmail.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (typeof rawMessage !== "string" || rawMessage.trim().length < 8) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 8 characters long." },
        { status: 400 }
      );
    }

    // Length limit checks to protect against payload abuse
    const name = rawName.trim().slice(0, 100);
    const email = rawEmail.trim().slice(0, 254);
    const inquiryType = (typeof rawInquiryType === "string" && rawInquiryType.trim())
      ? rawInquiryType.trim().slice(0, 120)
      : "General Inquiry";
    const message = rawMessage.trim().slice(0, 5000);

    // 4. Verify Resend API Key is configured
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === "YOUR_RESEND_API_KEY" || apiKey === "your_resend_api_key_here") {
      console.error("[API/Contact] RESEND_API_KEY is not configured in environment variables.");
      return NextResponse.json(
        {
          success: false,
          error: "The email delivery service is currently being configured. Please email directly at wsandesh560@gmail.com.",
        },
        { status: 500 }
      );
    }

    // 5. Initialize Resend client
    const resend = new Resend(apiKey);

    // Format current timestamp (IST and UTC)
    const now = new Date();
    const formattedDate = now.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    }) + " (IST)";

    // 6. Send email via Resend
    // 'from': Must use verified domain or Resend's default 'onboarding@resend.dev'
    // 'to': Sandesh's email
    // 'replyTo': Visitor's validated email address (hitting Reply replies to visitor)
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["wsandesh560@gmail.com"],
      replyTo: email,
      subject: `[Portfolio Inquiry] ${inquiryType} - ${name}`,
      text: [
        "New Portfolio Contact Submission",
        "----------------------------------------",
        `Time: ${formattedDate}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Topic: ${inquiryType}`,
        "",
        "Message:",
        message,
        "----------------------------------------",
        `Reply directly to this email to reply to ${name} (${email}).`,
      ].join("\n"),
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Portfolio Message</title>
        </head>
        <body style="margin: 0; padding: 24px; background-color: #0B0D0F; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F5F5F5;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #15181B; border: 1px solid #292D32; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
            <!-- Header bar with brand accent -->
            <tr>
              <td style="padding: 24px 28px; background-color: #101214; border-bottom: 1px solid #292D32;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <span style="display: inline-block; padding: 4px 10px; background-color: rgba(255, 138, 0, 0.12); border: 1px solid rgba(255, 138, 0, 0.28); border-radius: 9999px; font-size: 11px; font-family: monospace; font-weight: bold; color: #FFB020; text-transform: uppercase; letter-spacing: 1px;">
                        Portfolio Contact
                      </span>
                      <h2 style="margin: 10px 0 0 0; font-size: 20px; font-weight: 700; color: #FFFFFF;">
                        New message from <span style="color: #FF8A00;">${escapeHtml(name)}</span>
                      </h2>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Details Section -->
            <tr>
              <td style="padding: 24px 28px;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 8px 0; font-size: 13px; color: #71717A; width: 120px; font-family: monospace;">SENDER NAME:</td>
                    <td style="padding: 8px 0; font-size: 14px; color: #FFFFFF; font-weight: 600;">${escapeHtml(name)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 13px; color: #71717A; font-family: monospace;">SENDER EMAIL:</td>
                    <td style="padding: 8px 0; font-size: 14px; color: #FFB020; font-weight: 500;">
                      <a href="mailto:${escapeHtml(email)}" style="color: #FFB020; text-decoration: none;">${escapeHtml(email)}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 13px; color: #71717A; font-family: monospace;">INQUIRY TOPIC:</td>
                    <td style="padding: 8px 0; font-size: 14px; color: #F5F5F5;">
                      <span style="background-color: #191C20; padding: 3px 8px; border-radius: 6px; border: 1px solid #292D32;">
                        ${escapeHtml(inquiryType)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 13px; color: #71717A; font-family: monospace;">SUBMITTED AT:</td>
                    <td style="padding: 8px 0; font-size: 12px; color: #A1A1AA;">${escapeHtml(formattedDate)}</td>
                  </tr>
                </table>

                <!-- Message Box -->
                <div style="margin-top: 16px;">
                  <div style="font-size: 12px; font-family: monospace; color: #A1A1AA; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                    MESSAGE CONTENT:
                  </div>
                  <div style="background-color: #0B0D0F; border: 1px solid #292D32; border-radius: 12px; padding: 18px; font-size: 14px; line-height: 1.6; color: #F5F5F5; white-space: pre-wrap;">
${escapeHtml(message)}
                  </div>
                </div>

                <!-- Reply action callout -->
                <div style="margin-top: 24px; padding: 14px 18px; background-color: #101214; border: 1px solid #292D32; border-radius: 10px; font-size: 12px; color: #A1A1AA; line-height: 1.5;">
                  💡 <strong style="color: #F5F5F5;">Quick Reply:</strong> Hitting <strong style="color: #FF8A00;">Reply</strong> in your email client will reply directly to <span style="color: #FFFFFF;">${escapeHtml(email)}</span>.
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 16px 28px; background-color: #101214; border-top: 1px solid #292D32; text-align: center; font-size: 11px; color: #71717A;">
                Sandesh Waghmare Portfolio &bull; Automated Contact Dispatcher
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("[API/Contact] Resend error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send your message. Please try again or write directly to wsandesh560@gmail.com.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! I'll get back to you soon.",
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("[API/Contact] Unexpected server error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again or contact wsandesh560@gmail.com directly.",
      },
      { status: 500 }
    );
  }
}
