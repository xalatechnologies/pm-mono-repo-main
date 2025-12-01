import StandardCard from "../components/cards/StandardCard";

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-1">
      <StandardCard
        title="Company"
        content={["Pure Minerals AS", "Organization Number: NO 928 309 231 MVA"]}
        compressed
      />

      <StandardCard
        title="Address"
        content={["Ølvegata 18B", "7715 STEINKJER", "NORWAY"]} // Placeholder address, replace with real one
        compressed
      />

      <StandardCard
        title="Email"
        content={
          <a href="mailto: post@pureminerals.no" className="text-blue-600 hover:underline">
            post@pureminerals.no
          </a>
        }
        compressed
      />

      {/* <StandardCard
        title="Phone"
        content={
          <a href="tel:+4790964445" className="text-blue-600 hover:underline">
            +47 909 64 445
          </a>
        }
        compressed
      /> */}

      <StandardCard
        title="Website"
        content={
          <a
            href="https://pureminerals.no"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            pureminerals.no
          </a>
        }
        compressed
      />
    </div>
  );
}
