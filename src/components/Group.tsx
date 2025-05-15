import { ComponentProps } from "react";
import { Button, Text } from "@gluestack-ui/themed";

type Props = ComponentProps<typeof Button> &{
  name: string
  isActive?: boolean
}

export function Group({name, isActive = false, ...rest}: Props) {
  return (
    <Button 
      minWidth="$24"
      h="$10"
      bg="$gray600"
      rounded="$md"
      justifyContent="center"
      alignItems="center"
      borderColor="$warning500"
      borderWidth={isActive ? 1 : 0}
      sx={{
        ":active": {
          borderWidth: 1,
        },
      }}
      mr="$3"
      {...rest}
    >
      <Text color={isActive ? "$warning500" : "$gray200"} textTransform="uppercase" fontSize="$xs" fontFamily="$heading">{name}</Text>
    </Button>
  )
}