
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-semibold mb-8">Privacy Policy</h1>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-medium mb-4">1. Introduction</h2>
            <p className="mb-4">
              At Yemalin, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
            <p className="mb-4">
              This privacy policy aims to give you information on how Yemalin collects and processes your personal data through your use of this website, including any data you may provide when you sign up for our newsletter, purchase a product, or take part in a promotion.
            </p>
            <p className="mb-4">
              It is important that you read this privacy policy together with any other privacy policy or fair processing notice we may provide on specific occasions when we are collecting or processing personal data about you so that you are fully aware of how and why we are using your data.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-medium mb-4">2. The Data We Collect About You</h2>
            <p className="mb-4">
              Personal data means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).
            </p>
            <p className="mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Identity Data includes first name, last name, username or similar identifier.</li>
              <li>Contact Data includes billing address, delivery address, email address and telephone numbers.</li>
              <li>Financial Data includes payment card details.</li>
              <li>Transaction Data includes details about payments to and from you and other details of products you have purchased from us.</li>
              <li>Technical Data includes internet protocol (IP) address, your login data, browser type and version.</li>
              <li>Profile Data includes your username and password, purchases or orders made by you, your preferences.</li>
              <li>Usage Data includes information about how you use our website, products and services.</li>
              <li>Marketing and Communications Data includes your preferences in receiving marketing from us.</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-medium mb-4">3. How We Use Your Personal Data</h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>
            <p className="mb-4">
              Generally, we do not rely on consent as a legal basis for processing your personal data other than in relation to sending direct marketing communications to you via email. You have the right to withdraw consent to marketing at any time by contacting us.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-medium mb-4">4. Data Security</h2>
            <p className="mb-4">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions, and they are subject to a duty of confidentiality.
            </p>
            <p className="mb-4">
              We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-medium mb-4">5. Your Legal Rights</h2>
            <p className="mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>
            <p className="mb-4">
              If you wish to exercise any of the rights set out above, please contact us at <a href="mailto:Admin@yemalin.com" className="text-blue-600 hover:underline">Admin@yemalin.com</a>.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-medium mb-4">6. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about this privacy policy or our privacy practices, please contact us:
            </p>
            <p className="mb-4">
              Email address: <a href="mailto:Admin@yemalin.com" className="text-blue-600 hover:underline">Admin@yemalin.com</a>
            </p>
            <p className="mb-4">
              Postal address: 123 Fashion Avenue, Suite 500, New York, NY 10001, United States
            </p>
            <p className="mb-4">
              Phone number: +1 (212) 555-7890
            </p>
            <p className="mb-4">
              Last updated: April 6, 2025
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Privacy;
