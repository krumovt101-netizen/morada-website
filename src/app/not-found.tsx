import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center bg-paper px-6">
      <div className="relative z-10 text-center">
        <p className="t-data text-ink-dim">Morada · Lisboa</p>
        <p className="t-numeral mt-8 text-7xl text-ink sm:text-8xl">404</p>
        <h1 className="t-headline mt-4 text-2xl text-ink">
          Esta página não existe.
        </h1>
        <p className="t-body mx-auto mt-3 max-w-sm text-sm text-ink-dim">
          As casas têm morada certa. Esta página é que não.
        </p>
        <Link
          href="/pt"
          className="t-data mt-8 inline-block bg-azulejo px-6 py-3.5 text-paper transition-colors hover:bg-azulejo-deep"
        >
          Voltar ao início →
        </Link>
      </div>
    </main>
  );
}
