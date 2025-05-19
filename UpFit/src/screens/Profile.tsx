import { useState } from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import { ScreenHeader } from "@components/ScreenHeader"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import { Controller, useForm } from "react-hook-form"

import {
  Center,
  Heading,
  Text,
  Toast,
  ToastTitle,
  VStack,
  useToast,
} from "@gluestack-ui/themed"
import { UserPhoto } from "@components/UserPhoto"
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { ToastMessage } from "@components/ToastMessage"
import { useAuth } from "@hooks/useAuth"
import { api } from "@services/api"
import { AppError } from "@utils/AppError"

import defaultUserPhotoImg from "@assets/userPhotoDefault.png"

type FormDataProps = {
  name: string
  email: string
  password: string | null
  old_password: string | null
  confirm_password: string | null
}

const profileSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 dígitos.")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("password"), null], "A confirmação de senha não confere.")
    .when("password", {
      is: (Field: any) => Field,
      then: (schema) =>
        schema
          .nullable()
          .required("Informe a confirmação da senha.")
          .transform((value) => (!!value ? value : null)),
    }),
})

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false)

  const { user, updateUserProfile } = useAuth()
  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },

    resolver: yupResolver(profileSchema),
  })

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        return
      }

      const photoURI = photoSelected.assets[0].uri

      if (photoURI) {
        const photoInfo = (await FileSystem.getInfoAsync(photoURI)) as {
          size: number
        }

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: "top",
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                title="Essa imagem é muito grande. Escolha uma de até 5MB"
                onClose={() => toast.close(id)}
              />
            ),
          })
        }

        const fileExtension = photoURI.split(".").pop()

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: photoURI,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        }as any;

        const userPhotoUploadForm = new FormData()
        userPhotoUploadForm.append("avatar", photoFile)

        try {
          // console.log("Tentando fazer upload para:", `${api.defaults.baseURL}/users/avatar`)
          const avatarUpdatedResponse = await api.patch("/users/avatar", userPhotoUploadForm, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          })

          const userUpdated = {
            ...user,
            avatar: avatarUpdatedResponse.data.avatar
          }
          
          updateUserProfile(userUpdated)

          toast.show({
            placement: "top",
            render: () => (
              <Toast backgroundColor="$warning500" variant="outline">
                <ToastTitle color="$white">
                  Foto atualizada!
                </ToastTitle>
              </Toast>
            ),
          })
        } catch (error: any) {
          console.error("Erro detalhado:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            baseURL: api.defaults.baseURL
          })
          
          toast.show({
            placement: "top",
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                title={`Erro ao fazer upload: ${error.message}`}
                onClose={() => toast.close(id)}
              />
            ),
          })
        }
      }
    } catch (error: any) {
      // console.error("Erro ao selecionar a foto:", error.message)
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={`Erro ao selecionar foto: ${error.message}`}
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true)

      const userUpdated = user
      userUpdated.name = data.name

      await api.put("/users", data)

      await updateUserProfile(userUpdated)

      toast.show({
        placement: "top",
        render: () => (
          <Toast backgroundColor="$warning500" variant="outline">
            <ToastTitle color="$white">
              Perfil atualizado com sucesso!
            </ToastTitle>
          </Toast>
        ),
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar os dados. Tente novamente mais tarde."

      toast.show({
        placement: "top",
        render: () => (
          <Toast backgroundColor="$red500" action="error" variant="outline">
            <ToastTitle color="$white">{title}</ToastTitle>
          </Toast>
        ),
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <UserPhoto
            source={user.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : defaultUserPhotoImg}
            alt="Foto do usuário"
            size="xl"
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="$warning500"
              fontFamily="$heading"
              fontSize="$md"
              mt="$2"
              mb="$8"
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Center w="$full" gap="$4">
                <Input
                  placeholder="Nome"
                  bg="$gray600"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              </Center>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Center w="$full" gap="$4">
                <Input
                  placeholder="E-mail"
                  bg="$gray600"
                  value={value}
                  isReadOnly
                />
              </Center>
            )}
          />

          <Heading
            alignSelf="flex-start"
            fontFamily="$heading"
            color="$gray200"
            fontSize="$md"
            mt="$12"
            mb="$2"
          >
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Center w="$full" gap="$4">
                <Input
                  placeholder="Senha antiga"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={onChange}
                />
              </Center>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Center w="$full" gap="$4">
                <Input
                  placeholder="Nova senha"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              </Center>
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Center w="$full" gap="$4">
                <Input
                  placeholder="Confirmar nova senha"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.confirm_password?.message}
                />
              </Center>
            )}
          />

          <Center w="$full" gap="$4">
            <Button
              title="Atualizar"
              onPress={handleSubmit(handleProfileUpdate)}
              isLoading={isUpdating}
            />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}
