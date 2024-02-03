import { SubmitKey } from "../store/config";
import { PartialLocaleType } from "./index";

const id: PartialLocaleType = {
  WIP: "Coming Soon...",
  Error: {
    Unauthorized:
      "Akses tidak diizinkan, silakan masukkan kode akses atau masukkan kunci API OpenAI Anda. di halaman [autentikasi](/#/auth) atau di halaman [Pengaturan](/#/settings).",
  },
  Auth: {
    Title: "Diperlukan Kode Akses",
    Tips: "Masukkan kode akses di bawah",
    SubTips: "Atau masukkan kunci API OpenAI Anda",
    Input: "Kode Akses",
    Confirm: "Konfirmasi",
    Later: "Nanti",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} pesan`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} pesan`,
    Actions: {
      ChatList: "Buka Daftar Chat",
      CompressedHistory: "Ekspor Riwayat Terkompresi",
      Export: "Ekspor Semua Pesan sebagai Markdown",
      Copy: "Salin",
      Stop: "Berhenti",
      Retry: "Coba Lagi",
      Pin: "Pin",
      PinToastContent: "2 pesan telah ditandai",
      PinToastAction: "Lihat",
      Delete: "Hapus",
      Edit: "Edit",
    },
    Commands: {
      new: "Mulai Chat Baru",
      newm: "Mulai Chat Baru dengan Masks",
      next: "Chat Selanjutnya",
      prev: "Chat Sebelumnya",
      clear: "Bersihkan Percakapan",
      del: "Hapus Chat",
    },
    InputActions: {
      Stop: "Berhenti",
      ToBottom: "Ke Bagian Bawah",
      Theme: {
        auto: "Otomatis",
        light: "Tema Terang",
        dark: "Tema Gelap",
      },
      Prompt: "Prompts",
      Masks: "Masks",
      Clear: "Bersihkan Percakapan",
      Settings: "Pengaturan",
    },
    Rename: "Ubah Nama Chat",
    Typing: "Mengetik...",
    Input: (submitKey: string) => {
      var inputHints = `${submitKey} untuk mengirim`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", Shift + Enter untuk membalut";
      }
      return (
        inputHints + ", / untuk mencari prompt, : untuk menggunakan perintah"
      );
    },
    InputEnabled: "떡볶이에 대해 무엇이든 물어보세요.",
    InputDisabled: "지금은 입력할 수 없어요.",    
    Send: "Kirim",
    Config: {
      Reset: "Reset ke Default",
      SaveAs: "Simpan sebagai Masks",
    },
  },
  Export: {
    Title: "Ekspor Pesan",
    Copy: "Salin Semua",
    Download: "Unduh",
    MessageFromYou: "Pesan dari Anda",
    MessageFromChatGPT: "Pesan dari ChatGPT",
    Share: "Bagikan ke ShareGPT",
    Format: {
      Title: "Format Ekspor",
      SubTitle: "Markdown atau Gambar PNG",
    },
    IncludeContext: {
      Title: "Sertakan Konteks",
      SubTitle: "Apakah akan menyertakan masks",
    },
    Steps: {
      Select: "Pilih",
      Preview: "Pratinjau",
    },
  },
  Select: {
    Search: "Cari",
    All: "Pilih Semua",
    Latest: "Pilih Terbaru",
    Clear: "Bersihkan",
  },
  Memory: {
    Title: "Prompt Memori",
    EmptyContent: "Belum ada yang tersedia.",
    Send: "Kirim Memori",
    Copy: "Salin Memori",
    Reset: "Reset",
    ResetConfirm:
      "Jika Anda mereset, riwayat obrolan saat ini dan memori historis akan dihapus. Apakah Anda yakin ingin melakukan reset?",
  },
  Home: {
    NewChat: "Obrolan Baru",
    DeleteChat: "Anda yakin ingin menghapus percakapan yang dipilih?",
    DeleteToast: "Percakapan telah dihapus",
    Revert: "Kembali",
  },
  Settings: {
    Title: "Pengaturan",
    SubTitle: "Semua Pengaturan",
    Danger: {
      Reset: {
        Title: "Setel Ulang Semua Pengaturan",
        SubTitle: "Mengembalikan semua pengaturan ke nilai default",
        Action: "Setel Ulang",
        Confirm:
          "Anda yakin ingin mengembalikan semua pengaturan ke nilai default?",
      },
      Clear: {
        Title: "Hapus Semua Data",
        SubTitle: "Semua data yang tersimpan secara lokal akan dihapus",
        Action: "Hapus",
        Confirm:
          "Apakah Anda yakin ingin menghapus semua data yang tersimpan secara lokal?",
      },
    },
    Lang: {
      Name: "Bahasa", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "Semua Bahasa",
    },
    Avatar: "Avatar",
    FontSize: {
      Title: "Ukuran Font",
      SubTitle: "Ubah ukuran font konten chat",
    },
    InjectSystemPrompts: {
      Title: "Suntikkan Petunjuk Sistem",
      SubTitle:
        "Tambahkan petunjuk simulasi sistem ChatGPT di awal daftar pesan yang diminta dalam setiap permintaan",
    },
    InputTemplate: {
      Title: "Template Input",
      SubTitle: "Pesan baru akan diisi menggunakan template ini",
    },

    Update: {
      Version: (x: string) => `Version: ${x}`,
      IsLatest: "Versi terbaru",
      CheckUpdate: "Periksa Pembaruan",
      IsChecking: "Memeriksa pembaruan...",
      FoundUpdate: (x: string) => `Versi terbaru ditemukan: ${x}`,
      GoToUpdate: "Perbarui Sekarang",
    },
    AutoGenerateTitle: {
      Title: "Hasilkan Judul Otomatis",
      SubTitle: "Hasilkan judul yang sesuai berdasarkan konten percakapan",
    },
    Sync: {
      CloudState: "Pembaruan Terakhir",
      NotSyncYet: "Belum disinkronkan",
      Success: "Sinkronisasi Berhasil",
      Fail: "Sinkronisasi Gagal",

      Config: {
        Modal: {
          Title: "Konfigurasi Sinkronisasi",
        },
        SyncType: {
          Title: "Tipe Sinkronisasi",
          SubTitle: "Pilih layanan sinkronisasi favorit Anda",
        },
        Proxy: {
          Title: "Aktifkan Proxy CORS",
          SubTitle:
            "Aktifkan Proxy untuk menghindari pembatasan atau pemblokiran lintas sumber",
        },
        ProxyUrl: {
          Title: "Lokasi Titik Akhir Proxy CORS",
          SubTitle: "Hanya berlaku untuk Proxy CORS bawaan untuk proyek ini",
        },

        WebDav: {
          Endpoint: "Lokasi Titik Akhir WebDAV",
          UserName: "User Pengguna",
          Password: "Kata Sandi",
        },
      },
    },
    SendKey: "Kirim",
    Theme: "Tema",
    TightBorder: "Batas Ketat",
    SendPreviewBubble: {
      Title: "Pratinjau Obrolan",
      SubTitle: "Pratinjau Obrolan dengan markdown",
    },
    Mask: {
      Splash: {
        Title: "Layar Pembuka Masks",
        SubTitle:
          "Tampilkan layar pembuka masks sebelum memulai percakapan baru",
      },
      Builtin: {
        Title: "Sembunyikan Masks Bawaan",
        SubTitle: "Sembunyikan Masks bawaan dari daftar masks",
      },
    },
    Prompt: {
      Disable: {
        Title: "Nonaktifkan Otomatisasi",
        SubTitle: "Aktifkan/Matikan otomatisasi",
      },
      List: "Daftar Prompt",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} bawaan, ${custom} penggunaan khusus`,
      Edit: "Edit",
      Modal: {
        Title: "Daftar Prompt",
        Add: "Tambahkan",
        Search: "Cari Prompt",
      },
      EditModal: {
        Title: "Edit Prompt",
      },
    },
    HistoryCount: {
      Title: "Jumlah Pesan Riwayat",
      SubTitle: "Jumlah pesan yang akan dikirim setiap permintaan",
    },
    CompressThreshold: {
      Title: "Batas Kompresi Riwayat",
      SubTitle:
        "Jika panjang pesan melebihi batas yang ditentukan, pesan tersebut akan dikompresi",
    },

    Usage: {
      Title: "Saldo Akun",
      SubTitle(used: any, total: any) {
        return `Digunakan bulan ini: ${used}, total langganan: ${total}`;
      },
      IsChecking: "Memeriksa...",
      Check: "Periksa",
      NoAccess: "Masukkan kunci API untuk memeriksa saldo",
    },

    Model: "Model",
    Temperature: {
      Title: "Suhu",
      SubTitle: "Semakin tinggi nilainya, semakin acak keluarannya",
    },
    TopP: {
      Title: "Top P",
      SubTitle: "Tidak mengubah nilai dengan suhu",
    },
    MaxTokens: {
      Title: "Token Maksimum",
      SubTitle: "Panjang maksimum token input dan output",
    },
    PresencePenalty: {
      Title: "Penalti Kehadiran",
      SubTitle: "Semakin tinggi nilai, semakin mungkin topik baru muncul",
    },
    FrequencyPenalty: {
      Title: "Penalti Frekuensi",
      SubTitle:
        "Semakin tinggi nilai, semakin rendah kemungkinan penggunaan ulang baris yang sama",
    },
  },
  Store: {
    DefaultTopic: "Percakapan Baru",
    BotHello: "안녕하세요! 떡볶이에 대한 모든 궁금증을 해소시켜 드릴 수 있는 BOKI 보키에요😋",
    BotAskGender: "떡볶이 취향을 파악하기 위해, 당신의 성별이 무엇인지 먼저 알고 싶어요!",
    BotAskName: "그렇군요! 대화에서 불려질 이름도 함께 입력해 주시면, 대화를 시작할 모든 세팅이 마무리 돼요!",
    BotWhatKindTbk: (userName: string) => `${userName}! 안녕! 오늘은 어떤 떡볶이에 대해 얘기해 볼까?`,
    BotEmptyCount: (userName: string) => `${userName}님! 정말 아쉽지만 대화 횟수가 모두 소진되었어요🥲 떠나기 전에, 보키가 맛있는 밀키트 하나 추천해 드릴까요?`,
    BotWelcomeBack: (userName: string) => `다시 돌아왔군요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotWelcomeLongTime: (userName: string) => `오랜만이에요, ${userName}님! 보키랑 재밌는 대화해요😁`,
    BotSeeYouAgain: "앞으로도 푸딘코의 밀키트 출시가 예정되어 있어요! 우리 곧 다시 만나요",
    BotSmartStoreLink: "[맛쟁이 떡볶이 보러 가기](https://smartstore.naver.com/foodinko/products/9626125649?NaPm=ct%3Dlrx5dgl4%7Cci%3D57f9d867e6e279bbb28dd69d17e87e547804a467%7Ctr%3Dsls%7Csn%3D8677814%7Chk%3D40c55d087b779f781e6c3a276250bf8688b10d4a)",
    Error: "Terjadi kesalahan, silakan coba lagi nanti.",
    Prompt: {
      History: (content: string) =>
        "Ini adalah ringkasan singkat dari riwayat percakapan: " + content,
      Topic:
        "Buat judul berisi empat hingga lima kata untuk percakapan kita yang tidak akan disertakan dalam ringkasan percakapan, seperti instruksi, format, kutipan, tanda baca awal, tanda kutip pendahuluan, atau karakter tambahan. Silakan coba dengan kutipan berakhir.",
      Summarize:
        "Buat ringkasan percakapan dalam 200 kata yang akan digunakan sebagai promp di masa depan.",
    },
  },
  Copy: {
    Success: "Tersalin ke clipboard",
    Failed:
      "Gagal menyalin, mohon berikan izin untuk mengakses clipboard atau Clipboard API tidak didukung (Tauri)",
  },
  Download: {
    Success: "Konten berhasil diunduh ke direktori Anda.",
    Failed: "Unduhan gagal.",
  },
  Context: {
    Toast: (x: any) => `Dengan ${x} promp kontekstual`,
    Edit: "Pengaturan Obrolan Saat Ini",
    Add: "Tambahkan Promp",
    Clear: "Bersihkan Konteks",
    Revert: "Kembali ke Posisi Sebelumnya",
  },
  Plugin: {
    Name: "Plugin",
  },
  FineTuned: {
    Sysmessage: "Anda adalah asisten yang",
  },
  Mask: {
    Name: "Masks",
    Page: {
      Title: "Template Promp",
      SubTitle: (count: number) => `${count} template prompt`,
      Search: "Cari template",
      Create: "Buat",
    },
    Item: {
      Info: (count: number) => `${count} prompt`,
      Chat: "Obrolan",
      View: "Lihat",
      Edit: "Edit",
      Delete: "Hapus",
      DeleteConfirm: "Anda yakin ingin menghapus?",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `Edit Template Prompt ${readonly ? "(hanya baca)" : ""}`,
      Download: "Unduh",
      Clone: "Duplikat",
    },
    Config: {
      Avatar: "Avatar Bot",
      Name: "Nama Bot",
      Sync: {
        Title: "Gunakan Konfigurasi Global",
        SubTitle: "Gunakan konfigurasi global dalam percakapan ini",
        Confirm:
          "Pastikan untuk mengganti konfigurasi kustom dengan konfigurasi global?",
      },
      HideContext: {
        Title: "Sembunyikan Prompt Konteks",
        SubTitle: "Tidak menampilkan prompt konteks dalam obrolan",
      },
      Share: {
        Title: "Bagikan Masks Ini",
        SubTitle: "Buat tautan untuk masks ini",
        Action: "Salin Tautan",
      },
    },
  },
  NewChat: {
    Return: "Kembali",
    Skip: "Lewati",
    Title: "Pilih Masks",
    SubTitle: "Berkonversasilah dengan diri Anda di balik masks",
    More: "Lebih Lanjut",
    NotShow: "Jangan Tampilkan Sekarang",
    ConfirmNoShow:
      "Pastikan untuk menonaktifkannya? Anda dapat mengaktifkannya nanti melalui pengaturan.",
  },

  UI: {
    Confirm: "Konfirmasi",
    Cancel: "Batal",
    Close: "Tutup",
    Create: "Buat",
    Edit: "Edit",
  },
  Exporter: {
    Description: {
      Title: "Hanya pesan setelah menghapus konteks yang akan ditampilkan",
    },
    Model: "Model",
    Messages: "Pesan",
    Topic: "Topik",
    Time: "Tanggal & Waktu",
  },
  URLCommand: {
    Code: "Kode akses terdeteksi dari url, konfirmasi untuk mendaftar ? ",
    Settings: "Pengaturan terdeteksi dari url, konfirmasi untuk diterapkan ?",
  },
};

export default id;
