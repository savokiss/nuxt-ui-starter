<template>
  <div class="LoginPage container mx-auto px-4">
    <AppHeader />
    <div class="LoginForm rounded-md px-4 py-8 mx-auto max-w-2xl min-w-fit flex flex-col items-center border ">
      <h2 class="text-center text-xl">Sign In</h2>

      <div class="social-login text-center w-full mt-8">
        <UButton class="mx-auto" color="white" block @click="onGithubLogin">
          <template #leading>
            <IconGithub />  
          </template>
          Github
        </UButton>
      </div>

      <hr class="mt-4 border">

      <UForm
        class="mt-4 w-full"
        :validate="validate"
        :state="state"
        @submit="onEmailSignIn"
      >
        <UFormGroup label="Email" name="email" size="lg">
          <UInput v-model="state.email" placeholder="Your email" />
        </UFormGroup>
        <UButton class="mt-8" type="submit" block size="lg" :loading="loading">
          Get Magic Link
        </UButton>
      </UForm>
    </div>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
const toast = useToast()
const supabase = useSupabaseClient()

const redirectTo = `${useRuntimeConfig().public.hostUrl}/confirm`

const state = ref({
  email: undefined,
})
const loading = ref(false)

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: '必填' })
  return errors
}

const signInWithOAuth = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: redirectTo,
    },
  })
  if (error) console.log(error)
}

async function signInWithEmail(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: redirectTo,
    },
  })
  if (error) {
    return toast.add({
      title: error.message,
      color: 'red'
    })
  }
  return toast.add({
    title: 'Email sent, please check your inbox'
  })
}

async function onGithubLogin (event: FormSubmitEvent<any>) {
  signInWithOAuth()
}

async function onEmailSignIn () {
  loading.value = true
  if (state.value.email) {
    await signInWithEmail(state.value.email)
  }
  loading.value = false
}

// const user = useSupabaseUser()

// watch(user, () => {
//   if (user.value) {
//     return navigateTo('/')
//   }
// }, { immediate: true })
</script>

<style lang="less">
.LoginPage {

}
</style>

