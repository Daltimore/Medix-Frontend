<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="fixed inset-0 flex z-40 md:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white"
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-10 w-10 text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </TransitionChild>
            <div class="flex-shrink-0 flex items-center px-4">
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                alt="Workflow"
              />
            </div>
            <div class="mt-5 flex-1 h-0 overflow-y-auto">
              <nav class="px-2 space-y-1">
                <template v-for="item in navigation" :key="item.name">
                  <div v-if="!item.children">
                    <a
                      href="#"
                      :class="[
                        item.current
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group w-full flex items-center pl-2 py-2 text-sm  font-normal rounded-md',
                      ]"
                    >
                      {{ item.name }}
                    </a>
                  </div>
                  <Disclosure
                    as="div"
                    v-else
                    class="space-y-1"
                    v-slot="{ open }"
                  >
                    <DisclosureButton
                      :class="[
                        item.current
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm  font-normal rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500',
                      ]"
                    >
                      <Icon
                        :icon="!open ? item.iconify : item.iconifyActive"
                        class="w-5 h-5 mr-3"
                      />

                      <span class="flex-1">
                        {{ item.name }}
                      </span>
                      <svg
                        :class="[
                          open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                          'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150',
                        ]"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                      </svg>
                    </DisclosureButton>
                    <DisclosurePanel class="space-y-1">
                      <DisclosureButton
                        v-for="subItem in item.children"
                        :key="subItem.name"
                        as="a"
                        :href="subItem.href"
                        class="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-normal text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        {{ subItem.name }}
                      </DisclosureButton>
                    </DisclosurePanel>
                  </Disclosure>
                </template>
              </nav>
            </div>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div
      v-show="!isNarrow"
      class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0"
    >
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto"
      >
        <div
          class="flex items-center flex-shrink-0 px-4 justify-between -mt-[.2rem]"
        >
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
            alt="Workflow"
          />
          <button
            type="button"
            class="ml-1 absolute right-0 cursor-pointer flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            @click="sidebarOpen = true"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              class="text-gray-600 fill-current"
              @click="isNarrow = !isNarrow"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.92401 13.667C8.88154 13.7105 8.8308 13.745 8.77477 13.7685C8.71875 13.7921 8.65857 13.8042 8.59779 13.8041C8.53702 13.804 8.47688 13.7917 8.42093 13.768C8.36497 13.7443 8.31434 13.7096 8.27201 13.666L3.09001 8.34899C2.99899 8.25561 2.94805 8.13038 2.94805 7.99999C2.94805 7.86959 2.99899 7.74436 3.09001 7.65099L8.27201 2.33399C8.3144 2.29044 8.36509 2.25583 8.42108 2.2322C8.47707 2.20857 8.53723 2.1964 8.59801 2.1964C8.65878 2.1964 8.71894 2.20857 8.77493 2.2322C8.83092 2.25583 8.88161 2.29044 8.92401 2.33399C9.01123 2.42328 9.06006 2.54316 9.06006 2.66799C9.06006 2.79281 9.01123 2.91269 8.92401 3.00199L4.05101 7.99999L8.92401 13C9.01093 13.0892 9.05957 13.2089 9.05957 13.3335C9.05957 13.4581 9.01093 13.5777 8.92401 13.667ZM12.924 13.667C12.8815 13.7105 12.8308 13.745 12.7748 13.7685C12.7187 13.7921 12.6586 13.8042 12.5978 13.8041C12.537 13.804 12.4769 13.7917 12.4209 13.768C12.365 13.7443 12.3143 13.7096 12.272 13.666L7.09001 8.34899C6.99899 8.25561 6.94805 8.13038 6.94805 7.99999C6.94805 7.86959 6.99899 7.74436 7.09001 7.65099L12.272 2.33399C12.3144 2.29044 12.3651 2.25583 12.4211 2.2322C12.4771 2.20857 12.5372 2.1964 12.598 2.1964C12.6588 2.1964 12.7189 2.20857 12.7749 2.2322C12.8309 2.25583 12.8816 2.29044 12.924 2.33399C13.0112 2.42328 13.0601 2.54316 13.0601 2.66799C13.0601 2.79281 13.0112 2.91269 12.924 3.00199L8.05101 7.99999L12.924 13C13.0109 13.0892 13.0596 13.2089 13.0596 13.3335C13.0596 13.4581 13.0109 13.5777 12.924 13.667Z"
              />
            </svg>

            <!-- <CubeTransparentIcon
              class="w-6 h-6 text-gray-600"
              @click="isNarrow = !isNarrow"
            /> -->
          </button>
        </div>
        <div class="mt-5 flex-grow flex flex-col">
          <nav class="flex-1 pb-4 space-y-1 flex flex-col gap-y-1">
            <template v-for="item in navigation" :key="item.name">
              <div v-if="item.header">
                <h3
                  class="pl-6 mt-6 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {{ item.name }}
                </h3>
              </div>
              <div v-if="!item.children && !item.header">
                <a
                  :href="item.href"
                  class="!px-6"
                  :class="[
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group w-full flex items-center pl-2 py-2 leading-7 text-sm  font-normal rounded-md',
                  ]"
                >
                  <Icon :icon="item.iconify" class="w-5 h-5 mr-3" />
                  {{ item.name }}
                </a>
              </div>
              <Disclosure as="div" v-else class="space-y-1" v-slot="{ open }">
                <div
                  v-if="item.children"
                  :class="[
                    open ? 'bg-[#F8F0FB] text-[#9B51E0]' : 'text-[#4f4f4f]',
                  ]"
                  class="px-4"
                >
                  <DisclosureButton
                    class="group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-normal rounded-md focus:outline-none"
                  >
                    <Icon
                      :icon="!open ? item.iconify : item.iconifyActive"
                      class="w-5 h-5 mr-3"
                    />

                    <span class="flex-1"> {{ item.name }} </span>

                    <svg
                      :class="[
                        'ml-3 flex-shrink-0 h-[9px] w-[9px] transform  transition-colors ease-in-out duration-150',
                      ]"
                      class="fill-current"
                      viewBox="0 0 7 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.96967 0.46967C1.26256 0.176777 1.73744 0.176777 2.03033 0.46967L6.03033 4.46967C6.32322 4.76256 6.32322 5.23744 6.03033 5.53033L2.03033 9.53033C1.73744 9.82322 1.26256 9.82322 0.96967 9.53033C0.676777 9.23744 0.676777 8.76256 0.96967 8.46967L4.43934 5L0.96967 1.53033C0.676777 1.23744 0.676777 0.762563 0.96967 0.46967Z"
                      />
                    </svg>
                  </DisclosureButton>
                  <DisclosurePanel class="space-y-1 pb-3">
                    <div
                      class="relative flex flex-col items-center justify-center h-full after:absolute after:left-[1rem] after:w-[1px] after:h-[80%] after:bg-[#9B51E0]"
                    >
                      <DisclosureButton
                        v-for="subItem in item.children"
                        :key="subItem.name"
                        as="div"
                        class="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-normal rounded-md"
                      >
                        <router-link :to="{ name: subItem.href }">
                          {{ subItem.name }}
                        </router-link>
                      </DisclosureButton>
                    </div>
                  </DisclosurePanel>
                </div>
              </Disclosure>
            </template>
            <!-- <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              :class="[
                item.current
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-sm  font-normal rounded-md',
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  item.current
                    ? 'text-gray-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-6 w-6',
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </a> -->
          </nav>
        </div>
      </div>
    </div>
    <div
      v-show="isNarrow"
      aria-label="Sidebar"
      class="hidden md:flex md:w-20 md:flex-col md:fixed md:inset-y-0 md:bg-white relative z-40 shadow"
    >
      <div
        class="inset-y-0 left-0 md:static md:flex md:flex-shrink-0 relative items-center"
      >
        <a
          href="#"
          class="flex items-center justify-center h-16 w-16 bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 md:w-20"
        >
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
            alt="Workflow"
          />
        </a>
        <div
          class="w-[1.3rem] h-[1.3rem] cursor-pointer absolute right-[-.5rem] z-50 text-white rounded-full flex-shrink-0 bg-stone-800 flex items-center justify-center"
        >
          <svg
            @click="isNarrow = !isNarrow"
            class="fill-current stroke-current h-3 w-3"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.07599 2.33301C7.11846 2.28954 7.1692 2.255 7.22523 2.23146C7.28125 2.20791 7.34143 2.19583 7.40221 2.19592C7.46298 2.19602 7.52312 2.20828 7.57907 2.232C7.63503 2.25572 7.68566 2.29041 7.72799 2.33401L12.91 7.65101C13.001 7.74439 13.0519 7.86962 13.0519 8.00001C13.0519 8.13041 13.001 8.25564 12.91 8.34901L7.72799 13.666C7.6856 13.7096 7.63491 13.7442 7.57892 13.7678C7.52293 13.7914 7.46277 13.8036 7.40199 13.8036C7.34122 13.8036 7.28106 13.7914 7.22507 13.7678C7.16908 13.7442 7.11839 13.7096 7.07599 13.666C6.98877 13.5767 6.93994 13.4568 6.93994 13.332C6.93994 13.2072 6.98877 13.0873 7.07599 12.998L11.949 8.00001L7.07599 3.00001C6.98907 2.91076 6.94043 2.7911 6.94043 2.66651C6.94043 2.54193 6.98907 2.42227 7.07599 2.33301ZM3.07599 2.33301C3.11846 2.28954 3.1692 2.255 3.22523 2.23146C3.28125 2.20791 3.34143 2.19583 3.4022 2.19592C3.46298 2.19602 3.52312 2.20828 3.57907 2.232C3.63503 2.25572 3.68566 2.29041 3.72799 2.33401L8.90999 7.65101C9.00101 7.74439 9.05195 7.86962 9.05195 8.00001C9.05195 8.13041 9.00101 8.25564 8.90999 8.34901L3.72799 13.666C3.6856 13.7096 3.63491 13.7442 3.57892 13.7678C3.52293 13.7914 3.46277 13.8036 3.40199 13.8036C3.34122 13.8036 3.28106 13.7914 3.22507 13.7678C3.16908 13.7442 3.11839 13.7096 3.07599 13.666C2.98877 13.5767 2.93994 13.4568 2.93994 13.332C2.93994 13.2072 2.98877 13.0873 3.07599 12.998L7.94899 8.00001L3.07599 3.00001C2.98907 2.91076 2.94043 2.7911 2.94043 2.66651C2.94043 2.54193 2.98907 2.42227 3.07599 2.33301Z"
            />
          </svg>
        </div>
      </div>
      <div class="relative w-20 flex flex-col p-3 space-y-3">
        <a
          v-for="item in sidebarNavigation"
          :key="item.name"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:bg-gray-50',
            'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg',
          ]"
        >
          <span class="sr-only">{{ item.name }}</span>
          <Icon :icon="item.iconifyActive" class="w-6 h-6" />
        </a>
      </div>
    </div>
    <div
      :class="isNarrow ? 'md:pl-20' : 'md:pl-64'"
      class="flex flex-col flex-1"
    >
      <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          type="button"
          class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </button>
        <div class="flex-1 px-4 flex justify-between">
          <div class="flex-1 flex">
            <form class="w-full flex md:ml-0" action="#" method="GET">
              <label for="search-field" class="sr-only">Search</label>
              <div
                class="relative w-full text-gray-400 focus-within:text-gray-600"
              >
                <div
                  class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 stroke-current"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
                <input
                  id="search-field"
                  class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                  placeholder="Search"
                  type="search"
                  name="search"
                />
              </div>
            </form>
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="sr-only">View notifications</span>
              <Icon icon="uiw:bell" class="w-6 h-6" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton
                  class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <a
                      :href="item.href"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >{{ item.name }}</a
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="flex-1">
        <div class="py-6">
          <div
            class="3xl:max-w-[1440px] 3xl:mx-auto px-4 sm:px-6 md:px-10 font-normal"
          >
            <Routes />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
