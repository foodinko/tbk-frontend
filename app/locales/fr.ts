import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const fr: PartialLocaleType = {
  WIP: "Prochainement...",
  Error: {
    Unauthorized:
      "Accès non autorisé, veuillez saisir le code d'accès dans la [page](/#/auth) des paramètres.",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} messages en total`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} messages échangés avec ChatGPT`,
    Actions: {
      ChatList: "Aller à la liste de discussion",
      CompressedHistory: "Mémoire d'historique compressée Prompt",
      Export: "Exporter tous les messages en tant que Markdown",
      Copy: "Copier",
      Stop: "Arrêter",
      Retry: "Réessayer",
      Delete: "Supprimer",
      Pin: "Épingler",
      PinToastContent: "Épingler 2 messages à des messages contextuels",
      PinToastAction: "Voir",
      Edit: "Modifier",
    },
    Commands: {
      new: "Commencer une nouvelle conversation",
      newm: "Démarrer une nouvelle conversation avec un assistant",
      next: "Conversation suivante",
      prev: "Conversation précédente",
      clear: "Effacer le contexte",
      del: "Supprimer la Conversation",
    },
    InputActions: {
      Stop: "Stop",
      ToBottom: "Au dernier",
      Theme: {
        auto: "Auto",
        light: "Thème clair",
        dark: "Thème sombre",
      },
      Prompt: "Instructions",
      Masks: "Assistants",
      Clear: "Effacer le contexte",
      Settings: "Réglages",
    },
    Rename: "Renommer la conversation",
    Typing: "En train d'écrire…",
    Input: (submitKey: string) => {
      var inputHints = `Appuyez sur ${submitKey} pour envoyer`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", Shift + Enter pour insérer un saut de ligne";
      }
      return inputHints + ", / pour rechercher des prompts";
    },
    InputEnabled: "떡볶이에 대해 무엇이든 물어보세요.",
    InputDisabled: "지금은 입력할 수 없어요.",
    Send: "Envoyer",
    Config: {
      Reset: "Restaurer les paramètres par défaut",
      SaveAs: "Enregistrer en tant que masque",
    },
  },
  Export: {
    Title: "Tous les messages",
    Copy: "Tout sélectionner",
    Download: "Télécharger",
    MessageFromYou: "Message de votre part",
    MessageFromChatGPT: "Message de ChatGPT",
  },
  Memory: {
    Title: "Prompt mémoire",
    EmptyContent: "Rien encore.",
    Send: "Envoyer la mémoire",
    Copy: "Copier la mémoire",
    Reset: "Réinitialiser la session",
    ResetConfirm:
      "La réinitialisation supprimera l'historique de la conversation actuelle ainsi que la mémoire de l'historique. Êtes-vous sûr de vouloir procéder à la réinitialisation?",
  },
  Home: {
    NewChat: "Nouvelle discussion",
    DeleteChat: "Confirmer la suppression de la conversation sélectionnée ?",
    DeleteToast: "Conversation supprimée",
    Revert: "Revenir en arrière",
  },
  Settings: {
    Title: "Paramètres",
    SubTitle: "Toutes les configurations",
    Danger: {
      Reset: {
        Title: "Restaurer les paramètres",
        SubTitle: "Restaurer les paramètres par défaut",
        Action: "Reinitialiser",
        Confirm: "Confirmer la réinitialisation des paramètres?",
      },
      Clear: {
        Title: "Supprimer toutes les données",
        SubTitle:
          "Effacer toutes les données, y compris les conversations et les paramètres",
        Action: "Supprimer",
        Confirm: "Confirmer la suppression de toutes les données?",
      },
    },
    Lang: {
      Name: "Language", // ATTENTION : si vous souhaitez ajouter une nouvelle traduction, ne traduisez pas cette valeur, laissez-la sous forme de `Language`
      All: "Toutes les langues",
    },

    Avatar: "Avatar",
    FontSize: {
      Title: "Taille des polices",
      SubTitle: "Ajuste la taille de police du contenu de la conversation",
    },
    InjectSystemPrompts: {
      Title: "Injecter des invites système",
      SubTitle:
        "Ajoute de force une invite système simulée de ChatGPT au début de la liste des messages pour chaque demande",
    },
    InputTemplate: {
      Title: "Template",
      SubTitle: "Le message le plus récent sera ajouté à ce template.",
    },
    Update: {
      Version: (x: string) => `Version : ${x}`,
      IsLatest: "Dernière version",
      CheckUpdate: "Vérifier la mise à jour",
      IsChecking: "Vérification de la mise à jour...",
      FoundUpdate: (x: string) => `Nouvelle version disponible : ${x}`,
      GoToUpdate: "Mise à jour",
    },
    SendKey: "Clé d'envoi",
    Theme: "Thème",
    TightBorder: "Bordure serrée",
    SendPreviewBubble: {
      Title: "Aperçu de l'envoi dans une bulle",
      SubTitle: "Aperçu du Markdown dans une bulle",
    },
    Mask: {
      Splash: {
        Title: "Écran de masque",
        SubTitle:
          "Afficher un écran de masque avant de démarrer une nouvelle discussion",
      },
      Builtin: {
        Title: "Masquer Les Assistants Intégrés",
        SubTitle: "Masquer les assistants intégrés par défaut",
      },
    },
    Prompt: {
      Disable: {
        Title: "Désactiver la saisie semi-automatique",
        SubTitle: "Appuyez sur / pour activer la saisie semi-automatique",
      },
      List: "Liste de prompts",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} intégré, ${custom} personnalisé`,
      Edit: "Modifier",
      Modal: {
        Title: "Liste de prompts",
        Add: "Ajouter un élément",
        Search: "Rechercher des prompts",
      },
      EditModal: {
        Title: "Modifier le prompt",
      },
    },
    HistoryCount: {
      Title: "Nombre de messages joints",
      SubTitle: "Nombre de messages envoyés attachés par demande",
    },
    CompressThreshold: {
      Title: "Seuil de compression de l'historique",
      SubTitle:
        "Comprimera si la longueur des messages non compressés dépasse cette valeur",
    },

    Usage: {
      Title: "Solde du compte",
      SubTitle(used: any, total: any) {
        return `Épuisé ce mois-ci $${used}, abonnement $${total}`;
      },
      IsChecking: "Vérification...",
      Check: "Vérifier",
      NoAccess: "Entrez la clé API pour vérifier le solde",
    },

    Model: "Modèle",
    Temperature: {
      Title: "Température",
      SubTitle: "Une valeur plus élevée rendra les réponses plus aléatoires",
    },
    TopP: {
      Title: "Top P",
      SubTitle:
        "Ne modifiez pas à moins que vous ne sachiez ce que vous faites",
    },
    MaxTokens: {
      Title: "Limite de Tokens",
      SubTitle: "Longueur maximale des tokens d'entrée et des tokens générés",
    },
    PresencePenalty: {
      Title: "Pénalité de présence",
      SubTitle:
        "Une valeur plus élevée augmentera la probabilité d'introduire de nouveaux sujets",
    },
    FrequencyPenalty: {
      Title: "Pénalité de fréquence",
      SubTitle:
        "Une valeur plus élevée diminuant la probabilité de répéter la même ligne",
    },
  },
  Store: {
    DefaultTopic: "Nouvelle conversation",
    BotHello: "안녕하세요! 떡볶이에 대한 모든 궁금증을 해소시켜 드릴 수 있는 BOKI 보키에요😋",
    BotAskGender: "떡볶이 취향을 파악하기 위해, 당신의 성별이 무엇인지 먼저 알고 싶어요!",
    BotAskName: "그렇군요! 대화에서 불려질 이름도 함께 입력해 주시면, 대화를 시작할 모든 세팅이 마무리 돼요!",
    BotWhatKindTbk: (userName: string) => `${userName}! 안녕! 오늘은 어떤 떡볶이에 대해 얘기해 볼까?`,
    BotEmptyCount: (userName: string) => `${userName}님! 정말 아쉽지만 대화 입력 횟수가 모두 소진되었어요 🥲 마치기 전에, 보키가 맛있는 밀키트를 추천하고 싶어요! 앞으로도 새로운 푸딘코의 밀키트 출시가 예정되어 있으니 우리 곧 다시 만나요~ 👋`,
    BotWelcomeBack: (userName: string) => `다시 돌아왔군요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotWelcomeLongTime: (userName: string) => `오랜만이에요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotSeeYouAgain: "앞으로도 푸딘코의 밀키트 출시가 예정되어 있어요! 우리 곧 다시 만나요",
    BotSmartStoreLink: "[맛쟁이 떡볶이 보러 가기 🍽️](https://smartstore.naver.com/foodinko/products/9626125649?NaPm=ct%3Dls9zhfnc%7Cci%3D0e0be055ca54fa486d66e396ca5b64ac8eccfa64%7Ctr%3Dsls%7Csn%3D8677814%7Chk%3D826a390944f997653521b585cd1d198923a8f7af&utm_source=chatbot&utm_medium=ad-link&utm_campaign=s1-foodinko_chatbot_detail&utm_content=240206_chatbot&utm_term=chatbotlink)",
    Error: "Quelque chose s'est mal passé, veuillez réessayer plus tard.",
    Prompt: {
      History: (content: string) =>
        "Ceci est un résumé de l'historique des discussions entre l'IA et l'utilisateur : " +
        content,
      Topic:
        "Veuillez générer un titre de quatre à cinq mots résumant notre conversation sans introduction, ponctuation, guillemets, points, symboles ou texte supplémentaire. Supprimez les guillemets inclus.",
      Summarize:
        "Résumez brièvement nos discussions en 200 mots ou moins pour les utiliser comme prompt de contexte futur.",
    },
  },
  Copy: {
    Success: "Copié dans le presse-papiers",
    Failed:
      "La copie a échoué, veuillez accorder l'autorisation d'accès au presse-papiers",
  },
  Context: {
    Toast: (x: any) => `Avec ${x} contextes de prompts`,
    Edit: "Contextes et mémoires de prompts",
    Add: "Ajouter un prompt",
  },
  Plugin: {
    Name: "Extension",
  },
  FineTuned: {
    Sysmessage: "Eres un asistente que",
  },
  Mask: {
    Name: "Masque",
    Page: {
      Title: "Modèle de prompt",
      SubTitle: (count: number) => `${count} modèles de prompts`,
      Search: "Rechercher des modèles",
      Create: "Créer",
    },
    Item: {
      Info: (count: number) => `${count} prompts`,
      Chat: "Discussion",
      View: "Vue",
      Edit: "Modifier",
      Delete: "Supprimer",
      DeleteConfirm: "Confirmer la suppression?",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `Modifier le modèle de prompt ${readonly ? "(en lecture seule)" : ""}`,
      Download: "Télécharger",
      Clone: "Dupliquer",
    },
    Config: {
      Avatar: "Avatar de lassistant",
      Name: "Nom de lassistant",
      Sync: {
        Title: "Utiliser la configuration globale",
        SubTitle: "Utiliser la configuration globale dans cette conversation",
        Confirm: "Voulez-vous definir votre configuration personnalisée ?",
      },
      HideContext: {
        Title: "Masquer les invites contextuelles",
        SubTitle: "Ne pas afficher les instructions contextuelles dans le chat",
      },
      Share: {
        Title: "Partager ce masque",
        SubTitle: "Générer un lien vers ce masque",
        Action: "Copier le lien",
      },
    },
  },
  NewChat: {
    Return: "Retour",
    Skip: "Passer",
    Title: "Choisir un assitant",
    SubTitle: "Discutez avec l'âme derrière le masque",
    More: "En savoir plus",
    NotShow: "Ne pas afficher à nouveau",
    ConfirmNoShow:
      "Confirmez-vous vouloir désactiver cela? Vous pouvez le réactiver plus tard dans les paramètres.",
  },

  UI: {
    Confirm: "Confirmer",
    Cancel: "Annuler",
    Close: "Fermer",
    Create: "Créer",
    Edit: "Éditer",
  },
  Exporter: {
    Model: "Modèle",
    Messages: "Messages",
    Topic: "Sujet",
    Time: "Temps",
  },
};

export default fr;
