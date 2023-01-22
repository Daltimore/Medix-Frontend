<template>
  <div class="h-full flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
      <div class="bg-white py-8 px-6 shadow sm:rounded-lg sm:px-16">
        <form class="space-y-6" @submit.prevent="loginPersonal">
          <div>
            <h2 class="text-center text-[1.2rem] text-[#333333]">
              Welcome back
            </h2>

            <h4 class="text-center text-[.9rem] mt-2 text-[#4F4F4F]">
              Fill in your login details to proceed
            </h4>
          </div>
          <div class="pt-2">
            <m-input placeholder="Username" v-model="loginPayload.username" />
          </div>

          <div>
            <m-input
              placeholder="Password"
              type="password"
              v-model="loginPayload.password"
            />
          </div>

          <div class="pt-3">
            <m-button class="w-full !text-[1rem]"> Login </m-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()

const loginPayload = ref({
  username: '',
  password: '',
})

const loginPersonal = () => {
  console.log(loginPayload.value)
  router.push('/dashboard')
}
</script>
