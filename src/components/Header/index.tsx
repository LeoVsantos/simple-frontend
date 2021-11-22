import { Link } from 'react-router-dom';
import logo from '../../assets/logo-mtrix.png';

import { useAuth } from '../../hooks/useAuth';
import { Container, Content} from './styles';

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({onOpenNewTransactionModal}: HeaderProps) {
  const { signOut } = useAuth()

  return (
    <Container>
      <Content>
       <div style={{background: '#FFF', padding: 15, borderRadius: 20}}>
        <img src={logo} alt="Mtrix" width={60} /> 
       </div>
        <div>
          <button type="button" onClick={onOpenNewTransactionModal}>
            Novo produto
          </button>
          <Link to='/' onClick={() => {signOut()}}>Sair</Link>
        </div>
      </Content>
    </Container>
  )
}