const navigation = ref([
  {
    name: 'Dashboard',
    iconify: 'ion:grid-outline',
    iconifyActive: 'ion:grid',
    current: true,
    // children: [
    //   { name: 'All consultations', href: 'DashboardAllConsultations' },
    //   { name: 'All lab results', href: 'DashboardAllConsultations' },
    // ],
  },
  {
    name: 'Records',
    iconify: 'icon-park-outline:love-and-help',
    iconifyActive: 'icon-park-solid:love-and-help',
    current: false,
    children: [
      { name: 'Patients', href: 'DashboardPatients' },
      { name: 'Out - patients', href: 'DashboardOutPatients' },
    ],
  },

  {
    name: 'Medical Officers',

    iconify: 'uis:stethoscope',
    iconifyActive: 'uis:stethoscope',
    current: false,
    children: [
      { name: 'Nurses', href: 'DashboardNurses' },
      { name: 'Doctors', href: 'DashboardDoctors' },
    ],
  },
  {
    name: 'Management',
    header: true,
  },
  {
    name: 'Administration',

    current: false,
    iconify: 'clarity:administrator-line',
    iconifyActive: 'clarity:administrator-solid',
    children: [
      { name: 'Nurses', href: '#' },
      { name: 'Doctors', href: '#' },
    ],
  },
  {
    name: 'Other',
    header: true,
  },
  {
    name: 'Settings',
    current: false,
    iconify: 'clarity:cog-line',
    iconifyActive: 'clarity:cog-solid',
  },

  // {
  //   name: 'Calendar',
  //   icon: CalendarIcon,
  //   current: false,
  //   children: [
  //     { name: 'Nurses', href: '#' },
  //     { name: 'Doctors', href: '#' },
  //   ],
  // },
  // {
  //   name: 'Documents',
  //   icon: InboxIcon,
  //   current: false,
  //   children: [
  //     { name: 'Overview', href: '#' },
  //     { name: 'Members', href: '#' },
  //     { name: 'Calendar', href: '#' },
  //     { name: 'Settings', href: '#' },
  //   ],
  // },
  // {
  //   name: 'Reports',
  //   icon: ChartBarIcon,
  //   current: false,
  //   children: [
  //     { name: 'Overview', href: '#' },
  //     { name: 'Members', href: '#' },
  //     { name: 'Calendar', href: '#' },
  //     { name: 'Settings', href: '#' },
  //   ],
  // },
  // {
  //   name: 'Analytics',
  //   icon: ChartBarIcon,
  //   current: false,
  //   href: '#analytics',
  // },
])
const userNavigation = ref([
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
])

const sidebarNavigation = ref([
  {
    name: 'Open',
    href: '#',
    iconifyActive: 'ion:grid',
    current: true,
  },
  {
    name: 'Customers',
    href: '#',
    iconifyActive: 'icon-park-solid:love-and-help',

    current: false,
  },
  {
    name: 'Flagged',
    href: '#',
    iconifyActive: 'uis:stethoscope',
    current: false,
  },
])

const sidebarOpen = ref(false)
const isNarrow = ref(false)
</script>
