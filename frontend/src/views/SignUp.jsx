import { useState, useContext } from 'react'
import ButtonSimple from '../components/atoms/ButtonSimple'
import { useNavigate } from 'react-router-dom'
import { AUTH_CONTEXT } from '../providers/auth'
import { BASE_URL } from '../helpers/routes'

export default function SignUp () {
  const navigate = useNavigate()
  const { setToken } = useContext(AUTH_CONTEXT)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSignUp = async () => {
    if (username.length === 0 || password.length === 0) {
      alert('You need to feel the Username and Password Boxes')
      return
    }
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      })

      const status = await response.status
      const data = await response.json()

      if (status !== 200) {
        alert(data.message)
      } else {
        setToken(data.token)
        navigate('/')
      }
    } catch (e) {
      console.log(e)
    }
  }

  const backHome = () => {
    navigate('/')
  }

  return (
    <div className="signup">
      <ButtonSimple
        style={{ position: 'absolute', top: '2ch', left: '2ch' }}
        onClick={backHome}
      >
        <i
          className="fa-solid fa-arrow-left"
          style={{ marginRight: '1ch' }}
        ></i>
        <span>Back</span>{' '}
      </ButtonSimple>
      <div className="signup-card">
        <img src="./gradient-noise-purple.png" alt="" />
        <h2 className="font-subDisplay">Sign up</h2>
        <h3> Join our community of artists </h3>
        <input
          type="text"
          required="required"
          autoFocus="autofocus"
          value={username}
          onChange={handleUsername}
          placeholder="Username"
          maxLength={30}
        />
        <input
          type="password"
          value={password}
          onChange={handlePassword}
          placeholder="Password"
          maxLength={30}
        />
        <button onClick={handleSignUp}> Sign in </button>
      </div>
      <div className="login-helper">
        <span>Already have and account?</span>{' '}
        <a
          href=""
          onClick={(e) => {
            e.preventDefault()
            navigate('/login')
          }}
        >
          Login here
        </a>
      </div>
    </div>
  )
}
