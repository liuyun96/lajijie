/**
 * Created by IntelliJ IDEA.
 * Date: 12-3-17
 * Time: 下午4:36
 * 团购详情相关js
 */
$(function() {
	// *************************************************/   
	
	var addWareToCart = function(){
		addWare($("#currentWareId").val(),$('#number').val(),false,$("#resourceType").val(),$("#resourceValue").val(),$("#sid").val());
	}
	
	//预约商品时用
	G_addWareToCart = addWareToCart;
	
	var addWareToCartAndNoJump = function(){
		addWare($("#currentWareId").val(),$('#number').val(),true,$("#resourceType").val(),$("#resourceValue").val(),$("#sid").val());
	}

	$("#add_cart").click(addWareToCart);
	
	// *************************************************/
	   $("#directorder").click(addWareToCartAndNoJump);
	// *************************************************/

    /**
     * 添加触屏事件
     * @param obj
     */
    function addTouchEvent(obj){
            //添加触屏事件
    	if (false && window.addEventListener) {
    		obj.addEventListener('touchstart', tStart, false);
    		obj.addEventListener('touchmove', tMove, false);
    		obj.addEventListener('touchend', tEnd, false);
    		//obj.addEventListener('click', zoom, false);
        } else if (false && window.attachEvent) {
        	obj.attachEvent('touchstart', tStart);
        	obj.attachEvent('touchmove', tMove);
        	obj.attachEvent('touchend', tEnd);
        	//obj.attachEvent('click', zoom);
        } else {
        	obj.ontouchstart = tStart;
        	obj.ontouchmove = tMove;
            obj.ontouchend = tEnd;
            //obj.onclick = zoom;
        }
    }
	var spinner = createSpinner();

    var spinner1 = createSpinner();
	/**
	 * 加载图片
	 */
	function loadImageBack(img,rol) {
		var imgs = getAllImgs();
		if(imgs=='')return;
		var arrImg = imgs.split(',');
		if(arrImg.length==0)return;
		if(rol == undefined){
			//小图片的显示=====
			var html = '<span class="tbl-cell">'+
			'<img src="'+img.src+'" seq="'+currentImg+'" width="320" height="292">'+
			'</span>';
			$('#imgSlider').html(html);
			//小点点的显示=====
			var html = '';
			for(var i=0;i<arrImg.length;i++){
				html=html+'<li class="new-tbl-cell '+(i==0?'on':'')+'"><a href="javascript:void(0)"></a></li>';
			}
			if(html!=''){
				$('#imgSliderPage').show();
				$('#imgSliderPage').html(html);
			}else{
				$('#imgSliderPage').hide();
			}
			$('#imgSlider').css('margin-left','0px');
			//大图片的显示========================
			var html = '<li class="new-tbl-cell">'+
			'<a href="javascript:void(0)"><span class="new-shade-img"><img src="'+img.src+'" seq="'+currentImg+'" alt="" width="300" height="300"></span></a>'+
			'</li>';
			$('#bigImgSlider').html(html);
			//大点点的显示========================
			var html = '';
			for(var i=0;i<arrImg.length;i++){
				html=html+'<li class="new-tbl-cell '+(i==0?'on':'')+'"><a href="javascript:void(0)"></a></li>';
			}
			if(html!=''){
				$('#bigImgSliderPage').html(html);
				$('#bigImgSliderPage').show();
			}else{
				$('#bigImgSliderPage').hide();
			}
			$('#bigImgSlider').css('margin-left','0px');
		}else if(rol == 1){ //next
			if(arrImg.length==1)return;
			var prev = currentImg-1<0?arrImg.length-1:currentImg-1;
			//小图片的显示=====
			$('#imgSlider img[seq="'+prev+'"]').parent('span').siblings().remove();
			var html = '<span class="tbl-cell"><img src="'+imgCache[currentImg].src+'" seq="'+currentImg+'" width="320" height="292"></span>';
			$('#imgSlider').append(html);
			$('#imgSlider').css('left','0px');
			setTimeout(function(){
				$('#imgSlider').animate({'left':'-320px'},200);
			},10);
			//小点点的显示====
			$('#imgSliderPage').children('li').removeClass('on');
			$('#imgSliderPage').children('li').eq(currentImg).addClass('on');
			$('#imgSliderPage').show();
			//大图片的显示----------------------
			$('#bigImgSlider img[seq="'+prev+'"]').parent('span').parent('a').parent('li').siblings().remove();
			var html = '<li class="new-tbl-cell"><a href="javascript:void(0)"><span class="new-shade-img"><img src="'+imgCache[currentImg].src+'" seq="'+currentImg+'" width="300" height="300"></span></a></li>';
			$('#bigImgSlider').append(html);
			$('#bigImgSlider').css('margin-left','0px');
			setTimeout(function(){
				$('#bigImgSlider').animate({'margin-left':'-300px'},200);
			},10);
			//大点点的显示-----------------------
			$('#bigImgSliderPage').children('li').removeClass('on');
			$('#bigImgSliderPage').children('li').eq(currentImg).addClass('on');
			$('#bigImgSliderPage').show();
		}else if(rol == 0){ ;//prev
			if(arrImg.length==1)return;
			var prev = currentImg+1>arrImg.length-1?0:currentImg+1;
			//小图片的显示=====
			$('#imgSlider img[seq="'+prev+'"]').parent('span').siblings().remove();
			var html = '<span class="tbl-cell"><img src="'+imgCache[currentImg].src+'" seq="'+currentImg+'" width="320" height="292"></span>';
			$('#imgSlider').prepend(html);
			$('#imgSlider').css('left','-320px');
			setTimeout(function(){
				$('#imgSlider').animate({'left':'0px'},200);
			},10);
			//小点点的显示====
			$('#imgSliderPage').children('li').removeClass('on');
			$('#imgSliderPage').children('li').eq(currentImg).addClass('on');
			$('#imgSliderPage').show();
			//大图片的显示----------------------------
			$('#bigImgSlider img[seq="'+prev+'"]').parent('span').parent('a').parent('li').siblings().remove();
			var html = '<li class="new-tbl-cell"><a href="javascript:void(0)"><span class="new-shade-img"><img src="'+imgCache[currentImg].src+'" seq="'+currentImg+'" width="300" height="300"></span></a></li>';
			$('#bigImgSlider').prepend(html);
			$('#bigImgSlider').css('margin-left','-300px');
			setTimeout(function(){
				$('#bigImgSlider').animate({'margin-left':'0px'},200);
			},10);
			//大点点的显示----------------------------
			$('#bigImgSliderPage').children('li').removeClass('on');
			$('#bigImgSliderPage').children('li').eq(currentImg).addClass('on');
			$('#bigImgSliderPage').show();
		}
		if(img){
			//$('#showPic').replaceWith(img);
			//$('#popImg img').attr('src',$('#showPic').attr('src'));
		}
	}

    /**
     * 图片模块渲染
     * @param data    json数据
     */
    function imageRender(data){
        //如果商品有图片
        if(data  && data.ware && data.ware.images && data.ware.images.length>0){
        	var strImg = '';
            $.each(data.ware.images,function(i,v){
                if(v && v.newpath){
                    strImg = strImg + v.newpath.replace('/n4/','/n1/') +',';
                }
            });
            $('#imgs').val(strImg);
            imgCache = new Array(getAllImgs().split(',').length);//图片缓存区
        	currentImg = 0;
        	//预加载
            preLoadImg();
        	loadImageBack(imgCache[currentImg]);
        }
    }
    
    function yuyueRender(data){
    	if(typeof G_TIME_ID != 'undefined'){
    		clearTimeout(G_TIME_ID);
    	}
    	if(data && data.yuYue && data.yuYue.isYuYue){
    		var href="http://m.jd.com/yuyue/"+data.ware.wareId+".html";
    		$('#nowyuyue').attr("href",href);
    		$('#cart1').css("display","none");
    		type = data.yuYue.yuyueType;
    		if('1' == data.yuYue.yuyueType){
    			$('#yuyuecart').css("display","none");
    			$('#yuyuenow').css("display","none");
    			$('#yuyueing').find('.btn-yuyue').attr('data','1');
    			$('#yuyuecontext').text('\u5f00\u59cb\u9884\u7ea6');
    			$('#yuyueing').show();
				time = new Date().getTime()/1000 + parseInt(data.yuYue.yuYueStartTime);
				getTimes();
    		}else if('2' == data.yuYue.yuyueType){
    			$('#yuyueing').css("display","none");
    			$('#yuyuecart').css("display","none");
    			$('.btn-yuyue2').attr('data','2');
    			$('#yuyuenow').show();
    			$('#yuyuenow').css("display","block");
    			time = new Date().getTime()/1000 + parseInt(data.yuYue.yuYueEndTime);
				getTimes();
    		}else if('3' == data.yuYue.yuyueType){
    			$('#test2').text(data.yuYue.buyStartTime);
    			$('#yuyuenow').css("display","none");
    			$('#yuyuecart').css("display","none");
    			$('#yuyueing').show();
    			$('#yuyueing').find('.btn-yuyue').attr('data','3');
    			$('#yuyuetime').empty();
    			$('#yuyuecontext').empty();
        		if(parseInt(data.yuYue.buyStartTime)>0){
        			$('#yuyuecontext').text('\u5f00\u59cb\u62a2\u8d2d');
					time = new Date().getTime()/1000 + parseInt(data.yuYue.buyStartTime);
					getTimes();
				}else{
					$('#yuyuetime').text('\u62a2\u8d2d\u672a\u5f00\u59cb\uff0c\u656c\u8bf7\u5173\u6ce8');
					$('#yuyuecontext').empty();
				}
    		}else if('4' == data.yuYue.yuyueType){
    			$('#yuyueing').css("display","none");
    			$('#yuyuenow').css("display","none");
    			$('#yuyuecart').show();
				$('#cartyuyue').attr('data','4');
				time = new Date().getTime()/1000 + parseInt(data.yuYue.buyEndTime);
				getTimes();
    		}else if('5' == data.yuYue.yuyueType){
    			$('#yuyueendcontext').text('\u62a2\u8d2d\u5df2\u7ed3\u675f');
				$('#yuyueend').css("display","block");
    		}
    	}else{
    		$('#cart1').css("display","table");
			$('#add_cart').removeClass('btn-cart-def');
			$('#directorder').removeClass('btn-buy-def');
    	}
    }

    /**
     * 商品参数模块渲染
     * @param data     json数据
     */
    function infoRender(data){
        //更新waraeid
        $('#currentWareId').val(data.ware.wareId);
        $('#goodName').val(data.ware.wname);
        $('#imgUrl').val(data.ware.imgUrlN5);
        if(data.jshop){
        	$('#jshop').val(data.jshop);
        }
        if(assessPageNo)assessPageNo = 1;
        //header tab
        // $('#tab_intro').attr('href',urlEncode('/product/'+data.ware.wareId+'.html',$('#sid').val()));
         //$('#tab_detail').attr('href',urlEncode('/detail/'+data.ware.wareId+'.html',$('#sid').val()));
        // $('#tab_comment').attr('href',urlEncode('/comments/'+data.ware.wareId+'.html',$('#sid').val()));
        // $('#tab_orderComment').attr('href',urlEncode('/ware/orderComment.action?wareId='+data.ware.wareId,$('#sid').val()));

        //商品名称 &&广告词
        $('#title').html(data.ware.wname+'&nbsp;&nbsp;<font color="red">'+data.ware.adword+'</font>');

        //color
        if(data  && data.proColors && data.proColors.length>0){
          $('#color_parent').show();
          $('#color').empty();
           $.each(data.proColors,function(i,v){
              if(data.ware.wareId == v.wareId){
            	  $('#color1').html(v.color);
            	  $('#color').append('<a title="'+v.color+ '" date="current" class="btn-color-op new-mg-b10 on" >'+v.color+'</a>&nbsp;');
                 //$('#color').append('<a title="'+v.color+ '" date="current" class="on" >'+v.color+'<span class="icon"></span></a>');
              }else{
                  $('#color').append('<a title="'+v.color+ '" date="noCurrent" class="btn-color-op new-mg-b10" href="javascript:void(0)" wareId="'+v.wareId+'">'+v.color+'</a>&nbsp;');
              }
           });
        }else{
            $('#color_parent').hide();
        }

        //size
       if(data && data.proSizes && data.proSizes.length>0){
          $('#size_parent').show();
          $('#size').empty();
           $.each(data.proSizes,function(i,v){
              if(data.ware.wareId == v.wareId){
            	 $('#size1').html(v.size);
            	 $('#size').append('<a title="'+v.size+ '" class="btn-color-op new-mg-b10 on" date="currentSize">'+v.size+'</a>&nbsp;');
//                 $('#size').append('<a title="'+v.size+ '" class="on" date="currentSize">'+v.size+'<span class="icon"></span></a>');
              }else{
//                  $('#size').append('<a title="'+v.size+ '" href="javascript:void(0)" date="noCurrentSize" wareId="'+v.wareId+'">'+v.size+'</a>');
              	 $('#size').append('<a title="'+v.size+ '" class="btn-color-op new-mg-b10" href="javascript:void(0)" date="noCurrentSize" wareId="'+v.wareId+'">'+v.size+'</a>&nbsp;');
              }
           });
        }else{
            $('#size_parent').hide();
        }
        //定价
        if(data && data.ware && data.ware.marketPrice&&data.ware.showMartPrice){
            $('#marketPrice').empty;
            //$('#font_price').empty();
            if(data.marketPrice){
               $('#marketPrice').html('&yen;'+data.marketPrice);
            }else{
               $('#marketPrice').html('&yen;'+data.ware.marketPrice);
            }
        }else{
             $('#marketPrice').hide();
        }
         //库存
        stockRender(data);
        //jd价格 &&  商品编号
        if(data && data.stock){
        	var html = '';
        	if(data.stock.jdPrice && data.stock.jdPrice!='' && data.stock.jdPrice.toLowerCase()!='null' && parseFloat(data.stock.jdPrice)>0){
        		html='&yen;'+data.stock.jdPrice;
        	}else{
        		html='&#26242;&#26080;&#25253;&#20215;';//暂无报价
        	}
        	$('#price').html(html);
            //编号
            // $('#wareNo').empty();
            // $('#wareNo').append('\u5546\u54c1\u7f16\u53f7:'+data.stock.wareId);
//        	$('#wareNo').html(data.stock.wareId);
        	$('#currentWareId').val(data.stock.wareId);
        	$('#jdPrice').val(data.stock.jdPrice);
        }else{
        	var html = '';
        	if(data.ware.jdPrice && data.ware.jdPrice!='' && data.ware.jdPrice.toLowerCase()!='null' && parseFloat(data.ware.jdPrice)>0){
        		html='&yen;'+data.ware.jdPrice;
        	}else{
        		html='&#26242;&#26080;&#25253;&#20215;';//暂无报价
        	}
        	$('#price').html(html);
            //$('#wareNo').empty();
            //$('#wareNo').append('\u5546\u54c1\u7f16\u53f7:'+data.ware.wareId);
//        	$('#wareNo').html(data.ware.wareId);
        	$('#currentWareId').val(data.ware.wareId);
        	$('#jdPrice').val(data.ware.jdPrice);
        }
        //促销信息
         if(data && data.promotionInfo && data.promotionInfo.promotionInfoTitle){
             $('#promotionInfo').show();
             $('#promotionInfo').empty();
             $('#promotionInfo').append(data.promotionInfo.promotionInfoTitle+data.promotionInfo.promotionInfo);
         }else{
             $('#promotionInfo').hide();
         }
         //赠品信息
         if(data && data.wareList && data.wareList.length>0){
             $('#wareList').show();
             $('#wareList_1').empty();
             for(var i=0,len=data.wareList.length;i<len;i++){
            	 $('#wareList_1').append('<a href="'+urlEncode('/product/'+data.wareList[i].wareId+'.html',$('#sid').val())+'">'+data.wareList[i].wname+' X '+data.wareList[i].num+'</a>');
             }
         }else{
             $('#wareList').hide();
             $('#wareList_1').hide();
         }
        //优惠券信息
         if(data && data.wareCoupons && data.wareCoupons.length>0){
             $('#wareCoupons').show();
             $('#wareCoupons_1').empty();
             for(var i=0,len=data.wareCoupons.length;i<len;i++){
            	 $('#wareCoupons_1').append(''+data.wareCoupons[i].message+(data.wareCoupons[i].balance?" "+data.wareCoupons[i].balance+"&#20803;":"")+'');
             }
         }else{
             $('#wareCoupons').hide();
             $('#wareCoupons_1').hide();
         }
        //商品详情链接
         var orderComment = $('#orderComment').attr('href');
         $('#orderComment').attr('href',orderComment.replace(/\/\d+\.html/,'/'+data.ware.wareId+".html"));
         var consultations = $('#consultations').attr('href');
         $('#consultations').attr('href',consultations.replace(/\/\d+\.html/,'/'+data.ware.wareId+".html"));
         if(data && data.onlineService){
        	 hasKefu();
         }
         //$('#wareDetail').attr('href',urlEncode('/detail/'+data.ware.wareId+'.html',$('#sid').val()));
       //加入收藏链接  
        //$('#addFavorite').attr('href',urlEncode('/user/addFavorite.action?wareId='+data.ware.wareId,$('#sid').val()));
    }
    
    function feeTypeChange(){
    	return false;
	}
    
    /**
     * 商品参数模块渲染
     * @param data     json数据
     */
    function feeInfoRender(data){
    	if(data && data.feeInfo && data.feeInfo.length>0){
            $('#fee_parent').show();
            $('#fee').empty();
            var feeType = data.feeType;
            var n = 0;
            var fn;
    		$.each(data.feeInfo,function(i,v){
                if(feeType == v.ft){
         		   	n = 1;
         		   	fn = v.name;
         	    }
            });
            if(n == 0){
            	feeType = data.feeInfo[0].ft;
            	fn = data.feeInfo[0].name;
            }
            $('#feeType').val(feeType);
        	$('#fee1').html(fn);
            $.each(data.feeInfo,function(i,v){
        		if(feeType == v.ft){
              	 	$('#fee').append('<a title="'+v.name+ '" href="javascript:void(0)" feeName="'+v.name+'" feeType="'+v.ft+'" skuId="'+v.sku+'" class="btn-color-op new-mg-b10 on feeType">'+v.name+'</a>&nbsp;');
                }else{
             	   $('#fee').append('<a title="'+v.name+ '" href="javascript:void(0)" feeName="'+v.name+'" feeType="'+v.ft+'" skuId="'+v.sku+'" class="btn-color-op new-mg-b10 feeType">'+v.name+'</a>&nbsp;');
         	    }
             });
          }else{
              $('#fee_parent').hide();
          }
        if(data.feeType!="100"){
 			$('#selcount').hide();
 			$('.normal').each(function(){
             	$(this).hide();
            });
 			$('#noContract').addClass('btn-buy-def');
 			$("#noContract").live('click',feeTypeChange());
 			$('#validPhone').addClass('btn-buy-def');
 			$("#validPhone").live('click',feeTypeChange());
 			$('#contractPhone').addClass('btn-buy-def');
			$('#contractPhone').live('click',feeTypeChange());
 			if(data.canBuy && data.stock){
 				if((data.stock.jdPrice>0)||(data.ware.jdprice>0)){
 					$('#noContract').removeClass('btn-buy-def');
 					$('#validPhone').removeClass('btn-buy-def');
 					$('#contractPhone').removeClass('btn-buy-def');
 				}
 			}
 			if(data.feeType=="18"){
 				$('#selNoContract').hide();
 				$('#selMobileCustomer').show();
 				$('#selContractPhone').hide();
 				if(!data.m_mobilecustomer){
					$('#validPhone').addClass('btn-buy-def');
					$('#validPhone').live('click',feeTypeChange());
				}
 			}
			else{
				$('#selMobileCustomer').hide();
				if(data.feeType == "0"){
					$('#selNoContract').hide();
					$('#selContractPhone').show();
					if(!data.m_contractphone){
						$('contractPhone').addClass('btn-buy-def');
						$('#contractPhone').live('click',feeTypeChange());
					}
				}else{
					$('#selContractPhone').hide();
					$('#selNoContract').show();
				}
			}
 		}else{
 			$('#selcount').show();
 			$('#selNoContract').hide();
 			$('#selMobileCustomer').hide();
 			$('#selContractPhone').hide();
 			$('.normal').each(function(){
             	$(this).show();
            });
 		}
    }
    
    /**
     * 加入收藏事件
     
    $('#addFavorite').click(function(){
    	$.get('/user/addFavorite.json',{
    		wareId:$("#currentWareId").val(),
    		sid : $('#sid').val()
    		},function(data){
	    		alert(data.addFavorite);
    	},'json');
    });*/

    /**
     * 商品详情模块渲染
     * @param data
     */
    function detailRender(data){
       //详情超链接渲染
       //$('#wareDetail').attr('href',urlEncode('/detail/'+data.ware.wareId+'.html',$('#sid').val()));
       // $('#li_detail').text((data.ware&&data.ware.wdis&&data.ware.wdis.length>300)?data.ware.wdis.substring(0,300):data.ware.wdis);
    }

    /**
     * 商品评论渲染
     * @param data
     */
    function commentRender(data){
    	/*$('#assessNum').html(d.commentCountMap.scoreCount1);
		var good = -1;
		var all = -1;
		try{
			good = parseInt(d.commentCountMap.scoreCount1);
			all = good+parseInt(d.commentCountMap.scoreCount2)+parseInt(d.commentCountMap.scoreCount3);
			$('#assessNum').html(all);
		}catch(e){}
		var rate = Math.round(good/all*100);
		if(good>=0 && all>0){
			$('#assessStar').css('width',rate+"%");
			$('#assessRate').html(rate+"%");
		}
		$('#assess').show();*/
		/*
        $('#comment').attr('href',urlEncode('/comments/'+data.ware.wareId+'.html',$('#sid').val()));
        //评论超链接渲染
		var html='';
		html+='<span class="txt">\u597d\u8bc4</span><span class="red">'+data.commentCountMap.scoreCount1+'</span>'
		+'<span class="txt">\u4e2d\u8bc4</span><span class="red">'+data.commentCountMap.scoreCount2+'</span>'
		+'<span class="txt">\u5dee\u8bc4</span><span class="red">'+data.commentCountMap.scoreCount3+'</span>';
		$("#cont").html(html);
        if(data.comments && data.comments.length>0){
        	var htmlContent='';
    		htmlContent+='<p class="tit">'+data.comments[0].title+'</p>'
    		+'<p><span>\u8bc4\u5206\uff1a</span><span  class="mu-star"><span class="mu-starv star-width'+data.comments[0].score+'"></span></span></p>'
    		+'<p class="user_id"><span class="name">'+data.comments[0].userId+'</span><span class="time">'+data.comments[0].creationTime+'</span></p>'
    		+'<p><span>\u4f18\u70b9\uff1a</span><span style="table-layout:fixed; word-break: break-all; overflow:hidden;">'+data.comments[0].pros+'</span></p>'
    		+'<p><span>\u4e0d\u8db3\uff1a</span><span style="table-layout:fixed; word-break: break-all; overflow:hidden;">'+data.comments[0].cons+'</span></p>'
    		+'<p><span>\u5fc3\u5f97\uff1a</span><span style="table-layout:fixed; word-break: break-all; overflow:hidden;">'+data.comments[0].cons+'</span></p>';
    		$("#commentDetail").html(htmlContent);
        }else{
           $('#commentDetail').html('');
        }
		*/
    	/*if(data.comments && data.comments.length>0){
    		//alert(data.comments[0].title);
        	var htmlContent='';
    		htmlContent+='<p class="tit">'+data.comments[0].title+'</p>'
    		+'<p><span>\u8bc4\u5206\uff1a</span><span  class="mu-star"><span class="mu-starv star-width'+data.comments[0].score+'"></span></span></p>'
    		+'<p class="user_id"><span class="name">'+data.comments[0].userId+'</span><span class="time">'+data.comments[0].creationTime+'</span></p>'
    		+'<p><span>\u4f18\u70b9\uff1a</span><span style="table-layout:fixed; word-break: break-all; overflow:hidden;">'+data.comments[0].pros+'</span></p>'
    		+'<p><span>\u4e0d\u8db3\uff1a</span><span style="table-layout:fixed; word-break: break-all; overflow:hidden;">'+data.comments[0].cons+'</span></p>'
    		+'<p><span>\u5fc3\u5f97\uff1a</span><span style="table-layout:fixed; word-break: break-all; overflow:hidden;">'+data.comments[0].cons+'</span></p>';
    		$("#comments").html(htmlContent);
        }else{
           $('#comments').html('');
        }*/
    	var good = -1 ;
		var all = -1;
		try{
			good = parseInt(data.commentCountMap.scoreCount1);
			all = good+parseInt(data.commentCountMap.scoreCount2)+parseInt(data.commentCountMap.scoreCount3);
		}catch(e){}
		var rate = Math.round(good/all*100);
		if(good>=0 && all>0){
			$('#comments').html('<em>'+all+'</em> \u4eba\u8bc4\u4ef7  <em>'+rate+'%</em> \u597d\u8bc4');
		}else{
			$('#comments').html('<em>'+all+'</em> \u4eba\u8bc4\u4ef7  <em> 100%</em> \u597d\u8bc4');
		}
    	
    }

    /**
     * 商品晒单模块渲染
     * @param data
     */
    function orderCommentRender(d){
    	if(d.orderCommentCount)
			$("#orderNum").html(d.orderCommentCount+"&#26465;");
       //晒单超链接渲染
       //$('#wareShaiDan').attr('href',urlEncode('/ware/orderComment.action?wareId='+data.ware.wareId,$('#sid').val()));
       //$('#shaidan').text(data.orderCommentCount);
         //if(data.orderComments && data.orderComments.length>0){
//             var orderCommentTxt = ' <div class="u-topic">'+data.orderComments[0].title+'</div> '
//                 +  ' <div class="u-info clear">'+data.orderComments[0].userId+'<span class="fr">'+data.orderComments[0].creationTime+'</span></div>   '   ;
              //   + '  <div class="u-summ">'+data.orderComments[0].content+'</div>';

           // $('#li_orderComment').html(orderCommentTxt);
        //}else{
         //  $('#li_orderComment').html('');
        //}
    }

    /**
     * 商品咨询模块渲染
     * @param data
     */
    function consultationRender(d){
    	var html="";
		if(d.commentCount){
			html=d.commentCount;
		}
		if(html!='')
			$("#adviceNum").html(html+"&#26465;");
         //晒单超链接渲染
       //$('#consult').attr('href',urlEncode('/ware/consultations.action?wareId='+data.ware.wareId,$('#sid').val()));
  	   //$("#zixun").html(data.commentCount);
    }

    /**
     * 选择 颜色、大小
     * @param v
     */
    function wareSkuClick(v){
           $('#spinner1').show();
		   spinner1.spin($("#spinner1")[0]);
          $.post('/ware/yysView.json',{wareId:v,sid:$('#sid').val(),provinceId:$('#province').val(),cityId:$('#city').val(),countryId:$('#country').val(),townId:$('#town').val(),teamSign:$('#teamSign').val(),feeType:$('#feeType').val()},function(d){
        	  yuyueRender(d);
              imageRender(d);
              infoRender(d);
              if(d.myFeeInfo)
            	  feeInfoRender(d);
              spinner1.stop();
    	      $("#spinner1").hide();
              detailRender(d);
              //返回顶部 add by fuyukun @ 20130408
              window.scrollTo(0,0);
        },'json');
          jQuery.post('/ware/comments.json',{"wareId":v,sid:$('#sid').val()},function(d){
        	  commentRender(d);
  		},'json');
          
          jQuery.post('/ware/orderComment.json',{"wareId":v,sid:$('#sid').val()},function(d){
  			orderCommentRender(d);
  		},'json');	
          
          jQuery.post('/ware/consultations.json',{"wareId":v,sid:$('#sid').val()},function(d){
  			consultationRender(d);
  		},'json');
    }

    /**
     * 选择城市
     * @param v
     */
    function cityChange(v,pid){

        $('#spinner1').show();
		spinner1.spin($("#spinner1")[0]);
       $.post('/ware/yysView.json',{provinceId:pid,cityId:v,sid:$('#sid').val(),wareId:$('#currentWareId').val(),teamSign:$('#teamSign').val()},function(d){
            stockRender(d);
            priceRender(d);
            spinner1.stop();
		    $("#spinner1").hide();
        },'json');

    }

       /**
     * 选择省份
     * @param v
     */
    function provinceChange(v){
        $('#spinner1').show();
		spinner1.spin($("#spinner1")[0]);
       $.post('/ware/yysView.json',{provinceId:v,sid:$('#sid').val(),wareId:$('#currentWareId').val(),teamSign:$('#teamSign').val(),feeType:$('#feeType').val()},function(d){
              stockRender(d);
              priceRender(d);
               spinner1.stop();
		       $("#spinner1").hide();
        },'json');
    }
    /**
     * 选择三级地址
     * @param v
     */
    function countryChange(v,pid,cid){
        $('#spinner1').show();
		spinner1.spin($("#spinner1")[0]);
       $.post('/ware/yysView.json',{provinceId:pid,cityId:cid,countryId:v,sid:$('#sid').val(),wareId:$('#currentWareId').val(),teamSign:$('#teamSign').val(),feeType:$('#feeType').val()},function(d){
              stockRender(d);
              priceRender(d);
               spinner1.stop();
		       $("#spinner1").hide();
        },'json');
    }
    /**
     * 选择四级地址
     * @param v
     */
    function townChange(v,pid,cid,countryId){
        $('#spinner1').show();
		spinner1.spin($("#spinner1")[0]);
       $.post('/ware/yysView.json',{provinceId:pid,cityId:cid,countryId:countryId,townId:v,sid:$('#sid').val(),wareId:$('#currentWareId').val(),teamSign:$('#teamSign').val(),feeType:$('#feeType').val()},function(d){
              stockRender(d);
              priceRender(d);
               spinner1.stop();
		       $("#spinner1").hide();
        },'json');
    }
    
    /**
     * 判断商品是否有客服
     */
    function hasKefu(){
    	var pid = $('#currentWareId').val();
    	var url = "http://chat1.jd.com/api/checkChat?pid=" +pid + "&entry=m_item&returnCharset=gb2312&callback=?";
        jQuery.getJSON(url, doResult);
    }
    
    function doResult(json) {
       if (!json || !json.code) {
            return
       }
      /* if($('#jshop').val() != ""){
		   	$('#im').addClass("new-mg-l12");
	   }*/
	   var code = json.code;
	   if(code == 1){
	   		$('#kefu').show();//有，客服在线
	   		var url = "http://im.m.jd.com/merchant/index?v=6&sku="+$('#currentWareId').val()+"&imgUrl="+$('#imgUrl').val()+"&goodName="+encodeURIComponent(encodeURIComponent($("#goodName").val()))+"&jdPrice="+$('#jdPrice').val()+"&sid="+$('#sid').val();
	        $('#im').attr('href',url);
	   }else if(code==2 || code==3 || code==9){
			//客服不在线		
			$('#kefu').show();
			$('#im').addClass("btn-call-def");
	   }
    }
    
    /**
     * 省份促销 选择地址后渲染价格
     */
    function priceRender(data){
    	//定价
        if(data && data.ware && data.ware.marketPrice&&data.ware.showMartPrice){
            $('#marketPrice').show();
            $('#marketPrice').empty();
            if(data.marketPrice){
               $('#marketPrice').html('&yen;'+data.marketPrice);
            }else{
               $('#marketPrice').html('&yen;'+data.ware.marketPrice);
            }
        }else{
             $('#marketPrice').hide();
        }
        //促销信息
        if(data.promotionInfo && data.promotionInfo.promotionInfoTitle.length>0){
        	var htm = data.promotionInfo.promotionInfoTitle+data.promotionInfo.promotionInfo;
        	$('#promotionInfo').html(htm);
        	$('#promotionInfo').show();
        }else{
        	$('#promotionInfo').hide();
        }
        //jd价格 &&  商品编号
        if(data && data.stock){
        	var html = '';
        	if(data.stock.jdPrice && data.stock.jdPrice!='' && data.stock.jdPrice.toLowerCase()!='null' && parseFloat(data.stock.jdPrice)>0){
        		html='&yen;'+data.stock.jdPrice;
        	}else{
        		html='&#26242;&#26080;&#25253;&#20215;';//暂无报价
        	}
        	$('#price').html(html);
            //编号
            // $('#wareNo').empty();
            // $('#wareNo').append('\u5546\u54c1\u7f16\u53f7:'+data.stock.wareId);
//        	$('#wareNo').html(data.stock.wareId);
        	$('#currentWareId').val(data.stock.wareId);
        }else{
        	var html = '';
        	if(data.ware.jdPrice && data.ware.jdPrice!='' && data.ware.jdPrice.toLowerCase()!='null' && parseFloat(data.ware.jdPrice)>0){
        		html='&yen;'+data.ware.jdPrice;
        	}else{
        		html='&#26242;&#26080;&#25253;&#20215;';//暂无报价
        	}
        	$('#price').html(html);
            //$('#wareNo').empty();
            //$('#wareNo').append('\u5546\u54c1\u7f16\u53f7:'+data.ware.wareId);
//        	$('#wareNo').html(data.ware.wareId);
        	$('#currentWareId').val(data.ware.wareId);
        }
    }
    
    /**
     * 渲染库存
     * @param data
     */
    function stockRender(data) {
    	 if (data) {
//    		 $('#store').show();
//    		 $('#store').empty();
//    		 $('#store').append('<div class="new-sel-txt">&#37197;&#36865;&#33267;</div><div class="new-sel-area"><span class="new-sel-box new-p-re" id="storeProInfo"><a id="provincetip"></a><span></span><select class="new-select" id="province" onchange="changeProvince();"></select></span>');
    		 $('#stockTip').empty();
    		 $('#provincetip').empty();
    		 $('#provincetip').append('<span></span><select class="new-select" id="province" onchange="changeProvince();"></select>');
    		 $.each(data.provinceList, function(i, v) {
                 if (v.label == data.province.id) {
                	 $('#stockTip').append(data.province.name);
                	 $('#stockTip').append('<input type="hidden" name="provinceName" id="provinceName" value="$!province.name"/>');
                	 $('#provinceName').val(data.province.name);
                	 $('#provincetip').append(data.province.name);
                     $('#province').append('<option value="' + v.label + '" selected="selected" >' + v.value + '</option> ');
                     //$('#provincetip').empty();
                     //$('#provincetip').html(v.value);
                     if(v.label=='84'){
                     }
                 } else {
                     $('#province').append('<option value="' + v.label + '" >' + v.value + '</option> ');
                 }
             });
         	if (data.city) {
                 //$('.new-sel-area').append('<span class="new-sel-box new-p-re" id="storeinfo"><a id="citytip"></a><span></span><select class="new-select" id="city" onchange="changeCity()"></select></span>');
                // $('#store').show();
         		$('#citytip').empty();
         		$('#citytip').append('<span></span><select class="new-select" id="city" onchange="changeCity();"></select>');
                 $.each(data.cityList, function(i, v) {
                     if (v.label == data.city.id) {
                    	 $('#stockTip').append('>'+data.city.name);
                    	 $('#stockTip').append('<input type="hidden" name="cityName" id="cityName" value="$!city.name"/>');
                    	 $('#cityName').val(data.city.name);
                    	 $('#citytip').append(data.city.name);
                         $('#city').append('<option value="' + v.label + '" selected="selected" >' + v.value + '</option> ');
//                         $('#citytip').html(v.value);
                     } else {
                         $('#city').append('<option value="' + v.label + '" >' + v.value + '</option> ');
                     }
                 });
             }
             
         	if (data.country) {
//                $('.new-sel-area').append('<span class="new-sel-box new-p-re" id="storeCountryInfo"><a id="countrytip"></a><span></span><select class="new-select" id="country" onchange="changeCountry()"></select></span>');
//                $('#store').show();
         		$('#countrytip').empty();
         		$('#countrytip').append('<span></span><select class="new-select" id="country" onchange="changeCountry();"></select>');
                $.each(data.countryList, function(i, v) {
                    if (v.label == data.country.id) {
                    	$('#stockTip').append('>'+data.country.name);
                    	$('#countrytip').append(data.country.name);
                        $('#country').append('<option value="' + v.label + '" selected="selected" >' + v.value + '</option> ');
//                        $('#countrytip').html(v.value);
                    } else {
                        $('#country').append('<option value="' + v.label + '" >' + v.value + '</option> ');
                    }
                });
            } 
         	
         	if (data.town) {
         		
//         		$('<span id="town_1"><span class="select-box new-mg-b10" id="towntip"></span></span>').insertAfter($('#country_1'));
               /* $('.new-sel-area').append('<span class="new-sel-box new-p-re" id="storeTownInfo"><a id="towntip"></a><span></span><select class="new-select" id="town" onchange="changeTown()"></select></span>');
                $('#store').show();*/
         		$('#town_1').empty();
         		$('#town_1').append('<span class="select-box new-mg-b10" id="towntip"><span></span><select class="new-select" id="town" onchange="changeTown();"></select></span>');
                $.each(data.townList, function(i, v) {
                    if (v.label == data.town.id) {
                    	$('#stockTip').append('>'+data.town.name);
                    	$('#towntip').append(data.town.name);
                        $('#town').append('<option value="' + v.label + '" selected="selected" >' + v.value + '</option> ');
//                        $('#towntip').html(v.value);
                    } else {
                        $('#town').append('<option value="' + v.label + '" >' + v.value + '</option> ');
                    }
                });
            }else{
            	$('#towntip').hide();
            }
         	
         	if(data.stock && data.stock.status){
//         		$('#stockStatus').empty();
//         		$('#stockStatus_1').empty();
         		$('#stockStatus').html('<font color="#c00">'+data.stock.status+'</font>');
         		$('#stockStatus_1').html(data.stock.status);
         		$('#stockFlag').val(data.stock.flag);
         	}
         } else {
             $('#store').hide();
         }
        //购物车
        if(data && data.canBuy && data.stock && data.stock.flag){
        	if((data.stock.jdPrice>0)||(data.ware.jdprice>0)){
        		if ($("#teamSign").val() !=1 ) {
        			$('#add_cart').removeClass('btn-cart-def');
        			$("#add_cart").unbind('click');
        			$("#add_cart").click(addWareToCart);
        		}
        		$('#stockFlag').val(data.stock.flag);
        		
        		$('#directorder').removeClass('btn-buy-def');
        		$("#directorder").unbind('click');
        		$("#directorder").click(addWareToCartAndNoJump);
        	}
			
        }else{
        	if ($("#teamSign").val() !=1 ) {
	    		$('#add_cart').addClass('btn-cart-def');
				$("#add_cart").unbind('click');
        	}
			if(data.stock && data.stock.flag){
        		$('#stockFlag').val(data.stock.flag);
        	}else{
        		$('#stockFlag').val(false);
        		$('#add_cart').addClass('btn-cart-def');
        	}
			
			$('#directorder').addClass('btn-buy-def');
			$("#directorder").unbind('click');
			
        }
        if(data.myFeeInfo)
        	feeInfoRender(data);
    }
	$(function() {
        /*删除等待条（跳转页面不加等待条，reason：浏览器会告知进度）
         var wait = createSpinner();
         var $submit = $("#submit_wait");
         registerUnloadEvent($submit,wait);
         $("form").submit(function() {
         showWait($submit,wait);//common.js
         return true;
         });*/
        //pageInit();
        $('#province').live('change', function() {
        	$('#cart').hide();
        	if($(this).val()=='84'){
//        		
//        		//$('#kucun').hide();
        		$('#citytip').hide();
        		$('#countrytip').hide();
        		$('#storeTownInfo').hide();
        		$('#towntip').hide();
        		$('#kucun').hide();
        		$('#stockStatus_1').html('\u65e0\u8d27');
        		$('#add_cart').addClass('btn-cart-def');
    			$('#directorder').addClass('btn-buy-def');
    			$("#add_cart").unbind('click');
    			$("#directorder").unbind('click');
        		return "";     
        	}
        	$('#citytip').show();
    		$('#countrytip').show();
    		$('#storeTownInfo').show();
    		$('#towntip').show();
            provinceChange($(this).val());            
        });

        $('#city').live('change', function() {
        	$('#cart').hide();
            cityChange($(this).val(),$('#province').val());
        });
        
        $('#country').live('change',function(){
        	$('#cart').hide();
        	countryChange($(this).val(),$('#province').val(),$('#city').val());
        });
        $('#town').live('change',function(){
        	$('#cart').hide();
        	townChange($(this).val(),$('#province').val(),$('#city').val(),$('#country').val());
        });
        
//        $('.ware_color').live('click', function() {
//            $('.current_color').css({'border':'1px solid #dacea8'});
////             $(this).removeClass('colorfocus');
//            wareSkuClick($(this).attr('wareId'));
//        });
//        
        $('a[date="noCurrent"]').live('click', function() {
        	//$('#cart').hide();
            wareSkuClick($(this).attr('wareId'));
        });
        
        $('a[date="noCurrentSize"]').live('click',function(){
        	//$('#cart').hide();
        	wareSkuClick($(this).attr('wareId'));
        });
//          $('.ware_size').live('click', function() {
//            $('.current_size').css({'border':'1px solid #dacea8'});
////             $(this).removeClass('colorfocus');
//            wareSkuClick($(this).attr('wareId'));
//        });
        

    });
	
	/*****************************************************************************************
	 * ***************                           以下为 gp 添加                          ***************************
	 * ****************************************************************************************/
	
	var ware_id = $("#currentWareId").val();
	var sid = $('#sid').val();
	var spinnerCache = createSpinner();
	var request = null;

	//打开等待条
	function startSpinner(){
		var screenWidth = parseInt(document.body.clientWidth);
		$("#spinnerCache").css("margin-left",(screenWidth/2-50)+"px");
		$('#spinnerCache').show();
		spinnerCache.spin($("#spinnerCache")[0]);
	}
	//关闭等待条
	function stopSpinner(){
		spinnerCache.stop();
		$('#spinnerCache').hide();
	}
	
	//图片的翻页,缓存及滑动效果开始====================================================
	function getAllImgs(){
		var allImgs = $.trim($('#imgs').val());
		if(allImgs.substring(allImgs.length-1)==','){
			allImgs = allImgs.substring(0,allImgs.length-1);
		}
		return allImgs;
	}
	var imgCache = new Array(getAllImgs().split(',').length);//图片缓存区
	var currentImg = 0;
	var preImgSize = 1;//预加载1张
	function _createImg(url,width,height){
		var img = new Image();//创建一个Image对象，实现图片的预下载
        img.src = url;
        //img.id = 'showPic';
        img.width = width;
        img.height = height;
        img.ontouchstart=tStart;
        img.ontouchmove=tMove;
        img.ontouchend=tEnd;
        return img;
	}
	//预加载
	$(function(){
        preLoadImg();
	});
	function preLoadImg(){
		var allImgs = getAllImgs();
		if(allImgs!=''){
			var imgArr = allImgs.split(',');
			if(!imgCache[currentImg]){
				imgCache[currentImg]=(_createImg(imgArr[currentImg],200,200));
			}
			var tmp;
			for(var i=0;i<preImgSize;i++){
				tmp = currentImg+(i+1);
				if(tmp<imgArr.length){
					if(!imgCache[tmp])
						imgCache[tmp]=(_createImg(imgArr[tmp],200,200));
				}else{
					tmp = tmp-imgArr.length;
					if(!imgCache[tmp])
						imgCache[tmp]=(_createImg(imgArr[tmp],200,200));
				}
				//////////////////////
				tmp = currentImg-(i+1);
				if(tmp<0){
					tmp = imgArr.length+tmp;
					if(!imgCache[tmp])
						imgCache[tmp]=(_createImg(imgArr[tmp],200,200));
				}else{
					if(!imgCache[tmp])
						imgCache[tmp]=(_createImg(imgArr[tmp],200,200));
				}
			}
		}
	}
	function nextImg(){
		var allImgs = getAllImgs();
		currentImg++;
		var imgArr = allImgs.split(',');
		if(currentImg>imgArr.length-1){
			currentImg=0;
		}
		preLoadImg();
		loadImageBack(imgCache[currentImg],1);
	}
	function prevImg(){
		var allImgs = getAllImgs();
		currentImg--;
		var imgArr = allImgs.split(',');
		if(currentImg<0){
			currentImg=imgArr.length-1;
		}
		preLoadImg();
		loadImageBack(imgCache[currentImg],0);
	}
	var startX,startY,endX,endY,absX,absY;
	function tStart(event){
		var touch = event.touches[0];
		startX = touch.pageX;
		startY = touch.pageY;
	}
	function tMove(event){
		var touch = event.touches[0];
		endX = touch.pageX;
		endY = touch.pageY;
		absX = Math.abs(startX-endX);
		absY = Math.abs(startY-endY);
		if(absX>absY){event.preventDefault();}
	}
	function tEnd(event){
		if(absX>absY){
			if(startX>endX){
				nextImg();
			}else{
				prevImg();
			}
		}
		startX = 0,startY=0,endX=0,endY=0,absX=0,absY=0;
	}
	if(document.getElementById('imgSlider'))
	addTouchEvent(document.getElementById('imgSlider'));
	if(document.getElementById('popImg'))
	addTouchEvent(document.getElementById('popImg'));
	function zoomImg(){
		if($('#_mask'))
			$('#_mask').remove();
		var height = ((document.body||document.documentElement).clientHeight+20)+'px';
		var width = '100%';
		var mask = document.createElement("div");
		mask.setAttribute("id", "_mask");
		mask.setAttribute('style','position:absolute;left:0px;top:0px;background-color:rgb(0, 0, 0);filter:alpha(opacity=90);opacity: 0.9;width:'+width+';height:'+height+';z-index:8889;');
		(document.body||document.documentElement).appendChild(mask);
		$('#_mask').click(function(){
			$('#cart').hide();
			if($('#popImg'))
				$('#popImg').hide();
			if($('#_mask'))
				$('#_mask').hide();
		});
		//$('#popImg img').attr('src',imgCache[currentImg].src);
		var top = 400;
		var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
		var allHeight = document.documentElement.clientHeight || document.body.clientHeight;
		document.getElementById('popImg').style.top=((allHeight-top)/2+scrollTop)+'px';
		$('#popImg').show();
	}
	$('#_zoom').click(function(){
		zoomImg();
	})
});
function hidePop(){
	if($('#_mask'))
		$('#_mask').remove();
	$('#popImg').hide();
}

