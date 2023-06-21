import React from 'react';

function PropertiesView() {

    var iw = window.iw;

    // gets the appId
    var root = document.getElementById("root");
    var id = root.dataset["appId"];

    const myBoolean = iw.getPropertyValue(id, "D001");
    const myCheckboxGroup = iw.getPropertyValue(id, "D002").value;
    const myColor = iw.getPropertyValue(id, "D003");
    const myRule = iw.getPropertyValue(id, "D004");
    const myDate = iw.getPropertyValue(id, "D005");
    const myDcr = iw.getPropertyValue(id, "D006");
    const myFile = iw.getPropertyValue(id, "D009");
    const myFont = iw.getPropertyValue(id, "D010");
    const myImage = iw.getPropertyValue(id, "D011");
    const myNumber = iw.getPropertyValue(id, "D012");
    const myPageLink = iw.getPropertyValue(id, "D013");
    const myRadioGroup = iw.getPropertyValue(id, "D014");
    const mySelectMultiple = iw.getPropertyValue(id, "D015");
    const mySelectSingle = iw.getPropertyValue(id, "D016");
    const myString = iw.getPropertyValue(id, "D017");
    const myTextarea = iw.getPropertyValue(id, "D018");


    let myDcrTitle = "Dcr Title";
    try {
        myDcrTitle = myDcr['dcrContent']['Content']['Title'];
    } catch (e) {}

    let myDcrSummary = "Dcr Summary";
    try {
        myDcrSummary = myDcr['dcrContent']['Content']['Summary'];
    } catch (e) {}

    let myDcrDetails = "Dcr Details";
    try {
        myDcrDetails = myDcr['dcrContent']['Content']['Details'];
    } catch (e) {}

    return (
        <div>
        <table>
                <thead>
                    <tr>
                        <th>Property/Datum Name</th>
                        <th>Property/Datum Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Boolean</td>
                        <td>{ myBoolean + "" }</td>
                    </tr>
                    <tr>
                        <td>CheckboxGroup</td>
                        <td>{ myCheckboxGroup }</td>
                    </tr>
                    <tr>
                        <td>Color</td>
                        <td>{ myColor }</td>
                    </tr>
                    <tr>
                        <td>Rule</td>
                        <td>{ JSON.stringify(myRule) }</td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td>{ JSON.stringify(myDate) }</td>
                    </tr>
                    <tr>
                        <td>Dcr</td>
                        <td>
                            <div data-dcr-item-paths="/Content/Title" data-in-context-edit="D006" dangerouslySetInnerHTML={{ __html: myDcrTitle }}></div>
                            <div data-dcr-item-paths="/Content/Summary" data-in-context-edit="D006" dangerouslySetInnerHTML={{ __html: myDcrSummary }}></div>
                            <div data-dcr-item-paths="/Content/Details" data-in-context-edit="D006" dangerouslySetInnerHTML={{ __html: myDcrDetails }}></div>
                        </td>
                    </tr>
                    <tr>
                        <td>File</td>
                        <td>{ JSON.stringify(myFile) }</td>
                    </tr>
                    <tr>
                        <td>Font</td>
                        <td>{ JSON.stringify(myFont) }</td>
                    </tr>
                    <tr>
                        <td>Image</td>
                        <td>
                            <div data-in-context-edit="D011">
                                <img src={ myImage.path } aria-hidden alt="Select an image and edit this description" title="Select an image and edit this description" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Number</td>
                        <td>{ myNumber }</td>
                    </tr>
                    <tr>
                        <td>PageLink</td>
                        <td>{ JSON.stringify(myPageLink) }</td>
                    </tr>
                    <tr>
                        <td>RadioGroup</td>
                        <td>{ JSON.stringify(myRadioGroup) }</td>
                    </tr>
                    <tr>
                        <td>SelectMultiple</td>
                        <td>{ JSON.stringify(mySelectMultiple) }</td>
                    </tr>
                    <tr>
                        <td>SelectSingle</td>
                        <td>{ JSON.stringify(mySelectSingle) }</td>
                    </tr>
                    <tr>
                        <td>String</td>
                        <td>{ myString + "" }</td>
                    </tr>
                    <tr>
                        <td>Textarea</td>
                        <td>
                            <div data-in-context-edit="D018" dangerouslySetInnerHTML={{ __html: myTextarea }}></div>
                        </td>
                    </tr>
                </tbody>
          </table>
          </div>
    );

}

export default PropertiesView;