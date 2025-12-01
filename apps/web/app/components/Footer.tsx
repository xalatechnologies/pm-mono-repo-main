// app/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-[var(--dark-grey)] p-6 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <p>© {new Date().getFullYear()} Pure Minerals AS. All rights reserved.</p>
      </div>
    </footer>
  );
}