function zoomImgLeft(){
	var scrollleft = window.pageXOffset|| document.documentElement.scrollLeft || document.body.scrollLeft;
	var allWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var left = scrollleft-150+(allWidth/2);
	document.getElementById('popImg').style.left=left+'px';
}
//页面中的js迁移
$(function(){
	var _sid = $("#sid").val(); 
	var _wareId = $("#currentWareId").val();
	jQuery.post(urlEncode('/ware/comments.json',_sid),{"wareId":_wareId},function(d){
		var good = -1 ;
		var all = -1;
		try{
			good = parseInt(d.commentCountMap.scoreCount1);
			all = good+parseInt(d.commentCountMap.scoreCount2)+parseInt(d.commentCountMap.scoreCount3);
		}catch(e){}
		var rate = Math.round(good/all*100);
		if(good>=0 && all>0){
			$('#comments').html('<em>'+all+'</em> \u4eba\u8bc4\u4ef7  <em>'+rate+'%</em> \u597d\u8bc4');
		}else{
			$('#comments').html('<em>'+all+'</em> \u4eba\u8bc4\u4ef7  <em> 100%</em> \u597d\u8bc4');
		}
//		$('#assessNum').html(d.commentCountMap.scoreCount1);
//		var good = -1;
//		var all = -1;
//		try{
//			good = parseInt(d.commentCountMap.scoreCount1);
//			all = good+parseInt(d.commentCountMap.scoreCount2)+parseInt(d.commentCountMap.scoreCount3);
//			$('#assessNum').html(all);
//		}catch(e){}
//		var rate = Math.round(good/all*100);
//		if(good>=0 && all>0){
//			$('#assessStar').css('width',rate+"%");
//			$('#assessRate').html(rate+"%");
//		}
//		$('#assess').show();
	},'json');
	
	 jQuery.post(urlEncode('/ware/orderComment.json',_sid),{"wareId":_wareId},function(d){
	 	if(d.orderCommentCount)
			//$("#orderNum").html(d.orderCommentCount+"&#26465;");
	 	     $('#orderComment').append("("+d.orderCommentCount+")");
	},'json');	
	
	jQuery.post(urlEncode('/ware/consultations.json',_sid),{wareId:_wareId},function(d){
		var html="";
		if(d.commentCount){
			html=d.commentCount;
		}
		if(html!='')
			//$("#adviceNum").html(html+"&#26465;");
			$('#consultations').append("("+html+")");
	},'json');
	
	$('#attention').click(function(){
		if($('#attention').hasClass("on")){
			jQuery.ajax({"url":urlEncode('/user/cancelFavorite.json',_sid),"data":{"wareId":$('#currentWareId').val()},"success":function(d){
				try{
					var obj = eval('('+d+')');
					endTime = new Date().getTime()/1000 + 3;
					$('#attention').removeClass('on');
					iconShow(0);
				}catch(e){
					if('true' == $('#passportUse').val()){
						window.location.href='https://passport.m.jd.com/user/login.action?sid='+_sid+'&returnurl=http://m.jd.com/product/'+$('#currentWareId').val()+'.html';
					}else{
						window.location.href='/user/login.action';
					}
				}},"error":function(d){
					if('true' == $('#passportUse').val()){
						window.location.href='https://passport.m.jd.com/user/login.action?sid='+_sid+'&returnurl=http://m.jd.com/product/'+$('#currentWareId').val()+'.html';
					}else{
						window.location.href='/user/login.action';
					}
				}
			})
		}else{
			jQuery.ajax({"url":urlEncode('/user/addFavorite.json',_sid),"data":{"wareId":$('#currentWareId').val()},"success":function(d){
				try{
					var obj = eval('('+d+')');
					endTime = new Date().getTime()/1000 + 3;
					$('#attention').addClass('on');
					iconShow(1);
				}catch(e){
					if('true' == $('#passportUse').val()){
						window.location.href='https://passport.m.jd.com/user/login.action?sid='+_sid+'&returnurl=http://m.jd.com/product/'+$('#currentWareId').val()+'.html';
					}else{
						window.location.href='/user/login.action';
					}
				}},"error":function(d){
				if('true' == $('#passportUse').val()){
					window.location.href='https://passport.m.jd.com/user/login.action?sid='+_sid+'&returnurl=http://m.jd.com/product/'+$('#currentWareId').val()+'.html';
				}else{
					window.location.href='/user/login.action';
				}
				}
			});
		}
		
		
	});
});
var endTime;
function changeProvince(){
	var selectIndex = document.getElementById("province").selectedIndex;
	var childrens = $('#provincetip').children();
	if(childrens.size()!=2)return;
	var text = document.getElementById("province").options[selectIndex].text;
	var nodeChild = childrens.eq(1);
	nodeChild.html(nodeChild.html().replace(/<script.*<\/script>/,''));
	$('#provincetip').html('');
	$('#provincetip').append(childrens.eq(0));
	$('#provincetip').append(nodeChild);
	document.getElementById('province').selectedIndex = selectIndex;
	$('#provincetip').append(text);
	$('#provinceName').val(text);
	//nodeChild.remove('script');
	//$('#provincetip').append(nodeChild);
	//$('#provincetip').append(document.getElementById("province").options[selectIndex].text);
	//$('#provincetip').html(document.getElementById("province").options[selectIndex].text);
}
function changeCity(){
	var selectIndex = document.getElementById("city").selectedIndex;
	$('#citytip').html(document.getElementById("city").options[selectIndex].text);
}
function changeCountry(){
	var selectIndex = document.getElementById("country").selectedIndex;
	$('#countrytip').html(document.getElementById("country").options[selectIndex].text);
}
function changeTown(){
	var selectIndex = document.getElementById("town").selectedIndex;
	$('#towntip').html(document.getElementById("town").options[selectIndex].text);
}


