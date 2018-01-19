	$(document).ready(function(){
		getCourse("ทุกวัน","MTH102");
		$("#nav-MTH_102-tab").addClass('activeEi');	
		


	    $("button[id^='button']").click(function(){
	    	var subject = $(this).attr("id").substring(12,18);
	    	//console.log(subject);
	    	var day = $( "#Select" + subject).val();

	    	if (!day.localeCompare("เลือกวัน")) {
	    		day = "ทุกวัน";
	    	}

	  		$("#headCHM103").html(day);
	  		
	  		getCourse(day,subject);
	    });	

	    $("#nav-MTH_102-tab").click(function(){
	    	$("#nav-MTH_102-tab").addClass('activeEi');
	    	$("#nav-MTH_112-tab").removeClass('activeEi');
	    	$("#nav-PHY_102-tab").removeClass('activeEi');
	    	$("#nav-PHY_104-tab").removeClass('activeEi');
	    	$("#nav-CHM_103-tab").removeClass('activeEi');
	    	getCourse('ทุกวัน',"MTH102");
	    	//console.log($("#nav-MTH_102-tab").hasClass('activeEi'));
	    });

	    $("#nav-MTH_112-tab").click(function(){
	    	$("#nav-MTH_102-tab").removeClass('activeEi');
	    	$("#nav-MTH_112-tab").addClass('activeEi');
	    	$("#nav-PHY_102-tab").removeClass('activeEi');
	    	$("#nav-PHY_104-tab").removeClass('activeEi');
	    	$("#nav-CHM_103-tab").removeClass('activeEi');
	    	getCourse('ทุกวัน',"MTH112");
	    });

	    $("#nav-PHY_102-tab").click(function(){
	    	$("#nav-MTH_102-tab").removeClass('activeEi');
	    	$("#nav-MTH_112-tab").removeClass('activeEi');
	    	$("#nav-PHY_102-tab").addClass('activeEi');
	    	$("#nav-PHY_104-tab").removeClass('activeEi');
	    	$("#nav-CHM_103-tab").removeClass('activeEi');
	    	getCourse('ทุกวัน',"PHY102");
	    });

	    $("#nav-PHY_104-tab").click(function(){
	    	$("#nav-MTH_102-tab").removeClass('activeEi');
	    	$("#nav-MTH_112-tab").removeClass('activeEi');
	    	$("#nav-PHY_102-tab").removeClass('activeEi');
	    	$("#nav-PHY_104-tab").addClass('activeEi');
	    	$("#nav-CHM_103-tab").removeClass('activeEi');
	    	getCourse('ทุกวัน',"PHY104");
	    });

	    $("#nav-CHM_103-tab").click(function(){
	    	$("#nav-MTH_102-tab").removeClass('activeEi');
	    	$("#nav-MTH_112-tab").removeClass('activeEi');
	    	$("#nav-PHY_102-tab").removeClass('activeEi');
	    	$("#nav-PHY_104-tab").removeClass('activeEi');
	    	$("#nav-CHM_103-tab").addClass('activeEi');	    	
	    	getCourse('ทุกวัน',"CHM103");
	    });


	 //    $("#bookingModal").on('hidden.bs.modal', function () {
		//     //getCourseMTH102(dayValue);
		//     console.log("eiei");
		// });

	});

	function getStar(star){
		//var starString = '<p class="card-text">';
		var starString = '';
		if(star==""){
			star = 5.0;
		}
		var starString = '';
		for (var st = 0.0; st < 5.0; st++) {
			if (star>=(st+0.5)) {
				if(star>=(st+1.0)){
					starString = starString+'<span id="star'+(st+1)+'" class="fa fa-star"></span>';
				}
				else{
					starString = starString+'<span id="star'+(st+1)+'" class="fa fa-star-half-full"></span>';
				}
			}
			else{
				starString = starString+'<span id="star'+(st+1)+'" class="fa fa-star-o"></span>';
			}
		}	
		starString = starString+'<br><br>';
		//starString = starString+'</p>';
		return starString;
	}

	function getCourse(day,subject){
		var obj = {};
		obj['day'] = day;
		obj['subject'] = subject;
		$.ajax({
			url: 'resource/home/showCourse.php',
			type: 'post',
			data: obj,
			dataType: 'json',
			success: function(data){
				var stringForPrintHtml = '';
				var showDate=0;
				if(day!='ทุกวัน'){

					// Check date and empty of data
					var array = [];
					for (var checkdate = 0; checkdate<data.length; checkdate++){
						if (day==data[checkdate].day) {
							showDate = checkdate;
						};
						if (data[checkdate][subject].length!=0) {
							array.push(checkdate);
						};
					};

					// Check if data is empty
					if(array.length==0){
						$("#nocourse"+subject).html('<div class="card text-white bg-dark mb-3" style="max-width: 18rem;"><div class="card-header">ไม่มีคอร์สเรียน</div></div><br>');
						$("#content"+subject).empty();
					}
					else{

						$("#nocourse"+subject).empty();
						$("#content"+subject).empty().append('<div class="card text-white mb-3 day-card"><div class="card-header">'+data[showDate]["day"]+' '+data[showDate]["date"]+'</div></div><div class="col-12" id="courselist"></div>'); 
						$("#content"+subject).append('<div class="col-12" id="courselist'+subject+data[showDate]["day"]+'"></div>');
						reloadJS();

						var response = data[showDate];
						console.log(response[subject].length);
						for(var i=0; i<response[subject].length; i++){
							//console.log(response[subject]["star"]);
							stringForPrintHtml ='';
							stringForPrintHtml = stringForPrintHtml.concat('<div class="row"><div class="col-1"></div><div class="card-group"><center><div class="card text-white bg-dark card-name"><img class="card-img-top" src="/geo_solution/image/', response[subject][i]["img"]);
							stringForPrintHtml = stringForPrintHtml.concat('" alt="Card image cap"><div class="card-body"><h5 class="card-title">', response[subject][i]["title"], response[subject][i]["firstname"], '  ', response[subject][i]["lastname"], '<br>(พี่', response[subject][i]["nickname"], ')</h5>', getStar(response[subject][i]["star"]));
							stringForPrintHtml = stringForPrintHtml.concat('<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#reviewModal" onclick="showReview(', response[subject][i]["teacher_id"], ')">review</button></div></div></center><div class="card text-white bg-dark card-course"><div class="card-body"><h5 class="card-title">คอร์สที่ทำการสอน</h5><p class="card-text">');
							for(var j=0; j<response[subject][i]["course"].length; j++){
								stringForPrintHtml = stringForPrintHtml.concat('<div class="row"><div class="col-md-4 col-xs-6 class-name"><span>', response[subject][i]["course"][j]["topic"], '</span></div><div class="col-md-4 col-xs-6 text-md-center room"><span>ห้อง' , response[subject][i]["course"][j]["room"], '</span></div><div class="col-md-4 col-xs-4 button-time"><center><button type="button" class="btn btn-primary time-reseved" data-toggle="modal" data-target="#bookingModal" id="booking', response[subject][i]["course"][j]["course_id"], '" onclick="updateSeat(', response[subject][i]["course"][j]["course_id"], ')"><span>', response[subject][i]["course"][j]["time"], '</span></button></center></div></div>');
							}
							stringForPrintHtml = stringForPrintHtml+'<hr class="course-line"></p></div><div class="card-footer"><p>ติดต่อ</p><p><img class="contract" src="./image/facebook.png">'+response[subject][i]["facebook"]+'</p><p><img class="contract" src="./image/line.png">'+response[subject][i]["line"]+'</p></div></div></div></div><br>';
							//stringForPrintHtml = stringForPrintHtml+'<hr class="course-line"></p></div><div class="card-footer"><p>ติดต่อ</p><p><img class="contract" src="./image/facebook.png"></p><p><img class="contract" src="./image/line.png"></p></div></div></div></div><br>'
							$("#courselist"+subject+response["day"]).append(stringForPrintHtml);
						}
					}

				}
				else{

					// Check date and empty of data
					var array = [];
					for (var checkdate = 0; checkdate<data.length; checkdate++){
						if (data[checkdate][subject].length!=0) {
							array.push(checkdate);
						};
					};

					// Check if data is empty
					if(array.length==0){
						$("#nocourse"+subject).html('<div class="card text-white bg-dark mb-3" style="max-width: 18rem;"><div class="card-header">ไม่มีคอร์สเรียน</div></div><br>');
						$("#content"+subject).empty();
					}
					else{
						$("#nocourse"+subject).empty();
						$("#content"+subject).empty();

						for (showDate = 0; showDate < data.length; showDate++) {
							if(data[showDate][subject].length!=0){
								$("#content"+subject).append('<div class="card text-white mb-3 day-card"><div class="card-header">'+data[showDate]["day"]+' '+data[showDate]["date"]+'</div></div><div class="col-12" id="courselist"></div>'); 	
								$("#content"+subject).append('<div class="col-12" id="courselist'+subject+data[showDate]["day"]+'"></div>');
							}
							console.log(data[showDate][subject].length);
							reloadJS();

							//console.log("#content"+subject);
							var response = data[showDate];
							for(var i=0; i< response[subject].length; i++){
								console.log('i='+i);
								console.log('subject='+subject);
								console.log('day='+response["day"]);
								console.log('response[subject].length='+response[subject].length);
								stringForPrintHtml ='';
								stringForPrintHtml = stringForPrintHtml.concat('<div class="row"><div class="col-1"></div><div class="card-group"><center><div class="card text-white bg-dark card-name"><img class="card-img-top" src="/geo_solution/image/', response[subject][i]["img"]);
								stringForPrintHtml = stringForPrintHtml.concat('" alt="Card image cap"><div class="card-body"><h5 class="card-title">', response[subject][i]["title"], response[subject][i]["firstname"], '  ', response[subject][i]["lastname"], '<br>(พี่', response[subject][i]["nickname"], ')</h5>', getStar(response[subject][i]["star"]));
								stringForPrintHtml = stringForPrintHtml.concat('<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#reviewModal" onclick="showReview(',  response[subject][i]["teacher_id"] , ')">review</button></div></div></center><div class="card text-white bg-dark card-course"><div class="card-body"><h5 class="card-title">คอร์สที่ทำการสอน</h5><p class="card-text">');
								for(var j=0; j<response[subject][i]["course"].length; j++){
									stringForPrintHtml = stringForPrintHtml.concat('<div class="row"><div class="col-md-4 col-xs-6 class-name"><span>', response[subject][i]["course"][j]["topic"], '</span></div><div class="col-md-4 col-xs-6 text-md-center room"><span>ห้อง', response[subject][i]["course"][j]["room"], '</span></div><div class="col-md-4 col-xs-4 button-time"><center><button type="button" class="btn btn-primary time-reseved" data-toggle="modal" data-target="#bookingModal" id="booking', response[subject][i]["course"][j]["course_id"], '" onclick="updateSeat(', response[subject][i]["course"][j]["course_id"], ')"><span>', response[subject][i]["course"][j]["time"], '</span></button></center></div></div>');
								}
								stringForPrintHtml = stringForPrintHtml+'<hr class="course-line"></p></div><div class="card-footer"><p>ติดต่อ</p><p><img class="contract" src="./image/facebook.png">'+response[subject][i]["facebook"]+'</p><p><img class="contract" src="./image/line.png">'+response[subject][i]["line"]+'</p></div></div></div></div><br>';
								//stringForPrintHtml = stringForPrintHtml+'<hr class="course-line"></p></div><div class="card-footer"><p>ติดต่อ</p><p><img class="contract" src="./image/facebook.png"></p><p><img class="contract" src="./image/line.png"></p></div></div></div></div><br>'
								$("#courselist"+subject+response["day"]).append(stringForPrintHtml);
							}
						}	
					}
				}
				reloadJS();
				$.post("/geo_solution/resource/review/view_type.php",{},function(data,status){
				  	var type = data['type'];
				  	if (type == "guest" ){
				    	$("button[id^='booking']").attr('disabled', 'disabled');
				   		console.log($("button[id^='booking']"));
				  	}
				  	else{	
				    
				  	}
				},"json");
			},
			error: function(data){
				$("#nocourse"+subject).empty();
				$("#content"+subject).empty()
			}
		});
	}

	function updateSeat(id){
		var obj ={};
		obj['course_id'] = id;
		$.ajax({
			url: 'resource/home/left_seat.php',
			type: 'post',
			data: obj,
			dataType: 'text',
			success: function(data){
				$("#bookingModalBody").html("จำนวนที่นั่งคงเหลือ "+data+" ที่นั่ง");
				$("#content_txt").val("");
				console.log($("#content_txt").val());
				$("#bookButton").attr({
					onclick : "sendBooking("+id+")",
				})
				console.log($("#bookButton").attr("onclick"));
			}
		});
	};

	function sendBooking(id){
		console.log(id);
		var obj ={};
		obj['course_id'] = id;
		reloadJS();
		obj['comment'] = $("#content_txt").val();
		console.log($("#content_txt").val());
	
		$.ajax({
			url: 'resource/home/book_course.php',
			type: 'post',
			data: obj,
			dataType: 'text',
			beforeSend: function(){
				$("#bookingModal").modal('hide').fadeOut(100);
				$('.modal-backdrop').remove();
				$("#modalStatus").modal('show');		
				// $('#modalStatus').show().on('shown', function() { 
				//     $('#modalStatus').modal('hide') 
				// });
			},
			success: function(data){
				//$('.modal-backdrop').remove();
				$("#modalStatusBody").html(data);
				//$("#modalStatus").modal('hide').fadeIn(2000);
				if ($("#nav-MTH_102-tab").hasClass('activeEi')) {
			    	var dayValue = $( "#SelectMTH102" ).val();
			    	if (!dayValue.localeCompare("เลือกวัน")) {
			    		dayValue = "ทุกวัน";
			    	};
					getCourse(dayValue,"MTH102");
				}
				else if($("#nav-MTH_112-tab").hasClass('activeEi')) {
			    	var dayValue = $( "#SelectMTH112" ).val();
			    	if (!dayValue.localeCompare("เลือกวัน")) {
			    		dayValue = "ทุกวัน";
			    	};
					getCourse(dayValue,"MTH112");
				}
				else if($("#nav-PHY_102-tab").hasClass('activeEi')) {
			    	var dayValue = $( "#SelectPHY102" ).val();
			    	if (!dayValue.localeCompare("เลือกวัน")) {
			    		dayValue = "ทุกวัน";
			    	};
					getCourse(dayValue,"PHY102");
				}
				else if($("#nav-PHY_104-tab").hasClass('activeEi')) {
			    	var dayValue = $( "#SelectPHY104" ).val();
			    	if (!dayValue.localeCompare("เลือกวัน")) {
			    		dayValue = "ทุกวัน";
			    	};
					getCourse(dayValue,"PHY104");
				}
				else if($("#nav-CHM_103-tab").hasClass('activeEi')) {
					var dayValue = $( "#SelectCHM103" ).val();
			    	if (!dayValue.localeCompare("เลือกวัน")) {
			    		dayValue = "ทุกวัน";
			    	};			
					getCourse(dayValue,"CHM103");
				}	

				//console.log("eiei");										
			},
			error: function(){		
				$("#modalStatusBody").html("ข้อผิดพลาด");
			}
		});
	};

	function showReview(id){
		var obj ={};
		obj['teacher_id'] = id;
		console.log(id);
		$.ajax({
			url: 'resource/home/show_review.php',
			type: 'post',
			data: obj,
			dataType: 'json',
			success: function(data){

				var stringHtml='';
				if(data.length!=0){
					for (var i = 0; i < data.length; i++) {
						//console.log(data[i].star);
						stringHtml = stringHtml+'<div class="col-12 review-text" "><p>'+data[i].review_txt+'</p></div><center><div class="review-name"><div class="col-md-3 col-xs-6">คะแนนพี่TA</div>'+getStar(data[i].star)+'<div class="col-md-5 col-xs-5 date-time"><p>'+data[i].time_stamp+' น.</p></div></div></center>';
					}
					$("#reviewModalText").empty().append(stringHtml);
				}
				else{
					$("#reviewModalText").empty().append('ไม่มีข้อมูลการรีวิว');
				}
			}
		});
	};	

	function reloadJS(){
		//$("#atcd").empty();
		$("#js0").attr({
			scr : "",
			type : ""
			}).appendTo("#atcd");
		//console.log($("#atcd").html());
		$("#js0").attr({
			scr : "js/indexJ.js",
			type : "text/javascript"
			}).appendTo("#atcd");
		//console.log($("#atcd").html());
	}