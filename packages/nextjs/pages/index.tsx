import Link from "next/link";
import type { NextPage } from "next";
import { CubeTransparentIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">🐐 Welcome to G.O.A.T. - Groundbreaking Oracle Aggregator Technology</h1>


        <ul className="mb-6 space-y-4">
          <li>
            <Link href="/oracles">
              <CubeTransparentIcon className="h-4 w-4" />
              Oracles
            </Link>
          </li>
          <li>
            <Link href="/inventory">
              <Square3Stack3DIcon className="h-4 w-4" />
              Inventory
            </Link>
          </li>
        </ul>

        <div className="founders mb-6">
          <h2 className="text-2xl mb-4">Meet the Founders</h2>

          <div className="flex gap-6 justify-center">
            <div className="founder flex flex-col items-center w-1/4">
              <div className="image-placeholder w-32 h-32 bg-gray-300 mb-4">
                <Image
                    src={"/assets/founder_alex.png"}
                    alt="founder_alex"
                    layout="responsive"
                    className="rounded"
                    width={50}
                    height={50}
                />
              </div>
              <h3 className="mb-2">Aleksander (Alex)</h3>
              <p className="text-sm mb-2 text-center">Aleksander (Alex) is a Full Stack Developer (~8+ y/o exp) skilled in a vast range of technologies, programming languages, architectures and tools, including web3.</p>
              <a href="https://linkedin.com/in/aleksanderwojcik/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>

            <div className="founder flex flex-col items-center w-1/4">
              <div className="image-placeholder w-32 h-32 bg-gray-300 mb-4">
                <Image
                    src={"/assets/founder_arjan.jpg"}
                    alt="founder_arjan"
                    layout="responsive"
                    className="rounded"
                    width={50}
                    height={50}
                />
              </div>
              <h3 className="mb-2">Arjan van Hoogdalem</h3>
              <p className="text-sm mb-2 text-center">Backend & smart contract developer. Game theory, defi, and iGaming enthusiast.</p>
              <a href="https://twitter.com/arjanjohan/" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>

            <div className="founder flex flex-col items-center w-1/4">
              <div className="image-placeholder w-32 h-32 bg-gray-300 mb-4">
                <Image
                    src={"/assets/founder_alexe.jpg"}
                    alt="founder_alexe"
                    layout="responsive"
                    className="rounded"
                    width={50}
                    height={50}
                />
              </div>
              <h3 className="mb-2">Alexe Luca Spataru</h3>
              <p className="text-sm mb-2 text-center">Web3 founder, smart contract guru, and blockchain advocate.</p>
              <a href="https://twitter.com/urataps/" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Home;
