import TambahDataContents from "../../../components/admin_components/admin_dashboard/tambahdatacontents";
import Layout from '../../../components/admin_components/utils/layout'
import TableUsers from '../../../components/admin_components/table/table_users'
import ContentHeader from '../../../components/admin_components/utils/content-header';
import useLoginStore from "../../../store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCookie } from "../../../libs/cookies.lib";

export default function TambahUserAdmin() {
  const router = useRouter()
  useEffect(() => {
    const session = getCookie('user')
    if (!session) {
      router.push('/login_admin')
    }
  }, [])
  return (
    <Layout title="Tambah User Admin - Tracer Study" activeNavBarItem={2} activeUser={''}>
      <ContentHeader title={'Tambah User Admin'}/>
      <TambahDataContents />
      <TableUsers />
    </Layout>
  )
}