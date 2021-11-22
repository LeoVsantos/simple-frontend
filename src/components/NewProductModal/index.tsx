import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { Main, Input } from './styles';

import { Alert } from 'react-bootstrap';

import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import closeImg from '../../assets/close.svg';
import { useProducts } from '../../hooks/useProducts';
import api from '../../services/api';


interface PackagesList {
  id: string;
  name: string;
  package_qtd_max: number;
}


interface NewProductModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}


interface CreateProductProps {
  name: string;
  price: number;
  weight: number;
  pack: string;
  packageQtd: number;
  description: string;
}

const signInFormSchema = yup.object().shape({
  name: yup.string().required('Nome do produto obrigatorio'),
  description: yup.string().required('Descricao obrigatorio'),
  price: yup.number().required('Preco obrigatoria'),
  weight: yup.number().required('Peso obrigatoria'),
  pack: yup.string().required('Pacote obrigatorio'),
  packageQtd: yup.number().required('Quantidade obrigatoria')
})


export function NewProductModal({isOpen, onRequestClose}: NewProductModalProps) {
  const { createProduct } = useProducts()

  const [packagesList, setPackagesList] = useState<PackagesList[]>([]);
  const [error, setError] = useState(false);
  const [errorDescription, setErrorDescription] = useState('');


  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const { errors } = formState;

  
  useEffect(() => {
    api.get('products/packages').then(response => {
      setPackagesList(response.data.packages)
    });
  }, [])


  const handleCreateNewProduct: SubmitHandler<CreateProductProps> = async ({
    name,
    description,
    pack,
    packageQtd,
    price,
    weight
  }) => {

    try {
      const packType = packagesList.find(packaging => packaging.name === pack);
  
      if(packType && packType.package_qtd_max && packageQtd > packType.package_qtd_max){
        setError(true)
        setErrorDescription('Quantidade da embalagem invalida.');
        return;
      }

      await createProduct({
        name,
        price,
        weight, 
        package_type: pack,
        description,
        package_quantity: packageQtd
      })

      reset();
      onRequestClose();
    } catch (e: any) {
      setError(true);
    }
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type="button" 
        onClick={onRequestClose} 
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Main onSubmit={handleSubmit(handleCreateNewProduct)}>
        <h2>Cadastrar produto</h2>

        {error && (
            <Alert  variant={'danger'}>
            {errorDescription ? errorDescription : 'Erro ao cadastrar produto, tente novamente.'}
          </Alert>
        )}

        <Input 
          placeholder="Nome do produto"
          type="text"
          error={errors.name}
          {...register('name')}
        />

        <Input 
          placeholder="Descricao do produto"
          type="text"
          error={errors.description}
          {...register('description')}
        />

        <Input 
          placeholder="Preço"
          error={errors.price}
          {...register('price')}
        />

        <Input 
          type="number"
          placeholder="Quantidade da
          embalagem"
          error={errors.packageQtd}
          {...register('packageQtd')}
        /> 
        
        <Input 
          type="number"
          placeholder="Peso"
          error={errors.weight}
          {...register('weight')}
        />   

      <div style={{textAlign: 'right', padding: 2}}>
        <span style={{fontSize: 'small'}}>Peso em gramas</span>
      </div>

        <Input 
          type="text"
          placeholder="Tipo de embalagem"
          {...register('pack')}
          error={errors.pack}         
          list='packTypes'
        />    
        <datalist id='packTypes'>
          {packagesList.map(packs => (
            <option value={packs.name} />
          ))}
        </datalist>
 

        <button type="submit">Cadastrar</button>
      </Main>

    </Modal>
  );  
}