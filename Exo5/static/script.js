
lignes = 0;


total_points=0;

persons = [
	{
		nom:"nom-1",
		prenom:"prenom-1",
		points:5
	},
	{
		nom:"nom-2",
		prenom:"prenom-2",
		points:10
	},
	{
		nom:"nom-3",
		prenom:"prenom-3",
		points:15
	}			
]


// Appel de init()
init();

function init(){	
	// Utilisez la boucle for..of vue en cours 
	// pour parcourir les objets du tableau persons
	// et appeller doInsert sur chaque objet
	
	// A completer
	/*
		for(... of ...){
			doInsert(...);
		}
	*/

	getPersons();

	
	// for(person of persons){
	// 	doInsert(person.nom, person.prenom, person.points);
	// }
}

function doInsertRowTable(num, nom, prenom, points){
	

	const table = document.getElementsByTagName("table")[0];
	
	
	row = document.createElement("tr");

	row.setAttribute("class", "row");
	
	col1 = document.createElement("td");
	col2 = document.createElement("td");
	col3 = document.createElement("td");
	col4 = document.createElement("td");
	col5 = document.createElement("td");
	col6 = document.createElement("td");

	

	col1.innerText = num;
	col2.innerText = nom;
	col3.innerText = prenom;	
	col4.innerText = points;
	chbox = document.createElement("input");
	chbox.setAttribute("type", "checkbox");
	col5.append(chbox);
		

	var btnEdit = document.createElement("button");
	btnEdit.innerText = "Edit";

	btnEdit.onclick = function() {
		editRow(btnEdit);
	}

	col6.append(btnEdit)


	col1.setAttribute("class", "col_number");
	col2.setAttribute("class", "col_text");	
	col3.setAttribute("class", "col_text");
	col4.setAttribute("class", "col_number");	
	col5.setAttribute("class", "col_chkbox");
	col5.setAttribute("class", "col_edit");	

	
	//  A compl�ter: RAJOUTER LES COLONNES A LA LIGNE row avec la m�thode append()
	row.append(col1);
	row.append(col2);
	row.append(col3);
	row.append(col4);
	row.append(col5);	
	row.append(col6);	

	
	//  A compl�ter: RAJOUTER LA LIGNE row AU TABLEAU table
	table.append(row);
}

function doInsert(id,nom, prenom, points){	
	lignes++;
	//num = lignes;
	total_points = total_points + points;			
	doInsertRowTable(id, nom, prenom, points);		
	update_summary();
}

function consoleTableau(){
	// A compl�ter
	console.log(persons);
}

function update_summary(){	
	// R�cup�rer l'�l�ment id = p1
	// element_lignes = ...(A COMPLETER)
	
	
	// R�cup�rer l'�l�ment id = p3
	// element_points = ...(A COMPLETER)
	
	
	// Avec innerText, modifiez le contenu de element_lignes
	// pour afficher le nombre de lignes (variables lignes)
	// element_lignes...(A COMPLETER)
	
	
	// Avec innerText, modifiez le contenu de element_points
	// pour afficher le total des points (variables total_points)
	// element_points...(A COMPLETER)

	element_lignes = document.getElementById("p1");
	element_points = document.getElementById("p3");
	element_lignes.innerText = lignes+" ligne(s)";
	element_points.innerText = "Total point(s)= "+total_points;
}

function doNewData(){		
	
	
	elt_nom = document.getElementById("form_nom");
	elt_prenom = document.getElementById("form_prenom");
	elt_points = document.getElementById("form_points");

	console.log(elt_prenom);
	
	nom = elt_nom.value;
	prenom = elt_prenom.value;
	points = parseInt(elt_points.value);
		
	if(nom=="" || prenom=="" || Number.isNaN(points))
		alert("Formulaire incomplet !");
	else{		
		
		httpRequest = new XMLHttpRequest();

		httpRequest.open('POST', '/api/persons');

		httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


	
		httpRequest.onreadystatechange  = function () {
			if (httpRequest.readyState === 4 && httpRequest.status === 201) {
				resp = JSON.parse(httpRequest.response);

				id = resp[0]["id"];

				doInsert(id,nom, prenom, points);
				persons.push({id,nom, prenom, points});


			}
		}
	

		var data = "valNom="+nom + "&valPrenom=" +prenom + "&valPoints="+points;

	
		httpRequest.send(data);
		


		

		elt_nom.value = "";
		elt_prenom.value = "";
		elt_points.value = "";
			
	}
}

function deleteRow(){
	if(lignes=0){
		alert("Tableau d�j� vide !");
	}else{		
		table = document.getElementsByTagName("table")[0];
		chkbox_list = table.querySelectorAll(".col_chkbox input");
		isOneChecked=false;
		for(let i=0; i<chkbox_list.length; i++){			
			if(chkbox_list[i].checked)
				isOneChecked = true;
		}
		if(isOneChecked!=true)
			alert("S�lectionnez au moins une ligne !");
		else{
				if (confirm('Voulez-vous vraiment supprimer les lignes ?')) {
				table = document.getElementsByTagName("table")[0];
				rows = table.getElementsByClassName("row");
				let i=0;
				while(i<rows.length){
					if(rows[i].lastChild.firstChild.checked){
						total_points = total_points - parseInt(rows[i].childNodes[3].innerText);

						id = parseInt(rows[i].firstChild.innerText);
						deletePerson(id);


						rows[i].remove();	
						persons.splice(i,1);	
						i--;
						lignes--;
					}	
					i++;
				}
				alert("Ligne supprim�e avec succ�s !");				
				update_summary();				
			}
		}
	}
}

function deletePerson(id) {
	httpRequest = new XMLHttpRequest();

    httpRequest.open('DELETE', '/api/persons/'+id);


    httpRequest.send();
}
// tp6

function actualiser() {
	getPersons();
}

function getPersons() {
	httpRequest = new XMLHttpRequest();

    httpRequest.open('GET', '/api/persons');

    httpRequest.onreadystatechange = doAfficherPersons;


    httpRequest.send();
}


function doAfficherPersons() {

	// const table = document.getElementsByTagName("table")[0];

	// rows = table.getElementsByClassName("row");

	// for (row of rows) {
	// 	row.remove();
	// }

	// lignes = 0;
	// total_points = 0;

	
	if(httpRequest.readyState === XMLHttpRequest.DONE) {

        if(httpRequest.status === 200) {

            reponse = httpRequest.responseText;

            persons = JSON.parse(reponse)

            for(person of persons) {
                doInsert(person.id, person.nom, person.prenom, person.points)
            }

            document.body.append(table);
        }else {
            alert('Petit soucis')
		}
	}
      
}

function editRow(btnEdit) {
	document.getElementById("form_edit_container").hidden = false;



	document.getElementById("form_container").hidden = true;

	tr = btnEdit.parentNode.parentNode;

	td_id = tr.childNodes[0];
	td_nom = tr.childNodes[1];
	td_prenom = tr.childNodes[2];
	td_points = tr.childNodes[3];

	elt_id = document.getElementById("form_edit_id");
	elt_nom = document.getElementById("form_edit_nom");
	elt_prenom = document.getElementById("form_edit_prenom");
	elt_points = document.getElementById("form_edit_points");

	elt_id.value = td_id.innerText;
	elt_nom.value = td_nom.innerText;
	elt_prenom.value = td_prenom.innerText;
	elt_points.value = td_points.innerText;



}

function annulerEdit() {
	document.getElementById("form_edit_container").hidden = true;
	document.getElementById("form_container").hidden = false;

}