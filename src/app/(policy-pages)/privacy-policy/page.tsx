import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none dark:prose-invert">
          <p>Last updated: Jan 2, 2024</p>

          <div className="mb-6">
            <p className="font-semibold">
              <p>Meerut, Uttar Pradesh</p>
              <p>India</p>
            </p>
          </div>

          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy describes how Portfoliopilot ("we," "our,"
            or "us"), operating as portfoliopilot.in, collects, uses, processes, and
            protects your personal information when you use our portfolio
            builder service. By using portfoliopilot.in, you agree to the collection
            and use of information in accordance with this policy.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            Portfoliopilot collects several types of information for
            various purposes:
          </p>
          <h3>2.1 Personal Information</h3>
          <ul>
            <li>Name and contact information when you create an account</li>
            <li>Professional information you provide for your portfolio</li>
            <li>Communication data when you contact our support team</li>
            <li>Payment information when applicable</li>
          </ul>

          <h3>2.2 Usage Data</h3>
          <ul>
            <li>IP address and browser information</li>
            <li>Pages of our service that you visit</li>
            <li>Time and date of your visit</li>
            <li>Device information</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>
            Portfoliopilot uses the collected data for various purposes:
          </p>
          <ul>
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>
              To gather analysis or valuable information to improve our service
            </li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2>4. Data Storage and Security</h2>
          <p>
            Portfoliopilot implements industry-standard security measures
            to protect your personal information, including:
          </p>
          <ul>
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication measures</li>
            <li>Physical and environmental security</li>
          </ul>

          <h2>5. Your Data Protection Rights</h2>
          <p>
            Under applicable data protection laws, you have the following
            rights:
          </p>
          <ul>
            <li>Right to access your personal data</li>
            <li>Right to correct inaccurate personal data</li>
            <li>Right to request deletion of your personal data</li>
            <li>Right to restrict processing of your personal data</li>
            <li>Right to data portability</li>
            <li>Right to object to processing of your personal data</li>
          </ul>

          <h2>6. Third-Party Services</h2>
          <p>
            We may employ third-party companies and individuals to facilitate
            our service. These third parties have access to your personal
            information only to perform specific tasks on our behalf and are
            obligated not to disclose or use it for any other purpose.
          </p>

          <h2>7. Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to track activity
            on our service and hold certain information. You can instruct your
            browser to refuse all cookies or to indicate when a cookie is being
            sent.
          </p>

          <h2>8. Children's Privacy</h2>
          <p>
            Our service does not address anyone under the age of 13. We do not
            knowingly collect personally identifiable information from children
            under 13.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            Portfoliopilot reserves the right to update this Privacy Policy
            at any time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>10. Contact Information</h2>
          <p>
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at:
          </p>
          <p>
            Portfoliopilot
            <br />
            Email: support@portfoliopilot.in <br /> Meerut, Uttar Pradesh, India
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
