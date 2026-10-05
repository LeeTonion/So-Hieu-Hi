// Mock database for Sổ Hiếu Hỉ App - React Native Edition

export const INITIAL_USER = {
  name: 'Minh Quân',
  email: 'minhquan@gmail.com',
  avatar: 'MQ',
  pinEnabled: true,
  hideAmountOnHome: false,
  reminderDaysBefore: 3,
  lunarReminder: true,
  theme: 'light', // 'light' | 'dark' | 'system'
  wedding: {
    title: 'Đám cưới của bạn',
    couple: 'Minh Quân & Thu Hà',
    date: '2026-10-18',
    time: '17:30',
    location: 'Nhà hàng White Palace, 194 Hoàng Văn Thụ, Q. Phú Nhuận',
    totalGuests: 120,
    confirmedGuests: 64,
    pendingGuests: 47,
    declinedGuests: 9,
    gromSideCount: 72,
    brideSideCount: 48,
    cardLink: 'https://thiepcuoi.studio-cua-ban.vn/t/minhquan-thuha',
    cardStyle: 'hongloc', // hongloc, doson, toigian
  }
};

export const INITIAL_FAMILIES = [
  {
    id: 'f1',
    name: 'Nhà cô Tươi',
    category: 'Bên ngoại',
    membersCount: 4,
    interactionCount: 9,
    netBalance: 1000000,
    receivedTotal: 4000000,
    givenTotal: 3000000,
    upcomingEvent: 'Sinh nhật chú Hùng, còn 2 ngày',
    members: ['c1', 'c2', 'c3', 'c4']
  },
  {
    id: 'f2',
    name: 'Nhà bác Hòa',
    category: 'Hàng xóm',
    membersCount: 3,
    interactionCount: 5,
    netBalance: 2000000,
    receivedTotal: 2000000,
    givenTotal: 0,
    upcomingEvent: null,
    members: ['c5', 'c6']
  },
  {
    id: 'f3',
    name: 'Họ nội',
    category: 'Bên nội',
    membersCount: 12,
    interactionCount: 18,
    netBalance: -1200000,
    receivedTotal: 3500000,
    givenTotal: 4700000,
    upcomingEvent: 'Giỗ ông nội, còn 6 ngày',
    members: ['c7', 'c8']
  },
  {
    id: 'f4',
    name: 'Đồng nghiệp',
    category: 'Công ty',
    membersCount: 8,
    interactionCount: 14,
    netBalance: -1500000,
    receivedTotal: 5000000,
    givenTotal: 6500000,
    upcomingEvent: null,
    members: ['c9', 'c10']
  }
];

