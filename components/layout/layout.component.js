import Head from "next/head"
import NavBar from "../navbar/navbar.component"

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title} | AirLine</title>
      </Head>
      <NavBar />
      <main>{children}</main>
    </>
  )
}