# Copyright © 2023 OpenText Corporation, All rights reserved.

## Open the project in VS Code.
1. Extract the zip file.
2. Open Visual Studio Code.
    - File > Open Folder
    - Choose the extracted folder.

## Import steps
1. Import into TeamSite using Teamsite UI.
    - Zip the workspace content and import the zip via the TeamSite UI

OR

2. Import into Teamsite via otts cli.
    - use the following command to convert the vanilla js project to a npm project
        > npm init
    - Install the otts cli as described in the README for the otts npm module.
    - Because vanilla js lacks a build directory, we can place workspace content in a directory(eg: build) by manually creating one and upload using otts cli.