export const INITIAL_CONTACTS = [
  {
    id: 'c1',
    name: 'Cô Tươi',
    salutation: 'Cô',
    relationship: 'Hàng xóm cũ',
    phone: '0903 456 128',
    hasZalo: true,
    familyId: 'f1',
    familyRole: 'Chủ hộ',
    receivedFrom: 2000000,
    givenTo: 1500000,
    netBalance: 500000,
    birthday: '15/04',
    birthdayType: 'Dương lịch',
    birthdayNotice: 'nhắc trước 3 ngày',
    history: [
      { id: 'h1', title: 'Tân gia nhà bạn', type: 'Hiếu', date: '2026-09-20', amount: 1000000, direction: 'received' },
      { id: 'h2', title: 'Viếng bà nội', type: 'Hiếu', date: '2025-03-14', amount: 1000000, direction: 'received' },
      { id: 'h3', title: 'Cưới con gái cô', type: 'Hỉ', date: '2024-11-05', amount: 1000000, direction: 'given' }
    ]
  },
  {
    id: 'c2',
    name: 'Chú Hùng',
    salutation: 'Chú',
    relationship: 'Chú nhà bên',
    phone: '0912 345 678',
    hasZalo: true,
    familyId: 'f1',
    familyRole: 'Chồng',
    receivedFrom: 500000,
    givenTo: 0,
    netBalance: 500000,
    birthday: '01/10',
    birthdayType: 'Dương lịch',
    birthdayNotice: 'còn 2 ngày',
    history: [
      { id: 'h4', title: 'Tân gia nhà bạn', type: 'Hiếu', date: '2026-09-20', amount: 500000, direction: 'received' }
    ]
  },
  {
    id: 'c3',
    name: 'Anh Nam',
    salutation: 'Anh',
    relationship: 'Con cô Tươi',
    phone: '0988 123 456',
    hasZalo: true,
    familyId: 'f1',
    familyRole: 'Con trai',
    receivedFrom: 500000,
    givenTo: 1000000,
    netBalance: -500000,
    history: [
      { id: 'h5', title: 'Viếng bà nội', type: 'Hiếu', date: '2025-03-14', amount: 500000, direction: 'received' },
      { id: 'h6', title: 'Cưới anh Nam', type: 'Hỉ', date: '2025-01-10', amount: 1000000, direction: 'given' }
    ]
  },
  {
    id: 'c4',
    name: 'Chị Thảo',
    salutation: 'Chị',
    relationship: 'Con dâu cô Tươi',
    phone: '0977 222 333',
    hasZalo: true,
    familyId: 'f1',
    familyRole: 'Con dâu',
    receivedFrom: 1000000,
    givenTo: 500000,
    netBalance: 500000,
    history: []
  },
  {
    id: 'c9',
    name: 'Anh Tuấn',
    salutation: 'Anh',
    relationship: 'Đồng nghiệp',
    phone: '0901 111 222',
    hasZalo: true,
    familyId: 'f4',
    receivedFrom: 0,
    givenTo: 500000,
    netBalance: -500000,
    history: [
      { id: 'h7', title: 'Cưới hỏi', type: 'Hỉ', date: '2026-09-28', amount: 500000, direction: 'given' }
    ]
  },
  {
    id: 'c7',
    name: 'Chú Ba',
    salutation: 'Chú',
    relationship: 'Chú ruột',
    phone: '0908 333 444',
    hasZalo: true,
    familyId: 'f3',
    receivedFrom: 0,
    givenTo: 300000,
    netBalance: -300000,
    history: [
      { id: 'h8', title: 'Tân gia', type: 'Hiếu', date: '2026-09-26', amount: 300000, direction: 'given' }
    ]
  },
  {
    id: 'c10',
    name: 'Chị Mai',
    salutation: 'Chị',
    relationship: 'Đồng nghiệp cũ',
    phone: '0933 444 555',
    hasZalo: true,
    familyId: null,
    receivedFrom: 500000,
    givenTo: 0,
    netBalance: 500000,
    history: [
      { id: 'h9', title: 'Tân gia', type: 'Hiếu', date: '2026-09-20', amount: 500000, direction: 'received' }
    ]
  },
  {
    id: 'c5',
    name: 'Nhà bác Hòa',
    salutation: 'Bác',
    relationship: 'Hàng xóm',
    phone: '0918 888 999',
    hasZalo: true,
    familyId: 'f2',
    receivedFrom: 2000000,
    givenTo: 0,
    netBalance: 2000000,
    history: [
      { id: 'h10', title: 'Tân gia', type: 'Hiếu', date: '2026-09-20', amount: 2000000, direction: 'received' }
    ]
  },
  {
    id: 'c11',
    name: 'Bạn Linh',
    salutation: 'Bạn',
    relationship: 'Bạn đại học',
    phone: '0987 654 321',
    hasZalo: true,
    familyId: null,
    receivedFrom: 0,
    givenTo: 1000000,
    netBalance: -1000000,
    history: [
      { id: 'h11', title: 'Cưới hỏi', type: 'Hỉ', date: '2026-09-12', amount: 1000000, direction: 'given' }
    ]
  },
  {
    id: 'c8',
    name: 'Ông Năm',
    salutation: 'Ông',
    relationship: 'Ông họ',
    phone: '0905 555 666',
    hasZalo: false,
    familyId: 'f3',
    receivedFrom: 0,
    givenTo: 500000,
    netBalance: -500000,
    history: [
      { id: 'h12', title: 'Mừng thọ', type: 'Hiếu', date: '2026-08-30', amount: 500000, direction: 'given' }
    ]
  },
  {
    id: 'c12',
    name: 'Anh Khoa',
    salutation: 'Anh',
    relationship: 'Anh họ',
    phone: '0909 777 888',
    hasZalo: true,
    familyId: 'f3',
    receivedFrom: 0,
    givenTo: 1000000,
    netBalance: -1000000,
    history: [
      { id: 'h13', title: 'Cưới hỏi', type: 'Hỉ', date: '2026-08-17', amount: 1000000, direction: 'given' }
    ]
  }
];

