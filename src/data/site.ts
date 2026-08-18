/** Single source of truth — all site-wide constants. */
export const SITE = {
  domain: 'kaalsarpdoshpujaujjain.com',
  url: 'https://kaalsarpdoshpujaujjain.com',
  name: 'Kaal Sarp Dosh Puja Ujjain',
  nameHi: 'काल सर्प दोष पूजा उज्जैन',
  tagline: 'Kaal Sarp Dosh Puja Ujjain · Authentic Vedic Pandit',
  taglineHi: 'काल सर्प दोष पूजा उज्जैन · प्रामाणिक वैदिक पंडित',
  description: 'Kaal Sarp Dosh Puja Ujjain — vidvan vaidik pandit dwara 12 prakar ka Kaal Sarp Dosh Nivaran. Online booking, sahi muhurat, prachin vedic vidhi, paardarshi ₹3,100 onwards. Shipra tat par 5,000+ parivaron ne karwaayi.',
  metaDescription: 'Kaal Sarp Dosh Puja Ujjain — vidvan vaidik pandit se 12 prakar ka Kaal Sarp Dosh Nivaran Puja. Online booking, sahi muhurat, ₹3,100 se. 5,000+ parivar. Call: +91 9424002309',
  locale: 'hi-IN',
  alternateLocales: ['en-IN', 'mr-IN'],

  phone: {
    raw: '+919424002309',
    display: '+91 94240 02309',
    short: '9424002309',
    tel: 'tel:+919424002309'
  },

  address: {
    streetAddress: 'Mangalnath Mandir, Ankpath Marg, Kamed',
    locality: 'Ujjain',
    region: 'Madhya Pradesh',
    postalCode: '456006',
    country: 'IN',
    geo: { lat: 23.2222254, lng: 75.7861371 }
  },

  pandit: {
    name: 'Pandit Ji',
    nameHi: 'पंडित जी',
    bio: 'Ujjain ke vaidik vidvan pandit — 15+ years experience in Kaal Sarp Dosh Puja. Performed for 5,000+ families across UP, Rajasthan, Bihar, Delhi & Mumbai. Shipra tat + Mahakaleshwar nagri.',
    bioHi: 'उज्जैन के विद्वान वैदिक पंडित — काल सर्प दोष पूजा में 15+ वर्षों का अनुभव। UP, राजस्थान, बिहार, दिल्ली, मुंबई के 5,000+ परिवारों के लिए पूजा सम्पन्न। शिप्रा तट · महाकाल की नगरी।',
    photo: '/images/pandit.jpg',
    experience: '15+',
    familiesServed: '5,000+'
  },

  pricing: {
    starting: 3100,
    currency: 'INR',
    note: 'samagri sahit, paardarshi'
  },

  gmb: {
    // 2026-08-18 (ksd-011): rating/reviewCount NULLED — the 5.0/145 was hardcoded and unverifiable,
    // and identical to the number MDP publishes for a different business. Both the JSON-LD
    // aggregateRating and the visible TrustStrip badge that consumed these were removed.
    // Put REAL numbers here only from this listing's own Google Business Profile.
    rating: null,
    reviewCount: null,
    profileUrl: 'https://www.google.com/maps/place/Kaal+Sarp+Dosh+Puja+Ujjain+%7C+Mahamrityunjaya+Jaap+Ujjain/@23.2222254,75.7861371,17z/data=!3m1!4b1!4m6!3m5!1s0x396377edb42be463:0xc670b32609cdcf3f!8m2!3d23.2222254!4d75.7861371!16s%2Fg%2F11sx21jkmx',
    cid: '0xc670b32609cdcf3f',
    placeId: 'g/11sx21jkmx',
    name: 'Kaal Sarp Dosh Puja Ujjain | Mahamrityunjaya Jaap Ujjain'
  },

  social: {
    facebook: '',
    instagram: '',
    youtube: ''
  },

  org: {
    legalName: 'ByteFlow Technologies',
    foundingDate: '2019',
    email: 'info@byteflowtech.in'
  }
} as const;

export const NAV_PRIMARY = [
  { label: 'Home', labelHi: 'होम', href: '/' },
  { label: 'About', labelHi: 'हमारे बारे में', href: '/about-us/' },
  { label: 'Our Pujas', labelHi: 'पूजाएँ', href: '/our-pujas/' },
  { label: 'Blog', labelHi: 'ब्लॉग', href: '/our-blog/' },
  { label: 'Contact', labelHi: 'सम्पर्क', href: '/contact-us/' }
] as const;

export const PUJA_SERVICES = [
  {
    slug: '/kaal-sarp-dosh-puja-in-ujjain/',
    title: 'Kaal Sarp Dosh Puja Ujjain',
    titleHi: 'काल सर्प दोष पूजा उज्जैन',
    short: 'Kaal Sarp Dosh Nivaran · 12 prakar · Vedic vidhi · Online booking',
    price: 3100
  },
  {
    slug: '/mangal-dosh-puja-in-ujjain/',
    title: 'Mangal Dosh Puja',
    titleHi: 'मंगल दोष पूजा',
    short: 'Manglik dosh nivaran · Vivah baadha door · Ujjain',
    price: 3100
  },
  {
    slug: '/mahamritunjaya-jaap-in-ujjain/',
    title: 'Mahamrityunjaya Jaap',
    titleHi: 'महामृत्युंजय जाप',
    short: 'Aarogya-Aayu ki kamna · Sankat shanti jaap',
    price: 3100
  }
] as const;

export const KAAL_SARP_TYPES = [
  { id: 1, name: 'Anant Kaal Sarp Dosh', nameHi: 'अनंत काल सर्प दोष' },
  { id: 2, name: 'Kulik Kaal Sarp Dosh', nameHi: 'कुलिक काल सर्प दोष' },
  { id: 3, name: 'Vasuki Kaal Sarp Dosh', nameHi: 'वासुकी काल सर्प दोष' },
  { id: 4, name: 'Shankhapal Kaal Sarp Dosh', nameHi: 'शंखपाल काल सर्प दोष' },
  { id: 5, name: 'Padma Kaal Sarp Dosh', nameHi: 'पद्म काल सर्प दोष' },
  { id: 6, name: 'Mahapadma Kaal Sarp Dosh', nameHi: 'महापद्म काल सर्प दोष' },
  { id: 7, name: 'Takshak Kaal Sarp Dosh', nameHi: 'तक्षक काल सर्प दोष' },
  { id: 8, name: 'Karkotak Kaal Sarp Dosh', nameHi: 'कर्कोटक काल सर्प दोष' },
  { id: 9, name: 'Shankhachud Kaal Sarp Dosh', nameHi: 'शंखचूड़ काल सर्प दोष' },
  { id: 10, name: 'Ghatak Kaal Sarp Dosh', nameHi: 'घातक काल सर्प दोष' },
  { id: 11, name: 'Vishdhar Kaal Sarp Dosh', nameHi: 'विषधर काल सर्प दोष' },
  { id: 12, name: 'Sheshnaag Kaal Sarp Dosh', nameHi: 'शेषनाग काल सर्प दोष' }
] as const;

/** Google Ads conversion config — locked, do NOT change without ads team. */
export const TRACKING = {
  gaId: 'G-XMQNJT3FBL',       // ✅ GA4 added 2026-05-30 (Aman provided)
  adsId: 'AW-16735405036',    // ✅ Locked 2026-05-17 (shared with mangaldoshnivaranpujaujjain)
  callConvLabel: 'XXXXXX/XXXXXXXXXXX', // TODO: Aman to provide (Call +91 9424002309 conv action)
  txnIdPrefix: 'ksd_'
} as const;
