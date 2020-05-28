import AppLayout from "@src/views/layout.svelte";

import Home from "@src/views/home.svelte";

import Setup from "@src/views/setup/index.svelte";
import SetupWiFiRouter from "@src/views/setup/router.svelte";
import SetupWiFiSoftAp from "@src/views/setup/softap.svelte";
import SetupUsers from "@src/views/setup/users.svelte";
import SetupCloud from "@src/views/setup/cloud.svelte";

import Factory from "@src/views/factory/index.svelte";
import FactoryFirmware from "@src/views/factory/firmware.svelte";

function userIsAdmin() {
  //check if user is admin and returns true or false
  return false;
}

const routes = [
  {
    name: "/",
    component: Home,
    layout: AppLayout,
  },
  {
    name: "/setup",
    layout: AppLayout,
    nestedRoutes: [
      { name: "index", component: Setup },
      {
        name: "wifi",
        layout: AppLayout,
        nestedRoutes: [
          { name: "router", component: SetupWiFiRouter },
          { name: "softap", component: SetupWiFiSoftAp },
        ],
      },
      { name: "users", component: SetupUsers },
      { name: "cloud", component: SetupCloud },
    ],
  },
  {
    name: "/factory",
    layout: AppLayout,
    nestedRoutes: [
      { name: "index", component: Factory },
      { name: "firmware", component: FactoryFirmware },
    ],
  },

  //   {
  //     name: "/public",
  //     layout: AppLayout,
  //     component: PublicIndex,
  //     // onlyIf: {
  //     //   guard: userIsAdmin,
  //     //   redirect: "/login",
  //     // },
  //   },
  //   {
  //     name: "login",
  //     layout: AppLayout,
  //     component: Login,
  //   },
  //   //   {
  //     name: "admin",
  //     component: AdminLayout,
  //     onlyIf: { guard: userIsAdmin, redirect: "/login" },
  //     nestedRoutes: [
  //       { name: "index", component: AdminIndex },
  //       {
  //         name: "employees",
  //         component: "",
  //         nestedRoutes: [
  //           { name: "index", component: EmployeesIndex },
  //           { name: "show/:id", component: EmployeesShow },
  //         ],
  //       },
  //     ],
  //   },
];

export { routes };