export const INITIAL_TRANSACTIONS = [
  { id: 't1', personName: 'Anh Tuấn', personId: 'c9', type: 'given', categoryType: 'Hỉ', occasion: 'Cưới hỏi', date: '2026-09-28', amount: 500000, monthGroup: 'Tháng 9, 2026' },
  { id: 't2', personName: 'Chú Ba', personId: 'c7', type: 'given', categoryType: 'Hiếu', occasion: 'Tân gia', date: '2026-09-26', amount: 300000, monthGroup: 'Tháng 9, 2026' },
  { id: 't3', personName: 'Cô Tươi', personId: 'c1', type: 'received', categoryType: 'Hiếu', occasion: 'Tân gia', date: '2026-09-20', amount: 1000000, monthGroup: 'Tháng 9, 2026' },
  { id: 't4', personName: 'Chị Mai', personId: 'c10', type: 'received', categoryType: 'Hiếu', occasion: 'Tân gia', date: '2026-09-20', amount: 500000, monthGroup: 'Tháng 9, 2026' },
  { id: 't5', personName: 'Nhà bác Hòa', personId: 'c5', type: 'received', categoryType: 'Hiếu', occasion: 'Tân gia', date: '2026-09-20', amount: 2000000, monthGroup: 'Tháng 9, 2026' },
  { id: 't6', personName: 'Bạn Linh', personId: 'c11', type: 'given', categoryType: 'Hỉ', occasion: 'Cưới hỏi', date: '2026-09-12', amount: 1000000, monthGroup: 'Tháng 9, 2026' },
  { id: 't7', personName: 'Ông Năm', personId: 'c8', type: 'given', categoryType: 'Hiếu', occasion: 'Mừng thọ', date: '2026-08-30', amount: 500000, monthGroup: 'Tháng 8, 2026' },
  { id: 't8', personName: 'Anh Khoa', personId: 'c12', type: 'given', categoryType: 'Hỉ', occasion: 'Cưới hỏi', date: '2026-08-17', amount: 1000000, monthGroup: 'Tháng 8, 2026' }
];

