import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import '../src/style.css';
import { ReduxProvider } from '../src/store/Provider';
import { ScrollToHash } from '../src/components/ScrollToHash';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PepCore Labs — Premium Research Peptides',
  description:
    'Ultra-pure, independently verified research peptides trusted by researchers across the EU. Every batch HPLC-verified at ≥99% purity.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" className={ibmPlexSans.className}>
      <body>
        <ReduxProvider>
          <ScrollToHash />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
