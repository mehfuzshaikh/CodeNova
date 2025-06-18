export const otpEmailTemplate = (otp: string, isResend = false) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
    <h1 style="
        font-weight: 700;
        font-size: 28px;
        display: inline-block;
        background: linear-gradient(to right, #60a5fa, #1e40af);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
        margin-bottom: 10px;
    ">
    CodeNova
    </h1>
    <h2 style="color:rgb(0, 0, 0);">🔐 ${isResend ? 'Resend OTP Code' : 'Verify Your Email'}</h2>
    <p style="font-size: 16px;">Hey,</p>
    <p style="font-size: 16px; padding-bottom: 5px;">
      ${isResend ? 'As requested, here is your new OTP code:' : 'Thank you for signing up. Please verify your email with the following OTP code:'}
    </p>
    <div style="text-align: center; margin: 20px 0;">
      <span style="font-size: 24px; font-weight: bold; color: #2e6fdb; padding: 10px 20px; border: 2px dashed #2e6fdb; border-radius: 8px;">
        ${otp}
      </span>
    </div>
    <p style="font-size: 14px; color: #555; padding-top:5px">This code will expire in 5 minutes.</p>
    <hr style="margin: 30px 0;" />
    <p style="font-size: 12px; color: #aaa;">If you didn’t request this, you can ignore it safely.</p>
  </div>
`;

export const passwordResetTemplate = (resetLink: string) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
    <h2 style="color: #d9534f;">🔑 Reset Your Password</h2>
    <p style="font-size: 16px;">Hey,</p>
    <p style="font-size: 16px;">We received a request to reset your password. Click the button below to proceed:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetLink}" style="padding: 12px 24px; background-color: #d9534f; color: white; text-decoration: none; font-weight: bold; border-radius: 6px;">
        Reset Password
      </a>
    </div>
    <p style="font-size: 14px; color: #555;">If you didn’t request this, you can ignore this email.</p>
    <hr style="margin: 30px 0;" />
    <p style="font-size: 12px; color: #aaa;">This link will expire in 15 minutes.</p>
  </div>
`;
