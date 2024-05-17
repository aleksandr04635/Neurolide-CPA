import nodemailer from "nodemailer";
import Handlebars from "handlebars";

import path from "path";

import { confirmTemplate } from "@/emails/confirm-email";
import { resetTemplate } from "@/emails/reset-email";

//const adress = process.env.EMAIL_SENDING_ADRESS as string;

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  /*  console.log(
    "email, callbackUrl, token from sendVerificationEmail: ",
    email,
    callbackUrl,
    token
  ); */
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  console.log("confirmLink from sendVerificationEmail: ", resetLink);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
  //console.log("transporter: ", transporter);
  // verify connection configuration
  try {
    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        console.log("verify connection configuration");
        if (error) {
          console.log("error:", error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    /*  console.log("process.cwd(): ", process.cwd());
    const emailFile = readFileSync(process.cwd() + "/emails/reset-email.html", {
      encoding: "utf8",
    });
    //console.log("emailFile: ", emailFile);
    const emailTemplate = Handlebars.compile(emailFile); */
    const emailTemplate = Handlebars.compile(resetTemplate);

    let mailOptions = {
      from: `Neurolide <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Зміна пароля",
      text: resetLink,
      html: emailTemplate({
        base_url: domain,
        signin_url: resetLink,
        email: email,
      }),
    };
    // html: `Click on the link to reset the password ${link}`, //new
    //console.log("mailOptions: ", mailOptions);

    const prom = new Promise((resolve, reject) => {
      //return resolve("info"); //REMOVE
      transporter.sendMail(mailOptions, (err, info) => {
        console.log("Email sent: " + info.response);
        if (err) {
          console.error(err);
          return reject(err);
        } else {
          //console.log("info from transporter.sendMail", info);
          return resolve(info);
        }
      });
    });

    try {
      const result = await prom;
      console.log("result from verification email prom: ", result);
      return "success";
    } catch (error) {
      console.log("error from verification email prom: ", error);
      return "error";
    }
  } catch (error) {
    return "error";
  }
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
  callbackUrl: string | null | undefined
) => {
  /*  console.log(
    "email, callbackUrl, token from sendVerificationEmail: ",
    email,
    callbackUrl,
    token
  ); */
  const confirmLink = `${domain}/auth/new-verification?token=${token}&email=${email}${
    callbackUrl ? `&callbackUrl=${callbackUrl}` : ""
  }`;

  console.log("confirmLink from sendVerificationEmail: ", confirmLink);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
  //console.log("transporter: ", transporter);
  // verify connection configuration
  try {
    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        console.log("verify connection configuration");
        if (error) {
          console.log("error:", error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    const emailTemplate = Handlebars.compile(confirmTemplate);

    let mailOptions = {
      from: `Neurolide <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Підтвердіть Ваш email",
      text: confirmLink,
      html: emailTemplate({
        base_url: domain,
        signin_url: confirmLink,
        email: email,
      }),
    };
    // html: `Click on the link to reset the password ${link}`, //new
    //console.log("mailOptions: ", mailOptions);

    const prom = new Promise((resolve, reject) => {
      //return resolve("info"); //REMOVE
      transporter.sendMail(mailOptions, (err, info) => {
        console.log("Email sent: " + info.response);
        if (err) {
          console.error(err);
          return reject(err);
        } else {
          //console.log("info from transporter.sendMail", info);
          return resolve(info);
        }
      });
    });

    try {
      const result = await prom;
      console.log("result from verification email prom: ", result);
      return "success";
    } catch (error) {
      console.error("error from verification email prom: ", error);
      return "error";
    }
  } catch (error) {
    console.error("error from verification email sending: ", error);
    return "error";
  }
};
