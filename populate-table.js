const client = new Discord.Client();

// Discord

client.on('ready', () => {
    console.log("Logged in as ${client.user.tag}!");
    client.user.setActivity('Usernames', {type: 'WATCHING'});

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
    httpClient.get("members.csv", function(response) {
        var lines = response.split("\n");
        var fields = new Map(lines.map(function(line) { return line.split(","); }).map(function(fields) { return [fields[0], fields]; }));
        
        var memberDataTBody = document.getElementById("member-data");
        var loadedRows = [];
        
        var guild = client.guilds.get("531421964527468544");
        var members = guild.members.values();
        var botRoleID = "742219744073089124";
        
        for (var member of members) {
            var currentFields = fields.get(member.user.id);

            var row = document.createElement('tr');
            
            if (!member.roles.has(botRoleID)) {
                var cell = document.createElement('td');
                cell.appendChild(document.createTextNode(member.displayName));
                row.appendChild(cell);
            
                if (currentFields !== undefined) {
                    for (field of currentFields.slice(1)) {
                        var cell = document.createElement('td');
                        cell.appendChild(document.createTextNode(field));
                        row.appendChild(cell);
                    }
                }
            }
        
            loadedRows.push(row);
        }
        
        memberDataTBody.append(...loadedRows);
    });
});

client.login('NzQyODczNTUyMjE0MTYzNjI3.XzMc6A.7uJlslv4WCve4yv1MTGNRHqxnOc');