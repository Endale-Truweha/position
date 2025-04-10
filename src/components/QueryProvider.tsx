"use client";
import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()



export const QueryProvader=({ children}    : {
    children: React.ReactNode
  })=> {
  return (
    <div>

    <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  
  </QueryClientProvider>
      
    </div>
  )
}