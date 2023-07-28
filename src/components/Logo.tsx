import React from 'react'

type Props = {}

const Logo = (props: Props) => {
  return (
    <div className="logotype">
        <img src='..\img\icon-white.png' alt="logotype"/>
        <div className="wordmark">UPHILL</div>
    </div>
  )
}

export default Logo