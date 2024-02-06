import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const tr: PartialLocaleType = {
  WIP: "Çalışma devam ediyor...",
  Error: {
    Unauthorized:
      "Yetkisiz erişim, lütfen erişim kodunu ayarlar [sayfasından](/#/auth) giriniz.",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} mesaj`,
  },
  Chat: {
    SubTitle: (count: number) => `ChatGPT tarafından ${count} mesaj`,
    Actions: {
      ChatList: "Sohbet Listesine Git",
      CompressedHistory: "Sıkıştırılmış Geçmiş Bellek Komutu",
      Export: "Tüm Mesajları Markdown Olarak Dışa Aktar",
      Copy: "Kopyala",
      Stop: "Durdur",
      Retry: "Tekrar Dene",
      Delete: "Delete",
    },
    Rename: "Sohbeti Yeniden Adlandır",
    Typing: "Yazıyor…",
    Input: (submitKey: string) => {
      var inputHints = `Göndermek için ${submitKey}`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", kaydırmak için Shift + Enter";
      }
      return inputHints + ", komutları aramak için / (eğik çizgi)";
    },
    InputEnabled: "떡볶이에 대해 무엇이든 물어보세요.",
    InputDisabled: "지금은 입력할 수 없어요.",    
    Send: "Gönder",
    Config: {
      Reset: "Reset to Default",
      SaveAs: "Save as Mask",
    },
  },
  Export: {
    Title: "Tüm Mesajlar",
    Copy: "Tümünü Kopyala",
    Download: "İndir",
    MessageFromYou: "Sizin Mesajınız",
    MessageFromChatGPT: "ChatGPT'nin Mesajı",
  },
  Memory: {
    Title: "Bellek Komutları",
    EmptyContent: "Henüz değil.",
    Send: "Belleği Gönder",
    Copy: "Belleği Kopyala",
    Reset: "Oturumu Sıfırla",
    ResetConfirm:
      "Sıfırlama, geçerli görüşme geçmişini ve geçmiş belleği siler. Sıfırlamak istediğinizden emin misiniz?",
  },
  Home: {
    NewChat: "Yeni Sohbet",
    DeleteChat: "Seçili sohbeti silmeyi onaylıyor musunuz?",
    DeleteToast: "Sohbet Silindi",
    Revert: "Geri Al",
  },
  Settings: {
    Title: "Ayarlar",
    SubTitle: "Tüm Ayarlar",

    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "Tüm Diller",
    },
    Avatar: "Avatar",
    FontSize: {
      Title: "Yazı Boyutu",
      SubTitle: "Sohbet içeriğinin yazı boyutunu ayarlayın",
    },
    InjectSystemPrompts: {
      Title: "Sistem İpucu Ekleyin",
      SubTitle:
        "Her istek için ileti listesinin başına simüle edilmiş bir ChatGPT sistem ipucu ekleyin",
    },
    Update: {
      Version: (x: string) => `Sürüm: ${x}`,
      IsLatest: "En son sürüm",
      CheckUpdate: "Güncellemeyi Kontrol Et",
      IsChecking: "Güncelleme kontrol ediliyor...",
      FoundUpdate: (x: string) => `Yeni sürüm bulundu: ${x}`,
      GoToUpdate: "Güncelle",
    },
    SendKey: "Gönder Tuşu",
    Theme: "Tema",
    TightBorder: "Tam Ekran",
    SendPreviewBubble: {
      Title: "Mesaj Önizleme Balonu",
      SubTitle: "Preview markdown in bubble",
    },
    Mask: {
      Splash: {
        Title: "Mask Splash Screen",
        SubTitle: "Show a mask splash screen before starting new chat",
      },
    },
    Prompt: {
      Disable: {
        Title: "Otomatik tamamlamayı devre dışı bırak",
        SubTitle: "Otomatik tamamlamayı kullanmak için / (eğik çizgi) girin",
      },
      List: "Komut Listesi",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} yerleşik, ${custom} kullanıcı tanımlı`,
      Edit: "Düzenle",
      Modal: {
        Title: "Prompt List",
        Add: "Add One",
        Search: "Search Prompts",
      },
      EditModal: {
        Title: "Edit Prompt",
      },
    },
    HistoryCount: {
      Title: "Ekli Mesaj Sayısı",
      SubTitle: "İstek başına ekli gönderilen mesaj sayısı",
    },
    CompressThreshold: {
      Title: "Geçmiş Sıkıştırma Eşiği",
      SubTitle:
        "Sıkıştırılmamış mesajların uzunluğu bu değeri aşarsa sıkıştırılır",
    },

    Usage: {
      Title: "Hesap Bakiyesi",
      SubTitle(used: any, total: any) {
        return `Bu ay kullanılan $${used}, abonelik $${total}`;
      },
      IsChecking: "Kontrol ediliyor...",
      Check: "Tekrar Kontrol Et",
      NoAccess: "Bakiyeyi kontrol etmek için API anahtarını girin",
    },

    Model: "Model",
    Temperature: {
      Title: "Gerçeklik",
      SubTitle:
        "Daha büyük bir değer girildiğinde gerçeklik oranı düşer ve daha rastgele çıktılar üretir",
    },
    MaxTokens: {
      Title: "Maksimum Belirteç",
      SubTitle:
        "Girdi belirteçlerinin ve oluşturulan belirteçlerin maksimum uzunluğu",
    },
    PresencePenalty: {
      Title: "Varlık Cezası",
      SubTitle:
        "Daha büyük bir değer, yeni konular hakkında konuşma olasılığını artırır",
    },
    FrequencyPenalty: {
      Title: "Frekans Cezası",
      SubTitle:
        "Aynı satırı tekrar etme olasılığını azaltan daha büyük bir değer",
    },
  },
  Store: {
    DefaultTopic: "Yeni Konuşma",
    BotHello: "안녕하세요! 떡볶이에 대한 모든 궁금증을 해소시켜 드릴 수 있는 BOKI 보키에요😋",
    BotAskGender: "떡볶이 취향을 파악하기 위해, 당신의 성별이 무엇인지 먼저 알고 싶어요!",
    BotAskName: "그렇군요! 대화에서 불려질 이름도 함께 입력해 주시면, 대화를 시작할 모든 세팅이 마무리 돼요!",
    BotWhatKindTbk: (userName: string) => `${userName}! 안녕! 오늘은 어떤 떡볶이에 대해 얘기해 볼까?`,
    BotEmptyCount: (userName: string) => `${userName}님! 정말 아쉽지만 대화 입력 횟수가 모두 소진되었어요 🥲 마치기 전에, 보키가 맛있는 밀키트를 추천하고 싶어요! 앞으로도 새로운 푸딘코의 밀키트 출시가 예정되어 있으니 우리 곧 다시 만나요~ 👋`,
    BotWelcomeBack: (userName: string) => `다시 돌아왔군요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotWelcomeLongTime: (userName: string) => `오랜만이에요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotSeeYouAgain: "앞으로도 푸딘코의 밀키트 출시가 예정되어 있어요! 우리 곧 다시 만나요",
    BotSmartStoreLink: "[맛쟁이 떡볶이 보러 가기 🍽️](https://smartstore.naver.com/foodinko/products/9626125649?NaPm=ct%3Dlrx5dgl4%7Cci%3D57f9d867e6e279bbb28dd69d17e87e547804a467%7Ctr%3Dsls%7Csn%3D8677814%7Chk%3D40c55d087b779f781e6c3a276250bf8688b10d4a)",
    Error: "Bir şeyler yanlış gitti. Lütfen daha sonra tekrar deneyiniz.",
    Prompt: {
      History: (content: string) =>
        "Bu, yapay zeka ile kullanıcı arasındaki sohbet geçmişinin bir özetidir: " +
        content,
      Topic:
        "Lütfen herhangi bir giriş, noktalama işareti, tırnak işareti, nokta, sembol veya ek metin olmadan konuşmamızı özetleyen dört ila beş kelimelik bir başlık oluşturun. Çevreleyen tırnak işaretlerini kaldırın.",
      Summarize:
        "Gelecekteki bağlam için bir bilgi istemi olarak kullanmak üzere tartışmamızı en fazla 200 kelimeyle özetleyin.",
    },
  },
  Copy: {
    Success: "Panoya kopyalandı",
    Failed: "Kopyalama başarısız oldu, lütfen panoya erişim izni verin",
  },
  Context: {
    Toast: (x: any) => `${x} bağlamsal bellek komutu`,
    Edit: "Bağlamsal ve Bellek Komutları",
    Add: "Yeni Ekle",
  },
  Plugin: {
    Name: "Plugin",
  },
  FineTuned: {
    Sysmessage: "Sen bir asistansın",
  },
  Mask: {
    Name: "Mask",
    Page: {
      Title: "Prompt Template",
      SubTitle: (count: number) => `${count} prompt templates`,
      Search: "Search Templates",
      Create: "Create",
    },
    Item: {
      Info: (count: number) => `${count} prompts`,
      Chat: "Chat",
      View: "View",
      Edit: "Edit",
      Delete: "Delete",
      DeleteConfirm: "Confirm to delete?",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `Edit Prompt Template ${readonly ? "(readonly)" : ""}`,
      Download: "Download",
      Clone: "Clone",
    },
    Config: {
      Avatar: "Bot Avatar",
      Name: "Bot Name",
    },
  },
  NewChat: {
    Return: "Return",
    Skip: "Skip",
    Title: "Pick a Mask",
    SubTitle: "Chat with the Soul behind the Mask",
    More: "Find More",
    NotShow: "Not Show Again",
    ConfirmNoShow: "Confirm to disable？You can enable it in settings later.",
  },

  UI: {
    Confirm: "Confirm",
    Cancel: "Cancel",
    Close: "Close",
    Create: "Create",
    Edit: "Edit",
  },
  Exporter: {
    Model: "Model",
    Messages: "Mesajlar",
    Topic: "Konu",
    Time: "Zaman",
  },
};

export default tr;
