// lib/analytics.ts
import { env } from "@/env";
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: env.GA_CLIENT_EMAIL,
    client_id: env.GA_CLIENT_ID,
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCe5aYcuIwQXFKf\n8EbjzeLc1vC3lgaH0RPv6IYADquRaU0fUw8545OgxIYFM0slKbWO2VWIJggrFL6I\n/N/clw8foBuEqTQA1aNiiJgPnP1hj+KererGbGQCGj19JTotZRZwjSRz7qUVcTKU\nNX8JGUuYLowGJpYKzAJycgApO30fb1+R98XPYQmI26GIIyYiksuPPf7k51DHLU4D\nZul1xUFHmkcQRwFFXwivDe1SDv4qARL6NJSePCV9sVrqOA4SbeccITElrqocJ/bm\nHVq/v470ls1pcr3tzh8BPHMca358uMWrH5HuVrxqhGnUHx2QzewKtvSxtXtxhduB\n7l+vwRqDAgMBAAECggEAHGW9fLeMrKXbTGM0QCU9DKvLRHwm+aHnlsIvJJZ6mhfA\nJT+CYp2l9h75Nre2j9M28+sqipUFc7GW5cOPvIwwsz25fUmCFj4YH5V625t6ezOs\nVCCP61tWujt3TsTW82L0EjRfVerKDR14ZR10cStYo7953eWKfi58p3hxR+0uTO4h\nuOs7VvfjPfrvyOd2n6IAN1AMkYDVM/OaOTZP+4nA3h28rFu4lPDyjfk7/fNbduVe\nKoVdA30PFp+DK7rIq8HCPONN11MKbk+HU0FKSC5VdLAVnbI3uPVt4yXP8JQMPgPs\naJLPMYuv0ivW1exzgviTN0Zk0rWMEQ57kJlDJ6AmVQKBgQDdFDu+THUd3iKRxRT9\nsoElgr4klnK7VdnfsWhpXo3tXalIcP6t1P1LsNGloH5HAjwi/OV1Do4nJ/p49BbT\nFrLnIAenhze19Hk/LQLHgEG9jtxtodr4DVsi0bNjIuGW3CHpNM2iaIULCJyYed+Y\nfTz4g/EETEUGE410rjkAzqBVjQKBgQC3/vcG0YwP6J40V9SWBtBaqwtTJxI+oaUg\n6ClsWJ418Jg0h8cTcCxrEFwJ/L7msFMSddxUYcR4w0U1flq/zq9LrukvVf1Nlgzd\nGm4zAFrjMw08/8IOnOsuGC1FpaFGGk6ohOTXcILbjwECAB1Tc6tk5uXZHcXm/9H8\nQCJEfVKETwKBgQDWT+X2fRHPiWZDnyTRJrjxTwPaXgoMtpXFtqo78xBsuS4AbqFE\njEObm2YwRBwF5BG97SDWz+xX4vZ5SE3UBZ4aVb911KvZ9IuRBaY7FYclJhdjI9Ms\nQW5Gm7hlcwvy/aTV+H0bYm0OnCOJ4CM0JLv1QZpkCzeiQ1QOd1IFCUj+hQKBgDPi\nuWR52QZvcZWPIwq/lyfKTiI/xVxWFwvFjFDaWJsbYsCFfXUUz+HNNjc2x9qj5Hkz\nNVOyUkY/wpeILy0hqrsr8uP/WrPzWWNMXcESG48wSU5nTSDzzTotZS7buzPanU3W\nU/YQ60Xg+MbIo3xyBOYqWqy0QaeXgm6g40jvEkLvAoGAZY98XPd1AXiMpEVWlDwu\nQ9BrCOQCf1gDMQu87uTAiG2eXURDtkXJEXVNDnh1EuPm37/JW5Kz9xzOjvPDzzK4\nizAaw+tY6VeU6o3VvqvectCpQL/6FeCuuE6IFXFwiJgsES7Dm1o15OzSIsXDtEMP\nZWLXSoUikkflFFZAhk2AFMY=\n-----END PRIVATE KEY-----\n",
  },
  scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
});

auth
  .getClient()
  .then(() => console.log("Authenticated successfully"))
  .catch((error) => console.error("Authentication failed", error));

export const analyticsDataClient = google.analyticsdata({
  version: "v1beta",
  auth,
});
