import EmojiPicker, {
  Emoji,
  EmojiStyle,
  Theme as EmojiTheme,
} from "emoji-picker-react";

import { ModelType } from "../store";

// import BotIcon from "../icons/bot.svg";
// import BlackBotIcon from "../icons/black-bot.svg";
import BotIcon from "../icons/bot.png";
import BlackBotIcon from "../icons/bot.png";
import Image from "next/image";

export function getEmojiUrl(unified: string, style: EmojiStyle) {
  // Whoever owns this Content Delivery Network (CDN), I am using your CDN to serve emojis
  // Old CDN broken, so I had to switch to this one
  // Author: https://github.com/H0llyW00dzZ
  return `https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/${style}/64/${unified}.png`;
}

export function AvatarPicker(props: {
  onEmojiClick: (emojiId: string) => void;
}) {
  return (
    <EmojiPicker
      lazyLoadEmojis
      theme={EmojiTheme.AUTO}
      getEmojiUrl={getEmojiUrl}
      onEmojiClick={(e) => {
        props.onEmojiClick(e.unified);
      }}
    />
  );
}

export function Avatar(props: { model?: ModelType; avatar?: string }) {
  // if (props.model) {
  //   return (
  //     <Image
  //       className="user-avatar"
  //       src={new URL(`../icons/bot.png`, import.meta.url).toString()}
  //       alt={"bot"}
  //       width={18}
  //       height={18}
  //     />
  //   );
  // }

  // return (
  //   <div className="user-avatar">
  //     {props.avatar && <EmojiAvatar avatar={props.avatar} />}
  //   </div>
  // );
  return (
    <Image
      className="user-avatar"
      src={new URL(`../icons/bot.png`, import.meta.url).toString()}
      alt={"bot"}
      width={30}
      height={30}
    />
  );
}

export function EmojiAvatar(props: { avatar: string; size?: number }) {
  return (
    <Emoji
      unified={props.avatar}
      size={props.size ?? 18}
      getEmojiUrl={getEmojiUrl}
    />
  );
}
