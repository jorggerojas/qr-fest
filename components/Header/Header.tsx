import Link from 'next/link'
import React from 'react'
import s from './Header.module.css'

const Header = ({
  children,
}: {
  children?: React.ReactNode | React.ReactNode[]
}) => {
  return (
    <header className={s.root}>
      <Link href="/">
        <p>Inicio 🏡</p>
      </Link>
      {children}
    </header>
  )
}

export default Header
