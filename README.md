## Callejs projekt ##
Welcome to my Callejs project.
Instead of using a previously existing framework such as vue or react, I wanted to create my own version.
Of course the end result is not as complex as the actual frameworks, but it includes similar functionality
such as virtual DOM, reactivity, mounted hook and beforeDestroy hook.
The project was made possible by watching Evan You's serie on Vue mastery called Deep dive with Vue 3.
In the video collection he shows how to make a simple framework using vdom and reactivity.
I used this as a start and then continued on it and implemented my poop clicker.

## Poop clicker ##
I wanted to create something that utilizes both vdom and reactivity,
therefore, I chose to make my own version of the famous cookie clicker.
The idea of the game is to click on the poop.
When you have clicked a couple of times you can buy a cursor that clicks for you.
The data is stored when the window unloads and loaded on mount using the localStorage system.

## Notes ##
There are a lot of improvements that could've been done and I'll continue to improve it to learn further after this.
Something I want to implement is a compiler that allows me to write template markup that compiles into vnodes.

## Technologies used ##
npm - to manage the package dependencies
babel - javascript transpiler that converts edge js to plain old es5, also polyfills
file-loader - used to load images
sass-loader, etc. - used to use scss files
webpack - create a dev server and produce dist files

## How to run it ##
You need to have npm installed.
Open the folder callejsproject in the terminal.
Then run npm install to get the required dependencies.
Then npm run serve to start the project locally