function iconShow(e){
	var nowTime = new Date().getTime()/1000;
	var time = Math.floor(endTime - nowTime);
	if(time > 0){
		setTimeout("iconShow()",1000);
		var scrollleft = window.pageXOffset|| document.documentElement.scrollLeft || document.body.scrollLeft;
    	var allWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var left = scrollleft-60+(allWidth/2);
    	document.getElementById('save').style.left=left+'px';	
		var scrollheight = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
    	var allHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var top = scrollheight-25+(allHeight/2);
    	document.getElementById('save').style.top=top+'px';
    	if(1==e)
    		$('#guanzhu').html("\u5173\u6ce8\u6210\u529f");
    	if(0==e)
    		$('#guanzhu').html("\u53d6\u6d88\u6210\u529f");
		$('.pop-attention').show();
	}else{
		$('.pop-attention').hide();
	}
}
function getLeft(){
	var scrollleft = window.pageXOffset|| document.documentElement.scrollLeft || document.body.scrollLeft;
	var allWidth = document.documentElement.clientWidth || document.body.clientWidth;
	var left = scrollleft-114+(allWidth/2);
	var left2 = scrollleft-135+(allWidth/2);
	document.getElementById('cart').style.left=left+'px';
	document.getElementById('tip').style.left=left2+'px';
}
$(function(){
	getLeft();
	zoomImgLeft();
	$(window).bind('resize',function(){
		getLeft();
		zoomImgLeft();
	});
})
var loading = '&#21162;&#21147;&#21152;&#36733;&#20013;...';//努力加载中
$(function(){
	$('#btnDetail').click(function(){
		var sid = $("#sid").val();
		var wareId = $("#currentWareId").val();
		if(wareId == $('#showdetail').attr('wareId')){
			return;
		}
		$('#detailContent').html(loading);
		$('#showdetail').attr('wareId',wareId);
		jQuery.get('/ware/detail.json', {
			'wareId':wareId,
			'sid' : sid
		}, function(data) {
		var html = '';
			if(data && data.ware && data.ware.isbook){
				html = html+
					'<div class="new-gd-introduce">'+
	                	'<h3 class="new-h-h3 new-mg-b10">&#22522;&#26412;&#20449;&#24687;</h3>';//基本信息
						if(data && data.ware && data.ware.attrs){
	                        for(var i=0,len=data.ware.attrs.length;i<len;i++){
	                            html+='<span class="new-span-block">'+data.ware.attrs[i].label+' '+data.ware.attrs[i].value+'</span>'; 
							}
						}
	                    html=html+
	                '</div>'+
	                '<div class="new-gd-introduce">'+
	                	'<h3 class="new-h-h3 new-mg-tb10">&#22270;&#20070;&#20869;&#23481;</h3>';//图书内容
						if(data.ware.wdis && data.ware.wdis.length>0){
	            			html+=('<p class=" new-mg-b10">'+data.ware.wdis+'</p>');
	            		}else{
							html+='<p class=" new-mg-b10">&#26242;&#26080;&#20171;&#32461;</p>';//暂无介绍
						}
	                html=html+'</div>'+
	                '<div class="new-gd-introduce">'+
	                	'<h3 class="new-h-h3 new-mg-tb10">&#30446;&#24405;</h3>'+//目录
	                    '<span class="new-span-block">'+(data.ware.catalogue.replace(/\n/g,"<br/>"))+'</span>'+
	                '</div>';
			}else{
				html = html+
					'<div class="new-gd-introduce">'+
	                	'<h3 class="new-h-h3 new-mg-tb10">&#21830;&#21697;&#20171;&#32461;</h3>';//商品介绍
						if(data.ware.wdis && data.ware.wdis.length>0){
	            			html+=('<p class=" new-mg-b10">'+data.ware.wdis+'</p>');
	            		}else{
							html+='<p class=" new-mg-b10">&#26242;&#26080;&#20171;&#32461;</p>';//暂无介绍
						}
	                html=html+'</div>'+
	                '<div class="new-gd-introduce">'+
	                	'<h3 class="new-h-h3 new-mg-tb10">&#35268;&#26684;&#21442;&#25968;</h3>';//规格参数
						if(data.ware.wi && data.ware.wi.code && data.ware.wi.code.length>0){
	            			html+=('<p class=" new-mg-b10">'+data.ware.wi.code+'</p>');
	            		}else{
							html+='<p class=" new-mg-b10">&#26242;&#26080;</p>';//暂无
						}
	                html=html+'</div>'+
	                '<div class="new-gd-introduce">'+
	                	'<h3 class="new-h-h3 new-mg-tb10">&#21253;&#35013;&#28165;&#21333;</h3>';//包装清单
	                    if(data.ware.wi && data.ware.wi.wareQD && data.ware.wi.wareQD.length>0){
	            			html+=('<p class=" new-mg-b10">'+data.ware.wi.wareQD+'</p>');
	            		}else{
							html+='<p class=" new-mg-b10">&#26242;&#26080;</p>';//暂无
						}
	                html=html+'</div>'+
	                '<div class="new-gd-introduce new-border-none">'+
	                	'<h3 class="new-h-h3 new-mg-tb10">&#21806;&#21518;&#26381;&#21153;</h3>';//售后服务
	                    if(data.ware.wi && data.ware.wi.ybInfo && data.ware.wi.ybInfo.length>0){
	            			html+=('<p class=" new-mg-b10">'+data.ware.wi.ybInfo+'</p>');
	            		}else{
							html+='<p class=" new-mg-b10">&#26242;&#26080;</p>';//暂无
						}
	                html=html+'</div>';
			}
			$('#detailContent').html(html);
		},"json");
	});
})
var assessPageNo = 1;
function assessRender(isPage){
		var sid = $("#sid").val();
	var wareId = $("#currentWareId").val();
	var score = 0;
	if($('#_tabGoodScale').hasClass('on')){
		score = 5;
	}else if($('#_tabMediumScale').hasClass('on')){
		score = 3;
	}else if($('#_tabBadScale').hasClass('on')){
		score = 1;
	}
	//default
	if(!isPage){
	$('#_assessScale').html(0);
	$('#_goodScale').html('&#65288;0%&#65289;');
	$('#_mediumScale').html('&#65288;0%&#65289;');
	$('#_badScale').html('&#65288;0%&#65289;');
	$('#_goodScaleImg').css('width','0%');
	$('#_mediumScaleImg').css('width','0%');
	$('#_badScaleImg').css('width','0%');
	$('#goodNum').html(0);
	$('#mediumNum').html(0);
	$('#badNum').html(0);
	}
	$('#_assessItem').html(loading);
	$('#_assessPage').html('');
	jQuery.get('/ware/comments.json', {
		'wareId':wareId,
		'sid' : sid,
		'score':(score>0?score:''),
		'page':assessPageNo
	}, function(data) {
		$('#_assessItem').html('<div class="new-cp-prom2"><span class="new-logo2"></span><strong class="new-span-block">&#25265;&#27465;&#26242;&#26102;&#27809;&#26377;&#30456;&#20851;&#32467;&#26524;</strong></div>');//抱歉暂时没有相关结果
		var sid = $("#sid").val();
		var wareId = $("#currentWareId").val();
		if(!data){return;}
		//总条数,用于处理data.commentCount==0时，但是有数据时的异常情况
		var count = data.commentCount;
		if (count == 0 && data.comments.length != 0) {
			count = data.comments.length;
		}
		//head
		if(data.commentCountMap){
			var goodNum = data.commentCountMap.scoreCount1;
			var mediumNum = data.commentCountMap.scoreCount2;
			var badNum = data.commentCountMap.scoreCount3;
			var allNum = goodNum + mediumNum + badNum;
			if(goodNum>0)
				$('#goodNum').html(goodNum);
			if(mediumNum>0)	
				$('#mediumNum').html(mediumNum);
			if(badNum>0)
				$('#badNum').html(badNum);
			if(allNum>0){
				var goodScale = Math.round(goodNum/allNum*100);
				var mediumScale = Math.round(mediumNum/allNum*100);
				var badScale = Math.round(badNum/allNum*100);
				$('#_assessScale').html(goodScale);
				$('#_goodScale').html('&#65288;'+goodScale+'%&#65289;');
				$('#_mediumScale').html('&#65288;'+mediumScale+'%&#65289;');
				$('#_badScale').html('&#65288;'+badScale+'%&#65289;');
				$('#_goodScaleImg').css('width',goodScale+'%')
				$('#_mediumScaleImg').css('width',mediumScale+'%')
				$('#_badScaleImg').css('width',badScale+'%')
			}
		}
		//data
		if(data.comments && data.comments.length>0){
			var html = '';
			for(var i=0,len=data.comments.length;i<len;i++){
				var comment = data.comments[i]
				var userId = comment.userId || '';
				if(userId.length > 10) {
					userId=comment.userId.substring(0,10)+"...";
				}
                var uri = urlEncode("/ware/commentDetail/"+wareId+"_"+comment.commentId+".html",sid);
				html = html+
				'<div class="new-gd-introduce" onclick="window.location.href=\''+uri+'\'">'+        	
                    '<div class="new-mg-t10">'+(
                    	comment.pros!='' && comment.pros!='娌℃湁鎻忚堪'?'<span class="new-gd-txt2"><span class="new-fl">&#20248;&#28857;&#65306;</span><span class="new-gd-txt3">'+comment.pros+'</span></span>':'')+//优点
                        (comment.cons!='' && comment.cons!='娌℃湁鎻忚堪'?'<span class="new-gd-txt2"><span class="new-fl">&#19981;&#36275;&#65306;</span><span class="new-gd-txt3">'+comment.cons+'</span></span>':'')+//不足
                        (comment.content!='' && comment.content!='娌℃湁鎻忚堪'?'<span class="new-gd-txt2"><span class="new-fl">&#24515;&#24471;&#65306;</span><span class="new-gd-txt3">'+comment.content+'</span></span>':'')+//心得
                    '</div>'+
                    '<div class="new-p-re new-mg-t10">'+
                    	'<span class="new-mu-star"><span class="new-mu-starv" style="width:'+(comment.score*20)+'%"></span></span><span class="new-gd-user">'+userId+' '+(comment.creationTime.length>10?comment.creationTime.substring(0,10):comment.creationTime)+'</span>'+
                    '</div>'+
                '</div>';
			}
			$('#_assessItem').html(html);
		}else{
			$('#_assessItem').html('<div class="new-cp-prom2"><span class="new-logo2"></span><strong class="new-span-block">&#25265;&#27465;&#26242;&#26102;&#27809;&#26377;&#30456;&#20851;&#32467;&#26524;</strong></div>');
		}
		//page
		var totalPage = data.totalPage || 0;
		if(totalPage>100)totalPage = 100;
		var currentPage = assessPageNo;
		if(totalPage>0){
			var html = ''+
				'<div class="new-tbl-type">'+
	            	'<div class="new-tbl-cell">'+
	                	(assessPageNo!=1?'<a href="javascript:prevAssess()" class="new-a-prve"><span>&#19978;&#19968;&#39029;</span></a>':'<span class="new-a-prve"><span>&#19978;&#19968;&#39029;</span></span>')+//上一页
	                '</div>'+
	                '<div class="new-tbl-cell new-p-re">'+
	                	'<div class="new-a-page">'+
	                    	'<span class="new-open">'+assessPageNo+'/'+totalPage+'</span>'+
	                    '</div>'+
	                    '<select class="new-select" id="_assessSelectNo" onchange = "goSelectPage()">';
	                    for(var i=0;i<totalPage;i++){
							html+='<option value="'+(i+1)+'" '+(i+1==currentPage?'selected':'')+'>&#31532;'+(i+1)+'&#39029;</option>';//第页
						}
	                    html = html+'</select>'+
	                '</div>'+
	                '<div class="new-tbl-cell">'+
	                	(currentPage!=totalPage?'<a href="javascript:nextAssess()" class="new-a-next"><span>&#19979;&#19968;&#39029;</span></a>':'<span class="new-a-next"><span>&#19979;&#19968;&#39029;</span></span>')+//下一页
	                '</div>'+
	            '</div>';
			$('#_assessPage').html(html);
		}else{
			$('#_assessPage').html('');
		}
	},"json");
}
$(function(){
	$('#btnAssess').click(function(){
			assessPageNo = 1;
			assessRender(false);
	});
})
function nextAssess(){
		assessPageNo++;
		assessRender(true);
}
function prevAssess(){
		assessPageNo--;
		assessRender(true);
}
function goSelectPage(){
		assessPageNo = $('#_assessSelectNo').val();
	assessRender(true);
}
function changeAssessType(obj){
		var id = obj.id;
	if(id!='_tabGoodScale'){
		$('#_tabGoodScale').removeClass('on');
	}
	if(id!='_tabMediumScale'){
		$('#_tabMediumScale').removeClass('on');
	}
	if(id!='_tabBadScale'){
		$('#_tabBadScale').removeClass('on');
	}
		if($(obj).hasClass('on')){
		$(obj).removeClass('on');
	}else{
		$(obj).addClass('on');
	}
	assessPageNo = 1;
		assessRender(true);
}