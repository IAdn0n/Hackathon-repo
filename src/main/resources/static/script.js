// =============================================================================
// حسابك - Hasabak Financial Platform  
// Enhanced Frontend JavaScript with Comprehensive Improvements
// =============================================================================

// ===================================================================
// GLOBAL VARIABLES AND STATE MANAGEMENT
// ===================================================================
let currentUser = null;
let currentPage = 'landing';
let currentDashboardSection = 'overview';
let currentLoanTab = 'offers';
let userBanksAndWallets = [];
let userSavingsGoals = [];
let expenseChart = null;
let monthlyTrendChart = null;
let isAnimating = false;
let otpTimer = null;
let otpTimeLeft = 120; // 2 minutes
let mobileMenuOpen = false;
let valuesHidden = false;
let notificationsPanelOpen = false;
let settingsDropdownOpen = false;

// ===================================================================
// ENHANCED MOCK DATA FOR DEMONSTRATION
// Backend Connection Point: Replace with actual API calls
// ===================================================================

// Enhanced Mock Users Database
const mockUsers = [
    {
        id: 1,
        username: 'ahmad123',
        email: 'ahmad@example.com',
        phone: '0791234567',
        password: 'Hasabak123!',
        accounts: ['البنك الأهلي', 'البنك العربي'],
        fullName: 'أحمد محمد العلي',
        joinDate: '2024-01-15',
        isActive: true,
        monthlySalary: 1200
    },
    {
        id: 2,
        username: 'sara456',
        email: 'sara@example.com',
        phone: '0797654321',
        password: 'Sara2024!',
        accounts: ['البنك العربي', 'بنك الإسكان'],
        fullName: 'سارة أحمد الزهراني',
        joinDate: '2024-02-20',
        isActive: true,
        monthlySalary: 950
    },
    {
        id: 3,
        username: 'test',
        email: 'test@test.com',
        phone: '0791111111',
        password: 'test',
        accounts: ['البنك الأهلي', 'البنك العربي', 'كابيتال بنك'],
        fullName: 'مستخدم تجريبي',
        joinDate: '2024-03-01',
        isActive: true,
        monthlySalary: 800
    }
];

// Enhanced Mock Balance System - Banks Only
const mockAccountBalances = {
    // Jordanian Banks Only
    'البنك الأهلي الأردني': { balance: 4250.75, type: 'bank', accountNumber: '****1234', lastUpdate: '2024-07-18T10:30:00Z' },
    'البنك العربي': { balance: 3890.50, type: 'bank', accountNumber: '****5678', lastUpdate: '2024-07-18T09:45:00Z' },
    'بنك ABC الأردن': { balance: 2150.25, type: 'bank', accountNumber: '****9012', lastUpdate: '2024-07-18T11:20:00Z' },
    'بنك AJIB': { balance: 5670.00, type: 'bank', accountNumber: '****3456', lastUpdate: '2024-07-18T08:15:00Z' },
    'البنك الأردني الكويتي': { balance: 3456.80, type: 'bank', accountNumber: '****2468', lastUpdate: '2024-07-18T10:00:00Z' },
    'البنك العربي الإسلامي الدولي': { balance: 2567.85, type: 'bank', accountNumber: '****1593', lastUpdate: '2024-07-18T12:15:00Z' },
    'بنك القاهرة عمان': { balance: 4123.90, type: 'bank', accountNumber: '****9753', lastUpdate: '2024-07-18T09:30:00Z' },
    'CITI بنك الأردن': { balance: 6780.45, type: 'bank', accountNumber: '****8642', lastUpdate: '2024-07-18T10:45:00Z' },
    'كابيتال بنك': { balance: 3210.70, type: 'bank', accountNumber: '****7531', lastUpdate: '2024-07-18T11:00:00Z' },
    'بنك الإسكان للتجارة والتمويل': { balance: 8950.20, type: 'bank', accountNumber: '****4680', lastUpdate: '2024-07-18T08:30:00Z' },
    'صفوة الإسلامي': { balance: 1890.40, type: 'bank', accountNumber: '****7419', lastUpdate: '2024-07-18T09:15:00Z' },
    'البنك التجاري الأردني': { balance: 4567.30, type: 'bank', accountNumber: '****8520', lastUpdate: '2024-07-18T10:15:00Z' },
    'البنك الإسلامي الأردني': { balance: 3345.65, type: 'bank', accountNumber: '****9630', lastUpdate: '2024-07-18T11:45:00Z' },
    'البنك الاستثماري': { balance: 7123.80, type: 'bank', accountNumber: '****1470', lastUpdate: '2024-07-18T08:45:00Z' },
    'البنك الراجحي': { balance: 5234.70, type: 'bank', accountNumber: '****3690', lastUpdate: '2024-07-18T09:00:00Z' },
    'بنك الإتحاد': { balance: 3678.95, type: 'bank', accountNumber: '****4710', lastUpdate: '2024-07-18T10:30:00Z' },
    'البنك اللبناني الفرنسي': { balance: 2789.60, type: 'bank', accountNumber: '****1357', lastUpdate: '2024-07-18T11:30:00Z' },
    'بنك المؤسسة العربية المصرفية': { balance: 1980.30, type: 'bank', accountNumber: '****7890', lastUpdate: '2024-07-18T12:00:00Z' },
    'البنك الدولي العربي': { balance: 2890.55, type: 'bank', accountNumber: '****2580', lastUpdate: '2024-07-18T12:30:00Z' }
};

// Banks List (No Digital Wallets)
const jordanianBanks = [
    'البنك الأهلي الأردني',
    'البنك العربي',
    'بنك ABC الأردن',
    'بنك AJIB',
    'البنك الأردني الكويتي',
    'البنك العربي الإسلامي الدولي',
    'بنك القاهرة عمان',
    'CITI بنك الأردن',
    'كابيتال بنك',
    'بنك الإسكان للتجارة والتمويل',
    'صفوة الإسلامي',
    'البنك التجاري الأردني',
    'البنك الإسلامي الأردني',
    'البنك الاستثماري',
    'البنك الراجحي',
    'بنك الإتحاد',
    'البنك اللبناني الفرنسي',
    'بنك المؤسسة العربية المصرفية',
    'البنك الدولي العربي'
];

// Enhanced Mock Financial Data with More Categories
const mockTransactions = [
    { 
        id: 'TXN001',
        date: '2024-07-18', 
        description: 'سوبر ماركت كارفور', 
        category: 'طعام', 
        amount: -45.50, 
        balance: 5750,
        account: 'البنك الأهلي الأردني',
        type: 'expense',
        status: 'completed'
    },
    { 
        id: 'TXN002',
        date: '2024-07-18', 
        description: 'راتب شهري', 
        category: 'راتب', 
        amount: 1200, 
        balance: 5795.50,
        account: 'البنك الأهلي الأردني',
        type: 'income',
        status: 'completed'
    },
    { 
        id: 'TXN003',
        date: '2024-07-17', 
        description: 'محطة وقود شل', 
        category: 'مواصلات', 
        amount: -35.00, 
        balance: 4595.50,
        account: 'البنك العربي',
        type: 'expense',
        status: 'completed'
    },
    { 
        id: 'TXN004',
        date: '2024-07-17', 
        description: 'مطعم برجر كنج', 
        category: 'طعام', 
        amount: -12.50, 
        balance: 4630.50,
        account: 'البنك العربي',
        type: 'expense',
        status: 'completed'
    },
    { 
        id: 'TXN005',
        date: '2024-07-16', 
        description: 'تحويل بنكي', 
        category: 'تحويل', 
        amount: -200.00, 
        balance: 4643.00,
        account: 'البنك الأهلي الأردني',
        type: 'expense',
        status: 'completed'
    },
    { 
        id: 'TXN006',
        date: '2024-07-16', 
        description: 'صيدلية النهدي', 
        category: 'صحة', 
        amount: -25.75, 
        balance: 4843.00,
        account: 'كابيتال بنك',
        type: 'expense',
        status: 'completed'
    },
    { 
        id: 'TXN007',
        date: '2024-07-15', 
        description: 'فاتورة كهرباء', 
        category: 'فواتير', 
        amount: -85.00, 
        balance: 4868.75,
        account: 'البنك الأهلي الأردني',
        type: 'expense',
        status: 'completed'
    },
    { 
        id: 'TXN008',
        date: '2024-07-15', 
        description: 'تسوق سيتي مول', 
        category: 'تسوق', 
        amount: -120.25, 
        balance: 4953.75,
        account: 'البنك العربي',
        type: 'expense',
        status: 'completed'
    },
    { 
        id: 'TXN009',
        date: '2024-07-14', 
        description: 'مقهى ستاربكس', 
        category: 'طعام', 
        amount: -8.50, 
        balance: 5074.00,
        account: 'كابيتال بنك',
        type: 'expense',
        status: 'completed'
    },
    { 
        id: 'TXN010',
        date: '2024-07-14', 
        description: 'أوبر', 
        category: 'مواصلات', 
        amount: -15.75, 
        balance: 5082.50,
        account: 'البنك العربي',
        type: 'expense',
        status: 'completed'
    },
    { 
        id: 'TXN011',
        date: '2024-07-13', 
        description: 'مستشفى الجامعة الأردنية', 
        category: 'صحة', 
        amount: -75.00, 
        balance: 5098.25,
        account: 'البنك الأهلي الأردني',
        type: 'expense',
        status: 'completed'
    },
    { 
        id: 'TXN012',
        date: '2024-07-13', 
        description: 'مطعم كنتاكي', 
        category: 'طعام', 
        amount: -18.50, 
        balance: 5173.25,
        account: 'كابيتال بنك',
        type: 'expense',
        status: 'completed'
    },
    { 
        id: 'TXN013',
        date: '2024-07-12', 
        description: 'تاكسي عمان', 
        category: 'مواصلات', 
        amount: -12.00, 
        balance: 5191.75,
        account: 'البنك العربي',
        type: 'expense',
        status: 'completed'
    },
    { 
        id: 'TXN014',
        date: '2024-07-12', 
        description: 'صالون الحلاقة', 
        category: 'عناية شخصية', 
        amount: -20.00, 
        balance: 5203.75,
        account: 'البنك الأهلي الأردني',
        type: 'expense',
        status: 'completed'
    },
    { 
        id: 'TXN015',
        date: '2024-07-11', 
        description: 'فاتورة إنترنت أورانج', 
        category: 'فواتير', 
        amount: -30.00, 
        balance: 5223.75,
        account: 'كابيتال بنك',
        type: 'expense',
        status: 'completed'
    },
    { 
        id: 'TXN016',
        date: '2024-07-11', 
        description: 'كتب جامعية', 
        category: 'تعليم', 
        amount: -65.00, 
        balance: 5253.75,
        account: 'البنك العربي',
        type: 'expense',
        status: 'completed'
    },
    { 
        id: 'TXN017',
        date: '2024-07-10', 
        description: 'أدوية من الصيدلية', 
        category: 'صحة', 
        amount: -35.25, 
        balance: 5318.75,
        account: 'البنك الأهلي الأردني',
        type: 'expense',
        status: 'completed'
    },
    { 
        id: 'TXN018',
        date: '2024-07-10', 
        description: 'بقالة الحي', 
        category: 'طعام', 
        amount: -22.75, 
        balance: 5354.00,
        account: 'كابيتال بنك',
        type: 'expense',
        status: 'completed'
    },
    { 
        id: 'TXN019',
        date: '2024-07-09', 
        description: 'سينما جراند مول', 
        category: 'ترفيه', 
        amount: -16.00, 
        balance: 5376.75,
        account: 'البنك العربي',
        type: 'expense',
        status: 'completed'
    },
    { 
        id: 'TXN020',
        date: '2024-07-09', 
        description: 'قهوة ودونت كريسبي كريم', 
        category: 'طعام', 
        amount: -9.50, 
        balance: 5392.75,
        account: 'البنك الأهلي الأردني',
        type: 'expense',
        status: 'completed'
    }
];

// Enhanced Mock Transactions Database for All Jordanian Banks
const bankTransactionTemplates = {
    'البنك الأهلي الأردني': [
        { description: 'راتب شهري', category: 'راتب', type: 'income', amount: [1000, 1500] },
        { description: 'سوبر ماركت كارفور', category: 'طعام', type: 'expense', amount: [30, 80] },
        { description: 'فاتورة كهرباء JEDCO', category: 'فواتير', type: 'expense', amount: [60, 120] },
        { description: 'مستشفى الجامعة الأردنية', category: 'صحة', type: 'expense', amount: [40, 100] },
        { description: 'صالون الحلاقة', category: 'عناية شخصية', type: 'expense', amount: [15, 30] },
        { description: 'تحويل بنكي', category: 'تحويل', type: 'expense', amount: [100, 500] },
        { description: 'أدوية من الصيدلية', category: 'صحة', type: 'expense', amount: [20, 60] },
        { description: 'قهوة ودونت', category: 'طعام', type: 'expense', amount: [5, 15] },
        { description: 'تعبئة رصيد زين', category: 'فواتير', type: 'expense', amount: [10, 25] },
        { description: 'بنزين من محطة شل', category: 'مواصلات', type: 'expense', amount: [25, 50] }
    ],
    'البنك العربي': [
        { description: 'راتب من الشركة', category: 'راتب', type: 'income', amount: [900, 1400] },
        { description: 'تسوق سيتي مول', category: 'تسوق', type: 'expense', amount: [80, 200] },
        { description: 'مطعم برجر كنج', category: 'طعام', type: 'expense', amount: [10, 25] },
        { description: 'تاكسي عمان', category: 'مواصلات', type: 'expense', amount: [8, 20] },
        { description: 'كتب جامعية', category: 'تعليم', type: 'expense', amount: [40, 100] },
        { description: 'سينما جراند مول', category: 'ترفيه', type: 'expense', amount: [12, 30] },
        { description: 'أوبر', category: 'مواصلات', type: 'expense', amount: [10, 25] },
        { description: 'فاتورة مياه', category: 'فواتير', type: 'expense', amount: [15, 40] },
        { description: 'مقهى ستاربكس', category: 'طعام', type: 'expense', amount: [6, 12] },
        { description: 'مكتبة جرير', category: 'تسوق', type: 'expense', amount: [20, 60] }
    ],
    'بنك ABC الأردن': [
        { description: 'مكافأة سنوية', category: 'راتب', type: 'income', amount: [800, 1200] },
        { description: 'سوبر ماركت سيفوي', category: 'طعام', type: 'expense', amount: [40, 90] },
        { description: 'صيدلية الدواء', category: 'صحة', type: 'expense', amount: [25, 70] },
        { description: 'فاتورة غاز', category: 'فواتير', type: 'expense', amount: [20, 45] },
        { description: 'نادي رياضي', category: 'ترفيه', type: 'expense', amount: [50, 100] },
        { description: 'مطعم بيتزا هت', category: 'طعام', type: 'expense', amount: [15, 35] },
        { description: 'مركز تجميل', category: 'عناية شخصية', type: 'expense', amount: [30, 80] },
        { description: 'تسوق أزياء', category: 'تسوق', type: 'expense', amount: [60, 150] },
        { description: 'محطة وقود توتال', category: 'مواصلات', type: 'expense', amount: [30, 60] },
        { description: 'دورة تدريبية', category: 'تعليم', type: 'expense', amount: [100, 300] }
    ],
    'بنك AJIB': [
        { description: 'راتب شهري أساسي', category: 'راتب', type: 'income', amount: [1100, 1600] },
        { description: 'هايبر ماركت كاريفور', category: 'طعام', type: 'expense', amount: [50, 120] },
        { description: 'فاتورة إنترنت أورانج', category: 'فواتير', type: 'expense', amount: [25, 50] },
        { description: 'عيادة أسنان', category: 'صحة', type: 'expense', amount: [50, 150] },
        { description: 'مطعم شاورما', category: 'طعام', type: 'expense', amount: [8, 18] },
        { description: 'تكسي ذهاب وإياب', category: 'مواصلات', type: 'expense', amount: [12, 30] },
        { description: 'مكواة ملابس', category: 'عناية شخصية', type: 'expense', amount: [5, 12] },
        { description: 'ألعاب أطفال', category: 'تسوق', type: 'expense', amount: [25, 80] },
        { description: 'فاتورة تلفون أرضي', category: 'فواتير', type: 'expense', amount: [15, 30] },
        { description: 'مقهى شعبي', category: 'طعام', type: 'expense', amount: [3, 8] }
    ],
    'البنك الأردني الكويتي': [
        { description: 'راتب مع علاوات', category: 'راتب', type: 'income', amount: [1200, 1800] },
        { description: 'مول العبدلي', category: 'تسوق', type: 'expense', amount: [100, 250] },
        { description: 'مطعم الرومانسية', category: 'طعام', type: 'expense', amount: [40, 80] },
        { description: 'وقود من جو بتروليوم', category: 'مواصلات', type: 'expense', amount: [35, 65] },
        { description: 'مركز صحي خاص', category: 'صحة', type: 'expense', amount: [60, 120] },
        { description: 'كورسات لغة إنجليزية', category: 'تعليم', type: 'expense', amount: [80, 200] },
        { description: 'سوبر ماركت الملكة', category: 'طعام', type: 'expense', amount: [45, 95] },
        { description: 'فاتورة كهرباء IDECO', category: 'فواتير', type: 'expense', amount: [70, 130] },
        { description: 'سينما سيتي مول', category: 'ترفيه', type: 'expense', amount: [10, 25] },
        { description: 'صالون نسائي', category: 'عناية شخصية', type: 'expense', amount: [25, 60] }
    ],
    'البنك العربي الإسلامي الدولي': [
        { description: 'راتب حلال', category: 'راتب', type: 'income', amount: [950, 1350] },
        { description: 'تسوق من الحلال مارت', category: 'طعام', type: 'expense', amount: [35, 75] },
        { description: 'مسجد التبرعات', category: 'أخرى', type: 'expense', amount: [20, 100] },
        { description: 'مكتبة إسلامية', category: 'تعليم', type: 'expense', amount: [30, 80] },
        { description: 'عطار الشفاء', category: 'صحة', type: 'expense', amount: [15, 40] },
        { description: 'مطعم المنزل', category: 'طعام', type: 'expense', amount: [20, 45] },
        { description: 'تكسي للمسجد', category: 'مواصلات', type: 'expense', amount: [5, 15] },
        { description: 'فاتورة مياه بيور', category: 'فواتير', type: 'expense', amount: [12, 35] },
        { description: 'ملابس محتشمة', category: 'تسوق', type: 'expense', amount: [50, 120] },
        { description: 'زكاة المال', category: 'أخرى', type: 'expense', amount: [100, 300] }
    ],
    'بنك القاهرة عمان': [
        { description: 'راتب موظف عام', category: 'راتب', type: 'income', amount: [800, 1200] },
        { description: 'مطعم فلافل وحمص', category: 'طعام', type: 'expense', amount: [5, 12] },
        { description: 'صيدلية الشفاء', category: 'صحة', type: 'expense', amount: [20, 55] },
        { description: 'باص نقل عام', category: 'مواصلات', type: 'expense', amount: [1, 3] },
        { description: 'سوق الخضار', category: 'طعام', type: 'expense', amount: [15, 35] },
        { description: 'فاتورة الكهرباء', category: 'فواتير', type: 'expense', amount: [50, 100] },
        { description: 'مقهى الديوان', category: 'طعام', type: 'expense', amount: [4, 10] },
        { description: 'مكتبة المدرسة', category: 'تعليم', type: 'expense', amount: [25, 60] },
        { description: 'حلاق الحي', category: 'عناية شخصية', type: 'expense', amount: [8, 18] },
        { description: 'بقالة الزاوية', category: 'طعام', type: 'expense', amount: [10, 25] }
    ],
    'CITI بنك الأردن': [
        { description: 'راتب دولار', category: 'راتب', type: 'income', amount: [1400, 2000] },
        { description: 'مطعم فاخر', category: 'طعام', type: 'expense', amount: [60, 120] },
        { description: 'مول الباروك', category: 'تسوق', type: 'expense', amount: [150, 400] },
        { description: 'وقود بريميوم', category: 'مواصلات', type: 'expense', amount: [40, 80] },
        { description: 'مستشفى خاص VIP', category: 'صحة', type: 'expense', amount: [100, 300] },
        { description: 'نادي الرياضة الملكي', category: 'ترفيه', type: 'expense', amount: [80, 150] },
        { description: 'دورة MBA', category: 'تعليم', type: 'expense', amount: [500, 1000] },
        { description: 'سبا وتدليك', category: 'عناية شخصية', type: 'expense', amount: [60, 120] },
        { description: 'مطار عمان الملكة علياء', category: 'مواصلات', type: 'expense', amount: [25, 50] },
        { description: 'فندق خمس نجوم', category: 'ترفيه', type: 'expense', amount: [200, 500] }
    ],
    'كابيتال بنك': [
        { description: 'راتب تقني', category: 'راتب', type: 'income', amount: [1000, 1500] },
        { description: 'متجر التكنولوجيا', category: 'تسوق', type: 'expense', amount: [100, 300] },
        { description: 'مقهى ستاربكس', category: 'طعام', type: 'expense', amount: [8, 15] },
        { description: 'صيدلية النهدي', category: 'صحة', type: 'expense', amount: [25, 65] },
        { description: 'أوبر توصيل', category: 'مواصلات', type: 'expense', amount: [12, 28] },
        { description: 'فاتورة إنترنت أومنية', category: 'فواتير', type: 'expense', amount: [30, 60] },
        { description: 'مطعم كنتاكي', category: 'طعام', type: 'expense', amount: [15, 30] },
        { description: 'بقالة الحي', category: 'طعام', type: 'expense', amount: [20, 40] },
        { description: 'تعبئة رصيد أمنية', category: 'فواتير', type: 'expense', amount: [10, 30] },
        { description: 'سينما جالاكسي', category: 'ترفيه', type: 'expense', amount: [8, 20] }
    ],
    'بنك الإسكان للتجارة والتمويل': [
        { description: 'راتب إسكاني', category: 'راتب', type: 'income', amount: [1300, 1900] },
        { description: 'رسوم بناء منزل', category: 'أخرى', type: 'expense', amount: [200, 800] },
        { description: 'مواد بناء', category: 'أخرى', type: 'expense', amount: [300, 1000] },
        { description: 'مطعم عائلي', category: 'طعام', type: 'expense', amount: [30, 70] },
        { description: 'سوبر ماركت عائلي', category: 'طعام', type: 'expense', amount: [60, 150] },
        { description: 'مدرسة الأطفال', category: 'تعليم', type: 'expense', amount: [100, 300] },
        { description: 'عيادة أطفال', category: 'صحة', type: 'expense', amount: [40, 90] },
        { description: 'ألعاب ومستلزمات', category: 'تسوق', type: 'expense', amount: [50, 120] },
        { description: 'فاتورة كهرباء البيت', category: 'فواتير', type: 'expense', amount: [80, 160] },
        { description: 'وقود للسيارة العائلية', category: 'مواصلات', type: 'expense', amount: [50, 100] }
    ]
};

