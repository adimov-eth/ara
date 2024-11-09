export default function Home() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-4xl font-bold text-gray-900">Welcome Home</h1>
      <p className="mt-4 text-lg text-gray-600">
        Welcome to our application! This is a modern React application built with TypeScript and React Router.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900">Feature One</h2>
          <p className="mt-2 text-gray-600">Description of your first main feature.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900">Feature Two</h2>
          <p className="mt-2 text-gray-600">Description of your second main feature.</p>
        </div>
      </div>
    </div>
  )
} 