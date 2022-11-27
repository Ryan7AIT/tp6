function getData() {

    httpRequest = new XMLHttpRequest();

    httpRequest.open('GET', '/getData');

    httpRequest.onreadystatechange = doAfficherData;


    httpRequest.send();
}

function doAfficherData() {
    if(httpRequest.readyState === XMLHttpRequest.DONE) {

        if(httpRequest.status === 200) {
            reponse = httpRequest.responseText;

            persons = JSON.parse(reponse)

            table = createTable();

            for(person of persons) {
                insertRow(person,table);
            }

            document.body.append(table);
        }else {
            alert('Petit soucis')
        }
    }
}

function createTable() {
    if(typeof table !== 'undefined')
        table.remove();

    table = document.createElement("table");
    table.setAttribute("border", 1);

    row = document.createElement("tr");

    th_id = document.createElement("th");
    th_nom = document.createElement("th");
    th_prenom = document.createElement("th");
    th_points = document.createElement("th");

    th_id.innerText = "Id";
    th_nom.innerText = "Nom";
    th_prenom.innerText = "Prenom";
    th_points.innerText = "Points";

    row.append(th_id);
    row.append(th_nom);
    row.append(th_prenom);
    row.append(th_points);

    table.append(row);

    return table;

}


function insertRow(person, table) {
    row = document.createElement("tr");

    td_id = document.createElement("td");
    td_nom = document.createElement("td");
    td_prenom = document.createElement("td");
    td_points = document.createElement("td");


    td_id.innerText = person["no"];
    td_nom.innerText = person["nom"];
    td_prenom.innerText = person["prenom"];
    td_points.innerText = person["points"];

    row.append(td_id);
    row.append(td_nom);
    row.append(td_prenom);
    row.append(td_points);

    table.append(row);

}