// Enhanced Mock Loan Offers
const mockLoanOffers = [
    {
        id: 'LOAN001',
        bank: 'البنك الأهلي الأردني',
        amount: 10000,
        interestRate: 2.5,
        duration: 24,
        monthlyPayment: 435.50,
        type: 'شخصي',
        processingFee: 100,
        requirements: ['راتب ثابت', 'ضمانات'],
        approvalTime: '3-5 أيام عمل'
    },
    {
        id: 'LOAN002',
        bank: 'البنك العربي',
        amount: 15000,
        interestRate: 3.2,
        duration: 36,
        monthlyPayment: 462.30,
        type: 'سيارة',
        processingFee: 150,
        requirements: ['إثبات دخل', 'رخصة قيادة'],
        approvalTime: '5-7 أيام عمل'
    },
    {
        id: 'LOAN003',
        bank: 'بنك الإسكان للتجارة والتمويل',
        amount: 50000,
        interestRate: 4.5,
        duration: 60,
        monthlyPayment: 932.10,
        type: 'منزل',
        processingFee: 500,
        requirements: ['ضمانات عقارية', 'تأمين'],
        approvalTime: '7-10 أيام عمل'
    },
    {
        id: 'LOAN004',
        bank: 'كابيتال بنك',
        amount: 8000,
        interestRate: 3.8,
        duration: 18,
        monthlyPayment: 470.25,
        type: 'زواج',
        processingFee: 80,
        requirements: ['عقد زواج', 'إثبات دخل'],
        approvalTime: '2-4 أيام عمل'
    },
    {
        id: 'LOAN005',
        bank: 'البنك الإسلامي الأردني',
        amount: 12000,
        interestRate: 2.8,
        duration: 30,
        monthlyPayment: 425.80,
        type: 'تعليم',
        processingFee: 120,
        requirements: ['قبول جامعي', 'كفيل'],
        approvalTime: '4-6 أيام عمل'
    },
    {
        id: 'LOAN006',
        bank: 'البنك التجاري الأردني',
        amount: 25000,
        interestRate: 4.2,
        duration: 48,
        monthlyPayment: 578.95,
        type: 'تجاري',
        processingFee: 300,
        requirements: ['خطة عمل', 'ضمانات'],
        approvalTime: '10-14 يوم عمل'
    }
];

// Mock Loan Applications
let mockLoanApplications = [
    {
        id: 'APP001',
        loanId: 'LOAN001',
        bank: 'البنك الأهلي الأردني',
        amount: 10000,
        type: 'شخصي',
        status: 'pending',
        applicationDate: '2024-07-15',
        expectedDecision: '2024-07-20'
    },
    {
        id: 'APP002',
        loanId: 'LOAN002',
        bank: 'البنك العربي',
        amount: 15000,
        type: 'سيارة',
        status: 'approved',
        applicationDate: '2024-07-10',
        decisionDate: '2024-07-16'
    }
];

// Mock Savings Goals
let mockSavingsGoals = [
    {
        id: 'GOAL001',
        name: 'شراء سيارة',
        targetAmount: 15000,
        currentAmount: 8500,
        targetDate: '2024-12-31',
        createdDate: '2024-01-01'
    },
    {
        id: 'GOAL002',
        name: 'رحلة العمرة',
        targetAmount: 3000,
        currentAmount: 1200,
        targetDate: '2024-10-15',
        createdDate: '2024-03-01'
    }
];

// Mock Notifications
const mockNotifications = [
    {
        id: 'NOT001',
        type: 'warning',
        title: 'تنبيه إنفاق',
        message: 'لقد تجاوزت ميزانية الطعام لهذا الشهر',
        date: '2024-07-18',
        read: false
    },
    {
        id: 'NOT002',
        type: 'success',
        title: 'تم قبول القرض',
        message: 'تم قبول طلب القرض من البنك العربي',
        date: '2024-07-16',
        read: false
    },
    {
        id: 'NOT003',
        type: 'info',
        title: 'هدف الادخار',
        message: 'اقتربت من تحقيق هدف شراء السيارة',
        date: '2024-07-15',
        read: true
    }
];

// Mock Bank Branches Data
let mockBranches = [];

// Initialize Bank Branches
const bankBranchesData = {
    'البنك العربي': [
        {
            branchId: 'ARAB_001',
            branchType: 'main',
            available: true,
            branchName: 'الرابية',
            addressLine: 'عمان، الأردن، الرابية',
            coordinates: { lat: 31.9816, lng: 35.8909 },
            services: ['ATM', 'Customer Service', 'Loans', 'Exchange'],
            workingHours: 'الأحد - الخميس: 8:30 - 15:30'
        },
        {
            branchId: 'ARAB_002',
            branchType: 'branch',
            available: true,
            branchName: 'شارع الجامعة',
            addressLine: 'عمان، الأردن، شارع الجامعة',
            coordinates: { lat: 31.9522, lng: 35.9078 },
            services: ['ATM', 'Customer Service', 'Exchange'],
            workingHours: 'الأحد - الخميس: 8:30 - 15:30'
        }
    ],
    'البنك الأهلي الأردني': [
        {
            branchId: 'AHLI_001',
            branchType: 'main',
            available: true,
            branchName: 'العبدلي',
            addressLine: 'عمان، الأردن، العبدلي',
            coordinates: { lat: 31.9605, lng: 35.9014 },
            services: ['ATM', 'Customer Service', 'Loans', 'Exchange', 'Business Banking'],
            workingHours: 'الأحد - الخميس: 8:30 - 15:30'
        },
        {
            branchId: 'AHLI_002',
            branchType: 'branch',
            available: false,
            branchName: 'جبل عمان',
            addressLine: 'عمان، الأردن، جبل عمان',
            coordinates: { lat: 31.9539, lng: 35.9106 },
            services: ['ATM', 'Customer Service'],
            workingHours: 'مؤقتاً مغلق للصيانة'
        }
    ],
    'كابيتال بنك': [
        {
            branchId: 'CAPITAL_001',
            branchType: 'main',
            available: true,
            branchName: 'الشميساني',
            addressLine: 'عمان، الأردن، الشميساني',
            coordinates: { lat: 31.9721, lng: 35.9066 },
            services: ['ATM', 'Customer Service', 'Loans', 'Exchange'],
            workingHours: 'الأحد - الخميس: 8:30 - 15:30'
        },
        {
            branchId: 'CAPITAL_002',
            branchType: 'branch',
            available: true,
            branchName: 'تلاع العلي',
            addressLine: 'عمان، الأردن، تلاع العلي',
            coordinates: { lat: 31.9937, lng: 35.8573 },
            services: ['ATM', 'Customer Service', 'Exchange'],
            workingHours: 'الأحد - الخميس: 8:30 - 15:30'
        }
    ]
};

// ===================================================================
// INITIALIZATION AND LOADING
// ===================================================================

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 تم تحميل منصة حسابك بنجاح');
    
    // Initialize the application
    initializeApplication();
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        hideLoadingScreen();
    }, 2000);
});

// Initialize the application
function initializeApplication() {
    // Check if user is logged in
    checkAuthenticationStatus();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load initial data
    loadInitialData();
    
    // Update navigation based on authentication
    updateNavigationState();
}

// Check authentication status
function checkAuthenticationStatus() {
    const savedUser = localStorage.getItem('hasabak_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        if (currentUser && currentUser.isActive) {
            showDashboard();
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Add bank form
    const addBankForm = document.getElementById('addBankForm');
    if (addBankForm) {
        addBankForm.addEventListener('submit', handleAddBank);
    }
    
    // Add goal form
    const addGoalForm = document.getElementById('addGoalForm');
    if (addGoalForm) {
        addGoalForm.addEventListener('submit', handleAddGoal);
    }
    
    // Loan application form
    const loanApplicationForm = document.getElementById('loanApplicationForm');
    if (loanApplicationForm) {
        loanApplicationForm.addEventListener('submit', handleLoanApplication);
    }
    
    // Close modals when clicking outside
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });
    
    // Initialize loan calculator
    initializeLoanCalculator();
}

// Load initial data
function loadInitialData() {
    // Load user banks and wallets
    loadUserBanksAndWallets();
    
    // Load savings goals
    loadSavingsGoals();
    
    // Load notifications
    loadNotifications();
}

// Hide loading screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// ===================================================================
// NAVIGATION AND PAGE MANAGEMENT
// ===================================================================

// Update navigation state based on authentication
function updateNavigationState() {
    const guestNav = document.getElementById('guestNav');
    const userNav = document.getElementById('userNav');
    
    if (currentUser) {
        // Hide guest navigation, show user navigation
        if (guestNav) guestNav.style.display = 'none';
        if (userNav) userNav.style.display = 'flex';
    } else {
        // Show guest navigation only when not on landing page
        if (currentPage !== 'landing') {
            if (guestNav) guestNav.style.display = 'flex';
        } else {
            if (guestNav) guestNav.style.display = 'none';
        }
        if (userNav) userNav.style.display = 'none';
    }
}

// Go to homepage
function goToHomepage() {
    if (currentUser) {
        showDashboard();
    } else {
        showLandingPage();
    }
}

// Show landing page
function showLandingPage() {
    hideAllPages();
    const landingPage = document.getElementById('landingPage');
    if (landingPage) landingPage.style.display = 'block';
    currentPage = 'landing';
    updateNavigationState();
}

// Show login page
function showLogin() {
    hideAllPages();
    const loginPage = document.getElementById('loginPage');
    if (loginPage) loginPage.style.display = 'block';
    currentPage = 'login';
    updateNavigationState();
}

// Show signup page
function showSignup() {
    hideAllPages();
    const signupPage = document.getElementById('signupPage');
    if (signupPage) signupPage.style.display = 'block';
    currentPage = 'signup';
    updateNavigationState();
    
    // Reset signup steps
    resetSignupSteps();
}

// Show dashboard
function showDashboard() {
    hideAllPages();
    const dashboardPage = document.getElementById('dashboardPage');
    if (dashboardPage) dashboardPage.style.display = 'block';
    currentPage = 'dashboard';
    updateNavigationState();
    
    // Load dashboard data
    loadDashboardData();
    
    // Show default section
    showDashboardSection('overview');
}

// Hide all pages
function hideAllPages() {
    const pages = [
        'landingPage',
        'loginPage', 
        'signupPage',
        'dashboardPage'
    ];
    
    pages.forEach(pageId => {
        const page = document.getElementById(pageId);
        if (page) page.style.display = 'none';
    });
}

// Show dashboard section
function showDashboardSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionName + 'Section');
    if (selectedSection) {
        selectedSection.style.display = 'block';
        selectedSection.classList.add('active');
    }
    
    // Update navigation buttons
    const navButtons = document.querySelectorAll('.dashboard-nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    const activeButton = document.querySelector(`[onclick="showDashboardSection('${sectionName}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    currentDashboardSection = sectionName;
    
    // Load section-specific data
    loadSectionData(sectionName);
}

// Load section-specific data
function loadSectionData(sectionName) {
    switch(sectionName) {
        case 'overview':
            loadOverviewData();
            break;
        case 'analytics':
            loadAnalyticsData();
            break;
        case 'transactions':
            loadTransactionsData();
            break;
        case 'banks':
            loadBanksData();
            break;
        case 'loans':
            loadLoansData();
            break;
        case 'branches':
            loadBranchesData();
            break;
        case 'currencies':
            loadCurrenciesData();
            break;
    }
}

// Load branches data
function loadBranchesData() {
    const branchesGrid = document.getElementById('branchesGrid');
    if (!branchesGrid) return;
    
    branchesGrid.innerHTML = '';
    
    // Get user's banks and initialize branches
    if (!mockBanks || mockBanks.length === 0) {
        // If no banks available, populate mockBanks first
        loadUserBanksAndWallets();
    }
    
    // Clear previous branches
    mockBranches = [];
    
    // Load branches for user's banks
    mockBanks.forEach(userBank => {
        const bankName = userBank.name;
        const bankBranches = bankBranchesData[bankName];
        
        if (bankBranches) {
            bankBranches.forEach(branch => {
                mockBranches.push({
                    ...branch,
                    bankName: bankName
                });
            });
        }
    });
    
    if (mockBranches.length === 0) {
        branchesGrid.innerHTML = `
            <div class="no-branches-message">
                <i class="fas fa-info-circle"></i>
                <h3>لا توجد فروع متاحة</h3>
                <p>أضف حساباتك البنكية أولاً لعرض الفروع الخاصة بك</p>
                <button class="btn primary" onclick="showAddBankAccount()">
                    <i class="fas fa-plus"></i>
                    إضافة حساب بنكي
                </button>
            </div>
        `;
        return;
    }
    
    // Group branches by bank
    const branchesByBank = {};
    mockBranches.forEach(branch => {
        if (!branchesByBank[branch.bankName]) {
            branchesByBank[branch.bankName] = [];
        }
        branchesByBank[branch.bankName].push(branch);
    });
    
    // Display branches grouped by bank
    Object.keys(branchesByBank).forEach(bankName => {
        const bankSection = document.createElement('div');
        bankSection.className = 'bank-branches-section';
        bankSection.innerHTML = `
            <div class="bank-header">
                <h3><i class="fas fa-university"></i> ${bankName}</h3>
                <span class="branches-count">${branchesByBank[bankName].length} فرع</span>
            </div>
            <div class="branches-list"></div>
        `;
        
        const branchesList = bankSection.querySelector('.branches-list');
        
        branchesByBank[bankName].forEach(branch => {
            const branchCard = document.createElement('div');
            branchCard.className = `branch-card ${branch.available ? 'available' : 'unavailable'}`;
            
            branchCard.innerHTML = `
                <div class="branch-header">
                    <div class="branch-info">
                        <h4>${branch.branchName}</h4>
                        <span class="branch-id">رقم الفرع: ${branch.branchId}</span>
                    </div>
                    <div class="branch-status">
                        <span class="status-badge ${branch.available ? 'available' : 'unavailable'}">
                            <i class="fas ${branch.available ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                            ${branch.available ? 'متاح' : 'غير متاح'}
                        </span>
                        <span class="branch-type">${branch.branchType === 'main' ? 'فرع رئيسي' : 'فرع فرعي'}</span>
                    </div>
                </div>
                
                <div class="branch-details">
                    <div class="branch-address">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${branch.addressLine}</span>
                    </div>
                    
                    <div class="branch-hours">
                        <i class="fas fa-clock"></i>
                        <span>${branch.workingHours}</span>
                    </div>
                    
                    <div class="branch-services">
                        <div class="services-label">
                            <i class="fas fa-concierge-bell"></i>
                            الخدمات المتاحة:
                        </div>
                        <div class="services-list">
                            ${branch.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="branch-actions">
                    <button class="btn secondary" onclick="getDirections(${branch.coordinates.lat}, ${branch.coordinates.lng})">
                        <i class="fas fa-directions"></i>
                        الحصول على الاتجاهات
                    </button>
                    ${branch.available ? `
                        <button class="btn primary" onclick="contactBranch('${branch.branchId}', '${branch.branchName}')">
                            <i class="fas fa-phone"></i>
                            الاتصال بالفرع
                        </button>
                    ` : ''}
                </div>
            `;
            
            branchesList.appendChild(branchCard);
        });
        
        branchesGrid.appendChild(bankSection);
    });
}

