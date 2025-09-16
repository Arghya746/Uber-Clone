import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainDataContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  // ✅ only take setCaptain since captain isn’t used here
  const { setCaptain } = useContext(CaptainDataContext)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate('/captain-login')
      return
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data.captain)
          setIsLoading(false)
        }
      })
      .catch(() => {
        // ✅ removed unused `err`
        localStorage.removeItem('token')
        navigate('/captain-login')
      })
  }, [token, navigate, setCaptain]) // ✅ added dependencies

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

export default CaptainProtectWrapper
