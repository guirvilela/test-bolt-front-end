import { Poppins } from "next/font/google";
import "./globals.css";

const poppinsisplay = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppinsisplay.className}  antialiased`}>
        {children}
      </body>
    </html>
  );
}
