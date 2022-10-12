import React from 'react'
import s from './Layout.module.css'

const Layout = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={s.root} {...props}>
      {props.children}
    </div>
  )
}

export default Layout
