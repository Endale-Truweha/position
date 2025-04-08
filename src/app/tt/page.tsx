'use client'

import { useEffect, useState } from 'react'

type TT = {
  id: string
  tt: string
  customerPhone: string
  createdAt: string
}

export default function TTListPage() {
  const [ttList, setTtList] = useState<TT[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTTs = async () => {
      try {
        const res = await fetch('/api/tt')
        const data = await res.json()
        setTtList(data)
      } catch (err) {
        console.error('Failed to fetch TTinformation:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTTs()
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All TTinformation Records</h1>

      {loading ? (
        <p>Loading...</p>
      ) : ttList.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <div className="space-y-4">
          {ttList.map((tt) => (
            <div key={tt.id} className="p-4 border rounded shadow-sm">
              <p><strong>TT:</strong> {tt.tt}</p>
              <p><strong>Phone:</strong> {tt.customerPhone}</p>
              <p><strong>custemerlocation:</strong> {tt.location.latitude} {tt.location.longitude}</p>
              <p><strong>Created:</strong> {new Date(tt.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
