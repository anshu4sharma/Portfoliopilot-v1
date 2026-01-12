"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Check, Cog, ImageIcon, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import { toast, useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
const fonts = [
  { label: "Cal Sans", value: "cal-sans" },
  { label: "Inter", value: "inter" },
  { label: "Manrope", value: "manrope" },
  { label: "System UI", value: "system-ui" },
];

type Props = {};

const formSchema = z.object({
  font: z.string(),
});

export default function AppearanceSettings({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="flex items-center gap-2">
        <div className="animate-spin">
          <Cog className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-medium">Work in Progress</h2>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        This feature is currently under development
      </p>
    </div>
  );
}

function Typography() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle>Typography</CardTitle>
          <CardDescription>
            Customize your site&apos;s font and text settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="font"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Font</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {fonts.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span className={`font-${font.value}`}>
                          {font.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the font for your site&apos;s headings.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit">
            <Check className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}

function CustomizeImageAndLogo() {
  const { toast } = useToast();
  const [thumbnailFile, setThumbnailFile] = React.useState<File | null>(null);
  const [logoFile, setLogoFile] = React.useState<File | null>(null);
  const thumbnailRef = React.useRef<HTMLInputElement>(null);
  const logoRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "thumbnail" | "logo",
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === "thumbnail") {
        setThumbnailFile(file);
      } else {
        setLogoFile(file);
      }
      toast({
        title: "File uploaded",
        description: `Your ${type} has been uploaded successfully.`,
      });
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
        <CardDescription>
          Customize your site&apos;s thumbnail and logo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Thumbnail Image</Label>
          <div className="flex items-center gap-4">
            <div className="relative aspect-video w-40 overflow-hidden rounded-lg border bg-muted">
              {thumbnailFile ? (
                <Image
                  src={URL.createObjectURL(thumbnailFile)}
                  alt="Thumbnail preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={thumbnailRef}
              className="hidden"
              onChange={(e) => handleFileChange(e, "thumbnail")}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => thumbnailRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Max file size 50MB. Recommended size 1200x630.
          </p>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label>Logo</Label>
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-lg border bg-muted">
              {logoFile ? (
                <Image
                  src={URL.createObjectURL(logoFile)}
                  alt="Logo preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={logoRef}
              className="hidden"
              onChange={(e) => handleFileChange(e, "logo")}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => logoRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Logo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Max file size 50MB. Recommended size 400x400.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit">
          <Check className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}
