import { Button } from "@/components/ui/button";
import { env } from "@/env";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <h1 className="mb-4 text-4xl font-bold">404 - Site Not Found</h1>
      <p className="mb-8 text-xl">
        The portfolio you're looking for doesn't exist.
      </p>
      <Button asChild>
        <Link href={`${env.HOST_NAME}`}>Go Home </Link>
      </Button>
    </div>
  );
}
