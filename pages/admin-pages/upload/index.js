import Layout from "../../../components/admin_components/utils/layout";
import ContentHeader from "../../../components/admin_components/utils/content-header";
import useLoginStore from "../../../store/store";
import UploadComponent from '../../../components/admin_components/upload/upload';
import { useEffect } from "react";
import { getCookie } from "../../../libs/cookies.lib";
import { useRouter } from "next/router";

export default function Upload() {
  const router = useRouter()
  useEffect(() => {
    const session = getCookie('user')
    if (!session) {
      router.push('/login_admin')
    }
  }, [])
  return (
    <Layout title="Upload - Tracer Study" activeNavBarItem={3} activeUser={''}>
      <ContentHeader title={'Upload Data Alumni'} />
      <UploadComponent/>
    </Layout>
  )
}