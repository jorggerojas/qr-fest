import { useRouter } from 'next/router'
import React from 'react'
import { Button } from '..'
import s from './Main.module.css'

const Main = () => {
  const router = useRouter()
  const handleNavigation = (path = '/') => {
    router.push(path)
  }
  return (
    <div className={s.root}>
      <div className={s.center}>
        <Button onClick={() => handleNavigation('/scan')}>
          Escanear QR 🕵️
        </Button>
        <Button variant="secondary" onClick={() => handleNavigation('/create')}>
          Crear QR 🍳
        </Button>
      </div>
    </div>
  )
}

export default Main
