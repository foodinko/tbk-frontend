import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const no: PartialLocaleType = {
  WIP: "Arbeid pågår ...",
  Error: {
    Unauthorized:
      "Du har ikke tilgang. [Vennlig oppgi tildelt adgangskode](/#/auth).",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} meldinger`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} meldinger med ChatGPT`,
    Actions: {
      ChatList: "Gå til chatlisten",
      CompressedHistory: "Komprimert historikk for instrukser",
      Export: "Eksporter alle meldinger i markdown-format",
      Copy: "Kopier",
      Stop: "Stopp",
      Retry: "Prøv igjen",
      Delete: "Slett",
    },
    Rename: "Gi nytt navn",
    Typing: "Skriver …",
    Input: (submitKey: string) => {
      var inputHints = `${submitKey} for å sende`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", Shift + Enter for å omgi";
      }
      return inputHints + ", / for å søke instrukser";
    },
    InputEnabled: "떡볶이에 대해 무엇이든 물어보세요.",
    InputDisabled: "지금은 입력할 수 없어요.",    
    Send: "Send",
  },
  Export: {
    Title: "Alle meldinger",
    Copy: "Kopiere alle",
    Download: "Last ned",
    MessageFromYou: "Melding fra deg",
    MessageFromChatGPT: "Melding fra ChatGPT",
  },
  Memory: {
    Title: "Minneinstruks",
    EmptyContent: "Ingen sålant.",
    Send: "Send minne",
    Copy: "Kopiere minne",
    Reset: "Nulstill sesjon",
    ResetConfirm:
      "Om du nillstiller vil du slette hele historikken. Er du sikker på at du vil nullstille?",
  },
  Home: {
    NewChat: "Ny chat",
    DeleteChat: "Bekreft for å slette det valgte dialogen",
    DeleteToast: "Samtale slettet",
    Revert: "Tilbakestill",
  },
  Settings: {
    Title: "Innstillinger",
    SubTitle: "Alle innstillinger",

    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
    },
    Avatar: "Avatar",
    FontSize: {
      Title: "Fontstørrelsen",
      SubTitle: "Juster fontstørrelsen for samtaleinnholdet.",
    },
    InjectSystemPrompts: {
      Title: "Sett inn systemprompter",
      SubTitle:
        "Tving tillegg av en simulert ChatGPT-systemprompt i begynnelsen av meldingslisten for hver forespørsel",
    },
    Update: {
      Version: (x: string) => `Versjon: ${x}`,
      IsLatest: "Siste versjon",
      CheckUpdate: "Se etter oppdatering",
      IsChecking: "Ser etter oppdatering ...",
      FoundUpdate: (x: string) => `Fant ny versjon: ${x}`,
      GoToUpdate: "Oppdater",
    },
    SendKey: "Send nøkkel",
    Theme: "Tema",
    TightBorder: "Stram innramming",
    Prompt: {
      Disable: {
        Title: "Skru av autofullfør",
        SubTitle: "Skriv / for å trigge autofullfør",
      },
      List: "Instruksliste",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} innebygde, ${custom} brukerdefinerte`,
      Edit: "Endre",
      Modal: {
        Title: "Instruksliste",
        Add: "Legg til",
        Search: "Søk instrukser",
      },
    },
    HistoryCount: {
      Title: "Tall på tilhørende meldinger",
      SubTitle: "Antall sendte meldinger tilknyttet hver spørring",
    },
    CompressThreshold: {
      Title: "Terskeverdi for komprimering av historikk",
      SubTitle:
        "Komprimer dersom ikke-komprimert lengde på meldinger overskrider denne verdien",
    },

    Usage: {
      Title: "Saldo for konto",
      SubTitle(used: any, total: any) {
        return `Brukt denne måneden $${used}, abonnement $${total}`;
      },
      IsChecking: "Sjekker ...",
      Check: "Sjekk",
      NoAccess: "Skriv inn API-nøkkelen for å sjekke saldo",
    },

    Model: "Model",
    Temperature: {
      Title: "Temperatur",
      SubTitle: "Høyere verdi gir mer kreative svar",
    },
    MaxTokens: {
      Title: "Maks tokens",
      SubTitle: "Maksimum lengde på tokens for instrukser og svar",
    },
  },
  Store: {
    DefaultTopic: "Ny samtale",
    BotHello: "안녕하세요! 떡볶이에 대한 모든 궁금증을 해소시켜 드릴 수 있는 BOKI 보키에요😋",
    BotAskGender: "떡볶이 취향을 파악하기 위해, 당신의 성별이 무엇인지 먼저 알고 싶어요!",
    BotAskName: "그렇군요! 대화에서 불려질 이름도 함께 입력해 주시면, 대화를 시작할 모든 세팅이 마무리 돼요!",
    BotWhatKindTbk: (userName: string) => `${userName}! 안녕! 오늘은 어떤 떡볶이에 대해 얘기해 볼까?`,
    BotEmptyCount: (userName: string) => `${userName}님! 정말 아쉽지만 대화 입력 횟수가 모두 소진되었어요 🥲 마치기 전에, 보키가 맛있는 밀키트를 추천하고 싶어요! 앞으로도 새로운 푸딘코의 밀키트 출시가 예정되어 있으니 우리 곧 다시 만나요~ 👋`,
    BotWelcomeBack: (userName: string) => `다시 돌아왔군요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotWelcomeLongTime: (userName: string) => `오랜만이에요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotSeeYouAgain: "앞으로도 푸딘코의 밀키트 출시가 예정되어 있어요! 우리 곧 다시 만나요",
    BotSmartStoreLink: "[맛쟁이 떡볶이 보러 가기 🍽️](https://smartstore.naver.com/foodinko/products/9626125649?NaPm=ct%3Dlrx5dgl4%7Cci%3D57f9d867e6e279bbb28dd69d17e87e547804a467%7Ctr%3Dsls%7Csn%3D8677814%7Chk%3D40c55d087b779f781e6c3a276250bf8688b10d4a)",
    Error: "Noe gikk galt, vennligst prøv igjen senere.",
    Prompt: {
      History: (content: string) =>
        "Dette er et sammendrag av chatthistorikken mellom AI-en og brukeren som en oppsummering: " +
        content,
      Topic:
        "Vennligst lag en fire til fem ords tittel som oppsummerer samtalen vår uten innledning, punktsetting, anførselstegn, punktum, symboler eller tillegg tekst. Fjern innrammende anførselstegn.",
      Summarize:
        "Oppsummer diskusjonen vår kort i 200 ord eller mindre for å bruke som en oppfordring til fremtidig sammenheng.",
    },
  },
  Copy: {
    Success: "Kopiert til utklippstavle",
    Failed: "Kopiering feilet. Vennligst gi tilgang til utklippstavlen.",
  },
  Context: {
    Toast: (x: any) => `Med ${x} kontekstuelle instrukser`,
    Edit: "Kontekstuelle -og minneinstrukser",
    Add: "Legg til",
  },
  Exporter: {
    Model: "Model",
    Messages: "Meldingar",
    Topic: "Emne",
    Time: "Tid",
  },
};

export default no;
