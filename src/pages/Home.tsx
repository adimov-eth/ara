export default function Home() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to Aravt</h1>
      <p className="mt-4 text-lg text-gray-600">
        Welcome to Aravt Systems, newcomer! This is a modern Telegram Application built with TON
        Click Browse Aravts to see available aravts to join and become Leader to create your own Aravt.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900">Browse Aravts</h2>
          <p className="mt-2 text-gray-600">Choose Aravts and their places in the System, compare projects and join one of them</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900">Get Help</h2>
          <p className="mt-2 text-gray-600">Get support on our forum or live chat with Global Aravts.</p>
        </div>
      </div>
    </div>
  )
} 