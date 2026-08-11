import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
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
  jsonLd,
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Meta Description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    // 3. Update Canonical URL
    const targetCanonical = canonicalUrl || window.location.href.split('?')[0];
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', targetCanonical);

    // Helper for setting meta property
    const setOgMeta = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 4. Open Graph Tags
    setOgMeta('og:title', ogTitle || title);
    setOgMeta('og:description', ogDescription || description || '');
    setOgMeta('og:type', ogType);
    setOgMeta('og:url', ogUrl || targetCanonical);

    // 5. JSON-LD Structured Data
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
      // Cleanup dynamically injected script if needed
      const scriptTag = document.querySelector('script[type="application/ld+json"]#dynamic-seo-jsonld');
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, [title, description, canonicalUrl, ogType, ogTitle, ogDescription, ogUrl, jsonLd]);

  return null;
};
