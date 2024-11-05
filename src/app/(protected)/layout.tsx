"use client"
import { useEffect, useState } from "react";

const Layout = ({
  authenticated,
  unauthenticated,
  notRegistered
}: Readonly<{
  authenticated: React.ReactNode;
  unauthenticated: React.ReactNode;
  notRegistered: React.ReactNode;
}>) => {
  // const { isLoading, authStatus } = useChromia();
  const [isInitialLoad, setIsInitialLoad] = useState(false);

  if (isInitialLoad) {
    return <div>Starting up</div>
  }

  return <div>{unauthenticated}</div>
}

export default Layout;