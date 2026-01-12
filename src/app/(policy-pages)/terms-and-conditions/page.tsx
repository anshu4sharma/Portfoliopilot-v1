import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Terms and Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none dark:prose-invert">
          <p>Last updated: Jan 1, 2025</p>

          <div className="mb-6">
            <div className="font-semibold">
              <p>Meerut, Uttar Pradesh</p>
              <p>India</p>
            </div>
          </div>

          <h2>1. Introduction and Acceptance of Terms</h2>
          <p>
            These Terms and Conditions ("Terms") constitute a legally binding
            agreement between you and Portfoliopilot, operating as
            portfoliopilot.in ("we," "our," or "us"). By accessing or using
            portfoliopilot.in, you agree to be bound by these Terms and
            Conditions.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            portfoliopilot.in, operated by Portfoliopilot, is an open-source
            portfolio builder for developers. We provide tools for creating,
            managing, and sharing personalized portfolios.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to accept responsibility for all
            activities that occur under your account. Portfoliopilot reserves
            the right to refuse service, terminate accounts, or modify content
            at its sole discretion.
          </p>

          <h2>4. User Content</h2>
          <p>
            You retain all rights to the content you upload to
            portfoliopilot.in. By uploading content, you grant Portfoliopilot a
            non-exclusive, worldwide, royalty-free license to use, display, and
            distribute your content for the purpose of providing and promoting
            our services.
          </p>

          <h2>5. Prohibited Uses</h2>
          <p>
            You agree not to use portfoliopilot.in for any unlawful purpose or
            in any way that could damage, disable, overburden, or impair our
            service. Portfoliopilot reserves the right to investigate and take
            appropriate legal action against anyone who violates these
            provisions.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            The portfoliopilot.in service and its original content (excluding
            user-submitted content) are and will remain the exclusive property
            of Portfoliopilot and its licensors. The service is protected by
            copyright, trademark, and other laws.
          </p>

          <h2>7. Termination</h2>
          <p>
            Portfoliopilot reserves the right to terminate or suspend your
            account and access to portfoliopilot.in at our sole discretion,
            without notice, for conduct that we believe violates these Terms and
            Conditions or is harmful to other users, us, or third parties, or
            for any other reason.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            Portfoliopilot reserves the right to modify these Terms and
            Conditions at any time. We will notify users of any significant
            changes. Your continued use of portfoliopilot.in after any such
            changes constitutes your acceptance of the new Terms and Conditions.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            Portfoliopilot shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages resulting from your use
            of or inability to use the service.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of India, without regard to its conflict of law provisions.
          </p>

          <h2>11. Contact Information</h2>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us at:
          </p>
          <p>Portfoliopilot</p>
          <br />
          <p>Email: support@portfoliopilot.in</p>
          <br />
          <p>Meerut, Uttar Pradesh, India</p>
        </CardContent>
      </Card>
    </div>
  );
}
