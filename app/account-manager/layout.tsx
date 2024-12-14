export default function AccountManagerLayout({ children }: { children: React.ReactNode }) {
    return (
      <section>
        <header className="bg-green-600 text-white p-4">Account Manager Dashboard</header>
        <div>{children}</div>
      </section>
    );
  }
  