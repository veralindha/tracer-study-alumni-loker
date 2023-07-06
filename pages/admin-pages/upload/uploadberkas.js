import ContentHeader from "../../../components/admin_components/utils/content-header";
import Layout from "../../../components/admin_components/utils/layout";
import useLoginStore from "../../../store/store";
import { useRouter } from "next/router";
import { getCookie } from "../../../libs/cookies.lib";
import { useEffect } from "react";
import UploadBerkas from "../../../components/admin_components/loker/uploadBerkas";
import ShowBerkas from "../../../components/admin_components/loker/showBerkas";

export default function UploadBerkasPages() {
  const router = useRouter()
  useEffect(() => {
    const session = getCookie('user')
    if (!session) {
      router.push('/login_admin')
    }
  }, [])
  return (
    <Layout title="Upload Berkas - Tracer Study" activeNavBarItem={6} activeUser={''}>
      <ShowBerkas/>
      <UploadBerkas/>
    </Layout>
  )
}