import ContentHeader from "../../../components/admin_components/utils/content-header";
import Layout from "../../../components/admin_components/utils/layout";
import useLoginStore from "../../../store/store";
import { useRouter } from "next/router";
import { getCookie } from "../../../libs/cookies.lib";
import { useEffect } from "react";
import Berkas from "../../../components/admin_components/loker/berkas";
// import CardLoker from "../../../components/admin_components/loker/cardLoker";
import BerkasUpload from "../../../components/admin_components/loker/uploadBerkas";

export default function BerkasPages() {
  const router = useRouter()
  useEffect(() => {
    const session = getCookie('user')
    if (!session) {
      router.push('/login_admin')
    }
  }, [])
  return (
    <Layout title="Data Tracer Alumni - Tracer Study" activeNavBarItem={7} activeUser={''}>
      {/* <CardLoker/> */}
      <Berkas/>
      <BerkasUpload/>
    </Layout>
  )
}