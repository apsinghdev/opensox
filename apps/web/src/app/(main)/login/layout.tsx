export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 relative h-full overflow-hidden">{children}</div>
  );
}
