import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
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
  observations: z.string().nullable(),
})
type FormData = z.infer<typeof ConfirmStepSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(ConfirmStepSchema),
    mode: 'onChange',
  })

  const router = useRouter()
  const username = String(router.query.username)

  async function handleConfirmScheduling(data: FormData) {
    const { name, email, observations } = data
    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    })
    alert('Agendamento realizado com sucesso')

    onCancelConfirmation()
  }

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY ')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <ConfirmStepForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank /> {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
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
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary" onClick={onCancelConfirmation}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting || !isValid}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmStepForm>
  )
}
