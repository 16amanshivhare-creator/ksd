import { SITE } from '@data/site';

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE.url}/#business`,
    name: SITE.name,
    alternateName: SITE.nameHi,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone.raw,
    image: `${SITE.url}/images/og-default.jpg`,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.streetAddress,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.address.geo.lat,
      longitude: SITE.address.geo.lng
    },
    hasMap: SITE.gmb.profileUrl,
    // 2026-08-18 (ksd-011): site-wide aggregateRating REMOVED.
    // It emitted a hardcoded 5.0 / 145 — the IDENTICAL number mangaldoshnivaranpujaujjain.com
    // publishes for a DIFFERENT business at a DIFFERENT address, so at most one could be true
    // and neither is verifiable (the puja GMB listings are not in the ByteFlow GBP account).
    // It also contradicted the testimonial-derived AggregateRating on the homepage.
    // Separately, a self-serving AggregateRating on your own LocalBusiness is not review-snippet
    // eligible under Google's review-snippet guidelines. Measured 2026-08-18 via GSC
    // `searchAppearance`: this property is served ZERO review snippets, so the markup was
    // earning nothing while carrying manual-action risk. Do NOT re-add without real,
    // verifiable, first-party review data.
    areaServed: [
      { '@type':'State', name:'Madhya Pradesh' },
      { '@type':'State', name:'Uttar Pradesh' },
      { '@type':'State', name:'Rajasthan' },
      { '@type':'State', name:'Maharashtra' },
      { '@type':'State', name:'Delhi' },
      { '@type':'State', name:'Bihar' },
      { '@type':'State', name:'Gujarat' },
      { '@type':'Country', name:'India' }
    ]
  };
}

export function serviceSchema(opts: {
  name: string; nameHi?: string; description: string; slug: string; price?: number; alternateNames?: string[];
}) {
  const altNames = [
    opts.nameHi,
    ...(opts.alternateNames || [])
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE.url}${opts.slug}#service`,
    name: opts.name,
    alternateName: altNames.length ? altNames : undefined,
    description: opts.description,
    url: `${SITE.url}${opts.slug}`,
    serviceType: 'Vedic Puja',
    category: 'Religious Services',
    provider: { '@id': `${SITE.url}/#business` },
    areaServed: { '@type': 'City', name: 'Ujjain' },
    offers: opts.price ? {
      '@type': 'Offer',
      price: opts.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
    } : undefined
  };
}

export function articleSchema(opts: {
  title: string; description: string; slug: string; image?: string;
  pubDate: Date; updatedDate?: Date; author?: string; language?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE.url}${opts.slug}#article`,
    headline: opts.title,
    description: opts.description,
    image: opts.image ? `${SITE.url}${opts.image}` : `${SITE.url}/images/og-default.jpg`,
    datePublished: opts.pubDate.toISOString(),
    dateModified: (opts.updatedDate || opts.pubDate).toISOString(),
    inLanguage: opts.language === 'en' ? 'en-IN' : opts.language === 'mr' ? 'mr-IN' : 'hi-IN',
    author: {
      '@type': 'Person',
      name: opts.author || SITE.pandit.name,
      url: `${SITE.url}/about-us/`
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type':'ImageObject', url: `${SITE.url}/images/logo.png` }
    },
    mainEntityOfPage: { '@type':'WebPage', '@id': `${SITE.url}${opts.slug}` }
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type':'Answer', text: a }
    }))
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url.startsWith('http') ? it.url : `${SITE.url}${it.url}`
    }))
  };
}

export function reviewSchema(reviews: { name: string; city: string; rating: number; quote: string; date: Date }[]) {
  return reviews.map(r => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@id': `${SITE.url}/#business` },
    reviewRating: { '@type':'Rating', ratingValue: r.rating, bestRating: 5 },
    author: { '@type':'Person', name: `${r.name}, ${r.city}` },
    reviewBody: r.quote,
    datePublished: r.date.toISOString().split('T')[0]
  }));
}

export function howToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Book Kaal Sarp Dosh Puja in Ujjain',
    description: 'Step-by-step process to book authentic Kaal Sarp Dosh Nivaran Puja in Ujjain with a Vedic pandit.',
    totalTime: 'PT4H',
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'INR', value: `${SITE.pricing.starting}` },
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Contact pandit ji', text: `Call ${SITE.phone.display} and share your name, gotra, and date of birth. Pandit ji will check your kundli to identify the type of Kaal Sarp Dosh.` },
      { '@type': 'HowToStep', position: 2, name: 'Get shubh muhurat', text: 'Pandit ji calculates the auspicious time based on your kundli, panchang, and Nag Panchami / Shravan Somvar / Amavasya alignment.' },
      { '@type': 'HowToStep', position: 3, name: 'Arrive in Ujjain on the booked date', text: 'No advance payment needed. Just confirm your arrival 1 day before. All puja samagri is arranged by us.' },
      { '@type': 'HowToStep', position: 4, name: 'Puja performed by Vedic pandit', text: 'Sankalp → Mantra jaap (108/1008/sava lakh) → Hawan → Tarpan → Daan. Total time: 3-5 hours at Shipra Tat or designated puja sthal.' },
      { '@type': 'HowToStep', position: 5, name: 'Receive prasad + video', text: 'After puja, prasad and sankalp pramaan are given. Puja video is also shared for your records.' }
    ]
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: SITE.nameHi,
    url: SITE.url,
    logo: `${SITE.url}/favicon.svg`,
    telephone: SITE.phone.raw,
    foundingDate: SITE.org.foundingDate,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone.raw,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['Hindi', 'English']
    }
  };
}

export function webPageSchema(opts: { title: string; description: string; slug: string; speakable?: string[]; }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE.url}${opts.slug}#webpage`,
    url: `${SITE.url}${opts.slug}`,
    name: opts.title,
    description: opts.description,
    inLanguage: 'hi-IN',
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': `${SITE.url}/#business` },
    speakable: opts.speakable ? {
      '@type': 'SpeakableSpecification',
      cssSelector: opts.speakable
    } : undefined
  };
}

export function eventMuhuratSchema(events: { date: string; name: string; tithi: string }[]) {
  return events.map(e => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `${e.name} — Kaal Sarp Dosh Puja Ujjain`,
    description: `Auspicious muhurat for Kaal Sarp Dosh Nivaran Puja on ${e.name} (${e.tithi}). Book with Vedic pandit ji in Ujjain.`,
    startDate: e.date,
    endDate: e.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Ujjain — Shipra Tat',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ujjain',
        addressRegion: 'Madhya Pradesh',
        postalCode: '456006',
        addressCountry: 'IN'
      }
    },
    organizer: { '@id': `${SITE.url}/#business` },
    offers: {
      '@type': 'Offer',
      price: SITE.pricing.starting,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: SITE.url
    }
  }));
}

export function reviewItemsToAggregate(reviews: { rating: number }[]) {
  if (!reviews.length) return null;
  const sum = reviews.reduce((a, r) => a + r.rating, 0);
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: { '@id': `${SITE.url}/#business` },
    ratingValue: (sum / reviews.length).toFixed(1),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1
  };
}
