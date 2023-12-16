import "@/styles/globals.css";
import { cal, inter,heading } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";

const title =
  " WDHIVE ";
const description =
  "The Platform is build on a group of amazing developers and coders ";
const image = "https://wdhive.com/thumbnail.png";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "WDHIVE ",
    title,
    description,
    images: [image],
    creator: "@wdhive",
  },
  metadataBase: new URL("https://wdhive.com"),
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(cal.variable, heading.variable)}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
