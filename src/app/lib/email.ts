import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendOTPEmail(email: string, otp: string, name: string) {
  const mailOptions = {
    from: `"News Wallah" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email - News Wallah",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(to right, #4f46e5, #7c3aed); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .otp-box { background: white; border: 2px dashed #4f46e5; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
            .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #4f46e5; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to News Wallah!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for signing up! Please verify your email address by entering the OTP below:</p>
              
              <div class="otp-box">
                <p style="margin: 0; font-size: 14px; color: #6b7280;">Your OTP Code</p>
                <div class="otp-code">${otp}</div>
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #6b7280;">Valid for 10 minutes</p>
              </div>
              
              <p><strong>Security Tips:</strong></p>
              <ul>
                <li>Never share this OTP with anyone</li>
                <li>News Wallah will never ask for your OTP via phone or email</li>
                <li>This OTP expires in 10 minutes</li>
              </ul>
              
              <p>If you didn't request this, please ignore this email.</p>
              
              <div class="footer">
                <p>&copy; 2025 News Wallah. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error };
  }
}
