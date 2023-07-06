import ContentHeader from "../../../components/admin_components/utils/content-header";
import Layout from "../../../components/admin_components/utils/layout";
import useLoginStore from "../../../store/store";
import { useRouter } from "next/router";
import { getCookie } from "../../../libs/cookies.lib";
import { useEffect } from "react";
import CardLoker from "../../../components/admin_components/loker/cardLoker";
import InputLoker from "../../../components/admin_components/loker/inputLoker";
import { useState } from "react";

export default function Loker() {
  const router = useRouter();
  const [session, setSession] = useState({});
  useEffect(() => {
    const session = getCookie('user')
    if (!session) {
      router.push('/login_admin')
    }
    setSession(session)
  }, [])
  return (
    <Layout title="Data Tracer Alumni - Tracer Study" activeNavBarItem={6} activeUser={''}>
      {session.role === 'admin' ? <InputLoker/> : ''}
      <CardLoker/>
    </Layout>
  )
}