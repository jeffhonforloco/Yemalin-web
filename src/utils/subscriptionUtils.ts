
import { toast } from "sonner";
import { sendEmail } from "./emailService";

interface SubscriptionData {
  email: string;
  source?: string;
}

/**
 * Handles newsletter subscription and notifies admin
 */
export const subscribeToNewsletter = async (data: SubscriptionData): Promise<boolean> => {
  try {
    // In a real application, this would also store the email in a database
    // For now, we'll just simulate success and notify admin via email
    
    // Send notification email to admin
    const result = await sendEmail({
      to: "Admin@yemalin.com",
      subject: "New Newsletter Subscription",
      body: `
        A new user has subscribed to the newsletter:
        
        Email: ${data.email}
        Source: ${data.source || 'Homepage'}
        Date: ${new Date().toLocaleString()}
      `
    });
    
    if (result) {
      toast.success("Thank you for subscribing to our newsletter!");
      return true;
    } else {
      toast.error("Something went wrong. Please try again later.");
      return false;
    }
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    toast.error("An error occurred. Please try again later.");
    return false;
  }
};
