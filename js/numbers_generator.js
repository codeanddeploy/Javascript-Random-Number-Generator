$('#startNumbersGeneratorForm').on('submit', function(event){
	event.preventDefault();
	var resultsDiv = $('#generatorResults');
	$(resultsDiv).empty();
	var balls = parseInt($(this).find('input[name="from_balls"]').val());
	var from = parseInt($(this).find('input[name="range_numbers"]').val());
	var balls2 = parseInt($(this).find('input[name="extra_balls"]').val());
	var from_extra = parseInt($(this).find('input[name="range_extra_numbers"]').val());
	var numbers = new Array;

	for(let i = 1; i <= from; i++) numbers.push(i);
	if(from_extra > 0) {
		var extra_numbers = new Array;
		for(let i = 1; i <= from_extra; i++) extra_numbers.push(i); 
	}

	var resultsUl = document.createElement('ul');
	resultsUl.setAttribute('class', 'balls big');
	$(resultsDiv).append(resultsUl);

	if(balls2 > 0) {
		for(let i = 1; i <= balls; i++) {
			var ball = document.createElement('li');
			ball.setAttribute('class', 'ball');
			ball.setAttribute('id', 'B'+i);
			var innerA = document.createElement('span');
			innerA.setAttribute('class', 'innerA');
			var innerB = document.createElement('span');
			innerB.setAttribute('class', 'innerB');
			$(innerA).append(innerB);
			$(ball).append(innerA);
			$(resultsUl).append(ball);
		}
		for(let i = balls + 1; i <= balls + balls2; i++) {
			var extra = document.createElement('li');
			extra.setAttribute('class', 'bonus extra');
			extra.setAttribute('id', 'B'+i);
			var innerA = document.createElement('span');
			innerA.setAttribute('class', 'innerA');
			var innerB = document.createElement('span');
			innerB.setAttribute('class', 'innerB');
			$(innerA).append(innerB);
			$(extra).append(innerA);
			$(resultsUl).append(extra);
		}
		generate(balls, numbers, balls2, extra_numbers);
	} else {
		for(let i = 1; i <= balls; i++) {
			var ball = document.createElement('li');
			ball.setAttribute('class', 'ball');
			ball.setAttribute('id', 'B'+i);
			var innerA = document.createElement('span');
			innerA.setAttribute('class', 'innerA');
			var innerB = document.createElement('span');
			innerB.setAttribute('class', 'innerB');
			$(innerA).append(innerB);
			$(ball).append(innerA);
			$(resultsUl).append(ball);
		}
			generate(balls, numbers);
	}
});

function generate(balls, numbers, balls2=0, extra_numbers=0) { 
	$(".innerB").html("?"); 
	for (var i = 1; i < balls + balls2 + 1; i++){ 
		createNums($("#B" + i + " .innerB"), i, balls, numbers, balls2, extra_numbers); 
	} 
	for (var i = 1; i < balls + balls2 + 1; i++){ 
		moveNums($("#B" + i + " .innerB"), i, balls, numbers, balls2, extra_numbers); 
	}
}; 

function createNums(obj, idNum, balls, numbers, balls2, extra_numbers) {
	if (idNum <= balls) { 
		for (var i = 0; i < numbers.length * 2; i++){ 
			var chosen = Math.floor(Math.random() * numbers.length); 
			obj.append('<div class="number" id="ID_' + idNum + '-' + i + '">' + numbers[chosen] + '</div>'); 
		} 
	} else {
		if(extra_numbers.length > 0) {
			for (var j = 0; j < extra_numbers.length * 2; j++){ 
				var chosen = Math.floor(Math.random() * extra_numbers.length); 
				obj.append('<div class="number" id="ID_' + idNum + '-' + j + '">' + extra_numbers[chosen] + '</div>');
			} 
		}
	} 
}; 

function moveNums(obj, idNum, balls, numbers, balls2, extra_numbers) { 
	var time = 500;
	time += Math.round(Math.random() * 1000); 
	obj.stop(true, true); 
	obj.css('margin-top', '-2080px'); 
	var Duplicates = checkDuplicates(idNum, balls, numbers, balls2, extra_numbers); 
	while (Duplicates) {
		Duplicates = checkDuplicates(idNum, balls, numbers, balls2, extra_numbers)
	} 
	obj.animate( {"margin-top":"-1040px"}, {'duration': time, 'easing': 'swing'} ); 
}; 

function checkDuplicates(idNum, balls, numbers, balls2, extra_numbers) { 
	for (var i = 1; i < balls + 1; i++) { 
		if ( i != idNum && $('#ID_' + i + "-19").html() == $('#ID_' + idNum + "-19").html() ) { 
			$("#B" + idNum + " .innerB").html("?"); 
			createNums($("#B" + idNum + " .innerB"), idNum, balls, numbers, balls2, extra_numbers);
			return true; 
		} 
	} 
	if (balls2 > 1 && idNum > balls) { 
		for (var i = balls + 1; i < balls + balls2 + 1; i++) { 
			if ( i != idNum && $('#ID_' + i + "-19").html() == $('#ID_' + idNum + "-19").html() ) { 
				$("#B" + idNum + " .innerB").html("?");
				createNums($("#B" + idNum + " .innerB"), idNum, balls, numbers, balls2, extra_numbers); 
				return true; 
			} 
		} 
	}
	return false; 
};