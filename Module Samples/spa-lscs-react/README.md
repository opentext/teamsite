# Copyright © 2023 OpenText Corporation, All rights reserved.


## Pre-requisites: 
Nodejs should be installed.

## Open the project in VS Code.
1. Extract the zip file.
2. Open Visual Studio Code.
    - File > Open Folder
    - Choose the extracted folder.

## Steps to build a module

1. To build a module, go to module directory and open command window from there.
2. Next, run the following command to install the dependency packages:

   > npm install
   
3. Once all dependency modules are installed, run the following command to build the module.

   > npm run build

4. Once build is successful, you can see the "build" directory inside the same location.
5. Import module into TeamSite using either of the options
    - Zip the files inside the "build" directory and import the zip using the TeamSite UI.
    - To import into TeamSite from the command line, use otts cli. For more information please read the README in 'otts' NPM module.



## Changes to be done for CLOUD machines

In cloud, to make LSCS calls from LSDS(runtime), we need to do following changes:

1. Disable probes by running following commands from /opt/workspace
	> ./toggle_disableProbes.should
	> ./toggle_
	keepAlive.sh
2. Go to the LSDS pod and open the "content.properties" file in the following location.

   /Interwoven/LiveSiteDisplayServices/runtime/web/WEB-INF/conf/livesite_customer/content.properties
   
3. Update the "external.lscs.host" property in that file with LSCS host name (Ex: https://lscs.public.teamsite.info)
4. Restart the tomcat by running following command from /opt/tomcat/bin
	> ./catalina.sh stop
	> ./catalina.sh start
	
5. Now go to LSCS pod and enable CORS in the "lscs-conf.properties" file.

   /Interwoven/LiveSiteCSRT/runtime/webapps/lscs/WEB-INF/classes/lscs-conf.properties
   
6. Restart the tomcat by running following command from /opt/tomcat/bin
	> ./catalina.sh stop
	> ./catalina.sh start  