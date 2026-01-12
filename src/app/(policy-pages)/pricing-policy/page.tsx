export default function PricingPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Pricing Policy
        </h1>
      </div>

      {/* Payment Policy */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-foreground">Payment Policy</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          <strong>Monthly Payment:</strong> The Pro Plan follows a one time
          payment model at ₹99 (special offer price, regular price
          ₹1200).
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          <strong>Refunds:</strong> We do not offer refunds for any payments
          made for Pro Plan purchases. Please review the features carefully
          before purchasing.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          <strong>Payment Methods:</strong> We accept payments through UPI, net
          banking, debit/credit cards, and other Razorpay-supported methods.
        </p>
      </div>

      {/* Upgrade & Renewal */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-foreground">
          Upgrade & Renewal Policy
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          <strong>Upgrade:</strong> Users can upgrade to the Pro Plan at any
          time by making a payment via the provided payment methods.
        </p>
        {/* <p className="mt-4 leading-relaxed text-muted-foreground">
          <strong>Renewal:</strong> At the end of the 3-month Pro Plan period,
          users can renew their plan by purchasing it again.
        </p> */}
      </div>

      {/* Taxes */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-foreground">Taxes</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          All prices listed are inclusive of applicable taxes (if any).
        </p>
      </div>

      {/* Changes */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-foreground">
          Changes to Pricing Policy
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          portfoliopilot.in reserves the right to modify this pricing policy at any
          time. Changes will be communicated via our website or email and will
          take effect immediately for new purchases.
        </p>
      </div>

      {/* Contact */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          For any questions or concerns related to our pricing policy, please
          contact us at:
        </p>
        <p className="mt-4 text-muted-foreground">
          <strong>Email:</strong>{" "}
          <a
            href="mailto:support@portfoliopilot.in"
            className="text-primary underline"
          >
            support@portfoliopilot.in
          </a>
        </p>
      </div>
    </div>
  );
}
