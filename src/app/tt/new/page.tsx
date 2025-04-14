'use client'

import { useState } from 'react'
//import { useRouter } from 'next/navigation'

export default function NewTTForm() {
 // const router = useRouter()
  const [tt, setTt] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/tt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tt, customerPhone }),
    })

    setLoading(false)
    if (res.ok) {
      //router.push('/tt') // redirect to TT list page
      setOk(true)

    } else {
      alert('Failed to create TT info')
    }
  }

  return (
    <div>
       <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      @call center agent can create new TT  and Link 
    </code>
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8">
      <input
        type="text"
        placeholder="TT Number"
        value={tt}
        onChange={(e) => setTt(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Customer Phone"
        value={customerPhone}
        onChange={(e) => setCustomerPhone(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className=" bg-ethLime-500 text-white px-4 py-2 rounded hover:bg-ethLime-600"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>

    {ok===true?  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold mt-12">
      https://position-xisx.vercel.app/location/{tt}
    </code>:""}
 

    </div>
  )
}
