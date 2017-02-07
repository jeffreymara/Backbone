$('.times_two').submit(function(e){
				e.preventDefault();
				var number = $(this).find('input[type="text"]').val();
				if(!number){
						$(this).find(".alert-warning").show();
				}
				else{	
						$(this).find(".alert-warning").hide();
						console.log("post initiated for "+number+".")
						console.log($(this).serialize())
						 $.post("/post-times-two/", {number:number}, function(data) {
							alert(data);
						});
				}
			});