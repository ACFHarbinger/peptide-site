import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <main className="container" style={{ minHeight: '60vh', paddingBlock: '96px' }}>
      <span className="eyebrow">Catalog</span>
      <h1 style={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)', lineHeight: 1, marginBottom: '16px' }}>
        Product not found
      </h1>
      <p style={{ marginBottom: '28px', maxWidth: '46ch' }}>
        This research catalog item is unavailable or the link is incorrect.
      </p>
      <Link href="/catalog" className="btn btn-primary">
        Back to catalog
      </Link>
    </main>
  );
}
