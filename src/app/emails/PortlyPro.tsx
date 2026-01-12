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

// Unlock More with Portfoliopilot Pro
export default function PortlyPro() {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="max-w-xl p-8">
            {/* Logo and Header */}
            <Section>
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
                Great job on creating your portfolio! We hope it’s helping you
                showcase your skills effectively.
              </Text>
              <Text className="mb-2 text-base text-gray-900">
                Have you considered trying out the Pro plan? It offers
                additional features like a custom subdomain, detailed analytics,
                SEO optimization, and more to elevate your portfolio’s
                potential.
              </Text>
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

            <Section>
              <Text className="text-base text-gray-900">
                It’s all about giving you the tools to stand out effortlessly.
                <br />
                We’d love to see you make the most of your portfolio.
              </Text>
              <p className="mb-0 border-2 text-base text-gray-900">
                Best regards,
                <br /> The portfoliopilot.in Team
              </p>
            </Section>

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-base text-gray-600">
                Let's make something amazing together! <br /> The Portfoliopilot Team
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
}
