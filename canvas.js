var dx = 4;
var dy = 4;
var y1 = 250;
var x1 = 30;
var x2 = 150;
var y2 = 150;
var r1 = 30;
var r2 = 20;
var mousePos;

/*function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
		x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
*/
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

/*canvas.addEventListener('mousemove', function(evt){
	mousePos = getMousePos(canvas, evt);
});
*/
function draw(){
	var context = myCanvas.getContext('2d');
	///bila cea care se misca independent
	context.clearRect(0, 0, 300, 300);
	context.beginPath();
	context.fillStyle = "#f1f442"; ///setam culoarea bilei
	context.arc(x1, y1, r1, 0, Math.PI * 2, true); ///deseneaza bila
	context.closePath();
	context.fill();
	///bila fixa
	context.beginPath();
	context.fillStyle = "red";
	context.arc(x2, y2, r2, 0, Math.PI * 2, true);
	context.closePath();
	context.fill();

	if( x1 - 30 < 0 || x1 + 30 > 300) ///ciocninrea cu peretii stanga, dreapta
	   dx = -dx;
	
	if( y1 - 30 < 0 || y1 + 30 > 300)///ciocnirea cu peretii sus, jos
		dy = -dy;

	if((x2 - x1)*(x2 - x1) + (y1 - y2)*(y1 - y2) <= (r1 + r2)*(r1 + r2))
	   	{
	   		dx = -dx;
	   		dy = -dy;
	   	}
		
	x1 += dx;
	y1 -= dy;
	//x2 = mousePos.x;
	//y2 = mousePos.y;
}

setInterval(draw, 20); 