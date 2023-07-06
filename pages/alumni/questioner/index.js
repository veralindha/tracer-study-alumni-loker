import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Question from "../../../components/admin_components/questioner/question"
import ContentHeader from "../../../components/admin_components/utils/content-header";
import Layout from "../../../components/admin_components/utils/layout";
import { getCookie } from "../../../libs/cookies.lib";

export default function Questioner() {
  const [user, setUser] = useState('');
  const router = useRouter()

  useEffect(() => {
    setUser(getCookie('user'))
    user == {} ? router.push('/login_alumni') : null
  }, [])
  return (
    <Layout title="Data Kuisioner - Study" activeNavBarItem={5} activeUser={''}>
      <ContentHeader title={'Data Kuisioner'} />
      <Question nim={getCookie('user').username}/>
    </Layout>
  )
}