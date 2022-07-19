/*Code by android developers start here*/
var startLoc = null;
//var contentName = '152';
//step 1:-
var contentName = parseInt(localStorage.getItem("currentbrand"));
var currentContentId  = parseInt(localStorage.getItem('currentcontent'));
//ends
var currentContentNSlide ='';

//custom slides changes begins here....

//alert("++++++++++++"+custcomslideflag1+"+++++++custcomslideid+++++++"+custcomslideid1);
	if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' &&  localStorage.getItem("currentcustomslideflag") =='true'){
		var custcomslideid1=parseInt(localStorage.getItem("currentcontentcustomslideId"));
		
		//step 2:
		currentContentNSlide = currentContentId+"_"+contentName+"_"+custcomslideid1;
		//step 2 ends here
		localStorage.setItem("current",currentContentNSlide);
		localStorage.setItem("currentslide",custcomslideid1);

	}else{
		//step 3 :
		currentContentNSlide = currentContentId+"_"+contentName+"_"+'1';
		//step 3 ends here
		localStorage.setItem("current",currentContentNSlide);
		localStorage.setItem("currentslide",'1');
	}
	
//custom slides changes ends here....

/* currentContentNSlide = contentName+"_"+'1';
localStorage.setItem("current",currentContentNSlide);
localStorage.setItem("currentslide",'1'); */
checkClickThrough();

document.getElementById("main_content").addEventListener("touchmove", touchHandler, false);
document.getElementById("main_content").addEventListener("touchstart", touchHandler, false);
function touchHandler(e) {

	if (e.type == "touchstart") {

			 if( e.touches.length == 1 ) { // one finger touch
			 	var touch = e.touches[ 0 ];
			 	startLoc = { x : touch.pageX, y : touch.pageY };
			 }

			} else if (e.type == "touchmove") {
				if( startLoc ) {
					var touch = e.touches[ 0 ];

					if( Math.abs( startLoc.x - touch.pageX ) > Math.abs( startLoc.y - touch.pageY ) )
					{
						e.preventDefault();
					}
					startLoc = null;
				}

			}
		}
		/*Code by android developers ends here*/
		$(document).ready(function(){

			var ua = navigator.userAgent;
	//var event = "touchstart";
	var event = (ua.match(/Ipad/i)) ? "touchstart" : "click";


	$(".left_arrow").click(function(event) {
		go_nav('b');
	});

	$(".right_arrow").click(function(event) {
		go_nav('f');
	});

	$(".slides").click(function(){
		var slideNum =	$(this).index()+1;
		console.log(slideNum);
		open_page("",slideNum);

	});

	$(".reference").removeClass("active");

	$('.reference').on('swipeleft swiperight', function(event) {
		event.stopPropagation();
	});

	$(".box_btn").bind("click",function(){
		$(".reference").toggleClass("active");
	});

	currentSlide();

		$("#main_content").swipe({
	   swipeLeft:function(event, direction, distance, duration, fingerCount) {
		//step 4:-
		console.log("swipeleft"+localStorage.getItem("currentslide"));
		localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
		//step 4 ends here

		//alert("swipeleft");
		//myconsole("swipeleft");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var last_page_id = $(".slides").length;
		var slide_jumper_open = $(".reference").hasClass("active");
		if(page_id == last_page_id+1)	{
			return
		} else{
			go_nav('f');
		}
	  },

	  swipeRight:function(event, direction, distance, duration, fingerCount) {
		//step 5:-
		console.log("swiperight"+localStorage.getItem("currentslide"));
		localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
		//step 5 ends here 

			//alert("swiperight");
		//myconsole("swiperight");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var slide_jumper_open = $(".reference").hasClass("active");

		if(page_id == 0){
			//console.log("First Slide");
			//myconsole("First Slide");
			return
		} else {
			go_nav('b');
		}

	  } ,

        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:0
	});


});


