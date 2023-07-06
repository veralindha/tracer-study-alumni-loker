import ContentHeader from "../../../components/admin_components/utils/content-header";
import Layout from "../../../components/admin_components/utils/layout";
import useLoginStore from "../../../store/store";
import { useRouter } from "next/router";
import { getCookie } from "../../../libs/cookies.lib";
import { useEffect } from "react";
import CardLoker from "../../../components/admin_components/loker/cardLoker";
import EditLoker from "../../../components/admin_components/loker/editloker";

export default function EditLokerPages() {
  const router = useRouter()
  useEffect(() => {
    const session = getCookie('user')
    if (!session) {
      router.push('/login_admin')
    }
  }, [])
  return (
    <Layout title="Data Tracer Alumni - Tracer Study" activeNavBarItem={7} activeUser={''}>
      <EditLoker/>
    </Layout>
  )
}