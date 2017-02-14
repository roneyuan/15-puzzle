var state = {
	0: 15,
	1: 13,
	2: 3,
	3: "",
	4: 1,
	5: 14,
	6: 5,
	7: 2,
	8: 8,
	9: 10,
	10: 6,
	11: 9,
	12: 7,
	13: 4,
	14: 12,
	15: 11
}

var start = function() {
	generateGrid();
}

var generateGrid = function() {
	// Generate grid
	$('.frame').remove();
	var template = "<table class='frame'><tr>";

	for (key in state) {
		if (state[key] == "") {
			template += `<td id="${key}" class="box empty">${state[key]}</td>`;
		} else {
			template += `<td id="${key}" class="box">${state[key]}</td>`;	
		}

		if (key == 3 || key == 7 || key == 11) {
			template += "</tr><tr>";
		}
	}
	template+="</tr></table>";

	$('.show').append(template);	

	nextMove();
}

var nextMove = function () {
	$('.box').on('click', function(event) {
		event.preventDefault();
		
		var getClickedId = $(this).attr('id');
		var getClickedNumber = $(this).text();

		var surrunding = [+getClickedId-1, +getClickedId+1, +getClickedId-4, +getClickedId+4];
		var moveHorizontalRow = [+getClickedId-3, +getClickedId+3];
		var moveVerticalRow = [+getClickedId-12, +getClickedId+12];


		surrunding.forEach(function(element) {
			if (element >= 0 && element <= 15 && state[element] == "") {					
				// Edge case - do not move if element = 4, 8, 12 and trying to look left or element = 3, 7, 11 and trying to look right
				if (!((+getClickedId%4 == 0 && element == +getClickedId - 1) || ((+getClickedId+1)%4 == 0 && element == +getClickedId + 1))) {
					state[element] = +getClickedNumber;
					state[getClickedId] = "";
				} 
			}
		});
		
		moveHorizontalRow.forEach(function(element) {
			if (element >= 0 && element <= 15 && state[element] == "") {							
				if (+getClickedId - element < 0 && +getClickedId%4 == 0) {
					// move right
					for (var i = 0; i <= 2; i++) {
						// swap element
						[state[element-i],  state[element-i-1]] = [state[element-i-1], state[element-i]];						
					}	
				} else if (+getClickedId - element > 0 && (+getClickedId+1)%4 == 0){
					// move left
					for (var i = 0; i <= 2; i++) {
						[state[element+i], state[element+i+1]] = [state[element+i+1], state[element+i]];					
					}								
				}
			}
		});
		
		moveVerticalRow.forEach(function(element) {
			if (element >= 0 && element <= 15 && state[element] == "") {							
				if (+getClickedId - element < 0) {
					// move down
					for (var i = 0; i <= 8; i+=4) {
						// swap element
						[state[element-i],  state[element-i-4]] = [state[element-i-4], state[element-i]];						
					}	
				} else {
					// move up
					for (var i = 0; i <= 8; i+=4) {
						[state[element+i], state[element+i+4]] = [state[element+i+4], state[element+i]];					
					}								
				}
			}		
		});

		generateGrid();			
	});
}


$(start);
