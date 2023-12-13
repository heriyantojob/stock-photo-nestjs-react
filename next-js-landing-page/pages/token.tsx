import Head from 'next/head'
import {useEffect} from "react"
import useSession from "../hooks/auth/useSession"
import { useSelector, useDispatch } from 'react-redux'
import serverProps from "../utils/serverProps";
import {selectAuthToken,selectAuthStatus} from '../features/auth/authSlice'
export default function Home(props) {
  let authToken = useSelector(selectAuthToken)

  const authStatus = useSelector(selectAuthStatus);
  useSession(props.sessionRefresh)

  useEffect(() => {
    


  }, [])
  return (
    <>
      <Head>
        <title>Bagus loh</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero min-h-screen bg-base-200">
          <p>token : {authToken}</p>
            <p>Status : {authStatus}</p>
      </div>

    </>
  )
}
export async function getServerSideProps(context) {
  // do custom page stuff...

    context.req.isNotRedirect = true
    let propGlobal =  await serverProps(context)
    let propPlus = { junk: 347 }
    let props = {...propGlobal.props,...propPlus};

    return {props};
}