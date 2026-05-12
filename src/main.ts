import './index.css';
import { createIcons, icons } from 'lucide';
import QRCode from 'qrcode';

// --- Types & Constants ---
type Language = 'en' | 'id' | 'ja' | 'ko' | 'es' | 'fr' | 'de' | 'zh-cn' | 'zh-tw' | 'pt' | 'ar' | 'hi' | 'ru' | 'tr' | 'it' | 'th' | 'vi';

const TRANSLATIONS: Record<Language, any> = {
  en: {
    title: 'AURA',
    subtitle: 'Elite Performance Assessment',
    createTitle: 'Create a Quiz',
    createDesc: 'Design a bespoke assessment mission.',
    joinTitle: 'Join a Quiz',
    joinDesc: 'Enter a Token or Quiz ID to access.',
    startBtn: 'Initialize Assessment',
    createBtn: 'Design Mission',
    joinBtn: 'Access Nexus',
    backBtn: 'Back to Command',
    nameLabel: 'Full Name',
    emailLabel: 'Email Address',
    tokenLabel: 'Mission Token / ID',
    quizTitleLabel: 'Quiz Title',
    categoryLabel: 'Category',
    timerLabel: 'Time Limit',
    addQuestionBtn: 'Add Question',
    publishBtn: 'Publish Quiz',
    finishBtn: 'Final Commit',
    nextBtn: 'Next Step',
    prevBtn: 'Previous',
    scoreLabel: 'Final Score',
    accuracyLabel: 'Accuracy',
    successMsg: 'Mission Success',
    failMsg: 'Analysis Complete',
    returnBtn: 'Return to Command',
    sheetUrlLabel: 'Google Sheets Integration URL (Optional)',
    langLabel: 'Region / Language',
    settingsTitle: 'Nexus Settings',
    saveSettingsBtn: 'Save Configuration',
    themeLabel: 'Interface Theme',
    durationModeLabel: 'Timing Logic',
    unlimitedTime: 'Unlimited Exploration',
    fixedTime: 'Timed Mission',
    deadlineStart: 'Activation Window (Start)',
    deadlineEnd: 'Deactivation Point (End)',
    attachMedia: 'Attach Intelligence',
    matchingLeft: 'Left Vector',
    matchingRight: 'Right Vector',
    matchingAdd: 'Add Pairing',
    required: 'Required',
    upcomingStatus: 'Mission Pending',
    activeStatus: 'Mission Live',
    closedStatus: 'Mission Terminated',
    accessDenied: 'Access Denied: Redacted Mission.',
    quizNotStarted: 'Mission not yet active.',
    quizEnded: 'Mission window closed.',
    uiSettings: 'UI Configuration',
    laptopMode: 'Laptop View',
    mobileMode: 'Mobile View',
    scoringSettings: 'Scoring Logic',
    pointSystem: 'Point System (Total Sum)',
    scoreSystem: 'Score System (1 per Q)',
    weightedSystem: 'Weighted (Per Sector)',
    weightLabel: 'Sector Weight',
    adaptiveMode: 'Adaptive (Auto)',
    dataSettings: 'Data Intelligence',
    exportToSheets: 'Enable Sync to Google Cloud',
    pointsLabel: 'Point Value',
    shareTitle: 'Mission Nexus Shared',
    shareSubtitle: 'Broadcast your assessment protocol',
    copyLink: 'Copy Direct Link',
    copyCode: 'Copy Code',
    downloadQR: 'Download QR Intelligence',
    linkCopied: 'Direct Link Secured',
    codeCopied: 'Mission Code Secured',
    shareDescription: 'Direct your operatives to this Nexus point.',
    lobbyTitle: 'Waiting Lobby',
    lobbySubtitle: 'Waiting for Host to initialize protocol...',
    playersJoined: 'Operatives Joined',
    startManual: 'Manual Launch',
    startScheduled: 'Time-Locked Launch',
    startAuto: 'Auto-Trigger Launch',
    modePractice: 'Practice Mode',
    modeLive: 'Live Session',
    modeExam: 'Exam Mode',
    modeNormal: 'Normal Quiz (Recommended)',
    modeNormalDesc: 'Self-paced, join anytime',
    modeLiveTitle: 'Online Live Quiz (Advanced)',
    modeLiveDesc: 'Synchronized, lobby system',
    modePlastin: 'PLASTIN — Board Game (Beta)',
    modePlastinDesc: 'Real-time interactive board games',
    plastinBoard: 'Game Board',
    plastinTiles: 'Interactive Tiles',
    plastinVoice: 'Voice Comms',
    plastinStart: 'Initialize Game',
    difficultyEasy: 'Easy',
    difficultyMedium: 'Medium',
    difficultyHard: 'Hard',
    difficultySuperHard: 'Super Hard',
    difficultyLabel: 'Threat Level',
  },
  id: {
    title: 'AURA',
    subtitle: 'Penilaian Performa Elit',
    createTitle: 'Buat Kuis',
    createDesc: 'Rancang misi penilaian khusus.',
    joinTitle: 'Ikuti Kuis',
    joinDesc: 'Masukkan Token atau ID Kuis.',
    startBtn: 'Inisialisasi Penilaian',
    createBtn: 'Rancang Misi',
    joinBtn: 'Akses Nexus',
    backBtn: 'Kembali ke Komando',
    nameLabel: 'Nama Lengkap',
    emailLabel: 'Alamat Email',
    tokenLabel: 'Token / ID Misi',
    quizTitleLabel: 'Judul Kuis',
    categoryLabel: 'Kategori',
    timerLabel: 'Batas Waktu',
    addQuestionBtn: 'Tambah Pertanyaan',
    publishBtn: 'Terbitkan Kuis',
    finishBtn: 'Komit Akhir',
    nextBtn: 'Langkah Selanjutnya',
    prevBtn: 'Sebelumnya',
    scoreLabel: 'Skor Akhir',
    accuracyLabel: 'Akurasi',
    successMsg: 'Misi Berhasil',
    failMsg: 'Analisis Selesai',
    returnBtn: 'Kembali ke Komando',
    sheetUrlLabel: 'URL Integrasi Google Sheets (Opsional)',
    langLabel: 'Wilayah / Bahasa',
    settingsTitle: 'Pengaturan Nexus',
    saveSettingsBtn: 'Simpan Konfigurasi',
    themeLabel: 'Tema Antarmuka',
    durationModeLabel: 'Logika Waktu',
    unlimitedTime: 'Eksplorasi Tanpa Batas',
    fixedTime: 'Misi Berwaktu',
    deadlineStart: 'Jendela Aktivasi (Mulai)',
    deadlineEnd: 'Titik Deaktivasi (Selesai)',
    attachMedia: 'Lampirkan Intelijen',
    matchingLeft: 'Vektor Kiri',
    matchingRight: 'Vektor Kanan',
    matchingAdd: 'Tambah Pasangan',
    required: 'Wajib',
    upcomingStatus: 'Misi Tertunda',
    activeStatus: 'Misi Sedang Berlangsung',
    closedStatus: 'Misi Dihentikan',
    accessDenied: 'Akses Ditolak: Misi Dirahasiakan.',
    quizNotStarted: 'Misi belum aktif.',
    quizEnded: 'Jendela misi telah ditutup.',
    lobbyTitle: 'Ruang Tunggu',
    lobbySubtitle: 'Menunggu Host untuk memulai protokol...',
    playersJoined: 'Operatif Bergabung',
    modeNormal: 'Kuis Normal (Direkomendasikan)',
    modeNormalDesc: 'Kecepatan mandiri, bergabung kapan saja',
    modeLiveTitle: 'Kuis Live Online (Lanjutan)',
    modeLiveDesc: 'Sinkronisasi, sistem lobi',
    difficultyEasy: 'Mudah',
    difficultyMedium: 'Menengah',
    difficultyHard: 'Sulit',
    difficultySuperHard: 'Sangat Sulit',
  },
  ja: {
    title: 'AURA',
    subtitle: 'エリートパフォーマンス評価',
    createTitle: 'クイズを作成',
    createDesc: 'オーダーメイドの評価ミッションを設計。',
    joinTitle: 'クイズに参加',
    joinDesc: 'トークンを入力して安全なクイズにアクセス。',
    startBtn: '評価を初期化',
    createBtn: 'ミッションを設計',
    joinBtn: 'ネクサスにアクセス',
    backBtn: 'コマンドに戻る',
    nameLabel: 'フルネーム',
    emailLabel: 'メールアドレス',
    tokenLabel: 'ジョイントークン',
    quizTitleLabel: 'クイズのタイトル',
    categoryLabel: 'カテゴリー',
    timerLabel: '制限時間（秒）',
    addQuestionBtn: '質問を追加',
    publishBtn: 'クイズを公開',
    finishBtn: '最終確定',
    nextBtn: '次のステップ',
    prevBtn: '前へ',
    scoreLabel: '最終スコア',
    accuracyLabel: '精度',
    successMsg: 'ミッション成功',
    failMsg: '分析完了',
    returnBtn: 'コマンドに戻る',
    sheetUrlLabel: 'Googleスプレッドシート統合URL（任意）',
    langLabel: '地域 / 言語',
    settingsTitle: 'ネクサス設定',
    saveSettingsBtn: '設定を保存',
    themeLabel: 'テーマ',
    difficultyEasy: '簡単',
    difficultyMedium: '普通',
    difficultyHard: '難しい',
    difficultySuperHard: '非常に難しい',
  },
  ko: {
    title: 'AURA',
    subtitle: '엘리트 퍼포먼스 평가',
    createTitle: '퀴즈 만들기',
    createDesc: '맞춤형 평가 미션을 설계하세요.',
    joinTitle: '퀴즈 참여하기',
    joinDesc: '보안 퀴즈에 액세스하려면 토큰을 입력하세요.',
    startBtn: '평가 초기화',
    createBtn: '미션 설계',
    joinBtn: '넥서스 액세스',
    backBtn: '명령으로 돌아가기',
    nameLabel: '성함',
    emailLabel: '이메일 주소',
    tokenLabel: '참여 토큰',
    quizTitleLabel: '퀴즈 제목',
    categoryLabel: '카테고리',
    timerLabel: '시간 제한 (초)',
    addQuestionBtn: '질문 추가',
    publishBtn: '퀴즈 게시',
    finishBtn: '최종 제출',
    nextBtn: '다음 단계',
    prevBtn: '이전',
    scoreLabel: '최종 점수',
    accuracyLabel: '정확도',
    successMsg: '미션 성공',
    failMsg: '분석 완료',
    returnBtn: '명령으로 돌아가기',
    sheetUrlLabel: 'Google 스프레드시트 연동 URL (선택)',
    langLabel: '지역 / 언어',
    settingsTitle: '넥서스 설정',
    saveSettingsBtn: '설정 저장',
    themeLabel: '인터페이스 테마',
    difficultyEasy: '쉬움',
    difficultyMedium: '중간',
    difficultyHard: '어려움',
    difficultySuperHard: '매우 어려움',
  },
  es: {
    title: 'AURA',
    subtitle: 'Evaluación de Rendimiento de Élite',
    createTitle: 'Crear un Cuestionario',
    createDesc: 'Diseña una misión de evaluación a medida.',
    joinTitle: 'Unirse a un Cuestionario',
    joinDesc: 'Ingresa un token para acceder a un cuestionario seguro.',
    startBtn: 'Inicializar Evaluación',
    createBtn: 'Diseñar Misión',
    joinBtn: 'Acceder al Nexus',
    backBtn: 'Volver al Mando',
    nameLabel: 'Nombre Completo',
    emailLabel: 'Correo Electrónico',
    tokenLabel: 'Token de Unión',
    quizTitleLabel: 'Título del Cuestionario',
    categoryLabel: 'Categoría',
    timerLabel: 'Límite de Tiempo (Segundos)',
    addQuestionBtn: 'Añadir Pregunta',
    publishBtn: 'Publicar Cuestionario',
    finishBtn: 'Compromiso Final',
    nextBtn: 'Siguiente Paso',
    prevBtn: 'Anterior',
    scoreLabel: 'Puntuación Final',
    accuracyLabel: 'Precisión',
    successMsg: 'Misión Lograda',
    failMsg: 'Análisis Completo',
    returnBtn: 'Volver al Mando',
    sheetUrlLabel: 'URL de Integración de Google Sheets (Opcional)',
    langLabel: 'Región / Idioma',
    settingsTitle: 'Configuración de Nexus',
    saveSettingsBtn: 'Guardar Configuración',
    themeLabel: 'Tema de la Interfaz',
    difficultyEasy: 'Fácil',
    difficultyMedium: 'Medio',
    difficultyHard: 'Difícil',
    difficultySuperHard: 'Súper Difícil',
  },
  fr: {
    title: 'AURA',
    subtitle: 'Évaluation de Performance d\'Élite',
    createTitle: 'Créer un Quiz',
    createDesc: 'Concevez une mission d\'évaluation sur mesure.',
    joinTitle: 'Rejoindre un Quiz',
    joinDesc: 'Entrez un jeton pour accéder à un quiz sécurisé.',
    startBtn: 'Initialiser l\'Évaluation',
    createBtn: 'Concevoir la Mission',
    joinBtn: 'Accéder au Nexus',
    backBtn: 'Retour au Commandement',
    nameLabel: 'Nom Complet',
    emailLabel: 'Adresse E-mail',
    tokenLabel: 'Jeton de Participation',
    quizTitleLabel: 'Titre du Quiz',
    categoryLabel: 'Catégorie',
    timerLabel: 'Limite de Temps (Secondes)',
    addQuestionBtn: 'Ajouter une Question',
    publishBtn: 'Publier le Quiz',
    finishBtn: 'Engagement Final',
    nextBtn: 'Étape Suivante',
    prevBtn: 'Précédent',
    scoreLabel: 'Score Final',
    accuracyLabel: 'Précision',
    successMsg: 'Mission Réussie',
    failMsg: 'Analyse Terminée',
    returnBtn: 'Retour au Commandement',
    sheetUrlLabel: 'URL d\'intégration Google Sheets (Optionnel)',
    langLabel: 'Région / Langue',
    settingsTitle: 'Paramètres Nexus',
    saveSettingsBtn: 'Sauvegarder Configuration',
    themeLabel: 'Thème d\'Interface',
    difficultyEasy: 'Facile',
    difficultyMedium: 'Moyen',
    difficultyHard: 'Difficile',
    difficultySuperHard: 'Super Difficile',
  },
  de: {
    title: 'AURA',
    subtitle: 'Elite Performance-Bewertung',
    createTitle: 'Quiz erstellen',
    createDesc: 'Entwickeln Sie eine maßgeschneiderte Bewertungsmisssion.',
    joinTitle: 'Quiz beitreten',
    joinDesc: 'Geben Sie einen Token ein, um auf ein gesichertes Quiz zuzugreifen.',
    startBtn: 'Bewertung initialisieren',
    createBtn: 'Mission entwerfen',
    joinBtn: 'Nexus betreten',
    backBtn: 'Zurück zum Kommando',
    nameLabel: 'Vollständiger Name',
    emailLabel: 'E-Mail-Adresse',
    tokenLabel: 'Beitritts-Token',
    quizTitleLabel: 'Quiz-Titel',
    categoryLabel: 'Kategorie',
    timerLabel: 'Zeitlimit (Sekunden)',
    addQuestionBtn: 'Frage hinzufügen',
    publishBtn: 'Quiz veröffentlichen',
    finishBtn: 'Abschluss',
    nextBtn: 'Nächster Schritt',
    prevBtn: 'Zurück',
    scoreLabel: 'Endpunktzahl',
    accuracyLabel: 'Genauigkeit',
    successMsg: 'Mission erfolgreich',
    failMsg: 'Analyse abgeschlossen',
    returnBtn: 'Zurück zum Kommando',
    sheetUrlLabel: 'Google Sheets Integrations-URL (Optional)',
    langLabel: 'Region / Sprache',
    settingsTitle: 'Nexus-Einstellungen',
    saveSettingsBtn: 'Konfiguration speichern',
    themeLabel: 'Oberflächen-Design',
    weightLabel: 'Gewichtung',
    adaptiveMode: 'Adaptiv (Auto)',
    difficultyEasy: 'Leicht',
    difficultyMedium: 'Mittel',
    difficultyHard: 'Schwer',
    difficultySuperHard: 'Sehr Schwer',
  },
  'zh-cn': {
    title: 'AURA',
    subtitle: '精英绩效评估',
    createTitle: '创建测验',
    createDesc: '设计定制评估任务。',
    joinTitle: '参加测验',
    joinDesc: '输入令牌或测验ID进行访问。',
    startBtn: '初始化评估',
    createBtn: '设计任务',
    joinBtn: '访问 Nexus',
    backBtn: '返回命令',
    weightLabel: '权重',
    adaptiveMode: '自适应',
    difficultyEasy: '简单',
    difficultyMedium: '中等',
    difficultyHard: '困难',
    difficultySuperHard: '极难',
  },
  'zh-tw': {
    title: 'AURA',
    subtitle: '精英績效評估',
    createTitle: '創建測驗',
    createDesc: '設計定制評估任務。',
    joinTitle: '參加測驗',
    joinDesc: '輸入令牌或測驗ID進行訪問。',
    startBtn: '初始化評估',
    createBtn: '設計任務',
    joinBtn: '訪問 Nexus',
    backBtn: '返回命令',
    weightLabel: '權重',
    adaptiveMode: '自適應',
    difficultyEasy: '簡單',
    difficultyMedium: '中等',
    difficultyHard: '困難',
    difficultySuperHard: '極難',
  },
  pt: {
    title: 'AURA',
    subtitle: 'Avaliação de Desempenho de Elite',
    createTitle: 'Criar Questionário',
    joinTitle: 'Participar de Questionário',
    startBtn: 'Iniciar Avaliação',
    weightLabel: 'Peso',
    adaptiveMode: 'Adaptativo',
    difficultyEasy: 'Fácil',
    difficultyMedium: 'Médio',
    difficultyHard: 'Difícil',
    difficultySuperHard: 'Super Difícil',
  },
  ar: {
    title: 'أورا',
    subtitle: 'تقييم الأداء المتميز',
    createTitle: 'إنشاء اختبار',
    joinTitle: 'الانضمام إلى اختبار',
    startBtn: 'بدء التقييم',
    weightLabel: 'الوزن',
    adaptiveMode: 'تكييفي',
    difficultyEasy: 'سهل',
    difficultyMedium: 'متوسط',
    difficultyHard: 'صعب',
    difficultySuperHard: 'صعب جداً',
  },
  hi: {
    title: 'AURA',
    subtitle: 'कुलीन प्रदर्शन मूल्यांकन',
    createTitle: 'क्विज़ बनाएँ',
    joinTitle: 'क्विज़ में शामिल हों',
    startBtn: 'मूल्यांकन शुरू करें',
    weightLabel: 'भार',
    adaptiveMode: 'अनुकूली',
    difficultyEasy: 'आसान',
    difficultyMedium: 'मध्यम',
    difficultyHard: 'कठिन',
    difficultySuperHard: 'अत्यधिक कठिन',
  },
  ru: {
    title: 'AURA',
    subtitle: 'Элитная оценка производительности',
    createTitle: 'Создать тест',
    joinTitle: 'Присоединиться к тесту',
    startBtn: 'Начать оценку',
    weightLabel: 'Вес',
    adaptiveMode: 'Адаптивный',
    difficultyEasy: 'Легко',
    difficultyMedium: 'Средне',
    difficultyHard: 'Сложно',
    difficultySuperHard: 'Очень сложно',
  },
  tr: {
    title: 'AURA',
    subtitle: 'Seçkin Performans Değerlendirmesi',
    createTitle: 'Sınav Oluştur',
    joinTitle: 'Sınava Katıl',
    startBtn: 'Değerlendirmeyi Başlat',
    weightLabel: 'Ağırlık',
    adaptiveMode: 'Uyarlanabilir',
    difficultyEasy: 'Kolay',
    difficultyMedium: 'Orta',
    difficultyHard: 'Zor',
    difficultySuperHard: 'Çok Zor',
  },
  it: {
    title: 'AURA',
    subtitle: 'Valutazione delle Prestazioni Elite',
    createTitle: 'Crea Quiz',
    joinTitle: 'Partecipa al Quiz',
    startBtn: 'Inizializza Valutazione',
    weightLabel: 'Peso',
    adaptiveMode: 'Adattivo',
    difficultyEasy: 'Facile',
    difficultyMedium: 'Medio',
    difficultyHard: 'Difficile',
    difficultySuperHard: 'Super Difficile',
  },
  th: {
    title: 'AURA',
    subtitle: 'การประเมินผลการปฏิบัติงานระดับสูง',
    createTitle: 'สร้างแบบทดสอบ',
    joinTitle: 'เข้าร่วมแบบทดสอบ',
    startBtn: 'เริ่มการประเมิน',
    weightLabel: 'ค่าน้ำหนัก',
    adaptiveMode: 'ปรับตัว',
    difficultyEasy: 'ง่าย',
    difficultyMedium: 'ปานกลาง',
    difficultyHard: 'ยาก',
    difficultySuperHard: 'ยากมาก',
  },
  vi: {
    title: 'AURA',
    subtitle: 'Đánh giá hiệu suất ưu tú',
    createTitle: 'Tạo bài kiểm tra',
    joinTitle: 'Tham gia bài kiểm tra',
    startBtn: 'Bắt đầu đánh giá',
    weightLabel: 'Trọng số',
    adaptiveMode: 'Thích ứng',
    difficultyEasy: 'Dễ',
    difficultyMedium: 'Vừa',
    difficultyHard: 'Khó',
    difficultySuperHard: 'Rất Khó',
  }
};

