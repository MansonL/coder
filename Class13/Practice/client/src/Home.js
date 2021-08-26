/* eslint-disable react/no-unescaped-entities */
import React from "react"

export default function Home(){
    return (
        <div className="container card mx-auto my-auto w-50 h-80">
        <div className="text-center fs-5 mt-3 mb-3 text-light">
    You can access the followings addresses:
    </div>
    <div className="text-left fs-6 mt-3 mb-3 text-light">
    <a href="/list" className="text-light">'/list'</a>,
    <br /><a href="/products/save" className="text-light">'/products/save'</a>
    (to save a product),
    <br /><a href="/products/update/id" className="text-light">'/products/update/id'</a>
    (only POST),
    <br /><a href="/products/delete/id" className="text-light">'/products/delete/id'</a>
    (only DELETE)
  </div>
</div>
    )
}