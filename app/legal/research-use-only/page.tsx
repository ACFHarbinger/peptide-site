import type { Metadata } from 'next';
import { LegalPageLayout } from '../../../src/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Research Use Only Policy — PepCore Labs',
  description: 'Who may purchase from PepCore Labs and what Research Use Only means.',
};

export default function ResearchUseOnlyPage() {
  return (
    <LegalPageLayout title="Research Use Only Policy" lastReviewed="2026-08-14">
      <p>
        PepCore Labs sells research compounds exclusively for{' '}
        <strong>laboratory and research purposes</strong>. By purchasing from this site, you
        confirm and agree to all of the following.
      </p>

      <h2>Who may purchase</h2>
      <ul>
        <li>You are <strong>18 years of age or older</strong>.</li>
        <li>
          You are a <strong>qualified researcher</strong>, laboratory professional, or
          institution conducting legitimate scientific research, or purchasing on behalf of one.
        </li>
        <li>
          You will not use, or allow any other person to use, any product purchased from PepCore
          Labs for human consumption, medical treatment, veterinary use, cosmetic application, or
          any household purpose.
        </li>
      </ul>

      <h2>What &quot;Research Use Only&quot; means</h2>
      <ul>
        <li>
          Products are supplied strictly for <strong>in-vitro and laboratory research</strong> —
          not for diagnostic, therapeutic, or any clinical purpose in humans or animals.
        </li>
        <li>
          No content on this site, including product descriptions, testing information, or FAQ
          answers, constitutes medical advice, a dosing recommendation, or an endorsement of any
          use outside a laboratory research setting.
        </li>
        <li>
          Any resemblance between a product name and a substance studied in human or veterinary
          medicine does not imply this product is approved, tested, or intended for that use.
        </li>
      </ul>

      <h2>Testing and documentation</h2>
      <p>
        Every batch is analyzed by an independent laboratory before release (see{' '}
        <a href="/#testing">Testing &amp; Analysis</a>). At this time, PepCore Labs provides
        general purity/testing information rather than a downloadable Certificate of Analysis
        (COA) per lot; lot-specific documentation is available on request and will be published
        directly on product pages once that process is in place (see the project roadmap).
      </p>

      <h2>Shipping scope</h2>
      <p>
        Products currently ship within the EU27 member states. Shipping to a destination is not,
        by itself, a determination that a given product is lawful to import, possess, or use
        there — that determination is the purchaser&apos;s responsibility.
      </p>

      <h2>Enforcement</h2>
      <p>
        PepCore Labs reserves the right to refuse or cancel any order it reasonably believes is
        intended for human, veterinary, or household use, or that violates this policy.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy:{' '}
        <a href="mailto:support@pepcorelabs.io">support@pepcorelabs.io</a>.
      </p>
    </LegalPageLayout>
  );
}