interface Attachment {
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  name: string;
}

interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

type QuestionDifficulty = 'easy' | 'medium' | 'hard' | 'super-hard';

interface Question {
  id: string;
  type: 'mcq' | 'checkbox' | 'short' | 'paragraph' | 'math' | 'matching';
  text: string;
  options?: string[];
  matchingPairs?: MatchingPair[];
  correctAnswer: any;
  attachments: Attachment[];
  isRequired: boolean;
  points: number;
  weight: number;
  difficulty: QuestionDifficulty;
}

type PlastinAction = 'move' | 'skip' | 'draw' | 'penalty' | 'bonus' | 'none';

interface PlastinTile {
  id: string;
  x: number;
  y: number;
  action: PlastinAction;
  value: any;
  label: string;
}

interface PlastinConfig {
  boardImage: string | null;
  tiles: PlastinTile[];
  voiceEnabled: boolean;
  gameType: 'card' | 'monopoly' | 'custom';
  winCondition: string;
}

interface Quiz {
  id: string;
  type: 'quiz' | 'plastin';
  token: string;
  title: string;
  description: string;
  category: string;
  durationMode: 'fixed' | 'unlimited';
  timeLimit: number;
  uiMode: 'laptop' | 'mobile' | 'adaptive';
  scoringSystem: 'point' | 'score' | 'weighted';
  isLiveMode: boolean;
  sessionMode: 'practice' | 'live' | 'exam';
  startMethod: 'manual' | 'scheduled' | 'auto';
  playerLimit: number | null;
  lobbyRules: {
    shuffleQuestions: boolean;
    shuffleAnswers: boolean;
    showCorrect: boolean;
    autoNext: boolean;
    showLeaderboard: boolean;
  };
  enableSheetsExport: boolean;
  deadlines: {
    start?: string;
    end?: string;
  };
  questions: Question[];
  plastin?: PlastinConfig;
  language: Language;
  createdAt: string;
}

interface DifficultyMetric {
  correct: number;
  total: number;
  weightedScore: number;
  maxWeightedScore: number;
}

interface Attempt {
  id: string;
  quizId: string;
  quizTitle: string;
  tokenUsed: string;
  userName: string;
  userEmail: string;
  score: number; 
  total: number;
  maxScore: number;
  scoringType: string;
  answers: Record<string, any>;
  timeTaken: number;
  difficultyMetrics: Record<string, DifficultyMetric>;
  completedAt: string;
}

interface AppConfig {
  googleSheetsUrl: string;
  uiMode: 'laptop' | 'mobile' | 'adaptive';
  defaultLang: Language;
}

// --- App State ---
class AuraApp {
  private root: HTMLElement;
  private lang: Language = 'en';
  private currentQuiz: Quiz | null = null;
  private activeAttempt: Attempt | null = null;
  private appUiMode: 'laptop' | 'mobile' | 'adaptive' = 'laptop';
  private config: AppConfig = {
    googleSheetsUrl: '',
    defaultLang: 'en',
    uiMode: 'laptop'
  };
  private currentPlastinTiles: PlastinTile[] = [];
  private currentBoardImage: string | null = null;

  constructor() {
    this.root = document.getElementById('app')!;
    this.loadConfig();
    this.detectLanguage();
    this.init();
  }

  private loadConfig() {
    const saved = localStorage.getItem('aura_config');
    if (saved) {
      this.config = JSON.parse(saved);
      if (this.config.defaultLang) this.lang = this.config.defaultLang;
      if (this.config.uiMode) this.appUiMode = this.config.uiMode;
    }
  }

  private saveConfig() {
    localStorage.setItem('aura_config', JSON.stringify(this.config));
  }

  private detectLanguage() {
    if (this.config.defaultLang) {
      this.lang = this.config.defaultLang;
      return;
    }
    const locale = navigator.language.split('-')[0];
    if (Object.keys(TRANSLATIONS).includes(locale)) {
      this.lang = locale as Language;
    }
  }

  private t(key: string) {
    return TRANSLATIONS[this.lang][key] || TRANSLATIONS['en'][key];
  }

  private init() {
    window.addEventListener('popstate', () => this.handleRoute());
    this.handleRoute();
  }

