import { useRouter } from 'next/router'
import { Button, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ClaimUserNameFormContainer, FormAnnotation } from './styles'

const claimUsernameFormSchema = z
  .object({
    username: z
      .string()
      .min(3, 'O usuário deve ter pelo menos 3 caracteres.')
      .regex(/^([a-z\\-]+)$/i, 'O usuário pode ter apenas letras e hifens')
      .transform((username) => username.toLowerCase()),
  })
  .required()
type FormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(claimUsernameFormSchema),
    mode: 'onChange',
  })

  const router = useRouter()

  async function handleClaimUsername(data: FormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <ClaimUserNameFormContainer
        as="form"
        onSubmit={handleSubmit(handleClaimUsername)}
      >
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register('username')}
        />
        <Button size="sm" type="submit" disabled={!isValid || isSubmitting}>
          Reservar
          <ArrowRight weight="bold" />
        </Button>
      </ClaimUserNameFormContainer>
      <FormAnnotation>
        <Text size="xs">
          {errors.username?.message
            ? errors.username.message
            : 'Digite o usuário desejado'}
        </Text>
      </FormAnnotation>
    </>
  )
}
