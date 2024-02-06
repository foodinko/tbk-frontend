import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const jp: PartialLocaleType = {
  WIP: "この機能は開発中です",
  Error: {
    Unauthorized:
      "現在は未承認状態です。左下の設定ボタンをクリックし、アクセスパスワードかOpenAIのAPIキーを入力してください。",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} 通のチャット`,
  },
  Chat: {
    SubTitle: (count: number) => `ChatGPTとの ${count} 通のチャット`,
    Actions: {
      ChatList: "メッセージリストを表示",
      CompressedHistory: "圧縮された履歴プロンプトを表示",
      Export: "チャット履歴をエクスポート",
      Copy: "コピー",
      Stop: "停止",
      Retry: "リトライ",
      Pin: "ピン",
      PinToastContent:
        "コンテキストプロンプトに1つのメッセージをピン留めしました",
      PinToastAction: "表示",
      Delete: "削除",
      Edit: "編集",
    },
    Rename: "チャットの名前を変更",
    Typing: "入力中…",
    Input: (submitKey: string) => {
      var inputHints = `${submitKey} で送信`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += "，Shift + Enter で改行";
      }
      return inputHints + "，/ で自動補完をトリガー";
    },
    InputEnabled: "떡볶이에 대해 무엇이든 물어보세요.",
    InputDisabled: "지금은 입력할 수 없어요.",
    Send: "送信",
    Config: {
      Reset: "リセット",
      SaveAs: "保存",
    },
  },
  Export: {
    Title: "チャット履歴をMarkdown形式でエクスポート",
    Copy: "すべてコピー",
    Download: "ファイルをダウンロード",
    MessageFromYou: "あなたからのメッセージ",
    MessageFromChatGPT: "ChatGPTからのメッセージ",
  },
  Memory: {
    Title: "履歴メモリ",
    EmptyContent: "まだ記憶されていません",
    Send: "メモリを送信",
    Copy: "メモリをコピー",
    Reset: "チャットをリセット",
    ResetConfirm:
      "リセット後、現在のチャット履歴と過去のメモリがクリアされます。リセットしてもよろしいですか？",
  },
  Home: {
    NewChat: "新しいチャット",
    DeleteChat: "選択したチャットを削除してもよろしいですか？",
    DeleteToast: "チャットが削除されました",
    Revert: "元に戻す",
  },
  Settings: {
    Title: "設定",
    SubTitle: "設定オプション",
    Danger: {
      Reset: {
        Title: "設定をリセット",
        SubTitle: "すべての設定項目をデフォルトにリセットします",
        Action: "今すぐリセットする",
        Confirm: "すべての設定項目をリセットしてもよろしいですか？",
      },
      Clear: {
        Title: "データを消去",
        SubTitle: "すべてのチャット履歴と設定を消去します",
        Action: "今すぐ消去する",
        Confirm: "すべてのチャット履歴と設定を消去しますか？",
      },
    },
    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "全ての言語",
    },
    Avatar: "アバター",
    FontSize: {
      Title: "フォントサイズ",
      SubTitle: "チャット内容のフォントサイズ",
    },
    InjectSystemPrompts: {
      Title: "システムプロンプトの挿入",
      SubTitle:
        "各リクエストのメッセージリストの先頭に、ChatGPTのシステムプロンプトを強制的に追加します",
    },
    InputTemplate: {
      Title: "入力の前処理",
      SubTitle: "新規入力がこのテンプレートに埋め込まれます",
    },
    Update: {
      Version: (x: string) => `現在のバージョン：${x}`,
      IsLatest: "最新バージョンです",
      CheckUpdate: "アップデートを確認",
      IsChecking: "アップデートを確認しています...",
      FoundUpdate: (x: string) => `新しいバージョンが見つかりました：${x}`,
      GoToUpdate: "更新する",
    },
    SendKey: "送信キー",
    Theme: "テーマ",
    TightBorder: "ボーダーレスモード",
    SendPreviewBubble: {
      Title: "プレビューバブルの送信",
      SubTitle: "プレビューバブルでマークダウンコンテンツをプレビュー",
    },
    Mask: {
      Splash: {
        Title: "キャラクターページ",
        SubTitle: "新規チャット作成時にキャラクターページを表示する",
      },
    },
    Prompt: {
      Disable: {
        Title: "プロンプトの自動補完を無効にする",
        SubTitle:
          "入力フィールドの先頭に / を入力すると、自動補完がトリガーされます。",
      },
      List: "カスタムプロンプトリスト",
      ListCount: (builtin: number, custom: number) =>
        `組み込み ${builtin} 件、ユーザー定義 ${custom} 件`,
      Edit: "編集",
      Modal: {
        Title: "プロンプトリスト",
        Add: "新規追加",
        Search: "プロンプトワード検索",
      },
      EditModal: {
        Title: "編集",
      },
    },
    HistoryCount: {
      Title: "履歴メッセージ数を添付",
      SubTitle: "リクエストごとに添付する履歴メッセージ数",
    },
    CompressThreshold: {
      Title: "履歴メッセージの長さ圧縮しきい値",
      SubTitle:
        "圧縮されていない履歴メッセージがこの値を超えた場合、圧縮が行われます。",
    },

    Usage: {
      Title: "残高照会",
      SubTitle(used: any, total: any) {
        return `今月は $${used} を使用しました。総額は $${total} です。`;
      },
      IsChecking: "確認中...",
      Check: "再確認",
      NoAccess: "APIキーまたはアクセスパスワードを入力して残高を表示",
    },

    Model: "モデル (model)",
    Temperature: {
      Title: "ランダム性 (temperature)",
      SubTitle:
        "値が大きいほど、回答がランダムになります。1以上の値には文字化けが含まれる可能性があります。",
    },
    MaxTokens: {
      Title: "シングルレスポンス制限 (max_tokens)",
      SubTitle: "1回のインタラクションで使用される最大トークン数",
    },
    PresencePenalty: {
      Title: "トピックの新鮮度 (presence_penalty)",
      SubTitle: "値が大きいほど、新しいトピックへの展開が可能になります。",
    },
    FrequencyPenalty: {
      Title: "話題の頻度 (frequency_penalty)",
      SubTitle: "値が大きいほど、重複語を低減する可能性が高くなります",
    },
  },
  Store: {
    DefaultTopic: "新しいチャット",
    BotHello: "안녕하세요! 떡볶이에 대한 모든 궁금증을 해소시켜 드릴 수 있는 BOKI 보키에요😋",
    BotAskGender: "떡볶이 취향을 파악하기 위해, 당신의 성별이 무엇인지 먼저 알고 싶어요!",
    BotAskName: "그렇군요! 대화에서 불려질 이름도 함께 입력해 주시면, 대화를 시작할 모든 세팅이 마무리 돼요!",
    BotWhatKindTbk: (userName: string) => `${userName}! 안녕! 오늘은 어떤 떡볶이에 대해 얘기해 볼까?`,
    BotEmptyCount: (userName: string) => `${userName}님! 정말 아쉽지만 대화 입력 횟수가 모두 소진되었어요 🥲 마치기 전에, 보키가 맛있는 밀키트를 추천하고 싶어요! 앞으로도 새로운 푸딘코의 밀키트 출시가 예정되어 있으니 우리 곧 다시 만나요~ 👋`,
    BotWelcomeBack: (userName: string) => `다시 돌아왔군요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotWelcomeLongTime: (userName: string) => `오랜만이에요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotSeeYouAgain: "앞으로도 푸딘코의 밀키트 출시가 예정되어 있어요! 우리 곧 다시 만나요",
    BotSmartStoreLink: "[맛쟁이 떡볶이 보러 가기 🍽️](https://smartstore.naver.com/foodinko/products/9626125649?NaPm=ct%3Dls9zhfnc%7Cci%3D0e0be055ca54fa486d66e396ca5b64ac8eccfa64%7Ctr%3Dsls%7Csn%3D8677814%7Chk%3D826a390944f997653521b585cd1d198923a8f7af&utm_source=chatbot&utm_medium=ad-link&utm_campaign=s1-foodinko_chatbot_detail&utm_content=240206_chatbot&utm_term=chatbotlink)",
    Error: "エラーが発生しました。しばらくしてからやり直してください。",
    Prompt: {
      History: (content: string) =>
        "これは、AI とユーザの過去のチャットを要約した前提となるストーリーです：" +
        content,
      Topic:
        "4～5文字でこの文章の簡潔な主題を返してください。説明、句読点、感嘆詞、余分なテキストは無しで。もし主題がない場合は、「おしゃべり」を返してください",
      Summarize:
        "あなたとユーザの会話を簡潔にまとめて、後続のコンテキストプロンプトとして使ってください。200字以内に抑えてください。",
    },
  },
  Copy: {
    Success: "クリップボードに書き込みました",
    Failed: "コピーに失敗しました。クリップボード許可を与えてください。",
  },
  Context: {
    Toast: (x: any) => `キャラクターが ${x} 件設定されました`,
    Edit: "キャラクタープリセットとモデル設定",
    Add: "追加",
  },
  Plugin: { Name: "プラグイン" },
  FineTuned: { Sysmessage: "あなたはアシスタントです" },
  Mask: {
    Name: "キャラクタープリセット",
    Page: {
      Title: "キャラクタープリセット",
      SubTitle: (count: number) => `${count} 件見つかりました。`,
      Search: "検索",
      Create: "新規",
    },
    Item: {
      Info: (count: number) => `包含 ${count} 条预设对话`,
      Chat: "会話",
      View: "詳細",
      Edit: "編集",
      Delete: "削除",
      DeleteConfirm: "本当に削除しますか？",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `キャラクタープリセットを編集 ${readonly ? "（読み取り専用）" : ""}`,
      Download: "ダウンロード",
      Clone: "複製",
    },
    Config: {
      Avatar: "キャラクターのアイコン",
      Name: "キャラクターの名前",
      Sync: {
        Title: "グローバル設定を利用する",
        SubTitle: "このチャットでグローバル設定を利用します。",
        Confirm:
          "カスタム設定を上書きしてグローバル設定を使用します、よろしいですか？",
      },
      HideContext: {
        Title: "キャラクター設定を表示しない",
        SubTitle: "チャット画面でのキャラクター設定を非表示にします。",
      },
    },
  },
  NewChat: {
    Return: "戻る",
    Skip: "スキップ",
    Title: "キャラクター",
    SubTitle: "さあ、AIにキャラクターを設定して会話を始めてみましょう",
    More: "もっと探す",
    NotShow: "今後は表示しない",
    ConfirmNoShow: "いつでも設定から有効化できます。",
  },

  UI: {
    Confirm: "確認",
    Cancel: "キャンセル",
    Close: "閉じる",
    Create: "新規",
    Edit: "編集",
  },
  Exporter: {
    Model: "モデル",
    Messages: "メッセージ",
    Topic: "トピック",
    Time: "時間",
  },
};

export default jp;
