import { useState } from 'react'
import { Link } from 'react-router-dom'
import ViewLeads from './ViewLeads'

function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {

    if (
      username === 'admin' &&
      password === 'admin123'
    ) {

      setIsLoggedIn(true)

    } else {

      alert('Invalid Credentials')

    }
  }

  if (isLoggedIn) {
    return <ViewLeads />
  }

  return (

    <>
    
      <div className="login-wrapper">

        <div className="top-header">

          <h1 className="main-title">
            Mini CRM
          </h1>

          <Link to="/">
            <button className="header-btn">
              Add Lead Page
            </button>
          </Link>

        </div>

        <div className="container">

          <h2>Admin Login</h2>

          <div className="input-wrapper">

            <span className="input-icon">
              👤
            </span>

            <input
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

          </div>

          <div className="input-wrapper">

            <span className="input-icon">
              🔒
            </span>

            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          <button
            className="login-btn"
            onClick={handleLogin}
          >
            Login
          </button>

        </div>

      </div>

    </>

  )
}

export default Login