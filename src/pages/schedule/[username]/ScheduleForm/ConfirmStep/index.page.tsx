import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { ConfirmStepForm, FormActions, FormError, FormHeader } from './styles'

const ConfirmStepSchema = z.object({
  name: z
    .string({
      required_error: 'Esse campo é obrigatório',
    })
    .min(3, 'O nome precisa no minimo de 3 caracteres')
    .nonempty(),
  email: z
    .string({
      required_error: 'Esse campo é obrigatório',
    })
    .email('Insira um e-mail válido')
    .nonempty(),
  observation: z.string().nullable(),
})
type FormData = z.infer<typeof ConfirmStepSchema>

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(ConfirmStepSchema),
    mode: 'onChange',
  })

  function handleConfirmScheduling(data: FormData) {
    console.log(data)
  }

  return (
    <ConfirmStepForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank /> 22 de Setembro de 2022
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observation')} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting || !isValid}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmStepForm>
  )
}
