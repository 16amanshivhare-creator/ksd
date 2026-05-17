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
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: SITE.hours.open,
      closes: SITE.hours.close
    }],
    aggregateRating: SITE.gmb.reviewCount ? {
      '@type': 'AggregateRating',
      ratingValue: SITE.gmb.rating,
      reviewCount: SITE.gmb.reviewCount,
      bestRating: 5,
      worstRating: 1
    } : undefined,
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
  name: string; nameHi?: string; description: string; slug: string; price?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE.url}${opts.slug}#service`,
    name: opts.name,
    alternateName: opts.nameHi,
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
