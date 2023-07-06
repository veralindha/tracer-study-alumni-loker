import About from "./about"
import Banner from "./banner"
import Count from "./count"
import Navbar from "./navbar"
import Scripts from "./scripts"
import Services from "./services"
import Head from "next/head"
import Footer from "./footer"

export default function Layout() {
  return (
    <div style={{scrollBehavior: 'smooth'}}>
      <Head>
        <title></title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar className="fixed-top" />
      <Banner />
      <About />
      <Count />
      <Services />
      <Footer />
      <Scripts />
    </div>
  )
}