'use client'

import React, { ReactNode } from 'react';
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const ConvexProviderComponent = ({children}: {children: ReactNode}) => {
  return (
    <ConvexProvider client={convex}>
      {children}
    </ConvexProvider>
  )
}

export default ConvexProviderComponent