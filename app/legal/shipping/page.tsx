import type { Metadata } from 'next';
import { LegalPageLayout } from '../../../src/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Shipping & Returns — PepCore Labs',
  description: 'EU shipping scope, dispatch times, packaging, and our returns policy.',
};

export default function ShippingPage() {
  return (
    <LegalPageLayout title="Shipping & Returns" lastReviewed="2026-08-14">
      <h2>Shipping scope</h2>
      <p>
        We currently ship to all <strong>EU27 member states</strong>. Shipping to a given country
        does not, by itself, confirm that a specific product may lawfully be imported, possessed,
        or used there — that determination is the purchaser&apos;s responsibility. See our{' '}
        <a href="/legal/research-use-only">Research Use Only Policy</a>.
      </p>

      <h2>Dispatch times</h2>
      <p>
        Orders placed before 3pm CET are typically dispatched the same business day. EU delivery
        generally takes 2–5 business days depending on destination.
      </p>

      <h2>Packaging</h2>
      <p>
        All orders ship in discreet, temperature-stable packaging with no external branding
        indicating contents. Lyophilized vials are shipped ambient unless a product page states
        otherwise.
      </p>

      <h2>Free shipping</h2>
      <p>
        Orders meeting the free-shipping threshold displayed in your cart qualify for free
        same-day dispatch shipping automatically — no code needed.
      </p>

      <h2>Returns</h2>
      <p>
        Because products are supplied for laboratory research use and are shipped in
        tamper-evident packaging, we can only accept returns for:
      </p>
      <ul>
        <li>
          Items damaged in transit (contact us within 48 hours of delivery with photos of the
          damage), or
        </li>
        <li>Items shipped in error on our part.</li>
      </ul>
      <p>
        Contact <a href="mailto:support@pepcorelabs.io">support@pepcorelabs.io</a> with your order
        number to start a return or report an issue. Refunds, once approved, are issued to the
        original payment method via our checkout provider.
      </p>

      <h2>Lost or delayed shipments</h2>
      <p>
        If a shipment appears lost or significantly delayed, contact us and we will investigate
        with the carrier and, where appropriate, arrange a reshipment or refund.
      </p>
    </LegalPageLayout>
  );
}
