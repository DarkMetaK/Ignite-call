import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { FormError, Header, RegisterContainer, RegisterForm } from './styles'
import { ArrowRight } from 'phosphor-react'
import { NextSeo } from 'next-seo'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
})
type FormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange',
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query.username, setValue])

  async function handleRegister(data: FormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      await router.push('/register/connect-calendar')
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message) {
        alert(error.response.data.message)
        return
      }
      console.log(error)
    }
  }

  return (
    <>
      <NextSeo title="Crie uma conta | Ignite Call" />
      <RegisterContainer>
        <Header>
          <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>

          <MultiStep size={4} currentStep={1} />
        </Header>

        <RegisterForm as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Nome de usuário</Text>
            <TextInput
              prefix="ignite.com/"
              placeholder="seu-usuário"
              {...register('username')}
            />
            {errors.username && (
              <FormError size="sm">{errors.username.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">Nome completo</Text>
            <TextInput placeholder="Seu nome" {...register('name')} />
            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Próximo Passo <ArrowRight weight="bold" />
          </Button>
        </RegisterForm>
      </RegisterContainer>
    </>
  )
}
