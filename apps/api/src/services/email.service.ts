import { SendMailClient } from "zeptomail";

interface EmailRecipient {
  address: string;
  name: string;
}

interface SendEmailInput {
  to: EmailRecipient[];
  subject: string;
  htmlBody: string;
  textBody?: string;
}

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Initialize ZeptoMail client
const initializeEmailClient = () => {
  const url =
    process.env.ZEPTOMAIL_URL || "https://api.zeptomail.in/v1.1/email";
  const tokenFromEnv = process.env.ZEPTOMAIL_TOKEN;

  if (!tokenFromEnv) {
    throw new Error(
      "ZEPTOMAIL_TOKEN is not configured in environment variables"
    );
  }

  // If token doesn't start with "Zoho-enczapikey", add it
  // This allows storing the token without the prefix to avoid space issues in Docker
  const token = tokenFromEnv.startsWith("Zoho-enczapikey")
    ? tokenFromEnv
    : `Zoho-enczapikey ${tokenFromEnv}`;

  return new SendMailClient({ url, token });
};

export const emailService = {
  /**
   * Send a generic email
   */
  async sendEmail(input: SendEmailInput): Promise<boolean> {
    try {
      const client = initializeEmailClient();
      const fromAddress = process.env.ZEPTOMAIL_FROM_ADDRESS || "hi@opensox.ai";
      const fromName =
        process.env.ZEPTOMAIL_FROM_NAME || "Ajeet from Opensox AI";

      await client.sendMail({
        from: {
          address: fromAddress,
          name: fromName,
        },
        to: input.to.map((recipient) => ({
          email_address: {
            address: recipient.address,
            name: recipient.name,
          },
        })),
        subject: input.subject,
        htmlbody: input.htmlBody,
        ...(input.textBody && { textbody: input.textBody }),
      });

      return true;
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Email sending error:", error);
      }
      throw new Error("Failed to send email");
    }
  },

  /**
   * Send premium subscription confirmation email
   * This is sent when a user subscribes to Opensox Premium
   */
  async sendPremiumSubscriptionEmail(
    email: string,
    firstName: string
  ): Promise<boolean> {
    const safeFirstName = escapeHtml(firstName);
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <p style="color: #333; line-height: 1.8; font-size: 16px;">
          Hi ${safeFirstName},
        </p>
        
        <p style="color: #333; line-height: 1.8; font-size: 16px;">
          I am Ajeet, founder of Opensox AI.
        </p>
        
        <p style="color: #333; line-height: 1.8; font-size: 16px;">
          First of all, <strong>thank you for believing in me and Opensox AI.</strong>
        </p>
        
        <p style="color: #333; line-height: 1.8; font-size: 16px;">
          Throughout this journey, I will make sure you get the best value for your money.
        </p>
        
        <p style="color: #333; line-height: 1.8; font-size: 16px;">
          To get started, please book your slot in the cal meet.
        </p>
        
        <p style="color: #333; line-height: 1.8; font-size: 16px;">
          Let's have a chat over a meeting so that I can understand where you are currently and how I can help you move ahead.
        </p>
        
        <p style="color: #333; line-height: 1.8; font-size: 16px;">
          Again, thank you :)
        </p>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="https://cal.com/ajeetunc/opensox" 
             style="background-color: #007bff; color: white; padding: 14px 32px; 
                    text-decoration: none; border-radius: 6px; display: inline-block; 
                    font-weight: 600; font-size: 16px;">
            📅 Book Your Meeting
          </a>
        </div>
        
        <p style="color: #333; line-height: 1.8; font-size: 16px;">
          <strong>Cal:</strong> <a href="https://cal.com/ajeetunc/opensox" style="color: #007bff;">https://cal.com/ajeetunc/opensox</a>
        </p>
        
        <p style="color: #333; line-height: 1.8; font-size: 16px; margin-top: 30px;">
          Best,<br/>
          Ajeet from Opensox.ai
        </p>
      </div>
    `;

    const textBody = `Hi ${safeFirstName},

I am Ajeet, founder of Opensox AI.

First of all, thank you for believing in me and Opensox AI.

Throughout this journey, I will make sure you get the best value for your money.

To get started, please book your slot in the cal meet.

Let's have a chat over a meeting so that I can understand where you are currently and how I can help you move ahead.

Again, thank you :)

Cal: https://cal.com/ajeetunc/opensox

Best,
Ajeet from Opensox.ai`;

    return this.sendEmail({
      to: [{ address: email, name: safeFirstName }],
      subject: "Congratulations! You are in.",
      htmlBody,
      textBody,
    });
  },
};
