/* main2.js */

window.onload = function(){
	/* 주메뉴 */

	//var gnb = document.getElementById("gnb");
	//var li = gnb.children;

	//for(var i=0; i<li.length; i++){
	//	li.children[i].onmouseover = li.children[i].onfocus = function(){

	//	}
	//}

	/*
		querySelectorAll은 재료 몽땅 다 가져오는거고
		querySelector는 필요한 재료 하나만 가져오는것
	*/
	var gnbMenu = document.querySelectorAll('.gnb>ul>li'); // gnb > ul > li들을 전부 다 가져오기
	var headerWrap = document.querySelector(".header_wrap");
	console.log(gnbMenu);

	for(var i=0; i<gnbMenu.length; i++ ){
		gnbMenu[i].addEventListener('mouseover',function(){ // addEventListener를 이용하며 li하나하나당 mouseover이벤트를 적용해라
			this.className += 'on'; // 기존에 있는것에 더해서 넣어주기
			var ht = this.children[1].offsetHeight; // 여기선 div가 children[1]이 index[1]이므로 offsetHeight가 div의 높이가져오는것
			headerWrap.style.height = 70 + ht + 'px';
		});

		gnbMenu[i].addEventListener('mouseout',function(){ // 마우스를 떼면
			this.classList.remove('on'); // 클래스 리스트 들에서 on을 지워주겠다.
			headerWrap.style.height = '70px';
		});
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var srchBtn = document.querySelector('.btn_srch');
	var srchCloseBtn = document.querySelector('.btn_srch_close');
	var srchWrap = document.querySelector('.srch_wrap');

	srchBtn.addEventListener("click", function(){
		srchWrap.className += ' on';
	});

	srchCloseBtn.addEventListener("click", function(){
		srchWrap.classList.remove('on');
	});

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/* 오토배너 */
	var btnNext = document.querySelector('.btn_next');
	var btnPrev = document.querySelector('.btn_prev');
	var slide = document.querySelectorAll(".slide");
	var slideRoll = document.querySelectorAll('.slide_roll li');
	var btnPlay = document.querySelector('.btn_play');

	var bnnNum = 0;
	var lastNum = document.querySelectorAll('.slide_wrap > li').length - 1 ;

	//next 버튼
	btnNext.addEventListener('click', function(){
		bnnNum++
		if(bnnNum > lastNum){ bnnNum = 0; }

		slide.forEach(function (item) {//매개변수의 slide가 하나씩하나씩 들어가게 된다. 
			item.classList.remove('active');
		});
		slide[bnnNum].classList.add('active'); //addClass

		slideRoll.forEach(function(idx){ //forEach문을 사용하여 매개변수가 하나씩 들어가게 된다. 
			idx.classList.remove('on');
		});
		slideRoll[bnnNum].classList.add('on');
	});

	//prev 버튼
	btnPrev.addEventListener('click', function(){
		bnnNum--;
		if(bnnNum < 0 ){ bnnNum = lastNum; }

		slide.forEach(function(item){ //매개변수의 slide가 하나씩하나씩 들어가게 된다. 
			item.classList.remove('active');
		});
		slide[bnnNum].classList.add('active'); //addClass

		slideRoll.forEach(function(idx){ //forEach문을 사용하여 매개변수가 하나씩 들어가게 된다. 
			idx.classList.remove('on');
		});
		slideRoll[bnnNum].classList.add('on');
	});

	// 오토배너 
	function autoBanner(){
		//next버튼 눌렀을 때랑 같다. 
		bnnNum++
		if(bnnNum > lastNum){ bnnNum = 0; }

		slide.forEach(function (item) { //매개변수의 slide가 하나씩하나씩 들어가게 된다. 
			item.classList.remove('active');
		});
		slide[bnnNum].classList.add('active'); //addClass

		slideRoll.forEach(function(idx){ //forEach문을 사용하여 매개변수가 하나씩 들어가게 된다. 
			idx.classList.remove('on');
		});
		slideRoll[bnnNum].classList.add('on');
	}
	var autoBnn = setInterval(autoBanner,5000);


	//배너 재생 멈춤
	var flag = true;
	btnPlay.addEventListener('click', function(){
		if(flag){
			clearInterval(autoBnn);
			this.classList.add('on');
			flag=false;
		}else{
			autoBnn = setInterval(autoBanner,5000);
			this.classList.remove('on');
			flag = true;
		}
	});

	// 롤링버튼
	// $(".box").next();
	// $(".box").prev();
	// $(".box").parent();

	// var box = document.querySelector(".box");
	// box.nextElementSibling;
	// box.previousElementSibling;
	// box.parentElement;

	slideRoll.forEach(function(item){
		item.addEventListener('click', rollAction); //클릭했을때 rollAction이라는 함수 호출해라
	});
	
	function rollAction(item){
		curRoll = item.currentTarget; // 클릭이벤트가 전달된 엘리먼트
		parentRoll = curRoll.parentElement; // 연결된 엘리먼트의 부모
		childRoll = parentRoll.children;//부모엘리먼트의 자식인 엘리먼트들
		curIdx = Array.from(childRoll).indexOf(curRoll); // 연결된 엘리먼트의 인덱스
		// Array.form 문자열이나 다른걸 배열객체로만들어주는거여 찐 배열말고 배열같은걸로
		// children이 array되는거다 
		
		
		slide.forEach(function (item) { //매개변수의 slide가 하나씩하나씩 들어가게 된다. 
			item.classList.remove('active');
		});
		slide[bnnNum].classList.add('active'); //addClass

		slideRoll.forEach(function(idx){ //forEach문을 사용하여 매개변수가 하나씩 들어가게 된다. 
			idx.classList.remove('on');
		});
		slideRoll[bnnNum].classList.add('on');
		bnnNum = curIdx;
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/* top버튼 */
	var btnTop = document.querySelector('.btn_top');

	window.addEventListener('scroll', function(){
		var scroll = document.querySelector("html").scrollTop; // 현재 스크롤값
		console.log(scroll);

		if( scroll <=0 ){
			btnTop.classList.remove("on,ab"); //remove class가 2개 인경우 같이 써주면된다.
		}else if(scroll > 0 && scroll < 2700){
			btnTop.classList.remove("ab");
			btnTop.classList.add("on");
		}else{
			btnTop.classList.add("ab");
		}
	});

	btnTop.addEventListener("click",function(e){
		e.preventDefault();
		window.scroll({ //스크롤이 top, left 0으로 smooth하게 움직인다.
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	});
	
	
	
}