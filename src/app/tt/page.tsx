'use client'

import { fetchSites, Site } from '@/lib/data'
import { useEffect, useState } from 'react'
import {  Terminal } from "lucide-react"


 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"



export default function TTListPage() {
  const [ttList, setTtList] = useState<Site[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTTs = async () => {
      try {
        fetchSites().then( setTtList);
       
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
        <p>loading...</p>
      ) : ttList.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <div className="space-y-4">
          {ttList.map((tt) => (
            <div key={tt.id} className="m-4">

<Alert className={tt.location ? 'bg-ethGreen-300' : 'bg-ethGreen-200'}>

      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
      <p><strong>TT:</strong> {tt.tt}</p>
              <p><strong>Phone:</strong> {tt.customerPhone}</p>
           {/*    
              <Button   onClick={() =>
              openGoogleMaps(parseFloat(tt.location?.latitude?.toString() ?? '0'), parseFloat(tt.location?.longitude?.toString() ?? '0'))
            } className='w-full  bg-ethGray-400 hover:bg-ethGray-500'>
                    
                  <p className="flex  justify-between items-center gap-1 w-full text-ethBlack-500"><MapPinned color="#8DC63F" /> Map</p>
              
                  </Button> */}
              <p><strong>Created:</strong> {new Date(tt.createdAt).toLocaleString()}</p>
      </AlertDescription>
    </Alert>

             
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
