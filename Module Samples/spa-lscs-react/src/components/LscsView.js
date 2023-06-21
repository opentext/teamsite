import { useState } from 'react';
import './table.css';
import './lscsview.css'
import React from 'react';
import { useEffect } from 'react';
function LscsView() {


    const [state, setState] = useState('');
    // drop down values of projects
    const [projects, setProjects] = useState([]);

    //use this for radio button selection
    const [selectedOption, setSelectedOption] = useState('predefinedsearch');

    //use this for project selection
    const [projectSelected, setProjectSelected] = useState('');

    // drop down search
    const [searchQuery, setSearchQuery] = useState('');

    // dropdown selection of pre-defined-search
    const [selectedDropdownOption, setSelectedDropdownOption] = useState('name');

    //on radio button click handler
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
		setSearchQuery('');
    }

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    }
    
    const handleDropdownOptionChange = (event) => {
        setSelectedDropdownOption(event.target.value);
    }

    const handleProjectChange = (event) => {
        setProjectSelected(event.target.value);
    }

    useEffect(() => {
        if(selectedOption === "search") {
            let iw = window.iw;
            let callback = function (errorObj, documents) {
                console.log(documents, errorObj);
                if(documents) {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(documents, "text/xml");
    
                    // Get the value of the 'id' attribute of the first 'project' element
                    const projects = Array.from(xmlDoc.getElementsByTagName('project'));
                    let projectNames = [];
                    projects.forEach(project => {
                        let name = project.getAttribute('name');
                        projectNames.push(name);
                    });
                    setProjects(projectNames);
                    setProjectSelected(projectNames.length > 0 ? projectNames[0]: "");
                }
                else {
                    setState(errorObj.reason);
                }
            };
            iw.getProjects(callback);
        }

      }, [selectedOption]);
    
    const getProjectName = (name) => {
        return name.substring(name.lastIndexOf("/")+1, name.length);
    }

    const lscsGet = (e) => {
		
		const iw = window.iw;
		const callback = function (errorObj, documents) {
			if(documents) {
		      setState(documents);
			}
			else {
			  setState(errorObj.reason);
			}
		};
		
		if(selectedOption === "predefinedsearch")
		{
			let api = "documents";
			if(selectedDropdownOption.toLowerCase() === "documents-metadata")
			{
				api = "document_meta";
			}
			let params ={ q: '*',
					      includeDCRContent: true,
					      inlineLoad: true,
					      format: 'json'
				        }
			// sample LSCS query call
			iw.queryLscs(api, params, callback);
		}
		else
		{
            // fetching the projects
            let params ={ q: 'ast_relative_path:*/'+searchQuery,
                          project: projectSelected,
					      includeDCRContent: true,
					      inlineLoad: true,
					      format: 'json'
				        }
			// custom LSCS query call
			iw.queryLscs("documents", params, callback);
		}
        
    }

    return (
       <div className='lscsview'>
            <div className="radio-buttons">
                <label htmlFor="predefinedsearch">
                    <input type="radio" name="searchradio" value="predefinedsearch" defaultChecked onChange={(e) => handleOptionChange(e)} id="predefinedsearch"/>
                    <span> Pre-defined search</span>
                </label>
                <label htmlFor="search">
                    <input type="radio" name="searchradio" value="search" onChange={(e) => handleOptionChange(e)} id="search"/>
                    <span> Simple search</span>
                </label>
             </div>
             <div className='search-fields'>
                    {selectedOption === "search" ? (
                        <>
                        <label><strong>Project:</strong></label>
                        <select id="lscs-api" className="formselect" autoFocus={true} onChange={handleProjectChange}>
                            {projects.map(option => (
                                <option key={option} value={option}>{getProjectName(option)}</option>
                            ))}
                        </select>
                        <label><strong>Search input:</strong></label>
                        <input 
						   type="text" 
						   name="searchtext" 
						   className="formcontrol" 
						   autoComplete="off"
						   id="searchtext"
						   placeholder='Search by document name'
						   value={searchQuery}
						   onChange={handleSearchInputChange}
                           title="Search by document name"/>
                        </>
                    ) : 
                    (
                    <select id="lscs-api" className="formselect" autoFocus={true} onChange={handleDropdownOptionChange}>
                        <option value="Documents">Documents</option>
                        <option value="Documents-Metadata">Documents-Metadata</option>
                    </select>
                     )}
                    <button className="searchbtn" onClick={(e) => lscsGet(e)}>Search</button>
             </div>
             <div className='results'>
				<h3>Search Results</h3>
				<div className="response">
					<pre>{state ? JSON.stringify(state, null, 2) : 'No results found'}</pre>
				</div>
             </div>
       </div>
    );

}

export default LscsView;