
import React from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { Truck, Package, RefreshCw, Clock, Globe, CreditCard } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const ShippingReturns = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="luxury-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Shipping & Returns</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Everything you need to know about our shipping options and return policies.
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-12">
        <div className="luxury-container">
          <Tabs defaultValue="shipping" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="shipping">Shipping Information</TabsTrigger>
              <TabsTrigger value="returns">Returns & Exchanges</TabsTrigger>
            </TabsList>
            
            {/* Shipping Tab */}
            <TabsContent value="shipping" className="pt-6">
              <div className="space-y-16">
                {/* Shipping Options */}
                <div>
                  <h2 className="text-3xl font-semibold mb-8">Shipping Options</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="border border-gray-200 p-6 rounded-md">
                      <div className="mb-4 bg-gray-100 w-12 h-12 flex items-center justify-center rounded-full">
                        <Truck className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-medium mb-3">Standard Shipping</h3>
                      <p className="text-gray-600 mb-3">3-5 business days</p>
                      <p className="text-gray-600 mb-3">$9.95 or free on orders over $150</p>
                      <p className="text-sm text-gray-500">
                        Available for all domestic orders within the United States
                      </p>
                    </div>

                    <div className="border border-gray-200 p-6 rounded-md">
                      <div className="mb-4 bg-gray-100 w-12 h-12 flex items-center justify-center rounded-full">
                        <Package className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-medium mb-3">Express Shipping</h3>
                      <p className="text-gray-600 mb-3">1-2 business days</p>
                      <p className="text-gray-600 mb-3">$19.95</p>
                      <p className="text-sm text-gray-500">
                        Orders placed before 12pm EST will be shipped the same day
                      </p>
                    </div>

                    <div className="border border-gray-200 p-6 rounded-md">
                      <div className="mb-4 bg-gray-100 w-12 h-12 flex items-center justify-center rounded-full">
                        <Globe className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-medium mb-3">International Shipping</h3>
                      <p className="text-gray-600 mb-3">7-14 business days</p>
                      <p className="text-gray-600 mb-3">Starting at $29.95</p>
                      <p className="text-sm text-gray-500">
                        Available to most countries worldwide. Import duties and taxes may apply.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping Policies */}
                <div>
                  <h2 className="text-3xl font-semibold mb-8">Shipping Policies</h2>
                  <div className="space-y-8 max-w-3xl">
                    <div>
                      <h3 className="text-xl font-medium mb-3">Order Processing</h3>
                      <p className="text-gray-700">
                        Most orders are processed within 24 hours of purchase. Once your order has shipped, 
                        you will receive a shipping confirmation email with tracking information.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-medium mb-3">Tracking Your Order</h3>
                      <p className="text-gray-700">
                        Once your order has shipped, you can track its status by:
                      </p>
                      <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-700">
                        <li>Clicking the tracking link in your shipping confirmation email</li>
                        <li>Logging into your account and visiting the "Orders" section</li>
                        <li>Contacting our customer service team with your order number</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-medium mb-3">Shipping Restrictions</h3>
                      <p className="text-gray-700">
                        Due to shipping regulations, we currently do not ship to PO boxes or APO/FPO addresses. 
                        For international shipping, please note that certain countries may have restrictions 
                        on imported goods.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-medium mb-3">International Orders</h3>
                      <p className="text-gray-700">
                        For international orders, customers are responsible for all customs duties, import taxes, 
                        and any other fees that may be imposed by your country's customs authorities. These charges 
                        are not included in the purchase price or shipping cost.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Returns Tab */}
            <TabsContent value="returns" className="pt-6">
              <div className="space-y-16">
                {/* Return Policy Overview */}
                <div>
                  <h2 className="text-3xl font-semibold mb-8">Return Policy</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="border border-gray-200 p-6 rounded-md">
                      <div className="mb-4 bg-gray-100 w-12 h-12 flex items-center justify-center rounded-full">
                        <RefreshCw className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-medium mb-3">Easy Returns</h3>
                      <p className="text-gray-600">
                        Return unworn items with tags attached within 30 days of delivery.
                      </p>
                    </div>

                    <div className="border border-gray-200 p-6 rounded-md">
                      <div className="mb-4 bg-gray-100 w-12 h-12 flex items-center justify-center rounded-full">
                        <Clock className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-medium mb-3">Refund Timeline</h3>
                      <p className="text-gray-600">
                        Returns within 14 days: full refund to original payment method. 
                        Returns between 15-30 days: store credit.
                      </p>
                    </div>

                    <div className="border border-gray-200 p-6 rounded-md">
                      <div className="mb-4 bg-gray-100 w-12 h-12 flex items-center justify-center rounded-full">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-medium mb-3">Return Shipping</h3>
                      <p className="text-gray-600">
                        Domestic return shipping fee: $7.95 (deducted from refund). 
                        Free for defective items or our error.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Return Process */}
                <div>
                  <h2 className="text-3xl font-semibold mb-8">How to Return</h2>
                  <div className="space-y-8 max-w-3xl">
                    <div className="flex border-b border-gray-200 pb-6">
                      <div className="flex-shrink-0 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-4">
                        1
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-2">Initiate Your Return</h3>
                        <p className="text-gray-700">
                          Log into your account and navigate to "Orders". Select the order containing 
                          item(s) you wish to return and follow the return instructions. Alternatively, 
                          contact our customer service team for assistance.
                        </p>
                      </div>
                    </div>

                    <div className="flex border-b border-gray-200 pb-6">
                      <div className="flex-shrink-0 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-4">
                        2
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-2">Print Return Label</h3>
                        <p className="text-gray-700">
                          Once your return is approved, you'll receive a return shipping label via email. 
                          Print the label and attach it to your package. If you're unable to print the label, 
                          contact customer service for alternatives.
                        </p>
                      </div>
                    </div>

                    <div className="flex border-b border-gray-200 pb-6">
                      <div className="flex-shrink-0 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-4">
                        3
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-2">Prepare Your Items</h3>
                        <p className="text-gray-700">
                          Ensure all items are in their original condition with tags attached. 
                          Pack them securely in the original packaging if possible, or in a similar 
                          protective package.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-4">
                        4
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-2">Ship Your Return</h3>
                        <p className="text-gray-700">
                          Drop off your package at any authorized shipping location. We recommend keeping 
                          the tracking number until your return is processed. Once received at our warehouse, 
                          returns typically take 3-5 business days to process.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exchange Information */}
                <div>
                  <h2 className="text-3xl font-semibold mb-8">Exchanges</h2>
                  <div className="bg-gray-50 p-8 rounded-md max-w-3xl">
                    <p className="text-gray-700 mb-6">
                      For the smoothest experience, we recommend returning the item for a refund and 
                      placing a new order for the desired replacement. This ensures you get the item 
                      you want without waiting for exchange processing.
                    </p>
                    <p className="text-gray-700 mb-6">
                      If you prefer a direct exchange, please contact our customer service team after 
                      initiating your return. Please note that exchanges are subject to availability 
                      and may take longer to process than standard returns.
                    </p>
                    <Button>Contact Customer Service</Button>
                  </div>
                </div>

                {/* Non-Returnable Items */}
                <div>
                  <h2 className="text-3xl font-semibold mb-8">Non-Returnable Items</h2>
                  <div className="max-w-3xl">
                    <p className="text-gray-700 mb-4">
                      The following items cannot be returned or exchanged:
                    </p>
                    <ul className="list-disc ml-6 space-y-2 text-gray-700">
                      <li>Custom-made or personalized items</li>
                      <li>Items marked as "Final Sale"</li>
                      <li>Items that have been worn, washed, or altered</li>
                      <li>Intimate apparel and swimwear</li>
                      <li>Accessories (including jewelry, scarves, and hair accessories)</li>
                      <li>Gift cards</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                      If you received a defective item, please contact our customer service team within 
                      7 days of delivery to arrange a replacement or refund.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="luxury-container">
          <h2 className="text-3xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-md shadow-sm">
              <h3 className="text-xl font-medium mb-2">When will my order ship?</h3>
              <p className="text-gray-700">
                Most orders are processed and shipped within 24 hours of purchase, excluding weekends and holidays. 
                Once shipped, you will receive a tracking number via email.
              </p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-sm">
              <h3 className="text-xl font-medium mb-2">Can I change my shipping address after placing an order?</h3>
              <p className="text-gray-700">
                Address changes can only be made within 1 hour of placing your order. Please contact our customer 
                service team immediately if you need to update your shipping address.
              </p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-sm">
              <h3 className="text-xl font-medium mb-2">Do you offer free returns?</h3>
              <p className="text-gray-700">
                While we don't offer free returns, we do provide a flat-rate return shipping fee of $7.95 for domestic returns. 
                This fee is waived for defective items or if we shipped the wrong item.
              </p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-sm">
              <h3 className="text-xl font-medium mb-2">How long will my refund take to process?</h3>
              <p className="text-gray-700">
                Once your return is received and inspected, refunds are typically processed within 3-5 business days. 
                It may take an additional 5-10 business days for the refund to appear on your statement, depending on your 
                financial institution.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-700 mb-6">
              Still have questions about shipping or returns?
            </p>
            <Button className="px-8">
              Contact Customer Support
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ShippingReturns;
