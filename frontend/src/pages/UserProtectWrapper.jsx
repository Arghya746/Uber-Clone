import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext) // ✅ removed unused `user`
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data) // ✅ updates context
          setIsLoading(false)
        }
      })
      .catch((err) => {
        console.error('Profile fetch failed:', err)
        localStorage.removeItem('token')
        navigate('/login')
      })
  }, [token, navigate, setUser]) // ✅ added missing dependencies

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

export default UserProtectWrapper
