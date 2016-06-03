var app;
(function(){
	app=angular.module("Tistechko",[]);
	app.controller("MainController",["$timeout",function($timeout){
		var oThis=this;
		this._date="";
		this._time="";
		var d=new Date();
		this.news=[];
		this.persons=[];
		this.competitions=[];
		this.person;

		var a=function(){
			d=new Date();
			oThis._time=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
			oThis._date=d.getDay()+" - "+d.getMonth()+" - "+d.getFullYear();
			$timeout(a,1000);
		};

		var addPerson=function(nam,rat){
			var pers={name:nam,rating:rat,id:Date.now().toString(),cachedProblems:[],email:"",group:"",school:"",icon:"person.png"};
			oThis.persons.push(pers);
			return pers;
		};

		var addNews=function(_code,_auth){
			oThis.news.push({newsCode:_code,author:_auth,creationTime:Date.now()});
		};

		this.getTop=function(count){
			var blist=[];
			
			for (var j = 0; j < count; j++) {
				var rating=0;
				var sel;
			for (var i = 0; i < this.persons.length; i++) {
				if(this.persons[i].rating>rating && blist.indexOf(this.persons[i])===-1){
					sel=this.persons[i];
					rating=sel.rating;
				}
			};
			blist.push(sel);
			};
			return blist;
		};

		var getPersons=function(){
			return oThis.persons;
		};

		var getPersonByID=function(_id){
			pers=getPersons();
			for (var i = 0; i < pers.length; i++) {
				if(pers[i].id===_id)
					return pers[i];
			};
			return {};
		};

		var addCompetition=function(nam,_type,opts){
			var comp={name:nam,type:_type,options:opts,id:Date.now().toString(),count:0};
			
			for (var i = 0; i < oThis.persons.length; i++) {
				if((_type==="public") || (_type==="school" && oThis.persons[i].school===opts[0]) || (_type==="group" && oThis.persons[i].school===opts[0]) || (_type==="invite" && opts.indexOf(oThis.persons[i].id)>-1))
				comp.count+=1;
			};

			oThis.competitions.push(comp);
			return comp;
		};

		var getCompetitions=function(){
			return oThis.competitions;
		};

		this.getAvaibleCompetitions=function(pers){
			var coms=[];
			var _coms=getCompetitions();
			for (var i = 0; i < _coms.length; i++) {
				if(_coms[i].type==="public" || (_coms[i].type==="school" && oThis.person.school===_coms[i].options[0]) || (_coms[i].type==="group" && oThis.person.group===_coms[i].options[0]) || (_coms[i].type==="invite" && _coms[i].options.indexOf(oThis.person.id)>-1))
					coms.push(_coms[i]);
			};
			return coms; 
		};



		a();

		addPerson("na",100);
		addPerson("bt",110);
		addPerson("ev",1000);
		addPerson("pm",200);
		var p = addPerson("kq",150);

		this.person=p;

		addNews("<h3>This are News</h3>",p);
		addCompetition("Graphs","public",[]);
	}]);
})();
