import { useMoralis } from "react-moralis";
import { useEffect } from "react"

export default function ManualHeader() {

  const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } = useMoralis()

  useEffect(() => {
    if(isWeb3Enabled) return
    if(typeof window !== "undefined"){
      if(window.localStorage.getItem("connected")){
        enableWeb3()
      }
    }
    //enableWeb3()
  },[isWeb3Enabled])


  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log("Account changed to " + account)
      if(account == null) {
        window.localStorage.removeItem("connected")
        deactivateWeb3()
        console.log("Null account Found")
      }
    })
  }, [])

  return(
    <div>
    {
        account ? (
          <div className="ml-auto py-2 px-4">
            Connected! to {account.slice(0.6)}...{account.slice(account.length-4)} </div>
        ): (
            <button 
              onClick={async () => {
                await enableWeb3()
                if(typeof window !== "undefined"){
                  window.localStorage.setItem("connected", "Injected")

                }
              }}
              disabled = {isWeb3EnableLoading}
            >
              connect
            </button>
          )
    }
    </div>
  )
  
}
