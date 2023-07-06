import ContentHeader from "../../../components/admin_components/utils/content-header";
import Layout from "../../../components/admin_components/utils/layout";
import FormInputAlumni from "../../../components/admin_components/forms/forminputalumni";
import useLoginStore from "../../../store/store";
import { useRouter } from "next/router";
import { getCookie } from "../../../libs/cookies.lib";
import { useEffect } from "react";

export default function TambahAlumni() {
  const router = useRouter()
  useEffect(() => {
    const session = getCookie('user')
    if (!session) {
      router.push('/login_admin')
    }
  }, [])
  return (
    <Layout title="Data Tracer Alumni - Tracer Study" activeNavBarItem={4} activeUser={''}>
      <ContentHeader title={'Data Tracer Alumni'} />
      <FormInputAlumni />
    </Layout>
  )
}