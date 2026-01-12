import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function CancellationPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Cancellation Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none dark:prose-invert">
          <p>Last updated: Jan 2, 2024</p>

          <div className="mb-6">
            <div className="font-semibold">
              <p>Meerut, Uttar Pradesh</p>
              <p>India</p>
            </div>
          </div>

          <h2>1. Pro Plan Cancellation</h2>
          <p>
            Since portfoliopilot.in operates on a one-time payment model for a 3-month
            Pro plan period, there is no traditional subscription cancellation
            process. Your Pro access will automatically end after the 3-month
            period unless renewed.
          </p>

          <h2>2. Account Cancellation</h2>
          <p>You can cancel your portfoliopilot.in account at any time by:</p>
          <ul>
            <li>Logging into your account</li>
            <li>Navigating to account settings</li>
            <li>Selecting the "Delete Account" option</li>
          </ul>

          <h2>3. Effects of Cancellation</h2>
          <p>When you cancel your account:</p>
          <ul>
            <li>Your portfolio will be immediately taken offline</li>
            <li>All associated data will be deleted from our servers</li>
            <li>Your custom subdomain will become available for other users</li>
            <li>Any remaining Pro plan period will be forfeited</li>
          </ul>

          <h2>4. Data Retention</h2>
          <p>
            After account cancellation, we retain minimal data for 30 days to
            facilitate account recovery if requested. After this period, all
            data is permanently deleted.
          </p>

          <h2>5. Refund Eligibility</h2>
          <p>
            Please note that cancelling your account does not automatically
            qualify you for a refund. For refund-related matters, please refer
            to our
            <Link href="/refund-policy" className="text-primary hover:underline">
              Refund Policy
            </Link>
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about cancelling your account or Pro plan,
            please contact us at support@portfoliopilot.in.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
