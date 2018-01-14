<?php include('header.php'); ?>
	<script src="/geo_solution/js/review.js"></script>
	<script>
		$(document).ready(function(){
			var type;
			$.post("/geo_solution/resource/review/view_type.php",{},function(data,status){
				type = data['type'];
			},"json");
			if (type == "student"){
					$("#all").empty();
				}
			else{	
					show_data("all");	
			}
			$("#body > tr:even").css("background-color", "gray");
			$("#select").click(function(){
				type = $("#select").val();
				show_data(type);
			});
			$('#review-modal').on('show.bs.modal', function (event) {
  			var button = $(event.relatedTarget) // Button that triggered the modal
  			var course_id = button.data('course') // Extract info from data-* attributes
				var modal = $(this)
				$.post("/geo_solution/resource/review/pre_review.php",{course : course_id},function(data,status){
					
				},"json");
			});
		});
	</script>
	<div class="modal fade" id="review-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						  <div class="modal-dialog" role="document">
						    <div class="modal-content">
						      <div class="modal-header">
						        <h5 class="modal-title" id="exampleModalLabel">Review</h5>
						        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true">&times;</span>
						        </button>
						      </div>
						      <div class="modal-body">
						        <div class="row">
						        	<div class="col-1"></div>
							      	<div class="col-3">
										<div class="square">
											<!--<img src="/geo_solution/image/team-member-3.jpg">-->
											<p class="nickname">พี่lalala</p>
										</div>
									</div>
									<div class="col-sm">
										<p>ชื่อ eieieieieieieieieie</p>
										<p>วิชา MTH111</p>
										<p>เรื่องที่สอน Block Diagram</p>
									</div>
								</div>
								<p>ใส่ดาวววววววววววววววววววว</p>
								<form>
									<div class="form-group">
										<label for="exampleFormControlTextarea1">เนื้อหา</label>
									    <textarea class="form-control" id="content_txt" rows="3"></textarea>
									</div>
									<div class="form-group">
										<label for="exampleFormControlTextarea1">ผู้สอน</label>
									    <textarea class="form-control" id="teacher_txt" rows="3"></textarea>
									</div>
									<div class="form-group">
										<label for="exampleFormControlTextarea1">อื่นๆ</label>
									    <textarea class="form-control" id="other_txt" rows="3"></textarea>
									</div>
								</form>
						      </div>
						      <div class="modal-footer">
						        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
						        <button type="submit" class="btn btn-primary">Submit</button>
						      </div>
						    </div>
						  </div>
						</div>
	<div class="container" id = "all">
		<div class="row">
			<div class="col">
				<h2>Review</h2>
				<div class="form-group">
					<select class="form-control col-2" style="float:left;" id="select">
					    <option value = "all">ทั้งหมด</option>
							<option value = "not_review">ยังไม่รีวิว</option>
					    <option value = "reviewed">รีวิวแล้ว</option>					    
					</select>
				</div>
				<br>
				<br>
				<table class="table table-striped table-bordered">
				  <thead>
				    <tr>
				      <th scope="col"><center>ลำดับ</center></th>
				      <th scope="col"><center>วิชา</center></th>
				      <th scope="col"><center>เรื่อง</center></th>
				      <th scope="col"><center>ผู้สอน</center></th>
				      <th scope="col"><center>รายละเอียด</center></th>
				      <th scope="col"><center>สถานะ </center></th>
				    </tr>
				  </thead>
					<tbody id = "body"></tbody>
				</table>
			</div>
		</div>
	</div>
  <?php require_once 'footer.php'; ?>