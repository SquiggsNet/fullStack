"use strict";
import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, subject: string, html: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing


  // const testAccount = await nodemailer.createTestAccount();
  // console.log("testAcct", testAccount);

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "tyuiaceimzsewkho@ethereal.email", // generated ethereal user
      pass: "Xfr4KAkCEtXq3773N3", // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"The SquiggsNet" <support@squiggs.net>', // sender address
    to: to, // list of receivers (comma seperated)
    subject: subject, // Subject line
    html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
