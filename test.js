var x11 = 100; ///abscisa centrului omuletului
var y11 = 300; ///ordonata centrului omuletului
var r11 = 50; ///raza omuletului

var dxx = 40; ///viteza de deplasare pe orizontala
var dyy = 40; ///viteza de deplasare pe verticala

var x22 = []; ///vector de bilute
var y22 = 300; ///ordonata centrelor bilutelor
var r22 = 15; ///raza unei bilute
var pearlNumber = 3; ///numarul de bilute
var pearlDistance = 70; ///distanta intre bilute
var pearlStart = 200; ///abscisa primei bilute

var margin = 10; ///marginea pana unde poate merge omuletul prin canvas
var dir = -20; ///cat de repede deschide gura
var pctOpen = 100; ///deschiderea gurii(in procent)
var mousePos2; ///pozitia mouse-ului
var message = 'Mouse position: ';

///canvas-ul
var canvas = document.getElementById('myCanvas2');
var context = canvas.getContext('2d');

///tastele
var upArrow = false;
var downArrow = false;
var leftArrow = false;
var rightArrow = false;
var directionLock = false;

function getPearl(distance) { ///getter pentru biluta
	return {
		x: pearlStart + distance,
		eaten: false
	};
}

function pearls() { ///pun bilutele in vectorul x22
	for(var i = 0; i < pearlNumber; i++) {
		x22[i] = getPearl(pearlDistance * (i + 1));
	}
}

function draw(canvas, message, pctOpen) {
	var fOpen = pctOpen / 100; ///transformam in float pctOpen
	var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
	context.lineWidth = 3; ///grosimea in pixeli a liniei de contur
    context.font = '18px arial';
    context.fillStyle = 'red';
    context.fillText(message, 10, 25); ///scriu mesajul cu coordonatele
	///la pozitia (10,25) in canvas
	for(var i = 0; i < pearlNumber; i++) {///parcurg bilutele
		if(Math.pow(x22[i].x - x11, 2) + Math.pow(y22 - y11, 2) <= Math.pow(2 * r22, 2)) {
		   		x22[i].eaten = true;///verific daca am trecut cu omuletul peste ele
		   		///daca da, le marchez ca mancate
		}
		if(!x22[i].eaten) { ///daca nu au fost mancate raman desenate
			context.beginPath();
			context.arc(x22[i].x, y22, r22, 0, 2 * Math.PI);
			context.lineTo(x22[i].x, y22);
			context.closePath();
			context.fillStyle = "#40e0d0";
			context.fill();
		} else {
			context.beginPath(); ///altfel se "sterg"(devin albe ca background-ul)
			context.arc(x22[i].x, y22, r22, 0, 2 * Math.PI);
			context.lineTo(x22[i].x, y22);
			context.closePath();
			context.fillStyle = "#FFF";
			context.fill();
		}
	}

	context.beginPath();///desenez omuletul
	context.arc(x11, y11, r11, fOpen * 0.2 * Math.PI, (2 - fOpen * 0.2) * Math.PI);
	///dau coordonatele centrului, raza, deschizatura gurii
	context.lineTo(x11, y11); ///gura(sunt linii care duc spre centrul omuletului)
	context.closePath();
	context.fillStyle = "#b70926"; ///culoare 
	context.fill();///colorez
	context.strokeStyle = '#000'; ///contur
	context.stroke(); ///trasez conturul
}

function getMousePos2(canvas, event) {
    var rect2 = canvas.getBoundingClientRect();
    return {
		x: event.clientX - rect2.left,
		y: event.clientY - rect2.top
	};
}

canvas.addEventListener('mousemove', function(event) {
	mousePos2 = getMousePos2(canvas, event);
	message = 'Mouse position: ' + mousePos2.x + ',' + mousePos2.y;
});

document.addEventListener('keydown', function (event) {
	if(event.keyCode == 37 && !directionLock) { 
		leftArrow = true; 
		directionLock = true; 
	}
	if(event.keyCode == 38 && !directionLock) { 
		upArrow = true; 
		directionLock = true; 
	}
	if(event.keyCode == 39 && !directionLock) { 
		rightArrow = true; 
		directionLock = true; 
	}
	if(event.keyCode == 40 && !directionLock) { 
		downArrow = true; 
		directionLock = true; 
	}
});

document.addEventListener('keyup', function (event){
	if(event.keyCode == 37) { 
		leftArrow = false; 
		directionLock = false; 
	}
	if(event.keyCode == 38) { 
		upArrow = false; 
		directionLock = false; 
	}
	if(event.keyCode == 39) { 
		rightArrow = false; 
		directionLock = false; 
	}
	if(event.keyCode == 40) { 
		downArrow = false; 
		directionLock = false; 
	}
});

function loop() { ///controlez miscarea omuletului dupa taste

	if(leftArrow && x11-r11 > margin) {
		x11 -= dxx;
	}
	if(upArrow && y11-r11 > margin) {
		y11 -= dyy;
	}
	if(rightArrow && x11+r11 < canvas.height-margin) {
		x11 += dxx;
	}
	if(downArrow && y11+r11 < canvas.width-margin) {
		y11 += dyy;
	}
}

setInterval (loop, 50);

setInterval(function() { ///updatam omuletul la fiecare 50 de milisecunde
	draw(canvas, message, pctOpen += dir);
 	///cand gura de deschide la maxim se inverseaza directia
    if (pctOpen % 100 == 0) {
      dir = -dir;
    }
  }, 50);

window.onload = function() {
	pearls();
	draw(canvas, message, pctOpen);
}
