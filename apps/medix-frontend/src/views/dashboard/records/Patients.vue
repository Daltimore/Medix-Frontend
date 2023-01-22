<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <h2 class="text-gray-one text-lg font-medium tracking-wide">Patients</h2>
    <ul
      role="list"
      class="mt-10 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      <li
        @click="router.push({ name: type.link })"
        v-for="type in patientTypes"
        :key="type.name"
        class="col-span-1 flex shadow-md shadow-slate-200 rounded-md py-4 px-6 cursor-pointer"
      >
        <div>
          <m-button
            type="rounded"
            :icon="type.icons"
            class="!p-7"
            :class="type.bgColor"
            :iconClass="type.iconClass"
          />
        </div>
        <div class="flex-1 flex items-center justify-between truncate">
          <div class="flex-1 px-4 py-2 text-sm truncate">
            <div class="text-gray-two text-sm hover:text-gray-600">
              {{ type.name }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const patientTypes = [
  {
    name: 'Add new patient',
    link: 'DashboardNewPatients',
    bgColor: '!bg-[#F5EEFC] !text-[#9B51E0]',
  },
  {
    name: 'Patient groupings',
    icons: 'ph:users-three-duotone',
    link: 'LoginView',
    iconClass: '!h-6 !w-6',
    bgColor: '!bg-[#E9F7EF] !text-[#27AE60]',
  },
  {
    name: 'Create BID patient',
    icons: 'carbon:hospital-bed',
    link: 'LoginView',
    bgColor: '!bg-[#FBEBEB] !text-[#DA3838]',
    iconClass: '!h-6 !w-6',
  },
]

const router = useRouter()
</script>
