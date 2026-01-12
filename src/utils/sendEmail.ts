import AWS from "aws-sdk";

AWS.config.update({
  region: "ap-south-1", // Replace with your SES region
  accessKeyId: process.env.ACCESS_KEY_ID_AWS,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS,
});

const ses = new AWS.SES();

export const sendEmail = async (to: string, subject: string, body: string) => {
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: { Data: body },
      },
      Subject: { Data: subject },
    },
    Source: "no-reply@portfoliopilot.in", // Verified email
  };

  try {
    await ses.sendEmail(params).promise();
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
