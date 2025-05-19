import { Center, Heading } from "@gluestack-ui/themed"

type Props = {
  title: string
}

export function ScreenHeader({ title}: Props) {
  return (
    <Center bg="$gray600" pt="$16" pb="$6">
      <Heading color="$gray100" fontSize="$xl" fontFamily="$heading">{title}</Heading>
    </Center>
  )
}
