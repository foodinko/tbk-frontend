import { getClientConfig } from "../config/client";
import { SubmitKey } from "../store/config";
import { LocaleType } from "./index";
import type { PartialLocaleType } from "./index";

// if you are adding a new translation, please use PartialLocaleType instead of LocaleType

const isApp = !!getClientConfig()?.isApp;
const sk: PartialLocaleType = {
  WIP: "Už čoskoro...",
  Error: {
    Unauthorized: isApp
      ? "Neplatný API kľúč, prosím skontrolujte ho na stránke [Nastavenia](/#/settings)."
      : "Neoprávnený prístup, prosím zadajte prístupový kód na stránke [auth](/#/auth), alebo zadajte váš OpenAI API kľúč.",
  },
  Auth: {
    Title: "Potrebný prístupový kód",
    Tips: "Prosím, zadajte prístupový kód nižšie",
    SubTips: "Alebo zadajte váš OpenAI alebo Google API kľúč",
    Input: "prístupový kód",
    Confirm: "Potvrdiť",
    Later: "Neskôr",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} správ`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} správ`,
    EditMessage: {
      Title: "Upraviť všetky správy",
      Topic: {
        Title: "Téma",
        SubTitle: "Zmeniť aktuálnu tému",
      },
    },
    Actions: {
      ChatList: "Prejsť na zoznam chatov",
      CompressedHistory: "Komprimovaná história výziev",
      Export: "Exportovať všetky správy ako Markdown",
      Copy: "Kopírovať",
      Stop: "Zastaviť",
      Retry: "Skúsiť znova",
      Pin: "Pripnúť",
      PinToastContent: "Pripnuté 1 správy do kontextových výziev",
      PinToastAction: "Zobraziť",
      Delete: "Vymazať",
      Edit: "Upraviť",
    },
    Commands: {
      new: "Začať nový chat",
      newm: "Začať nový chat s maskou",
      next: "Ďalší Chat",
      prev: "Predchádzajúci Chat",
      clear: "Vymazať kontext",
      del: "Vymazať Chat",
    },
    InputActions: {
      Stop: "Zastaviť",
      ToBottom: "Na najnovšie",
      Theme: {
        auto: "Automaticky",
        light: "Svetlý motív",
        dark: "Tmavý motív",
      },
      Prompt: "Výzvy",
      Masks: "Masky",
      Clear: "Vymazať kontext",
      Settings: "Nastavenia",
    },
    Rename: "Premenovať Chat",
    Typing: "Písanie…",
    Input: (submitKey: string) => {
      var inputHints = `${submitKey} na odoslanie`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", Shift + Enter na zalomenie";
      }
      return inputHints + ", / na vyhľadávanie výziev, : na použitie príkazov";
    },
    InputEnabled: "떡볶이에 대해 무엇이든 물어보세요.",
    InputDisabled: "지금은 입력할 수 없어요.",    
    Send: "Odoslať",
    Config: {
      Reset: "Resetovať na predvolené",
      SaveAs: "Uložiť ako masku",
    },
    IsContext: "Kontextová výzva",
  },
  Export: {
    Title: "Export správ",
    Copy: "Kopírovať všetko",
    Download: "Stiahnuť",
    MessageFromYou: "Správa od vás",
    MessageFromChatGPT: "Správa od ChatGPT",
    Share: "Zdieľať na ShareGPT",
    Format: {
      Title: "Formát exportu",
      SubTitle: "Markdown alebo PNG obrázok",
    },
    IncludeContext: {
      Title: "Vrátane kontextu",
      SubTitle: "Exportovať kontextové výzvy v maske alebo nie",
    },
    Steps: {
      Select: "Vybrať",
      Preview: "Náhľad",
    },
    Image: {
      Toast: "Snímanie obrázka...",
      Modal:
        "Dlhým stlačením alebo kliknutím pravým tlačidlom myši uložte obrázok",
    },
  },
  Select: {
    Search: "Hľadať",
    All: "Vybrať všetko",
    Latest: "Vybrať najnovšie",
    Clear: "Vymazať",
  },
  Memory: {
    Title: "Výzva pamäti",
    EmptyContent: "Zatiaľ nič.",
    Send: "Odoslať pamäť",
    Copy: "Kopírovať pamäť",
    Reset: "Resetovať reláciu",
    ResetConfirm:
      "Resetovaním sa vymaže aktuálna história konverzácie a historická pamäť. Ste si istí, že chcete resetovať?",
  },
  Home: {
    NewChat: "Nový Chat",
    DeleteChat: "Potvrdiť vymazanie vybranej konverzácie?",
    DeleteToast: "Chat vymazaný",
    Revert: "Vrátiť späť",
  },
  Settings: {
    Title: "Nastavenia",
    SubTitle: "Všetky nastavenia",
    Danger: {
      Reset: {
        Title: "Resetovať všetky nastavenia",
        SubTitle: "Resetovať všetky položky nastavení na predvolené",
        Action: "Resetovať",
        Confirm: "Potvrdiť resetovanie všetkých nastavení na predvolené?",
      },
      Clear: {
        Title: "Vymazať všetky údaje",
        SubTitle: "Vymazať všetky správy a nastavenia",
        Action: "Vymazať",
        Confirm: "Potvrdiť vymazanie všetkých správ a nastavení?",
      },
    },
    Lang: {
      Name: "Jazyk", // POZOR: ak pridávate nový preklad, prosím neprekladajte túto hodnotu, nechajte ju ako "Jazyk"
      All: "Všetky jazyky",
    },
    Avatar: "Avatar",
    FontSize: {
      Title: "Veľkosť písma",
      SubTitle: "Nastaviť veľkosť písma obsahu chatu",
    },
    InjectSystemPrompts: {
      Title: "Vložiť systémové výzvy",
      SubTitle: "Vložiť globálnu systémovú výzvu pre každú požiadavku",
    },
    InputTemplate: {
      Title: "Šablóna vstupu",
      SubTitle: "Najnovšia správa bude vyplnená do tejto šablóny",
    },

    Update: {
      Version: (x: string) => `Verzia: ${x}`,
      IsLatest: "Najnovšia verzia",
      CheckUpdate: "Skontrolovať aktualizácie",
      IsChecking: "Kontrola aktualizácií...",
      FoundUpdate: (x: string) => `Nájdená nová verzia: ${x}`,
      GoToUpdate: "Aktualizovať",
    },
    SendKey: "Odoslať kľúč",
    Theme: "Motív",
    TightBorder: "Tesný okraj",
    SendPreviewBubble: {
      Title: "Bublina náhľadu odoslania",
      SubTitle: "Náhľad markdownu v bubline",
    },
    AutoGenerateTitle: {
      Title: "Automaticky generovať názov",
      SubTitle: "Generovať vhodný názov na základe obsahu konverzácie",
    },
    Sync: {
      CloudState: "Posledná aktualizácia",
      NotSyncYet: "Zatiaľ nesynchronizované",
      Success: "Synchronizácia úspešná",
      Fail: "Synchronizácia zlyhala",

      Config: {
        Modal: {
          Title: "Konfigurácia synchronizácie",
          Check: "Skontrolovať pripojenie",
        },
        SyncType: {
          Title: "Typ synchronizácie",
          SubTitle: "Vyberte svoju obľúbenú službu synchronizácie",
        },
        Proxy: {
          Title: "Povoliť CORS Proxy",
          SubTitle: "Povoliť proxy na obídenie obmedzení cross-origin",
        },
        ProxyUrl: {
          Title: "Koncový bod Proxy",
          SubTitle: "Platné len pre vstavaný CORS proxy tohto projektu",
        },

        WebDav: {
          Endpoint: "Koncový bod WebDAV",
          UserName: "Meno používateľa",
          Password: "Heslo",
        },

        UpStash: {
          Endpoint: "URL REST služby UpStash Redis",
          UserName: "Názov zálohy",
          Password: "Token REST služby UpStash Redis",
        },
      },

      LocalState: "Lokálne údaje",
      Overview: (overview: any) => {
        return `${overview.chat} chaty, ${overview.message} správy, ${overview.prompt} výzvy, ${overview.mask} masky`;
      },
      ImportFailed: "Import z súboru zlyhal",
    },
    Mask: {
      Splash: {
        Title: "Úvodná obrazovka masky",
        SubTitle: "Zobraziť úvodnú obrazovku masky pred začatím nového chatu",
      },
      Builtin: {
        Title: "Skryť vstavané masky",
        SubTitle: "Skryť vstavané masky v zozname masiek",
      },
    },
    Prompt: {
      Disable: {
        Title: "Zakázať automatické dopĺňanie",
        SubTitle: "Zadajte / na spustenie automatického dopĺňania",
      },
      List: "Zoznam výziev",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} vstavaných, ${custom} užívateľsky definovaných`,
      Edit: "Upraviť",
      Modal: {
        Title: "Zoznam výziev",
        Add: "Pridať jednu",
        Search: "Hľadať výzvy",
      },
      EditModal: {
        Title: "Upraviť výzvu",
      },
    },
    HistoryCount: {
      Title: "Počet pripojených správ",
      SubTitle: "Počet odoslaných správ pripojených na požiadavku",
    },
    CompressThreshold: {
      Title: "Práh kompresie histórie",
      SubTitle:
        "Bude komprimované, ak dĺžka nekomprimovaných správ presiahne túto hodnotu",
    },

    Usage: {
      Title: "Stav účtu",
      SubTitle(used: any, total: any) {
        return `Tento mesiac použité ${used}, predplatné ${total}`;
      },
      IsChecking: "Kontroluje sa...",
      Check: "Skontrolovať",
      NoAccess: "Zadajte API kľúč na skontrolovanie zostatku",
    },
    Access: {
      AccessCode: {
        Title: "Prístupový kód",
        SubTitle: "Povolený prístupový kód",
        Placeholder: "Zadajte kód",
      },
      CustomEndpoint: {
        Title: "Vlastný koncový bod",
        SubTitle: "Použiť vlastnú službu Azure alebo OpenAI",
      },
      Provider: {
        Title: "Poskytovateľ modelu",
        SubTitle: "Vyberte Azure alebo OpenAI",
      },
      OpenAI: {
        ApiKey: {
          Title: "API kľúč OpenAI",
          SubTitle: "Použiť vlastný API kľúč OpenAI",
          Placeholder: "sk-xxx",
        },

        Endpoint: {
          Title: "Koncový bod OpenAI",
          SubTitle:
            "Musí začínať http(s):// alebo použiť /api/openai ako predvolený",
        },
      },
      Azure: {
        ApiKey: {
          Title: "API kľúč Azure",
          SubTitle: "Skontrolujte svoj API kľúč v Azure konzole",
          Placeholder: "API kľúč Azure",
        },

        Endpoint: {
          Title: "Koncový bod Azure",
          SubTitle: "Príklad: ",
        },

        ApiVerion: {
          Title: "Verzia API Azure",
          SubTitle: "Skontrolujte svoju verziu API v Azure konzole",
        },
      },
      CustomModel: {
        Title: "Vlastné modely",
        SubTitle: "Možnosti vlastného modelu, oddelené čiarkou",
      },
      Google: {
        ApiKey: {
          Title: "API kľúč",
          SubTitle:
            "Obísť obmedzenia prístupu heslom pomocou vlastného API kľúča Google AI Studio",
          Placeholder: "API kľúč Google AI Studio",
        },

        Endpoint: {
          Title: "Adresa koncového bodu",
          SubTitle: "Príklad:",
        },

        ApiVerion: {
          Title: "Verzia API (gemini-pro verzia API)",
          SubTitle: "Vyberte špecifickú verziu časti",
        },
      },
    },

    Model: "Model",
    Temperature: {
      Title: "Teplota",
      SubTitle: "Vyššia hodnota robí výstup náhodnejším",
    },
    TopP: {
      Title: "Top P",
      SubTitle: "Neupravujte túto hodnotu spolu s teplotou",
    },
    MaxTokens: {
      Title: "Maximálny počet tokenov",
      SubTitle: "Maximálna dĺžka vstupných tokenov a generovaných tokenov",
    },
    PresencePenalty: {
      Title: "Penalizácia za prítomnosť",
      SubTitle:
        "Vyššia hodnota zvyšuje pravdepodobnosť hovorenia o nových témach",
    },
    FrequencyPenalty: {
      Title: "Penalizácia za frekvenciu",
      SubTitle:
        "Vyššia hodnota znižuje pravdepodobnosť opakovania rovnakej línie",
    },
  },
  Store: {
    DefaultTopic: "Nová konverzácia",
    BotHello: "안녕하세요! 떡볶이에 대한 모든 궁금증을 해소시켜 드릴 수 있는 BOKI 보키에요😋",
    BotAskGender: "떡볶이 취향을 파악하기 위해, 당신의 성별이 무엇인지 먼저 알고 싶어요!",
    BotAskName: "그렇군요! 대화에서 불려질 이름도 함께 입력해 주시면, 대화를 시작할 모든 세팅이 마무리 돼요!",
    BotWhatKindTbk: (userName: string) => `${userName}! 안녕! 오늘은 어떤 떡볶이에 대해 얘기해 볼까?`,
    BotEmptyCount: (userName: string) => `${userName}님! 정말 아쉽지만 대화 입력 횟수가 모두 소진되었어요 🥲 마치기 전에, 보키가 맛있는 밀키트를 추천하고 싶어요! 앞으로도 새로운 푸딘코의 밀키트 출시가 예정되어 있으니 우리 곧 다시 만나요~ 👋`,
    BotWelcomeBack: (userName: string) => `다시 돌아왔군요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotWelcomeLongTime: (userName: string) => `오랜만이에요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotSeeYouAgain: "앞으로도 푸딘코의 밀키트 출시가 예정되어 있어요! 우리 곧 다시 만나요",
    BotSmartStoreLink: "[맛쟁이 떡볶이 보러 가기 🍽️](https://smartstore.naver.com/foodinko/products/9626125649?NaPm=ct%3Dls9zhfnc%7Cci%3D0e0be055ca54fa486d66e396ca5b64ac8eccfa64%7Ctr%3Dsls%7Csn%3D8677814%7Chk%3D826a390944f997653521b585cd1d198923a8f7af&utm_source=chatbot&utm_medium=ad-link&utm_campaign=s1-foodinko_chatbot_detail&utm_content=240206_chatbot&utm_term=chatbotlink)",
    Error: "Niečo sa pokazilo, skúste to prosím neskôr znova.",
    Prompt: {
      History: (content: string) =>
        "Toto je zhrnutie histórie chatu ako rekapitulácia: " + content,
      Topic:
        "Prosím, vygenerujte štvor- až päťslovný titul, ktorý zhrnie našu konverzáciu bez akéhokoľvek úvodu, interpunkcie, úvodzoviek, bodiek, symbolov, tučného textu alebo ďalšieho textu. Odstráňte uzatváracie úvodzovky.",
      Summarize:
        "Stručne zhrňte diskusiu na menej ako 200 slov, aby ste ju mohli použiť ako výzvu pre budúci kontext.",
    },
  },
  Copy: {
    Success: "Skopírované do schránky",
    Failed:
      "Kopírovanie zlyhalo, prosím udeľte povolenie na prístup k schránke",
  },
  Download: {
    Success: "Obsah stiahnutý do vášho adresára.",
    Failed: "Stiahnutie zlyhalo.",
  },
  Context: {
    Toast: (x: any) => `S ${x} kontextovými výzvami`,
    Edit: "Aktuálne nastavenia chatu",
    Add: "Pridať výzvu",
    Clear: "Kontext vyčistený",
    Revert: "Vrátiť späť",
  },
  Plugin: {
    Name: "Plugin",
  },
  FineTuned: {
    Sysmessage: "Ste asistent, ktorý",
  },
  Mask: {
    Name: "Maska",
    Page: {
      Title: "Šablóna výziev",
      SubTitle: (count: number) => `${count} šablón výziev`,
      Search: "Hľadať šablóny",
      Create: "Vytvoriť",
    },
    Item: {
      Info: (count: number) => `${count} výziev`,
      Chat: "Chat",
      View: "Zobraziť",
      Edit: "Upraviť",
      Delete: "Vymazať",
      DeleteConfirm: "Potvrdiť vymazanie?",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `Upraviť šablónu výziev ${readonly ? "(iba na čítanie)" : ""}`,
      Download: "Stiahnuť",
      Clone: "Klonovať",
    },
    Config: {
      Avatar: "Avatar robota",
      Name: "Meno robota",
      Sync: {
        Title: "Použiť globálne nastavenia",
        SubTitle: "Použiť globálne nastavenia v tomto chate",
        Confirm: "Potvrdiť prepísanie vlastného nastavenia globálnym?",
      },
      HideContext: {
        Title: "Skryť kontextové výzvy",
        SubTitle: "Nezobrazovať kontextové výzvy v chate",
      },
      Share: {
        Title: "Zdieľať túto masku",
        SubTitle: "Vygenerovať odkaz na túto masku",
        Action: "Kopírovať odkaz",
      },
    },
  },
  NewChat: {
    Return: "Vrátiť sa",
    Skip: "Len začať",
    Title: "Vybrať masku",
    SubTitle: "Chatovať s dušou za maskou",
    More: "Nájsť viac",
    NotShow: "Už nezobrazovať",
    ConfirmNoShow:
      "Potvrdiť deaktiváciu? Môžete ju neskôr znova povoliť v nastaveniach.",
  },

  UI: {
    Confirm: "Potvrdiť",
    Cancel: "Zrušiť",
    Close: "Zavrieť",
    Create: "Vytvoriť",
    Edit: "Upraviť",
    Export: "Exportovať",
    Import: "Importovať",
    Sync: "Synchronizovať",
    Config: "Konfigurácia",
  },
  Exporter: {
    Description: {
      Title: "Zobrazia sa len správy po vyčistení kontextu",
    },
    Model: "Model",
    Messages: "Správy",
    Topic: "Téma",
    Time: "Čas",
  },

  URLCommand: {
    Code: "Zistený prístupový kód z URL, potvrdiť na aplikovanie?",
    Settings: "Zistené nastavenia z URL, potvrdiť na aplikovanie?",
  },
};

export default sk;
