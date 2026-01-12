import Image from "next/image";

type AvatarSectionProps = {
  imageSrc?: string;
  svg?: string;
};

export function AvatarSection({ imageSrc, svg }: AvatarSectionProps) {
  return (
    <div className="relative rounded overflow-hidden flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-3 lg:max-w-none">
      <div className="bg-mute flex h-auto w-full max-w-[500px] flex-1 items-center justify-center rounded-full bg-muted">
        {/* {imageSrc ? (
          <Image
            src={imageSrc}
            alt="avatar"
            width={500}
            height={500}
            className="h-full w-full"
          />
        ) : (
          svg && (
            <div
              className="h-full w-full"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          )
        )} */}
        {svg && (
          <div className="h-full w-full" dangerouslySetInnerHTML={{ __html: svg }} />
        )}

      </div>
    </div>
  );
} 