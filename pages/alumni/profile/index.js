import { useRouter } from "next/router"
import { useEffect } from "react"
import Profile from '../../../components/admin_components/profile/profile'
import ContentHeader from "../../../components/admin_components/utils/content-header"
import Layout from "../../../components/admin_components/utils/layout"
import { getCookie } from "../../../libs/cookies.lib"
import useLoginStore from "../../../store/store"

export default function ProfilePage() {
  const router = useRouter()
  useEffect(() => {
    const session = getCookie('user')
    if (!session) {
      router.push('/login_alumni')
    }
  }, [])
  return (
    <Layout title="Profile - Tracer Study" activeNavBarItem={0} activeUser={''}>
      <ContentHeader title={'Profile'} />
      <Profile />
    </Layout>
  )
}