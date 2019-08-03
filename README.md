Before we start testing our GraphQL, we need to first compile our TypeScript files to JavaScript. For that, we’ll be using the TypeScript compiler. Running the command below directly from the project’s root directory:

$ tsc

The compiled JavaScript files will be inside the dist directory, as specified in tsconfig.json. Now we can start the GraphQL server:

$ node ./dist/index.js