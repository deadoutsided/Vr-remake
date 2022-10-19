//form
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	const errorMessadge = document.querySelector('#error_text');
	const emailErrMessadge = document.querySelector('#error_text-email');
	const emailInp = document.querySelector('#formEmail');
	const succesSend = document.querySelector('.info');
	emailInp.addEventListener('input', () => {
		if(!emailTest(emailInp)){
			console.log(emailInp.validity);
			emailErrMessadge.classList.add('error_text-email_active');
		}else{
			emailErrMessadge.classList.remove('error_text-email_active');
		}
	});
	form.addEventListener('submit', formSend);

	async function formSend(e) {
			e.preventDefault();

			let error = formValidate(form);

			let formData = new FormData(form);

			if (error === 0) {
					form.classList.add('_sending');
					let responce = await fetch('sendmail.php', {
							method: 'POST',
							body: formData
					});
					if (responce.ok) {
							let result = await responce.json();
							alert(result.messagge);
							formPreview.innerHTML = '';
							form.reset();
							form.classList.remove('_sending');
							succesSend.classList.add('info_active');
					} else {
							form.classList.remove('_sending');
					}
			} else {
					errorMessadge.classList.add('error_text_active');
			}
	}

	function formValidate(form) {
			let error = 0;
			let formReq = document.querySelectorAll('._req');

			for (let index = 0; index < formReq.length; index++) {
					const input = formReq[index];
					formRemoveError(input);

					if (input.classList.contains('._email')) {
							if (emailTest(input)) {
									formAddError(input);
									emailErrMessadge.classList.add('error_text-email_active');
									error++;
							}
					} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
							formAddError(input);
							error++;
					} else {
							if (input.value === '') {
									formAddError(input);
									error++;
							}
					}
			}
			return error;
	}


	function formAddError(input) {
			input.parentElement.classList.add('_error');
			input.classList.add('_error');
	}

	function formRemoveError(input) {
			input.parentElement.classList.remove('_error');
			input.classList.remove('_error');
	}
	//email check function
	function emailTest(input) {
			return input.validity.valid;
	}
});

