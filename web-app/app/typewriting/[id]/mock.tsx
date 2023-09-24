
export const mockWords = `Written by Vishwas Gopinath\n\nOn September 8th, there was fresh buzz in the JavaScript community: Bun v1.0, created by Jarred Sumner, had arrived. But with all the talk, many are left wondering: What's the essence of Bun? Why is everyone drawing parallels with the tried-and-true Node.js? Is Bun just another fleeting trend, or is it here to redefine the game? In this article, let’s dive deep into Bun, check out its features, and find out how it compares to the well-established Node.js.\n\nWhat is Bun?\n\nBun is a super fast all-in-one toolkit for JavaScript and TypeScript apps. The beauty of Bun lies in its ability to streamline the development process, making it smoother and more efficient than ever. This is possible because Bun is not just a runtime, it's also a package manager, a bundler, and a test runner. Imagine having a Swiss Army knife for JS development; that's Bun for you.\n\nWhat Bun solves for\n\nThe inception of Node.js in 2009 was groundbreaking. However, as with many technologies, as it grew, so did its complexity. Think of it like a city. As a city expands, traffic congestion can become a problem.\n\nBun aims to be the new infrastructure that alleviates this congestion, making things run smoother and faster. It's not about reinventing the wheel but refining it, ensuring that while we get the speed and simplicity, we don't lose the essence of what makes JavaScript unique and powerful.\n\nBun is designed as a faster, leaner, more modern replacement for Node.js so let’s take a closer look at some comparison. But first let’s discuss one other topic.\n\nNode.js versus Deno versus Bun\n\nWhen discussing the evolution of JavaScript runtimes, it's hard to overlook Deno. Ryan Dahl, the creator of Node.js, introduced Deno as a new runtime that aimed to address some of the challenges and regrets he identified with Node.js.\n\nDeno is a secure runtime for JavaScript and TypeScript. It directly addresses many of the shortcomings of Node.js. For instance, Deno natively supports TypeScript without the need for external tools. Unlike Node.js, where scripts have broad permissions by default, Deno adopts a security-first approach requiring developers to explicitly grant permissions for potentially sensitive operations, such as file system access or network connectivity.\n\nWhile Deno presents a compelling alternative to Node.js, it hasn't matched Node.js's widespread adoption. Therefore, this article centers on contrasting Bun with the well-established Node.js.\n\nGetting started\n\nWith Bun, we can scaffold an empty project with the command bun init -y. We have a few files generated and in index.ts, add a line, console.log("Hello, Bun!"). In the terminal, run the command bun index.ts to see “Hello, Bun!” logged.\n\nBun versus Node.js: JavaScript runtime\n\nA JavaScript runtime is an environment which provides all the necessary components in order to use and run a JavaScript program.\n\nBoth Node.js and Bun are runtimes. Node.js is primarily written in C++ where as Bun is written with a low-level general purpose programming language called Zig. But that is just the tip of the ice berg. Let’s take a closer look at other differences when treating Bun as a runtime alone.\n\nJavaScript engine\n\nA JavaScript engine is a program that converts JavaScript code we write into machine code that allows a computer to perform specific tasks.\n\nWhile Node.js uses Google's V8 engine that power's Chrome browser, Bun uses JavaScriptCore (JSC), which is an open source JavaScript engine developed by Apple for Safari.\n\nV8 and JSC have different architectures and optimization strategies. JSC prioritizes faster start times and reduced memory usage with a slightly slower execution time. On the other hand, V8 prioritizes fast execution with more runtime optimization which may lead to more memory usage.\n\nThis makes Bun fast, starting up to 4x faster than Node.js.\n\nSummary: bun ran 2.19 times faster than deno and 4.81 times faster than node\n\nTranspiler\n\nWhile Node.js is a powerful runtime for JavaScript, it doesn't natively support TypeScript files. To execute TypeScript in a Node.js environment, external dependencies are required. One common approach is to use a build step to transpile TypeScript (TS) into JavaScript (JS) and then run the resulting JS code. Here's a basic setup that uses the ts-node package:\n\n1. Installation\n\n\nnpm install -D typescript ts-node\n\n\n2. Script configuration\n\nIn your package.json, you can set up scripts to streamline the process:\n\n\n{\n  "scripts": {\n    "start": "ts-node ./path/to/your/file.ts"\n  }\n}\n\n\n3. Execution\n\nWith the above script, you can easily run your TypeScript file:\n\n\nnpm start\n\n\nIn contrast, Bun offers a more streamlined approach. It comes with a JavaScript transpiler integrated into the runtime. This allows you to directly run .js, .ts, .jsxand .tsx files. Bun's built-in transpiler seamlessly converts these files to vanilla JavaScript, facilitating immediate execution without additional steps.\n\n\nbun index.ts\n\n\nThe difference in speed is magnified when running a TypeScript file as Node.js requires a transpilation step before it can be run.\n\nESM and CommonJS compatibility\n\nA module system allows developers to organize code into reusable segments. In JavaScript, the two primary module systems are CommonJS and ES modules (ESM). CommonJS, originating from Node.js, uses require and module.exports for synchronous module handling, ideal for server-side operations.\n\nESM, introduced in ES6, employs import and export statements, providing a more static and asynchronous approach, optimized for browsers and modern build tools. Let's use colors for CommonJS and chalk for ESM, two popular packages for adding colored outputs to the console and to better understand the module systems.\n\nNode.js has been traditionally associated with the CommonJS module system. Here's a typical usage:\n\n\n// CommonJS in Node.js (index.js)\nconst colors = require("colors");\nconsole.log(colors.green('Hello, world!'));\n\n\nFor ES modules in Node.js, you have one of two options:\n\nYou need to include "type": "module" in your package.json.\nUse the .mjs extension.\n// ESM in Node.js (index.mjs)\nimport chalk from 'chalk';\nconsole.log(chalk.blue('Hello, world!'));\n\n\nThe transition from CommonJS to ES modules (ESM) has been a complex journey. It took Node.js half a decade post ESM's introduction to support it without the experimental flag. Still, CommonJS remains prevalent in the ecosystem.\n\nBun simplifies the module system by supporting both without any special configuration. Bun's standout feature is its ability to support both import and require() in the same file, something not natively possible in Node.js:\n\n\n// Mixed modules in Bun (index.js)\nimport chalk from "chalk";\nconst colors = require("colors");\n\nconsole.log(chalk.magenta('Hello from chalk!'));\nconsole.log(colors.cyan('Hello from colors!'));\n\nWeb APIs\n\nWeb APIs, integral to browser-based applications, offer tools like fetch and WebSocket for web interactions. While these have become browser standards, their support in server-side environments like Node.js has been inconsistent.\n\nIn earlier versions of Node.js, Web standard APIs commonly available in browsers weren't natively supported. Developers had to rely on third-party packages like node-fetch to replicate this functionality. However, from Node.js v18, there's experimental support for the fetch API, potentially eliminating the need for these packages.\n\nBun simplifies this by offering built-in support for these Web standard APIs. Developers can directly use stable fetch, Request, Response, WebSocket and other browser-like APIs without any additional packages. Furthermore, Bun's native implementation of these Web APIs ensures they are faster and more reliable compared to third-party alternatives.\n\nHere's an example compatible with both Node.js (v18 and above) and Bun. While it's experimental in Node.js, the same functionality is stable in Bun:\n\n\n// Experiment fetch in Node.js (v18 and above) and built-in fetch in Bun\nasync function fetchUserData() {\n  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");\n  const user = await response.json();\n  console.log(user.name);\n}\n\nfetchUserData(); // Leanne Graham\n\nHot reloading\n\nHot reloading is a feature that boosts developer productivity by automatically refreshing or reloading parts of an application in real-time as the code changes, without requiring a full restart.\n\nIn the Node.js ecosystem, you have a couple of options for achieving hot reloading. One popular tool has been nodemon, which hard-restarts the entire process:\n\n\nnodemon index.js\n\n\nAlternatively, starting from Node.js v18, there's an experimental --watch flag introduced:\n\n\nnode --watch index.js\n\n\nBoth methods aim to provide real-time reloading of the application as code changes. However, they might have different behaviors, especially in certain environments or scenarios.\n\nFor instance, nodemon can lead to disruptions like disconnecting HTTP and WebSocket connections, while the --watch flag, being experimental, might not offer the full suite of features and has some reported issues in the GitHub issues.\n\nBun takes hot reloading a step further. By running Bun with the --hot flag, hot reloading is enabled:\n\n\nbun --hot index.ts\n\n\nUnlike the Node.js methods that might require a full process restart, Bun reloads your code in-place without terminating the old process. This ensures that HTTP and WebSocket connections remain uninterrupted and the application state is preserved, providing a smoother development experience.\n\nNode.js compatibility\n\nWhen transitioning to a new runtime or environment, compatibility is often a primary concern for developers. Bun addresses this by positioning itself as a drop-in replacement for Node.js. This means that existing Node.js applications and npm packages can seamlessly integrate with Bun without any modifications. Key features that ensure this compatibility include:\n\nSupport for built-in Node.js modules such as fs, path, and net.\nRecognition of global variables like __dirname and process.\nAdherence to the Node.js module resolution algorithm, including the familiar node_modules structure.\n\nBun is still evolving. It's tailored to enhance development workflows and is ideal for environments where resources are limited, such as serverless functions. The team behind Bun is striving for comprehensive Node.js compatibility and better integration with prevalent frameworks\n\nWhile Bun ensures compatibility with Node.js, it doesn't stop there. Bun ships with highly-optimized, standard-library APIs for the things you need most as a developer.\n\nBun APIs\n\nBun.file()\n\nLazily load files and access their content in various formats. This method is up to 10x faster than its Node.js counterpart.\n\n\n// Bun (index.ts)\nconst file = Bun.file("package.json");\nawait file.text();\n\n// Node.js (index.mjs)\nconst fs = require("fs/promises");\nconst fileContents = await fs.readFile("package.json", "utf-8");\n\n\nBun.write()\n\nA versatile API to write data to disk, from strings to Blobs. It writes up to 3x faster than Node.js.\n\n\n// Bun (index.ts)\nawait Bun.write("index.html", "<html/>");\n\n// Node.js (index.mjs)\nconst fs = require("fs/promises");\nawait fs.writeFile("index.html", "<html/>");\n\n\nBun.serve()\n\nSet up HTTP server or WebSocket server using Web-standard APIs. It can serve 4x more requests per second than Node.js and handle 5x more WebSocket messages than the ws package in Node.js. This backend capability is reminiscent of how developers use Express in Node.js but with the added benefits of Bun's performance optimizations.\n\n\n// Bun (index.ts)\nBun.serve({\n  port: 3000,\n  fetch(request) {\n    return new Response("Hello from Bun!");\n  },\n});\n\n// Node.js (index.mjs)\nimport http from "http";\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { "Content-Type": "text/plain" });\n  res.end("Hello from Node.js!");\n});\nserver.listen(3000);\n\n\nBun also has support for sqlite and password built-in.\n\nBun versus Node.js: package manager\n\nBun is more than just a runtime; it's an advanced toolkit that includes a powerful package manager. If you've ever found yourself patiently waiting during dependency installations, Bun offers a refreshingly faster alternative. Even if you don't use Bun as a runtime, its built-in package manager can speed up your development workflow.\n\nCheck out this table comparing Bun commands with npm, Node's package manager:\n\nAt a glance, Bun's commands might seem familiar but the experience is anything but ordinary. Bun boasts installation speeds that are orders of magnitude faster than npm. It achieves this by leveraging a global module cache, eliminating redundant downloads from the npm registry. Additionally, Bun employs the fastest system calls available for each operating system, ensuring optimal performance.\n\nHere's a speed comparison of installing dependencies for a starter Remix project from cache, comparing Bun and npm:\n\nThe bun CLI contains a Node.js-compatible package manager designed to be a dramatically faster replacement for npm, yarn, and pnpm\n\nMoreover, a bun run <command> takes just 7ms, while npm run <command> takes 176ms. While Node.js's npm has been the standard for JavaScript package management for years, Bun really is a speed powerhouse and presents a compelling alternative.\n\nBun versus Node.js: bundler\n\nBundling is the process of taking multiple JavaScript files and merging them into one or more optimized bundles. This process can also involve transformations, such as converting TypeScript to JavaScript or minifying the code to reduce its size.\n\nIn the Node.js ecosystem, bundling is typically handled by third-party tools rather than Node.js itself. Some of the most popular bundlers in the Node.js world include Webpack, Rollup, and Parcel, offering features like code splitting, tree shaking, and hot module replacement.\n\nBun, on the other hand, is not just a runtime and a package manager but also a bundler in its own right. It's designed to bundle JavaScript and TypeScript code for various platforms, including frontend applications in the browser (React or Next.js applications) and Node.js.\n\nTo bundle with Bun, you can use a simple command:\n\n\nbun build ./index.ts --outdir ./build\n\n\nThis command bundles the index.ts file and outputs the result in the ./build directory. The bundling process is incredibly fast, with Bun being 1.75x faster than esbuild, and significantly outpacing other bundlers like Parcel and Webpack.\n\nBun takes 0.17s, esbuild 0.3s, rspack 4.45s, Parcel 2 26.32s, Rollup 32s and Webpack 5 38.02s\n\nA standout feature in Bun is its introduction of JavaScript macros. These allow for the execution of JavaScript functions during bundling, with the results directly inlined into the final bundle. This mechanism offers a fresh perspective on bundling.\n\nCheck out this example where Bun's JavaScript macros are leveraged to fetch a username during the bundling process. Instead of making a runtime API call, the macro fetches the data at bundle-time, inlining the result directly into the final output:\n\n\n// users.ts\n\nexport async function getUsername() {\n  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");\n  const user = await response.json();\n  return user.name;\n}\n\n// index.ts\n\nimport { getUsername } from "./users.ts" with { type: "macro" };\nconst username = await getUsername();\n\n// build/index.js\n\nvar user = await "Leanne Graham";\nconsole.log(user);\n\n\nWhile Node.js has its established bundling tools, Bun offers an integrated, faster, and innovative alternative that could reshape the bundling landscape.\n\nBun versus Node.js: test runner\n\nTesting is a crucial aspect of software development, which ensures that code behaves as expected and catches potential issues before they reach production. In addition to being a runtime, a package manager and a bundler, Bun is also a test runner.\n\nWhile Node.js developers have traditionally relied on Jest for their testing needs, Bun introduces a built-in test runner that promises speed, compatibility, and a range of features that cater to modern development workflows.\n\nBun's test runner, bun:test, is designed to be fully compatible with Jest, a testing framework known for its "expect"-style APIs. This compatibility ensures that developers familiar with Jest can easily transition to Bun without a steep learning curve.\n\n\nimport { test, expect } from "bun:test";\n\ntest("2 + 2", () => {\n  expect(2 + 2).toBe(4);\n});\n\n\nExecuting tests is straightforward with the bun test command. Moreover, Bun's runtime supports TypeScript and JSX out of the box, eliminating the need for additional configurations or plugins.\n\nMigrating from Jest or Vitest\n\nBun's commitment to compatibility shines through its support for Jest's global imports. For instance, importing from @jest/globals or vitest will be internally re-mapped to bun:test. This means that existing test suites can run on Bun without any code modifications.\n\n\n// index.test.ts\nimport { test } from "@jest/globals";\n\ndescribe("test suite", () => {\n  test("addition", () => {\n    expect(1 + 1).toBe(2);\n  });\n});\n\nPerformance benchmarks\n\nBun's test runner is not just about compatibility; it's about speed. In a benchmark against the test suite for Zod, Bun proved to be 13x faster than Jest and 8x faster than Vitest. This speed advantage is further highlighted by Bun's matchers, which are implemented in fast native code. For instance, expect().toEqual() in Bun is a staggering 100x faster than Jest and 10x faster than Vitest.\n\nWhether you're looking to migrate existing tests or start a new project, Bun provides a robust testing environment that aligns with modern development needs.\n\nConclusion\n\nNode.js has long been a cornerstone in the JavaScript world, setting benchmarks and guiding developers. However, Bun is stepping onto the scene as a noteworthy challenger, pushing boundaries.\n\nWhile it's still early days for Bun, the buzz it's generating is undeniable. Currently, it's optimized for MacOS and Linux, and while Windows support is in progress, some features are still on the horizon. With all it offers, Bun is certainly a toolkit you should consider exploring.\n\nVisually build with your components\n\nBuilder.io is a visual editor that connects to any site or app and lets you drag and drop with your components.\n\nTry it out Learn more\n\n\n// Dynamically render your components\nexport function MyPage({ json }) {\n  return <BuilderComponent content={json} />\n}\n\nregisterComponents([MyHero, MyProducts])\n\nRead the full post on the Builder.io blog`;