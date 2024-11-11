"use client"
import { useAccount } from "wagmi";

const Layout = ({
  authenticated,
  unauthenticated,
}: Readonly<{
  authenticated: React.ReactNode;
  unauthenticated: React.ReactNode;
}>) => {
  const { address } = useAccount();

  console.log('Current address:', address);
  console.log('Authenticated component:', authenticated);
  console.log('Unauthenticated component:', unauthenticated);

  if (address) {
    return (
      <>
        {authenticated}
        <div style={{ display: 'none' }}>{unauthenticated}</div>
      </>
    );
  }

  return (
    <>
      <div style={{ display: 'none' }}>{authenticated}</div>
      {unauthenticated}
    </>
  );
}

export default Layout;