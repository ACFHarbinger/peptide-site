import type { Metadata } from 'next';
import { LegalPageLayout } from '../../../src/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy — PepCore Labs',
  description: 'What PepCore Labs collects, why, and your data protection rights.',
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastReviewed="2026-08-14">
      <p>
        This policy explains what information PepCore Labs collects and how it is used. It will
        be updated as account creation (Firebase Authentication) and checkout (hosted redirect)
        features ship.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Account information</strong>, if you create an account: email address and any
          profile details you provide, via Firebase Authentication.
        </li>
        <li>
          <strong>Cart contents</strong>, stored locally in your browser (not on our servers)
          until you check out.
        </li>
        <li>
          <strong>Order information</strong>, at checkout: shipping address, contact details, and
          order contents. Payment details are collected and processed entirely by our hosted
          checkout provider (e.g. Stripe) — PepCore Labs never receives or stores your full card
          number.
        </li>
        <li>
          <strong>Basic technical data</strong> standard to any web request (IP address, browser
          type) via our hosting provider&apos;s server logs.
        </li>
      </ul>

      <h2>What we do not collect</h2>
      <ul>
        <li>We do not sell your personal data.</li>
        <li>We do not collect payment card details directly.</li>
        <li>
          We do not use tracking cookies for advertising without a separate, explicit consent
          mechanism (not yet implemented).
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To fulfill and communicate about your order.</li>
        <li>To operate your account, if you create one.</li>
        <li>To meet legal and tax obligations (e.g. records required for EU commerce).</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Under EU data protection law (GDPR), you may request access to, correction of, or
        deletion of your personal data. Contact{' '}
        <a href="mailto:support@pepcorelabs.io">support@pepcorelabs.io</a> to make a request.
      </p>

      <h2>Third parties</h2>
      <p>
        We share order and account data only with the service providers necessary to operate the
        store (e.g. Firebase for authentication, our checkout provider for payment processing),
        each bound by their own privacy terms.
      </p>

      <h2>Changes</h2>
      <p>
        We will update this page as new features (accounts, checkout) go live and update the
        &quot;last reviewed&quot; date once this draft is finalized.
      </p>
    </LegalPageLayout>
  );
}
