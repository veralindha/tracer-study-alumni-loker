import Head from "next/head";
import Footer from "./footer";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Scripts from "./scripts";

export default function Layout({ children, title = '', activeNavBarItem = 0, activeUser = '', role = '' }) {
  return (
    <div className="hold-transition sidebar-mini layout-fixed">
      <div className="wrapper">
        <Head>
          <title>{title}</title>
          <meta name="description" content={title} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
      </div>
      <Sidebar isActiveNavItem={activeNavBarItem} activeUser={activeUser} role={role} />
      <div className="content-wrapper">
        {children}
      </div>
      <Footer/>
      <Scripts/>
    </div>
  )
}