// Get directions to branch
function getDirections(lat, lng) {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank');
    showInfoMessage('تم فتح خرائط جوجل للحصول على الاتجاهات');
}

// Contact branch
function contactBranch(branchId, branchName) {
    showInfoMessage(`يمكنك الاتصال بفرع ${branchName} على الرقم: 06-123-4567`);
    // Here you would typically show actual contact information
}

// Load loans data
function loadLoansData() {
    loadLoanOffers();
    loadLoanApplications();
    // Initialize loan calculator with default values
    calculateLoan();
}

// ===================================================================
// AUTHENTICATION HANDLING
// ===================================================================

// Handle login
async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    // Show loading state
    showButtonLoading('loginSubmitBtn');
    
    try {
        // Simulate authentication delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock authentication
        const user = mockUsers.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Login successful
            currentUser = user;
            localStorage.setItem('hasabak_user', JSON.stringify(user));
            
            // Load user's banks and wallets
            loadUserBanksAndWallets();
            
            showSuccessMessage('تم تسجيل الدخول بنجاح!');
            setTimeout(() => {
                showDashboard();
            }, 1000);
        } else {
            throw new Error('اسم المستخدم أو كلمة المرور غير صحيحة');
        }
    } catch (error) {
        showErrorMessage(error.message);
    } finally {
        hideButtonLoading('loginSubmitBtn');
    }
}

// Handle signup
async function handleSignup(event) {
    event.preventDefault();
    
    const phone = document.getElementById('signupPhone').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const username = document.getElementById('signupUsername').value;
    
    // Show loading state
    showButtonLoading('signupSubmitBtn');
    
    try {
        // Simulate registration delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Check if username already exists
        const existingUser = mockUsers.find(u => u.username === username);
        if (existingUser) {
            throw new Error('اسم المستخدم موجود مسبقاً');
        }
        
        // Check if email already exists
        const existingEmail = mockUsers.find(u => u.email === email);
        if (existingEmail) {
            throw new Error('البريد الإلكتروني موجود مسبقاً');
        }
        
        // Store signup data temporarily
        const signupData = { phone, email, password, username };
        sessionStorage.setItem('signupData', JSON.stringify(signupData));
        
        // Move to OTP verification
        showSignupStep(2);
        
    } catch (error) {
        showErrorMessage(error.message);
    } finally {
        hideButtonLoading('signupSubmitBtn');
    }
}

// Handle logout
function logout() {
    currentUser = null;
    localStorage.removeItem('hasabak_user');
    userBanksAndWallets = [];
    userSavingsGoals = [];
    
    showSuccessMessage('تم تسجيل الخروج بنجاح');
    setTimeout(() => {
        showLandingPage();
    }, 1000);
}

// ===================================================================
// SIGNUP FLOW MANAGEMENT
// ===================================================================

// Reset signup steps
function resetSignupSteps() {
    document.getElementById('signupStep1').style.display = 'block';
    document.getElementById('signupStep2').style.display = 'none';
    document.getElementById('signupStep3').style.display = 'none';
}

// Show signup step
function showSignupStep(step) {
    // Hide all steps
    document.getElementById('signupStep1').style.display = 'none';
    document.getElementById('signupStep2').style.display = 'none';
    document.getElementById('signupStep3').style.display = 'none';
    
    // Show selected step
    document.getElementById('signupStep' + step).style.display = 'block';
    
    // If showing step 3 (bank setup), initialize the display
    if (step === 3) {
        displayAddedBanks();
    }
}

// Select OTP method
function selectOTPMethod(method) {
    // Remove active class from all options
    document.querySelectorAll('.otp-option').forEach(option => {
        option.classList.remove('active');
    });
    
    // Add active class to selected option
    event.target.classList.add('active');
    
    // Update message
    const otpMessage = document.getElementById('otpMessage');
    if (method === 'phone') {
        otpMessage.textContent = 'تم إرسال رمز التحقق إلى رقم هاتفك';
    } else {
        otpMessage.textContent = 'تم إرسال رمز التحقق إلى بريدك الإلكتروني';
    }
    
    // Show OTP verification
    document.getElementById('otpVerification').style.display = 'block';
    
    // Start countdown timer
    startOTPTimer();
}

// Start OTP timer
function startOTPTimer() {
    otpTimeLeft = 120; // 2 minutes
    const timerElement = document.getElementById('timerText');
    
    otpTimer = setInterval(() => {
        const minutes = Math.floor(otpTimeLeft / 60);
        const seconds = otpTimeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (otpTimeLeft <= 0) {
            clearInterval(otpTimer);
            timerElement.textContent = 'انتهت صلاحية الرمز';
        }
        
        otpTimeLeft--;
    }, 1000);
}

// Move to next OTP input
function moveToNext(current, index) {
    if (current.value.length >= 1) {
        const nextInput = document.querySelectorAll('.otp-input')[index + 1];
        if (nextInput) {
            nextInput.focus();
        }
    }
}

// Verify OTP
function verifyOTP() {
    const otpInputs = document.querySelectorAll('.otp-input');
    const otpCode = Array.from(otpInputs).map(input => input.value).join('');
    
    if (otpCode.length !== 6) {
        showErrorMessage('يرجى إدخال رمز التحقق كاملاً');
        return;
    }
    
    // Mock OTP verification (accept any 6-digit code)
    if (otpCode.length === 6) {
        clearInterval(otpTimer);
        showSuccessMessage('تم التحقق من الرمز بنجاح!');
        
        setTimeout(() => {
            showSignupStep(3);
        }, 1000);
    } else {
        showErrorMessage('رمز التحقق غير صحيح');
    }
}

// Resend OTP
function resendOTP() {
    // Clear current timer
    clearInterval(otpTimer);
    
    // Clear OTP inputs
    document.querySelectorAll('.otp-input').forEach(input => {
        input.value = '';
    });
    
    // Start new timer
    startOTPTimer();
    
    showSuccessMessage('تم إعادة إرسال رمز التحقق');
}

// Add bank account during signup
function addBankAccount() {
    const bankSelect = document.getElementById('bankSelect');
    
    if (!bankSelect.value) {
        showErrorMessage('يرجى اختيار البنك');
        return;
    }
    
    // Get bank data from mock data or use default values
    const bankAccountData = mockAccountBalances[bankSelect.value];
    const bankData = {
        name: bankSelect.value,
        balance: bankAccountData ? bankAccountData.balance : Math.floor(Math.random() * 5000) + 1000, // Random balance between 1000-6000
        accountNumber: bankAccountData ? bankAccountData.accountNumber : '****' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
        type: 'bank',
        lastUpdate: new Date().toISOString()
    };
    
    // Add to user's banks
    if (!userBanksAndWallets.find(bank => bank.name === bankData.name)) {
        userBanksAndWallets.push(bankData);
        
        // Also add to mockBanks for loan offers
        if (!mockBanks.find(bank => bank.name === bankData.name)) {
            mockBanks.push(bankData);
        }
        
        // Update UI
        displayAddedBanks();
        updateDashboardStats();
        
        // Refresh loans section if currently viewing it
        if (currentDashboardSection === 'loans') {
            loadLoanOffers();
        }
        
        // Clear form
        bankSelect.value = '';
        
        showSuccessMessage('تم إضافة البنك بنجاح');
    } else {
        showErrorMessage('البنك موجود مسبقاً');
    }
}

// Update dashboard statistics
function updateDashboardStats() {
    // Update account count - target the first stat-card
    const accountCountElement = document.querySelector('.stat-card .stat-number');
    if (accountCountElement) {
        accountCountElement.textContent = mockBanks.length;
    }
    
    // Update total balance if needed
    const totalBalance = mockBanks.reduce((sum, bank) => sum + bank.balance, 0);
    const balanceElements = document.querySelectorAll('#totalBalance .amount');
    balanceElements.forEach(element => {
        if (element) {
            element.textContent = formatCurrency(totalBalance);
        }
    });
}

// Display added banks
function displayAddedBanks() {
    const addedBanksContainer = document.getElementById('addedBanks');
    if (!addedBanksContainer) return;
    
    addedBanksContainer.innerHTML = '';
    
    if (userBanksAndWallets.length === 0) {
        addedBanksContainer.innerHTML = `
            <div class="empty-banks-message">
                <i class="fas fa-info-circle"></i>
                <p>لم يتم إضافة أي بنوك بعد. يمكنك إضافة البنوك الآن أو لاحقاً من لوحة التحكم.</p>
            </div>
        `;
        return;
    }
    
    userBanksAndWallets.forEach((bank, index) => {
        const bankItem = document.createElement('div');
        bankItem.className = 'bank-item';
        bankItem.innerHTML = `
            <div class="bank-info">
                <div class="bank-name">${bank.name}</div>
                <div class="bank-status">متصل</div>
            </div>
            <button class="remove-bank" onclick="removeBank(${index})">
                <i class="fas fa-times"></i>
            </button>
        `;
        addedBanksContainer.appendChild(bankItem);
    });
}

// Remove bank
function removeBank(index) {
    userBanksAndWallets.splice(index, 1);
    displayAddedBanks();
    showSuccessMessage('تم حذف البنك');
}

// Complete signup
function completeSignup() {
    const signupData = JSON.parse(sessionStorage.getItem('signupData'));
    if (!signupData) {
        showErrorMessage('حدث خطأ، يرجى المحاولة مرة أخرى');
        return;
    }
    
    // Create new user
    const newUser = {
        id: mockUsers.length + 1,
        username: signupData.username,
        email: signupData.email,
        phone: signupData.phone,
        password: signupData.password,
        accounts: userBanksAndWallets.map(bank => bank.name),
        fullName: signupData.username,
        joinDate: new Date().toISOString().split('T')[0],
        isActive: true,
        monthlySalary: 0
    };
    
    // Add to mock users
    mockUsers.push(newUser);
    
    // Save user banks to mock data for this session
    userBanksAndWallets.forEach(bank => {
        if (!mockAccountBalances[bank.name]) {
            mockAccountBalances[bank.name] = {
                balance: bank.balance,
                type: 'bank',
                accountNumber: bank.accountNumber,
                lastUpdate: bank.lastUpdate
            };
        }
    });
    
    // Login user
    currentUser = newUser;
    localStorage.setItem('hasabak_user', JSON.stringify(newUser));
    
    // Clear session data
    sessionStorage.removeItem('signupData');
    
    showSuccessMessage('تم إنشاء الحساب بنجاح!');
    setTimeout(() => {
        showDashboard();
    }, 1500);
}

// Skip bank setup
function skipBankSetup() {
    completeSignup();
}

// ===================================================================
// DASHBOARD DATA LOADING
// ===================================================================

// Get filtered transactions based on user's banks with enhanced data
function getUserTransactions() {
    if (!currentUser || userBanksAndWallets.length === 0) {
        return [];
    }
    
    // Get list of user's bank names
    const userBankNames = userBanksAndWallets.map(bank => bank.name);
    
    // Try to load transactions from localStorage first
    let storedTransactions = [];
    try {
        const stored = localStorage.getItem('mockTransactions');
        if (stored) {
            storedTransactions = JSON.parse(stored);
        }
    } catch (e) {
        console.log('Error loading stored transactions:', e);
        storedTransactions = mockTransactions;
    }
    
    // Filter transactions to only include user's banks
    const filteredTransactions = storedTransactions.filter(transaction => 
        userBankNames.includes(transaction.account)
    );
    
    // If no transactions found for user's banks, generate new ones
    if (filteredTransactions.length === 0) {
        console.log('No transactions found for user banks, generating new ones...');
        userBanksAndWallets.forEach(bank => {
            generateSampleTransactions(bank.name);
        });
        
        // Re-filter after generation
        const updatedStored = JSON.parse(localStorage.getItem('mockTransactions') || '[]');
        return updatedStored.filter(transaction => 
            userBankNames.includes(transaction.account)
        );
    }
    
    console.log(`Found ${filteredTransactions.length} transactions for user banks`);
    return filteredTransactions;
}

// Generate sample transactions for a new bank account using advanced templates
function generateSampleTransactions(bankName) {
    const templates = bankTransactionTemplates[bankName] || bankTransactionTemplates['البنك الأهلي الأردني'];
    const numTransactions = Math.floor(Math.random() * 8) + 12; // 12-20 transactions per bank
    let currentBalance = Math.random() * 3000 + 2000; // Random starting balance 2000-5000
    const sampleTransactions = [];

    // Generate transactions for the last 30 days
    const today = new Date();
    
    for (let i = 0; i < numTransactions; i++) {
        const template = templates[Math.floor(Math.random() * templates.length)];
        const daysAgo = Math.floor(Math.random() * 30);
        const transactionDate = new Date(today);
        transactionDate.setDate(today.getDate() - daysAgo);
        
        // Calculate amount based on template range
        let amount;
        if (template.type === 'income') {
            amount = Math.random() * (template.amount[1] - template.amount[0]) + template.amount[0];
            amount = Math.round(amount * 100) / 100;
            currentBalance += amount;
        } else {
            amount = -(Math.random() * (template.amount[1] - template.amount[0]) + template.amount[0]);
            amount = Math.round(amount * 100) / 100;
            currentBalance += amount; // amount is already negative
        }
        
        // Ensure balance doesn't go negative
        if (currentBalance < 0) {
            currentBalance = Math.abs(currentBalance);
        }

        const transaction = {
            id: `TXN_${bankName.replace(/\s+/g, '_')}_${Date.now()}_${i}`,
            date: transactionDate.toISOString().split('T')[0],
            description: template.description,
            category: template.category,
            amount: amount,
            balance: Math.round(currentBalance * 100) / 100,
            account: bankName,
            type: template.type,
            status: 'completed'
        };

        sampleTransactions.push(transaction);
    }

    // Sort transactions by date (newest first)
    sampleTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Add sample transactions to mock data
    mockTransactions.unshift(...sampleTransactions);
    
    // Store updated transactions in localStorage
    localStorage.setItem('mockTransactions', JSON.stringify(mockTransactions));
    
    console.log(`Generated ${sampleTransactions.length} advanced transactions for ${bankName}`);
    return sampleTransactions;
}

// Load dashboard data
function loadDashboardData() {
    if (!currentUser) return;
    
    // Load user's banks and wallets
    loadUserBanksAndWallets();
    
    // Load savings goals
    loadSavingsGoals();
    
    // Update total balance
    updateTotalBalance();
    
    // Update dashboard stats
    updateDashboardStats();
}

// Load user banks and wallets
function loadUserBanksAndWallets() {
    if (!currentUser) return;
    
    userBanksAndWallets = [];
    
    // Clear mockBanks and reload from user's accounts
    mockBanks = [];
    
    // Load user's connected banks
    currentUser.accounts.forEach(accountName => {
        const accountData = mockAccountBalances[accountName];
        if (accountData) {
            const bankData = {
                name: accountName,
                balance: accountData.balance,
                accountNumber: accountData.accountNumber,
                type: accountData.type,
                lastUpdate: accountData.lastUpdate
            };
            
            userBanksAndWallets.push(bankData);
            mockBanks.push(bankData); // Also add to mockBanks for loan offers
        }
    });
}

// Load savings goals
function loadSavingsGoals() {
    userSavingsGoals = [...mockSavingsGoals];
}

// Update total balance
function updateTotalBalance() {
    const totalBalance = userBanksAndWallets.reduce((sum, account) => sum + account.balance, 0);
    
    const totalBalanceElement = document.getElementById('totalBalance');
    if (totalBalanceElement) {
        const amountElement = totalBalanceElement.querySelector('.amount');
        if (amountElement) {
            amountElement.textContent = formatNumber(totalBalance.toFixed(2));
        }
    }
}

// Load overview data
function loadOverviewData() {
    // Load recent transactions
    loadRecentTransactions();
    
    // Load savings goals
    loadSavingsGoalsDisplay();
    
    // Update statistics
    updateQuickStats();
    updateDashboardStats();
}

// Load recent transactions
function loadRecentTransactions() {
    const transactionsList = document.getElementById('recentTransactionsList');
    if (!transactionsList) return;
    
    transactionsList.innerHTML = '';
    
    // Get user's transactions only
    const userTransactions = getUserTransactions();
    
    // Show last 5 transactions from user's banks
    const recentTransactions = userTransactions.slice(0, 5);
    
    if (recentTransactions.length === 0) {
        transactionsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exchange-alt"></i>
                <p>لا توجد معاملات حديثة</p>
                <p>ابدأ باستخدام حساباتك البنكية لتظهر المعاملات هنا</p>
            </div>
        `;
        return;
    }
    
    recentTransactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        
        const amountClass = transaction.amount > 0 ? 'positive' : 'negative';
        const amountSymbol = transaction.amount > 0 ? '+' : '';
        
        transactionItem.innerHTML = `
            <div class="transaction-info">
                <div class="transaction-description">${transaction.description}</div>
                <div class="transaction-details">
                    ${transaction.category} • ${transaction.account} • ${formatDate(transaction.date)}
                </div>
            </div>
            <div class="transaction-amount ${amountClass}">
                ${amountSymbol}${formatCurrency(Math.abs(transaction.amount))}
            </div>
        `;
        
        transactionsList.appendChild(transactionItem);
    });
}

// Load savings goals display
function loadSavingsGoalsDisplay() {
    const goalsContainer = document.getElementById('savingsGoalsList');
    if (!goalsContainer) return;
    
    goalsContainer.innerHTML = '';
    
    if (userSavingsGoals.length === 0) {
        goalsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-piggy-bank"></i>
                <p>لا توجد أهداف ادخار حالياً</p>
                <button class="btn primary" onclick="showAddGoalForm()">
                    <i class="fas fa-plus"></i>
                    إضافة هدف جديد
                </button>
            </div>
        `;
        return;
    }
    
    userSavingsGoals.forEach(goal => {
        const progress = (goal.currentAmount / goal.targetAmount) * 100;
        const goalCard = document.createElement('div');
        goalCard.className = 'goal-card';
        
        goalCard.innerHTML = `
            <div class="goal-header">
                <div class="goal-name">${goal.name}</div>
                <button class="goal-btn" onclick="editGoal('${goal.id}')">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
            <div class="goal-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="progress-text">
                    <span>${formatCurrency(goal.currentAmount)}</span>
                    <span>${formatCurrency(goal.targetAmount)}</span>
                </div>
            </div>
            <div class="goal-actions">
                <button class="goal-btn" onclick="addToGoal('${goal.id}')">إضافة مبلغ</button>
                <button class="goal-btn" onclick="deleteGoal('${goal.id}')">حذف</button>
            </div>
        `;
        
        goalsContainer.appendChild(goalCard);
    });
}

