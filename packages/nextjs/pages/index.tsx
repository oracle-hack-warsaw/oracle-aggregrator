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
        <h1 className="text-3xl font-bold mb-6">🐐 G.O.A.T. - Groundbreaking Oracle Aggregator Technology</h1>

        <div className="highlighted-section p-4 rounded-lg border-2 border-gray-300">
          <p className="mb-4">
          Groundbreaking Oracle Aggregator Technology integrates with both <strong>Chronicle Protocol</strong> and <strong>RedStone</strong>. With G.O.A.T., you will be able to mint NFTs, rent NFTs and use NFTs to guard access to different oracle feeds.
          </p>
          <br/>

          <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/oracles">
              <div className="btn-accent p-4 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer">
                <CubeTransparentIcon className="h-6 w-6 mb-2" />
                <h3 className="text-xl mb-2">Oracles</h3>
                <p className="text-sm">
                  Dive into oracle protocols, view price feeds, and mint or rent NFTs.
                </p>
              </div>
            </Link>
            <Link href="/inventory">
              <div className="btn-accent p-4 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer">
                <Square3Stack3DIcon className="h-6 w-6 mb-2" />
                <h3 className="text-xl mb-2">Inventory</h3>
                <p className="text-sm">
                  Manage your NFT collection and connect them to smart contracts.
                </p>
              </div>
            </Link>
          </div>



          <p className="mt-4">
            G.O.A.T. is a Groundbreaking Oracle Aggregator Technology. With G.O.A.T. users can access different oracles from one single entry point, compare pricing, and make informed decisions. On the other side, oracle providers get a transparent platform to price their services based on real demand. As we stride forward, our goals are clear: to enhance product-market fit, incorporate as many Oracle Providers as possible, and cement the innovative idea of using NFTs for data feed access. The future looks promising, and with G.O.A.T., it looks revolutionary.
          </p>
        </div>



        <div className="founders mb-6">
          <br/>
          <h2 className="text-2xl mb-4 text-center">Founders</h2>

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
              <h3 className="mb-2">
                <a href="https://linkedin.com/in/aleksanderwojcik/" target="_blank" rel="noopener noreferrer">
                  Aleksander (Alex) &nbsp;
                  <Image
                      src={"/assets/linkedin_short.png"}
                      alt="linkedin_short.png"
                      className={"rounded inline-block"}
                      width={18}
                      height={18}
                  />
                </a>
              </h3>
              <p className="text-sm mb-2 text-center">Full Stack Developer (~8+ y/o exp) skilled in a vast range of technologies, including web3.</p>

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
              <h3 className="mb-2">
                <a href="https://twitter.com/arjanjohan/" target="_blank" rel="noopener noreferrer">
                  Arjan van Hoogdalem &nbsp;
                  <Image
                      src={"/assets/twitter.png"}
                      alt="twitter.png"
                      className={"rounded inline-block"}
                      width={18}
                      height={18}
                  />
                </a>
              </h3>
              <p className="text-sm mb-2 text-center">Backend & smart contract developer. Game theory, defi, and iGaming enthusiast.</p>
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
              <h3 className="mb-2">
                <a href="https://twitter.com/urataps" target="_blank" rel="noopener noreferrer">
                  Alexe Luca Spataru &nbsp;
                  <Image
                      src={"/assets/twitter.png"}
                      alt="twitter.png"
                      className={"rounded inline-block"}
                      width={18}
                      height={18}
                  />
                </a>
              </h3>
              <p className="text-sm mb-2 text-center">Web3 founder, smart contract guru, and blockchain advocate.</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Home;
