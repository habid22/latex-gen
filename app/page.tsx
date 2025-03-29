// app/page.tsx
export default function Page() {
  return (
    <main className="p-8">
      <section className="mb-8">
        <h1 className="font-cmu text-3xl mb-2">Computer Modern Regular (400)</h1>
        <p className="font-cmu">
          This text is rendered using the regular Computer Modern font.
        </p>
      </section>

      <section className="mb-8">
        <h1 className="font-cmu font-bold text-3xl mb-2">Computer Modern Bold (700)</h1>
        <p className="font-cmu font-bold">
          This text is rendered using the bold Computer Modern font.
        </p>
      </section>

      <section className="mb-8">
        <h1 className="font-cmuItalic text-3xl mb-2">
          Computer Modern Italic (400 Italic)
        </h1>
        <p className="font-cmuItalic">
          This text is rendered using the italic variant.
        </p>
      </section>
    </main>
  );
}
