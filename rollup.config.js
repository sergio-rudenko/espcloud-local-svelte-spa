// import path from "path";

import alias from "@rollup/plugin-alias";
import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";

//added for bulma
import postcss from "rollup-plugin-postcss";
// import { scss } from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    alias({
      entries: [
        {
          find: /^@src\/(.*)$/,
          replacement: __dirname + "/src/$1",
        },
        {
          find: /^@stores\/(.*)$/,
          replacement: __dirname + "/src/stores/$1.js",
        },
        {
          find: /^@components\/(.*)$/,
          replacement: __dirname + "/src/components/$1.svelte",
        },
      ],
    }),

    svelte({
      // enable run-time checks when not in production
      dev: !production,
      hydratable: true,

      // emitCss: true,
      // preprocess: [
      //   scss({
      //     includePaths: ["node_modules", "src"],
      //   }),
      // ],

      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: (css) => {
        css.write("public/build/bundle.css");
      },
    }),

    //added for bulma
    postcss({
      // extract: true,
      // Or with custom file name
      // extract: path.resolve("public/myglobal.css"),
      minimize: !production,
      sourceMap: !production,
      extract: "compiled.css",
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        });
      }
    },
  };
}
