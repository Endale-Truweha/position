
import Image from 'next/image'
import Link from 'next/link'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  

function Navbar() {
  return (
    <div className=' sticky top-0 z-50   flex  justify-between  items-center   w-full bg-ethLime-500 border-b-4 border-ethGray-500' >
        
        <div  className=' rounded-tr-3xl  p-2.5  bg-ethGray-50'>
        <Link href="/">
            <Image src='/photoDagm3.png' alt='5G' width={163} height={42} />
            </Link>
        </div>

        <div >
       {/*  <Image src='/5G Logo.png' alt='5G' width={81} height={22} /> */}
   
    
</div>
       
        

<div>




<Breadcrumb  className='mr-6'>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Menu</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/tt">List</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
    <BreadcrumbLink href="/tt/new">New Entry</BreadcrumbLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>







</div>

   
         </div>
  )
}

export default Navbar