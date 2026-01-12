import { createAvatar, Options } from "@dicebear/core";
import { notionists } from "@dicebear/collection";


export function AvatarComponent({
    avatarOptions,
}: {
    avatarOptions: Partial<Options>;
}) {
    const avatar = createAvatar(notionists, avatarOptions);
    const svg = avatar.toString();
    return (
        <div
            className="size-6 min-h-6 min-w-6 rounded-full border bg-muted md:size-8 md:min-h-8 md:min-w-8"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
