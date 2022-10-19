function PreloadImages($images){
	var ths = this;
	
	ths.images = $images;
	ths.total = ths.images.length;
	ths.loaded = 0;
	ths.progress = 0;
	
	ths.imageLoaded = function($ok){
		ths.loaded++
		ths.progress = ths.loaded/ths.total
		if(ths.onProgress)	ths.onProgress(ths.progress, $ok)
		if(ths.loaded == ths.total && ths.onComplete)	ths.onComplete()
	}
	
	ths.init = function(){
		for(var i=0; i<ths.images.length; i++){
			var img = new PreloadImage(ths.images[i]);
			img.onComplete = ths.imageLoaded;
			img.init();
		}
	}
}


function PreloadImage($img){
	var ths = this;
	
	ths.imageLoaded = function($ok){
		if(ths.onComplete)	ths.onComplete($ok);
	}
	
	ths.init = function(){
		if(agent.browser=="ie" && agent.version<9){	
			ths.imageLoaded(true);
			
		}else{
			var img = new Image();
			
			img.onload = function(){
				ths.imageLoaded(true);
				img = null;
			}
			img.onerror = function(){
				ths.imageLoaded(false);
				img = null;
			}
			img.src = $img;
		}
	}
}