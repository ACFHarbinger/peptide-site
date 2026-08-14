import type { Metadata } from 'next';
import '../src/style.css';
import { ReduxProvider } from '../src/store/Provider';

export const metadata: Metadata = {
  title: 'PepCore Labs — Premium Research Peptides',
  description:
    'Ultra-pure, lab-tested research peptides trusted by researchers across the EU. No fillers. No gimmicks. Just science.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
