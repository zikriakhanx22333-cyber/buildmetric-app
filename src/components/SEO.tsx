import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage = 'https://buildmetric-app.vercel.app/og-image.png',
  jsonLd,
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper for setting meta tag by attribute (property or name)
    const setMetaTag = (attrName: 'property' | 'name', attrValue: string, content: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 2. Update Meta Description
    if (description) {
      setMetaTag('name', 'description', description);
    }

    // 3. Update Canonical URL
    const pathname = window.location.pathname === '/' ? '' : window.location.pathname;
    const targetCanonical = canonicalUrl || `https://buildmetric-app.vercel.app${pathname}`;
    
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', targetCanonical);

    // 4. Open Graph Tags
    const finalOgTitle = ogTitle || title;
    const finalOgDesc = ogDescription || description || '';
    const finalOgUrl = ogUrl || targetCanonical;

    setMetaTag('property', 'og:title', finalOgTitle);
    setMetaTag('property', 'og:description', finalOgDesc);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', finalOgUrl);
    setMetaTag('property', 'og:site_name', 'BuildMetric');
    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage);
    }

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', finalOgTitle);
    setMetaTag('name', 'twitter:description', finalOgDesc);
    setMetaTag('name', 'twitter:url', finalOgUrl);
    if (ogImage) {
      setMetaTag('name', 'twitter:image', ogImage);
    }

    // 6. JSON-LD Structured Data
    if (jsonLd) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]#dynamic-seo-jsonld');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        scriptTag.setAttribute('id', 'dynamic-seo-jsonld');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    }

    return () => {
      const scriptTag = document.querySelector('script[type="application/ld+json"]#dynamic-seo-jsonld');
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, [title, description, canonicalUrl, ogType, ogTitle, ogDescription, ogUrl, ogImage, jsonLd]);

  return null;
};
