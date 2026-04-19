import { Manrope, Noto_Serif } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-noto-serif',
  display: 'swap',
});

export const metadata = {
  title: 'Nexora Financial Advisory',
  description: 'High-end financial advisory and rigorous reporting tailored for complex enterprises.',
};

import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`light ${manrope.variable} ${notoSerif.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface text-on-surface font-body antialiased selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden">
        {children}
        <Script 
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
