import { Helmet } from 'react-helmet-async';

interface JsonLDProps {
  data: object;
}

export const JsonLD = ({ data }: JsonLDProps) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
};

// Common organization schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AutomateFlow",
  "url": "https://your-domain.com",
  "logo": "https://your-domain.com/logo.png",
  "description": "Leading automation solutions for MSMEs to streamline operations and drive growth.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-XXXXXXXXXX",
    "contactType": "customer service",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://linkedin.com/company/automateflow",
    "https://twitter.com/automateflow"
  ]
};

// Website schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AutomateFlow",
  "url": "https://your-domain.com",
  "description": "Automation solutions for MSMEs",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://your-domain.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

// Service schema generator
export const createServiceSchema = (serviceName: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": description,
  "url": url,
  "provider": {
    "@type": "Organization",
    "name": "AutomateFlow"
  },
  "serviceType": "Business Automation",
  "areaServed": "IN"
});

// Article schema generator
export const createArticleSchema = (title: string, description: string, url: string, publishedDate?: string, author?: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "url": url,
  "datePublished": publishedDate || new Date().toISOString(),
  "author": {
    "@type": "Person",
    "name": author || "AutomateFlow Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "AutomateFlow",
    "logo": {
      "@type": "ImageObject",
      "url": "https://your-domain.com/logo.png"
    }
  }
});

// Blog posting schema generator
export const createBlogPostSchema = (title: string, content: string, url: string, publishedDate: string, author: string, category?: string) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": title,
  "articleBody": content.substring(0, 500) + "...", // Truncated content
  "url": url,
  "datePublished": publishedDate,
  "dateModified": publishedDate,
  "author": {
    "@type": "Person",
    "name": author
  },
  "publisher": {
    "@type": "Organization",
    "name": "AutomateFlow",
    "logo": {
      "@type": "ImageObject",
      "url": "https://your-domain.com/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": url
  },
  ...(category && { "articleSection": category })
});

// FAQ schema generator
export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Breadcrumb schema generator
export const createBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});