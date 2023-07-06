import TambahDataUsers from "../forms/formtambahusers"
import { useEffect, useState } from "react"
import Card from "../utils/card"

export default function TambahDataContents() {
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <TambahDataUsers />
          </div>
        </div>
      </div>
    </section>
  )
}