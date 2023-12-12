### Copyright © 2023 OpenText Corporation All rights reserved.

# LSCS-DataSource-Sample.spar

This SPAR contains a **LiveSite Content Services (LSCS) data source**. It is intended to be imported into the EStudioGlobal project that is shipped with TeamSite v23.4 and later. As part of the import process, the sample data source is shared with the **Sample** project and submitted.

## Importing the SPAR
This SPAR can be imported either from eStudio UI or using the Import command line utility (CLT).

### Importing from eStudio UI

1. Login to TeamSite and navigate to `Experience Studio`.
1. Navigate to "All Projects" view and select `Import SPAR` from the `Create project` menu.
1. When notified that the project already exists, select `Update Existing`.
1. In the next step, select either `Skip files` or `Overwrite files` for this particular scenario.
1. Then select `Overwrite global assets`.
1. Finally, click on `Import project`.
Once imported, data source should be visible under Global project's Configuration > Data sources. 

### Importing using the command line tool (for on-premise installations)

1. SSH into the TeamSite host system.
1. Copy the SPAR to a directory on the host system.
1. Navigate to <iw_home>/TeamSite/bin
1. Run the following command:
"archiveimport -s <SPAR_LOCATION> -pc overwrite -gc overwrite"

## Working with the imported sample data source

Once the SPAR is imported, in Experience Studio, select `Configurations -> Data sources` from the left navigation menu. Since this is a sample, it will require following changes to be functional within the TeamSite instance its being imported into:

1. Click `Edit` on the "LSCS" data source tile.
1. Update the LSCS configuration based on your LSCS configuration/deployment. 
   * `Authentication details`
   * `Operation details`
	* API endpoint
	* Query parameters (Details below)
1. You can optionally verify the data source operations before saving by selecting `Test operation`.
1. Click `Save`, then close the data source.
1. Global data sources should be shared with projects for them to be configurable in specific projects. To do so, on the data source tile, click on  `Projects` and choose required projects the data source should be shared with. *Note: by default the data source is shared with the `Sample` project.*
1. Submit the data source.
1. Use the data source in your template and page components!
> **Note:** For more information on how to use the data source on your templates and pages, refer to the **Online help**.

###### Query Parameter Reference
**q**: Default value is \*:\* which is "select all" wildcard syntax. Search can be performed based on specific metadata as well (E.g. `TeamSite/Templating/DCR/Type:General/Products`). For detailed documentation on filter query syntax, refer to the LSCS documentation. 

**project**: Specify the branch path of the desired target project. E.g. `//iwserver/default/main/sample`
