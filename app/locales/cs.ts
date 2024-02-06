import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const cs: PartialLocaleType = {
  WIP: "V přípravě...",
  Error: {
    Unauthorized:
      "Neoprávněný přístup, zadejte přístupový kód na [stránce](/#/auth) nastavení.",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} zpráv`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} zpráv s ChatGPT`,
    Actions: {
      ChatList: "Přejít na seznam chatů",
      CompressedHistory: "Pokyn z komprimované paměti historie",
      Export: "Exportovat všechny zprávy jako Markdown",
      Copy: "Kopírovat",
      Stop: "Zastavit",
      Retry: "Zopakovat",
      Delete: "Smazat",
    },
    Rename: "Přejmenovat chat",
    Typing: "Píše...",
    Input: (submitKey: string) => {
      var inputHints = `${submitKey} pro odeslání`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", Shift + Enter pro řádkování";
      }
      return inputHints + ", / pro vyhledávání pokynů";
    },
    InputEnabled: "떡볶이에 대해 무엇이든 물어보세요.",
    InputDisabled: "지금은 입력할 수 없어요.",
    Send: "Odeslat",
    Config: {
      Reset: "Obnovit výchozí",
      SaveAs: "Uložit jako Masku",
    },
  },
  Export: {
    Title: "Všechny zprávy",
    Copy: "Kopírovat vše",
    Download: "Stáhnout",
    MessageFromYou: "Zpráva od vás",
    MessageFromChatGPT: "Zpráva z ChatGPT",
  },
  Memory: {
    Title: "Pokyn z paměti",
    EmptyContent: "Zatím nic.",
    Send: "Odeslat paměť",
    Copy: "Kopírovat paměť",
    Reset: "Obnovit relaci",
    ResetConfirm:
      "Resetováním se vymaže historie aktuálních konverzací i paměť historie pokynů. Opravdu chcete provést obnovu?",
  },
  Home: {
    NewChat: "Nový chat",
    DeleteChat: "Potvrzujete smazání vybrané konverzace?",
    DeleteToast: "Chat smazán",
    Revert: "Zvrátit",
  },
  Settings: {
    Title: "Nastavení",
    SubTitle: "Všechna nastavení",

    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "Všechny jazyky",
    },
    Avatar: "Avatar",
    FontSize: {
      Title: "Velikost písma",
      SubTitle: "Nastavení velikosti písma obsahu chatu",
    },
    InjectSystemPrompts: {
      Title: "Vložit systémové prompty",
      SubTitle:
        "Vynutit přidání simulovaného systémového promptu ChatGPT na začátek seznamu zpráv každého požadavku",
    },
    Update: {
      Version: (x: string) => `Verze: ${x}`,
      IsLatest: "Aktuální verze",
      CheckUpdate: "Zkontrolovat aktualizace",
      IsChecking: "Kontrola aktualizace...",
      FoundUpdate: (x: string) => `Nalezena nová verze: ${x}`,
      GoToUpdate: "Aktualizovat",
    },
    SendKey: "Odeslat klíč",
    Theme: "Téma",
    TightBorder: "Těsné ohraničení",
    SendPreviewBubble: {
      Title: "Odesílat chatovací bublinu s náhledem",
      SubTitle: "Zobrazit v náhledu bubliny",
    },
    Mask: {
      Splash: {
        Title: "Úvodní obrazovka Masek",
        SubTitle: "Před zahájením nového chatu zobrazte úvodní obrazovku Masek",
      },
    },
    Prompt: {
      Disable: {
        Title: "Deaktivovat automatické dokončování",
        SubTitle: "Zadejte / pro spuštění automatického dokončování",
      },
      List: "Seznam pokynů",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} vestavěných, ${custom} uživatelských`,
      Edit: "Upravit",
      Modal: {
        Title: "Seznam pokynů",
        Add: "Přidat pokyn",
        Search: "Hledat pokyny",
      },
      EditModal: {
        Title: "Editovat pokyn",
      },
    },
    HistoryCount: {
      Title: "Počet připojených zpráv",
      SubTitle: "Počet odeslaných připojených zpráv na žádost",
    },
    CompressThreshold: {
      Title: "Práh pro kompresi historie",
      SubTitle:
        "Komprese proběhne, pokud délka nekomprimovaných zpráv přesáhne tuto hodnotu",
    },

    Usage: {
      Title: "Stav účtu",
      SubTitle(used: any, total: any) {
        return `Použito tento měsíc $${used}, předplaceno $${total}`;
      },
      IsChecking: "Kontroluji...",
      Check: "Zkontrolovat",
      NoAccess: "Pro kontrolu zůstatku zadejte klíč API",
    },

    Model: "Model",
    Temperature: {
      Title: "Teplota",
      SubTitle: "Větší hodnota činí výstup náhodnějším",
    },
    MaxTokens: {
      Title: "Max. počet tokenů",
      SubTitle: "Maximální délka vstupního tokenu a generovaných tokenů",
    },
    PresencePenalty: {
      Title: "Přítomnostní korekce",
      SubTitle: "Větší hodnota zvyšuje pravděpodobnost nových témat.",
    },
    FrequencyPenalty: {
      Title: "Frekvenční penalizace",
      SubTitle:
        "Větší hodnota snižující pravděpodobnost opakování stejného řádku",
    },
  },
  Store: {
    DefaultTopic: "Nová konverzace",
    BotHello: "안녕하세요! 떡볶이에 대한 모든 궁금증을 해소시켜 드릴 수 있는 BOKI 보키에요😋",
    BotAskGender: "떡볶이 취향을 파악하기 위해, 당신의 성별이 무엇인지 먼저 알고 싶어요!",
    BotAskName: "그렇군요! 대화에서 불려질 이름도 함께 입력해 주시면, 대화를 시작할 모든 세팅이 마무리 돼요!",
    BotWhatKindTbk: (userName: string) => `${userName}! 안녕! 오늘은 어떤 떡볶이에 대해 얘기해 볼까?`,
    BotEmptyCount: (userName: string) => `${userName}님! 정말 아쉽지만 대화 입력 횟수가 모두 소진되었어요 🥲 마치기 전에, 보키가 맛있는 밀키트를 추천하고 싶어요! 앞으로도 새로운 푸딘코의 밀키트 출시가 예정되어 있으니 우리 곧 다시 만나요~ 👋`,
    BotWelcomeBack: (userName: string) => `다시 돌아왔군요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotWelcomeLongTime: (userName: string) => `오랜만이에요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotSeeYouAgain: "앞으로도 푸딘코의 밀키트 출시가 예정되어 있어요! 우리 곧 다시 만나요",
    BotSmartStoreLink: "[맛쟁이 떡볶이 보러 가기 🍽️](https://smartstore.naver.com/foodinko/products/9626125649?NaPm=ct%3Dls9zhfnc%7Cci%3D0e0be055ca54fa486d66e396ca5b64ac8eccfa64%7Ctr%3Dsls%7Csn%3D8677814%7Chk%3D826a390944f997653521b585cd1d198923a8f7af&utm_source=chatbot&utm_medium=ad-link&utm_campaign=s1-foodinko_chatbot_detail&utm_content=240206_chatbot&utm_term=chatbotlink)",
    Error: "Něco se pokazilo, zkuste to prosím později.",
    Prompt: {
      History: (content: string) =>
        "Toto je shrnutí historie chatu mezi umělou inteligencí a uživatelem v podobě rekapitulace: " +
        content,
      Topic:
        "Vytvořte prosím název o čtyřech až pěti slovech vystihující průběh našeho rozhovoru bez jakýchkoli úvodních slov, interpunkčních znamének, uvozovek, teček, symbolů nebo dalšího textu. Odstraňte uvozovky.",
      Summarize:
        "Krátce shrň naši diskusi v rozsahu do 200 slov a použij ji jako podnět pro budoucí kontext.",
    },
  },
  Copy: {
    Success: "Zkopírováno do schránky",
    Failed: "Kopírování selhalo, prosím, povolte přístup ke schránce",
  },
  Context: {
    Toast: (x: any) => `Použití ${x} kontextových pokynů`,
    Edit: "Kontextové a paměťové pokyny",
    Add: "Přidat pokyn",
  },
  Plugin: {
    Name: "Plugin",
  },
  FineTuned: {
    Sysmessage: "Jste asistent, který",
  },
  Mask: {
    Name: "Maska",
    Page: {
      Title: "Šablona pokynu",
      SubTitle: (count: number) => `${count} šablon pokynů`,
      Search: "Hledat v šablonách",
      Create: "Vytvořit",
    },
    Item: {
      Info: (count: number) => `${count} pokynů`,
      Chat: "Chat",
      View: "Zobrazit",
      Edit: "Upravit",
      Delete: "Smazat",
      DeleteConfirm: "Potvrdit smazání?",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `Editovat šablonu pokynu ${readonly ? "(pouze ke čtení)" : ""}`,
      Download: "Stáhnout",
      Clone: "Duplikovat",
    },
    Config: {
      Avatar: "Avatar Bota",
      Name: "Jméno Bota",
    },
  },
  NewChat: {
    Return: "Zpět",
    Skip: "Přeskočit",
    Title: "Vyberte Masku",
    SubTitle: "Chatovat s duší za Maskou",
    More: "Najít více",
    NotShow: "Nezobrazovat znovu",
    ConfirmNoShow: "Potvrdit zakázání？Můžete jej povolit později v nastavení.",
  },

  UI: {
    Confirm: "Potvrdit",
    Cancel: "Zrušit",
    Close: "Zavřít",
    Create: "Vytvořit",
    Edit: "Upravit",
  },
  Exporter: {
    Model: "Model",
    Messages: "Zprávy",
    Topic: "Téma",
    Time: "Čas",
  },
};

export default cs;
