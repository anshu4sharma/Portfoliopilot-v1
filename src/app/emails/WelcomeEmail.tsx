import {
  Html,
  Head,
  Body,
  Text,
  Tailwind,
  Container,
  Link,
  Img,
  Section,
} from "@react-email/components";
import * as React from "react";

// Let's Build Your Portfolio Today, {{username}}!
const WelcomeEmail = () => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="max-w-xl p-8">
            {/* Logo and Header */}
            <Section className="pl-5">
              <div className="mb-6 flex items-center gap-2">
                <Img
                  className="h-12 w-12 rounded object-cover"
                  src="https://res.cloudinary.com/dzqnzl3ir/image/upload/t_media_lib_thumb/portly-logo/r4bsalindlvnnlak4hge"
                />
                <Text className="ml-1 font-medium text-black">portfoliopilot.in</Text>
              </div>
              <Text className="mb-2 text-xl text-gray-900">
                Hi {`{{username}}`},
              </Text>
              <Text className="mb-2 text-base text-gray-900">
                We noticed you’ve logged in to portfoliopilot.in but haven’t created
                your portfolio yet.
              </Text>
              <Text className="mb-2 text-base text-gray-900">
                Your portfolio is a powerful tool to showcase your skills,
                achievements, and potential—perfect for impressing clients or
                employers.
              </Text>
              <Text className="mb-2 text-base text-gray-900">
                Don’t wait! Start building your professional portfolio today.
                It’s quick, simple, and designed to make you stand out.Don’t
                wait! Start building your professional portfolio today. It’s
                quick, simple, and designed to make you stand out.
              </Text>
              <Link href="https://portfoliopilot.in/create-portfolio">
                Create Your Portfolio Now
              </Link>
            </Section>

            {/* Premium Features */}
            <Link href="https://portfoliopilot.in/pricing" className="h-[512px]">
              <Img
                className="h-[512px] w-auto"
                src={
                  "https://res.cloudinary.com/dzqnzl3ir/image/upload/v1736355428/email-template/portlydev-features.png"
                }
              />
            </Link>

            {/* Footer */}
            <Section className="text-center">
              <Text className="mb-2 text-base text-gray-600">
                Let's make something amazing together!
              </Text>
              <Text className="mb-6 text-base text-gray-600">
                The Portfoliopilot Team
              </Text>
              <Text className="text-sm">
                <Link
                  href="https://portfoliopilot.in/terms-and-conditions"
                  className="text-[#4F46E5] hover:underline"
                >
                  Terms & Conditions
                </Link>
                <Link
                  href="https://portfoliopilot.in/privacy-policy"
                  className="ml-2 text-[#4F46E5] hover:underline"
                >
                  Privacy Policy
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
