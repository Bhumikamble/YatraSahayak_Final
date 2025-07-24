import React from 'react'
import { useParams } from 'react-router-dom'

function User() {
    const {userid} = useParams()

  return (
    <div className='text-center'><h1 className='text-3xl text-bold'>User: {userid}</h1></div>
  )
}

export default User