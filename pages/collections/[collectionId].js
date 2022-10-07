import React, { useEffect, useState, useMemo, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useWeb3 } from '@3rdweb/hooks'

import { client } from '../../lib/sanityClient'
import { ThirdwebSDK } from '@3rdweb/sdk'
import Header from '../../components/Header'
import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'
import NFTCard from '../../components/NFTCard'
import useIntersectionObserver from "../../components/useIntersectionObserver";

const style = {
    bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
    bannerImage: `w-full object-cover`,
    infoContainer: `w-screen px-4`,
    midRow: `w-full flex justify-center text-white`,
    endRow: `w-full flex justify-end text-white`,
    profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
    socialIconsContainer: `flex text-3xl mb-[-2rem]`,
    socialIconsWrapper: `w-44`,
    socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
    socialIcon: `my-2`,
    divider: `border-r-2`,
    title: `text-5xl font-bold mb-4`,
    createdBy: `text-lg mb-4`,
    statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
    collectionStat: `w-1/4`,
    statValue: `text-3xl font-bold w-full flex items-center justify-center`,
    ethLogo: `h-6 mr-2`,
    statName: `text-lg w-full text-center mt-1`,
    description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
    ilist : `positve justify-center bg-[#ffffff]`,
    witem : `text-3xl font-bold items-center justify-center bg-[#ffffff] w-screen pt-20 pb-20 odd:bg-white even:bg-slate-100`,
}

const Collection = () => {
    const router = useRouter()
    const { provider } = useWeb3()
    const { collectionId } = router.query
    const [collection, setCollection] = useState({})
    const [nfts, setNfts] = useState([])
    const [listings, setListings] = useState([])
    const [sumNumber, setSumNumber] = useState(0)
    //

    const nftModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(), 'https://rinkeby.infura.io/v3/4d3cc561e76c4fd0b1c6a200c1a72bca'
            //'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
        )
        return sdk.getNFTModule(collectionId)
    }, [provider])

    // get all NFTs in the collection
    useEffect(() => {
        if (!nftModule) return
            ;(async () => {
                const nfts = await nftModule.getAll()

                setNfts(nfts)
            })()
    }, [nftModule])

    const marketPlaceModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(), 'https://rinkeby.infura.io/v3/4d3cc561e76c4fd0b1c6a200c1a72bca'
            //'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
        )
        return sdk.getMarketplaceModule( '0x93A771F7ce845C33381f677489cF21a5964EDD0b')
    }, [provider])

    // get all listings in the collection
    useEffect(() => {
        if (!marketPlaceModule) return
        ;(async () => {
            setListings(await marketPlaceModule.getAllListings())
        })()
    }, [marketPlaceModule])

    const fetchCollectionData = async (sanityClient = client) => {
        const query = `*[_type == "marketItems" && contractAddress == "${collectionId}" ] {
            "imageUrl": profileImage.asset->url,
            "bannerImageUrl": bannerImage.asset->url,
            volumeTraded,
            createdBy,
            contractAddress,
            "creator": createdBy->userName,
            title, floorPrice,
            "allOwners": owners[]->,
            description
            }`

        const collectionData = await sanityClient.fetch(query)

        console.log(collectionData, '🔥')

        // the query returns 1 object inside of an array
        setCollection(collectionData[0])
    }

    useEffect(() => {
        fetchCollectionData()
    }, [collectionId])

    console.log(router.query)
    console.log(router.query.collectionId)

    const scrollRef = useRef();
    const scrollEndRef = useRef();
    const count = 10 // 한 번 새로운 item들이 추가될 때 추가되는 item의 갯수
    let index = 0 // item의 index

    const fetchNextPage = async(xumNumber) => {
        const list = scrollRef.current;
        for (let i = index; i < index + count; i++) {      
            let item = document.createElement('p');      
            item.textContent = xumNumber + "____"+ ((xumNumber*count)+i);
            item.className += 'text-3xl text-center font-bold items-center justify-center bg-[#ffffff] w-screen pt-5 pb-5 odd:bg-white even:bg-gray-400';
            list.appendChild(item);
        }
        setSumNumber(sumNumber + 1);
        //setSumNumber((prev)=>{prev + 1})
    }

    // list의 끝부분을 알려주는 p 타겟 요소를 관찰
    useIntersectionObserver({
        target : scrollEndRef,
        onIntersect: fetchNextPage,
        enabled : true,
        sumNumber : sumNumber
    })
  
    return (
        <div className="overflow-hidden">
            <Header />
            <div className={style.bannerImageContainer}>
                <img
                    className={style.bannerImage}
                    src={
                        collection?.bannerImageUrl
                        ? collection.bannerImageUrl
                        : 'https://via.placeholder.com/200'
                    }
                    alt="banner"
                />
            </div>
            <div className={style.infoContainer}>
                <div className={style.midRow}>
                    <img
                        className={style.profileImg}
                        src={
                            collection?.imageUrl
                            ? collection.imageUrl
                            : 'https://via.placeholder.com/200'
                        }
                        alt="profile image"
                    />
                </div>
                <div className={style.endRow}>
                    <div className={style.socialIconsContainer}>
                        <div className={style.socialIconsWrapper}>
                            <div className={style.socialIconsContent}>
                                <div className={style.socialIcon}>
                                    <CgWebsite />
                                </div>
                                <div className={style.divider} />
                                <div className={style.socialIcon}>
                                    <AiOutlineInstagram />
                                </div>
                                <div className={style.divider} />
                                <div className={style.socialIcon}>
                                    <AiOutlineTwitter />
                                </div>
                                <div className={style.divider} />
                                <div className={style.socialIcon}>
                                    <HiDotsVertical />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.midRow}>
                    <div className={style.title}>{collection?.title}</div>
                </div>
                <div className={style.midRow}>
                    <div className={style.createdBy}>
                        Created by{' '}
                        <span className="text-[#2081e2]">{collection?.creator}</span>
                    </div>
                </div>
                <div className={style.midRow}>
                    <div className={style.statsContainer}>
                        <div className={style.collectionStat}>
                            <div className={style.statValue}>{nfts.length}</div>
                            <div className={style.statName}>items</div>
                        </div>
                        <div className={style.collectionStat}>
                            <div className={style.statValue}>
                                {collection?.allOwners ? collection.allOwners.length : ''}
                            </div>
                            <div className={style.statName}>owners</div>
                        </div>
                        <div className={style.collectionStat}>
                            <div className={style.statValue}>
                                <img
                                    src="https://testnets.opensea.io/static/images/logos/ethereum.svg"
                                    alt="eth"
                                    className={style.ethLogo}
                                />
                                {collection?.floorPrice}
                            </div>
                            <div className={style.statName}>floor price</div>
                        </div>
                        <div className={style.collectionStat}>
                            <div className={style.statValue}>
                                <img
                                    src="https://testnets.opensea.io/static/images/logos/ethereum.svg"
                                    alt="eth"
                                    className={style.ethLogo}
                                />
                                {collection?.volumeTraded}.5K
                            </div>
                            <div className={style.statName}>volume traded</div>
                        </div>
                    </div>
                </div>
                <div className={style.midRow}>
                    <div className={style.description}>{collection?.description}</div>
                </div>
            </div>
            <div className="flex flex-wrap ">
                {
                nfts.map((nftItem, id) => (
                    <NFTCard
                        key={id}
                        nftItem={nftItem}
                        title={collection?.title}
                        listings={listings}
                    />
                ))
                }
            </div>
            <div className={style.ilist} ref={scrollRef}>
            </div>
            <p className={style.ilis_end} ref={scrollEndRef}></p>
        </div>
    )
}

export default Collection