//step 6:-
function toCaptureTime(page_id){
	
	var currentSlideNo = page_id;

	var startTime = Date.now();


	var temp = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo);
	
	if(temp == null){
		
		if (currentSlideNo!=0){



			localStorage.setItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo ,startTime);

			//to capture start time of slide in db format
			var startTimeInDBFormat = currentTimeInDatabaseFormat();
			//alert(startTimeInDBFormat);




			localStorage.setItem(currentContentId+"_"+contentName+"_StartTime_"+currentSlideNo ,startTimeInDBFormat);
		}
}
else
{
var existingTime = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo);
var newTime = Date.now();
var newSlideTime = (newTime - existingTime);
var endTimeInDBFormat = currentTimeInDatabaseFormat();
var EndTimeNext = localStorage.getItem(currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo);
console.log("++++++++EndTimeNext++++++++"+EndTimeNext+"++++++currentContentId+++"+currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo);
if(EndTimeNext == null){
localStorage.setItem(currentContentId+"_"+contentName+"_totalTime_slideNo_"+currentSlideNo ,(newSlideTime/1000) );

localStorage.setItem(currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo ,endTimeInDBFormat);
}

if (typeof(localStorage.getItem('currentslide'))!='undefined' && localStorage.getItem('currentslide')!='' && localStorage.getItem('currentslide')>= currentSlideNo){


	var nextSlideNo = currentSlideNo;

}else{

	var nextSlideNo = currentSlideNo + 1 ;
	
 } 
	if(nextSlideNo <= 1){//number 3 is number of total slides present
	// alert(nextSlideNo);
	var tempNext = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+nextSlideNo);

		if(tempNext == null){
			
			if (nextSlideNo!=0)	{
				var nextSlideStartTime =  Date.now();
				localStorage.setItem(currentContentId+"_"+contentName+"_slideNo_"+nextSlideNo ,nextSlideStartTime);
				localStorage.setItem(currentContentId+"_"+contentName+"_totalTime_slideNo_"+nextSlideNo ,0);
				//to capture start time of next slide in db format
				var startTimeNextInDBFormat = currentTimeInDatabaseFormat();
				localStorage.setItem(currentContentId+"_"+contentName+"_StartTime_"+nextSlideNo ,startTimeNextInDBFormat);
			}
		}
	}
}


}
//step 6 ends here ..


function go_nav(direction) {

	
//custom slide changes continues here....
	
	if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' &&   localStorage.getItem("currentcustomslideflag") =='true'){

				var custcomslideid=parseInt(localStorage.getItem("currentcontentcustomslideId"));
			
				var page_id =  custcomslideid;
		}else{
			
				var page_id =  parseInt($("#wrapper").attr("rel"));
		}	
		
//custom slide changes ends here....

	//step 7:-
	//toCaptureTime(page_id);
	console.log("swipeleft"+localStorage.getItem("currentslide"));
	localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
	//step 7 ends here 
//localStorage.setItem(contentName+"_slideNo_"+currentSlideNo ,n);
var flag=0;
if(direction == 'b') {

//custom slide changes continues here....

		//alert("+++++bhitor reee +++++++"+custcomslideflag+"+++++++custcomslideid+++++++"+custcomslideid);
	if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' &&    localStorage.getItem("currentcustomslideflag") =='true'){
		flag==0
		localStorage.setItem("gotoNextPrevBrand" ,2);//if one than next if 2 than prev
		window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));


	}else{
	if(page_id == 1){
	localStorage.setItem("gotoNextPrevBrand" ,2);//if one than next if 2 than prev
	window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));


}else{
	localStorage.setItem("gotoNextPrevBrand" ,0);//if one than next if 2 than prev
}
}
	
//custom slide changes ends here....
}else {
	
//custom slide changes continues here....

	if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' && localStorage.getItem("currentcustomslideflag") =='true'){
		flag==0
		localStorage.setItem("gotoNextPrevBrand" ,1);//if one than next if 2 than prev

		window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
	}
	
//custom slide changes ends here....
else{
	if(page_id == 1){
	 localStorage.setItem("gotoNextPrevBrand" ,1);//if one than next if 2 than prev
	 window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
}else{



	localStorage.setItem("gotoNextPrevBrand" ,0);//if one than next if 2 than prev
}
	}
}