//menu
function MainNav(){
	var ths = this;
	
	
	ths.init = function(){
		ths.fallback = !Modernizr.csstransforms3d;
		ths.speed = 12;
		ths.tweening = false;
		ths.nav_perc = 1;
		ths.opened = false;
		ths.mainnav = $("#mainnav");
		ths.panel = $(".panel", ths.mainnav)[0];
		ths.slice1 = $(".slice.s1", ths.panel)[0];
		ths.slice2 = $(".slice.s2", ths.panel)[0];
		ths.slice3 = $(".slice.s3", ths.panel)[0];
		ths.menu_content = $(".menu .content", ths.panel);
		ths.blocks = $("#container .blocks")[0];
		ths.sliceWidth = getCss(ths.slice1, "width");
		ths.sliceWidth_slice3 = getCss(ths.slice3, "width");
		ths.openedWidth = ths.sliceWidth*2 + ths.sliceWidth_slice3;
		ths.offsetX = -3;		
		
		if(!ths.fallback)	ths.setClosed();
		
		
		forEach(ths.menu_content, function($i, $elem){ setCss($elem, "display", "none"); })
		
	
		setCss(ths.mainnav, "width", ths.sliceWidth_slice3);
		
		
		var menu1 = $("a",ths.menu_content[0]);
		var menu2 = $("a",ths.menu_content[1]);
		
		forEach(menu1, function($i){
			menu1[$i].sibling = menu2[$i];
			menu2[$i].sibling = menu1[$i];
			
			menu1[$i].onmouseover = menu2[$i].onmouseover = function(){
				addClass(this, "hover");
				addClass(this.sibling, "hover");
			}
			menu1[$i].onmouseout = menu2[$i].onmouseout = function(){
				removeClass(this, "hover");
				removeClass(this.sibling, "hover");
			}
		})
		
	
		setCss($("#menu_button"), "display", "block");
		if(!getCookie("yr_menuclicked")){
			addClass($("#menu_button"), "intro");
			addClass($("#jumpToMenu"), "intro");
		}
		
		
		if(ths.fallback){
			addClass(ths.mainnav, "fallback");
			removeClass(ths.panel, "closed");
		}
	}
	
	
	
	ths.openMenu = function(){
		ths.opened = true;
		ths.tweening = true;
		removeClass(ths.panel, "closed");
		setCookie("yr_menuclicked", true);
		setCss(ths.mainnav, "width", 270);
		forEach(ths.menu_content, function($i, $elem){ setCss($elem, "display", "block"); });
		proto.tween(ths, {prop:"nav_perc", end:0, onProgress:ths.onMenuMove, onComplete:ths.onMenuOpened, duration:24});
	}
	
	ths.onMenuOpened = function(){
		ths.tweening = false;
	}
	
	

	ths.closeMenu = function(){
		ths.opened = false;
		ths.tweening = true;
		if(!ths.fallback)	addClass(ths.panel, "closed");
		setCss(ths.mainnav, "width", ths.sliceWidth_slice3);
		proto.tween(ths, {prop:"nav_perc", end:1, onProgress:ths.onMenuMove, onComplete:ths.onMenuClosed, duration:12});
	}
	
	ths.onMenuClosed = function(){
		forEach(ths.menu_content, function($i, $elem){ setCss($elem, "display", "none"); })
		ths.tweening = false;
	}
	
	ths.setClosed = function(){		
		ths.slice1.style[Modernizr.prefixed("transform")] = "translate3d(-"+ths.sliceWidth+"px,0,0)";
		ths.slice2.style[Modernizr.prefixed("transform")] = "translate3d(-"+ths.sliceWidth+"px,0,0)";
		ths.slice3.style[Modernizr.prefixed("transform")] = "translate3d("+ths.sliceWidth*2+"px,0,0)";
	}
	
	ths.toggleMenu = function(){
		if(ths.opened)		ths.closeMenu();
		else					ths.openMenu();
	}
	
	ths.onMenuMove = function(){
		if(!ths.fallback){		
			var angle = 90*ths.nav_perc;
			var menuWidth = Math.round(ths.get3dRotatedWidth(angle, ths.sliceWidth)*2 + ths.sliceWidth_slice3 +(ths.offsetX*(1-ths.nav_perc)));
			//setCss(ths.blocks, "margin-left", menuWidth);
			
		
			if(ths.nav_perc==1){
				ths.setClosed();
			}else{
				ths.slice1.style[Modernizr.prefixed("transform")] = "translate3d(0,0,0) rotateY("+(90*ths.nav_perc)+"deg)";
				ths.slice2.style[Modernizr.prefixed("transform")] = "translate3d("+Math.max(0,(ths.sliceWidth-1))+"px,0,0) rotateY("+(-180*ths.nav_perc)+"deg)";
				ths.slice3.style[Modernizr.prefixed("transform")] = "translate3d("+Math.max(0,(ths.sliceWidth-2))+"px,0,0) rotateY("+(90*ths.nav_perc)+"deg)";
			}
			
		}else{				
			var posX = -(ths.sliceWidth*2)*ths.nav_perc;
			setCss(ths.panel, "left", posX);
			//setCss(ths.blocks, "margin-left", posX+ ths.openedWidth +ths.offsetX);
		}
	}
	
	
	
	ths.resize = function($totH){
		if(ths.tweening && !agent.mobile){
			proto.endTween(ths, "nav_perc");
			ths.onMenuMove();
		}
	}
	
	

	ths.getWidth = function(){	
		if(ths.opened)		return ths.openedWidth +ths.offsetX;
		else					return ths.sliceWidth_slice3;
	}
	
	ths.get3dRotatedWidth = function($angle, $width){
		if($angle==90 || $angle==270)	return 0;
		else									return Math.abs(Math.cos($angle*Math.PI/180)*$width);
	}
	
}


