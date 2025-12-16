const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pureminerals.no";

interface GeoCoordinate {
  latitude: number;
  longitude: number;
}

interface MiningProjectData {
  name: string;
  description?: string;
  minerals?: string[];
  area?: string;
  licenses?: number;
  coordinates?: GeoCoordinate;
  geoShape?: number[][];
  established?: string;
  status?: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface StructuredDataProps {
  type?: "Organization" | "WebSite" | "BreadcrumbList" | "Article" | "LocalBusiness" | "FinancialProduct" | "MiningProject" | "GeoPlace";
  url?: string;
  data?: Record<string, unknown> & Partial<{
    items: BreadcrumbItem[];
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    project: MiningProjectData;
    coordinates: GeoCoordinate;
    geoShape: number[][];
    minerals: string[];
    name: string;
  }>;
}

export default function StructuredData({ type = "Organization", url, data }: StructuredDataProps) {
  const currentUrl = url || SITE_URL;

  const getStructuredData = () => {
    switch (type) {
      case "Organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Pure Minerals AS",
          legalName: "Pure Minerals AS",
          url: SITE_URL,
          logo: `${SITE_URL}/logo.svg`,
          description:
            "Norwegian exploration company focused on sustainable mineral development in Trøndelag, Norway.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Steinkjer",
            addressRegion: "Trøndelag",
            addressCountry: "NO",
          },
          contactPoint: {
            "@type": "ContactPoint",
            email: "contact@pureminerals.no",
            contactType: "Customer Service",
          },
          sameAs: [
            // Add social media links when available
            // "https://www.linkedin.com/company/pure-minerals",
            // "https://twitter.com/pureminerals",
          ],
          ...data,
        };

      case "WebSite":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Pure Minerals",
          url: SITE_URL,
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${SITE_URL}/articles?search={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
          ...data,
        };

      case "LocalBusiness":
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Pure Minerals AS",
          image: `${SITE_URL}/logo.svg`,
          "@id": SITE_URL,
          url: SITE_URL,
          telephone: "",
          address: {
            "@type": "PostalAddress",
            streetAddress: "",
            addressLocality: "Steinkjer",
            addressRegion: "Trøndelag",
            postalCode: "",
            addressCountry: "NO",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 64.0147,
            longitude: 11.4953,
          },
          ...data,
        };

      case "BreadcrumbList":
        const breadcrumbs = data?.items || [];
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map(
            (item: { name: string; url: string }, index: number) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: item.url,
            })
          ),
        };

      case "Article":
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: data?.headline || "",
          description: data?.description || "",
          image: data?.image ? `${SITE_URL}${data.image}` : `${SITE_URL}/logo.svg`,
          datePublished: data?.datePublished || "",
          dateModified: data?.dateModified || "",
          author: {
            "@type": "Organization",
            name: "Pure Minerals AS",
          },
          publisher: {
            "@type": "Organization",
            name: "Pure Minerals AS",
            logo: {
              "@type": "ImageObject",
              url: `${SITE_URL}/logo.svg`,
            },
          },
          ...data,
        };

      case "FinancialProduct":
        return {
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          name: "Pure Minerals Mining Assets",
          description:
            "Tokenized mining exploration assets on NorChain blockchain. Investment opportunity in Norwegian mineral exploration.",
          provider: {
            "@type": "Organization",
            name: "Pure Minerals AS",
          },
          ...data,
        };

      case "MiningProject":
        const project = data?.project;
        return {
          "@context": "https://schema.org",
          "@type": "Place",
          additionalType: "https://schema.org/MineAction",
          name: project?.name || "Mining Project",
          description: project?.description || "",
          url: currentUrl,
          geo: project?.coordinates ? {
            "@type": "GeoCoordinates",
            latitude: project.coordinates.latitude,
            longitude: project.coordinates.longitude,
          } : undefined,
          // GeoShape for license area polygon
          ...(project?.geoShape && {
            geoShape: {
              "@type": "GeoShape",
              polygon: project.geoShape.map(coord => `${coord[1]},${coord[0]}`).join(" "),
            },
          }),
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Trøndelag",
            containedInPlace: {
              "@type": "Country",
              name: "Norway",
              identifier: "NO",
            },
          },
          // Mining-specific properties
          ...(project?.minerals && {
            material: project.minerals.map(mineral => ({
              "@type": "Product",
              name: mineral,
              category: "Mineral Resource",
            })),
          }),
          additionalProperty: [
            ...(project?.area ? [{
              "@type": "PropertyValue",
              name: "License Area",
              value: project.area,
              unitText: "km²",
            }] : []),
            ...(project?.licenses ? [{
              "@type": "PropertyValue",
              name: "Mining Licenses",
              value: project.licenses,
            }] : []),
            ...(project?.status ? [{
              "@type": "PropertyValue",
              name: "Project Status",
              value: project.status,
            }] : []),
            ...(project?.established ? [{
              "@type": "PropertyValue",
              name: "Established",
              value: project.established,
            }] : []),
          ],
          ...data,
        };

      case "GeoPlace":
        return {
          "@context": "https://schema.org",
          "@type": "Place",
          name: data?.name || "Pure Minerals Exploration Area",
          description: data?.description || "Norwegian mineral exploration site in Trøndelag",
          url: currentUrl,
          geo: data?.coordinates ? {
            "@type": "GeoCoordinates",
            latitude: data.coordinates.latitude,
            longitude: data.coordinates.longitude,
          } : {
            "@type": "GeoCoordinates",
            latitude: 64.0147,
            longitude: 11.4953,
          },
          ...(data?.geoShape && {
            geoShape: {
              "@type": "GeoShape",
              polygon: data.geoShape.map((coord: number[]) => `${coord[1]},${coord[0]}`).join(" "),
            },
          }),
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Trøndelag",
            containedInPlace: {
              "@type": "Country",
              name: "Norway",
            },
          },
          ...(data?.minerals && {
            amenityFeature: data.minerals.map((mineral: string) => ({
              "@type": "LocationFeatureSpecification",
              name: mineral,
              value: true,
            })),
          }),
          ...data,
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

