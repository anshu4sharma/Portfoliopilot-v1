import React from "react";
import { render } from "@react-email/render";
import WelcomeEmail from "@/app/emails/WelcomeEmail";
import { ReactElement } from "react";
import TestEmail from "@/app/emails/TestEmail";
import PortlyPro from "@/app/emails/PortlyPro";

const emailTemplates: Record<string, ReactElement> = {
  welcome: <WelcomeEmail />,
  test: <TestEmail />,
  "portly-pro": <PortlyPro />,
};

const PreviewPage = ({ params }: { params: { template: string } }) => {
  const template = params.template;

  if (!emailTemplates[template]) {
    return <div>Email template not found</div>;
  }

  // Render the email template to HTML
  const htmlContent = render(emailTemplates[template]);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold">Preview: {template}</h1>
      <div className="flex items-center justify-center">
        <iframe
          srcDoc={htmlContent}
          className="min-h-screen w-full border p-10"
          // style={{ width: "600px", height: "600px", border: "1px solid #ccc" }}
          sandbox=""
        ></iframe>
      </div>
    </div>
  );
};

export default PreviewPage;
