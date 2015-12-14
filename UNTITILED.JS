//declare the list array globally
var shopList = [];


//---initialize app storage, variables, and listeners---//
$(document).ready(function () {

	
	//-----setting local storage--//
	if (localStorage['list']) {
		shopList = JSON.parse(localStorage['list']);
        console.log(shopList);
	} 

    //-----making the create button add to list----//
	$('#createButton').on('click', addTask);
	
	$('#buttonText').keyup(function (e) {
		if (e.keyCode === 13) {
			addTask();
		}
	});
    
    //display the list
    displayList();
    
});



//-----Function is called when the any delete button is clicked---//
function deleteTask(ev) {    
   
    //makes sure this event only fires once from the one click
    ev.stopImmediatePropagation();
    
    //grab the task test from the clicked list item
    var taskText = $(ev.target).prev().text();
    
    //loop through the whole list array and find the match to the grabbed text
    for (var i=0; i < shopList.length; i++){
        
        if (shopList[i] == taskText){
			
			
    
            shopList.splice(i,1); //found a match, remove task from list
        }        
    }
     
    //refresh the list and local storage
    localStorage["list"] = JSON.stringify(shopList);
    displayList();
};


function doneTask(ev){
    
    //makes sure this event only fires once from the one click
    ev.stopImmediatePropagation();
	
	var theItem = $(ev.target).parent(); // the <li>
	var position = theItem.index();
	// get theList from localStorage
	// update 'done' on the item at this 'position'
	// resave theList to localStorage
	// either toggle as below or just regenerate the whole DOM list 
	// from localStorage
    //toggle a done class on and off task to apply css style
    $(ev.target).parent().toggleClass("taskDone");
}

//---add item to list---//
function addTask () {
    
    // get value from #name input
    var val = $('#buttonText').val();

     console.log(shopList);
    // add the task to the array
     shopList.push({name: val, done: false});


//get the local storage, then push the item into 
    // save to local storage
    localStorage["list"] = JSON.stringify(shopList);

    // append the name to the list
    appendToList(val);

    // reset the input field and focus it.
    $('#buttonText').val("").focus();
}


//---display and refresh the list function---//
function displayList(){
    
    //empty the list
    $('#ull').empty();
    
	var theList = // get the list from localstorage
    // then generate DOM content from it
    //loop through list array and add each item by calling appendToList
    for (var i = 0; i < theList.length; i++) {
        
		appendToList(shopList[i]);  
	}    
}

//---add item to list---//
function appendToList(val) {

	    var name = val.name;
	    var done = val.done;
		$('#ull').append('<li>' + "  <a href='#'q class='done ui-btn-left ui-btn-icon-notext ui-icon-check'></a><h3>" + val + "</h3><a href='#' class='delete ui-btn-right ui-btn-icon-notext ui-icon-delete'></a>" + '</li>');
    
    $("a.done").on("click", doneTask);
    
    //add the click listener the item that will call the deleteTask function
    $("a.delete").on("click", deleteTask);
    
}


