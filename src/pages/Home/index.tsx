import Image from 'next/image'
import { Heading, Text } from '@ignite-ui/react'
import { NextSeo } from 'next-seo'

import { HomeContainer, Preview, Hero } from './styles'
import previewImage from '../../assets/app-preview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Crie uma conta | Ignite Call"
        description="Conecte seu calendário e permita que as pessoas marque agendamentos no seu tempo livre."
      />
      <HomeContainer>
        <Hero>
          <Heading as="h1" size="4xl">
            Agendamento descomplicado
          </Heading>
          <Text size="lg">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>
          <ClaimUsernameForm />
        </Hero>
        <Preview>
          <Image
            src={previewImage}
            alt="Calendário simbolizando a aplicação em funcionamento"
            height={400}
            quality={100}
            priority
          />
        </Preview>
      </HomeContainer>
    </>
  )
}
