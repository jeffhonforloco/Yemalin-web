
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { contactSupport } from "@/utils/contactHelpers";

const Terms = () => {
  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-semibold mb-8">Terms & Conditions</h1>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-medium mb-4">1. Introduction</h2>
            <p className="mb-4">
              These terms and conditions govern your use of our website and the purchase of products from our online store. By accessing our website or placing an order, you agree to be bound by these terms and conditions.
            </p>
            <p className="mb-4">
              Please read these terms carefully before using our website or placing an order. If you do not agree to these terms, you must not use our website or purchase products from us.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-medium mb-4">2. Your Account</h2>
            <p className="mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
            </p>
            <p className="mb-4">
              You are responsible for safeguarding the password that you use to access our website and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-medium mb-4">3. Products</h2>
            <p className="mb-4">
              The images of the products on our website are for illustrative purposes only. Although we have made every effort to display the colors accurately, we cannot guarantee that your computer's display of the colors accurately reflects the color of the products. Your products may vary slightly from those images.
            </p>
            <p className="mb-4">
              All products shown on our website are subject to availability. We will inform you by e-mail as soon as possible if the product you have ordered is not available and we will not process your order if made.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-medium mb-4">4. Pricing and Payment</h2>
            <p className="mb-4">
              The price of products will be as quoted on our site from time to time. We take all reasonable care to ensure that the prices of products are correct at the time when the relevant information was entered onto the system.
            </p>
            <p className="mb-4">
              Our site contains a large number of products and it is always possible that, despite our reasonable efforts, some of the products on our site may be incorrectly priced. We will normally verify prices as part of our dispatch procedures so that where a product's correct price is less than the stated price, we will charge the lower amount. If a product's correct price is higher than the price stated on our site, we will normally, at our discretion, either contact you for instructions before dispatching the product, or reject your order and notify you of such rejection.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-medium mb-4">5. Delivery</h2>
            <p className="mb-4">
              We aim to deliver the products to you at the place of delivery requested by you in your order within the time indicated by us at the time of your order.
            </p>
            <p className="mb-4">
              If you fail to accept delivery of a product at the time they are ready for delivery, or we are unable to deliver at the nominated time due to your failure to provide appropriate instructions, or authorizations, then such products shall be deemed to have been delivered to you and all risk and responsibility in relation to such products shall pass to you.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-medium mb-4">6. Returns and Refunds</h2>
            <p className="mb-4">
              Please refer to our Shipping & Returns page for detailed information on our return policy.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-medium mb-4">7. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms & Conditions, please contact us:
            </p>
            <p className="mb-4">
              Email address: 
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  contactSupport();
                }} 
                className="text-blue-600 hover:underline inline-flex items-center ml-1"
              >
                Admin@yemalin.com
                <Mail className="ml-1 h-4 w-4" />
              </a>
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

export default Terms;
