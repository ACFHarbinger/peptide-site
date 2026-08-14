import type { Metadata } from 'next';
import { LegalPageLayout } from '../../../src/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Terms of Service — PepCore Labs',
  description: 'The terms governing use of the PepCore Labs website and any purchase made through it.',
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" lastReviewed="2026-08-14">
      <p>
        These terms govern your use of the PepCore Labs website and any purchase made through it.
      </p>

      <h2>Eligibility</h2>
      <p>
        You must be 18 or older and a qualified researcher or purchasing on behalf of a research
        institution, as described in our{' '}
        <a href="/legal/research-use-only">Research Use Only Policy</a>. By using this site or
        placing an order, you confirm you meet these requirements.
      </p>

      <h2>Products</h2>
      <ul>
        <li>
          All products are sold strictly for laboratory and research use. See the{' '}
          <a href="/legal/research-use-only">Research Use Only Policy</a> for full detail.
        </li>
        <li>
          Product descriptions and testing information are provided for research reference only
          and are not medical, dosing, or usage advice for humans or animals.
        </li>
        <li>
          We reserve the right to modify, discontinue, or limit the availability of any product
          without notice.
        </li>
      </ul>

      <h2>Orders and payment</h2>
      <ul>
        <li>
          Prices are listed in EUR and are treated as VAT-inclusive unless stated otherwise at
          checkout.
        </li>
        <li>
          Payment is processed by a third-party hosted checkout provider; PepCore Labs does not
          store your payment card details.
        </li>
        <li>
          We reserve the right to refuse or cancel any order, including where we reasonably
          suspect misuse inconsistent with our Research Use Only Policy.
        </li>
      </ul>

      <h2>Shipping</h2>
      <p>
        See our <a href="/legal/shipping">Shipping &amp; Returns</a> page for delivery scope,
        timelines, and return policy.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        Products are supplied &quot;as is&quot; for research use. To the maximum extent permitted
        by law, PepCore Labs is not liable for any use of a product outside its stated Research
        Use Only purpose, or for indirect, incidental, or consequential damages arising from use
        of this site or its products.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the jurisdiction in which PepCore Labs is
        established, without regard to conflict-of-law principles. (Specific jurisdiction to be
        confirmed before commercial launch.)
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms as the site&apos;s features (accounts, checkout, shipping
        scope) evolve. Continued use of the site after changes constitutes acceptance of the
        updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        <a href="mailto:support@pepcorelabs.io">support@pepcorelabs.io</a>
      </p>
    </LegalPageLayout>
  );
}
