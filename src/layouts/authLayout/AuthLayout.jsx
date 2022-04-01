import React from 'react'
import ContAuth from '../../components/contAuth/ContAuth'

import './AuthLayout.css'

const AuthLayout = props => {
  return (
    <ContAuth>
      {props.children}
    </ContAuth>
  )
}

export default AuthLayout