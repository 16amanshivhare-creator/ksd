/** Single source of truth — all site-wide constants. */
export const SITE = {
  domain: 'kaalsarpdoshpujaujjain.com',
  url: 'https://kaalsarpdoshpujaujjain.com',
  name: 'Kaal Sarp Dosh Puja Ujjain',
  nameHi: 'काल सर्प दोष पूजा उज्जैन',
  tagline: 'Authentic Vedic Pandit · Mangalnath Mandir · Ujjain',
  taglineHi: 'प्रामाणिक वैदिक पंडित · मंगलनाथ मंदिर · उज्जैन',
  description: 'Ujjain ke Mangalnath Mandir ke vidvan pandit dwara Kaal Sarp Dosh Puja — 12 prakar ka nivaran, prachin vedic vidhi, sahi muhurat, paardarshi ₹2,100 onwards pricing. 15+ varsh anubhav, 500+ parivaron ne kaam karaaya.',
  metaDescription: 'Ujjain mein Kaal Sarp Dosh Puja vidvan pandit se — Mangalnath Mandir, 12 prakar ka nivaran, sahi muhurat, ₹3,100 onwards. 500+ parivaron ne karwaayi. Call: +91 9424002309',
  locale: 'hi-IN',
  alternateLocales: ['en-IN', 'mr-IN'],

  phone: {
    raw: '+919424002309',
    display: '+91 94240 02309',
    short: '9424002309',
    tel: 'tel:+919424002309'
  },

  address: {
    streetAddress: 'Mangalnath Mandir, Ankpath Marg',
    locality: 'Ujjain',
    region: 'Madhya Pradesh',
    postalCode: '456006',
    country: 'IN',
    geo: { lat: 23.2018, lng: 75.7768 }
  },

  hours: { open: '06:00', close: '21:00' },

  pandit: {
    name: 'Pandit Ji',
    nameHi: 'पंडित जी',
    bio: '15+ years of experience in Vedic rituals at Mangalnath Mandir, Ujjain — birthplace of Mangal Dev. Performed Kaal Sarp Dosh Puja for 500+ families across UP, Rajasthan, Bihar, Delhi & Mumbai.',
    bioHi: 'मंगलनाथ मंदिर (मंगल देव की जन्मस्थली) उज्जैन में 15+ वर्षों का वैदिक अनुष्ठान अनुभव। UP, राजस्थान, बिहार, दिल्ली, मुंबई के 500+ परिवारों के लिए काल सर्प दोष पूजा सम्पन्न।',
    photo: '/images/pandit.jpg',
    experience: '15+',
    familiesServed: '500+'
  },

  pricing: {
    starting: 3100,
    currency: 'INR',
    note: 'samagri sahit, paardarshi'
  },

  gmb: {
    rating: 5.0,
    reviewCount: 145,
    profileUrl: '' // TODO: add when Aman provides
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
    slug: '/',
    title: 'Kaal Sarp Dosh Puja',
    titleHi: 'काल सर्प दोष पूजा',
    short: '12 prakar ka nivaran · Vedic vidhi · Sahi muhurat',
    price: 3100
  },
  {
    slug: '/mangal-dosh-puja-in-ujjain/',
    title: 'Mangal Dosh Puja',
    titleHi: 'मंगल दोष पूजा',
    short: 'Manglik nivaran · Mangalnath Mandir · Vivah baadha door',
    price: 3100
  },
  {
    slug: '/mahamritunjaya-jaap-in-ujjain/',
    title: 'Mahamrityunjaya Jaap',
    titleHi: 'महामृत्युंजय जाप',
    short: 'Aarogya · Aayu vriddhi · Sankat nivaran',
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
  gaId: 'G-XXXXXXX',          // TODO: Aman to provide GA4
  adsId: 'AW-XXXXXXXXXX',     // TODO: Aman to provide
  callConvLabel: 'XXXXXX/XXXXXXXXXXX', // TODO: Aman to provide
  txnIdPrefix: 'ksd_'
} as const;
