import { LayoutProps } from "./types";

export function SpotlightLayout({ userInfo, avatarSection }: LayoutProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 p-8">
      <div className="bg-grid-white/10 absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />
      <div className="container relative flex flex-col-reverse items-center gap-12 px-4 sm:px-8 lg:flex-row">
        <div className="flex-1 space-y-6 text-center lg:text-left">
          {userInfo}
        </div>
        <div className="w-full max-w-md lg:w-1/2">{avatarSection}</div>
      </div>
    </div>
  );
}