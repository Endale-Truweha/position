import LocationPage from "../location"

export default async function Page({
    params,
  }: {
    params: Promise<{ tt: string }>
  }) {
    const { tt } = await params
    return (<>
    <LocationPage slug={tt}/> 
   

    </>)
    
    
  }