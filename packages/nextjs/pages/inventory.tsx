import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import inventoryData from "~~/components/inventory/inventoryData.json";

const Inventory: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="G.O.A.T | Nft Inventory"
        description="Available Nfts for you."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="" data-theme="inventory">
        <p>inventory</p>
      </div>
    </>
  );
};

export default Inventory;
