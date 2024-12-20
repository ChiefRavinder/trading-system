import UserUi from "@/components/ClientUi"

export default function ClientPage() {
  return (
    <div className="container mx-auto p-4 bg-gray-900 ">
      <h1 className="text-3xl font-bold mb-4 text-white">Client Interface</h1>
      <UserUi />
    </div>
  )
}

