import { LayoutProps } from "./types";

export function ClassicLayout({ userInfo, avatarSection }: LayoutProps) {
  return (
    <div className="container flex h-full flex-col-reverse items-center gap-12 px-4 py-6 sm:px-8 sm:py-10 lg:flex-row">
      {userInfo}
      {avatarSection}
    </div>
  );
}