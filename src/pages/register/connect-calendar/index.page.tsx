import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { Heading, MultiStep, Text, Button } from '@ignite-ui/react'
import { ArrowRight, Check } from 'phosphor-react'

import { Header, RegisterContainer } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'

// import { api } from '@/lib/axios'
// import { AxiosError } from 'axios'

export default function Register() {
  const router = useRouter()
  const session = useSession()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  return (
    <RegisterContainer>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>
      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedIn ? (
            <Button size="sm" disabled>
              Conectado
              <Check weight="bold" />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar <ArrowRight weight="bold" />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </AuthError>
        )}

        <Button type="submit" disabled={!isSignedIn}>
          Próximo Passo <ArrowRight weight="bold" />
        </Button>
      </ConnectBox>
    </RegisterContainer>
  )
}
