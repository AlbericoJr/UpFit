import { ComponentProps } from "react"
import { ButtonSpinner, Button as GluestackButton, Text } from "@gluestack-ui/themed"

type Props = ComponentProps<typeof GluestackButton> & {
  title: string
  variant?: "solid" | "outline"
  isLoading?: boolean
}

export function Button({ title, variant = "solid", isLoading = false, ...rest }: Props) {
  return (
    <GluestackButton
      w="$full"
      h="$14"
      bg={variant === "outline" ? "transparent" : "$warning700"}
      borderWidth={variant === "outline" ? "$1" : "$0"}
      borderColor="$warning500"
      rounded="$sm"
      $active-bg={variant === "outline" ? "$gray500" : "$warning500"}
      disabled={isLoading}
      {...rest}
    >
      {
        isLoading ? (
          <ButtonSpinner color="$white" /> 
        ) : (
          <Text color={variant === "outline" ? "$warning500" : "$white"} fontFamily="$heading" fontSize="$sm">
            {title}
          </Text>
        )
      }
    </GluestackButton>
  )
}
