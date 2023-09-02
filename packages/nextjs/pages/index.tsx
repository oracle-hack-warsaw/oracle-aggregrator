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

        <div className="highlighted-section p-4 rounded-lg border-2 border-gray-300">
          <h2 className="text-2xl mb-4 font-semibold">Unleashing the Future with G.O.A.T.</h2>
          <p className="mb-4">
            🔥 Fantastic revelations for the crypto world! We've achieved seamless integration with both <strong>Chronicle</strong> and <strong>ChainLink</strong>, showcasing our unparalleled dedication to delivering only the best. With G.O.A.T., you're not just stepping into another platform but embarking on a revolutionary journey.
          </p>
          <br/>

          <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl mb-2">
                <CubeTransparentIcon className="h-4 w-4 inline-block mr-2" /><Link href="/oracles">Oracles</Link></h3>
              <p>
                The Oracles page offers a deep dive into various oracle protocols including price feeds and availability. User can mint and rent NFT for particular price feed!
              </p>
            </div>
            <div>
              <h3 className="text-xl mb-2"><Square3Stack3DIcon className="h-4 w-4 inline-block mr-2" /><Link href="/inventory">Inventory</Link></h3>
              <p>
                The Inventory page is your gateway to managing your NFTs. View your collection, manage them with ease, and use them to your smart contracts!
              </p>
            </div>
          </div>

          <p className="mt-4">
            So, what exactly is G.O.A.T.? We're a Groundbreaking Oracle Aggregator Technology. Through us, users can access various oracles from a single entry point, compare pricing, and make informed choices. On the flip side, oracle providers get a transparent platform to price their services based on real demand. As we stride forward, our goals are clear: to enhance product-market fit, incorporate as many Oracle Providers as possible, and cement the innovative idea of using NFTs for data feed access. The future looks promising, and with G.O.A.T., it looks revolutionary.
          </p>
        </div>



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