//step 8:

currentContentNSlide = currentContentId+"_"+contentName+"_"+page_id;
//step 8 ends here
localStorage.setItem("current",currentContentNSlide);
localStorage.setItem("currentslide",page_id);

$("#wrapper").attr("rel",page_id);

var content="";
if(flag==0){
var pg_content = set_pg_content(page_id);

	$("#main_content").html(pg_content);
}
	//console.log("pg : "+page_id);
	if(page_id==4){
		$(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
	 		open_page("",7)
	 	});
		$(".box5").click(function(event) {
	 		open_page("",8)
	 	});
		$(".box6").click(function(event) {
	 		open_page("",9)
	 	});
		$(".box7").click(function(event) {
	 		open_page("",10)
	 	});
		$(".box8").click(function(event) {
	 		open_page("",11)
	 	});
		
	}
	 checkClickThrough();
}

function set_pg_content(pg_id){
//alert("++++++++++set_pg_content++++++++++"+pg_id);
	//step 9:
	if (typeof(localStorage.getItem("previousslide"))!='undefined'){
		//to checked previous slide has god end time...
		var previousslideid=localStorage.getItem("previousslide");
		toCaptureTime(previousslideid);
		
	}
	toCaptureTime(pg_id);
	//step 9 ends here..
$(".reference").removeClass("active");
currentSlide();
var selectedContentPath='';
switch(pg_id){
	case 1:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="s1_bg"><img src="slide1/s1_bg.png" width="1024" height="768"/></div><div class="fullWrap"><div class="s1_1"><img src="slide1/s1_1.png"/></div><div class="s1_2"><img src="slide1/s1_2.png"/></div><div class="s1_3"><img src="slide1/s1_3.png"/></div><div class="s1_4"><img src="slide1/s1_4.png"/></div><div class="s1_5"><img src="slide1/s1_5.png"/></div><div class="s1_6"><img src="slide1/s1_6.png"/></div><div class="s1_7"><img src="slide1/s1_7.png"/></div><div class="s1_8"><img src="slide1/s1_8.png"/></div><div class="s1_9"><img src="slide1/s1_9.png"/></div><div class="s1_10"><img src="slide1/s1_10.png"/></div><div class="s1_11"><img src="slide1/s1_11.png"/></div><div class="s1_12"><img src="slide1/s1_12.png"/></div></div><div class="s1_13_click" onclick="dragOut()"></div><div class="s1_13_wrap"><div class="s1_13"><img src="slide1/s1_13.png"/></div></div><div class="s1_14_wrap s1_14_pulse"><div class="s1_14"><img src="slide1/s1_14.png"/></div></div><div class="s1_15"><img src="slide1/s1_15.png"/></div><div class="s1_16_wrap"><div class="s1_16"><img src="slide1/s1_16.png"/></div></div><div class="s1_17 fadeIn17"><img src="slide1/s1_17.png"/></div><div class="s1_pop1" onclick="s1_pop1()"></div><div class="s1_c1ose1" onclick="s1_close1()"></div><div class="stickWrap"><div class="s1_18"><img src="slide1/s1_18.png"/></div><div class="s1_19"><img src="slide1/s1_19.png"/></div><div class="s1_20"><img src="slide1/s1_20.png"/></div><div class="s1_21"><img src="slide1/s1_21.png"/></div><div class="s1_22"><img src="slide1/s1_22.png"/></div></div><div class="s1_23"><img src="slide1/s1_23.png"/></div><div class="s1_24_wrap"><div class="s1_24"><img src="slide1/s1_24.png"/></div></div><div class="s1_25_wrap"><div class="s1_25"><img src="slide1/s1_25.png"/></div></div><div class="s1_26"><img src="slide1/s1_26.gif"/></div><div class="s1_27"><img src="slide1/s1_27.png"/></div><div class="s1_28"><img src="slide1/s1_28.png"/></div><div class="s1_29"><img src="slide1/s1_29.png"/></div>';
	break;

}

return content;

}

