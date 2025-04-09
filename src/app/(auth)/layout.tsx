import { ReactNode } from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="h-screen w-screen flex items-center justify-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      {children}
    </div>
  );
}
