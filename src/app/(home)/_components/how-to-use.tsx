"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HowToUse() {
  const [fullscreenVideo, setFullscreenVideo] = useState<string | null>(null);

  const steps = [
    {
      title: "Create an Account",
      description:
        "Sign up for a free Portly account to get started. It only takes a minute and you'll have access to all our features.",
      media: "video",
      video:
        "https://res.cloudinary.com/dzqnzl3ir/video/upload/v1731832678/Sign-in_sf4p7i.mp4",
    },
    {
      title: "Create a Custom Route",
      description:
        "Create a custom route for your portfolio. This is the URL that will be used to access your portfolio.",
      media: "video",
      video:
        "https://res.cloudinary.com/dzqnzl3ir/video/upload/v1731832679/Route-name_acufvw.mp4",
    },
    {
      title: "Add Basic Information",
      description:
        "Add your basic information such as your name, title,skills and a brief introduction. This will help you stand out from the crowd.",
      media: "video",
      video:
        "https://res.cloudinary.com/dzqnzl3ir/video/upload/v1731832684/Hero-Section_ebpo4i.mp4",
    },
    {
      title: "Add Your Projects",
      description:
        "Showcase your best work by adding projects to your portfolio. Include descriptions, images, and links to demonstrate your skills.",
      media: "video",
      video:
        "https://res.cloudinary.com/dzqnzl3ir/video/upload/v1731832684/Add-Project_bk2jxm.mp4",
    },
    {
      title: "Add Your Work Experience",
      description:
        "Highlight your professional journey by adding your work experience. Include your roles, responsibilities, and achievements.",
      media: "video",
      video:
        "https://res.cloudinary.com/dzqnzl3ir/video/upload/v1731832683/Add-Experience_xnghy7.mp4",
    },
  ];

  const handleVideoClick = (videoUrl: string) => {
    setFullscreenVideo(videoUrl);
  };

  const handleCloseFullscreen = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setFullscreenVideo(null);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleCloseFullscreen);
    return () => {
      document.removeEventListener("keydown", handleCloseFullscreen);
    };
  }, []);

  return (
    <section
      id="how-to-use"
      className="bg-background px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-bold">
          How to Use Portly
        </h2>
        <div className="space-y-16">
          {steps.map((step, index) => (
            <Card key={index} className="overflow-hidden border-none">
              <div
                className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"}`}
              >
                <div className="w-full  md:w-1/2">
                  {step.media === "video" ? (
                    <div className="relative aspect-video cursor-pointer overflow-hidden rounded-lg border-2 border-primary/20 transition-all hover:border-primary">
                      <video
                        src={step.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls={false}
                        disablePictureInPicture
                        onClick={() => handleVideoClick(step.video)}
                        className="w-full"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-square">
                      <img
                        src="/images/placeholder.svg"
                        alt={`Step ${index + 1}: ${step.title}`}
                        // layout="fill"
                        // objectFit="cover"
                        className="bg-muted-foreground/20 dark:brightness-[0.2] dark:grayscale"
                      />
                    </div>
                  )}
                </div>
                <CardContent className="flex w-full flex-col justify-center p-6 md:w-1/2 md:p-8">
                  <CardHeader className="mb-4 p-0">
                    <CardTitle className="mb-2 text-2xl font-bold">
                      {index + 1}. {step.title}
                    </CardTitle>
                  </CardHeader>
                  <p className="mb-6 text-muted-foreground">
                    {step.description}
                  </p>
                  {/* <Button className="self-start">Learn More</Button> */}
                </CardContent>
              </div>
            </Card>
          ))}
          <div className=" flex flex-col justify-center gap-2 md:flex-row">
            <Button className="px-8 py-3 text-lg" asChild>
              <Link href="/create-portfolio">Create Your Portfolio</Link>
            </Button>
          </div>
        </div>
      </div>

      {fullscreenVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setFullscreenVideo(null)}
        >
          <video
            src={fullscreenVideo}
            autoPlay
            loop
            muted
            controls
            className="h-auto max-h-[90vh] w-auto max-w-[90vw] rounded-xl"
          />
        </div>
      )}
    </section>
  );
}