function showDiv() {
   document.getElementById('welcomeDiv').style.display = "block";
}
function showDiv2() {
   document.getElementById('welcomeDiv2').style.display = "block";
}

function open_page(url,page_id){
	 // alert(page_id);
	//step 10:
	if (typeof(localStorage.getItem("currentslide"))!='undefined'){
		//to checked previous slide has god end time...
		var slideid=localStorage.getItem("currentslide");
		toCaptureTime(slideid);	
	}
	
	// toCaptureTime(page_id);
	 localStorage.setItem("currentslide",page_id);
	 currentContentNSlide = currentContentId+"_"+contentName+"_"+page_id;
	 localStorage.setItem("current",currentContentNSlide);
	//step 10 ends here

	 $("#wrapper").attr("rel",page_id);
	 var content="";
	 var pg_content = set_pg_content(page_id);

	 	$("#main_content").html(pg_content);

	 if(page_id==4){
		$(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
	 		open_page("",7)
	 	});
		$(".box5").click(function(event) {
	 		open_page("",8)
	 	});
		$(".box6").click(function(event) {
	 		open_page("",9)
	 	});
		$(".box7").click(function(event) {
	 		open_page("",10)
	 	});
		$(".box8").click(function(event) {
	 		open_page("",11)
	 	});
	 }
	  checkClickThrough();
	}

	function checkClickThrough(){
	var currentslide=localStorage.getItem("currentslide");
	//alert(currentslide);
	document.getElementById("click_through").innerHTML='';

	if(currentslide == 1){
	document.getElementById("click_through").innerHTML='';
		}
    if(currentslide == 2){
	document.getElementById("click_through").innerHTML='';
		}
	}

	function checkBtns(refNum){
		switch(refNum){
			case 1:
			open_page('',1);
            break;
		}
	}

	function currentSlide(){
		var curr_id =  parseInt($("#wrapper").attr("rel"));
		$(".slides").removeClass("active");
		$(".slides:nth-child("+curr_id+")").addClass("active");
	}

	var ln = 0;
	function myconsole(msg){

		var oldMsg = "</br>"+ln+". "+$("#myconsole").html();
		ln++
		$("#myconsole").html(msg+oldMsg);
	}

function currentTimeInDatabaseFormat(){//to get current time in dd-mm-yyyy hh:mm:ss
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
		month = parseInt(month)+1;
	if(month.toString().length==1){
		month="0"+month;
	}

	var date = new Date().getDate();
	if(date.toString().length==1){
		date="0"+date;
	}

	var hour = new Date().getHours();
	if(hour.toString().length==1){
		hour="0"+hour;
	}

	var minutes = new Date().getMinutes();
	if(minutes.toString().length==1){
		minutes="0"+minutes;
	}

	var seconds = new Date().getSeconds();
	if(seconds.toString().length==1){
		seconds="0"+seconds;
	}

	var duration= year+"-"+month+"-"+date+"-"+hour + ":" + minutes + ":" + seconds;
	return duration;
}

// new js

$(document).ready(function(){
	$('body').on('click','.touchbtn',function(){
		$('.right_arrow').trigger( "click" );
	})

	$(document).on('click','.btnshow',function(){
//alert('hi')
		$('.touchbtn').css("display","block");
	})
})


	setTimeout(function() {
		$('.s1_13_click').css("display","block");
	}, 30000);

function dragOut() {
	$(".s1_14_wrap").removeClass("s1_14_pulse");
	$(".s1_14_wrap").addClass("s1_14_drag_Out");
	$(".s1_17").removeClass("fadeIn17");
	$(".s1_17").addClass("fadeOut17");
	setTimeout(function() {
		$(".s1_13").addClass("s1_13_wrap_right");
		$(".s1_14").addClass("s1_14_wrap_right");
		$(".fullWrap").addClass("flyUp");
		$('.s1_15').css("display","block");
		$('.s1_26').css("display","block");
		$('.s1_27').css("display","block");
		$('.s1_28').css("display","block");
		$('.s1_29').css("display","block");
	}, 1000);
}