// Update quick stats
function updateQuickStats() {
    // Get user's transactions only
    const userTransactions = getUserTransactions();
    
    // Calculate statistics based on user's transactions
    const totalBalance = userBanksAndWallets.reduce((sum, account) => sum + account.balance, 0);
    const monthlyIncome = userTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    const monthlyExpenses = userTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const transactionCount = userTransactions.length;
    const savings = monthlyIncome - monthlyExpenses;
    
    // Update balance cards
    updateBalanceCard('.balance-card:nth-child(2) .amount', monthlyIncome);
    updateBalanceCard('.balance-card:nth-child(3) .amount', monthlyExpenses);
    
    // Update stat cards
    updateStatCard('.stat-card:nth-child(1) .stat-number', userBanksAndWallets.length);
    updateStatCard('.stat-card:nth-child(2) .stat-number', transactionCount);
    updateStatCard('.stat-card:nth-child(3) .stat-number', formatCurrency(savings));
}

// Update balance card
function updateBalanceCard(selector, amount) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = formatCurrency(amount);
    }
}

// Update stat card
function updateStatCard(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = value;
    }
}

// ===================================================================
// ANALYTICS DATA LOADING
// ===================================================================

// Load analytics data
function loadAnalyticsData() {
    // Load expense chart
    loadExpenseChart();
    
    // Load monthly trend chart
    loadMonthlyTrendChart();
    
    // Load budget categories
    loadBudgetCategories();
    
    // Update expense statistics
    updateExpenseStatistics();
}

