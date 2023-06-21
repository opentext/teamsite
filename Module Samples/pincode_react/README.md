# Copyright © 2023 OpenText Corporation, All rights reserved.

## Pre-requisites:

- Nodejs should be installed.

## Open the project in VS Code.
1. Extract the zip file.
2. Open Visual Studio Code.
    - File > Open Folder
    - Choose the extracted folder.

## Build steps

1. To build the Pincode react module, go to module directory and open a command window from there.
2. Open Visual Studio Code
2. Next, run the following command to install the dependency packages:

   > npm install
   
3. Once all dependency modules are installed, run the following command to build the module.

   > npm run build

4. Once the build is successful, you can see the "build" directory inside the same location.
5. Import into TeamSite using either of the options
    - Zip the content inside the "build" and import the zip using the TeamSite UI
    - To import into TeamSite from the command line, use otts cli. For more information please read the README in otts NPM module.