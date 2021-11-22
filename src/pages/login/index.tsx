
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Image } from 'react-bootstrap';
import logo from '../../assets/logo-mtrix.png';

import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { ToastMessage } from '../../components/Toast';

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatorio').email('E-mail invalido'),
  password: yup.string().required('Senha obrigatoria'),
})

export default function App() {
  const [error, setError] = useState(false);
  const router = useHistory();
  const { signIn } = useAuth();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async ({email, password}) => {
      try {

        await signIn({
          email,
          password,
        });

       router.push('/dashboard');

      } catch (err) {
        setError(true);
      }
  }

  return (
    <section className="vh-100" style={{backgroundColor: '#e7f7fb'}}>
    
    {error && 
    ToastMessage({
      title: 'Falha na autenticação',
      body: 'Cheque suas credenciais e tente novamente!',
      variant: 'danger'
    })}
    
    <div className="container py-2 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">

          <div className="p-5 text-center">
            <Image src={logo} alt="Mtrix" />          
          </div>

          <div className="card shadow-2-strong" style={{borderRadius: '1rem'}}>
            <div className="card-body p-5 text-center">
  
              <h3 className="mb-5">Login</h3>
  
            <form
             onSubmit={handleSubmit(handleSignIn)}
            >

              <div className="form-outline mb-4">
                <input 
                  type="email" 
                  placeholder="E-mail" 
                  className={`form-control form-control-lg ${errors.email && 'is-invalid'}`} 
                  {...register('email')}
                />
              </div>
  
              <div className="form-outline mb-4">
                <input 
                  type="password" 
                  placeholder="Senha" 
                  className={`form-control form-control-lg ${errors.email && 'is-invalid'}`} 
                  {...register('password')}
                />
              </div>

  
              <button 
                style={{backgroundColor: '#229cd4'}} 
                className="btn btn-primary btn-lg btn-block" 
                type="submit"
              >Login</button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}