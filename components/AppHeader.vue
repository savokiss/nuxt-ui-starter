<script setup lang="ts">
const user = ref({
  username: 'savokiss',
  avatar: 'https://place-hold.it/100?text=user'
})
const items = [
  [
    {
      label: 'Logout',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        console.log('Logout')
        logout()
      },
    },
  ],
]

const logout = async () => {
  navigateTo('/login')
}
</script>

<template>
  <div class="flex items-center justify-between h-20">
    <div class="cursor-pointer" @click="navigateTo('/')">
      <img class="rounded-full w-10" src="/icon.png" alt="logo">
    </div>
    <div v-if="user" class="flex justify-end">
      <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
        <UAvatar class="self-end" :src="user.avatar" :alt="user.username" size="md" />
        <template #account="{ item }">
          <div class="text-left">
            <p class="truncate font-medium text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
          </div>
        </template>
      </UDropdown>
    </div>
    <UButton v-else class="ml-4 px-6" variant="outline" @click="navigateTo('/login')">
      Login
    </UButton>
  </div>
</template>
