import React, {
    useEffect,
  } from "react";
import styles from "./share.module.scss";
import {
MyModal,
} from "./my-ui-lib";
import { ShareButton } from "./share-button";
import {
    copyToClipboard,
    // selectOrCopy,
    // autoGrowTextArea,
    // useMobileScreen,
  } from "../utils";
import { loadKakaoSdk } from "../utils/loadKakaoSdk";

import {
  TBK_CHATBOT_LINK_SHARED_KAKAO,
  TBK_CHATBOT_LINK_SHARED_INSTA,
  TBK_CHATBOT_LINK_SHARED_URL_COPY,
} from "../constant";

import {
  useUserStore,
} from "../store";

interface ShareBoxProps {
    onClose: () => void;
    onKakao: () => void;
    onInstagram: () => void;
    onCopyUrl: () => void;
    onMore: () => void;
  }

export const ShareBox = ({ onClose, onKakao, onInstagram, onCopyUrl, onMore }: ShareBoxProps): JSX.Element => {

    useEffect(() => {
        const kakaoKey: string = '7420254d1a111c67782b59ca53dfd20d';
        loadKakaoSdk(kakaoKey);
    }, []);

  const handleCloseClick = () => {
    console.log("[ShareBox] Close icon clicked!");
    onClose();
  };

  const handleKakaoClick = () => {
    console.log("[ShareBox] Kakao click!");

    const url = TBK_CHATBOT_LINK_SHARED_KAKAO;
    useUserStore.getState().recordEvent(TBK_CHATBOT_LINK_SHARED_KAKAO, url, (error) => {
      if (error) {
        console.log("[chat.tsx] handleKakaoClick error: ", error);
      } else {
        console.log("[chat.tsx] handleKakaoClick success");
      }
    });

    const imageShareKakao = "/images/sns-share-kakao.png";
    const imageUrl = window.location.origin + imageShareKakao;
    console.log("[ShareBox] imageUrl: ", imageUrl);

    if (typeof window.Kakao !== 'undefined') {
        window.Kakao.Link.sendDefault({
          objectType: 'feed',
          content: {
            title: 'BOKI 보키',
            description: '왜 나만보면 보키보키 하는지 모르겠어, 너도 BOKI 해볼래?',
            imageUrl: imageUrl,//'https://bokki.foodinko.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbot.326e467b.png&w=64&q=75',
            // http://172.30.1.56:3000/_next/image?url=%2Fimages%2Fbtn-kakao.png&w=128&q=75
            // https://bokki.foodinko.com/_next/image?url=%2Fimages%2Fbtn-kakao.png&w=128&q=75
            // https://bokki.foodinko.com/_next/image?url=%2Fimages%2Fsns-share-kakao.png&w=128&q=75
            // http://172.30.1.56:3000/_next/image?url=%2Fimages%2Fsns-share-kakao.png&w=128&q=75
            link: {
              mobileWebUrl: 'https://bokki.foodinko.com',
              webUrl: 'https://bokki.foodinko.com',
            },
          },
          buttons: [
            {
              title: '지금 대화하러 가기',
              link: {
                mobileWebUrl: 'https://bokki.foodinko.com',
                webUrl: 'https://bokki.foodinko.com',
              },
            },
          ],
        });
      } else {
        console.error('Kakao SDK not loaded');
      }
  };

  const handleInstagramClick = () => {
    console.log("[ShareBox] Instagram click!");

    const url = TBK_CHATBOT_LINK_SHARED_INSTA;
    useUserStore.getState().recordEvent(TBK_CHATBOT_LINK_SHARED_INSTA, url, (error) => {
      if (error) {
        console.log("[chat.tsx] handleInstagramClick error: ", error);
      } else {
        console.log("[chat.tsx] handleInstagramClick success");
      }
    });

    copyToClipboard(window.location.href);

    setTimeout(() => {
        const url = 'https://www.instagram.com/';
        const win = window.open(url, "_blank");
        win?.focus();
    }, 1000);
  };

  const handleCopyUrlClick = () => {
    console.log("[ShareBox] Copy");

    const url = TBK_CHATBOT_LINK_SHARED_URL_COPY;
    useUserStore.getState().recordEvent(TBK_CHATBOT_LINK_SHARED_URL_COPY, url, (error) => {
      if (error) {
        console.log("[chat.tsx] handleCopyUrlClick error: ", error);
      } else {
        console.log("[chat.tsx] handleCopyUrlClick success");
      }
    });

    copyToClipboard(window.location.href);
  };

  const handleMoreClick = () => {
    console.log("[ShareBox] More click!");
  };

  const titleKakao = "카카오톡";
  const titleInstagram = "인스타그램";
  const titleCopyUrl = "URL 복사";
  const titleMore = "더보기";

  const imageKakao = "/images/btn-kakao.png";
  const imageInsta = "/images/btn-insta.png";
  const imageCopyUrl = "/images/btn-url.png";
  const imageMore = "/images/btn-more.png";

  return (
    <div className="modal-share">
      <MyModal
        title={"공유하기"}
        subtitle={"우리 같이 떡볶이 Talk 할래? 🥹"}
        onClose={handleCloseClick}
        footer={null}
      >
       <ShareButton title={titleKakao} image={imageKakao} onClick={handleKakaoClick} />
       <ShareButton title={titleInstagram} image={imageInsta} onClick={handleInstagramClick} />
       <ShareButton title={titleCopyUrl} image={imageCopyUrl} onClick={handleCopyUrlClick} />
       {/* <ShareButton title={titleMore} image={imageMore} onClick={handleMoreClick} /> */}
      </MyModal>
    </div>
  );
};