// https://stackoverflow.com/a/22076667/5390105
var HttpClient = function() {
  this.get = function(url, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() { 
      if (httpRequest.readyState == 4 && httpRequest.status == 200)
        callback(httpRequest.responseText);
    }

    httpRequest.open('GET', url, true);            
    httpRequest.send();
  }
};
  
var httpClient = new HttpClient();
httpClient.get("http://beam.igregory.ca/members", function(response) {
  const members = JSON.parse(response);
      
  var memberDataTBody = document.getElementById("member-data");
  var loadedRows = [];
      
  for (var memberId in members) {
    const memberFields = members[memberId];
    
    let row = document.createElement('tr');
    
    let cell = document.createElement('td');
    cell.appendChild(document.createTextNode(memberFields[0]));
    row.appendChild(cell);
        
    for (field of memberFields.slice(1)) {
      let cell = document.createElement('td');
      cell.appendChild(document.createTextNode(field));
      row.appendChild(cell);
    }
      
    loadedRows.push(row);
  }
      
  memberDataTBody.append(...loadedRows);
});
