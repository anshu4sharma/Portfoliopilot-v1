import {
  Html,
  Head,
  Body,
  Heading,
  Text,
  Button,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

export default function TestEmail() {
  return (
    <Html>
      <Head />
      <Tailwind>
        <React.Fragment>
          <Body className="p-5 font-sans">
            <Heading className="text-gray-800">Welcome to Our Service!</Heading>
            <Text className="my-5 text-gray-600">
              {` Hello {{username}} We're excited to have you on board. Click the button below to get
              started. {{email}}`}
            </Text>
            <Button
              className="inline-block rounded bg-blue-600 px-4 py-2 text-white"
              href="https://portfoliopilot.in"
            >
              Get Started
            </Button>
          </Body>
        </React.Fragment>
      </Tailwind>
    </Html>
  );
}
