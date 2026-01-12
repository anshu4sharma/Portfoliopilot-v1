"use client";

import { useState, useTransition, useEffect } from "react";
import { getUserEmailsAndDisplayNames } from "@/actions/user-actions";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import WelcomeEmail from "../emails/WelcomeEmail";
import { Label } from "@/components/ui/label";
import { render } from "@react-email/components";
import TestEmail from "../emails/TestEmail";
import Link from "next/link";
import PortlyPro from "../emails/PortlyPro";

interface User {
  name: string;
  email: string;
  type: "Pro" | "Free";
  enabled: boolean;
}

const emailTemplates: Array<{
  id: string;
  name: string;
  component: React.ComponentType;
}> = [
  { id: "welcome", name: "Welcome Email", component: WelcomeEmail },
  { id: "test", name: "Test Email", component: TestEmail },
  { id: "portly-pro", name: "Portfoliopilot Pro Email", component: PortlyPro },
];

export default function UserManagement() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { theme, setTheme } = useTheme();
  const [view, setView] = useState<
    "all" | "free" | "pro" | "new" | "only_loggedin"
  >("pro");
  const [users, setUsers] = useState<User[]>([]);
  const [newEmails, setNewEmails] = useState<string>("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isLogoutPending, startLogoutTransition] = useTransition();
  const router = useRouter();
  const [useTemplate, setUseTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<(typeof emailTemplates)[number]["id"]>("test");
  const [htmlContent, setHtmlContent] = useState("");

  const Template =
    emailTemplates.find((t) => t.id === selectedTemplate)?.component ||
    WelcomeEmail;

  useEffect(() => {
    if (selectedTemplate) {
      const rendered = render(<Template />);
      setHtmlContent(rendered);
    } else {
      setHtmlContent("");
    }
  }, [selectedTemplate, Template]);

  useEffect(() => {
    if (view !== "new") {
      startTransition(async () => {
        try {
          const fetchedUsers = await getUserEmailsAndDisplayNames(
            view === "all"
              ? "all"
              : view === "pro"
                ? "pro"
                : view === "only_loggedin"
                  ? "only_loggedin"
                  : "free",
          );

          const mappedUsers: User[] = fetchedUsers
            .filter((user) => user.email)
            .map((user) => ({
              name: user.displayName || "Unknown",
              email: user.email || "",
              type: (user.userType === "pro" ? "Pro" : "Free") as
                | "Pro"
                | "Free",
              enabled: true,
              // enabled: false,
              // utk1
            }));

          setUsers(mappedUsers);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch users",
          });
        }
      });
    }
  }, [view]);

  const handleSend = async () => {
    if (!emailSubject.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter an email subject",
      });
      return;
    }

    if (!useTemplate && !emailBody.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter an email body",
      });
      return;
    }

    if (view === "new" && !newEmails.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter at least one email address",
      });
      return;
    }

    startTransition(async () => {
      try {
        const emailData = {
          emails: [
            {
              username: "Anshu",
              email: "hello@anshu.uk",
            },
            ...(view === "new"
              ? newEmails
                  .split("\n")
                  .filter((email) => email.trim())
                  .map((email) => ({
                    username: "New User",
                    email: email.trim(),
                  }))
              : users
                  .filter((user) => user.enabled)
                  .map((user) => ({
                    username: user.name.split(" ")[0],
                    email: user.email,
                  }))),
          ],
          subject: emailSubject,
          body: useTemplate ? htmlContent : emailBody,
        };

        if (emailData.emails.length === 0) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "No recipients selected",
          });
          return;
        }

        const response = await fetch("/api/email-queue", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        });

        if (!response.ok) {
          throw new Error("Failed to queue emails");
        }

        const data = await response.json();
        toast({
          title: "Success",
          description: `Successfully queued ${emailData.emails.length} email${emailData.emails.length === 1 ? "" : "s"}`,
        });

        setEmailSubject("");
        setEmailBody("");
        if (view === "new") setNewEmails("");
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to send emails. Please try again.",
        });
      }
    });
  };

  const filteredUsers = users.filter((user) => {
    if (view === "free") return user.type === "Free";
    if (view === "pro") return user.type === "Pro";
    return true;
  });

  const handleSwitchChange = (index: number) => {
    setUsers(
      users.map((user, i) => {
        if (i === index) {
          return { ...user, enabled: !user.enabled };
        }
        return user;
      }),
    );
  };

  function singOut() {
    startLogoutTransition(() => {
      router.push("/api/sign-out");
    });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex w-full justify-end">
        <Button className="cursor-pointer" onClick={singOut}>
          <LogOut className="mr-2 h-4 w-4" />
          {isLogoutPending ? "Signing out..." : "Logout"}
        </Button>
      </div>
      <div className="mx-auto w-full max-w-2xl p-4">
        <Card className="border-border">
          <CardHeader className="space-y-1 px-4">
            <div className="flex items-center justify-between">
              <Select
                value={view}
                onValueChange={(value: any) => setView(value)}
              >
                <SelectTrigger className="w-[200px] border-input bg-background">
                  <SelectValue>
                    {view === "all" && "All Users"}
                    {view === "free" && "Free Users"}
                    {view === "pro" && "Pro Users"}
                    {view === "new" && "New Users"}
                    {view === "only_loggedin" && "Only Logged In"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="only_loggedin">Only Logged In</SelectItem>
                  <SelectItem value="free">Free Users</SelectItem>
                  <SelectItem value="pro">Pro Users</SelectItem>
                  <SelectItem value="new">New Users</SelectItem>
                </SelectContent>
              </Select>
              {/* <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <Sun className="h-[1.2rem] w-[1.2rem]" />
                  ) : (
                    <Moon className="h-[1.2rem] w-[1.2rem]" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div> */}
            </div>
            <p className="text-sm text-muted-foreground">
              {view === "new"
                ? `New users: ${newEmails.split("\n").filter((email) => email.trim() !== "").length}`
                : `${view.charAt(0).toUpperCase() + view.slice(1)} users: ${filteredUsers.length}`}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {view === "new" ? (
              <Textarea
                className="max-h-[300px] min-h-[200px] overflow-y-auto border-input bg-background text-foreground"
                value={newEmails}
                onChange={(e) => setNewEmails(e.target.value)}
                placeholder="Enter email addresses (one per line)"
              />
            ) : (
              <div className="max-h-[300px] space-y-2 overflow-y-auto pr-2">
                {filteredUsers.map((user, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded border border-border p-2"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground">
                        {user.type}
                      </span>
                      <Switch
                        checked={user.enabled}
                        onCheckedChange={() => handleSwitchChange(i)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4 pt-4">
              <Input
                placeholder="Email Subject (Use {username} and {email} as placeholders)"
                className="border-input bg-background text-foreground"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />

              <div className="flex items-center space-x-2">
                <Switch
                  checked={useTemplate}
                  onCheckedChange={setUseTemplate}
                  id="template-switch"
                />
                <Label htmlFor="template-switch">Use Email Template</Label>
              </div>

              {useTemplate ? (
                <Select
                  value={selectedTemplate}
                  onValueChange={(
                    value: (typeof emailTemplates)[number]["id"],
                  ) => setSelectedTemplate(value)}
                >
                  <SelectTrigger className="w-full border-input bg-background">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {emailTemplates.map((template) => (
                      <div className="flex items-center justify-between gap-2 pr-2">
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                        <Link
                          target="_blank"
                          href={`/preview/${template.id}`}
                          className="text-sm text-blue-400 hover:underline"
                        >
                          Preview
                        </Link>
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Textarea
                  placeholder="Email Body (Use {username} and {email} as placeholders)"
                  className="min-h-[100px] border-input bg-background text-foreground"
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                />
              )}

              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleSend}
                disabled={
                  isPending ||
                  !emailSubject.trim() ||
                  (!useTemplate && !emailBody.trim()) ||
                  (useTemplate && !selectedTemplate) ||
                  (view === "new" && !newEmails.trim())
                }
              >
                {isPending ? "Sending..." : "Send"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
