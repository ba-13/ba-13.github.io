---
layout: post
title: Setting up GLFW Locally
excerpt-seperator: <!---->
tags: local-build, glfw, graphics
---

I wanted to get started working with OpenGL, with context handling using a local build of GLFW.  
Here's how to setup perfectly.

<!---->

## OpenGL Setup

First things first, Install OpenGL Development Libraries.

```bash
sudo apt update
sudo apt install mesa-common-dev libgl1-mesa-dev
```

To check if correctly available

```bash
sudo apt install mesa-utils
glxinfo | grep "OpenGL version"
```

## GLFW Setup

Great. Now create an empty directory, suppose `~/project/`. This will contain all the project and it's dependencies
apart from OpenGL libraries. Clone GLFW in it.

```bash
cd ~/project
git clone git@github.com:glfw/glfw.git
```

You have the source ready! Build this to libraries that you can link using

```bash
cmake -DCMAKE_INSTALL_PREFIX:PATH=. -B ./glfw-build -S ./glfw
cd glfw-build
make
make install
```

`CMAKE_INSTALL_PREFIX:PATH` is a predefined variable that points to the path where cmake would install the library to.
Here you directed cmake to install the library at `.`, which while using `make install` is inside `~/project/glsl-build`.

At this point your `glsl-build` would have `lib/cmake` directory inside that would contain `glfw3Configure.cmake` and `glfw3Targets.cmake`. These are necessary to let your main project find the `glfw` libraries.

## Code Setup

Now with `glfw` installed and ready, `cd ~/project` and create a bunch of folders and files

```bash
mkdir build src
touch CMakeLists.txt src/main.cpp README.md
```

Copy over the `.cpp` file [here](https://www.glfw.org/documentation.html) inside your `main.cpp`.
Also copy over the following to your `CMakeLists.txt`

```cmake
CMAKE_MINIMUM_REQUIRED(VERSION 3.7)
PROJECT(project)

SET(CMAKE_CXX_STANDARD 14)
SET(CMAKE_BUILD_TYPE DEBUG)

SET(CMAKE_PREFIX_PATH ${CMAKE_PREFIX_PATH} ~/project/glfw-build/lib/cmake)

FIND_PACKAGE(glfw3 REQUIRED)
FIND_PACKAGE(OpenGL REQUIRED)

SET(SOURCE_FILES src/main.cpp)

ADD_EXECUTABLE(project ${SOURCE_FILES})
TARGET_LINK_LIBRARIES(project glfw GL)
```

Note that `CMAKE_PREFIX_PATH` specifies where to look for custom `cmake` files to libraries you want to include.
`TARGET_LINK_LIBRARIES` specify the executable should be linked to which libraries. You can check out what keyword to mention, e.g. here `glfw`, from `glfw3Targets.cmake`, where you'll find a line `add_library(glfw STATIC IMPORTED)`, similarily for OpenGL.

## Building Project

```bash
cd ~/project/build
cmake ..
make
```

This would build the project.

## VSCode setup

So to ease development in `C++` (or any language per se), VSCode provides Intellisense, which essentially reads through headers/references/libraries you provide and helps you write code knowing the context. If your Intellisense is not setup well for your files,
you would see

![Red Squiggles]({{site.baseurl}}/images/building-glfw/red-squiggles.png)

To clear this, create `mkdir ~/project/.vscode/` and `touch c_cpp_properties.json`.
Fill that file with the following

```js
{
    "configurations": [
        {
            "name": "Linux",
            "includePath": [
                "/usr/include/",                        // to include GL/gl.h
                "/usr/include/x86_64-linux-gnu",        // to include bits/types.h
                "${workspaceFolder}/**",                // default include, can remove
                "${workspaceFolder}/glfw-build/include" // to include glfw headers
            ],
            "defines": [
                "__x86_64__"            // declares this if preprocessor directive as true
            ],
            "intelliSenseMode": "linux-clang-x64"       // default value
        }
    ],
    "version": 4
}
```

Each path you specify here, includes that in Intellisense's path to check for header files.
This will make your squiggles go away, and enable link jumps using `Ctrl` and Hovering above functions.
> Try removing the above lines one at a time and see where Intellisense failed to pick headers from.

### Sidenote

Another feature of VSCode I actively use is `Go Forward` and `Go Back`. Open Keyboard Shortcuts using `Ctrl+K Ctrl+S`,
type `Go Forward` and allot `Alt + RightArrow`, similarly for `Go Back` allot `Alt + LeftArrow`.

## Conclusion

Once you had done the `Building Project` part, you should find an executable `~/project/build/project`, which should directly run to render a window titled "Hello World". Note that GLFW is a minimal library that handles windows, OpenGL contexts and inputs gracefully.
You still need to handle OpenGL on your own! But a clean setup should give you a boost.
