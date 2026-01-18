import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Solaris | Strong Light, Controlled Fights',
  description: 'Solaris - Premium athletic apparel. Strong Light, Controlled Fights',
  keywords: 'Solaris, Athletic Apparel, Performance Wear, Sportswear, Training Gear',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
