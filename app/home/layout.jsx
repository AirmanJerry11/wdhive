import { RootLayout } from '@/components/home/RootLayout'


export const metadata = {
  title: {
    website:"Web Developers Hive" ,
    default: 'A group of Amazing Developers',
  },
}

export default function Layout({ children }) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
