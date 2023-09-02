import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Oracles: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="G.O.A.T | Oracles"
        description="Available Oracles."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="" data-theme="oracles">
        <p>oracles</p>
      </div>
    </>
  );
};

export default Oracles;
