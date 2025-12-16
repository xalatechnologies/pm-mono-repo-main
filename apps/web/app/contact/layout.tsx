import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import StructuredData from "@/app/components/seo/StructuredData";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact Us",
  description:
    "Contact Pure Minerals AS in Steinkjer, Trøndelag, Norway. Get in touch about investment opportunities, partnership possibilities, VDR access, or learn more about our exploration projects.",
  keywords: [
    "contact Pure Minerals",
    "mining investment contact",
    "Norway mining company contact",
    "Steinkjer mining",
    "investor relations mining",
  ],
  canonical: "https://pureminerals.no/contact",
});

// FAQ data for structured data
const contactFAQs = [
  {
    question: "What types of minerals do you explore?",
    answer: "We focus on copper, zinc, lead, silver, gold, iron, nickel and cobalt. Additionally, our target is traces of REE (Rare Earth Elements).",
  },
  {
    question: "How can I invest in Pure Minerals?",
    answer: "Contact us directly to discuss investment opportunities. We offer various partnership and investment models.",
  },
  {
    question: "Where are your projects located?",
    answer: "Our primary exploration areas are in the Steinkjer region of Trøndelag County, including Skrattåsen and Gaulstad/Mokk.",
  },
  {
    question: "Do you offer site visits?",
    answer: "Yes, we arrange site visits for qualified investors and partners. Please contact us to schedule.",
  },
  {
    question: "What is NorChain tokenization?",
    answer: "Our assets are tokenized on the NorChain blockchain, enabling transparent and accessible investment opportunities.",
  },
  {
    question: "How quickly do you respond?",
    answer: "We aim to respond to all inquiries within 24-48 business hours.",
  },
];

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: "Home", url: "https://pureminerals.no" },
            { name: "Contact", url: "https://pureminerals.no/contact" },
          ],
        }}
      />
      <StructuredData
        type="FAQPage"
        data={{
          faqs: contactFAQs,
        }}
      />
      {children}
    </>
  );
}

