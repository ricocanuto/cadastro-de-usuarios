import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../../services/api'

import Button from "../../components/Button"
import TopBackground from "../../components/TopBackground"
import Trash from "../../assets/trash.svg"
import {
    Container,
    ContainerUsers,
    CardUsers,
    TrashIcon,
    Title,
    AvatarUser,
} from '../ListUsers/styles'

import UsersImage from '../../assets/users.png'

function ListUsers() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        async function getUsers() {
            const { data } = await api.get('/usuarios')

            setUsers(data)
        }
        getUsers()
    }, [location.state?.updated]) // Atualiza ao receber a flag 'updated'

    async function deleteUsers(id){
        await api.delete(`/usuarios/${id}`)

        const updatedUsers = users.filter(user => user.id !== id)

        setUsers(updatedUsers)
    }

    return (
        <Container>
            <TopBackground>
                <img src={UsersImage} alt='imagem-usuarios' />
            </TopBackground>
            <Title>Lista de Usuários</Title>

            <ContainerUsers>
                {users.map((user) => (
                    <CardUsers key={user.id}>
                        <AvatarUser src={`https://avatar.iran.liara.run/public?username=${user.id}`} />
                        <div>
                            <h3>{user.name}</h3>
                            <p>{user.age}</p>
                            <p>{user.email}</p>
                        </div>
                        <TrashIcon src={Trash} alt='icone-lixo' onClick={() => deleteUsers(user.id)}></TrashIcon>
                    </CardUsers>
                ))}
            </ContainerUsers>

            <Button type='button' onClick={() => navigate('/')}>Voltar</Button>
        </Container>
    )
}

export default ListUsers