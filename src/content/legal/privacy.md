<!-- DRAFT for legal review — not final legal advice. Written 2026-08-14 as part of Milestone 1. -->

# Privacy Policy

This policy explains what information PepCore Labs collects and how it is used. It will be updated as account creation (Firebase Authentication) and checkout (hosted redirect) features ship — see [`docs/adr/0005`](https://github.com/ACFHarbinger/peptide-site/blob/main/docs/adr/0005-accounts-firebase-auth.md) and [`docs/adr/0004`](https://github.com/ACFHarbinger/peptide-site/blob/main/docs/adr/0004-checkout-hosted-redirect.md).

## What we collect

- **Account information**, if you create an account: email address and any profile details you provide, via Firebase Authentication.
- **Cart contents**, stored locally in your browser (not on our servers) until you check out.
- **Order information**, at checkout: shipping address, contact details, and order contents. Payment details are collected and processed entirely by our hosted checkout provider (e.g. Stripe) — PepCore Labs never receives or stores your full card number.
- **Basic technical data** standard to any web request (IP address, browser type) via our hosting provider's server logs.

## What we do not collect

- We do not sell your personal data.
- We do not collect payment card details directly.
- We do not use tracking cookies for advertising without a separate, explicit consent mechanism (not yet implemented).

## How we use it

- To fulfill and communicate about your order.
- To operate your account, if you create one.
- To meet legal and tax obligations (e.g. records required for EU commerce).

## Your rights

Under EU data protection law (GDPR), you may request access to, correction of, or deletion of your personal data. Contact [support@pepcorelabs.io](mailto:support@pepcorelabs.io) to make a request.

## Third parties

We share order and account data only with the service providers necessary to operate the store (e.g. Firebase for authentication, our checkout provider for payment processing), each bound by their own privacy terms.

## Changes

We will update this page as new features (accounts, checkout) go live and update the "last reviewed" date once this draft is finalized.
