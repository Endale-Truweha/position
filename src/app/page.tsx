"use client";
import MapsNavigator from '@/components/MapsNavigator';
import OpenGoogleMaps from '@/components/OpenGoogleMaps';

import SplashScreen from '@/components/SplashScreen';
import { useState } from 'react';

function Page() {  // ✅ Renamed to "Page"
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      {isLoading ? (
        <SplashScreen onFinish={() => setIsLoading(false)} />
      ) : (
        <main>
          <OpenGoogleMaps />
          <MapsNavigator/>
        </main>
      )}
    </div>
  );
}

export default Page;
