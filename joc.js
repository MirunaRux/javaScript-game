window.JOC = window.JOC ||{};
/*legăm de window o variabilă JOC
 Face o comparație, dacă există deja window.JOC atunci nu este înlocuit,
 altfel, se creează un element un obiect nou.
 */
JOC.Setari = class{
	constructor(name, about, like, level, pizzaNames, sauce){
		this.name = localStorage.getItem('name');
		this.about = localStorage.getItem('about');
		this.like = localStorage.getItem('like');
		this.level = localStorage.getItem('level');
		this.pizzaNames = localStorage.getItem('pizzaNames');
		this.sauce = this.stringToArray(localStorage.getItem('sauce'));

		if(this.name == null) this.name = name;

		if(this.about == null) this.about = about;

		if(this.like == null) this.like = like;
		else this.like = parseInt(this.like); ///parsam valoarea 
		///deoarece localStorge nu returneaza decat date de tip string

		if(this.level == null) this.level = level;
		else this.level = parseInt(this.level);

		if(this.pizzaNames == null) this.pizzaNames = pizzaNames;
		else this.pizzaNames = parseInt(this.pizzaNames);

		if(this.sauce == null){

			var number = [];

			for(var i = 0;i < sauce.length; i++)
				number.push(sauce[i]);

			this.sauce = number;
		}		
	}

	stringToArray(string){
		if(string == null) return null;

        var array = []; 

        for(var i = 0;i < string.length - 1; i++) 
            array.push(parseInt(string[i]));  
        
        return array;      
	}

	ArrayToString(array){
		if(array.length == null) return null;

		var string = "";

		for(var i = 0;i < array.length; i++)
			string = string.concat(array[i].toString(), ";");

		return string;
	}

	validareForm(){
		var checkLevel = document.querySelectorAll('input[name = "choice"]:checked');

		if(checkLevel.length <= 0) return false;

		var checkName = /[A-Z]\S*/;

		if(!checkName.test(document.getElementById('name'))) return false;

		return true;
	}

	getElementsFromForm(){
		if(!this.validareForm()) return false;

		var name = document.getElementById('name');
		var about = document.getElementById('about');
		var like = document.getElementById('like');
		var level = document.querySelectorAll('input[name = "choice"]:checked');
		var pizzaNames = document.getElementById('pizzaNames');
		var sauce = document.querySelectorAll('option[data = "sauce"]:checked');

		this.name = name;
		localStorage.setItem('name', this.name);

		this.about = about;
		localStorage.setItem('about', this.about);

		this.like = parseInt(like.value);
		localStorage.setItem('like', this.like);

		this.level = level.value;
		localStorage.setItem('level', this.level);

		this.pizzaNames = parseInt(pizzaNames.value);
		localStorage.setItem('pizzaNames', this.pizzaNames.toString());

		this.sauce = sauce;
		var aux = [];
		for(var i = 0;i < this.sauce.length; i++)
			aux.push(this.sauce[i].value);
		localStorage.setItem('sauce', this.ArrayToString(aux));
		this.sauce = aux;

		return true;
	}

	setElementsInForm(){
		
		var level = document.querySelectorAll(
			        'input[name = "choice"][value = "' 
			        + this.level.toString() 
			        + '"]');
		level.checked = true;

		var nr = 1;
		var sauces = document.getElementById('sauce');

		for(var i = 0;i < 5; i++)
		{
			var option = document.createElement('option');
			option.setAttribute('data', 'sauce');
			option.value = nr.toString();
			option.innerText = "sosul " + option.value;
			sauces.appendChild(option);
			nr++;
		}

		for(var i = 0; i < sauces.length; i++)
    		sauces.options[i].selected = true;
	}
}

    JOC.initializeForm = function(){
		var sauces = [];

		var setari = new JOC.Setari("Nume", "", 5, 1, 1, sauces);
		setari.setElementsInForm();
  
		var button = document.getElementsByClassName("button")[0];
		
		button.addEventListener('click', 
			                    function(){
										if(setari.getElementsFromForm())
											alert('START!');
										else
											alert("nu");
								}
		);
    }

///-------------------------------------------------------------------------
function bigImg(x) {
    x.style.height = "200px";
    x.style.width = "250px";
}

function normalImg(x) {
    x.style.height = "100px";
    x.style.width = "150px";
}

///--------------------------------------------------------------------------
function add(){
	var par = document.createElement("LI");
	var text = document.createTextNode("Pizza");
	par.appendChild(text);

	var list = document.getElementById('list');
	list.insertBefore(par, list.childNodes[0]);
}

function remove(){
	var list = document.getElementById("list");
	
    list.removeChild(list.childNodes[0]);
}
///--------------------------------------------------------------------------
function myFunction() {
	var currentTime = new Date();
    setTimeout(function(){ alert("Wellcome to Top secret recipes game ! "); }, currentTime + 10);
}
///--------------------------------------------------------------------------
window.addEventListener('load', function(){
	JOC.initializeForm();
	myFunction();
});
