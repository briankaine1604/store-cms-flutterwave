export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-100 p-5">
      {children}
    </div>
  );
}
