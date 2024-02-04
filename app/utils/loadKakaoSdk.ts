export const loadKakaoSdk = (kakaoKey: string): void => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey);
    } else if (!window.Kakao) {
      const kakaoScript: HTMLScriptElement = document.createElement('script');
      kakaoScript.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      kakaoScript.onload = () => window.Kakao.init(kakaoKey);
      document.head.appendChild(kakaoScript);
    }
  };
  