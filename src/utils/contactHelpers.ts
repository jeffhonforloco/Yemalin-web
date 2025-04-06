
import { toast } from "sonner";
import { sendEmail } from "./emailService";

/**
 * Opens a mail client with pre-populated email address for customer support
 * Falls back to copying the email address to clipboard if mail client cannot be opened
 */
export const contactSupport = () => {
  const supportEmail = "info@yemalin.com";
  const subject = "Customer Support Request";
  
  try {
    // Try to open the default mail client
    window.open(`mailto:${supportEmail}?subject=${encodeURIComponent(subject)}`, '_blank');
    toast.success("Opening your email client");
  } catch (error) {
    // Fallback: Copy email to clipboard
    navigator.clipboard.writeText(supportEmail)
      .then(() => {
        toast.success(`Email address copied to clipboard: ${supportEmail}`);
      })
      .catch(() => {
        toast.error("Could not open email client or copy to clipboard");
        toast("Please email us at info@yemalin.com");
      });
  }
};

/**
 * Sends a support request email directly through the app
 * Used when more data needs to be included in the request
 */
export const sendSupportEmail = async (
  subject: string,
  message: string,
  name?: string,
  replyTo?: string
) => {
  try {
    const result = await sendEmail({
      to: "info@yemalin.com",
      subject: `Support Request: ${subject}`,
      body: `
        Name: ${name || "Not provided"}
        Reply Email: ${replyTo || "Not provided"}
        
        Message:
        ${message}
      `,
      replyTo: replyTo
    });
    
    if (result) {
      toast.success("Your support request has been sent");
      return true;
    } else {
      toast.error("Failed to send support request");
      return false;
    }
  } catch (error) {
    console.error("Error sending support email:", error);
    toast.error("An error occurred while sending your request");
    return false;
  }
};
