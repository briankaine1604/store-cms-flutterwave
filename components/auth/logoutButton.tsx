'use client'

import Logout from '@/actions/logout'
import React from 'react'

type Props = {
    children?: React.ReactNode
}

export const LogoutButton = ({children}: Props) => {
  const onClick=()=>{
    Logout()
  }

  return (
    <span onClick={onClick} className=' cursor-pointer'>
      {children}
    </span>
  )
}