export const INITIAL_EVENTS = [
  {
    id: 'e1',
    title: 'Sinh nhật chú Hùng',
    date: '2026-10-01',
    dayOfWeek: 'Thứ Năm',
    household: 'Nhà cô Tươi',
    type: 'Sinh nhật',
    daysLeft: 2,
    suggestedAmount: 500000,
    reciprocalNote: 'Chú mừng bạn 500.000đ dịp tân gia nhà bạn (20/09/2026). Mừng lại mức này là tương xứng.',
    options: [
      { amount: 300000, label: 'Nhẹ nhàng' },
      { amount: 500000, label: 'Vừa lễ', default: true },
      { amount: 1000000, label: 'Hậu hĩnh' }
    ],
    wishText: 'Chúc chú Hùng tuổi mới thật nhiều sức khoẻ, luôn vui vẻ bên cô và các anh chị ạ!'
  },
  {
    id: 'e2',
    title: 'Giỗ ông nội',
    date: '2026-10-05',
    lunarDate: '25/8 âm lịch',
    dayOfWeek: 'Thứ Hai',
    type: 'Ngày giỗ',
    daysLeft: 6,
    note: 'Tổ chức tại nhà thờ họ nội'
  },
  {
    id: 'e3',
    title: 'Thôi nôi bé Bin',
    date: '2026-10-12',
    type: 'Thôi nôi',
    daysLeft: 13,
    note: '12/10, con chị Mai. Tự nhắc từ ngày đầy tháng đã ghi'
  },
  {
    id: 'e4',
    title: 'Đám cưới của bạn',
    date: '2026-10-18',
    dayOfWeek: 'Chủ nhật',
    type: 'Cưới hỏi',
    daysLeft: 19,
    note: '64 trên 120 khách đã xác nhận'
  },
  {
    id: 'e5',
    title: 'Cưới em Trang',
    date: '2026-10-25',
    dayOfWeek: 'Chủ nhật',
    type: 'Thiệp đã nhận',
    daysLeft: 26,
    note: 'Tạo từ thiệp mời bạn nhận'
  },
  {
    id: 'e6',
    title: 'Giỗ bà ngoại',
    date: '2026-10-20',
    lunarDate: '10/9 âm lịch',
    type: 'Ngày giỗ',
    daysLeft: 21
  }
];

export const WEDDING_CHECKLIST = [
  { id: 1, title: 'Lập danh sách khách', desc: '120 khách, còn 5 người thiếu số điện thoại', done: true, route: 'wedding-guests' },
  { id: 2, title: 'Chọn thiệp mời', desc: 'Đã dán link thiệp online của studio', done: true, route: 'wedding-card' },
  { id: 3, title: 'Soạn lời mời', desc: '112 theo mẫu, 8 tự viết', done: true, route: 'wedding-composer' },
  { id: 4, title: 'Gửi và theo dõi phản hồi', desc: '64 sẽ đến, 47 chưa trả lời', stepNumber: 4, done: false, route: 'wedding-rsvp' },
  { id: 5, title: 'Ghi phong bì tại tiệc', desc: 'Ngày 18/10, đọc tên và số tiền, app tự ghi', stepNumber: 5, done: false, route: 'envelope-recorder' },
  { id: 6, title: 'Kiểm tra và lưu vào sổ', desc: 'Sửa tên chưa khớp, đối chiếu tiền mặt', stepNumber: 6, done: false, route: 'envelope-audit' },
  { id: 7, title: 'Cảm ơn khách', desc: 'Gửi lời cảm ơn qua Zalo sau tiệc', badge: 'Sau tiệc', done: false, route: 'wedding-thanks' }
];

export const STATS_2026 = {
  receivedTotal: 18500000,
  receivedCount: 32,
  givenTotal: 16200000,
  givenCount: 27,
  monthly: [
    { month: 'T1', received: 15, given: 25 },
    { month: 'T2', received: 45, given: 30 },
    { month: 'T3', received: 70, given: 45 },
    { month: 'T4', received: 20, given: 55 },
    { month: 'T5', received: 15, given: 10 },
    { month: 'T6', received: 85, given: 65 },
    { month: 'T7', received: 35, given: 45 },
    { month: 'T8', received: 30, given: 40 },
    { month: 'T9', received: 80, given: 42 }
  ],
  occasions: [
    { name: 'Cưới hỏi', amount: 21500000, percent: 62, color: '#F0573F' },
    { name: 'Ma chay', amount: 4900000, percent: 14, color: '#E0285C' },
    { name: 'Sinh nhật', amount: 3500000, percent: 10, color: '#FFB938' },
    { name: 'Tân gia', amount: 2800000, percent: 8, color: '#0B8A63' },
    { name: 'Khác', amount: 2000000, percent: 6, color: '#1B2445' }
  ]
};
