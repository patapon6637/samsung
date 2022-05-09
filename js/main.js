/* main.js */

$(document).ready(function(){

	/* 주메뉴 */
	// a에 마우스 올려놓으면 height값 늘어나야 되고 하위 div은 diplay block으로 바꿔줘야하고
	// header_wrap 은 에니메이트로 한다
	$("nav > ul > li > a").bind("mouseover focus",function(){
		var ht = $(this).next().height(); //div의 높이값 가져오기

		$(".header_wrap").stop().animate({"height":70+ht},500,"linear" );
		
		$("nav > ul > li > div").css("display","none");
		$(this).next().css("display","block");
	});

	$("nav").bind("mouseleave blur",function(){
		$(".header_wrap").stop().animate({"height":"70px"},300,"linear" );
		$("nav > ul > li > div").css("display","none");
	});

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/* 검색버튼 */
	$(".btn_srch > a").click(function(){
		$(".srch_wrap").css("display","block");
	});
	$("a.btn_srch_close").click(function(){
		$(".srch_wrap").css("display","none");
	});

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/* 오토배너 */
	var $bnnNum = 0;
	var $lastNum = $(".slide_wrap > li").size() - 1;
	
	//next 버튼
	$(".btn_next").click(function(){
		$bnnNum++;
		if($bnnNum > $lastNum) $bnnNum = 0;
		
		$(".slide").removeClass("active");
		$(".slide").eq($bnnNum).addClass("active");

		$(".slide_roll > ul > li").removeClass("on");
		$(".slide_roll > ul > li").eq($bnnNum).addClass("on");
	});
	//prev 버튼
	$(".btn_prev").click(function(){
		$bnnNum--;
		if($bnnNum < 0) $bnnNum = $lastNum;
		$(".slide").removeClass("active");
		$(".slide").eq($bnnNum).addClass("active");

		$(".slide_roll > ul > li").removeClass("on");
		$(".slide_roll > ul > li").eq($bnnNum).addClass("on");
	});
	
	// 오토배너
	function autoBanner(){
		$bnnNum++;
		if($bnnNum > $lastNum) $bnnNum = 0;

		$(".slide").removeClass("active");
		$(".slide").eq($bnnNum).addClass("active");

		$(".slide_roll > ul > li").removeClass("on");
		$(".slide_roll > ul > li").eq($bnnNum).addClass("on");
	};

	var $autoBnn = setInterval(autoBanner,5000);
	
	//배너 재생 멈춤
	var flag = true;
	$("a.btn_play").click(function(){
		if(flag){
			clearInterval($autoBnn);
			$(this).addClass("on");
			flag = false;
		}else{
			$autoBnn = setInterval(autoBanner,5000);
			$(this).removeClass("on");
			flag = true;
		}
	});

	// 롤링버튼
	$(".slide_roll li a").click(function(){
		var rollNum = $(this).parent().index();

		$(".slide").removeClass("active");
		$(".slide").eq(rollNum).addClass("active");

		$(".slide_roll > ul > li").removeClass("on");
		$(".slide_roll > ul > li").eq(rollNum).addClass("on");
	});

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/* top버튼 */
	$(window).scroll(function(){
		var $scroll = $(window).scrollTop();
		console.log($scroll);

		if($scroll < 130){
			$(".btn_top").removeClass("on ab");
		}

		if($scroll >= 130 && $scroll < 2800){
			$(".btn_top").removeClass("ab");
			$(".btn_top").addClass("on");
		}
		
		if($scroll >= 2800){
			$(".btn_top").addClass("ab");
		}
	});

	$(".btn_top").bind("click focus",function(){
		$("html,body").stop().animate({"scrollTop":0},1400,"swing");
	});
});