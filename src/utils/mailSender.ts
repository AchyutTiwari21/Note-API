import nodemailer from 'nodemailer';

const mailSender = async (email: string, title: string, body: string) => {
  try {
    if(!process.env.MAIL_USER || !process.env.MAIL_PASS || !process.env.MAIL_HOST) {
      throw new Error("Email credentials are not set in environment variables.");
    }
    // Create a Transporter to send emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
      }
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: {
        name: "Note API",
        address: process.env.MAIL_USER
      },
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error: any) {
    console.log(error.message);
  }
};

export default mailSender;