  public navigate(path: string) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }

  private async sendToGoogleSheets(attempt: Attempt, quiz: Quiz) {
    if (!quiz.enableSheetsExport || !this.config.googleSheetsUrl) return;
    try {
      await fetch(this.config.googleSheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: new Date(attempt.completedAt).toLocaleString(),
          name: attempt.userName,
          email: attempt.userEmail,
          score: attempt.score,
          correct: attempt.total,
          total: attempt.maxScore,
          quiz: quiz.title,
          token: attempt.tokenUsed,
          session_mode: quiz.sessionMode,
          scoring_mode: attempt.scoringType,
          difficulty_breakdown: JSON.stringify(attempt.difficultyMetrics),
          time_taken: attempt.timeTaken
        })
      });
    } catch (err) {
      console.error('Sheets integration failed', err);
    }
  }

  private async handleRoute() {
    const path = window.location.pathname;
    this.root.innerHTML = '';
    document.body.removeAttribute('data-theme');

    const container = document.createElement('div');
    const isMobile = this.appUiMode === 'mobile';
    const isLaptop = this.appUiMode === 'laptop';
    const isAdaptive = this.appUiMode === 'adaptive';
    const maxWidthClass = isMobile ? 'max-w-md' : (isAdaptive ? 'max-w-full md:max-w-5xl lg:max-w-7xl' : 'max-w-7xl');
    container.className = `flex-1 flex flex-col justify-center mx-auto px-4 sm:px-8 py-12 w-full animate-slide-up ${maxWidthClass}`;

    if (path === '/') {
      container.innerHTML = this.renderHome();
    } else if (path === '/create') {
      container.innerHTML = this.renderCreate();
    } else if (path === '/join') {
      container.innerHTML = this.renderJoin();
    } else if (path === '/settings') {
      container.innerHTML = this.renderSettings();
    } else if (path.startsWith('/play/')) {
      const token = path.split('/').pop()!;
      const quizzes: Quiz[] = JSON.parse(localStorage.getItem('aura_quizzes') || '[]');
      const quiz = quizzes.find(q => q.token === token);
      const urlParams = new URLSearchParams(window.location.search);
      const isDirect = urlParams.get('direct') === 'true';

      if (quiz && quiz.isLiveMode && !isDirect) {
         container.innerHTML = this.renderLobby(quiz);
         this.root.appendChild(container); // Add to DOM first for binding
         this.initLobby(container, quiz);
         createIcons({ icons });
         return; // Skip standard play binding
      } else {
         container.innerHTML = this.renderPlay(token);
      }
    } else if (path.startsWith('/share/')) {
      container.innerHTML = this.renderShare(path.split('/').pop()!);
    } else if (path.startsWith('/result/')) {
      container.innerHTML = this.renderResult(path.split('/').pop()!);
    } else {
      this.navigate('/');
      return;
    }

    this.root.appendChild(container);
    this.bindEvents(container);
    createIcons({ icons });
  }

  private renderHome() {
    return `
      <div class="text-center space-y-16 py-12">
        <div class="flex justify-center gap-2 border border-neutral-800 p-1 rounded-xl w-fit mx-auto bg-black/40">
           <button class="px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${this.appUiMode === 'laptop' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}" data-uimode="laptop">
              Laptop
           </button>
           <button class="px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${this.appUiMode === 'mobile' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}" data-uimode="mobile">
              Mobile
           </button>
           <button class="px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${this.appUiMode === 'adaptive' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}" data-uimode="adaptive">
              Adaptive
           </button>
        </div>

        <div class="space-y-4">
          <div class="inline-block p-4 bg-white rounded-2xl mb-4 cursor-pointer" data-nav="/settings">
             <span class="text-black font-display font-bold text-3xl">A</span>
          </div>
          <h1 class="text-7xl font-display font-bold tracking-tighter uppercase">${this.t('title')}</h1>
          <p class="text-xl text-neutral-500 font-medium tracking-wide uppercase">${this.t('subtitle')}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div class="card-action group" data-nav="/create">
            <div class="w-20 h-20 bg-neutral-800 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <i data-lucide="plus" class="w-10 h-10"></i>
            </div>
            <div class="space-y-2">
              <h3 class="text-3xl font-display font-bold uppercase">${this.t('createTitle')}</h3>
              <p class="text-neutral-500 text-sm font-medium tracking-tight">${this.t('createDesc')}</p>
            </div>
          </div>

          <div class="card-action group" data-nav="/join">
            <div class="w-20 h-20 bg-neutral-800 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <i data-lucide="key" class="w-10 h-10"></i>
            </div>
            <div class="space-y-2">
              <h3 class="text-3xl font-display font-bold uppercase">${this.t('joinTitle')}</h3>
              <p class="text-neutral-500 text-sm font-medium tracking-tight">${this.t('joinDesc')}</p>
            </div>
          </div>
        </div>
        
        <div class="pt-8">
           <button class="btn-ghost mx-auto" data-nav="/settings">
              <i data-lucide="settings" class="w-4 h-4"></i> ${this.t('settingsTitle')}
           </button>
        </div>
      </div>
    `;
  }

  private renderCreate() {
    return `
      <div class="max-w-4xl mx-auto space-y-12 pb-32 w-full">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <button class="btn-ghost w-fit" data-nav="/">
              <i data-lucide="arrow-left" class="w-4 h-4 mr-2"></i> ${this.t('backBtn')}
           </button>
           <h2 class="text-3xl md:text-4xl font-display font-bold tracking-tighter uppercase text-center sm:text-right">Mission Architect</h2>
        </div>

        <form id="create-quiz-form" class="space-y-8">
          <div class="card-premium space-y-8 border-primary/20">
            <div class="space-y-6">
              <div class="space-y-4">
                 <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Content Mode</label>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="relative group">
                       <input type="radio" name="content-type" id="type-quiz" value="quiz" class="peer hidden" checked>
                       <label for="type-quiz" class="flex items-center gap-4 p-5 rounded-2xl border border-neutral-800 bg-neutral-900/30 cursor-pointer transition-all hover:border-neutral-700 peer-checked:border-primary peer-checked:bg-primary/5">
                          <div class="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform peer-checked:bg-primary peer-checked:text-black">
                             <i data-lucide="help-circle" class="w-5 h-5 text-neutral-400 group-peer-checked:text-black"></i>
                          </div>
                          <div class="flex-1 text-left">
                             <div class="font-bold text-sm text-neutral-200">Standard Quiz</div>
                             <div class="text-[10px] text-neutral-500 uppercase tracking-wider">Classic assessment mission</div>
                          </div>
                          <div class="w-5 h-5 rounded-full border border-neutral-800 flex items-center justify-center peer-checked:border-primary">
                             <div class="w-2.5 h-2.5 bg-primary rounded-full hidden peer-checked:block"></div>
                          </div>
                       </label>
                    </div>
                    <div class="relative group">
                       <input type="radio" name="content-type" id="type-plastin" value="plastin" class="peer hidden">
                       <label for="type-plastin" class="flex items-center gap-4 p-5 rounded-2xl border border-neutral-800 bg-neutral-900/30 cursor-pointer transition-all hover:border-neutral-700 peer-checked:border-primary peer-checked:bg-primary/5">
                          <div class="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform peer-checked:bg-primary peer-checked:text-black">
                             <i data-lucide="layout" class="w-5 h-5 text-neutral-400 group-peer-checked:text-black"></i>
                          </div>
                          <div class="flex-1 text-left">
                             <div class="font-bold text-sm text-neutral-200">PLASTIN Mode</div>
                             <div class="text-[10px] text-neutral-500 uppercase tracking-wider">Online board game system</div>
                          </div>
                          <div class="w-5 h-5 rounded-full border border-neutral-800 flex items-center justify-center peer-checked:border-primary">
                             <div class="w-2.5 h-2.5 bg-primary rounded-full hidden peer-checked:block"></div>
                          </div>
                       </label>
                    </div>
                 </div>
              </div>

              <div class="space-y-2">
                 <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">${this.t('quizTitleLabel')}</label>
                 <input type="text" id="quiz-title" required class="input-premium text-2xl md:text-3xl font-display font-bold" placeholder="Mission Codename"/>
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Description</label>
                 <textarea id="quiz-desc" class="input-premium min-h-[100px] resize-none" placeholder="Briefing details..."></textarea>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                 <div class="space-y-2">
                    <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">${this.t('themeLabel')}</label>
                    <select id="quiz-category" class="input-premium appearance-none">
                       <option value="modern">Modern (Default)</option>
                       <option value="racing">Racing</option>
                       <option value="football">Football</option>
                       <option value="american-football">American Football</option>
                       <option value="swimming">Swimming</option>
                       <option value="food">Food</option>
                       <option value="education">Education</option>
                       <option value="technology">Technology</option>
                       <option value="general-knowledge">General Knowledge</option>
                    </select>
                 </div>
                 <div class="space-y-2">
                    <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">${this.t('tokenLabel')}</label>
                    <div class="flex gap-2">
                       <input type="text" id="quiz-token" required class="input-premium font-mono uppercase" placeholder="TOKEN" value="${this.generateToken()}"/>
                       <button type="button" id="randomize-token" class="btn-accent px-4 border-neutral-800" title="Randomize Token">
                          <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                       </button>
                    </div>
                 </div>
              </div>

              <div class="border-t border-neutral-800 pt-8 space-y-12">
                 <!-- Time Settings -->
                 <div class="space-y-6">
                    <h3 class="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-2">
                       <i data-lucide="clock" class="w-4 h-4"></i> Time Settings
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div class="space-y-2">
                          <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">${this.t('durationModeLabel')}</label>
                          <select id="duration-mode" class="input-premium">
                             <option value="unlimited">${this.t('unlimitedTime')}</option>
                             <option value="fixed" selected>${this.t('fixedTime')}</option>
                          </select>
                       </div>
                       <div id="time-limit-container" class="space-y-2">
                          <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">${this.t('timerLabel')} (minutes)</label>
                          <input type="number" id="quiz-timer" class="input-premium" value="60" min="1"/>
                       </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div class="space-y-2">
                          <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">${this.t('deadlineStart')}</label>
                          <input type="datetime-local" id="deadline-start" class="input-premium"/>
                       </div>
                       <div class="space-y-2">
                          <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">${this.t('deadlineEnd')}</label>
                          <input type="datetime-local" id="deadline-end" class="input-premium"/>
                       </div>
                    </div>
                 </div>

                 <!-- Lobby & Session Settings -->
                 <div class="space-y-6">
                    <h3 class="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-2">
                       <i data-lucide="users" class="w-4 h-4"></i> Session Configuration
                    </h3>

                    <div class="space-y-4">
                       <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Session Type</label>
                       <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div class="relative group">
                             <input type="radio" name="quiz-mode" id="mode-normal" value="normal" class="peer hidden" checked>
                             <label for="mode-normal" class="flex items-center gap-4 p-5 rounded-2xl border border-neutral-800 bg-neutral-900/30 cursor-pointer transition-all hover:border-neutral-700 peer-checked:border-primary peer-checked:bg-primary/5">
                                <div class="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform peer-checked:bg-primary peer-checked:text-black">
                                   <i data-lucide="file-text" class="w-5 h-5 text-neutral-400 group-peer-checked:text-black"></i>
                                </div>
                                <div class="flex-1 text-left">
                                   <div class="font-bold text-sm text-neutral-200">${this.t('modeNormal')}</div>
                                   <div class="text-[10px] text-neutral-500 uppercase tracking-wider">${this.t('modeNormalDesc')}</div>
                                </div>
                                <div class="w-5 h-5 rounded-full border border-neutral-800 flex items-center justify-center peer-checked:border-primary">
                                   <div class="w-2.5 h-2.5 bg-primary rounded-full hidden peer-checked:block"></div>
                                </div>
                             </label>
                          </div>
                          <div class="relative group">
                             <input type="radio" name="quiz-mode" id="mode-live-online" value="live" class="peer hidden">
                             <label for="mode-live-online" class="flex items-center gap-4 p-5 rounded-2xl border border-neutral-800 bg-neutral-900/30 cursor-pointer transition-all hover:border-neutral-700 peer-checked:border-primary peer-checked:bg-primary/5">
                                <div class="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform peer-checked:bg-primary peer-checked:text-black">
                                   <i data-lucide="zap" class="w-5 h-5 text-neutral-400 group-peer-checked:text-black"></i>
                                </div>
                                <div class="flex-1 text-left">
                                   <div class="font-bold text-sm text-neutral-200">${this.t('modeLiveTitle')}</div>
                                   <div class="text-[10px] text-neutral-500 uppercase tracking-wider">${this.t('modeLiveDesc')}</div>
                                </div>
                             </label>
                          </div>
                       </div>
                    </div>

                    <div id="live-settings" class="hidden space-y-6 pt-4 animate-slide-up">
                       <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div class="space-y-2">
                          <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Quiz Mode</label>
                          <select id="session-mode" class="input-premium">
                             <option value="practice">${this.t('modePractice')}</option>
                             <option value="live" selected>${this.t('modeLive')}</option>
                             <option value="exam">${this.t('modeExam')}</option>
                          </select>
                       </div>
                       <div class="space-y-2">
                          <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Start Control</label>
                          <select id="start-method" class="input-premium">
                             <option value="manual">${this.t('startManual')}</option>
                             <option value="scheduled">${this.t('startScheduled')}</option>
                             <option value="auto">${this.t('startAuto')}</option>
                          </select>
                       </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div class="space-y-2">
                          <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Player Limit</label>
                          <select id="player-limit" class="input-premium">
                             <option value="0">Unlimited</option>
                             <option value="10">10 Players</option>
                             <option value="50">50 Players</option>
                             <option value="100">100 Players</option>
                             <option value="500">500 Players</option>
                          </select>
                       </div>
                    </div>
                    
                    <div class="space-y-4 pt-4">
                       <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Live Quiz Rules</label>
                       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <label class="flex items-center gap-3 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800/80 cursor-pointer hover:border-neutral-700 transition-all">
                             <input type="checkbox" id="rule-shuffle-q" class="w-4 h-4 rounded border-neutral-800 bg-neutral-900 text-primary focus:ring-primary"/>
                             <span class="text-xs font-bold text-neutral-400 uppercase tracking-wider">Shuffle Questions</span>
                          </label>
                          <label class="flex items-center gap-3 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800/80 cursor-pointer hover:border-neutral-700 transition-all">
                             <input type="checkbox" id="rule-shuffle-a" class="w-4 h-4 rounded border-neutral-800 bg-neutral-900 text-primary focus:ring-primary"/>
                             <span class="text-xs font-bold text-neutral-400 uppercase tracking-wider">Shuffle Answers</span>
                          </label>
                          <label class="flex items-center gap-3 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800/80 cursor-pointer hover:border-neutral-700 transition-all">
                             <input type="checkbox" id="rule-show-correct" class="w-4 h-4 rounded border-neutral-800 bg-neutral-900 text-primary focus:ring-primary" checked/>
                             <span class="text-xs font-bold text-neutral-400 uppercase tracking-wider">Show Correct Ans</span>
                          </label>
                          <label class="flex items-center gap-3 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800/80 cursor-pointer hover:border-neutral-700 transition-all">
                             <input type="checkbox" id="rule-auto-next" class="w-4 h-4 rounded border-neutral-800 bg-neutral-900 text-primary focus:ring-primary" checked/>
                             <span class="text-xs font-bold text-neutral-400 uppercase tracking-wider">Auto Next Question</span>
                          </label>
                          <label class="flex items-center gap-3 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800/80 cursor-pointer hover:border-neutral-700 transition-all">
                             <input type="checkbox" id="rule-leaderboard" class="w-4 h-4 rounded border-neutral-800 bg-neutral-900 text-primary focus:ring-primary" checked/>
                             <span class="text-xs font-bold text-neutral-400 uppercase tracking-wider">Show Leaderboard</span>
                          </label>
                       </div>
                    </div>
                   </div>
                 </div>

                 <!-- UI Settings -->
                 <div class="space-y-6">
                    <h3 class="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-2">
                       <i data-lucide="layout" class="w-4 h-4"></i> ${this.t('uiSettings')}
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div class="space-y-2">
                          <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Presentation Mode</label>
                          <select id="ui-mode" class="input-premium">
                             <option value="laptop">${this.t('laptopMode')}</option>
                             <option value="mobile">${this.t('mobileMode')}</option>
                             <option value="adaptive">${this.t('adaptiveMode')}</option>
                          </select>
                       </div>
                    </div>
                 </div>

                 <!-- Scoring Settings -->
                 <div class="space-y-6">
                    <h3 class="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-2">
                       <i data-lucide="target" class="w-4 h-4"></i> ${this.t('scoringSettings')}
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div class="space-y-2">
                          <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Scoring System</label>
                          <select id="scoring-system" class="input-premium">
                             <option value="score">${this.t('scoreSystem')}</option>
                             <option value="point">${this.t('pointSystem')}</option>
                             <option value="weighted">${this.t('weightedSystem')}</option>
                          </select>
                       </div>
                    </div>
                 </div>

                 <!-- Data Settings -->
                 <div class="space-y-6">
                    <h3 class="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-2">
                       <i data-lucide="database" class="w-4 h-4"></i> ${this.t('dataSettings')}
                    </h3>
                    <div class="flex items-center gap-4 bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800/80">
                       <div class="flex-1 space-y-1">
                          <div class="font-bold text-sm text-neutral-200">${this.t('exportToSheets')}</div>
                          <div class="text-[10px] text-neutral-500 uppercase tracking-widest">Post results to configured endpoint</div>
                       </div>
                       <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" id="enable-sheets-export" class="sr-only peer" ${this.config.googleSheetsUrl ? 'checked' : ''}>
                          <div class="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-neutral-400 after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                       </label>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <div id="plastin-builder" class="hidden space-y-8 animate-slide-up">
             <div class="card-premium border-primary/10">
                <div class="flex items-center justify-between mb-8">
                   <h3 class="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-2">
                       <i data-lucide="map" class="w-4 h-4"></i> Board Construction
                   </h3>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div class="md:col-span-1 space-y-6">
                      <div class="space-y-4">
                         <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Board Background</label>
                         <div id="board-image-dropzone" class="border-2 border-dashed border-neutral-800 rounded-2xl p-8 text-center hover:border-primary transition-all cursor-pointer group">
                            <i data-lucide="image" class="w-8 h-8 text-neutral-600 mx-auto mb-2 group-hover:text-primary transition-colors"></i>
                            <p class="text-xs text-neutral-500">Drag board design or click to upload</p>
                            <input type="file" id="board-image-input" class="hidden" accept="image/*"/>
                         </div>
                         <div id="board-preview" class="hidden relative aspect-video rounded-xl overflow-hidden border border-neutral-800">
                            <img id="board-preview-img" class="w-full h-full object-cover"/>
                            <button type="button" id="remove-board-img" class="absolute top-2 right-2 p-1 bg-black/60 rounded-lg hover:bg-red-500 transition-colors">
                               <i data-lucide="x" class="w-4 h-4 text-white"></i>
                            </button>
                         </div>
                      </div>
                      
                      <div class="space-y-2">
                         <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Game Type</label>
                         <select id="plastin-game-type" class="input-premium">
                            <option value="monopoly">Turn-based Movement</option>
                            <option value="card">Card-based Strategy</option>
                            <option value="custom">Fully Custom Rules</option>
                         </select>
                      </div>

                      <div class="flex items-center gap-4 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800/80">
                         <div class="flex-1">
                            <h4 class="text-xs font-bold text-neutral-200">Voice Comms</h4>
                            <p class="text-[10px] text-neutral-500 uppercase tracking-tighter">Enable PTT in Session</p>
                         </div>
                         <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="plastin-voice-enabled" class="sr-only peer">
                            <div class="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-neutral-400 after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                         </label>
                      </div>
                   </div>

                   <div class="md:col-span-2 space-y-4">
                      <div class="flex justify-between items-center">
                         <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Node Placement</label>
                         <span class="text-[10px] text-neutral-600 uppercase font-mono" id="tile-count">0 Nodes</span>
                      </div>
                      <div id="board-canvas-container" class="relative bg-neutral-950 aspect-video rounded-2xl border border-neutral-800 overflow-hidden cursor-crosshair group shadow-inner">
                         <div id="board-overlay" class="absolute inset-0 z-10 pointer-events-none border-2 border-primary/0 group-hover:border-primary/20 transition-all"></div>
                         <div id="tiles-layer" class="absolute inset-0"></div>
                         <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                            <i data-lucide="mouse-pointer-2" class="w-12 h-12"></i>
                         </div>
                      </div>
                      <p class="text-[10px] text-neutral-600 uppercase text-center mt-2">Click on board to add interaction nodes</p>
                   </div>
                </div>
             </div>

             <div id="tiles-inventory" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Tile rule cards will appear here -->
             </div>
          </div>

          <div id="questions-list" class="space-y-6">
             <!-- Questions cards will be injected here -->
          </div>

          <div class="h-32"></div>

          <div class="fixed bottom-6 left-6 right-6 flex flex-col md:flex-row items-center justify-center gap-4 z-50">
             <button type="submit" class="w-full md:w-auto btn-premium px-12 py-5 shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                <i data-lucide="send" class="w-5 h-5"></i> ${this.t('publishBtn')}
             </button>
          </div>
        </form>
        
        <button type="button" id="add-question" class="fixed bottom-24 right-6 md:right-12 fab shadow-primary/40 z-50 scale-125">
           <i data-lucide="plus" class="w-8 h-8"></i>
        </button>
      </div>
    `;
  }

  private generateToken() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private renderSettings() {
    return `
      <div class="max-w-2xl mx-auto space-y-12 w-full">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <button class="btn-ghost w-fit" data-nav="/">
              <i data-lucide="arrow-left" class="w-4 h-4 mr-2"></i> ${this.t('backBtn')}
           </button>
           <h2 class="text-3xl md:text-4xl font-display font-bold tracking-tighter uppercase text-center sm:text-right">${this.t('settingsTitle')}</h2>
        </div>

        <form id="settings-form" class="card-premium space-y-8">
           <div class="space-y-2">
              <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">${this.t('langLabel')}</label>
              <select id="config-lang" class="input-premium">
                 <option value="en" ${this.lang === 'en' ? 'selected' : ''}>English</option>
                 <option value="id" ${this.lang === 'id' ? 'selected' : ''}>Bahasa Indonesia</option>
                 <option value="ja" ${this.lang === 'ja' ? 'selected' : ''}>日本語</option>
                 <option value="ko" ${this.lang === 'ko' ? 'selected' : ''}>한국어</option>
                 <option value="zh-cn" ${this.lang === 'zh-cn' ? 'selected' : ''}>简体中文</option>
                 <option value="zh-tw" ${this.lang === 'zh-tw' ? 'selected' : ''}>繁體中文</option>
                 <option value="es" ${this.lang === 'es' ? 'selected' : ''}>Español</option>
                 <option value="fr" ${this.lang === 'fr' ? 'selected' : ''}>Français</option>
                 <option value="de" ${this.lang === 'de' ? 'selected' : ''}>Deutsch</option>
                 <option value="pt" ${this.lang === 'pt' ? 'selected' : ''}>Português</option>
                 <option value="ar" ${this.lang === 'ar' ? 'selected' : ''}>العربية</option>
                 <option value="hi" ${this.lang === 'hi' ? 'selected' : ''}>हिन्दी</option>
                 <option value="ru" ${this.lang === 'ru' ? 'selected' : ''}>Русский</option>
                 <option value="tr" ${this.lang === 'tr' ? 'selected' : ''}>Türkçe</option>
                 <option value="it" ${this.lang === 'it' ? 'selected' : ''}>Italiano</option>
                 <option value="th" ${this.lang === 'th' ? 'selected' : ''}>ไทย</option>
                 <option value="vi" ${this.lang === 'vi' ? 'selected' : ''}>Tiếng Việt</option>
              </select>
           </div>

           <div class="space-y-2">
              <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">${this.t('uiSettings')}</label>
              <select id="config-uimode" class="input-premium">
                 <option value="laptop" ${this.appUiMode === 'laptop' ? 'selected' : ''}>${this.t('laptopMode')}</option>
                 <option value="mobile" ${this.appUiMode === 'mobile' ? 'selected' : ''}>${this.t('mobileMode')}</option>
                 <option value="adaptive" ${this.appUiMode === 'adaptive' ? 'selected' : ''}>${this.t('adaptiveMode')}</option>
              </select>
           </div>
           
           <div class="space-y-4">
              <div class="flex items-center gap-4">
                 <div class="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center">
                    <i data-lucide="table" class="w-6 h-6 text-white"></i>
                 </div>
                 <div>
                    <h4 class="font-bold">Google Sheets Integration</h4>
                    <p class="text-xs text-neutral-500">Sync all participant results automatically.</p>
                 </div>
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">${this.t('sheetUrlLabel')}</label>
                 <input type="url" id="config-sheets-url" class="input-premium" placeholder="https://script.google.com/macros/s/.../exec" value="${this.config.googleSheetsUrl}"/>
              </div>
           </div>

           <button type="submit" class="w-full btn-premium py-5 uppercase tracking-widest">
              <i data-lucide="save" class="w-5 h-5"></i> ${this.t('saveSettingsBtn')}
           </button>
        </form>
      </div>
    `;
  }

  private renderJoin() {
    return `
      <div class="max-w-md mx-auto space-y-12 py-12">
        <div class="text-center space-y-4">
           <button class="btn-ghost mx-auto" data-nav="/">
              <i data-lucide="arrow-left" class="w-4 h-4 mr-2"></i> ${this.t('backBtn')}
           </button>
           <h2 class="text-5xl font-display font-bold tracking-tighter uppercase">${this.t('joinTitle')}</h2>
           <p class="text-neutral-500 font-medium tracking-tight uppercase">${this.t('subtitle')}</p>
        </div>

        <div class="card-premium border-primary/20">
           <form id="join-form" class="space-y-6">
              <div class="space-y-2">
                 <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">${this.t('nameLabel')}</label>
                 <input type="text" id="join-name" required class="input-premium px-8 py-5 text-xl" placeholder="Operator Name"/>
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">${this.t('emailLabel')}</label>
                 <input type="email" id="join-email" required class="input-premium px-8 py-5 text-xl" placeholder="name@nexus.pro"/>
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">${this.t('tokenLabel')}</label>
                 <input type="text" id="join-token" required class="input-premium px-8 py-5 text-xl font-mono uppercase tracking-[0.2em]" placeholder="TOKEN OR ID"/>
              </div>
              <div id="mission-status-preview" class="hidden animate-slide-up bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800/60 space-y-2">
                 <div class="flex justify-between items-center">
                    <span class="text-xs font-bold text-neutral-400 uppercase tracking-widest" id="preview-title">Mission</span>
                    <span class="badge-premium" id="preview-status">Status</span>
                 </div>
              </div>
              <button type="submit" class="w-full btn-premium py-6 text-xl uppercase tracking-widest shadow-xl shadow-primary/10">${this.t('joinBtn')}</button>
           </form>
        </div>
      </div>
    `;
  }

  private renderShare(token: string) {
    const quizzes: Quiz[] = JSON.parse(localStorage.getItem('aura_quizzes') || '[]');
    const quiz = quizzes.find(q => q.token === token);
    const shareUrl = `${window.location.origin}/play/${token}`;

    if (!quiz) return '<div class="text-center py-24 uppercase font-bold tracking-widest">Invalid Mission token.</div>';

    return `
      <div class="max-w-xl mx-auto space-y-12 py-12 animate-slide-up">
        <div class="text-center space-y-4">
           <div class="w-20 h-20 bg-white rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-white/10 mb-8">
              <i data-lucide="share-2" class="w-10 h-10 text-black"></i>
           </div>
           <h2 class="text-5xl font-display font-bold tracking-tighter uppercase">${this.t('shareTitle')}</h2>
           <p class="text-neutral-500 font-medium tracking-tight uppercase">${this.t('shareSubtitle')}</p>
        </div>

        <div class="card-premium border-primary/20 space-y-10 p-8 md:p-12">
           <div class="text-center space-y-2">
              <div class="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.4em]">${quiz.title}</div>
              <div class="text-3xl font-display font-bold text-white uppercase tracking-tighter">${quiz.token}</div>
           </div>

           <div class="flex flex-col items-center gap-8">
              <div class="bg-white p-4 rounded-3xl shadow-2xl shadow-white/5 relative group">
                 <canvas id="share-qr" class="w-48 h-48 block"></canvas>
                 <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all rounded-3xl backdrop-blur-sm">
                    <button class="btn-premium py-3 px-6 download-qr-btn">
                       <i data-lucide="download" class="w-5 h-5"></i>
                    </button>
                 </div>
              </div>

              <div class="w-full space-y-4">
                 <div class="space-y-2">
                    <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Direct Access Link</label>
                    <div class="flex gap-2">
                       <input type="text" readonly value="${shareUrl}" class="input-premium font-mono text-xs opacity-80" id="share-url-input"/>
                       <button class="btn-accent px-4 copy-link-btn">
                          <i data-lucide="link" class="w-4 h-4"></i>
                       </button>
                    </div>
                 </div>
                 
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button class="btn-accent w-full py-4 text-xs font-bold uppercase tracking-widest copy-code-btn">
                       <i data-lucide="hash" class="w-4 h-4"></i> ${this.t('copyCode')}
                    </button>
                    <button class="btn-premium w-full py-4 text-xs font-bold uppercase tracking-widest native-share-btn">
                       <i data-lucide="external-link" class="w-4 h-4"></i> Share
                    </button>
                 </div>
              </div>
           </div>
        </div>

        <div class="flex justify-center">
           <button class="btn-ghost" data-nav="/">
              <i data-lucide="home" class="w-4 h-4 mr-2"></i> ${this.t('returnBtn')}
           </button>
        </div>
      </div>
    `;
  }

  private initShare(container: HTMLElement, token: string) {
    const canvas = document.getElementById('share-qr') as HTMLCanvasElement;
    const shareUrl = `${window.location.origin}/play/${token}`;
    
    if (canvas) {
      QRCode.toCanvas(canvas, shareUrl, {
        width: 192,
        margin: 0,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
    }

    container.querySelector('.copy-link-btn')?.addEventListener('click', () => {
      navigator.clipboard.writeText(shareUrl);
      alert(this.t('linkCopied'));
    });

    container.querySelector('.copy-code-btn')?.addEventListener('click', () => {
      navigator.clipboard.writeText(token);
      alert(this.t('codeCopied'));
    });

    container.querySelector('.download-qr-btn')?.addEventListener('click', () => {
       const link = document.createElement('a');
       link.download = `AURA-ID-${token}-QR.png`;
       link.href = canvas.toDataURL();
       link.click();
    });

    container.querySelector('.native-share-btn')?.addEventListener('click', () => {
       if (navigator.share) {
          navigator.share({
             title: 'AURA Mission Deployment',
             text: `Deploying assessment protocol: ${token}`,
             url: shareUrl
          });
       } else {
          navigator.clipboard.writeText(shareUrl);
          alert(this.t('linkCopied'));
       }
    });
  }

  private bindEvents(container: HTMLElement) {
    container.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', () => this.navigate(el.getAttribute('data-nav')!));
    });

    container.querySelectorAll('[data-uimode]').forEach(el => {
      el.addEventListener('click', () => {
        const mode = el.getAttribute('data-uimode') as 'laptop' | 'mobile' | 'adaptive';
        this.appUiMode = mode;
        this.config.uiMode = mode;
        this.saveConfig();
        this.handleRoute();
      });
    });

    const settingsForm = document.getElementById('settings-form') as HTMLFormElement;
    if (settingsForm) {
      settingsForm.onsubmit = (e) => {
        e.preventDefault();
        this.config.defaultLang = (document.getElementById('config-lang') as HTMLSelectElement).value as Language;
        this.config.googleSheetsUrl = (document.getElementById('config-sheets-url') as HTMLInputElement).value;
        this.appUiMode = (document.getElementById('config-uimode') as HTMLSelectElement).value as 'laptop' | 'mobile' | 'adaptive';
        this.config.uiMode = this.appUiMode;
        this.saveConfig();
        this.lang = this.config.defaultLang;
        alert('Configuration synchronized.');
        this.navigate('/');
      };
    }

    const createForm = document.getElementById('create-quiz-form') as HTMLFormElement;
    if (createForm) {
      this.initCreateForm(createForm);
    }

    const joinForm = document.getElementById('join-form') as HTMLFormElement;
    if (joinForm) {
      const tokenInput = document.getElementById('join-token') as HTMLInputElement;
      const previewArea = document.getElementById('mission-status-preview');
      const previewTitle = document.getElementById('preview-title');
      const previewStatus = document.getElementById('preview-status');

      tokenInput.addEventListener('input', () => {
        const val = tokenInput.value.toUpperCase();
        const quizzes: Quiz[] = JSON.parse(localStorage.getItem('aura_quizzes') || '[]');
        const quiz = quizzes.find(q => q.token === val || q.id === val);
        
        if (quiz && previewArea && previewTitle && previewStatus) {
           previewArea.classList.remove('hidden');
           previewTitle.innerText = quiz.title;
           const now = new Date();
           if (quiz.deadlines.start && new Date(quiz.deadlines.start) > now) {
              previewStatus.innerText = this.t('upcomingStatus');
              previewStatus.className = 'badge-premium border-amber-500/30 text-amber-500';
           } else if (quiz.deadlines.end && new Date(quiz.deadlines.end) < now) {
              previewStatus.innerText = this.t('closedStatus');
              previewStatus.className = 'badge-premium border-red-500/30 text-red-500';
           } else {
              previewStatus.innerText = this.t('activeStatus');
              previewStatus.className = 'badge-premium border-green-500/30 text-green-500';
           }
        } else {
           previewArea?.classList.add('hidden');
        }
      });

      joinForm.onsubmit = (e) => {
        e.preventDefault();
        const input = (document.getElementById('join-token') as HTMLInputElement).value.toUpperCase();
        const name = (document.getElementById('join-name') as HTMLInputElement).value;
        const email = (document.getElementById('join-email') as HTMLInputElement).value;
        
        const quizzes: Quiz[] = JSON.parse(localStorage.getItem('aura_quizzes') || '[]');
        const quiz = quizzes.find(q => q.token === input || q.id === input || q.id.substring(2) === input);
        
        if (quiz) {
          const now = new Date();
          if (quiz.deadlines.start && new Date(quiz.deadlines.start) > now) {
             alert(this.t('quizNotStarted'));
             return;
          }
          if (quiz.deadlines.end && new Date(quiz.deadlines.end) < now) {
             alert(this.t('quizEnded'));
             return;
          }

          localStorage.setItem('aura_active_user', JSON.stringify({ name, email }));
          this.navigate(`/play/${quiz.token}`);
        } else {
          alert(this.t('accessDenied'));
        }
      };
    }

    const playContainer = document.getElementById('quiz-play-container');
    if (playContainer) {
      this.initPlay(playContainer);
    }

    const plastinGameContainer = document.getElementById('plastin-game-container');
    if (plastinGameContainer) {
       this.initPlastinPlay(plastinGameContainer);
    }

    const shareContainer = document.getElementById('share-qr');
    if (shareContainer) {
       const token = window.location.pathname.split('/').pop()!;
       this.initShare(container, token);
    }
  }

  private initPlastinBuilder(container: HTMLElement) {
     this.currentPlastinTiles = [];
     this.currentBoardImage = null;
     
     const dropzone = container.querySelector('#board-image-dropzone') as HTMLElement;
     const fileInput = container.querySelector('#board-image-input') as HTMLInputElement;
     const preview = container.querySelector('#board-preview') as HTMLElement;
     const previewImg = container.querySelector('#board-preview-img') as HTMLImageElement;
     const removeBtn = container.querySelector('#remove-board-img') as HTMLElement;
     const canvasContainer = container.querySelector('#board-canvas-container') as HTMLElement;
     const tilesLayer = container.querySelector('#tiles-layer') as HTMLElement;
     const inventory = container.querySelector('#tiles-inventory') as HTMLElement;
     const tileCount = container.querySelector('#tile-count') as HTMLElement;

     const updateUI = () => {
        tilesLayer.innerHTML = '';
        inventory.innerHTML = '';
        this.currentPlastinTiles.forEach((tile, index) => {
           // Render on board
           const dot = document.createElement('div');
           dot.className = 'absolute w-6 h-6 bg-primary rounded-full border-2 border-black/50 flex items-center justify-center font-bold text-[10px] text-black shadow-lg cursor-move transform -translate-x-1/2 -translate-y-1/2 group/tile z-20 hover:scale-125 transition-transform';
           dot.style.left = `${tile.x}%`;
           dot.style.top = `${tile.y}%`;
           dot.innerText = (index + 1).toString();
           
           const tooltip = document.createElement('div');
           tooltip.className = 'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-[8px] font-bold text-neutral-400 uppercase tracking-widest whitespace-nowrap opacity-0 group-hover/tile:opacity-100 transition-opacity pointer-events-none z-30';
           tooltip.innerText = `${tile.action}: ${tile.value || 'None'}`;
           dot.appendChild(tooltip);

           tilesLayer.appendChild(dot);

           // Render in inventory
           const card = document.createElement('div');
           card.className = 'card-premium border-neutral-800/50 p-4 space-y-4 animate-slide-up';
           card.innerHTML = `
              <div class="flex items-center justify-between">
                 <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center font-bold text-xs">${index + 1}</div>
                    <input type="text" class="bg-transparent border-none focus:outline-none font-bold text-sm text-neutral-300 w-24 t-label" value="${tile.label}" placeholder="Node Label"/>
                 </div>
                 <button type="button" class="text-neutral-600 hover:text-red-500 remove-tile transition-colors">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                 </button>
              </div>
              <div class="grid grid-cols-2 gap-4">
                 <div class="space-y-1">
                    <label class="text-[8px] font-bold text-neutral-600 uppercase tracking-widest">Rule Action</label>
                    <select class="bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-1.5 text-[10px] w-full text-neutral-400 t-action">
                       <option value="none" ${tile.action === 'none' ? 'selected' : ''}>None</option>
                       <option value="move" ${tile.action === 'move' ? 'selected' : ''}>Move Player</option>
                       <option value="skip" ${tile.action === 'skip' ? 'selected' : ''}>Skip Turn</option>
                       <option value="draw" ${tile.action === 'draw' ? 'selected' : ''}>Draw Card</option>
                       <option value="penalty" ${tile.action === 'penalty' ? 'selected' : ''}>Penalty</option>
                       <option value="bonus" ${tile.action === 'bonus' ? 'selected' : ''}>Bonus</option>
                    </select>
                 </div>
                 <div class="space-y-1">
                    <label class="text-[8px] font-bold text-neutral-600 uppercase tracking-widest">Value</label>
                    <input type="text" class="bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-1.5 text-[10px] w-full text-neutral-300 t-value" value="${tile.value}" placeholder="e.g. +2"/>
                 </div>
              </div>
           `;
           
           card.querySelector('.t-label')?.addEventListener('input', (e) => {
              tile.label = (e.target as HTMLInputElement).value;
           });
           card.querySelector('.t-action')?.addEventListener('change', (e) => {
              tile.action = (e.target as HTMLSelectElement).value as PlastinAction;
              updateUI();
           });
           card.querySelector('.t-value')?.addEventListener('input', (e) => {
              tile.value = (e.target as HTMLInputElement).value;
           });
           card.querySelector('.remove-tile')?.addEventListener('click', () => {
              this.currentPlastinTiles = this.currentPlastinTiles.filter(t => t.id !== tile.id);
              updateUI();
           });

           inventory.appendChild(card);
        });
        
        tileCount.innerText = `${this.currentPlastinTiles.length} Nodes`;
        createIcons({ icons });
     };

     dropzone.addEventListener('click', () => fileInput.click());
     fileInput.addEventListener('change', (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
           const reader = new FileReader();
           reader.onload = (re) => {
              const res = re.target?.result as string;
              this.currentBoardImage = res;
              previewImg.src = res;
              preview.classList.remove('hidden');
              dropzone.classList.add('hidden');
              canvasContainer.style.backgroundImage = `url(${res})`;
              canvasContainer.style.backgroundSize = 'cover';
              canvasContainer.style.backgroundPosition = 'center';
           };
           reader.readAsDataURL(file);
        }
     });

     removeBtn.addEventListener('click', () => {
        this.currentBoardImage = null;
        preview.classList.add('hidden');
        dropzone.classList.remove('hidden');
        canvasContainer.style.backgroundImage = 'none';
        fileInput.value = '';
     });

     canvasContainer.addEventListener('click', (e) => {
        const rect = canvasContainer.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const newTile: PlastinTile = {
           id: 'tile_' + Date.now() + Math.random(),
           x, y,
           action: 'none',
           value: '',
           label: `Node ${this.currentPlastinTiles.length + 1}`
        };

        this.currentPlastinTiles.push(newTile);
        updateUI();
     });
  }

  private initCreateForm(form: HTMLFormElement) {
    let qCount = 0;
    const questionsList = document.getElementById('questions-list')!;
    const randomizeBtn = document.getElementById('randomize-token');
    const durationMode = document.getElementById('duration-mode') as HTMLSelectElement;
    const timeLimitContainer = document.getElementById('time-limit-container');

    if (randomizeBtn) {
      (randomizeBtn as HTMLElement).addEventListener('click', () => {
        (document.getElementById('quiz-token') as HTMLInputElement).value = this.generateToken();
      });
    }

    durationMode.addEventListener('change', () => {
      timeLimitContainer?.classList.toggle('hidden', durationMode.value === 'unlimited');
    });

    const contentTypeRadios = form.querySelectorAll('input[name="content-type"]');
    const quizBuilder = document.getElementById('questions-list');
    const plastinBuilder = document.getElementById('plastin-builder');
    const addQuestionBtn = document.getElementById('add-question');
    const liveModeInput = document.querySelector('#mode-live-online') as HTMLInputElement;

    contentTypeRadios.forEach(radio => {
       radio.addEventListener('change', () => {
          const isPlastin = (radio as HTMLInputElement).value === 'plastin';
          quizBuilder?.classList.toggle('hidden', isPlastin);
          plastinBuilder?.classList.toggle('hidden', !isPlastin);
          addQuestionBtn?.classList.toggle('hidden', isPlastin);
          
          if (isPlastin && liveModeInput) {
             liveModeInput.checked = true;
             liveModeInput.dispatchEvent(new Event('change'));
          }
       });
    });

    if (plastinBuilder) {
       this.initPlastinBuilder(plastinBuilder);
    }

    const liveModeRadios = form.querySelectorAll('input[name="quiz-mode"]');
    const liveSettings = document.getElementById('live-settings');
    liveModeRadios.forEach(radio => {
       radio.addEventListener('change', () => {
          liveSettings?.classList.toggle('hidden', (radio as HTMLInputElement).value === 'normal');
       });
    });

    const createQuestionCard = (existing?: Question) => {
      const qId = existing?.id || 'q_' + Date.now() + Math.random().toString(36).substring(7);
      const div = document.createElement('div');
      div.className = 'card-question animate-slide-up group/q relative overflow-hidden';
      div.dataset.id = qId;
      
      const attachments = existing?.attachments || [];
      
      div.innerHTML = `
        <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
           <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center font-display font-bold text-sm badge-idx flex-shrink-0">
                 ${++qCount}
              </div>
              <select class="input-premium py-2 px-4 text-xs w-full md:w-48 q-type">
                 <option value="mcq" ${existing?.type === 'mcq' ? 'selected' : ''}>Multiple Choice</option>
                 <option value="checkbox" ${existing?.type === 'checkbox' ? 'selected' : ''}>Checkboxes</option>
                 <option value="short" ${existing?.type === 'short' ? 'selected' : ''}>Short Answer</option>
                 <option value="paragraph" ${existing?.type === 'paragraph' ? 'selected' : ''}>Essay / Paragraph</option>
                 <option value="math" ${existing?.type === 'math' ? 'selected' : ''}>Mathematics</option>
                 <option value="matching" ${existing?.type === 'matching' ? 'selected' : ''}>Matching</option>
              </select>
           </div>
           <div class="flex flex-wrap items-center justify-between md:justify-end gap-2 w-full md:w-auto">
              <div class="flex items-center gap-2 bg-neutral-900/50 px-3 py-2 rounded-xl border border-neutral-800/80">
                 <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">${this.t('difficultyLabel')}</label>
                 <select class="bg-transparent text-sm font-bold focus:outline-none q-difficulty cursor-pointer">
                    <option value="easy" ${existing?.difficulty === 'easy' ? 'selected' : ''}>${this.t('difficultyEasy')}</option>
                    <option value="medium" ${existing?.difficulty === 'medium' || (!existing && !existing?.difficulty) ? 'selected' : ''}>${this.t('difficultyMedium')}</option>
                    <option value="hard" ${existing?.difficulty === 'hard' ? 'selected' : ''}>${this.t('difficultyHard')}</option>
                    <option value="super-hard" ${existing?.difficulty === 'super-hard' ? 'selected' : ''}>${this.t('difficultySuperHard')}</option>
                 </select>
              </div>
              <div class="flex items-center gap-2 bg-neutral-900/50 px-3 py-2 rounded-xl border border-neutral-800/80">
                 <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">${this.t('pointsLabel')}</label>
                 <input type="number" class="w-10 bg-transparent text-sm font-bold focus:outline-none q-points" value="${existing?.points || 1}" min="0"/>
              </div>
              <div class="flex items-center gap-2 bg-neutral-900/50 px-3 py-2 rounded-xl border border-neutral-800/80">
                 <label class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">${this.t('weightLabel')}</label>
                 <input type="number" step="0.01" class="w-12 bg-transparent text-sm font-bold focus:outline-none q-weight" value="${existing?.weight || 1.5}" min="0"/>
              </div>
              <div class="flex items-center gap-3">
                 <label class="flex items-center gap-2 cursor-pointer text-[10px] font-bold text-neutral-500 uppercase tracking-widest hover:text-white transition-colors">
                    <input type="checkbox" class="q-required" ${existing?.isRequired ? 'checked' : ''}/>
                    <span>${this.t('required')}</span>
                 </label>
                 <div class="flex items-center gap-1">
                    <button type="button" class="text-neutral-600 hover:text-primary transition-colors duplicate-q p-2">
                       <i data-lucide="copy" class="w-4 h-4"></i>
                    </button>
                    <button type="button" class="text-neutral-600 hover:text-red-500 transition-colors remove-q p-2">
                       <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                 </div>
              </div>
           </div>
        </div>

        <div class="space-y-6">
           <div class="space-y-4 q-media-container">
              <div class="q-attachments flex flex-wrap gap-4">
                 ${attachments.map((a, i) => this.renderAttachmentPreview(a, i)).join('')}
              </div>
              <div class="flex gap-4">
                 <label class="btn-ghost text-[10px] items-center gap-2 border border-neutral-800/80 px-4 py-2 cursor-pointer">
                    <i data-lucide="plus" class="w-3 h-3"></i> ${this.t('attachMedia')}
                    <input type="file" class="hidden q-attach-input" accept="image/*,video/*,audio/*,.pdf,.doc,.docx"/>
                 </label>
              </div>
           </div>

           <div class="space-y-2">
              <input type="text" class="input-premium q-text text-xl font-bold" placeholder="Question Text" value="${existing?.text || ''}" required />
           </div>

           <!-- Dynamic Fields Section -->
           <div class="q-dynamic-fields space-y-4">
              <!-- Content varies by type -->
           </div>
        </div>
      `;

      questionsList.appendChild(div);
      createIcons({ icons });

      const typeSelect = div.querySelector('.q-type') as HTMLSelectElement;
      const difficultySelect = div.querySelector('.q-difficulty') as HTMLSelectElement;
      const weightInput = div.querySelector('.q-weight') as HTMLInputElement;
      const dynamicFields = div.querySelector('.q-dynamic-fields')!;

      difficultySelect.addEventListener('change', () => {
         const diff = difficultySelect.value as QuestionDifficulty;
         const weights: Record<QuestionDifficulty, number> = {
            'easy': 1.0,
            'medium': 1.5,
            'hard': 2.5,
            'super-hard': 4.0
         };
         weightInput.value = weights[diff].toFixed(1);
      });
      const attachInput = div.querySelector('.q-attach-input') as HTMLInputElement;
      const attachmentsList = div.querySelector('.q-attachments')!;
      const removeQ = div.querySelector('.remove-q')!;
      const duplicateQ = div.querySelector('.duplicate-q')!;

      (removeQ as HTMLElement).addEventListener('click', () => {
        div.remove();
        this.reorderQuestions();
        qCount--;
      });

      (duplicateQ as HTMLElement).addEventListener('click', () => {
        const currentData = this.getQuestionData(div, 0); // index doesn't matter here
        createQuestionCard(currentData);
        this.reorderQuestions();
      });

      attachInput.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (re) => {
            const type = file.type.startsWith('image/') ? 'image' : 
                         file.type.startsWith('video/') ? 'video' :
                         file.type.startsWith('audio/') ? 'audio' : 'document';
            const attachment: Attachment = {
              type,
              url: re.target?.result as string,
              name: file.name
            };
            const idx = attachmentsList.children.length;
            attachmentsList.insertAdjacentHTML('beforeend', this.renderAttachmentPreview(attachment, idx));
            createIcons({ icons });
            this.bindAttachmentEvents(attachmentsList.lastElementChild as HTMLElement);
          };
          reader.readAsDataURL(file);
        }
      };

      const updateFields = () => {
        const type = typeSelect.value as Question['type'];
        dynamicFields.innerHTML = '';

        if (type === 'mcq' || type === 'checkbox') {
          dynamicFields.innerHTML = `
            <div class="space-y-3 options-list"></div>
            <button type="button" class="text-primary text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 mt-4 hover:opacity-80 transition-opacity add-option">
               <i data-lucide="plus-circle" class="w-4 h-4"></i> Add Option
            </button>
          `;

          const optionsList = dynamicFields.querySelector('.options-list')!;
          const addOptionBtn = dynamicFields.querySelector('.add-option')!;

          const addOption = (val = '', isCorrect = false) => {
            const optDiv = document.createElement('div');
            optDiv.className = 'flex items-center gap-3 group/opt bg-neutral-900/20 sm:bg-transparent p-1 rounded-xl sm:p-0';
            optDiv.innerHTML = `
               <div class="w-8 h-8 md:w-5 md:h-5 rounded-md border border-neutral-700 flex items-center justify-center cursor-pointer hover:border-primary transition-colors toggle-correct shrink-0" title="Mark as correct">
                  <div class="w-3 h-3 md:w-2.5 md:h-2.5 bg-primary rounded-xs ${isCorrect ? '' : 'hidden'} check-icon"></div>
               </div>
               <input type="text" class="input-premium py-3 text-sm flex-1 option-input" placeholder="Option value" value="${val}" required />
               <button type="button" class="text-neutral-700 hover:text-red-500 sm:opacity-0 group-hover/opt:opacity-100 transition-all remove-option p-2 shrink-0">
                  <i data-lucide="x" class="w-5 h-5 md:w-4 md:h-4"></i>
               </button>
            `;
            optionsList.appendChild(optDiv);
            createIcons({ icons });

            const checkIcon = optDiv.querySelector('.check-icon')!;
            const toggle = optDiv.querySelector('.toggle-correct')!;
            const removeOpt = optDiv.querySelector('.remove-option')!;
            
            (toggle as HTMLElement).addEventListener('click', () => {
              if (type === 'mcq') {
                optionsList.querySelectorAll('.check-icon').forEach(i => i.classList.add('hidden'));
              }
              checkIcon.classList.toggle('hidden');
            });

            (removeOpt as HTMLElement).addEventListener('click', () => optDiv.remove());
          };

          if (existing?.options) {
             existing.options.forEach(opt => {
                const isCorrect = Array.isArray(existing.correctAnswer) ? existing.correctAnswer.includes(opt) : existing.correctAnswer === opt;
                addOption(opt, isCorrect);
             });
          } else {
             addOption('Option 1');
             addOption('Option 2');
          }
          (addOptionBtn as HTMLElement).addEventListener('click', () => addOption());

        } else if (type === 'matching') {
          dynamicFields.innerHTML = `
            <div class="space-y-3 matching-list"></div>
            <button type="button" class="text-primary text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 mt-4 hover:opacity-80 transition-opacity add-pairing">
               <i data-lucide="plus-circle" class="w-4 h-4"></i> ${this.t('matchingAdd')}
            </button>
          `;
          const matchingList = dynamicFields.querySelector('.matching-list')!;
          const addPairingBtn = dynamicFields.querySelector('.add-pairing')!;

          const addPairing = (left = '', right = '') => {
            const pairDiv = document.createElement('div');
            pairDiv.className = 'flex flex-col sm:grid sm:grid-cols-[1fr_1fr_40px] items-center gap-3 group/opt bg-neutral-950/20 p-4 sm:p-0 rounded-xl sm:rounded-none relative';
            pairDiv.innerHTML = `
               <input type="text" class="input-premium py-3 text-sm left-input" placeholder="${this.t('matchingLeft')}" value="${left}" required />
               <input type="text" class="input-premium py-3 text-sm right-input" placeholder="${this.t('matchingRight')}" value="${right}" required />
               <button type="button" class="text-neutral-700 hover:text-red-500 sm:opacity-0 group-hover/opt:opacity-100 transition-all remove-pair absolute -top-2 -right-2 bg-neutral-900 sm:bg-transparent sm:static rounded-full p-2 sm:p-0 shadow-lg sm:shadow-none">
                  <i data-lucide="x" class="w-4 h-4"></i>
               </button>
            `;
            matchingList.appendChild(pairDiv);
            createIcons({ icons });
            (pairDiv.querySelector('.remove-pair') as HTMLElement).onclick = () => pairDiv.remove();
          };

          if (existing?.matchingPairs) {
            existing.matchingPairs.forEach(p => addPairing(p.left, p.right));
          } else {
            addPairing();
          }
          (addPairingBtn as HTMLElement).addEventListener('click', () => addPairing());

        } else {
          const isParagraph = type === 'paragraph';
          dynamicFields.innerHTML = `
             <div class="space-y-2">
                <label class="text-[10px] font-bold text-neutral-600 uppercase tracking-widest ml-1">Correct Answer Sequence</label>
                ${isParagraph 
                   ? `<textarea class="input-premium q-correct text-sm h-32 py-4 resize-none" placeholder="Expected detailed response..." required>${existing?.correctAnswer || ''}</textarea>`
                   : `<input type="text" class="input-premium q-correct text-sm" placeholder="Expected response or keyword" value="${existing?.correctAnswer || ''}" required />`
                }
             </div>
          `;
        }
        createIcons({ icons });
      };

      typeSelect.onchange = updateFields;
      updateFields();
      
      attachmentsList.querySelectorAll('.attachment-item').forEach(el => this.bindAttachmentEvents(el as HTMLElement));
    };

    document.getElementById('add-question')!.onclick = () => createQuestionCard();
    createQuestionCard();

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const contentType = (form.querySelector('input[name="content-type"]:checked') as HTMLInputElement).value as 'quiz' | 'plastin';
      const questions: Question[] = [];
      
      if (contentType === 'quiz') {
         form.querySelectorAll('.card-question').forEach((card, i) => {
           questions.push(this.getQuestionData(card, i));
         });
      }

      const isLiveMode = contentType === 'plastin' ? true : (form.querySelector('input[name="quiz-mode"]:checked') as HTMLInputElement).value === 'live';

      const newQuiz: Quiz = {
        id: 'qz' + Date.now(),
        type: contentType,
        token: (document.getElementById('quiz-token') as HTMLInputElement).value.toUpperCase(),
        title: (document.getElementById('quiz-title') as HTMLInputElement).value,
        description: (document.getElementById('quiz-desc') as HTMLTextAreaElement).value,
        category: (document.getElementById('quiz-category') as HTMLSelectElement).value,
        durationMode: durationMode.value as any,
        timeLimit: parseInt((document.getElementById('quiz-timer') as HTMLInputElement).value) * 60,
        uiMode: (document.getElementById('ui-mode') as HTMLSelectElement).value as any,
        scoringSystem: (document.getElementById('scoring-system') as HTMLSelectElement).value as any,
        isLiveMode: isLiveMode,
        sessionMode: (document.getElementById('session-mode') as HTMLSelectElement).value as any,
        startMethod: (document.getElementById('start-method') as HTMLSelectElement).value as any,
        playerLimit: parseInt((document.getElementById('player-limit') as HTMLSelectElement).value) || null,
        lobbyRules: {
           shuffleQuestions: (document.getElementById('rule-shuffle-q') as HTMLInputElement).checked,
           shuffleAnswers: (document.getElementById('rule-shuffle-a') as HTMLInputElement).checked,
           showCorrect: (document.getElementById('rule-show-correct') as HTMLInputElement).checked,
           autoNext: (document.getElementById('rule-auto-next') as HTMLInputElement).checked,
           showLeaderboard: (document.getElementById('rule-leaderboard') as HTMLInputElement).checked,
        },
        enableSheetsExport: (document.getElementById('enable-sheets-export') as HTMLInputElement).checked,
        deadlines: {
          start: (document.getElementById('deadline-start') as HTMLInputElement).value || undefined,
          end: (document.getElementById('deadline-end') as HTMLInputElement).value || undefined,
        },
        questions,
        plastin: contentType === 'plastin' ? {
           boardImage: this.currentBoardImage,
           tiles: this.currentPlastinTiles,
           voiceEnabled: (form.querySelector('#plastin-voice-enabled') as HTMLInputElement).checked,
           gameType: (form.querySelector('#plastin-game-type') as HTMLSelectElement).value as any,
           winCondition: 'Objective: Reach the final node.'
        } : undefined,
        language: this.lang,
        createdAt: new Date().toISOString()
      };

      const quizzes = JSON.parse(localStorage.getItem('aura_quizzes') || '[]');
      quizzes.push(newQuiz);
      localStorage.setItem('aura_quizzes', JSON.stringify(quizzes));

      alert('MISSION COMMITTED TO NEXUS.');
      this.navigate(`/share/${newQuiz.token}`);
    });
  }

  private getQuestionData(card: Element, index: number): Question {
    const text = (card.querySelector('.q-text') as HTMLInputElement).value;
    const type = (card.querySelector('.q-type') as HTMLSelectElement).value as any;
    const isRequired = (card.querySelector('.q-required') as HTMLInputElement).checked;
    const points = parseInt((card.querySelector('.q-points') as HTMLInputElement).value) || 0;
    const weight = parseFloat((card.querySelector('.q-weight') as HTMLInputElement).value.replace(',', '.')) || 0;
    const difficulty = (card.querySelector('.q-difficulty') as HTMLSelectElement).value as QuestionDifficulty;
    
    const attachItems = card.querySelectorAll('.attachment-item');
    const attachments: Attachment[] = [];
    attachItems.forEach(item => {
       attachments.push({
          type: item.getAttribute('data-type') as any,
          url: (item.querySelector('img, video, audio') as any)?.src || item.querySelector('a')?.href || '',
          name: item.getAttribute('data-name') || ''
       });
    });

    let correctAnswer: any = '';
    let options: string[] | undefined = undefined;
    let matchingPairs: MatchingPair[] | undefined = undefined;

    if (type === 'mcq' || type === 'checkbox') {
      options = [];
      const correctArr: string[] = [];
      card.querySelectorAll('.options-list > div').forEach(optDiv => {
         const val = (optDiv.querySelector('.option-input') as HTMLInputElement).value;
         options!.push(val);
         if (!optDiv.querySelector('.check-icon')!.classList.contains('hidden')) {
           correctArr.push(val);
         }
      });
      correctAnswer = type === 'mcq' ? (correctArr[0] || '') : correctArr;
    } else if (type === 'matching') {
      matchingPairs = [];
      const correctMap: Record<string, string> = {};
      card.querySelectorAll('.matching-list > div').forEach(pDiv => {
        const left = (pDiv.querySelector('.left-input') as HTMLInputElement).value;
        const right = (pDiv.querySelector('.right-input') as HTMLInputElement).value;
        matchingPairs!.push({ id: 'p'+Math.random(), left, right });
        correctMap[left] = right;
      });
      correctAnswer = correctMap;
    } else {
      correctAnswer = (card.querySelector('.q-correct') as HTMLInputElement).value || '';
    }

    return { id: 'q' + index, type, text, isRequired, points, weight, difficulty, attachments, options, matchingPairs, correctAnswer };
  }

  private renderAttachmentPreview(a: Attachment, idx: number) {
    let preview = '';
    if (a.type === 'image') preview = `<img src="${a.url}" class="w-full h-24 object-cover rounded-xl"/>`;
    else if (a.type === 'video') preview = `<div class="w-full h-24 bg-black flex items-center justify-center rounded-xl"><i data-lucide="play" class="w-6 h-6"></i></div>`;
    else if (a.type === 'audio') preview = `<div class="w-full h-24 bg-neutral-800 flex items-center justify-center rounded-xl"><i data-lucide="music" class="w-6 h-6"></i></div>`;
    else preview = `<div class="w-full h-24 bg-neutral-900 flex items-center justify-center rounded-xl"><i data-lucide="file-text" class="w-6 h-6"></i></div>`;

    return `
      <div class="attachment-item w-32 relative group/item" data-type="${a.type}" data-name="${a.name}" data-idx="${idx}">
         ${preview}
         <div class="absolute inset-0 bg-black/60 opacity-0 group-hover/item:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
            <button type="button" class="text-white hover:text-red-500 remove-attachment">
               <i data-lucide="trash-2" class="w-5 h-5"></i>
            </button>
         </div>
         <div class="text-[8px] truncate mt-1 text-neutral-500">${a.name}</div>
      </div>
    `;
  }

  private bindAttachmentEvents(item: HTMLElement) {
    const removeBtn = item.querySelector('.remove-attachment');
    if (removeBtn) {
      removeBtn.addEventListener('click', () => item.remove());
    }
  }

  private reorderQuestions() {
    const cards = document.querySelectorAll('.card-question');
    cards.forEach((card, i) => {
      const badge = card.querySelector('.badge-idx')!;
      if (badge) badge.textContent = (i + 1).toString();
    });
  }

  private renderLobby(quiz: Quiz) {
    const playersJoined = Math.floor(Math.random() * 15) + 5; // Simulated
    return `
      <div class="max-w-2xl mx-auto space-y-12 py-12 text-center animate-slide-up">
        <div class="space-y-8">
           <div class="w-24 h-24 bg-neutral-800 rounded-3xl mx-auto flex items-center justify-center animate-pulse border border-primary/20">
              <i data-lucide="users" class="w-12 h-12 text-primary"></i>
           </div>
           <div class="space-y-2">
              <h2 class="text-5xl font-display font-bold tracking-tighter uppercase">${this.t('lobbyTitle')}</h2>
              <p class="text-neutral-500 font-medium tracking-tight uppercase">${this.t('lobbySubtitle')}</p>
           </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div class="card-premium border-white/5 space-y-4">
              <div class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">${this.t('playersJoined')}</div>
              <div class="text-6xl font-display font-bold text-white tabular-nums">${playersJoined}</div>
           </div>
           <div class="card-premium border-white/5 space-y-4">
              <div class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Protocol Status</div>
              <div class="text-xl font-display font-bold text-primary uppercase animate-pulse">Synchronizing...</div>
           </div>
        </div>

        <div class="space-y-6">
           <div class="badge-premium border-primary/20 bg-primary/5 text-primary">Operative Locked: ${quiz.token}</div>
           <p class="text-neutral-500 text-sm max-w-sm mx-auto">The mission will initialize once the host triggers the launch sequence or the countdown expires.</p>
        </div>

        <button id="start-mission-demo" class="btn-premium px-12 py-6 text-xl uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
           Initialize Now
        </button>
      </div>
    `;
  }

  private initLobby(container: HTMLElement, quiz: Quiz) {
     const startBtn = container.querySelector('#start-mission-demo');
     if (startBtn) {
        startBtn.addEventListener('click', () => {
           let countdown = 3;
           (startBtn as HTMLButtonElement).disabled = true;
           const interval = setInterval(() => {
              startBtn.innerHTML = `<span class="text-4xl text-white font-display">${countdown}</span>`;
              if (countdown <= 0) {
                 clearInterval(interval);
                 this.navigate(`/play/${quiz.token}?direct=true`);
              }
              countdown--;
           }, 1000);
        });
     }
  }

  private renderPlastinGame(quiz: Quiz) {
     const isMobileUI = quiz.uiMode === 'mobile';
     return `
       <div class="mx-auto space-y-12 w-full ${isMobileUI ? 'max-w-md' : 'max-w-6xl'} animate-slide-up" id="plastin-game-container" data-token="${quiz.token}">
         <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="flex items-center gap-6">
               <div class="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center border border-black shadow-2xl relative group overflow-hidden">
                  <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                  <i data-lucide="shield" class="w-8 h-8 text-black relative z-10"></i>
               </div>
               <div>
                  <div class="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.4em] mb-1">Active Operation</div>
                  <div class="text-2xl font-display font-bold uppercase tracking-tight text-white">${quiz.title}</div>
               </div>
            </div>
            
            <div class="flex items-center gap-4 bg-neutral-900 border border-neutral-800 p-2 rounded-2xl">
               <div class="flex -space-x-3 items-center px-4" id="active-players">
                  <!-- Active player avatars -->
               </div>
               <div class="h-8 w-px bg-neutral-800"></div>
               <div class="px-4 text-right">
                  <div class="text-[8px] font-bold text-neutral-600 uppercase tracking-widest">Turn Record</div>
                  <div class="text-sm font-mono font-bold text-primary" id="game-turn-info">T-001</div>
               </div>
            </div>
         </div>

         <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div class="lg:col-span-3 space-y-6">
               <div class="card-premium p-4 bg-black/40 border-primary/10 relative shadow-2xl overflow-hidden group">
                  <div id="game-board-viewport" class="relative rounded-xl overflow-hidden shadow-2xl border border-neutral-800 aspect-video transition-all">
                     <img src="${quiz.plastin?.boardImage || ''}" class="w-full h-full object-cover" id="game-board-img"/>
                     <div id="game-tiles-layer" class="absolute inset-0 z-10"></div>
                     <div id="game-players-layer" class="absolute inset-0 z-20"></div>
                  </div>
                  
                  <div class="absolute bottom-6 right-6 flex flex-col gap-3 z-30">
                     <button id="zoom-in" class="w-10 h-10 bg-black/80 rounded-xl border border-neutral-800 flex items-center justify-center hover:text-primary transition-all">
                        <i data-lucide="zoom-in" class="w-5 h-5"></i>
                     </button>
                     <button id="zoom-out" class="w-10 h-10 bg-black/80 rounded-xl border border-neutral-800 flex items-center justify-center hover:text-primary transition-all">
                        <i data-lucide="zoom-out" class="w-5 h-5"></i>
                     </button>
                  </div>
               </div>

               <div id="game-action-log" class="card-premium bg-neutral-950/50 p-6 h-32 overflow-y-auto font-mono text-[10px] space-y-1 scroll-premium">
                  <div class="text-neutral-500">[SYSTEM] Session initialized at ${new Date().toLocaleTimeString()}</div>
                  <div class="text-primary font-bold">[PROTOCOL] Welcome, Agent. Waiting for command sequence.</div>
               </div>
            </div>

            <div class="lg:col-span-1 space-y-6">
               <div class="card-premium p-6 border-primary/20 space-y-8 h-full flex flex-col">
                  <div class="space-y-4">
                     <div class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest text-center">Action Console</div>
                     <div class="aspect-square bg-neutral-950 rounded-3xl border border-neutral-800 flex flex-col items-center justify-center gap-4 shadow-inner relative overflow-hidden group">
                        <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div id="dice-display" class="text-6xl font-display font-black text-white drop-shadow-lg scale-0 transition-transform duration-500">?</div>
                        <button id="roll-dice" class="btn-premium px-8 py-4 shadow-2xl shadow-primary/30 active:scale-90 transition-all font-bold uppercase tracking-widest text-xs relative z-10">
                           Roll Protocol
                        </button>
                        <p class="text-[8px] text-neutral-600 font-bold uppercase tracking-widest mt-2">D20 Authorization</p>
                     </div>
                  </div>

                  <div class="space-y-4 flex-1">
                     <div class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest text-center">Inventory & Comms</div>
                     <div class="grid grid-cols-2 gap-3">
                        <div class="bg-neutral-900 border border-neutral-800 p-3 rounded-xl flex flex-col items-center justify-center gap-1 opacity-50">
                           <i data-lucide="package" class="w-4 h-4 text-neutral-400"></i>
                           <span class="text-[8px] font-bold uppercase tracking-widest">Cards</span>
                        </div>
                        <div class="bg-neutral-900 border border-neutral-800 p-3 rounded-xl flex flex-col items-center justify-center gap-1 opacity-50">
                           <i data-lucide="crosshair" class="w-4 h-4 text-neutral-400"></i>
                           <span class="text-[8px] font-bold uppercase tracking-widest">Skills</span>
                        </div>
                     </div>
                     
                     ${quiz.plastin?.voiceEnabled ? `
                        <button id="ppt-mic" class="w-full bg-neutral-900 border border-neutral-800 p-6 rounded-3xl flex flex-col items-center justify-center gap-2 group hover:border-primary transition-all active:bg-primary active:text-black">
                           <i data-lucide="mic" class="w-6 h-6 text-neutral-500 group-hover:text-primary group-active:text-black"></i>
                           <span class="text-[10px] font-bold uppercase tracking-widest group-active:text-black">PUSH TO TALK</span>
                           <div class="flex gap-1 mt-1 opacity-0 group-active:opacity-100 transition-opacity">
                              <div class="w-1 h-3 bg-black animate-pulse"></div>
                              <div class="w-1 h-3 bg-black animate-pulse delay-75"></div>
                              <div class="w-1 h-3 bg-black animate-pulse delay-150"></div>
                           </div>
                        </button>
                     ` : ''}
                  </div>

                  <div class="pt-6 border-t border-neutral-800">
                     <button class="btn-ghost w-full text-[10px]" data-nav="/">ABORT MISSION</button>
                  </div>
               </div>
            </div>
         </div>
       </div>
     `;
  }

  private initPlastinPlay(container: HTMLElement) {
     const token = container.getAttribute('data-token')!;
     const quizzes: Quiz[] = JSON.parse(localStorage.getItem('aura_quizzes') || '[]');
     const quiz = quizzes.find(q => q.token === token)!;
     const user = JSON.parse(localStorage.getItem('aura_active_user') || '{"name":"Operator"}');
     const tiles = quiz.plastin?.tiles || [];

     const tilesLayer = container.querySelector('#game-tiles-layer') as HTMLElement;
     const playersLayer = container.querySelector('#game-players-layer') as HTMLElement;
     const rollBtn = container.querySelector('#roll-dice') as HTMLButtonElement;
     const diceDisplay = container.querySelector('#dice-display') as HTMLElement;
     const actionLog = container.querySelector('#game-action-log') as HTMLElement;
     const activePlayers = container.querySelector('#active-players') as HTMLElement;
     const turnInfo = container.querySelector('#game-turn-info') as HTMLElement;

     let turnCount = 1;
     let currentPlayerPos = 0; // Index in tiles
     
     const log = (msg: string, type: 'system' | 'action' | 'player' = 'system') => {
        const div = document.createElement('div');
        div.className = type === 'player' ? 'text-white font-bold' : (type === 'action' ? 'text-primary' : 'text-neutral-500');
        div.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
        actionLog.appendChild(div);
        actionLog.scrollTop = actionLog.scrollHeight;
     };

     const renderGameUI = () => {
        tilesLayer.innerHTML = '';
        playersLayer.innerHTML = '';
        
        tiles.forEach((tile, idx) => {
           const dot = document.createElement('div');
           dot.className = 'absolute w-8 h-8 rounded-full border-2 border-primary/20 flex items-center justify-center font-display font-bold text-[10px] text-primary bg-black/60 shadow-lg transform -translate-x-1/2 -translate-y-1/2';
           dot.style.left = `${tile.x}%`;
           dot.style.top = `${tile.y}%`;
           dot.innerText = (idx + 1).toString();
           tilesLayer.appendChild(dot);
        });

        // Player marker
        const marker = document.createElement('div');
        marker.className = 'absolute w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700 ease-out';
        const currentTile = tiles[currentPlayerPos];
        if (currentTile) {
           marker.style.left = `${currentTile.x}%`;
           marker.style.top = `${currentTile.y}%`;
        } else {
           marker.style.left = '5%';
           marker.style.top = '5%';
        }
        marker.innerHTML = `<span class="text-black font-display font-bold text-xl">${user.name.charAt(0)}</span>`;
        playersLayer.appendChild(marker);

        activePlayers.innerHTML = `
           <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-bold text-xs border border-black">${user.name.charAt(0)}</div>
           <div class="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-500 font-bold text-xs border border-black">B</div>
           <div class="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-500 font-bold text-xs border border-black">C</div>
        `;
     };

     rollBtn.onclick = () => {
        rollBtn.disabled = true;
        diceDisplay.classList.remove('scale-0');
        diceDisplay.classList.add('scale-150', 'animate-bounce');
        
        log(`Rolling probability matrix...`, 'system');
        
        setTimeout(() => {
           const roll = Math.floor(Math.random() * 6) + 1;
           diceDisplay.innerText = roll.toString();
           diceDisplay.classList.remove('animate-bounce');
           
           log(`${user.name} rolled a ${roll}`, 'player');
           
           setTimeout(() => {
              currentPlayerPos = (currentPlayerPos + roll) % (tiles.length || 1);
              const destination = tiles[currentPlayerPos];
              log(`Moving to ${destination?.label || 'Unknown Sector'}`, 'action');
              
              if (destination?.action && destination.action !== 'none') {
                 log(`Tile Effect Activated: ${destination.action.toUpperCase()} (${destination.value})`, 'system');
              }

              renderGameUI();
              turnCount++;
              turnInfo.innerText = `T-${turnCount.toString().padStart(3, '0')}`;
              rollBtn.disabled = false;
              diceDisplay.classList.add('scale-0');
              diceDisplay.classList.remove('scale-150');
           }, 1000);
        }, 800);
     };

     renderGameUI();
     createIcons({ icons });
  }

  private renderPlay(token: string) {
    const quizzes: Quiz[] = JSON.parse(localStorage.getItem('aura_quizzes') || '[]');
    const quiz = quizzes.find(q => q.token === token);
    if (!quiz) return '<div class="text-center text-red-500 py-24 font-bold tracking-widest uppercase">Invalid Mission Token.</div>';

    if (quiz.type === 'plastin') {
       return this.renderPlastinGame(quiz);
    }

    document.body.setAttribute('data-theme', quiz.category.toLowerCase().replace(/\s/g, '-'));

    const isUnlimited = quiz.durationMode === 'unlimited';
    const isMobileUI = quiz.uiMode === 'mobile';

    return `
      <div class="mx-auto space-y-12 w-full ${isMobileUI ? 'max-w-md' : 'max-w-4xl'}" id="quiz-play-container" data-token="${token}">
        <div class="flex items-center justify-between">
           <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-neutral-900 rounded-2xl flex items-center justify-center border border-white/10 ${isUnlimited ? 'hidden' : ''}">
                 <i data-lucide="clock" class="w-6 h-6 text-primary"></i>
              </div>
              <div class="text-4xl font-display font-bold tabular-nums ${isUnlimited ? 'hidden' : ''}" id="timer-display">--:--</div>
              ${isUnlimited ? `<div class="badge-premium border-white/10 text-white">${this.t('unlimitedTime')}</div>` : ''}
           </div>
           <div class="text-right">
              <div class="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.4em] mb-1">Mission Active</div>
              <div class="text-lg font-display font-bold uppercase tracking-tight">${quiz.title}</div>
           </div>
        </div>

        <div class="card-premium min-h-[550px] flex flex-col justify-between ${isMobileUI ? 'p-6' : 'p-12'} shadow-2xl border-white/5 bg-neutral-900/60 transition-all duration-700">
           <div id="question-area" class="space-y-12"></div>
           
           <div class="flex justify-between items-center pt-12 mt-12 border-t border-neutral-800/50">
              <button id="prev-q" class="btn-ghost px-6 opacity-40 hover:opacity-100 disabled:opacity-0 transition-opacity">
                 <i data-lucide="chevron-left" class="w-5 h-5"></i> ${this.t('prevBtn')}
              </button>
              <div class="flex items-center gap-6">
                 <div class="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.3em] ${isMobileUI ? 'hidden md:block' : ''}" id="progress-text">-- / --</div>
                 <div class="w-32 h-1 bg-neutral-800 rounded-full overflow-hidden ${isMobileUI ? 'w-16' : ''}">
                    <div id="progress-bar" class="h-full bg-primary transition-all duration-300 w-0"></div>
                 </div>
              </div>
              <button id="next-q" class="btn-premium ${isMobileUI ? 'px-6' : 'px-10'} font-bold shadow-primary/10">
                 <span>${this.t('nextBtn')}</span> <i data-lucide="chevron-right" class="w-5 h-5"></i>
              </button>
           </div>
        </div>
      </div>
    `;
  }

  private initPlay(container: HTMLElement) {
    const token = container.getAttribute('data-token')!;
    const quizzes: Quiz[] = JSON.parse(localStorage.getItem('aura_quizzes') || '[]');
    const quiz = quizzes.find(q => q.token === token)!;
    const user = JSON.parse(localStorage.getItem('aura_active_user') || '{"name":"Operator","email":"anon@aura.pro"}');
    
    let currentIdx = 0;
    const answers: Record<string, any> = {};
    let timeLeft = quiz.timeLimit;
    const isUnlimited = quiz.durationMode === 'unlimited';

    let timerInterval: any = null;
    if (!isUnlimited) {
      timerInterval = setInterval(() => {
        timeLeft--;
        const display = document.getElementById('timer-display');
        if (display) {
          const m = Math.floor(timeLeft / 60);
          const s = timeLeft % 60;
          display.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
          if (timeLeft < 30) display.classList.add('text-red-500', 'animate-pulse');
          if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finish();
          }
        }
      }, 1000);
    }

    const renderQuestion = () => {
      const q = quiz.questions[currentIdx];
      const area = document.getElementById('question-area')!;
      const prog = document.getElementById('progress-text')!;
      const progBar = document.getElementById('progress-bar')!;
      
      prog.innerText = `${currentIdx + 1} / ${quiz.questions.length}`;
      progBar.style.width = `${((currentIdx + 1) / quiz.questions.length) * 100}%`;

      area.classList.remove('animate-slide-up');
      void area.offsetWidth; 
      area.classList.add('animate-slide-up');

      area.innerHTML = `
        <div class="space-y-6">
           <div class="badge-premium border-white/10 text-white uppercase tabular-nums">Sector 0${currentIdx + 1} • ${q.type.toUpperCase()} ${q.isRequired ? '(Required)' : ''}</div>
           
           <div class="space-y-8">
              ${q.attachments && q.attachments.length > 0 ? `<div class="grid grid-cols-1 gap-4">${q.attachments.map(a => this.renderAttachment(a)).join('')}</div>` : ''}
              <h2 class="text-4xl font-display font-bold tracking-tight leading-tight uppercase">${q.text}</h2>
           </div>
        </div>

        <div class="grid grid-cols-1 gap-4">
           ${this.renderInputs(q, answers)}
        </div>
      `;

      this.bindInputs(q, answers, renderQuestion);

      const nextBtn = document.getElementById('next-q') as HTMLButtonElement;
      const prevBtn = document.getElementById('prev-q') as HTMLButtonElement;
      
      nextBtn.querySelector('span')!.innerText = currentIdx === quiz.questions.length - 1 ? this.t('finishBtn') : this.t('nextBtn');
      prevBtn.disabled = currentIdx === 0;
      
      nextBtn.onclick = () => {
        if (q.isRequired && !this.isQuestionAnswered(q, answers)) {
           alert('Intelligence commit required for this sector.');
           return;
        }
        if (currentIdx < quiz.questions.length - 1) {
          currentIdx++;
          renderQuestion();
        } else {
          finish();
        }
      };
      
      prevBtn.onclick = () => {
        if (currentIdx > 0) {
          currentIdx--;
          renderQuestion();
        }
      };
      createIcons({ icons });
    };

    const startTime = Date.now();

    const finish = async () => {
      if (timerInterval) clearInterval(timerInterval);
      const endTime = Date.now();
      const timeTaken = Math.floor((endTime - startTime) / 1000);
      
      let score = 0;
      let maxScore = 0;
      let totalCorrect = 0;
      let weightedScore = 0;
      let maxWeightedScore = 0;

      const diffMetrics: Record<string, DifficultyMetric> = {
         'easy': { correct: 0, total: 0, weightedScore: 0, maxWeightedScore: 0 },
         'medium': { correct: 0, total: 0, weightedScore: 0, maxWeightedScore: 0 },
         'hard': { correct: 0, total: 0, weightedScore: 0, maxWeightedScore: 0 },
         'super-hard': { correct: 0, total: 0, weightedScore: 0, maxWeightedScore: 0 }
      };

      quiz.questions.forEach(q => {
        const userAns = answers[q.id];
        const correctAns = q.correctAnswer;
        let isCorrect = false;
        
        if (q.type === 'matching') {
           const map = correctAns as Record<string, string>;
           const userMap = (userAns || {}) as Record<string, string>;
           const keys = Object.keys(map);
           if (keys.length > 0 && keys.every(k => userMap[k] === map[k])) isCorrect = true;
        } else if (Array.isArray(correctAns) && Array.isArray(userAns)) {
          if (correctAns.length === userAns.length && correctAns.every(v => userAns.includes(v))) isCorrect = true;
        } else if (typeof userAns === 'string' && typeof correctAns === 'string') {
          if (userAns.trim().toLowerCase() === correctAns.trim().toLowerCase()) isCorrect = true;
        } else if (q.type === 'short' || q.type === 'paragraph' || q.type === 'math') {
          if (userAns && typeof userAns === 'string' && correctAns && typeof correctAns === 'string') {
            if (userAns.trim().toLowerCase() === correctAns.trim().toLowerCase()) isCorrect = true;
          }
        }

        const qPoints = q.points || 1;
        const qWeight = q.weight || 1;
        const qDiff = q.difficulty || 'medium';

        diffMetrics[qDiff].total++;
        diffMetrics[qDiff].maxWeightedScore += qWeight;
        maxWeightedScore += qWeight;
        maxScore += qPoints;

        if (isCorrect) {
          totalCorrect++;
          weightedScore += qWeight;
          score += qPoints;
          diffMetrics[qDiff].correct++;
          diffMetrics[qDiff].weightedScore += qWeight;
        }
      });

      let finalPercentage = 0;
      if (quiz.scoringSystem === 'weighted') {
        finalPercentage = maxWeightedScore > 0 ? (weightedScore / maxWeightedScore) * 100 : 0;
      } else if (quiz.scoringSystem === 'point') {
        finalPercentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
      } else {
        finalPercentage = quiz.questions.length > 0 ? (totalCorrect / quiz.questions.length) * 100 : 0;
      }
      
      finalPercentage = Math.round(finalPercentage * 10) / 10; // 1 decimal

      const newAttempt: Attempt = {
        id: 'att_' + Date.now(),
        quizId: quiz.id,
        quizTitle: quiz.title,
        tokenUsed: token,
        userName: user.name,
        userEmail: user.email,
        score: finalPercentage,
        total: totalCorrect,
        maxScore: quiz.questions.length,
        scoringType: quiz.scoringSystem,
        answers,
        timeTaken,
        difficultyMetrics: diffMetrics,
        completedAt: new Date().toISOString()
      };
      
      const attemptsByEmail: Record<string, Attempt[]> = JSON.parse(localStorage.getItem('aura_attempts_by_email') || '{}');
      if (!attemptsByEmail[user.email]) attemptsByEmail[user.email] = [];
      attemptsByEmail[user.email].push(newAttempt);
      localStorage.setItem('aura_attempts_by_email', JSON.stringify(attemptsByEmail));
      
      await this.sendToGoogleSheets(newAttempt, quiz);
      this.navigate(`/result/${newAttempt.id}`);
    };

    renderQuestion();
  }

  private isQuestionAnswered(q: Question, answers: Record<string, any>) {
     const ans = answers[q.id];
     if (q.type === 'matching') {
        return q.matchingPairs?.every(p => ans && ans[p.left]);
     }
     if (Array.isArray(ans)) return ans.length > 0;
     return !!(ans && ans.toString().trim());
  }

  private renderAttachment(a: Attachment) {
     if (a.type === 'image') return `<img src="${a.url}" class="w-full max-h-[500px] object-contain rounded-3xl border border-white/5 bg-black/40" />`;
     if (a.type === 'video') return `<video src="${a.url}" controls class="w-full rounded-3xl border border-white/5 bg-black"></video>`;
     if (a.type === 'audio') return `<audio src="${a.url}" controls class="w-full px-4"></audio>`;
     return `
        <a href="${a.url}" download="${a.name}" class="flex items-center gap-4 p-6 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-white/20 transition-all">
           <i data-lucide="file-text" class="w-8 h-8 text-primary"></i>
           <div class="flex-1">
              <div class="font-bold uppercase tracking-tight">${a.name}</div>
              <div class="text-[10px] text-neutral-500 uppercase tracking-widest">Secured Document Intelligence</div>
           </div>
           <i data-lucide="download" class="w-5 h-5 opacity-40"></i>
        </a>
     `;
  }

  private renderInputs(q: Question, answers: Record<string, any>) {
    if (q.type === 'mcq' || q.type === 'checkbox') {
      return q.options?.map(opt => {
        const isSelected = Array.isArray(answers[q.id]) ? answers[q.id].includes(opt) : answers[q.id] === opt;
        return `
          <button class="quiz-option text-left p-6 rounded-2xl border transition-all duration-300 ${isSelected ? 'bg-white text-black border-white shadow-xl shadow-white/5' : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:bg-neutral-800/50'}" data-answer="${opt}">
             <div class="flex items-center justify-between">
                <span class="font-bold text-lg">${opt}</span>
                <div class="w-6 h-6 rounded-full border-2 ${isSelected ? 'border-primary' : 'border-neutral-700'} flex items-center justify-center transition-all">
                   ${isSelected ? '<div class="w-2.5 h-2.5 bg-primary rounded-full"></div>' : ''}
                </div>
             </div>
          </button>
        `;
      }).join('') || '';
    }

    if (q.type === 'matching') {
       const userAns = answers[q.id] || {};
       const rightOptions = q.matchingPairs?.map(p => p.right).sort(() => Math.random() - 0.5) || [];
       
       return q.matchingPairs?.map((p, i) => {
          return `
            <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 p-4 rounded-2xl bg-neutral-900/30 border border-neutral-800/60">
               <div class="p-4 bg-neutral-800/50 rounded-xl font-bold uppercase tracking-tight text-center">${p.left}</div>
               <div class="flex justify-center"><i data-lucide="arrow-right" class="w-5 h-5 text-neutral-600 hidden md:block"></i><i data-lucide="arrow-down" class="w-5 h-5 text-neutral-600 md:hidden"></i></div>
               <select class="input-premium py-4 matching-select" data-left="${p.left}">
                  <option value="">-- Select Alignment --</option>
                  ${rightOptions.map(ro => `<option value="${ro}" ${userAns[p.left] === ro ? 'selected' : ''}>${ro}</option>`).join('')}
               </select>
            </div>
          `;
       }).join('') || '';
    }

    if (q.type === 'short' || q.type === 'math') {
      return `<input type="text" class="input-premium py-6 px-8 text-xl q-input-txt" placeholder="Response entry..." value="${answers[q.id] || ''}" />`;
    }

    if (q.type === 'paragraph') {
      return `<textarea class="input-premium h-64 py-8 px-10 text-lg resize-none q-input-txt auto-resize" placeholder="Enter exhaustive decrypted scenario...">${answers[q.id] || ''}</textarea>`;
    }

    return '';
  }

  private bindInputs(q: Question, answers: Record<string, any>, refresh: () => void) {
    const area = document.getElementById('question-area')!;
    
    area.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-answer')!;
        if (q.type === 'checkbox') {
          if (!Array.isArray(answers[q.id])) answers[q.id] = [];
          const idx = answers[q.id].indexOf(val);
          if (idx > -1) answers[q.id].splice(idx, 1);
          else answers[q.id].push(val);
        } else {
          answers[q.id] = val;
        }
        refresh();
      });
    });

    area.querySelectorAll('.matching-select').forEach(sel => {
       sel.addEventListener('change', (e) => {
          if (!answers[q.id]) answers[q.id] = {};
          const left = sel.getAttribute('data-left')!;
          answers[q.id][left] = (e.target as HTMLSelectElement).value;
       });
    });

    const txt = area.querySelector('.q-input-txt') as HTMLInputElement | HTMLTextAreaElement;
    if (txt) {
      txt.addEventListener('input', () => {
        answers[q.id] = txt.value;
        if (txt.classList.contains('auto-resize')) {
           txt.style.height = 'auto';
           txt.style.height = txt.scrollHeight + 'px';
        }
      });
    }
  }

  private renderResult(id: string) {
    const attemptsByEmail: Record<string, Attempt[]> = JSON.parse(localStorage.getItem('aura_attempts_by_email') || '{}');
    let result: Attempt | undefined;
    for (const email in attemptsByEmail) {
      result = attemptsByEmail[email].find(a => a.id === id);
      if (result) break;
    }
    
    if (!result) return '<div class="text-center py-24 uppercase font-bold tracking-widest">Result sequence terminated.</div>';
    const pass = result.score >= 70;
    
    const minutes = Math.floor(result.timeTaken / 60);
    const seconds = result.timeTaken % 60;
    const message = `${minutes}m ${seconds}s`;

    return `
      <div class="max-w-4xl mx-auto text-center space-y-16 py-12 w-full">
        <div class="w-32 h-32 mx-auto bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-white/20 animate-pulse">
           <i data-lucide="${pass ? 'shield-check' : 'alert-triangle'}" class="w-16 h-16 text-black"></i>
        </div>
        <div class="space-y-4">
           <h2 class="text-7xl font-display font-bold tracking-tighter uppercase mb-4">${pass ? this.t('successMsg') : this.t('failMsg')}</h2>
           <p class="text-neutral-500 font-medium text-lg uppercase tracking-[0.4em]">Efficiency Rating Achieved</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
           <div class="card-premium border-white/5 space-y-4">
              <div class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">${this.t('scoreLabel')}</div>
              <div class="text-7xl font-display font-bold text-primary tabular-nums">${result.score}%</div>
           </div>
           <div class="card-premium border-white/5 space-y-4">
              <div class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">${this.t('accuracyLabel')}</div>
              <div class="text-7xl font-display font-bold text-white tabular-nums">${result.total} / ${result.maxScore}</div>
           </div>
        </div>

        <div class="max-w-2xl mx-auto space-y-4">
           <h3 class="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.5em] text-center mb-8">Performance Breakdown</h3>
           <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${Object.entries(result.difficultyMetrics || {}).filter(([_, m]) => m.total > 0).map(([diff, m]) => {
                 const pct = Math.round((m.correct / m.total) * 100);
                 const colors: any = { 'easy': 'text-green-500', 'medium': 'text-blue-500', 'hard': 'text-orange-500', 'super-hard': 'text-red-500' };
                 const labelKey = 'difficulty' + diff.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
                 return `
                    <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-2">
                       <div class="flex justify-between items-center text-left">
                          <span class="text-[10px] font-bold uppercase tracking-widest ${colors[diff]}">${this.t(labelKey)}</span>
                          <span class="text-xs font-bold text-neutral-400 tabular-nums">${m.correct} / ${m.total}</span>
                       </div>
                       <div class="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                          <div class="h-full ${colors[diff].replace('text', 'bg')} transition-all" style="width: ${pct}%"></div>
                       </div>
                    </div>
                  `;
              }).join('')}
           </div>
        </div>

        <div class="card-premium border-white/5 max-w-2xl mx-auto text-left p-12 space-y-8">
           <div class="flex items-center justify-between border-b border-neutral-800 pb-6">
              <h3 class="text-xl font-display font-bold uppercase tracking-tight">Mission Metrics</h3>
              <div class="badge-premium">DEBRIEFING</div>
           </div>
           <div class="space-y-6">
              <div class="flex justify-between items-center text-sm">
                 <span class="text-neutral-500 uppercase font-bold tracking-widest">Operative</span>
                 <span class="font-mono text-white">${result.userName}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                 <span class="text-neutral-500 uppercase font-bold tracking-widest">Email Hash</span>
                 <span class="font-mono text-white">${result.userEmail}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                 <span class="text-neutral-500 uppercase font-bold tracking-widest">Mission ID</span>
                 <span class="font-mono text-white">${result.quizTitle}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                 <span class="text-neutral-500 uppercase font-bold tracking-widest">Time Elapsed</span>
                 <span class="font-mono text-white">${message}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                 <span class="text-neutral-500 uppercase font-bold tracking-widest">Timestamp</span>
                 <span class="font-mono text-white">${new Date(result.completedAt).toLocaleString()}</span>
              </div>
           </div>
        </div>

        <div class="flex gap-4 max-w-xl mx-auto">
           <button class="btn-ghost flex-1 py-5 uppercase tracking-widest" onclick="window.print()">
              <i data-lucide="printer" class="w-5 h-5"></i> Export
           </button>
           <button class="btn-premium flex-[2] py-5 text-lg uppercase tracking-widest shadow-primary/20" data-nav="/">
              <i data-lucide="home" class="w-5 h-5"></i> ${this.t('returnBtn')}
           </button>
        </div>
      </div>
    `;
  }
}

new AuraApp();
