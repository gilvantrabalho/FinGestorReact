import React from "react";
import AreaGridAuth from "../../../components/areaGridAuth/AreaGridAuth";
import AuthLayout from '../../../layouts/authLayout/AuthLayout'
import imgRegister from '../../../assets/img/register.png'
import InputIconComponent from '../../../components/inputIconComponent/InputIconComponent'
import { Link, useNavigate } from 'react-router-dom'
import Button from "../../../components/button/Button";
import UserApi from "../../../api/UserApi";
import Alerts from '../../../helpers/alerts/Alerts'

const Register = () => {

  let navigate = useNavigate()
  const [name, setName] = React.useState('')
  const [msgName, setMsgName] = React.useState('')

  const [email, setEmail] = React.useState('')
  const [msgEmail, setMsgEmail] = React.useState('')

  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [msgPassword, setMsgPassword] = React.useState('')

  const submit = (e) => {
    e.preventDefault()

    !name ?
      setMsgName('Nome é um campo obrigatório!')
      :
      setMsgName('')

    !email ?
      setMsgEmail('E-mail é um campo obrigatório!')
      :
      setMsgEmail('')

    !password ?
      setMsgPassword('Senha é um campo obrigatório!')
      :
      setMsgPassword('')

    password != confirmPassword ?
      setMsgPassword('As senhas não são igual!')
      :
      setMsgPassword('')

    if (name && email && password && password == confirmPassword) {
      UserApi.create({
        name: name,
        email: email,
        password: password
      })
        .then(resp => {
          console.log(resp.data)
          if (resp.data.id) {
            localStorage.setItem('id', resp.data.id)
            localStorage.setItem('name', resp.data.name)
            localStorage.setItem('email', resp.data.email)
            Alerts.success('Usuário cadastrado com sucesso!')
            setTimeout(() => {
              navigate('/home')
            }, 1800)
          }
        })
    }

  }

  return (
    <AuthLayout>
      <AreaGridAuth
        left={
          <img width="100%" src={imgRegister} alt="img register" />
        }

        right={
          <div>
            <h5 className='pb-3 text-center'>CADASTRE-SE</h5>

            <form onSubmit={submit} action="" method='POST'>

              <InputIconComponent
                icon={<i className="bi bi-person-fill"></i>}
                input={
                  <input
                    onChange={e => setName(e.target.value)}
                    type="text"
                    className="form-control p-2"
                    placeholder="Nome"
                  />
                }
                message={msgName}
              />

              <InputIconComponent
                icon={<i className="bi bi-envelope-fill"></i>}
                input={
                  <input
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    className="form-control p-2"
                    placeholder="E-mail"
                  />
                }
                message={msgEmail}
              />

              <InputIconComponent
                icon={<i className="bi bi-key-fill"></i>}
                input={
                  <input
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    className="form-control p-2"
                    placeholder="Senha"
                  />
                }
                message={msgPassword}
              />

              <InputIconComponent
                icon={<i className="bi bi-key-fill"></i>}
                input={
                  <input
                    onChange={e => setConfirmPassword(e.target.value)}
                    type="password"
                    className="form-control p-2"
                    placeholder="Confirmar senha"
                  />
                }
                message={msgPassword}
              />

              <Button
                class="btn btn-primary shadow-sm"
                type="submit"
                text="Cadastrar"
              />

              <div className='m-4 texts-register text-center'>
                <Link className="text-dark" to='/'>Login</Link>
              </div>

            </form>
          </div>
        }
      />
    </AuthLayout>
  )

}

export default Register