import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const es: PartialLocaleType = {
  WIP: "En construcción...",
  Error: {
    Unauthorized:
      "Acceso no autorizado, por favor ingrese el código de acceso en la [página](/#/auth) de configuración.",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} mensajes`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} mensajes con ChatGPT`,
    Actions: {
      ChatList: "Ir a la lista de chats",
      CompressedHistory: "Historial de memoria comprimido",
      Export: "Exportar todos los mensajes como Markdown",
      Copy: "Copiar",
      Stop: "Detener",
      Retry: "Reintentar",
      Delete: "Delete",
    },
    Rename: "Renombrar chat",
    Typing: "Escribiendo...",
    Input: (submitKey: string) => {
      var inputHints = `Escribe algo y presiona ${submitKey} para enviar`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", presiona Shift + Enter para nueva línea";
      }
      return inputHints;
    },
    InputEnabled: "떡볶이에 대해 무엇이든 물어보세요.",
    InputDisabled: "지금은 입력할 수 없어요.",
    Send: "Enviar",
    Config: {
      Reset: "Reset to Default",
      SaveAs: "Save as Mask",
    },
  },
  Export: {
    Title: "Todos los mensajes",
    Copy: "Copiar todo",
    Download: "Descargar",
    MessageFromYou: "Mensaje de ti",
    MessageFromChatGPT: "Mensaje de ChatGPT",
  },
  Memory: {
    Title: "Historial de memoria",
    EmptyContent: "Aún no hay nada.",
    Copy: "Copiar todo",
    Send: "Send Memory",
    Reset: "Reset Session",
    ResetConfirm:
      "Resetting will clear the current conversation history and historical memory. Are you sure you want to reset?",
  },
  Home: {
    NewChat: "Nuevo chat",
    DeleteChat: "¿Confirmar eliminación de la conversación seleccionada?",
    DeleteToast: "Chat Deleted",
    Revert: "Revert",
  },
  Settings: {
    Title: "Configuración",
    SubTitle: "Todas las configuraciones",

    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "Todos los idiomas",
    },
    Avatar: "Avatar",
    FontSize: {
      Title: "Tamaño de fuente",
      SubTitle: "Ajustar el tamaño de fuente del contenido del chat",
    },
    InjectSystemPrompts: {
      Title: "Inyectar Prompts del Sistema",
      SubTitle:
        "Agregar forzosamente un prompt de sistema simulado de ChatGPT al comienzo de la lista de mensajes en cada solicitud",
    },
    Update: {
      Version: (x: string) => `Versión: ${x}`,
      IsLatest: "Última versión",
      CheckUpdate: "Buscar actualizaciones",
      IsChecking: "Buscando actualizaciones...",
      FoundUpdate: (x: string) => `Se encontró una nueva versión: ${x}`,
      GoToUpdate: "Actualizar",
    },
    SendKey: "Tecla de envío",
    Theme: "Tema",
    TightBorder: "Borde ajustado",
    SendPreviewBubble: {
      Title: "Enviar burbuja de vista previa",
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
        Title: "Desactivar autocompletado",
        SubTitle: "Escribe / para activar el autocompletado",
      },
      List: "Lista de autocompletado",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} incorporado, ${custom} definido por el usuario`,
      Edit: "Editar",
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
      Title: "Cantidad de mensajes adjuntos",
      SubTitle: "Número de mensajes enviados adjuntos por solicitud",
    },
    CompressThreshold: {
      Title: "Umbral de compresión de historial",
      SubTitle:
        "Se comprimirán los mensajes si la longitud de los mensajes no comprimidos supera el valor",
    },

    Usage: {
      Title: "Saldo de la cuenta",
      SubTitle(used: any, total: any) {
        return `Usado $${used}, subscription $${total}`;
      },
      IsChecking: "Comprobando...",
      Check: "Comprobar de nuevo",
      NoAccess: "Introduzca la clave API para comprobar el saldo",
    },

    Model: "Modelo",
    Temperature: {
      Title: "Temperatura",
      SubTitle: "Un valor mayor genera una salida más aleatoria",
    },
    MaxTokens: {
      Title: "Máximo de tokens",
      SubTitle: "Longitud máxima de tokens de entrada y tokens generados",
    },
    PresencePenalty: {
      Title: "Penalización de presencia",
      SubTitle:
        "Un valor mayor aumenta la probabilidad de hablar sobre nuevos temas",
    },
    FrequencyPenalty: {
      Title: "Penalización de frecuencia",
      SubTitle:
        "Un valor mayor que disminuye la probabilidad de repetir la misma línea",
    },
  },
  Store: {
    DefaultTopic: "Nueva conversación",
    BotHello: "안녕하세요! 떡볶이에 대한 모든 궁금증을 해소시켜 드릴 수 있는 BOKI 보키에요😋",
    BotAskGender: "떡볶이 취향을 파악하기 위해, 당신의 성별이 무엇인지 먼저 알고 싶어요!",
    BotAskName: "그렇군요! 대화에서 불려질 이름도 함께 입력해 주시면, 대화를 시작할 모든 세팅이 마무리 돼요!",
    BotWhatKindTbk: (userName: string) => `${userName}! 안녕! 오늘은 어떤 떡볶이에 대해 얘기해 볼까?`,
    BotEmptyCount: (userName: string) => `${userName}님! 정말 아쉽지만 대화 횟수가 모두 소진되었어요🥲 떠나기 전에, 보키가 맛있는 밀키트 하나 추천해 드릴까요?`,
    BotWelcomeBack: (userName: string) => `다시 돌아왔군요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotWelcomeLongTime: (userName: string) => `오랜만이에요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotSeeYouAgain: "앞으로도 푸딘코의 밀키트 출시가 예정되어 있어요! 우리 곧 다시 만나요",
    BotSmartStoreLink: "[맛쟁이 떡볶이 보러 가기 🍽️](https://smartstore.naver.com/foodinko/products/9626125649?NaPm=ct%3Dlrx5dgl4%7Cci%3D57f9d867e6e279bbb28dd69d17e87e547804a467%7Ctr%3Dsls%7Csn%3D8677814%7Chk%3D40c55d087b779f781e6c3a276250bf8688b10d4a)",
    Error: "Algo salió mal, por favor intenta nuevamente más tarde.",
    Prompt: {
      History: (content: string) =>
        "Este es un resumen del historial del chat entre la IA y el usuario como recapitulación: " +
        content,
      Topic:
        "Por favor, genera un título de cuatro a cinco palabras que resuma nuestra conversación sin ningún inicio, puntuación, comillas, puntos, símbolos o texto adicional. Elimina las comillas que lo envuelven.",
      Summarize:
        "Resuma nuestra discusión brevemente en 200 caracteres o menos para usarlo como un recordatorio para futuros contextos.",
    },
  },
  Copy: {
    Success: "Copiado al portapapeles",
    Failed:
      "La copia falló, por favor concede permiso para acceder al portapapeles",
  },
  Context: {
    Toast: (x: any) => `With ${x} contextual prompts`,
    Edit: "Contextual and Memory Prompts",
    Add: "Add One",
  },
  Plugin: {
    Name: "Plugin",
  },
  FineTuned: {
    Sysmessage: "Eres un asistente que",
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
    Model: "Modelo",
    Messages: "Mensajes",
    Topic: "Tema",
    Time: "Time",
  },
};

export default es;
