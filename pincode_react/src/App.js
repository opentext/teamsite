import './App.css';
import React, { useState } from 'react';

function App() {

  let htmlString = "India Pincodes";
  let [data, setData] = useState("");
  let [content, setContent] = useState("")
  const [inputValue, setInputValue] = useState('');

  var root = document.getElementById("root");
  var id = root.dataset["appId"];
  var iw = window.iw;
  htmlString = iw.getPropertyValue(id, "DT01");

  const handleClick = () => {
    if(!inputValue || inputValue.length <= 0){
      setContent(<li class='list-group-item' >No Results found</li>);
      setData();
    }
    else{ 
    fetch("https://api.postalpincode.in/pincode/"+inputValue)
            .then((response) => response.json())
            .then((data) => {
              setData(data);
              if (data[0].Status === "Success") {
                let content = <><li className='list-group-item list-group-item-dark'>Post Office: {data[0].PostOffice[0].Name}</li>
                <li className='list-group-item list-group-item-dark'>District: {data[0].PostOffice[0].District}</li>
                <li className='list-group-item list-group-item-dark'>State: {data[0].PostOffice[0].State}</li></>
                setContent(content);
              }
            });
            
          }
  };


  return (
    <>
    <div data-app-id="$CONTEXT{componentId}" className="pincode-react-container" id="pincode-react-container">
  <div className="grid">
      <div class="made">
          <a class="d-block d-sm-inline-block py-1 px-3 text-decoration-none rounded-3 hero-notice">
              Built with <strong>React</strong>
          </a>
      </div>
      <div>
          <div class="title_pincode animate__animated animate__fadeInDown">
            <div class="icon"><i class="bi bi-mailbox"></i></div>
            <div data-in-context-edit="DT01"><div id="displayField" data-bind="title" dangerouslySetInnerHTML={{ __html: htmlString }}></div></div>
          </div>
          <input type="text" maxlength="6" inputmode="numeric" placeholder="pincode" name="pincode" id="pincode" value={inputValue} onChange={e => setInputValue(e.target.value)} required/>
          <button className="search-btn" id="search-btn" type="submit" onClick={handleClick}><i className="bi bi-search"></i> Search</button>
      </div>
      <div class="hint" title="hint">Enter a 6 digit pincode (e.g. 500049)</div>
      <div>
          <ul className="list-group animate__animated animate__fadeIn" id="searchResults">
            {content}
          </ul>
      </div>
  </div>
</div>
    </>
  );
}

export default App;
