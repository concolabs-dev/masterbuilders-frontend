import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Create a transporter object using PrivateEmail SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'mail.privateemail.com',
      port: 587, // Use 587 for TLS if needed
      secure: false, // true for SSL (465), false for TLS (587)
      auth: {
        user: process.env.PRIVATE_EMAIL_USER, // Your PrivateEmail address
        pass: process.env.PRIVATE_EMAIL_PASS, // Your PrivateEmail password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.PRIVATE_EMAIL_USER, // Sender email
      to: 'nipuna@concolabs.com',
      subject: `Contact Form Submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };
    console.log(mailOptions);
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("hari")
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}
