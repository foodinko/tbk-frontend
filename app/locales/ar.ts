import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const ar: PartialLocaleType = {
  WIP: "قريبًا...",
  Error: {
    Unauthorized:
      "غير مصرح بالوصول، يرجى إدخال رمز الوصول [auth](/#/auth) في صفحة المصادقة.",
  },
  Auth: {
    Title: "تحتاج إلى رمز الوصول",
    Tips: "يرجى إدخال رمز الوصول أدناه",
    SubTips: "أو أدخل مفتاح واجهة برمجة تطبيقات OpenAI الخاص بك",
    Input: "رمز الوصول",
    Confirm: "تأكيد",
    Later: "لاحقًا",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} رسائل`,
  },
  Chat: {
    SubTitle: (count: number) => ` ${count} رسائل مع ChatGPT`,
    Actions: {
      ChatList: "الانتقال إلى قائمة الدردشة",
      CompressedHistory: "ملخص ضغط ذاكرة التاريخ",
      Export: "تصدير جميع الرسائل كـ Markdown",
      Copy: "نسخ",
      Stop: "توقف",
      Retry: "إعادة المحاولة",
      Delete: "حذف",
    },
    InputActions: {
      Stop: "توقف",
      ToBottom: "إلى آخر",
      Theme: {
        auto: "تلقائي",
        light: "نمط فاتح",
        dark: "نمط داكن",
      },
      Prompt: "الاقتراحات",
      Masks: "الأقنعة",
      Clear: "مسح السياق",
      Settings: "الإعدادات",
    },
    Rename: "إعادة تسمية الدردشة",
    Typing: "كتابة...",
    Input: (submitKey: string) => {
      var inputHints = ` اضغط على ${submitKey} للإرسال`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += "، Shift + Enter للإنشاء";
      }
      return inputHints + "، / للبحث في الاقتراحات";
    },
    InputEnabled: "떡볶이에 대해 무엇이든 물어보세요.",
    InputDisabled: "지금은 입력할 수 없어요.",
    Send: "إرسال",
    Config: {
      Reset: "إعادة التعيين إلى الإعدادات الافتراضية",
      SaveAs: "حفظ كأقنعة",
    },
  },
  Export: {
    Title: "تصدير الرسائل",
    Copy: "نسخ الكل",
    Download: "تنزيل",
    MessageFromYou: "رسالة منك",
    MessageFromChatGPT: "رسالة من ChatGPT",
    Share: "مشاركة على ShareGPT",
    Format: {
      Title: "صيغة التصدير",
      SubTitle: "Markdown أو صورة PNG",
    },
    IncludeContext: {
      Title: "تضمين السياق",
      SubTitle: "تصدير اقتراحات السياق في الأقنعة أم لا",
    },
    Steps: {
      Select: "تحديد",
      Preview: "معاينة",
    },
  },
  Select: {
    Search: "بحث",
    All: "تحديد الكل",
    Latest: "تحديد أحدث",
    Clear: "مسح",
  },
  Memory: {
    Title: "اقتراحات الذاكرة",
    EmptyContent: "لا شيء حتى الآن.",
    Send: "إرسال الذاكرة",
    Copy: "نسخ الذاكرة",
    Reset: "إعادة التعيين",
    ResetConfirm:
      "سيؤدي إعادة التعيين إلى مسح سجل المحادثة الحالي والذاكرة التاريخية. هل أنت متأكد أنك تريد الاستمرار؟",
  },
  Home: {
    NewChat: "دردشة جديدة",
    DeleteChat: "هل تريد تأكيد حذف المحادثة المحددة؟",
    DeleteToast: "تم حذف الدردشة",
    Revert: "التراجع",
  },
  Settings: {
    Title: "الإعدادات",
    SubTitle: "جميع الإعدادات",

    Lang: {
      Name: "Language", // تنبيه: إذا كنت ترغب في إضافة ترجمة جديدة، يرجى عدم ترجمة هذه القيمة وتركها "Language"
      All: "كل اللغات",
    },
    Avatar: "الصورة الرمزية",
    FontSize: {
      Title: "حجم الخط",
      SubTitle: "ضبط حجم الخط لمحتوى الدردشة",
    },
    InjectSystemPrompts: {
      Title: "حقن تلميحات النظام",
      SubTitle:
        "قم بإضافة تلميحة نظام محاكاة ChatGPT إلى بداية قائمة الرسائل المُطلَبة في كل طلب",
    },
    InputTemplate: {
      Title: "نموذج الإدخال",
      SubTitle: "سيتم ملء أحدث رسالة في هذا النموذج",
    },
    Update: {
      Version: (x: string) => ` الإصدار: ${x}`,
      IsLatest: "أحدث إصدار",
      CheckUpdate: "التحقق من التحديث",
      IsChecking: "جارٍ التحقق من التحديث...",
      FoundUpdate: (x: string) => ` تم العثور على إصدار جديد: ${x}`,
      GoToUpdate: "التحديث",
    },
    SendKey: "مفتاح الإرسال",
    Theme: "السمة",
    TightBorder: "حدود ضيقة",
    SendPreviewBubble: {
      Title: "عرض معاينة الـ Send",
      SubTitle: "معاينة Markdown في فقاعة",
    },
    Mask: {
      Splash: {
        Title: "شاشة تظهر الأقنعة",
        SubTitle: "عرض شاشة تظهر الأقنعة قبل بدء الدردشة الجديدة",
      },
    },
    Prompt: {
      Disable: {
        Title: "تعطيل الاكتمال التلقائي",
        SubTitle: "اكتب / لتشغيل الاكتمال التلقائي",
      },
      List: "قائمة الاقتراحات",
      ListCount: (builtin: number, custom: number) => `
${builtin} مدمجة، ${custom} تم تعريفها من قبل المستخدم`,
      Edit: "تعديل",
      Modal: {
        Title: "قائمة الاقتراحات",
        Add: "إضافة واحدة",
        Search: "البحث في الاقتراحات",
      },
      EditModal: {
        Title: "تحرير الاقتراح",
      },
    },
    HistoryCount: {
      Title: "عدد الرسائل المرفقة",
      SubTitle: "عدد الرسائل المرسلة المرفقة في كل طلب",
    },
    CompressThreshold: {
      Title: "حد الضغط للتاريخ",
      SubTitle: "سيتم الضغط إذا تجاوزت طول الرسائل غير المضغوطة الحد المحدد",
    },

    Usage: {
      Title: "رصيد الحساب",
      SubTitle(used: any, total: any) {
        return `تم استخدام $${used} من هذا الشهر، الاشتراك ${total}`;
      },
      IsChecking: "جارٍ التحقق...",
      Check: "التحقق",
      NoAccess: "أدخل مفتاح API للتحقق من الرصيد",
    },

    Model: "النموذج",
    Temperature: {
      Title: "الحرارة",
      SubTitle: "قيمة أكبر تجعل الإخراج أكثر عشوائية",
    },
    MaxTokens: {
      Title: "الحد الأقصى للرموز",
      SubTitle: "الحد الأقصى لعدد الرموز المدخلة والرموز المُنشأة",
    },
    PresencePenalty: {
      Title: "تأثير الوجود",
      SubTitle: "قيمة أكبر تزيد من احتمالية التحدث عن مواضيع جديدة",
    },
    FrequencyPenalty: {
      Title: "تأثير التكرار",
      SubTitle: "قيمة أكبر تقلل من احتمالية تكرار نفس السطر",
    },
  },
  Store: {
    DefaultTopic: "محادثة جديدة",
    BotHello: "안녕하세요! 떡볶이에 대한 모든 궁금증을 해소시켜 드릴 수 있는 BOKI 보키에요😋",
    BotAskGender: "떡볶이 취향을 파악하기 위해, 당신의 성별이 무엇인지 먼저 알고 싶어요!",
    BotAskName: "그렇군요! 대화에서 불려질 이름도 함께 입력해 주시면, 대화를 시작할 모든 세팅이 마무리 돼요!",
    BotWhatKindTbk: (userName: string) => `${userName}! 안녕! 오늘은 어떤 떡볶이에 대해 얘기해 볼까?`,
    BotEmptyCount: (userName: string) => `${userName}님! 정말 아쉽지만 대화 횟수가 모두 소진되었어요🥲 떠나기 전에, 보키가 맛있는 밀키트 하나 추천해 드릴까요?`,
    BotWelcomeBack: (userName: string) => `다시 돌아왔군요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotWelcomeLongTime: (userName: string) => `오랜만이에요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotSeeYouAgain: "앞으로도 푸딘코의 밀키트 출시가 예정되어 있어요! 우리 곧 다시 만나요",
    BotSmartStoreLink: "https://smartstore.naver.com/foodinko/products/9626125649?NaPm=ct%3Dlrx5dgl4%7Cci%3D57f9d867e6e279bbb28dd69d17e87e547804a467%7Ctr%3Dsls%7Csn%3D8677814%7Chk%3D40c55d087b779f781e6c3a276250bf8688b10d4a",
    Error: "حدث خطأ ما، يرجى المحاولة مرة أخرى في وقت لاحق.",
    Prompt: {
      History: (content: string) => "هذا ملخص لسجل الدردشة كمراجعة: " + content,
      Topic:
        "يرجى إنشاء عنوان يتكون من أربع إلى خمس كلمات يلخص محادثتنا دون أي مقدمة أو ترقيم أو علامات ترقيم أو نقاط أو رموز إضافية. قم بإزالة علامات التنصيص المحيطة.",
      Summarize:
        "قم بتلخيص النقاش بشكل موجز في 200 كلمة أو أقل لاستخدامه كاقتراح للسياق في المستقبل.",
    },
  },
  Copy: {
    Success: "تم النسخ إلى الحافظة",
    Failed: "فشلت عملية النسخ، يرجى منح الإذن للوصول إلى الحافظة",
  },
  Context: {
    Toast: (x: any) => `مع ${x} اقتراحًا ذا سياق`,
    Edit: "الاقتراحات السياقية والذاكرة",
    Add: "إضافة اقتراح",
    Clear: "مسح السياق",
    Revert: "التراجع",
  },
  Plugin: {
    Name: "المكوّن الإضافي",
  },
  FineTuned: {
    Sysmessage: "أنت مساعد ي",
  },
  Mask: {
    Name: "الأقنعة",
    Page: {
      Title: "قالب الاقتراح",
      SubTitle: (count: number) => `${count} قوالب الاقتراح`,
      Search: "البحث في القوالب",
      Create: "إنشاء",
    },
    Item: {
      Info: (count: number) => `${count} اقتراحات`,
      Chat: "الدردشة",
      View: "عرض",
      Edit: "تعديل",
      Delete: "حذف",
      DeleteConfirm: "تأكيد الحذف؟",
    },
    EditModal: {
      Title: (readonly: boolean) => `
تعديل قالب الاقتراح ${readonly ? "(للقراءة فقط)" : ""}`,
      Download: "تنزيل",
      Clone: "استنساخ",
    },
    Config: {
      Avatar: "صورة الروبوت",
      Name: "اسم الروبوت",
      Sync: {
        Title: "استخدام الإعدادات العامة",
        SubTitle: "استخدام الإعدادات العامة في هذه الدردشة",
        Confirm: "تأكيد الاستبدال بالإعدادات المخصصة بالإعدادات العامة؟",
      },
      HideContext: {
        Title: "إخفاء اقتراحات السياق",
        SubTitle: "عدم عرض اقتراحات السياق في الدردشة",
      },
    },
  },
  NewChat: {
    Return: "العودة",
    Skip: "ابدأ فقط",
    Title: "اختيار قناع",
    SubTitle: "دردشة مع الروح وراء القناع",
    More: "المزيد",
    NotShow: "عدم العرض مرة أخرى",
    ConfirmNoShow: "تأكيد تعطيله؟ يمكنك تمكينه في الإعدادات لاحقًا.",
  },

  UI: {
    Confirm: "تأكيد",
    Cancel: "إلغاء",
    Close: "إغلاق",
    Create: "إنشاء",
    Edit: "تعديل",
  },
  Exporter: {
    Model: "النموذج",
    Messages: "الرسائل",
    Topic: "الموضوع",
    Time: "الوقت",
  },
};

export default ar;
