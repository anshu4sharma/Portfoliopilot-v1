import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RefundPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Refund Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none dark:prose-invert">
          <p>Last updated: January 3, 2025</p>

          <h2>1. Refund Eligibility</h2>
          <p>
            Due to the digital nature of our Pro subscription service, refunds
            are generally not provided. However, we may consider refund requests
            in exceptional circumstances.
          </p>

          <h2>2. Refund Timeframe</h2>
          <p>
            If eligible, refund requests must be submitted within 48 hours of
            the purchase. Requests after this period will not be considered.
          </p>

          <h2>3. Refund Conditions</h2>
          <ul>
            <li>Technical issues preventing access to Pro features</li>
            <li>Duplicate charges or billing errors</li>
            <li>Service unavailability exceeding 24 hours</li>
          </ul>

          <h2>4. Non-Refundable Items</h2>
          <p>The following are not eligible for refunds:</p>
          <ul>
            <li>Partial subscription periods</li>
            <li>Used Pro features</li>
            <li>Cancellations after the 48-hour window</li>
          </ul>

          <h2>5. Refund Process</h2>
          <p>To request a refund:</p>
          <ol>
            <li>Contact our support team at support@portfoliopilot.in</li>
            <li>Provide your account details and payment information</li>
            <li>Explain the reason for the refund request</li>
            <li>Include any relevant documentation or screenshots</li>
          </ol>

          <h2>6. Refund Method and Turnaround Time</h2>
          <p>
            Refunds will be processed using the original payment method.
            Processing time may vary depending on your payment provider, but it
            typically takes 5-7 working days for the refunded amount to be
            credited to your bank account.
          </p>

          <h2>7. Cancellation vs Refund</h2>
          <p>
            Canceling your subscription will stop future billing but does not
            automatically qualify for a refund of previous payments.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about our refund policy, please contact us
            at support@portfoliopilot.in.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
