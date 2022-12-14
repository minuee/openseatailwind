
import Header from '../../components/Header'
import { useForm } from "react-hook-form";
import { useWeb3 } from '@3rdweb/hooks'
import { useEffect,useRef, useState } from 'react'
import { client } from '../../lib/sanityClient'
import toast, { Toaster } from 'react-hot-toast'
import Collections from "./Collections";


const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}

export default function Create() {
  const { address, setWallet } = useWeb3();
  const [account, setAccount] = useState();  
  
  const welcomeUser = (userName, toastHandler = toast) => {
    toastHandler.success(
      `Welcome back${userName !== 'Unnamed' ? ` ${userName}` : ''}!`,
      {
        style: {
          background: '#04111d',
          color: '#fff',
        },
      }
    )
  }

  useEffect(() => {
    if (!address) return
    ;(async () => {
      const userDoc = {
        _type: 'users',
        _id: address,
        userName: 'Unnamed',
        walletAddress: address,
      }

      const result = await client.createIfNotExists(userDoc)

      welcomeUser(result.userName)
    })()
  }, [address])

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    console.log('result',window.ethereum);
    setAccount(accounts[0]);
    setWallet(accounts[0]);
  };

   

  return (
    <div className={style.wrapper}>      
        {address ? (
        <>
            <Header />     
            <div className="mainset">       
                <Collections />
            </div>     
        </>
      ) : (
        <div className={style.walletConnectWrapper}>
          <button
            className={style.button}
            onClick={() => connectWallet('injected')}
          >
            Connect Wallet
          </button>
          <div className={style.details}>
            You need Chrome to be
            <br /> able to run this app.
          </div>
        </div>
      )}
    </div>
  )
}
