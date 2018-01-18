<?php include('header.php'); ?>
    <script>
    var type;
    $.post("/geo_solution/resource/review/view_type.php",{},function(data,status){
          type = data['type'];
          if (type != "teacher"){
					  window.location.replace("/geo_solution/index.php");
				  }
			    },"json");
      $(document).ready(function(){   
          $("#table,#send").hide();
          $("#search").click(function(){
          $("#body").empty();
          var data_array = {};
          var id = $( "form" ).serialize();
          var subject = $("#search_subject").val();
          if (id == ""){
            alert("Please select ID");
          }
          else if (subject == ""){
            alert("Please select subject");
          }
          else{
            data_array['id'] = id;
            data_array['subject'] = subject;
            $.post("info/list_course.php",data_array,function(data,status){
              var attributes = [];
              var length = attributes.length;
              if (jQuery.isEmptyObject(data)){
                alert("This is not time to checking attendance or Everyone has been checked")
              } 
              else{
                for (var i = 0; data[i];i++){
                  for (var j = 0; j < length ; j++){
                    var k = attributes[j];
                    $("<td></td>").text(data[i][k]).appendTo("#body");
                  }
                  $('<td><input type="checkbox" name="student_id[]" value="' + data[i]['student_id'] +'"></td>').appendTo("#body");
                  $("#body > td").wrapAll("<tr></tr>");
                }
                $("#course").val(data[0]['course_id']);
                $("#table,#send").slideDown();
              } 
            },"json");        
          }
        });
      });
    </script>
      <h1><font color="#ff7454">Student Info</font></h1>
        <div id="all" class="form-row align-items-center">
          <div class="col-auto my-1">
            <label class="mr-sm-2" for="inlineFormCustomSelect">Teacher Assistant ID</label>
              <form>
              <input type="text" name="student_id">
              </form>
          </div>
          <div class="col-auto my-1">
            <label class="mr-sm-2" for="inlineFormCustomSelect">Course</label>
            <select class="custom-select mr-sm-2" id = "search_subject">
              <option value="" selected>Choose...</option>
              <option value="MTH">MTH102</option>
              <option value="MTH">MTH112</option>
              <option value="PHY">PHY102</option>
              <option value="PHY">PHY104</option>
              <option value="CHM">CHM103</option>
            </select>
          </div>
          <button id = "search" type="submit" class="btn btn-primary search" style ="background-color : #ff7454; border-color : #ff7454; margin-top: 30px; "> SEARCH </button>
        </div>
        <br>
      <form action="attendance/submit.php" method="post" id = "submit_form">
        <div class="form-row align-items-center" id = "table" >
          <table class="table table-striped">
            <thead>
              <tr>  
                <th scope="col">วิชา</th>
                <th scope="col">เรื่อง</th>
                <th scope="col">วันที่สอน</th>
                <th scope="col">เวลา</th>
                <th scope="col">สถานที่</th>
                <th scope="col">จำนวนนักเรียนที่เข้าร่วม</th>
              </tr>
            </thead>
            <tbody id = "body">
            </tbody>
          </table>
        </div>
        <input type="hidden" name="course_id" id = "course">
        <center><button id ="send" type="submit" class="btn btn-primary " style ="background-color : #ff7454; border-color : #ff7454;"> SAVE </button></center>
      </form>
      <br>
 <?php include('footer.php'); ?>