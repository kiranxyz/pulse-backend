import nodemailer from "nodemailer";
import fs from "fs";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  attachmentPath: string;
}

export async function sendTicketEmail(options: SendEmailOptions) {
  const { to, subject, html, attachmentPath } = options;

  try {
    checkEnvVariables();
    // Configure SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // TLS
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Event Team" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html,
      attachments: [
        {
          filename: "your-ticket.pdf",
          content: fs.createReadStream(attachmentPath),
          contentType: "application/pdf",
        },
      ],
    });
  } catch (error) {
    console.error("Error sending ticket email:", error);
    throw error;
  }
}

const checkEnvVariables = () => {
  const requiredVars = [
    "SMTP_EMAIL",
    "SMTP_PASSWORD",
    "SMTP_HOST",
    "SMTP_PORT",
  ];
  requiredVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  });
};