// Load expense chart
function loadExpenseChart() {
    const ctx = document.getElementById('expenseChart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (expenseChart) {
        expenseChart.destroy();
    }
    
    // Calculate expense distribution
    const expenseData = calculateExpenseDistribution();
    
    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: expenseData.labels,
            datasets: [{
                data: expenseData.values,
                backgroundColor: [
                    '#2563eb', '#10b981', '#f59e0b', '#ef4444',
                    '#8b5cf6', '#06b6d4', '#84cc16', '#f97316',
                    '#ec4899', '#6b7280'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            family: 'Cairo',
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'توزيع المصروفات حسب الفئة',
                    font: {
                        family: 'Cairo',
                        size: 16,
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

// Load monthly trend chart
function loadMonthlyTrendChart() {
    const ctx = document.getElementById('monthlyTrendChart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (monthlyTrendChart) {
        monthlyTrendChart.destroy();
    }
    
    // Generate monthly trend data
    const trendData = generateMonthlyTrendData();
    
    monthlyTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: trendData.labels,
            datasets: [{
                label: 'الإيرادات',
                data: trendData.income,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4
            }, {
                label: 'المصروفات',
                data: trendData.expenses,
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Cairo',
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'الاتجاه الشهري للإيرادات والمصروفات',
                    font: {
                        family: 'Cairo',
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            family: 'Cairo'
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            family: 'Cairo'
                        }
                    }
                }
            }
        }
    });
}

// Calculate expense distribution
function calculateExpenseDistribution() {
    const categories = {};
    
    // Use user's transactions only
    const userTransactions = getUserTransactions();
    
    userTransactions
        .filter(t => t.type === 'expense')
        .forEach(transaction => {
            const category = transaction.category;
            if (!categories[category]) {
                categories[category] = 0;
            }
            categories[category] += Math.abs(transaction.amount);
        });
    
    return {
        labels: Object.keys(categories),
        values: Object.values(categories)
    };
}

// Generate monthly trend data
function generateMonthlyTrendData() {
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'];
    const income = [1200, 1200, 1200, 1200, 1200, 1200, 1200];
    const expenses = [950, 1100, 890, 1050, 920, 980, 865];
    
    return {
        labels: months,
        income: income,
        expenses: expenses
    };
}

// Load budget categories
function loadBudgetCategories() {
    const budgetContainer = document.getElementById('budgetCategories');
    if (!budgetContainer) return;
    
    const categories = [
        { name: 'طعام', spent: 285.50, budget: 300, color: '#2563eb' },
        { name: 'مواصلات', spent: 62.75, budget: 100, color: '#10b981' },
        { name: 'فواتير', spent: 115.00, budget: 150, color: '#f59e0b' },
        { name: 'تسوق', spent: 120.25, budget: 200, color: '#ef4444' },
        { name: 'صحة', spent: 136.00, budget: 150, color: '#8b5cf6' },
        { name: 'ترفيه', spent: 16.00, budget: 80, color: '#06b6d4' },
        { name: 'تعليم', spent: 65.00, budget: 100, color: '#84cc16' },
        { name: 'عناية شخصية', spent: 20.00, budget: 50, color: '#f97316' }
    ];
    
    budgetContainer.innerHTML = '';
    
    categories.forEach(category => {
        const percentage = (category.spent / category.budget) * 100;
        const progressClass = percentage > 90 ? 'danger' : percentage > 70 ? 'warning' : '';
        
        const categoryCard = document.createElement('div');
        categoryCard.className = 'budget-category';
        
        categoryCard.innerHTML = `
            <div class="budget-category-header">
                <div class="category-name">${category.name}</div>
                <div class="category-spent">${formatCurrency(category.spent)}</div>
            </div>
            <div class="category-progress">
                <div class="category-progress-fill ${progressClass}" style="width: ${percentage}%"></div>
            </div>
            <div class="category-budget">من ${formatCurrency(category.budget)}</div>
        `;
        
        budgetContainer.appendChild(categoryCard);
    });
}

// Update expense statistics
function updateExpenseStatistics() {
    // Use user's transactions only
    const userTransactions = getUserTransactions();
    
    const totalExpenses = userTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const expensesByCategory = calculateExpenseDistribution();
    
    if (expensesByCategory.values.length === 0) {
        // No expenses found, show default values
        updateStatistics({
            totalExpenses: 0,
            highestCategory: { name: 'لا توجد', amount: 0 },
            lowestCategory: { name: 'لا توجد', amount: 0 },
            transactionCount: 0,
            avgTransaction: 0,
            comparison: 0
        });
        return;
    }
    
    const highestCategoryIndex = expensesByCategory.values.indexOf(Math.max(...expensesByCategory.values));
    const lowestCategoryIndex = expensesByCategory.values.indexOf(Math.min(...expensesByCategory.values));
    
    const transactionCount = userTransactions.filter(t => t.type === 'expense').length;
    const avgTransaction = transactionCount > 0 ? totalExpenses / transactionCount : 0;
    
    // Update statistics display
    updateStatistics({
        totalExpenses,
        highestCategory: { 
            name: expensesByCategory.labels[highestCategoryIndex], 
            amount: expensesByCategory.values[highestCategoryIndex] 
        },
        lowestCategory: { 
            name: expensesByCategory.labels[lowestCategoryIndex], 
            amount: expensesByCategory.values[lowestCategoryIndex] 
        },
        transactionCount,
        avgTransaction,
        comparison: -12.5
    });
}

// Update statistics display
function updateStatistics(stats) {
    const statsElements = document.querySelectorAll('.stat-value');
    if (statsElements.length >= 6) {
        statsElements[0].textContent = formatCurrency(stats.totalExpenses);
        statsElements[1].textContent = `${stats.highestCategory.name} (${formatCurrency(stats.highestCategory.amount)})`;
        statsElements[2].textContent = `${stats.lowestCategory.name} (${formatCurrency(stats.lowestCategory.amount)})`;
        statsElements[3].textContent = `${stats.transactionCount} معاملة`;
        statsElements[4].textContent = `${stats.comparison}%`;
        statsElements[4].className = `stat-value ${stats.comparison > 0 ? 'negative' : 'positive'}`;
        statsElements[5].textContent = formatCurrency(stats.avgTransaction);
    }
}

// Refresh expense chart
function refreshExpenseChart() {
    loadExpenseChart();
    showSuccessMessage('تم تحديث البيانات');
}

// ===================================================================
// TRANSACTIONS DATA LOADING
// ===================================================================

// Load transactions data
function loadTransactionsData() {
    loadTransactionsTable();
}

// Load transactions table
function loadTransactionsTable() {
    const tableBody = document.getElementById('transactionsTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    // Get user's transactions only
    const userTransactions = getUserTransactions();
    
    if (userTransactions.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="6" style="text-align: center; padding: 2rem; color: var(--gray-500);">
                <i class="fas fa-exchange-alt" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                لا توجد معاملات لعرضها. أضف حسابات بنكية لتظهر المعاملات.
            </td>
        `;
        tableBody.appendChild(emptyRow);
        return;
    }
    
    userTransactions.forEach(transaction => {
        const row = document.createElement('tr');
        const amountClass = transaction.amount > 0 ? 'amount-positive' : 'amount-negative';
        const amountSymbol = transaction.amount > 0 ? '+' : '';
        
        row.innerHTML = `
            <td>${formatDate(transaction.date)}</td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td>${transaction.account}</td>
            <td class="${amountClass}">${amountSymbol}${formatCurrency(Math.abs(transaction.amount))}</td>
            <td>${formatCurrency(transaction.balance)}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Filter transactions
function filterTransactions() {
    const typeFilter = document.getElementById('transactionFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    // Start with user's transactions only
    let filteredTransactions = getUserTransactions();
    
    if (typeFilter !== 'all') {
        filteredTransactions = filteredTransactions.filter(t => t.type === typeFilter);
    }
    
    if (categoryFilter !== 'all') {
        filteredTransactions = filteredTransactions.filter(t => t.category === categoryFilter);
    }
    
    // Update table with filtered data
    const tableBody = document.getElementById('transactionsTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (filteredTransactions.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="6" style="text-align: center; padding: 2rem; color: var(--gray-500);">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                لا توجد معاملات تطابق معايير البحث المحددة
            </td>
        `;
        tableBody.appendChild(emptyRow);
        return;
    }
    
    filteredTransactions.forEach(transaction => {
        const row = document.createElement('tr');
        const amountClass = transaction.amount > 0 ? 'amount-positive' : 'amount-negative';
        const amountSymbol = transaction.amount > 0 ? '+' : '';
        
        row.innerHTML = `
            <td>${formatDate(transaction.date)}</td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td>${transaction.account}</td>
            <td class="${amountClass}">${amountSymbol}${formatCurrency(Math.abs(transaction.amount))}</td>
            <td>${formatCurrency(transaction.balance)}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// ===================================================================
// BANKS DATA LOADING
// ===================================================================

// Load banks data
function loadBanksData() {
    const banksGrid = document.getElementById('banksGrid');
    if (!banksGrid) return;
    
    banksGrid.innerHTML = '';
    
    if (userBanksAndWallets.length === 0) {
        banksGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-university"></i>
                <p>لا توجد حسابات بنكية مضافة</p>
                <button class="btn primary" onclick="showAddBankAccount()">
                    <i class="fas fa-plus"></i>
                    إضافة حساب بنكي
                </button>
            </div>
        `;
        return;
    }
    
    userBanksAndWallets.forEach(bank => {
        const bankCard = document.createElement('div');
        bankCard.className = 'bank-card';
        
        bankCard.innerHTML = `
            <div class="bank-header">
                <div class="bank-name">${bank.name}</div>
                <div class="bank-logo">
                    <i class="fas fa-university"></i>
                </div>
            </div>
            <div class="bank-details">
                <div class="bank-balance">${formatCurrency(bank.balance)}</div>
                <div class="bank-account">رقم الحساب: ${bank.accountNumber}</div>
            </div>
            <div class="bank-actions">
                <button class="bank-btn" onclick="refreshBankBalance('${bank.name}')">
                    <i class="fas fa-sync-alt"></i>
                    تحديث
                </button>
                <button class="bank-btn danger" onclick="removeBankAccount('${bank.name}')">
                    <i class="fas fa-trash"></i>
                    حذف
                </button>
            </div>
        `;
        
        banksGrid.appendChild(bankCard);
    });
}

// Refresh bank balance
function refreshBankBalance(bankName) {
    showLoadingOverlay('جاري تحديث الرصيد...');
    
    setTimeout(() => {
        // Simulate balance update
        const bank = userBanksAndWallets.find(b => b.name === bankName);
        if (bank) {
            bank.balance += Math.random() * 100 - 50; // Random change
            bank.balance = Math.max(0, bank.balance); // Ensure non-negative
        }
        
        hideLoadingOverlay();
        loadBanksData();
        updateTotalBalance();
        showSuccessMessage('تم تحديث الرصيد بنجاح');
    }, 2000);
}

// Remove bank account
function removeBankAccount(bankName) {
    if (confirm('هل أنت متأكد من حذف هذا الحساب؟')) {
        userBanksAndWallets = userBanksAndWallets.filter(b => b.name !== bankName);
        
        // Update user's accounts
        if (currentUser) {
            currentUser.accounts = currentUser.accounts.filter(acc => acc !== bankName);
            localStorage.setItem('hasabak_user', JSON.stringify(currentUser));
        }
        
        loadBanksData();
        updateTotalBalance();
        showSuccessMessage('تم حذف الحساب بنجاح');
    }
}

// ===================================================================
// LOANS DATA LOADING
// ===================================================================



// Show loan tab
function showLoanTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.loan-tab-content').forEach(tab => {
        tab.style.display = 'none';
        tab.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName === 'offers' ? 'loanOffersTab' : 
                                              tabName === 'applications' ? 'loanApplicationsTab' : 
                                              'loanCalculatorTab');
    if (selectedTab) {
        selectedTab.style.display = 'block';
        selectedTab.classList.add('active');
    }
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    const activeButton = document.querySelector(`[onclick="showLoanTab('${tabName}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    currentLoanTab = tabName;
    
    // Load content based on selected tab
    if (tabName === 'offers') {
        loadLoanOffers();
    } else if (tabName === 'applications') {
        loadLoanApplications();
    } else if (tabName === 'calculator') {
        // Initialize calculator if needed
        initializeLoanCalculator();
    }
}

// Load loan offers based on user's banks
function loadLoanOffers() {
    const offersGrid = document.getElementById('loanOffersGrid');
    if (!offersGrid) return;
    
    offersGrid.innerHTML = '';
    
    // Get user's banks (from mockBanks array)
    const userBanks = mockBanks;
    
    userBanks.forEach(userBank => {
        const bankName = userBank.name;
        const bankData = bankOffers[bankName];
        
        if (bankData) {
            // Add bank header
            const bankSection = document.createElement('div');
            bankSection.className = 'bank-offers-section';
            bankSection.innerHTML = `
                <div class="bank-header">
                    <h3><i class="fas fa-university"></i> ${bankName}</h3>
                    <span class="bank-account">حساب رقم ${userBank.accountNumber}</span>
                </div>
            `;
            
            // Add loan offers
            bankData.loans.forEach(offer => {
                const offerCard = document.createElement('div');
                offerCard.className = 'loan-offer-card';
                
                offerCard.innerHTML = `
                    <div class="loan-type">${offer.type}</div>
                    <div class="loan-amount">${formatCurrency(offer.amount)}</div>
                    <div class="loan-details">
                        <div class="loan-detail">
                            <div class="loan-detail-label">نسبة الفائدة</div>
                            <div class="loan-detail-value">${offer.interestRate}%</div>
                        </div>
                        <div class="loan-detail">
                            <div class="loan-detail-label">المدة</div>
                            <div class="loan-detail-value">${offer.duration}</div>
                        </div>
                        <div class="loan-detail">
                            <div class="loan-detail-label">القسط الشهري</div>
                            <div class="loan-detail-value">${formatCurrency(offer.monthlyPayment)}</div>
                        </div>
                    </div>
                    <div class="loan-features">
                        <h4>المميزات:</h4>
                        <ul>
                            ${offer.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <button class="apply-loan-btn" onclick="applyForLoan('${offer.id}', '${bankName}')">
                        <i class="fas fa-paper-plane"></i>
                        التقديم للقرض
                    </button>
                `;
                
                bankSection.appendChild(offerCard);
            });
            
            // Add bank promotions
            if (bankData.promotions && bankData.promotions.length > 0) {
                const promotionsSection = document.createElement('div');
                promotionsSection.className = 'bank-promotions';
                promotionsSection.innerHTML = `
                    <h4><i class="fas fa-gift"></i> العروض الخاصة</h4>
                    <div class="promotions-grid"></div>
                `;
                
                const promotionsGrid = promotionsSection.querySelector('.promotions-grid');
                
                bankData.promotions.forEach(promo => {
                    const promoCard = document.createElement('div');
                    promoCard.className = 'promotion-card';
                    
                    let benefitText = '';
                    if (promo.cashback) {
                        benefitText = `<span class="benefit-value">${promo.cashback}</span> كاش باك`;
                    } else if (promo.discount) {
                        benefitText = `خصم <span class="benefit-value">${promo.discount}</span>`;
                    } else if (promo.points) {
                        benefitText = `<span class="benefit-value">${promo.points}</span>`;
                    }
                    
                    promoCard.innerHTML = `
                        <div class="promo-icon">
                            <i class="fas fa-percentage"></i>
                        </div>
                        <div class="promo-content">
                            <h5>${promo.title}</h5>
                            <p>${promo.description}</p>
                            <div class="promo-benefit">${benefitText}</div>
                            <div class="promo-details">
                                <small><i class="fas fa-tag"></i> ${promo.category}</small>
                                <small><i class="fas fa-calendar"></i> صالح حتى ${promo.validUntil}</small>
                                ${promo.maxAmount ? `<small><i class="fas fa-coins"></i> حد أقصى ${promo.maxAmount}</small>` : ''}
                            </div>
                        </div>
                        <button class="activate-promo-btn" onclick="activatePromotion('${promo.title}', '${bankName}')">
                            <i class="fas fa-check"></i>
                            تفعيل
                        </button>
                    `;
                    
                    promotionsGrid.appendChild(promoCard);
                });
                
                bankSection.appendChild(promotionsSection);
            }
            
            offersGrid.appendChild(bankSection);
        }
    });
    
    // If no banks found, show message
    if (userBanks.length === 0) {
        offersGrid.innerHTML = `
            <div class="no-offers-message">
                <i class="fas fa-info-circle"></i>
                <h3>لا توجد عروض متاحة</h3>
                <p>أضف حساباتك البنكية أولاً لعرض العروض الخاصة بك</p>
                <button class="btn primary" onclick="showAddBankAccount()">
                    <i class="fas fa-plus"></i>
                    إضافة حساب بنكي
                </button>
            </div>
        `;
    }
}

// Load loan applications
function loadLoanApplications() {
    const applicationsList = document.getElementById('loanApplicationsList');
    if (!applicationsList) return;
    
    applicationsList.innerHTML = '';
    
    if (mockLoanApplications.length === 0) {
        applicationsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-alt"></i>
                <p>لا توجد طلبات قروض</p>
                <p>تصفح العروض المتاحة وقدم طلبك</p>
            </div>
        `;
        return;
    }
    
    mockLoanApplications.forEach(application => {
        const applicationCard = document.createElement('div');
        applicationCard.className = 'loan-application-card';
        
        applicationCard.innerHTML = `
            <div class="application-header">
                <div class="application-id">طلب رقم: ${application.id}</div>
                <div class="application-status ${application.status}">
                    ${getStatusText(application.status)}
                </div>
            </div>
            <div class="application-details">
                <div class="application-detail">
                    <div class="application-detail-label">البنك</div>
                    <div class="application-detail-value">${application.bank}</div>
                </div>
                <div class="application-detail">
                    <div class="application-detail-label">المبلغ</div>
                    <div class="application-detail-value">${formatCurrency(application.amount)}</div>
                </div>
                <div class="application-detail">
                    <div class="application-detail-label">النوع</div>
                    <div class="application-detail-value">${application.type}</div>
                </div>
                <div class="application-detail">
                    <div class="application-detail-label">تاريخ التقديم</div>
                    <div class="application-detail-value">${formatDate(application.applicationDate)}</div>
                </div>
            </div>
        `;
        
        applicationsList.appendChild(applicationCard);
    });
}

// Activate promotion
function activatePromotion(promoTitle, bankName) {
    showSuccessMessage(`تم تفعيل عرض "${promoTitle}" من ${bankName} بنجاح!`);
    
    // Here you would typically make an API call to activate the promotion
    console.log(`Activating promotion: ${promoTitle} for bank: ${bankName}`);
}

// Apply for loan with bank context
function applyForLoan(loanId, bankName) {
    console.log('applyForLoan called with:', loanId, bankName);
    
    const modal = document.getElementById('loanApplicationModal');
    const form = document.getElementById('loanApplicationForm');
    
    if (!modal) {
        console.error('Modal not found: loanApplicationModal');
        showErrorMessage('خطأ في النظام - لا يمكن فتح نموذج التقديم');
        return;
    }
    
    if (!form) {
        console.error('Form not found: loanApplicationForm');
        showErrorMessage('خطأ في النظام - لا يمكن إنشاء النموذج');
        return;
    }
    
    // Reset asset counter
    window.assetCounter = 1;
    
    // Create comprehensive loan application form
    form.innerHTML = `
        <div class="loan-form-container">
            <div class="form-header">
                <h3>طلب قرض من ${bankName}</h3>
                <p>يرجى ملء جميع البيانات المطلوبة بدقة</p>
            </div>
            
            <!-- معلومات الطلب -->
            <div class="form-section">
                <h4><i class="fas fa-file-alt"></i> معلومات الطلب</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="loanAmount">قيمة القرض (دينار) *</label>
                        <input type="number" id="loanAmount" class="form-control" min="1000" max="500000" required>
                    </div>
                    <div class="form-group">
                        <label for="downPayment">الدفعة المسبقة (دينار)</label>
                        <input type="number" id="downPayment" class="form-control" min="0">
                    </div>
                </div>
                <div class="form-group">
                    <label for="loanPurpose">سبب القرض *</label>
                    <select id="loanPurpose" class="form-control" required>
                        <option value="">اختر سبب القرض</option>
                        <option value="home">شراء منزل</option>
                        <option value="car">شراء سيارة</option>
                        <option value="education">تعليم</option>
                        <option value="medical">علاج طبي</option>
                        <option value="business">استثمار تجاري</option>
                        <option value="personal">شخصي</option>
                        <option value="other">أخرى</option>
                    </select>
                </div>
            </div>

            <!-- المعلومات الشخصية -->
            <div class="form-section">
                <h4><i class="fas fa-user"></i> المعلومات الشخصية</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="fullNameArabic">الاسم الكامل بالعربي *</label>
                        <input type="text" id="fullNameArabic" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="fullNameEnglish">الاسم الكامل بالإنجليزي *</label>
                        <input type="text" id="fullNameEnglish" class="form-control" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="dateOfBirth">تاريخ الميلاد *</label>
                        <input type="date" id="dateOfBirth" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="nationalId">الرقم الوطني *</label>
                        <input type="text" id="nationalId" class="form-control" required>
                    </div>
                </div>
            </div>

            <!-- معلومات الإقامة والتواصل -->
            <div class="form-section">
                <h4><i class="fas fa-home"></i> معلومات الإقامة والتواصل</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="city">المدينة *</label>
                        <input type="text" id="city" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="postalCode">الرمز البريدي</label>
                        <input type="text" id="postalCode" class="form-control">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="email">البريد الإلكتروني *</label>
                        <input type="email" id="email" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">رقم الهاتف *</label>
                        <input type="tel" id="phone" class="form-control" required>
                    </div>
                </div>
            </div>

            <!-- معلومات الضمان الاجتماعي -->
            <div class="form-section">
                <h4><i class="fas fa-shield-alt"></i> معلومات الضمان الاجتماعي</h4>
                <div class="form-group">
                    <label>هل أنت مسجل في الضمان الاجتماعي؟ *</label>
                    <div class="radio-group">
                        <label class="radio-label">
                            <input type="radio" name="socialSecurity" value="yes" onchange="toggleSocialSecurityInfo(true)">
                            <span class="radio-custom"></span>
                            نعم
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="socialSecurity" value="no" onchange="toggleSocialSecurityInfo(false)">
                            <span class="radio-custom"></span>
                            لا
                        </label>
                    </div>
                </div>
                <div id="socialSecurityInfo" class="form-subsection" style="display: none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="socialSecurityNumber">رقم الضمان الاجتماعي</label>
                            <input type="text" id="socialSecurityNumber" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="netSalary">الراتب الصافي (دينار)</label>
                            <input type="number" id="netSalary" class="form-control" min="0">
                        </div>
                    </div>
                </div>
            </div>

            <!-- معلومات الشركة -->
            <div class="form-section" id="companyInfo">
                <h4><i class="fas fa-building"></i> معلومات الشركة</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="companyNameArabic">اسم الشركة بالعربي *</label>
                        <input type="text" id="companyNameArabic" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="companyNameEnglish">اسم الشركة بالإنجليزي *</label>
                        <input type="text" id="companyNameEnglish" class="form-control" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="companyEstablished">متى تأسست الشركة</label>
                        <input type="date" id="companyEstablished" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="employmentStart">تاريخ بداية العمل</label>
                        <input type="date" id="employmentStart" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label for="contractType">نوع العقد *</label>
                    <select id="contractType" class="form-control" required>
                        <option value="">اختر نوع العقد</option>
                        <option value="permanent">دائم</option>
                        <option value="temporary">مؤقت</option>
                        <option value="contract">عقد مشروع</option>
                        <option value="freelance">عمل حر</option>
                    </select>
                </div>
            </div>

            <!-- معلومات الضمانات -->
            <div class="form-section">
                <h4><i class="fas fa-key"></i> الضمانات للبنك</h4>
                <div class="form-group">
                    <label for="guaranteeType">نوع الضمان *</label>
                    <select id="guaranteeType" class="form-control" required onchange="showGuaranteeDetails(this.value)">
                        <option value="">اختر نوع الضمان</option>
                        <option value="land">أرض</option>
                        <option value="house">بيت</option>
                        <option value="car">سيارة</option>
                        <option value="salary">راتب</option>
                        <option value="bank_guarantee">ضمان مصرفي</option>
                        <option value="other">أخرى</option>
                    </select>
                </div>
                
                <div id="guaranteeDetails">
                    <div id="landDetails" class="guarantee-details" style="display: none;">
                        <div class="form-group">
                            <label for="landNumber">رقم الأرض</label>
                            <input type="text" id="landNumber" class="form-control">
                        </div>
                    </div>
                    
                    <div id="carDetails" class="guarantee-details" style="display: none;">
                        <div class="form-group">
                            <label for="carNumber">رقم السيارة</label>
                            <input type="text" id="carNumber" class="form-control">
                        </div>
                    </div>
                    
                    <div id="houseDetails" class="guarantee-details" style="display: none;">
                        <div class="form-group">
                            <label for="houseNumber">رقم البيت</label>
                            <input type="text" id="houseNumber" class="form-control">
                        </div>
                    </div>
                </div>
            </div>

            <!-- تفاصيل الأصول -->
            <div class="form-section">
                <h4><i class="fas fa-coins"></i> تفاصيل الأصول</h4>
                <div id="assetsContainer">
                    <div class="asset-item" data-asset-index="0">
                        <div class="asset-header">
                            <h5>الأصل رقم 1</h5>
                            <button type="button" class="btn-remove-asset" onclick="removeAsset(0)" style="display: none;">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="assetType_0">نوع الأصل</label>
                                <select id="assetType_0" class="form-control" onchange="showAssetDetails(0, this.value)">
                                    <option value="">اختر نوع الأصل</option>
                                    <option value="house">بيت</option>
                                    <option value="car">سيارة</option>
                                    <option value="land">أرض</option>
                                    <option value="business">مشروع تجاري</option>
                                    <option value="savings">مدخرات</option>
                                    <option value="other">أخرى</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="assetNumber_0">رقم الأصل</label>
                                <input type="text" id="assetNumber_0" class="form-control">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="assetValue_0">السعر التقديري (دينار)</label>
                                <input type="number" id="assetValue_0" class="form-control" min="0">
                            </div>
                            <div class="form-group">
                                <label>يمكن تقديمها كضمان؟</label>
                                <div class="radio-group">
                                    <label class="radio-label">
                                        <input type="radio" name="canGuarantee_0" value="yes">
                                        <span class="radio-custom"></span>
                                        نعم
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="canGuarantee_0" value="no">
                                        <span class="radio-custom"></span>
                                        لا
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div id="assetSpecDetails_0" class="asset-spec-details"></div>
                    </div>
                </div>
                <button type="button" class="btn secondary" onclick="addAsset()">
                    <i class="fas fa-plus"></i>
                    إضافة أصل جديد
                </button>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn primary">
                    <i class="fas fa-paper-plane"></i>
                    تقديم الطلب
                </button>
                <button type="button" class="btn secondary" onclick="closeModal('loanApplicationModal')">
                    إلغاء
                </button>
            </div>
        </div>
    `;
    
    // Add form submission handler
    form.onsubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
        submitComprehensiveLoanApplication(loanId, bankName);
    };
    
    // Show modal
    console.log('Showing modal');
    modal.style.display = 'flex';
    modal.classList.add('show');
    
    // Add backdrop click to close
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeModal('loanApplicationModal');
        }
    };
}

// Submit loan application
function submitLoanApplication(loanId, bankName) {
    const formData = {
        loanId: loanId,
        bank: bankName,
        amount: parseFloat(document.getElementById('loanAmountApplication').value),
        name: document.getElementById('applicantName').value,
        nationalId: document.getElementById('applicantNationalId').value,
        phone: document.getElementById('applicantPhone').value,
        salary: parseFloat(document.getElementById('applicantSalary').value),
        employmentType: document.getElementById('employmentType').value
    };
    
    // Validate form data
    if (!formData.amount || !formData.name || !formData.nationalId || !formData.phone || !formData.salary || !formData.employmentType) {
        showErrorMessage('يرجى إكمال جميع الحقول المطلوبة');
        return;
    }
    
    // Create new loan application
    const newApplication = {
        id: 'APP' + (Date.now().toString().slice(-6)),
        loanId: loanId,
        bank: bankName,
        amount: formData.amount,
        type: 'قرض شخصي', // Default type, can be enhanced later
        status: 'pending',
        applicationDate: new Date().toISOString().split('T')[0],
        expectedDecision: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        applicantName: formData.name,
        nationalId: formData.nationalId,
        phone: formData.phone,
        salary: formData.salary,
        employmentType: formData.employmentType
    };
    
    // Add to mockLoanApplications array
    mockLoanApplications.push(newApplication);
    
    // Close modal and show success message
    closeModal('loanApplicationModal');
    showSuccessMessage(`تم تقديم طلب القرض إلى ${bankName} بنجاح! سيتم التواصل معك خلال 24 ساعة.`);
    
    // Refresh loan applications display if currently viewing
    if (currentDashboardSection === 'loans' && currentLoanTab === 'applications') {
        loadLoanApplications();
    }
    
    // Add notification
    const notification = {
        id: 'NOT' + Date.now(),
        type: 'info',
        title: 'تم تقديم طلب القرض',
        message: `تم تقديم طلب قرض بمبلغ ${formatCurrency(formData.amount)} إلى ${bankName}`,
        date: new Date().toISOString().split('T')[0],
        read: false
    };
    mockNotifications.unshift(notification);
    updateNotificationBadge();
    
    console.log('Loan application submitted:', formData);
    console.log('New application:', newApplication);
}

// Submit comprehensive loan application
function submitComprehensiveLoanApplication(loanId, bankName) {
    const formData = {
        // معلومات الطلب
        loanAmount: parseFloat(document.getElementById('loanAmount').value),
        downPayment: parseFloat(document.getElementById('downPayment').value) || 0,
        loanPurpose: document.getElementById('loanPurpose').value,
        
        // المعلومات الشخصية
        fullNameArabic: document.getElementById('fullNameArabic').value,
        fullNameEnglish: document.getElementById('fullNameEnglish').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        nationalId: document.getElementById('nationalId').value,
        
        // معلومات الإقامة والتواصل
        city: document.getElementById('city').value,
        postalCode: document.getElementById('postalCode').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        
        // معلومات الضمان الاجتماعي
        socialSecurity: document.querySelector('input[name="socialSecurity"]:checked')?.value,
        socialSecurityNumber: document.getElementById('socialSecurityNumber').value,
        netSalary: parseFloat(document.getElementById('netSalary').value) || 0,
        
        // معلومات الشركة
        companyNameArabic: document.getElementById('companyNameArabic').value,
        companyNameEnglish: document.getElementById('companyNameEnglish').value,
        companyEstablished: document.getElementById('companyEstablished').value,
        employmentStart: document.getElementById('employmentStart').value,
        contractType: document.getElementById('contractType').value,
        
        // معلومات الضمانات
        guaranteeType: document.getElementById('guaranteeType').value,
        
        // تفاصيل الأصول
        assets: collectAssetsData()
    };
    
    // Validate required fields
    const requiredFields = [
        'loanAmount', 'loanPurpose', 'fullNameArabic', 'fullNameEnglish', 
        'dateOfBirth', 'nationalId', 'city', 'email', 'phone', 
        'companyNameArabic', 'companyNameEnglish', 'contractType', 'guaranteeType'
    ];
    
    for (const field of requiredFields) {
        if (!formData[field]) {
            showErrorMessage(`يرجى إكمال حقل: ${getFieldLabel(field)}`);
            return;
        }
    }
    
    // Additional guarantee details
    if (formData.guaranteeType === 'land') {
        formData.landNumber = document.getElementById('landNumber').value;
    } else if (formData.guaranteeType === 'car') {
        formData.carNumber = document.getElementById('carNumber').value;
    } else if (formData.guaranteeType === 'house') {
        formData.houseNumber = document.getElementById('houseNumber').value;
    }
    
    // Create comprehensive loan application
    const newApplication = {
        id: 'APP' + (Date.now().toString().slice(-6)),
        loanId: loanId,
        bank: bankName,
        amount: formData.loanAmount,
        downPayment: formData.downPayment,
        type: formData.loanPurpose,
        status: 'pending',
        applicationDate: new Date().toISOString().split('T')[0],
        expectedDecision: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        applicantData: formData
    };
    
    // Add to mockLoanApplications array
    mockLoanApplications.push(newApplication);
    
    // Close modal and show success message
    closeModal('loanApplicationModal');
    showSuccessMessage(`تم تقديم طلب القرض إلى ${bankName} بنجاح! سيتم مراجعة الطلب والتواصل معك خلال 48 ساعة.`);
    
    // Refresh loan applications display if currently viewing
    if (currentDashboardSection === 'loans' && currentLoanTab === 'applications') {
        loadLoanApplications();
    }
    
    // Add notification
    const notification = {
        id: 'NOT' + Date.now(),
        type: 'info',
        title: 'تم تقديم طلب القرض',
        message: `تم تقديم طلب قرض بمبلغ ${formatCurrency(formData.loanAmount)} إلى ${bankName}`,
        date: new Date().toISOString().split('T')[0],
        read: false
    };
    mockNotifications.unshift(notification);
    updateNotificationBadge();
    
    console.log('Comprehensive loan application submitted:', formData);
    console.log('New application:', newApplication);
}

// Helper functions for the new loan form
function toggleSocialSecurityInfo(show) {
    const socialSecurityInfo = document.getElementById('socialSecurityInfo');
    if (socialSecurityInfo) {
        socialSecurityInfo.style.display = show ? 'block' : 'none';
        
        const socialSecurityNumber = document.getElementById('socialSecurityNumber');
        const netSalary = document.getElementById('netSalary');
        
        if (show) {
            socialSecurityNumber.setAttribute('required', 'required');
            netSalary.setAttribute('required', 'required');
        } else {
            socialSecurityNumber.removeAttribute('required');
            netSalary.removeAttribute('required');
            socialSecurityNumber.value = '';
            netSalary.value = '';
        }
    }
}

function showGuaranteeDetails(guaranteeType) {
    // Hide all guarantee details
    const allDetails = document.querySelectorAll('.guarantee-details');
    allDetails.forEach(detail => detail.style.display = 'none');
    
    // Show specific details based on type
    if (guaranteeType === 'land') {
        const landDetails = document.getElementById('landDetails');
        if (landDetails) landDetails.style.display = 'block';
    } else if (guaranteeType === 'car') {
        const carDetails = document.getElementById('carDetails');
        if (carDetails) carDetails.style.display = 'block';
    } else if (guaranteeType === 'house') {
        const houseDetails = document.getElementById('houseDetails');
        if (houseDetails) houseDetails.style.display = 'block';
    }
}

let assetCounter = 1;

function addAsset() {
    const container = document.getElementById('assetsContainer');
    if (!container) {
        console.error('Assets container not found');
        return;
    }
    
    const newAsset = document.createElement('div');
    newAsset.className = 'asset-item';
    newAsset.setAttribute('data-asset-index', assetCounter);
    
    newAsset.innerHTML = `
        <div class="asset-header">
            <h5>الأصل رقم ${assetCounter + 1}</h5>
            <button type="button" class="btn-remove-asset" onclick="removeAsset(${assetCounter})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="assetType_${assetCounter}">نوع الأصل</label>
                <select id="assetType_${assetCounter}" class="form-control" onchange="showAssetDetails(${assetCounter}, this.value)">
                    <option value="">اختر نوع الأصل</option>
                    <option value="house">بيت</option>
                    <option value="car">سيارة</option>
                    <option value="land">أرض</option>
                    <option value="business">مشروع تجاري</option>
                    <option value="savings">مدخرات</option>
                    <option value="other">أخرى</option>
                </select>
            </div>
            <div class="form-group">
                <label for="assetNumber_${assetCounter}">رقم الأصل</label>
                <input type="text" id="assetNumber_${assetCounter}" class="form-control">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="assetValue_${assetCounter}">السعر التقديري (دينار)</label>
                <input type="number" id="assetValue_${assetCounter}" class="form-control" min="0">
            </div>
            <div class="form-group">
                <label>يمكن تقديمها كضمان؟</label>
                <div class="radio-group">
                    <label class="radio-label">
                        <input type="radio" name="canGuarantee_${assetCounter}" value="yes">
                        <span class="radio-custom"></span>
                        نعم
                    </label>
                    <label class="radio-label">
                        <input type="radio" name="canGuarantee_${assetCounter}" value="no">
                        <span class="radio-custom"></span>
                        لا
                    </label>
                </div>
            </div>
        </div>
        <div id="assetSpecDetails_${assetCounter}" class="asset-spec-details"></div>
    `;
    
    container.appendChild(newAsset);
    assetCounter++;
    
    // Show remove buttons for all assets if more than one
    updateRemoveButtons();
    
    showSuccessMessage('تم إضافة أصل جديد');
}

function removeAsset(index) {
    const asset = document.querySelector(`[data-asset-index="${index}"]`);
    if (asset) {
        asset.remove();
        updateRemoveButtons();
    }
}

function updateRemoveButtons() {
    const assets = document.querySelectorAll('.asset-item');
    assets.forEach((asset, index) => {
        const removeBtn = asset.querySelector('.btn-remove-asset');
        if (removeBtn) {
            removeBtn.style.display = assets.length > 1 ? 'block' : 'none';
        }
    });
}

function showAssetDetails(index, assetType) {
    const detailsContainer = document.getElementById(`assetSpecDetails_${index}`);
    let detailsHTML = '';
    
    if (assetType === 'car') {
        detailsHTML = `
            <h6>مواصفات السيارة</h6>
            <div class="form-row">
                <div class="form-group">
                    <label for="carMake_${index}">الماركة</label>
                    <input type="text" id="carMake_${index}" class="form-control">
                </div>
                <div class="form-group">
                    <label for="carModel_${index}">الموديل</label>
                    <input type="text" id="carModel_${index}" class="form-control">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="carYear_${index}">سنة الصنع</label>
                    <input type="number" id="carYear_${index}" class="form-control" min="1990" max="2025">
                </div>
                <div class="form-group">
                    <label for="carMileage_${index}">المسافة المقطوعة (كم)</label>
                    <input type="number" id="carMileage_${index}" class="form-control" min="0">
                </div>
            </div>
        `;
    } else if (assetType === 'house') {
        detailsHTML = `
            <h6>مواصفات البيت</h6>
            <div class="form-row">
                <div class="form-group">
                    <label for="houseAge_${index}">عمر البيت (سنوات)</label>
                    <input type="number" id="houseAge_${index}" class="form-control" min="0">
                </div>
                <div class="form-group">
                    <label for="houseArea_${index}">المساحة (متر مربع)</label>
                    <input type="number" id="houseArea_${index}" class="form-control" min="0">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="houseRooms_${index}">عدد الغرف</label>
                    <input type="number" id="houseRooms_${index}" class="form-control" min="1">
                </div>
                <div class="form-group">
                    <label for="houseCondition_${index}">حالة البيت</label>
                    <select id="houseCondition_${index}" class="form-control">
                        <option value="">اختر الحالة</option>
                        <option value="excellent">ممتازة</option>
                        <option value="good">جيدة</option>
                        <option value="fair">متوسطة</option>
                        <option value="needs_renovation">يحتاج ترميم</option>
                    </select>
                </div>
            </div>
        `;
    }
    
    detailsContainer.innerHTML = detailsHTML;
}

function collectAssetsData() {
    const assets = [];
    const assetItems = document.querySelectorAll('.asset-item');
    
    assetItems.forEach(item => {
        const index = item.getAttribute('data-asset-index');
        const assetType = document.getElementById(`assetType_${index}`)?.value;
        
        if (assetType) {
            const asset = {
                type: assetType,
                number: document.getElementById(`assetNumber_${index}`)?.value,
                value: parseFloat(document.getElementById(`assetValue_${index}`)?.value) || 0,
                canGuarantee: document.querySelector(`input[name="canGuarantee_${index}"]:checked`)?.value
            };
            
            // Add specific details based on asset type
            if (assetType === 'car') {
                asset.specifications = {
                    make: document.getElementById(`carMake_${index}`)?.value,
                    model: document.getElementById(`carModel_${index}`)?.value,
                    year: document.getElementById(`carYear_${index}`)?.value,
                    mileage: document.getElementById(`carMileage_${index}`)?.value
                };
            } else if (assetType === 'house') {
                asset.specifications = {
                    age: document.getElementById(`houseAge_${index}`)?.value,
                    area: document.getElementById(`houseArea_${index}`)?.value,
                    rooms: document.getElementById(`houseRooms_${index}`)?.value,
                    condition: document.getElementById(`houseCondition_${index}`)?.value
                };
            }
            
            assets.push(asset);
        }
    });
    
    return assets;
}

function getFieldLabel(fieldName) {
    const labels = {
        'loanAmount': 'قيمة القرض',
        'loanPurpose': 'سبب القرض',
        'fullNameArabic': 'الاسم الكامل بالعربي',
        'fullNameEnglish': 'الاسم الكامل بالإنجليزي',
        'dateOfBirth': 'تاريخ الميلاد',
        'nationalId': 'الرقم الوطني',
        'city': 'المدينة',
        'email': 'البريد الإلكتروني',
        'phone': 'رقم الهاتف',
        'companyNameArabic': 'اسم الشركة بالعربي',
        'companyNameEnglish': 'اسم الشركة بالإنجليزي',
        'contractType': 'نوع العقد',
        'guaranteeType': 'نوع الضمان'
    };
    
    return labels[fieldName] || fieldName;
}

// Get status text
function getStatusText(status) {
    switch(status) {
        case 'pending': return 'قيد المراجعة';
        case 'approved': return 'تم القبول';
        case 'rejected': return 'تم الرفض';
        default: return status;
    }
}

// Enhanced Calculate loan with additional features
function calculateLoan() {
    const amount = parseFloat(document.getElementById('loanAmount').value) || 0;
    const duration = parseInt(document.getElementById('loanDuration').value) || 0;
    const rate = parseFloat(document.getElementById('interestRate').value) || 0;
    
    if (amount <= 0 || duration <= 0 || rate <= 0) {
        // Hide results if inputs are invalid
        const resultsContainer = document.getElementById('calculationResults');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
        return;
    }
    
    // Calculate monthly payment using compound interest formula
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, duration)) / 
                          (Math.pow(1 + monthlyRate, duration) - 1);
    
    const totalPayment = monthlyPayment * duration;
    const totalInterest = totalPayment - amount;
    const interestPercentage = (totalInterest / amount) * 100;
    const paymentDurationYears = duration / 12;
    
    // Update main results
    const monthlyPaymentEl = document.getElementById('monthlyPayment');
    const totalPaymentEl = document.getElementById('totalPayment');
    const totalInterestEl = document.getElementById('totalInterest');
    const interestPercentageEl = document.getElementById('interestPercentage');
    const paymentDurationEl = document.getElementById('paymentDuration');
    
    if (monthlyPaymentEl) monthlyPaymentEl.textContent = formatCurrency(monthlyPayment);
    if (totalPaymentEl) totalPaymentEl.textContent = formatCurrency(totalPayment);
    if (totalInterestEl) totalInterestEl.textContent = formatCurrency(totalInterest);
    if (interestPercentageEl) interestPercentageEl.textContent = `${interestPercentage.toFixed(1)}%`;
    if (paymentDurationEl) paymentDurationEl.textContent = `${paymentDurationYears.toFixed(1)} سنة`;
    
    // Show results with animation
    const resultsContainer = document.getElementById('calculationResults');
    if (resultsContainer) {
        resultsContainer.style.display = 'flex';
        
        // Add entrance animation
        setTimeout(() => {
            resultsContainer.style.opacity = '1';
            resultsContainer.style.transform = 'translateY(0)';
        }, 50);
    }
}

// Update slider from input
function updateFromInput(fieldName) {
    const input = document.getElementById(fieldName);
    const slider = document.getElementById(fieldName + 'Slider');
    
    if (input && slider) {
        slider.value = input.value;
    }
}

// Update input from slider
function updateFromSlider(fieldName) {
    const input = document.getElementById(fieldName);
    const slider = document.getElementById(fieldName + 'Slider');
    
    if (input && slider) {
        input.value = slider.value;
    }
}

// Reset calculator to default values
function resetCalculator() {
    // Set default values
    const defaults = {
        loanAmount: 10000,
        loanDuration: 24,
        interestRate: 4.5
    };
    
    // Update inputs and sliders
    Object.keys(defaults).forEach(fieldName => {
        const input = document.getElementById(fieldName);
        const slider = document.getElementById(fieldName + 'Slider');
        
        if (input) input.value = defaults[fieldName];
        if (slider) slider.value = defaults[fieldName];
    });
    
    // Recalculate with default values
    calculateLoan();
    
    showInfoMessage('تم إعادة تعيين الحاسبة للقيم الافتراضية');
}

// Apply for loan with calculated amount
function applyForCalculatedLoan() {
    const amount = document.getElementById('loanAmount').value;
    
    if (!amount || amount <= 0) {
        showErrorMessage('يرجى إدخال مبلغ القرض أولاً');
        return;
    }
    
    // Pre-fill loan application form
    const loanRequestAmount = document.getElementById('loanRequestAmount');
    if (loanRequestAmount) {
        loanRequestAmount.value = amount;
    }
    
    // Close calculator and open application modal
    showModal('loanApplicationModal');
    showSuccessMessage('تم نقل مبلغ القرض إلى نموذج التقديم');
}

// ===================================================================
// MODAL MANAGEMENT
// ===================================================================

// Show modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form if exists
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

// Show add bank account modal
function showAddBankAccount() {
    showModal('addBankModal');
}

// Show add goal form
function showAddGoalForm() {
    showModal('addGoalModal');
}

// Show settings modal
function showSettings() {
    // Pre-fill settings with current user data
    if (currentUser) {
        document.getElementById('settingsFullName').value = currentUser.fullName || '';
        document.getElementById('settingsEmail').value = currentUser.email || '';
        document.getElementById('settingsPhone').value = currentUser.phone || '';
        document.getElementById('settingsMonthlySalary').value = currentUser.monthlySalary || 0;
        document.getElementById('settingsHideValues').checked = valuesHidden;
    }
    
    showModal('settingsModal');
}

// ===================================================================
// FORM HANDLERS
// ===================================================================

// Handle add bank
async function handleAddBank(event) {
    event.preventDefault();
    
    const bankName = document.getElementById('modalBankSelect').value;
    
    if (!bankName) {
        showErrorMessage('يرجى اختيار البنك');
        return;
    }
    
    // Check if bank already exists
    if (userBanksAndWallets.find(bank => bank.name === bankName)) {
        showErrorMessage('البنك موجود مسبقاً');
        return;
    }
    
    showLoadingOverlay('جاري الاتصال بالبنك...');
    
    try {
        // Simulate bank connection
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Get bank balance from mock data or generate random balance
        const bankData = mockAccountBalances[bankName];
        const newBank = {
            name: bankName,
            balance: bankData ? bankData.balance : Math.floor(Math.random() * 5000) + 1000,
            accountNumber: bankData ? bankData.accountNumber : '****' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
            type: 'bank',
            lastUpdate: new Date().toISOString()
        };
        
        userBanksAndWallets.push(newBank);
        
        // Also add to mockBanks for loan offers
        if (!mockBanks.find(bank => bank.name === bankName)) {
            mockBanks.push(newBank);
        }
        
        // Update user's accounts
        if (currentUser) {
            currentUser.accounts.push(bankName);
            localStorage.setItem('hasabak_user', JSON.stringify(currentUser));
        }
        
        // Save to mock data for this session
        if (!mockAccountBalances[bankName]) {
            mockAccountBalances[bankName] = {
                balance: newBank.balance,
                type: 'bank',
                accountNumber: newBank.accountNumber,
                lastUpdate: newBank.lastUpdate
            };
        }
        
        // Generate sample transactions for the new bank
        generateSampleTransactions(bankName);
        
        closeModal('addBankModal');
        loadBanksData();
        updateTotalBalance();
        updateDashboardStats(); // Update dashboard statistics
        
        // Refresh loans section if currently viewing it
        if (currentDashboardSection === 'loans') {
            loadLoanOffers();
        }
        
        showSuccessMessage('تم إضافة البنك بنجاح');
        
    } catch (error) {
        showErrorMessage('فشل في الاتصال بالبنك، يرجى المحاولة مرة أخرى');
    } finally {
        hideLoadingOverlay();
    }
}

// Handle add goal
async function handleAddGoal(event) {
    event.preventDefault();
    
    const goalName = document.getElementById('goalName').value;
    const goalAmount = parseFloat(document.getElementById('goalAmount').value);
    const goalCurrentAmount = parseFloat(document.getElementById('goalCurrentAmount').value);
    const goalTargetDate = document.getElementById('goalTargetDate').value;
    
    if (!goalName || !goalAmount || goalAmount <= 0 || !goalTargetDate) {
        showErrorMessage('يرجى ملء جميع الحقول المطلوبة');
        return;
    }
    
    if (goalCurrentAmount > goalAmount) {
        showErrorMessage('المبلغ الحالي لا يمكن أن يكون أكبر من المبلغ المطلوب');
        return;
    }
    
    // Create new goal
    const newGoal = {
        id: 'GOAL' + (Date.now().toString().slice(-6)),
        name: goalName,
        targetAmount: goalAmount,
        currentAmount: goalCurrentAmount || 0,
        targetDate: goalTargetDate,
        createdDate: new Date().toISOString().split('T')[0]
    };
    
    // Add to goals array
    userSavingsGoals.push(newGoal);
    
    // Close modal and refresh display
    closeModal('addGoalModal');
    loadSavingsGoalsDisplay();
    showSuccessMessage('تم إضافة الهدف بنجاح');
}

// Handle loan application
async function handleLoanApplication(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const loanData = {
        amount: parseFloat(document.getElementById('loanRequestAmount').value),
        type: document.getElementById('loanType').value,
        purpose: document.getElementById('loanPurpose').value,
        fullNameArabic: document.getElementById('fullNameArabic').value,
        fullNameEnglish: document.getElementById('fullNameEnglish').value,
        nationalId: document.getElementById('nationalId').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        monthlySalary: parseFloat(document.getElementById('monthlySalary').value),
        totalAssets: parseFloat(document.getElementById('totalAssets').value),
        phone: document.getElementById('loanContactPhone').value,
        email: document.getElementById('loanContactEmail').value
    };
    
    // Validate required fields
    const requiredFields = ['amount', 'type', 'purpose', 'fullNameArabic', 'fullNameEnglish', 
                           'nationalId', 'dateOfBirth', 'monthlySalary', 'totalAssets', 'phone', 'email'];
    
    for (const field of requiredFields) {
        if (!loanData[field]) {
            showErrorMessage('يرجى ملء جميع الحقول المطلوبة');
            return;
        }
    }
    
    // Calculate estimated monthly payment (simplified calculation)
    const interestRate = 0.03; // 3% annual interest rate
    const loanTermMonths = 24; // Default 24 months
    const monthlyInterestRate = interestRate / 12;
    const estimatedMonthlyPayment = loanData.amount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) / (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
    
    // Validate salary vs monthly payment
    if (loanData.monthlySalary <= estimatedMonthlyPayment) {
        showErrorMessage(`الراتب الشهري (${formatCurrency(loanData.monthlySalary)}) يجب أن يكون أعلى من الدفعة الشهرية المقدرة (${formatCurrency(estimatedMonthlyPayment)})`);
        return;
    }
    
    showLoadingOverlay('جاري تقديم الطلب...');
    
    try {
        // Simulate loan application processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Create new application
        const newApplication = {
            id: 'APP' + (Date.now().toString().slice(-6)),
            loanId: 'LOAN' + (Date.now().toString().slice(-6)),
            bank: 'البنك الأهلي الأردني', // Default bank
            amount: loanData.amount,
            type: loanData.type,
            status: 'pending',
            applicationDate: new Date().toISOString().split('T')[0],
            expectedDecision: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        };
        
        // Add to applications
        mockLoanApplications.push(newApplication);
        
        // Add notification
        const notification = {
            id: 'NOT' + (Date.now().toString().slice(-6)),
            type: 'info',
            title: 'تم تقديم طلب القرض',
            message: `تم تقديم طلب قرض بمبلغ ${formatCurrency(loanData.amount)} بنجاح`,
            date: new Date().toISOString().split('T')[0],
            read: false
        };
        
        mockNotifications.unshift(notification);
        updateNotificationBadge();
        
        closeModal('loanApplicationModal');
        loadLoanApplications();
        showSuccessMessage('تم تقديم طلب القرض بنجاح');
        
        // Switch to applications tab
        showLoanTab('applications');
        
    } catch (error) {
        showErrorMessage('حدث خطأ أثناء تقديم الطلب');
    } finally {
        hideLoadingOverlay();
    }
}

// Save settings
function saveSettings() {
    if (!currentUser) return;
    
    const fullName = document.getElementById('settingsFullName').value;
    const email = document.getElementById('settingsEmail').value;
    const phone = document.getElementById('settingsPhone').value;
    const monthlySalary = parseFloat(document.getElementById('settingsMonthlySalary').value);
    const hideValues = document.getElementById('settingsHideValues').checked;
    
    // Update user data
    currentUser.fullName = fullName;
    currentUser.email = email;
    currentUser.phone = phone;
    currentUser.monthlySalary = monthlySalary;
    
    // Update visibility setting
    valuesHidden = hideValues;
    
    // Save to localStorage
    localStorage.setItem('hasabak_user', JSON.stringify(currentUser));
    
    closeModal('settingsModal');
    showSuccessMessage('تم حفظ الإعدادات بنجاح');
}

// ===================================================================
// GOAL MANAGEMENT
// ===================================================================

// Edit goal
function editGoal(goalId) {
    const goal = userSavingsGoals.find(g => g.id === goalId);
    if (!goal) return;
    
    // Pre-fill form with goal data
    document.getElementById('goalName').value = goal.name;
    document.getElementById('goalAmount').value = goal.targetAmount;
    document.getElementById('goalCurrentAmount').value = goal.currentAmount;
    document.getElementById('goalTargetDate').value = goal.targetDate;
    
    // Show modal
    showModal('addGoalModal');
    
    // Update form to edit mode
    const form = document.getElementById('addGoalForm');
    form.onsubmit = async function(event) {
        event.preventDefault();
        
        // Update goal
        goal.name = document.getElementById('goalName').value;
        goal.targetAmount = parseFloat(document.getElementById('goalAmount').value);
        goal.currentAmount = parseFloat(document.getElementById('goalCurrentAmount').value);
        goal.targetDate = document.getElementById('goalTargetDate').value;
        
        closeModal('addGoalModal');
        loadSavingsGoalsDisplay();
        showSuccessMessage('تم تحديث الهدف بنجاح');
        
        // Reset form handler
        form.onsubmit = handleAddGoal;
    };
}

// Add to goal
function addToGoal(goalId) {
    const amount = prompt('أدخل المبلغ الذي تريد إضافته:');
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
        const goal = userSavingsGoals.find(g => g.id === goalId);
        if (goal) {
            goal.currentAmount += parseFloat(amount);
            if (goal.currentAmount > goal.targetAmount) {
                goal.currentAmount = goal.targetAmount;
            }
            
            loadSavingsGoalsDisplay();
            showSuccessMessage('تم إضافة المبلغ بنجاح');
        }
    }
}

// Delete goal
function deleteGoal(goalId) {
    if (confirm('هل أنت متأكد من حذف هذا الهدف؟')) {
        userSavingsGoals = userSavingsGoals.filter(g => g.id !== goalId);
        loadSavingsGoalsDisplay();
        showSuccessMessage('تم حذف الهدف');
    }
}

// ===================================================================
// NOTIFICATION MANAGEMENT
// ===================================================================

// Toggle notifications panel
function toggleNotifications() {
    const panel = document.getElementById('notificationsPanel');
    if (panel) {
        notificationsPanelOpen = !notificationsPanelOpen;
        
        if (notificationsPanelOpen) {
            panel.classList.add('open');
            loadNotifications();
        } else {
            panel.classList.remove('open');
        }
    }
}

// Enhanced Load notifications with better design and interactions
function loadNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    if (!notificationsList) return;
    
    notificationsList.innerHTML = '';
    
    if (mockNotifications.length === 0) {
        notificationsList.innerHTML = `
            <div class="empty-notifications">
                <i class="fas fa-bell-slash"></i>
                <h4>لا توجد إشعارات</h4>
                <p>ستظهر الإشعارات هنا عند توفرها</p>
            </div>
        `;
        return;
    }
    
    // Group notifications by date
    const groupedNotifications = groupNotificationsByDate(mockNotifications);
    
    Object.keys(groupedNotifications).forEach(date => {
        // Add date header
        const dateHeader = document.createElement('div');
        dateHeader.className = 'notification-date-header';
        dateHeader.innerHTML = `
            <div class="date-line"></div>
            <span class="date-text">${getRelativeDateText(date)}</span>
            <div class="date-line"></div>
        `;
        notificationsList.appendChild(dateHeader);
        
        // Add notifications for this date
        groupedNotifications[date].forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.className = `notification-item ${notification.type} ${notification.read ? 'read' : 'unread'}`;
            notificationItem.setAttribute('data-notification-id', notification.id);
            
            notificationItem.innerHTML = `
                <div class="notification-icon ${notification.type}">
                    <i class="fas fa-${getNotificationIcon(notification.type)}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${formatNotificationTime(notification.date)}</div>
                </div>
                <div class="notification-actions">
                    ${!notification.read ? `
                        <button class="notification-action-btn mark-read" onclick="markAsRead('${notification.id}')" title="تعيين كمقروء">
                            <i class="fas fa-check"></i>
                        </button>
                    ` : ''}
                    <button class="notification-action-btn delete" onclick="deleteNotification('${notification.id}')" title="حذف الإشعار">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            // Add click handler for the whole notification
            notificationItem.addEventListener('click', (e) => {
                if (!e.target.closest('.notification-actions')) {
                    handleNotificationClick(notification);
                }
            });
            
            notificationsList.appendChild(notificationItem);
        });
    });
    
    // Add actions at the bottom
    if (mockNotifications.length > 0) {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'notifications-actions';
        actionsDiv.innerHTML = `
            <button class="notification-bulk-action" onclick="markAllAsRead()">
                <i class="fas fa-check-double"></i>
                تعيين الكل كمقروء
            </button>
            <button class="notification-bulk-action delete-all" onclick="clearAllNotifications()">
                <i class="fas fa-trash-alt"></i>
                حذف جميع الإشعارات
            </button>
        `;
        notificationsList.appendChild(actionsDiv);
    }
}

// Group notifications by date
function groupNotificationsByDate(notifications) {
    const groups = {};
    notifications.forEach(notification => {
        const date = notification.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(notification);
    });
    return groups;
}

// Get relative date text
function getRelativeDateText(dateStr) {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
        return 'اليوم';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'أمس';
    } else {
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Format notification time
function formatNotificationTime(dateStr) {
    const date = new Date(dateStr + 'T12:00:00'); // Add time for proper parsing
    return date.toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

// Handle notification click
function handleNotificationClick(notification) {
    // Mark as read if not already
    if (!notification.read) {
        markAsRead(notification.id);
    }
    
    // Handle different notification types
    switch (notification.type) {
        case 'loan':
            showDashboardSection('loans');
            break;
        case 'transaction':
            showDashboardSection('transactions');
            break;
        case 'goal':
            showDashboardSection('overview');
            break;
        default:
            // Just mark as read
            break;
    }
    
    // Close notifications panel
    toggleNotifications();
}

// Enhanced Get notification icon
function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'warning': return 'exclamation-triangle';
        case 'error': return 'times-circle';
        case 'info': return 'info-circle';
        case 'loan': return 'hand-holding-usd';
        case 'transaction': return 'exchange-alt';
        case 'goal': return 'piggy-bank';
        case 'security': return 'shield-alt';
        default: return 'bell';
    }
}

// Enhanced Mark notification as read
function markAsRead(notificationId) {
    const notification = mockNotifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
        notification.read = true;
        updateNotificationBadge();
        
        // Update the specific notification item
        const notificationElement = document.querySelector(`[data-notification-id="${notificationId}"]`);
        if (notificationElement) {
            notificationElement.classList.remove('unread');
            notificationElement.classList.add('read');
            
            // Remove the mark as read button
            const markReadBtn = notificationElement.querySelector('.mark-read');
            if (markReadBtn) {
                markReadBtn.remove();
            }
        }
        
        showInfoMessage('تم تعيين الإشعار كمقروء');
    }
}

// Mark all notifications as read
function markAllAsRead() {
    let unreadCount = 0;
    mockNotifications.forEach(notification => {
        if (!notification.read) {
            notification.read = true;
            unreadCount++;
        }
    });
    
    if (unreadCount > 0) {
        updateNotificationBadge();
        loadNotifications();
        showSuccessMessage(`تم تعيين ${unreadCount} إشعار كمقروء`);
    }
}

// Delete specific notification
function deleteNotification(notificationId) {
    const index = mockNotifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
        mockNotifications.splice(index, 1);
        updateNotificationBadge();
        loadNotifications();
        showInfoMessage('تم حذف الإشعار');
    }
}

// Clear all notifications
function clearAllNotifications() {
    if (mockNotifications.length === 0) {
        showInfoMessage('لا توجد إشعارات للحذف');
        return;
    }
    
    const count = mockNotifications.length;
    mockNotifications.length = 0; // Clear array
    updateNotificationBadge();
    loadNotifications();
    showSuccessMessage(`تم حذف ${count} إشعار`);
}

// Enhanced Update notification badge
function updateNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    const notificationBtn = document.getElementById('notificationsBtn');
    
    if (badge) {
        const unreadCount = mockNotifications.filter(n => !n.read).length;
        badge.textContent = unreadCount;
        
        if (unreadCount > 0) {
            badge.style.display = 'flex';
            badge.classList.add('pulse');
            if (notificationBtn) {
                notificationBtn.classList.add('has-notifications');
            }
        } else {
            badge.style.display = 'none';
            badge.classList.remove('pulse');
            if (notificationBtn) {
                notificationBtn.classList.remove('has-notifications');
            }
        }
    }
}

// ===================================================================
// UTILITY FUNCTIONS
// ===================================================================

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Enhanced Toggle value visibility with improved animation and coverage
function toggleValueVisibility() {
    valuesHidden = !valuesHidden;
    const eyeIcon = document.getElementById('eyeIcon');
    const toggleButton = eyeIcon?.parentElement;
    
    // Update icon with smooth transition
    if (valuesHidden) {
        eyeIcon?.classList.remove('fa-eye');
        eyeIcon?.classList.add('fa-eye-slash');
        if (toggleButton) {
            toggleButton.setAttribute('title', 'إظهار الأرقام');
            toggleButton.style.background = 'var(--warning-color)';
        }
        hideAllValues();
        showInfoMessage('تم إخفاء جميع الأرقام للخصوصية');
    } else {
        eyeIcon?.classList.remove('fa-eye-slash');
        eyeIcon?.classList.add('fa-eye');
        if (toggleButton) {
            toggleButton.setAttribute('title', 'إخفاء الأرقام');
            toggleButton.style.background = '';
        }
        showAllValues();
        showInfoMessage('تم إظهار جميع الأرقام');
    }
    
    // Save preference to localStorage
    localStorage.setItem('hasabak_hideValues', valuesHidden);
    
    // Add visual feedback
    if (toggleButton) {
        toggleButton.style.transform = 'scale(0.9)';
        setTimeout(() => {
            toggleButton.style.transform = 'scale(1)';
        }, 150);
    }
}

// Enhanced hide all values with comprehensive coverage
function hideAllValues() {
    // Hide amounts in balance cards
    document.querySelectorAll('.amount, .balance-amount, .stat-number').forEach(element => {
        applyHiddenStyle(element);
    });
    
    // Hide transaction amounts
    document.querySelectorAll('.transaction-amount, .transaction-value').forEach(element => {
        applyHiddenStyle(element);
    });
    
    // Hide bank balances
    document.querySelectorAll('.bank-balance, .account-balance').forEach(element => {
        applyHiddenStyle(element);
    });
    
    // Hide goal amounts
    document.querySelectorAll('.goal-amount, .target-amount, .current-amount').forEach(element => {
        applyHiddenStyle(element);
    });
    
    // Hide loan amounts
    document.querySelectorAll('.loan-amount, .monthly-payment').forEach(element => {
        applyHiddenStyle(element);
    });
    
    // Hide any element with data-sensitive attribute
    document.querySelectorAll('[data-sensitive="true"]').forEach(element => {
        applyHiddenStyle(element);
    });
    
    // Add privacy overlay to charts if they exist
    addChartPrivacyOverlay();
}

// Enhanced show all values
function showAllValues() {
    // Show amounts in balance cards
    document.querySelectorAll('.amount, .balance-amount, .stat-number').forEach(element => {
        removeHiddenStyle(element);
    });
    
    // Show transaction amounts
    document.querySelectorAll('.transaction-amount, .transaction-value').forEach(element => {
        removeHiddenStyle(element);
    });
    
    // Show bank balances
    document.querySelectorAll('.bank-balance, .account-balance').forEach(element => {
        removeHiddenStyle(element);
    });
    
    // Show goal amounts
    document.querySelectorAll('.goal-amount, .target-amount, .current-amount').forEach(element => {
        removeHiddenStyle(element);
    });
    
    // Show loan amounts
    document.querySelectorAll('.loan-amount, .monthly-payment').forEach(element => {
        removeHiddenStyle(element);
    });
    
    // Show any element with data-sensitive attribute
    document.querySelectorAll('[data-sensitive="true"]').forEach(element => {
        removeHiddenStyle(element);
    });
    
    // Remove privacy overlay from charts
    removeChartPrivacyOverlay();
}

// Apply hidden style with animation
function applyHiddenStyle(element) {
    if (!element) return;
    
    // Store original content if not already stored
    if (!element.hasAttribute('data-original-content')) {
        element.setAttribute('data-original-content', element.textContent);
    }
    
    // Apply blur and replace with dots
    element.style.transition = 'all 0.3s ease';
    element.style.filter = 'blur(6px)';
    element.style.userSelect = 'none';
    element.style.pointerEvents = 'none';
    
    // Replace content with asterisks after blur animation
    setTimeout(() => {
        const originalLength = element.textContent.length;
        const replacement = '•'.repeat(Math.max(4, Math.min(originalLength, 8)));
        element.textContent = replacement;
        element.style.filter = 'none';
        element.style.letterSpacing = '2px';
        element.style.color = 'var(--gray-400)';
    }, 150);
}

// Remove hidden style with animation
function removeHiddenStyle(element) {
    if (!element) return;
    
    const originalContent = element.getAttribute('data-original-content');
    if (!originalContent) return;
    
    // First blur the asterisks
    element.style.filter = 'blur(6px)';
    
    // Then restore original content
    setTimeout(() => {
        element.textContent = originalContent;
        element.style.filter = 'none';
        element.style.letterSpacing = '';
        element.style.color = '';
        element.style.userSelect = '';
        element.style.pointerEvents = '';
        element.removeAttribute('data-original-content');
    }, 150);
}

// Add privacy overlay to charts
function addChartPrivacyOverlay() {
    const chartContainers = document.querySelectorAll('.chart-container, canvas');
    chartContainers.forEach(container => {
        if (container.querySelector('.privacy-overlay')) return; // Already has overlay
        
        const overlay = document.createElement('div');
        overlay.className = 'privacy-overlay';
        overlay.innerHTML = `
            <div class="privacy-content">
                <i class="fas fa-eye-slash"></i>
                <p>البيانات مخفية للخصوصية</p>
                <small>انقر على زر العين لإظهار البيانات</small>
            </div>
        `;
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--border-radius);
            z-index: 10;
            transition: all 0.3s ease;
        `;
        
        const privacyContent = overlay.querySelector('.privacy-content');
        privacyContent.style.cssText = `
            text-align: center;
            color: var(--gray-600);
        `;
        
        const icon = overlay.querySelector('i');
        icon.style.cssText = `
            font-size: 2rem;
            margin-bottom: 0.5rem;
            color: var(--gray-400);
            display: block;
        `;
        
        // Make container relative if not already
        if (window.getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }
        
        container.appendChild(overlay);
        
        // Add click handler to toggle visibility
        overlay.addEventListener('click', toggleValueVisibility);
        overlay.style.cursor = 'pointer';
    });
}

// Remove privacy overlay from charts
function removeChartPrivacyOverlay() {
    document.querySelectorAll('.privacy-overlay').forEach(overlay => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    });
}

// Load value visibility preference on app start
function loadValueVisibilityPreference() {
    const savedPreference = localStorage.getItem('hasabak_hideValues');
    if (savedPreference === 'true') {
        valuesHidden = true;
        hideAllValues();
        const eyeIcon = document.getElementById('eyeIcon');
        if (eyeIcon) {
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
        }
    }
}

// Refresh balance
function refreshBalance() {
    showLoadingOverlay('جاري تحديث الرصيد...');
    
    setTimeout(() => {
        // Simulate balance update
        userBanksAndWallets.forEach(bank => {
            bank.balance += Math.random() * 100 - 50; // Random change
            bank.balance = Math.max(0, bank.balance); // Ensure non-negative
        });
        
        updateTotalBalance();
        hideLoadingOverlay();
        showSuccessMessage('تم تحديث الرصيد بنجاح');
    }, 2000);
}

// Show loading overlay
function showLoadingOverlay(message = 'جاري التحميل...') {
    const overlay = document.getElementById('loadingOverlay');
    const loadingText = document.getElementById('loadingText');
    
    if (overlay) {
        if (loadingText) {
            loadingText.textContent = message;
        }
        overlay.classList.add('show');
    }
}

// Hide loading overlay
function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('show');
    }
}

// Show button loading
function showButtonLoading(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        const btnText = button.querySelector('.btn-text');
        const btnLoader = button.querySelector('.btn-loader');
        
        if (btnText) btnText.style.display = 'none';
        if (btnLoader) btnLoader.style.display = 'block';
        
        button.disabled = true;
    }
}

// Hide button loading
function hideButtonLoading(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        const btnText = button.querySelector('.btn-text');
        const btnLoader = button.querySelector('.btn-loader');
        
        if (btnText) btnText.style.display = 'block';
        if (btnLoader) btnLoader.style.display = 'none';
        
        button.disabled = false;
    }
}

// Enhanced Message System with Multiple Types and Better UX
function showSuccessMessage(message, title = 'نجح العملية') {
    showMessage(message, 'success', title);
}

function showErrorMessage(message, title = 'خطأ') {
    showMessage(message, 'error', title);
}

function showWarningMessage(message, title = 'تحذير') {
    showMessage(message, 'warning', title);
}

function showInfoMessage(message, title = 'معلومات') {
    showMessage(message, 'info', title);
}

// Universal message function with enhanced features
function showMessage(message, type = 'info', title = '') {
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `${type}-message`;
    
    // Create unique ID for this message
    const messageId = 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    messageElement.id = messageId;
    
    // Create message content
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    if (title) {
        const titleElement = document.createElement('div');
        titleElement.className = 'message-title';
        titleElement.textContent = title;
        messageContent.appendChild(titleElement);
    }
    
    const textElement = document.createElement('div');
    textElement.className = 'message-text';
    textElement.textContent = message;
    messageContent.appendChild(textElement);
    
    messageElement.appendChild(messageContent);
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'message-close';
    closeButton.innerHTML = '×';
    closeButton.setAttribute('aria-label', 'إغلاق الرسالة');
    closeButton.onclick = () => hideMessage(messageId);
    messageElement.appendChild(closeButton);
    
    // Add progress bar for auto-hide
    const progressBar = document.createElement('div');
    progressBar.className = 'message-progress';
    messageElement.appendChild(progressBar);
    
    // Append to body
    document.body.appendChild(messageElement);
    
    // Position messages if multiple exist
    positionMessages();
    
    // Show with animation
    setTimeout(() => {
        messageElement.classList.add('show');
    }, 10);
    
    // Auto-hide after 4 seconds
    const autoHideTimer = setTimeout(() => {
        hideMessage(messageId);
    }, 4000);
    
    // Store timer for potential cancellation
    messageElement.dataset.timer = autoHideTimer;
    
    // Add hover pause functionality
    messageElement.addEventListener('mouseenter', () => {
        clearTimeout(autoHideTimer);
        progressBar.style.animationPlayState = 'paused';
    });
    
    messageElement.addEventListener('mouseleave', () => {
        const newTimer = setTimeout(() => {
            hideMessage(messageId);
        }, 2000);
        messageElement.dataset.timer = newTimer;
        progressBar.style.animationPlayState = 'running';
    });
    
    // Add swipe to dismiss on mobile
    addSwipeToMessage(messageElement, messageId);
    
    return messageId;
}

// Hide specific message
function hideMessage(messageId) {
    const messageElement = document.getElementById(messageId);
    if (!messageElement) return;
    
    // Clear timer
    const timer = messageElement.dataset.timer;
    if (timer) {
        clearTimeout(timer);
    }
    
    // Hide with animation
    messageElement.classList.remove('show');
    
    // Remove from DOM after animation
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
        }
        positionMessages();
    }, 400);
}

// Position multiple messages in stack
function positionMessages() {
    const messages = document.querySelectorAll('.success-message.show, .error-message.show, .warning-message.show, .info-message.show');
    messages.forEach((message, index) => {
        message.style.top = `${120 + (index * 70)}px`;
        message.style.zIndex = 10001 - index;
    });
}

// Add swipe gesture for mobile
function addSwipeToMessage(element, messageId) {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    element.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        element.style.transition = 'none';
    });
    
    element.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        
        if (diffX > 0) { // Only allow right swipe
            element.style.transform = `translateX(${diffX}px) scale(${1 - diffX / 400})`;
            element.style.opacity = 1 - (diffX / 300);
        }
    });
    
    element.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        isDragging = false;
        element.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        const diffX = currentX - startX;
        
        if (diffX > 100) { // Threshold for dismiss
            element.style.transform = 'translateX(100%) scale(0.8)';
            element.style.opacity = '0';
            setTimeout(() => hideMessage(messageId), 300);
        } else {
            element.style.transform = 'translateX(0) scale(1)';
            element.style.opacity = '1';
        }
    });
}

// Clear all messages
function clearAllMessages() {
    const messages = document.querySelectorAll('.success-message, .error-message, .warning-message, .info-message');
    messages.forEach(message => {
        if (message.id) {
            hideMessage(message.id);
        }
    });
}

// Enhanced notification system
function showNotification(title, message, type = 'info', actions = []) {
    // Add to mock notifications if not exists
    const notification = {
        id: 'NOT' + Date.now(),
        type: type,
        title: title,
        message: message,
        date: new Date().toISOString().split('T')[0],
        read: false,
        actions: actions
    };
    
    mockNotifications.unshift(notification);
    
    // Update notification badge
    updateNotificationBadge();
    
    // Show toast message
    showMessage(message, type, title);
    
    return notification.id;
}

// Format currency with English numerals
function formatCurrency(amount) {
    // Convert string to number if needed, removing commas
    if (typeof amount === 'string') {
        amount = parseFloat(amount.replace(/,/g, ''));
    }
    
    // Return 0 if not a valid number
    if (isNaN(amount)) {
        return '0.00 دينار';
    }
    
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount) + ' دينار';
}

// Format numbers with English numerals
function formatNumber(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-JO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ===================================================================
// KEYBOARD SHORTCUTS AND ACCESSIBILITY
// ===================================================================

// Handle keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // ESC key to close modals
    if (event.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            closeModal(openModal.id);
        }
        
        // Close notifications panel
        if (notificationsPanelOpen) {
            toggleNotifications();
        }
    }
    
    // Ctrl+L for login (when on landing page)
    if (event.ctrlKey && event.key === 'l' && currentPage === 'landing') {
        event.preventDefault();
        showLogin();
    }
    
    // Ctrl+S for signup (when on landing page)
    if (event.ctrlKey && event.key === 's' && currentPage === 'landing') {
        event.preventDefault();
        showSignup();
    }
});

// Initialize notification badge on load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mock data system
    initializeMockData();
    // Load value visibility preference
    loadValueVisibilityPreference();
    updateNotificationBadge();
});

// Initialize mock data system
function initializeMockData() {
    // Check if we already have stored transactions
    const stored = localStorage.getItem('mockTransactions');
    if (!stored || JSON.parse(stored).length === 0) {
        console.log('Initializing mock transaction data...');
        localStorage.setItem('mockTransactions', JSON.stringify(mockTransactions));
    } else {
        console.log('Mock transaction data already exists');
        // Update global mockTransactions with stored data
        try {
            const storedData = JSON.parse(stored);
            mockTransactions.length = 0; // Clear array
            mockTransactions.push(...storedData); // Add stored transactions
            console.log(`Loaded ${mockTransactions.length} transactions from storage`);
        } catch (e) {
            console.log('Error loading stored transactions, using default data');
        }
    }
}

// ===================================================================
// RESPONSIVE DESIGN HELPERS
// ===================================================================

// Handle window resize
window.addEventListener('resize', function() {
    // Redraw charts if they exist
    if (expenseChart) {
        expenseChart.resize();
    }
    if (monthlyTrendChart) {
        monthlyTrendChart.resize();
    }
});

// ===================================================================
// PERFORMANCE OPTIMIZATION
// ===================================================================

// Debounce function for search and filtering
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, wait) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, wait);
        }
    };
}

// ===================================================================
// CURRENCIES DATA AND FUNCTIONS
// ===================================================================

// Mock exchange rates (JOD as base currency) - Simplified to 4 main currencies
const mockExchangeRates = {
    'USD': { rate: 0.71, change: 0.12, name: 'دولار أمريكي', flag: '🇺🇸', category: 'major' },
    'EUR': { rate: 0.76, change: -0.08, name: 'يورو', flag: '🇪🇺', category: 'major' },
    'GBP': { rate: 0.87, change: 0.05, name: 'جنيه استرليني', flag: '🇬🇧', category: 'major' },
    'JOD': { rate: 1.0, change: 0.0, name: 'دينار أردني', flag: '🇯🇴', category: 'arab' }
};

// Bank-specific offers and promotions
const bankOffers = {
    'البنك العربي': {
        loans: [
            {
                id: 'arab1',
                type: 'قرض شخصي',
                amount: '50,000',
                interestRate: 4.2,
                duration: '60 شهر',
                monthlyPayment: 925,
                features: ['فترة سماح 3 أشهر', 'بدون ضمانات', 'موافقة سريعة']
            },
            {
                id: 'arab2',
                type: 'قرض سيارة',
                amount: '25,000',
                interestRate: 3.8,
                duration: '84 شهر',
                monthlyPayment: 380,
                features: ['تمويل 90%', 'تأمين شامل', 'ضمان 3 سنوات']
            }
        ],
        promotions: [
            {
                title: 'كاش باك البنك العربي',
                description: 'ادفع من خلال كارد البنك العربي واحصل على كاش باك 10%',
                cashback: '10%',
                maxAmount: '200 دينار شهرياً',
                validUntil: '31/12/2025',
                category: 'مطاعم وتسوق'
            },
            {
                title: 'خصم على الوقود',
                description: 'خصم 5% على جميع محطات الوقود',
                discount: '5%',
                maxAmount: '50 دينار شهرياً',
                validUntil: '30/06/2025',
                category: 'وقود'
            }
        ]
    },
    'البنك الأهلي الأردني': {
        loans: [
            {
                id: 'ahli1',
                type: 'قرض منزل',
                amount: '80,000',
                interestRate: 3.5,
                duration: '180 شهر',
                monthlyPayment: 570,
                features: ['فائدة ثابتة', 'فترة سماح 6 أشهر', 'تمويل 85%']
            },
            {
                id: 'ahli2',
                type: 'قرض شخصي',
                amount: '30,000',
                interestRate: 4.5,
                duration: '48 شهر',
                monthlyPayment: 680,
                features: ['موافقة فورية', 'بدون ضمانات', 'مرونة في السداد']
            }
        ],
        promotions: [
            {
                title: 'مكافآت الأهلي',
                description: 'اجمع نقاط مع كل عملية شراء واستبدلها بجوائز',
                points: '1 نقطة لكل دينار',
                redemption: 'جوائز متنوعة',
                validUntil: '31/12/2025',
                category: 'جميع المشتريات'
            },
            {
                title: 'خصم السفر',
                description: 'خصم 15% على حجوزات الطيران والفنادق',
                discount: '15%',
                maxAmount: '500 دينار',
                validUntil: '31/08/2025',
                category: 'سفر وسياحة'
            }
        ]
    },
    'كابيتال بنك': {
        loans: [
            {
                id: 'capital1',
                type: 'قرض تعليمي',
                amount: '15,000',
                interestRate: 2.9,
                duration: '60 شهر',
                monthlyPayment: 270,
                features: ['فائدة مخفضة', 'فترة سماح حتى التخرج', 'بدون ضمانات']
            }
        ],
        promotions: [
            {
                title: 'كاش باك كابيتال',
                description: 'كاش باك 8% على مشتريات الصيدليات والمستشفيات',
                cashback: '8%',
                maxAmount: '100 دينار شهرياً',
                validUntil: '31/12/2025',
                category: 'صحة وطب'
            },
            {
                title: 'خصم التعليم',
                description: 'خصم 12% على الرسوم الدراسية للجامعات',
                discount: '12%',
                maxAmount: '300 دينار سنوياً',
                validUntil: '30/09/2025',
                category: 'تعليم'
            }
        ]
    }
};

// Load currencies data
function loadCurrenciesData() {
    loadExchangeRates();
    loadCurrencyCharts();
    updateLastUpdatedTime();
    
    // Initialize converter with default values
    convertCurrency('from');
}

// Load exchange rates grid
function loadExchangeRates() {
    const grid = document.getElementById('exchangeRatesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    Object.keys(mockExchangeRates).forEach(currency => {
        if (currency === 'JOD') return; // Skip JOD in the list
        
        const data = mockExchangeRates[currency];
        const changeClass = data.change >= 0 ? 'positive' : 'negative';
        const changeIcon = data.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
        
        const rateCard = document.createElement('div');
        rateCard.className = `rate-card ${data.category}`;
        rateCard.innerHTML = `
            <div class="rate-header">
                <div class="currency-pair">${currency}/JOD</div>
                <div class="currency-flag">${data.flag}</div>
            </div>
            <div class="rate-value">${data.rate.toFixed(4)}</div>
            <div class="rate-change ${changeClass}">
                <i class="fas ${changeIcon}"></i>
                ${data.change >= 0 ? '+' : ''}${data.change.toFixed(2)}%
            </div>
        `;
        
        grid.appendChild(rateCard);
    });
}

// Handle Enter key press for currency conversion
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        performCurrencyConversion();
    }
}

// Currency conversion function with button trigger
function performCurrencyConversion() {
    const fromAmount = parseFloat(document.getElementById('fromAmount').value) || 0;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    
    if (fromAmount === 0) {
        showErrorMessage('يرجى إدخال مبلغ للتحويل');
        return;
    }
    
    let convertedAmount = 0;
    let rate = 1;
    
    if (fromCurrency === toCurrency) {
        convertedAmount = fromAmount;
        rate = 1;
    } else if (fromCurrency === 'JOD') {
        // From JOD to other currencies
        const targetRate = mockExchangeRates[toCurrency]?.rate || 1;
        convertedAmount = fromAmount / targetRate;
        rate = 1 / targetRate;
    } else if (toCurrency === 'JOD') {
        // From other currencies to JOD
        const sourceRate = mockExchangeRates[fromCurrency]?.rate || 1;
        convertedAmount = fromAmount * sourceRate;
        rate = sourceRate;
    } else {
        // From one currency to another (via JOD)
        const sourceRate = mockExchangeRates[fromCurrency]?.rate || 1;
        const targetRate = mockExchangeRates[toCurrency]?.rate || 1;
        convertedAmount = (fromAmount * sourceRate) / targetRate;
        rate = sourceRate / targetRate;
    }
    
    // Update the result
    document.getElementById('toAmount').value = convertedAmount.toFixed(2);
    
    // Update conversion rate display
    const rateDisplay = document.getElementById('conversionRate');
    if (rateDisplay) {
        rateDisplay.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
    }
    
    // Update last updated time
    const now = new Date();
    const timeString = now.toLocaleTimeString('ar', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    const lastUpdated = document.getElementById('lastUpdated');
    if (lastUpdated) {
        lastUpdated.textContent = `آخر تحديث: اليوم ${timeString}`;
    }
    
    // Show success message
    showSuccessMessage(`تم تحويل ${fromAmount} ${fromCurrency} إلى ${convertedAmount.toFixed(2)} ${toCurrency}`);
}

// Convert currency (legacy function for compatibility)
function convertCurrency(direction) {
    // This function is now deprecated, use performCurrencyConversion instead
    performCurrencyConversion();
}

// Update conversion rate display
function updateConversionRate() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    
    let rate;
    
    if (fromCurrency === 'JOD') {
        const targetRate = mockExchangeRates[toCurrency]?.rate || 1;
        rate = 1 / targetRate;
    } else if (toCurrency === 'JOD') {
        rate = mockExchangeRates[fromCurrency]?.rate || 1;
    } else {
        const sourceRate = mockExchangeRates[fromCurrency]?.rate || 1;
        const targetRate = mockExchangeRates[toCurrency]?.rate || 1;
        rate = sourceRate / targetRate;
    }
    
    const rateDisplay = document.getElementById('conversionRate');
    if (rateDisplay) {
        rateDisplay.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
    }
}

// Swap currencies
function swapCurrencies() {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const fromAmount = document.getElementById('fromAmount');
    const toAmount = document.getElementById('toAmount');
    
    // Swap currency selections
    const tempCurrency = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCurrency;
    
    // Swap amounts
    const tempAmount = fromAmount.value;
    fromAmount.value = toAmount.value;
    toAmount.value = tempAmount;
    
    // Update conversion rate display
    updateConversionRate();
    
    showSuccessMessage('تم تبديل العملات بنجاح');
}

// Filter currencies by category
function filterCurrencies(category) {
    const grid = document.getElementById('exchangeRatesGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter rate cards
    const rateCards = grid.querySelectorAll('.rate-card');
    rateCards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Refresh currency rates
function refreshCurrencyRates() {
    showLoadingOverlay('جاري تحديث أسعار العملات...');
    
    setTimeout(() => {
        // Simulate rate updates
        Object.keys(mockExchangeRates).forEach(currency => {
            if (currency !== 'JOD') {
                const data = mockExchangeRates[currency];
                // Random change between -0.5% and +0.5%
                const randomChange = (Math.random() - 0.5) * 1;
                data.change = randomChange;
                // Update rate slightly
                data.rate *= (1 + randomChange / 1000);
            }
        });
        
        loadExchangeRates();
        convertCurrency('from');
        updateLastUpdatedTime();
        hideLoadingOverlay();
        showSuccessMessage('تم تحديث أسعار العملات بنجاح');
    }, 2000);
}

// Load currency charts (simplified mini charts)
function loadCurrencyCharts() {
    const chartIds = ['usdChart', 'eurChart', 'gbpChart'];
    
    chartIds.forEach(chartId => {
        const canvas = document.getElementById(chartId);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Generate sample data points
        const points = 20;
        const data = [];
        for (let i = 0; i < points; i++) {
            data.push(Math.random() * 0.5 + 0.25); // Random values between 0.25 and 0.75
        }
        
        // Draw chart
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let i = 0; i < data.length; i++) {
            const x = (i / (data.length - 1)) * width;
            const y = height - (data[i] * height);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        // Add gradient fill
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(37, 99, 235, 0.3)');
        gradient.addColorStop(1, 'rgba(37, 99, 235, 0.05)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
    });
}

// Update last updated time
function updateLastUpdatedTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = `آخر تحديث: اليوم ${timeString}`;
    }
}

// Setup price alert (placeholder function)
function setupPriceAlert() {
    showInfoMessage('سيتم إضافة ميزة تنبيهات الأسعار قريباً');
}

// ===================================================================
// LOAN CALCULATOR INITIALIZATION
// ===================================================================

// Initialize loan calculator with default values
function initializeLoanCalculator() {
    // Set default values
    const defaults = {
        loanAmount: 10000,
        loanDuration: 24,
        interestRate: 4.5
    };
    
    // Update inputs and sliders
    Object.keys(defaults).forEach(fieldName => {
        const input = document.getElementById(fieldName);
        const slider = document.getElementById(fieldName + 'Slider');
        
        if (input) input.value = defaults[fieldName];
        if (slider) slider.value = defaults[fieldName];
    });
    
    // Calculate initial values
    calculateLoan();
}

// ===================================================================
// INITIALIZATION COMPLETE
// ===================================================================

console.log('✅ تم تحميل جميع وظائف منصة حسابك بنجاح');
console.log('🚀 جاهز للاستخدام!');
