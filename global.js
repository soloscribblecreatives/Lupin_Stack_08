/*Code by android developers start here*/

var startLoc = null;
//var contentName = '152';
//step 1:-
var contentName = parseInt(localStorage.getItem("currentbrand"));
var currentContentId  = parseInt(localStorage.getItem('currentcontent'));
//ends
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

function go_nav(direction) {
var page_id =  parseInt($("#wrapper").attr("rel"));
			
		
var flag=0;
if(direction == 'b') {


	if(page_id >= 0){
		page_id = page_id - 1;
		//alert(page_id);
		//console.log(page_id);
		if(page_id == 0){
            flag=2;
        }
	}
	 if(flag == 2){
        localStorage.setItem("gotoNextPrevBrand" ,2);//if one than next if 2 than prev
        //flag == 0;
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
	
		//window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }else{
        localStorage.setItem("gotoNextPrevBrand" ,0);
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
	}
	
}else {
	

	if(page_id <= 11){
		page_id = page_id + 1;
		//alert(page_id);
		if(page_id == 12){
            flag=1;
        }
	}
	    if(flag == 1){
        localStorage.setItem("gotoNextPrevBrand" ,1);//if one than next if 2 than prev
         flag == 0;
		 var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };


	window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
		 //window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }else{
        localStorage.setItem("gotoNextPrevBrand" ,0);
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
  
    }


}



$("#wrapper").attr("rel",page_id);

var content="";
if(flag==0){
var pg_content = set_pg_content(page_id);

	$("#main_content").html(pg_content);
}
	//console.log("pg : "+page_id);
	if(page_id==4){
		/* $(".box2").click(function(event) {
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
	 	}); */
		
	}
	 checkClickThrough();
}

