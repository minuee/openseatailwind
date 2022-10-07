import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useWeb3 } from '@3rdweb/hooks'

import openseaLogo from '../assets/opensea.png'
//import openseaLogo from '../assets/logo.png'
import { AiOutlineSearch } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'

const style = {
  wrapper: `bg-[#04111d] w-screen px-[1.2rem] py-[0.8rem] flex `,
  logoContainer: `bg-[#ffffff] flex items-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: ` flex items-center justify-end`,
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerItem2: `relative hover-trigger text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
  profileImg : `w-[1.5rem] h-[1.5rem]`
}



const Header = () => {

  const { address, connectWallet,chainId} = useWeb3()
  console.log('getNetworkMetadata',address)

  const onClick = (e) => {
    console.log('onClick',e)
  }
  return (
    <div className={style.wrapper}>
      <Link href="/">
        <div className={style.logoContainer}>
          <Image src={openseaLogo} height={35} width={40} />
          {/* <div className={style.logoText}>D</div> */}
        </div>
      </Link>
      <div className={style.searchBar}>
        <div className={style.searchIcon}>
          <AiOutlineSearch />
        </div>
        <input
          className={style.searchInput}
          placeholder="Search items, collections, and accounts"
        />
      </div>
      <div className={style.headerItems}>
        {/* 0x66a576A977b7Bccf510630E0aA5e450EC11361Fa */}
        <Link href="/collections/0x66a576A977b7Bccf510630E0aA5e450EC11361Fa">
          <div className={style.headerItem}> Collections </div>
        </Link>
        <Link href="/stat">
          <div className={style.headerItem}> Stats </div>
        </Link>
        
        <div className={style.headerItem2}> 
          Resources 
          <div class="absolute z-50 w-40 h-auto bg-white border border-grey-100 hover-target">
            <ul className="menu-item-drop addOption">
              <li className="menu-addOption">
                <Link href="/three" className="menu-item">
                  3D
                </Link>
              </li>
              <li className="menu-addOption">
                <a
                  href="https://opensea.io/rankings"
                  target="_black"
                  className="menu-item"
                >
                  Ranking
                </a>
              </li>
              <li className="menu-addOption">
                <a
                  href="https://support.opensea.io/hc/en-us"
                  target="_black"
                  className="menu-item"
                >
                  Help
                </a>
              </li>
              <li className="menu-addOption">
                <a
                  href="https://opensea.io/blog"
                  target="_blank"
                  className="menu-item"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* <Dropdown label="Resources">
          <Dropdown.Item onClick={onClick}>
            Dashboard
          </Dropdown.Item>
          <Dropdown.Item onClick={onClick}>
            Settings
          </Dropdown.Item>
          <Dropdown.Item onClick={onClick}>
            Earnings
          </Dropdown.Item>
          <Dropdown.Item onClick={onClick}>
            Sign out
          </Dropdown.Item>
        </Dropdown> */}

        
        
        <Link href="/create">
          <div className={style.headerItem}> Create </div>
        </Link>
        
        <div className={style.headerIcon}>
          { address != null ?
            <img src='/assets/profile.jpeg' className={style.profileImg} />
            :
            <CgProfile />
          }
        </div>
        <div className={style.headerIcon}>
          <MdOutlineAccountBalanceWallet />
        </div>
      </div>
    </div>
  )
}

export default Header
