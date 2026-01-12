import { LayoutProps } from "./types";

export function SidekickLayout({ userInfo, avatarSection }: LayoutProps) {
  return (
    <div className="container flex flex-col items-start gap-8 px-4 py-8 sm:px-8 md:flex-row">
      <div className="w-full md:sticky md:top-8 md:w-1/3">
        {avatarSection}
      </div>
      <div className="w-full md:w-2/3">{userInfo}</div>
    </div>
  );
}