export const metadata = {
  title: 'タスク管理アプリ',
  description: 'タスクを管理するアプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
