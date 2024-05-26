import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

type sendEmailProps = {
  emailFrom: string;
  emailTo: string | string[];
  subject: string;
  html: string;
};

export const sendEmail = async ({
  emailFrom,
  emailTo,
  subject,
  html,
}: sendEmailProps) => {
  try {
    const sendEmailTo = (() => {
      if (typeof emailTo === "string") {
        return [emailTo];
      }
      return emailTo;
    })();

    return await resend.emails.send({
      from: emailFrom,
      to: sendEmailTo,
      subject,
      html,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error sending email");
  }
};
