import Image from "next/image"

export default function Preloader() {
  return (
    <div className="preloader flex-column justify-content-center align-items-center">
      <Image className="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height={60} width={60} />
    </div>
  )
}