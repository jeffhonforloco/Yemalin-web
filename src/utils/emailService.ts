
import { toast } from "sonner";

interface EmailData {
  to: string;
  subject: string;
  body: string;
  from?: string;
  replyTo?: string;
  attachments?: File[];
}

/**
 * Simple email service that simulates sending emails
 * In a production environment, this would connect to a real email service
 * or a backend API endpoint that handles email sending
 */
export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    // In a real app, this would be an API call to a backend service
    // For now, we'll just simulate the email sending with a console log
    
    console.log('Email would be sent with the following data:', {
      to: emailData.to,
      from: emailData.from || 'noreply@yemalin.com',
      replyTo: emailData.replyTo,
      subject: emailData.subject,
      body: emailData.body,
      attachments: emailData.attachments ? 
        `${emailData.attachments.length} attachment(s)` : 
        'No attachments'
    });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return success
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    toast.error('Failed to send email. Please try again later.');
    return false;
  }
};
