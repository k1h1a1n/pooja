$(document).ready(function() {	

	$(".MenuBtn").click(function (){
		$(this).toggleClass("MenuBtnActive");		
		$(".MenuLevel_1").removeClass("MenuLevel_1_Active");
		console.log('test')
		if($(".MenuBtn").hasClass("MenuBtnActive"))
		{
				$(".MenuContainer").addClass("MenuSlideActive");
		}
		else {
			$(".MenuContainer").removeClass("MenuSlideActive");
		}
	});
	
	
	//Main MenuLevel_1
	$(".MenuLevel_1").click(function () {
		$(".MenuBtn").addClass("MenuBtnActive");
		$(".MenuLevel_2").removeClass("MenuLevel_2_Active");
		$(".MenuLevel_1").not(this).removeClass("MenuLevel_1_Active");
		$(this).toggleClass("MenuLevel_1_Active");
		$(this).parents(".MenuContainer").addClass("MenuSlideActive");
	})
	
	//Main MenuLevel_2
	$(".MenuLevel_2").click(function () {
		$(".MenuLevel_2").not(this).removeClass("MenuLevel_2_Active");
		$(this).toggleClass("MenuLevel_2_Active");
	})
});