import { useState, useEffect } from 'react'

function App() {
  const [health, setHealth] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [greeting, setGreeting] = useState<string>('')

  // Check health status
  useEffect(() => {
    fetch(`${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/health`)
      .then(res => res.json())
      .then(data => setHealth(data.status))
      .catch(err => {
        setHealth('Error')
        console.error('Error fetching health:', err)
      })
  }, [])

  // Get hello message
  const fetchHello = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/hello`)
      const data = await res.json()
      setMessage(data.message)
    } catch (err) {
      console.error('Error fetching hello:', err)
    }
  }

  // Get personalized greeting
  const handleGreet = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) return

    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/greet/${name}`)
      const data = await res.json()
      setGreeting(data.message)
    } catch (err) {
      console.error('Error fetching greeting:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <div className="space-y-8">
          {/* Health Status */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Health Status</h2>
            <div className="mt-2 flex items-center">
              <div className={`h-3 w-3 rounded-full ${health === 'ok' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="ml-2 text-sm text-gray-600 capitalize">{health || 'Checking...'}</span>
            </div>
          </div>

          {/* Hello Message */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Hello Message</h2>
            <button
              onClick={fetchHello}
              className="mt-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Get Message
            </button>
            {message && (
              <p className="mt-2 text-sm text-gray-600">{message}</p>
            )}
          </div>

          {/* Greeting Form */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Personal Greeting</h2>
            <form onSubmit={handleGreet} className="mt-2 space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-2 py-1"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Get Greeting
              </button>
            </form>
            {greeting && (
              <p className="mt-2 text-sm text-gray-600">{greeting}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
