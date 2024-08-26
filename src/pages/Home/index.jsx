import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

import {
  Title,
  Container,
  Form,
  ContainerInputs,
  Input,
  InputLabel,
} from './styles'

// import Trash from './assets/trash.svg'

import UsersImage from '../../assets/users.png'
import Button from '../../components/Button'
import TopBackground from '../../components/TopBackground'

function Home() {
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  const navigate = useNavigate()

  async function registerNewUser() {
    try {
      const data = await api.post('/usuarios', {
        email: inputEmail.current.value,
        age: inputAge.current.value,
        name: inputName.current.value,
      })

      console.log(data)
      // Redireciona para a lista de usuários após o cadastro
      navigate('/Lista-de-usuarios', { state: { updated: true } })
    } catch (error) {
      console.error('Erro ao cadastrar o usuário:', error)
    }
  }

  return (
    <Container>
      <TopBackground>
        <img src={UsersImage} alt='imagem-usuarios' />
      </TopBackground>

      <Form>
        <Title>Cadastrar Usuários</Title>

        <ContainerInputs>
          <div>
            <InputLabel>
              Nome<span> *</span>
            </InputLabel>
            <Input type='text' placeholder='Nome de usuário' ref={inputName} />
          </div>
          <div>
            <InputLabel>
              Idade<span> *</span>
            </InputLabel>
            <Input type='number' placeholder='Idade do usuário' ref={inputAge} />
          </div>



        </ContainerInputs>

        <div style={{ width: '100%' }}>
          <InputLabel>
            Email<span> *</span>
          </InputLabel>
          <Input type='e-mail' placeholder='E-mail do usuário' ref={inputEmail} />
        </div>

        <Button type='button' onClick={registerNewUser} theme='primary'>
          Cadastrar Usuários
        </Button>
      </Form>
      <Button type='button' onClick={() => navigate('/Lista-de-usuarios')}>
        Ver Lista de Usuários
      </Button>
    </Container >
  )
}

export default Home

