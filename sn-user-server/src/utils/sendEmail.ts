"use strict";
import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
      service: "SendinBlue",
      auth: {
        user: process.env.SIB_SMTP_USER,
        pass: process.env.SIB_SMTP_PASS,
      },
    }
  );

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"SquiggsBot" <support@mail.squiggs.net>', // sender address
    to: to, // list of receivers (comma seperated)
    subject: subject, // Subject line
    html, // html body
  });

  console.log("Message sent: %s", info.messageId);
}
