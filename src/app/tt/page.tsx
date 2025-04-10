'use client'

import { fetchSites, Site } from '@/lib/data'
import { useEffect, useState } from 'react'
import {  Terminal } from "lucide-react"


 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useQuery } from '@tanstack/react-query'



export default function TTListPage() {
  
  

 
  const fetchList = async (/* { queryKey }: any */) => {
  
    // const t = queryKey[1];
  
       const response = await fetch("/api/tt");
       const data = await response.json();
       console.log(data)
       return data;
       
     }


     const { isPending, isError, data, error } = useQuery({
      queryKey: ['requst'],
      queryFn: fetchList,
    })
  
    if (isPending) {
      return <span>Loading...</span>
  
    }
  
    if (isError) {
      return <span>Error: {error.message}</span>
    }








  return (
    <div className="max-w-2xl mx-auto w-full p-6">
      <h1 className="text-2xl font-bold mb-4">All TTinformation Records</h1>

      { data.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <div className=" m-auto w-full space-y-4">
          {data.map((tt: Site) => (
            <div key={tt.id} className="m-4">

<Alert className={tt.location ? '' : ' border-ethRed-500'}>

      <Terminal className="h-4 w-4" />
      <AlertTitle>Customer Name</AlertTitle>
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
