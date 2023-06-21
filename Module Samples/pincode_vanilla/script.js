function loadData()
{	
    var iw = window.iw;

    var root = document.getElementById("pincode-vanilla-container");
    var id = root.dataset["appId"];
    
    let elem = document.getElementById("displayField");
	
    if(iw && iw.getPropertyValue(id, "DT01")){
        elem.innerHTML = iw.getPropertyValue(id, "DT01");
    }
    
		 
    var ele = document.getElementById('search-btn');
    ele.addEventListener('click', function() {
          pincode = document.getElementById("pincode").value;

          fetch("https://api.postalpincode.in/pincode/"+pincode)
            .then((response) => response.json())
            .then((data) => {
                let result = "No Records found!";
                if(data[0].Status == "Success"){
                    let po;
                    if(data[0].PostOffice instanceof Array)
                    {
                        po = data[0].PostOffice[0];
                    }
                    
                    result = "<li class='list-group-item list-group-item-dark'>Post Office: " + po.Name + "</li>";
                    result += "<li class='list-group-item list-group-item-dark'>District: " + po.District + "</li>";
                    result += "<li class='list-group-item list-group-item-dark'>     " + po.State + "</li>";
                    document.getElementById("searchResults").innerHTML = result;

                } else {
                    result = "<li class='list-group-item' >No Results found</li>";
                    document.getElementById("searchResults").innerHTML = result;
                }
            });
    });

}
window.onload = setTimeout(loadData, 100);