function set_pg_content(pg_id){
//step 6:-
//console.log("++++++++pg_id++++"+pg_id+"+++++++currentslide++++++"+localStorage.getItem("currentslide")+"++++++previousslide++++++"+localStorage.getItem("previousslide"));
		
$(".reference").removeClass("active");
currentSlide();
var selectedContentPath='';
switch(pg_id){
	case 1:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="s1_1"><img src="slide1/s1_1.png"/></div><div class="s1_2"><img src="slide1/s1_2.png"/></div><div class="s1_3"><img src="slide1/s1_3.png"/></div>';
	break;
	case 2:
	content='<link rel="stylesheet" type="text/css" href="slide2/slide2.css" media="screen"/><div class="s2_1"><img src="slide2/s2_1.png"/></div><div class="s2_2"><img src="slide2/s2_2.png"/></div><div class="s2_3"><img src="slide2/s2_3.png"/></div><div class="s2_4"><img src="slide2/s2_4.png"/></div><div class="s2_5"><img src="slide2/s2_5.png"/></div>';
	break;
	case 3:
	content='<link rel="stylesheet" type="text/css" href="slide3/slide3.css" media="screen"/><div class="s3_1"><img src="slide3/s3_1.png" width="1024" height="768" alt=""></div><div class="s3_2_wrap"><div class="s3_2"><img src="slide3/s3_2.gif"/></div></div>';
	break;
	case 4:
	content='<link rel="stylesheet" type="text/css" href="slide4/slide4.css" media="screen"/><div class="s4_1"><img src="slide4/s4_1.png" width="1024" height="768" alt=""></div><div class="s4_2"><img src="slide4/s4_2.png"/></div><div class="s4_3"><img src="slide4/s4_3.gif"/></div>';
	break;
	case 5:
	content='<link rel="stylesheet" type="text/css" href="slide5/slide5.css" media="screen"/><div class="s5_1"><img src="slide5/s5_1.png" width="1024" height="768" alt=""></div><div class="s5_2"><img src="slide5/s5_2.png"/></div><div class="s5_3"><img src="slide5/s5_3.png"/></div><div class="s5_4"><img src="slide5/s5_4.png"/></div>';
	break;
	case 6:
	content='<link rel="stylesheet" type="text/css" href="slide6/slide6.css" media="screen"/><div class="s6_1"><img src="slide6/s6_1.png" width="1024" height="768" alt=""></div><div class="s6_2"><img src="slide6/s6_2.png"/></div><div class="s6_3"><img src="slide6/s6_3.png"/></div><div class="s6_4"><img src="slide6/s6_4.png"/></div>';
	break;
	case 7:
	content='<link rel="stylesheet" type="text/css" href="slide7/slide7.css" media="screen"/><div class="s7_1"><img src="slide7/s7_1.png" width="1024" height="768" alt=""></div><div class="s7_2"><img src="slide7/s7_2.png"/></div><div class="s7_3"><img src="slide7/s7_3.png"/></div><div class="s7_4"><img src="slide7/s7_4.png"/></div>';
	break;
	case 8:
	content='<link rel="stylesheet" type="text/css" href="slide8/slide8.css" media="screen"/><div class="s8_1"><img src="slide8/s8_1.png" width="1024" height="768" alt=""></div><div class="s8_2"><img src="slide8/s8_2.png"/></div><div class="s8_3"><img src="slide8/s8_3.png"/></div><div class="s8_4"><img src="slide8/s8_4.png"/></div><div class="s8_5"><img src="slide8/s8_5.png"/></div>';
	break;
	case 9:
	content='<link rel="stylesheet" type="text/css" href="slide9/slide9.css" media="screen"/><div class="s9_1"><img src="slide9/s9_1.png" width="1024" height="768" alt=""></div><div class="s9_2"><img src="slide9/s9_2.png"/></div><div class="s9_3"><img src="slide9/s9_3.png"/></div><div class="s9_4"><img src="slide9/s9_4.png"/></div><div class="s9_5"><img src="slide9/s9_5.png"/></div>';
	break;
	case 10:
	content='<link rel="stylesheet" type="text/css" href="slide10/slide10.css" media="screen"/><div class="s10_1"><img src="slide10/s10_1.png" width="1024" height="768" alt=""/></div><div class="s10_2"><img src="slide10/s10_2.png"/></div><div class="s10_3"><img src="slide10/s10_3.png"/></div><div class="s10_4"><img src="slide10/s10_4.png"/></div><div class="s10_5"><img src="slide10/s10_5.png"/></div><div class="s10_6"><img src="slide10/s10_6.png"/></div>';
	break;
	case 11:
	content='<link rel="stylesheet" type="text/css" href="slide11/slide11.css" media="screen"/><div class="s11_1"><img src="slide11/s11_1.png" width="1024" height="768" alt=""></div><div class="s11_2"><img src="slide11/s11_2.png"/></div><div class="s11_3"><img src="slide11/s11_3.gif"/></div><div class="s11_4"><img src="slide11/s11_4.png"/></div>';
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
	 //alert("===openpage====");
	localStorage.getItem('currentbrand');
    localStorage.getItem('currentcontent');
    localStorage.getItem('currentcontentbrandId');
    localStorage.getItem('current');
	localStorage.setItem("gotoNextPrevBrand" ,0);
	//alert("====currentbrand======"+localStorage.getItem('currentbrand'));
	//alert("====currentcontent======"+localStorage.getItem('currentcontent'));
	//alert("====currentcontentbrandId======"+localStorage.getItem('currentcontentbrandId'));
	//alert("====current======"+localStorage.getItem('current'));
	//alert("====previousslide======"+localStorage.getItem("previousslide"));
	//alert("====page_id======"+page_id);
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
	
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

$(document).ready(function(){
	$('body').on('click','.touchbtn',function(){
		$('.right_arrow').trigger( "click" );
	})

	$(document).on('click','.btnshow',function(){
//alert('hi')
		$('.touchbtn').css("display","block");
	})
})

//----------------------------------//

function pop_open() {
	$('.popup').css('display','block');
	$('.pop_open').css('display','none');
	$('.pop_close').css('display','block');
}

function pop_close() {
	$('.popup').css('display','none');
	$('.pop_open').css('display','block');
	$('.pop_close').css('display','none');
}

function s10_pop1() {
	$('.s10_8').css("display","block");
	$('.s10_c1ose1').css("display","block");
	$('.s10_pop1').css("display","none");
}

function s10_close1() {
	$('.s10_8').css("display","none");
	$('.s10_c1ose1').css("display","none");
	$('.s10_pop1').css("display","block");
}