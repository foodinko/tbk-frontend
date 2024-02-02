import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const ru: PartialLocaleType = {
  WIP: "Скоро...",
  Error: {
    Unauthorized:
      "Несанкционированный доступ. Пожалуйста, введите код доступа на [странице](/#/auth) настроек.",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} сообщений`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} сообщений с ChatGPT`,
    Actions: {
      ChatList: "Перейти к списку чатов",
      CompressedHistory: "Сжатая история памяти",
      Export: "Экспортировать все сообщения в формате Markdown",
      Copy: "Копировать",
      Stop: "Остановить",
      Retry: "Повторить",
      Delete: "Удалить",
    },
    Rename: "Переименовать чат",
    Typing: "Печатает…",
    Input: (submitKey: string) => {
      var inputHints = `${submitKey} для отправки сообщения`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", Shift + Enter для переноса строки";
      }
      return inputHints + ", / для поиска подсказок";
    },
    InputEnabled: "떡볶이에 대해 무엇이든 물어보세요.",
    InputDisabled: "지금은 입력할 수 없어요.",    
    Send: "Отправить",
    Config: {
      Reset: "Сбросить настройки",
      SaveAs: "Сохранить как маску",
    },
  },
  Export: {
    Title: "Все сообщения",
    Copy: "Копировать все",
    Download: "Скачать",
    MessageFromYou: "Сообщение от вас",
    MessageFromChatGPT: "Сообщение от ChatGPT",
  },
  Memory: {
    Title: "Память",
    EmptyContent: "Пусто.",
    Send: "Отправить память",
    Copy: "Копировать память",
    Reset: "Сбросить сессию",
    ResetConfirm:
      "При сбросе текущая история переписки и историческая память будут удалены. Вы уверены, что хотите сбросить?",
  },
  Home: {
    NewChat: "Новый чат",
    DeleteChat: "Вы действительно хотите удалить выбранный разговор?",
    DeleteToast: "Чат удален",
    Revert: "Отмена",
  },
  Settings: {
    Title: "Настройки",
    SubTitle: "Все настройки",

    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "Все языки",
    },
    Avatar: "Аватар",
    FontSize: {
      Title: "Размер шрифта",
      SubTitle: "Настроить размер шрифта контента чата",
    },
    InjectSystemPrompts: {
      Title: "Вставить системные подсказки",
      SubTitle:
        "Принудительно добавить симулированную системную подсказку ChatGPT в начало списка сообщений для каждого запроса",
    },
    Update: {
      Version: (x: string) => `Версия: ${x}`,
      IsLatest: "Последняя версия",
      CheckUpdate: "Проверить обновление",
      IsChecking: "Проверка обновления...",
      FoundUpdate: (x: string) => `Найдена новая версия: ${x}`,
      GoToUpdate: "Обновить",
    },
    SendKey: "Клавиша отправки",
    Theme: "Тема",
    TightBorder: "Узкая граница",
    SendPreviewBubble: {
      Title: "Отправить предпросмотр",
      SubTitle: "Предварительный просмотр markdown в пузыре",
    },
    Mask: {
      Splash: {
        Title: "Экран заставки маски",
        SubTitle: "Показывать экран заставки маски перед началом нового чата",
      },
    },
    Prompt: {
      Disable: {
        Title: "Отключить автозаполнение",
        SubTitle: "Ввод / для запуска автозаполнения",
      },
      List: "Список подсказок",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} встроенных, ${custom} пользовательских`,
      Edit: "Редактировать",
      Modal: {
        Title: "Список подсказок",
        Add: "Добавить",
        Search: "Поиск подсказок",
      },
      EditModal: {
        Title: "Редактировать подсказку",
      },
    },
    HistoryCount: {
      Title: "Количество прикрепляемых сообщений",
      SubTitle:
        "Количество отправляемых сообщений, прикрепляемых к каждому запросу",
    },
    CompressThreshold: {
      Title: "Порог сжатия истории",
      SubTitle:
        "Будет сжимать, если длина несжатых сообщений превышает указанное значение",
    },

    Usage: {
      Title: "Баланс аккаунта",
      SubTitle(used: any, total: any) {
        return `Использовано в этом месяце $${used}, подписка $${total}`;
      },
      IsChecking: "Проверка...",
      Check: "Проверить",
      NoAccess: "Введите API ключ, чтобы проверить баланс",
    },

    Model: "Модель",
    Temperature: {
      Title: "Температура",
      SubTitle: "Чем выше значение, тем более случайный вывод",
    },
    MaxTokens: {
      Title: "Максимальное количество токенов",
      SubTitle: "Максимальная длина вводных и генерируемых токенов",
    },
    PresencePenalty: {
      Title: "Штраф за повторения",
      SubTitle:
        "Чем выше значение, тем больше вероятность общения на новые темы",
    },
    FrequencyPenalty: {
      Title: "Штраф за частоту",
      SubTitle:
        "Большее значение снижает вероятность повторения одной и той же строки",
    },
  },
  Store: {
    DefaultTopic: "Новый разговор",
    BotHello: "안녕하세요! 떡볶이에 대한 모든 궁금증을 해소시켜 드릴 수 있는 BOKI 보키에요😋",
    BotAskGender: "떡볶이 취향을 파악하기 위해, 당신의 성별이 무엇인지 먼저 알고 싶어요!",
    BotAskName: "그렇군요! 대화에서 불려질 이름도 함께 입력해 주시면, 대화를 시작할 모든 세팅이 마무리 돼요!",
    BotWhatKindTbk: (userName: string) => `${userName}! 안녕! 오늘은 어떤 떡볶이에 대해 얘기해 볼까?`,
    BotEmptyCount: (userName: string) => `${userName}님! 정말 아쉽지만 대화 횟수가 모두 소진되었어요🥲 떠나기 전에, 보키가 맛있는 밀키트 하나 추천해 드릴까요?`,
    BotWelcomeBack: (userName: string) => `다시 돌아왔군요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotWelcomeLongTime: (userName: string) => `오랜만이에요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotSeeYouAgain: "앞으로도 푸딘코의 밀키트 출시가 예정되어 있어요! 우리 곧 다시 만나요",
    BotSmartStoreLink: "https://smartstore.naver.com/foodinko/products/9626125649?NaPm=ct%3Dlrx5dgl4%7Cci%3D57f9d867e6e279bbb28dd69d17e87e547804a467%7Ctr%3Dsls%7Csn%3D8677814%7Chk%3D40c55d087b779f781e6c3a276250bf8688b10d4a",
    Error: "Что-то пошло не так. Пожалуйста, попробуйте еще раз позже.",
    Prompt: {
      History: (content: string) =>
        "Это краткое содержание истории чата между ИИ и пользователем: " +
        content,
      Topic:
        "Пожалуйста, создайте заголовок из четырех или пяти слов, который кратко описывает нашу беседу, без введения, знаков пунктуации, кавычек, точек, символов или дополнительного текста. Удалите кавычки.",
      Summarize:
        "Кратко изложите нашу дискуссию в 200 словах или менее для использования в будущем контексте.",
    },
  },
  Copy: {
    Success: "Скопировано в буфер обмена",
    Failed:
      "Не удалось скопировать, пожалуйста, предоставьте разрешение на доступ к буферу обмена",
  },
  Context: {
    Toast: (x: any) => `С ${x} контекстными подсказками`,
    Edit: "Контекстные и памятные подсказки",
    Add: "Добавить подсказку",
  },
  Plugin: {
    Name: "Плагин",
  },
  FineTuned: {
    Sysmessage: "Вы - ассистент, который",
  },
  Mask: {
    Name: "Маска",
    Page: {
      Title: "Шаблон подсказки",
      SubTitle: (count: number) => `${count} шаблонов подсказок`,
      Search: "Поиск шаблонов",
      Create: "Создать",
    },
    Item: {
      Info: (count: number) => `${count} подсказок`,
      Chat: "Чат",
      View: "Просмотр",
      Edit: "Редактировать",
      Delete: "Удалить",
      DeleteConfirm: "Подтвердить удаление?",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `Редактирование шаблона подсказки ${
          readonly ? "(только для чтения)" : ""
        }`,
      Download: "Скачать",
      Clone: "Клонировать",
    },
    Config: {
      Avatar: "Аватар бота",
      Name: "Имя бота",
    },
  },
  NewChat: {
    Return: "Вернуться",
    Skip: "Пропустить",
    Title: "Выберите маску",
    SubTitle: "Общайтесь с душой за маской",
    More: "Найти еще",
    NotShow: "Не показывать снова",
    ConfirmNoShow:
      "Подтвердите отключение? Вы можете включить это позже в настройках.",
  },

  UI: {
    Confirm: "Подтвердить",
    Cancel: "Отмена",
    Close: "Закрыть",
    Create: "Создать",
    Edit: "Редактировать",
  },
  Exporter: {
    Model: "Модель",
    Messages: "Сообщения",
    Topic: "Тема",
    Time: "Время",
  },
};

export default ru;
