// File: src/app/client/layout.tsx
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center text-xl font-bold">
        Client Interface
      </header>
      <main className="p-6 max-w-4xl mx-auto">{children}</main>
    </div>
  );
}
