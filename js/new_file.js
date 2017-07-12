
	$(document).ready(function(){
		
		$(function(){
			$("#input").keypress(function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);  
			if(keycode==13){
				addlist();
			}
			});
			
			update();
		}).on('click','i',function(){
			var $this = $(this);
			
			checkone($this);
		}).on('click','#allbtn',function(){    		  //全选按钮
			var $this = $(this);	
			
			allcheck($this);
		}).on('click','.close_svg',function(){
			var $this=$(this);
			
			deleteitem($this);
		}).on('click','.search-type',function(){
			if($(this).hasClass('active')){
				return;
			}
			$('.search-type').removeClass('active');
			$(this).addClass('active');
			update();
		}).on('click','.clear',function(){
			clearcompleted();
		}).on('blur','li input',function(){
			var $this=$(this);
			modify($this);
		})
		
				
		function addlist(){    //增加新项目
			var item=$("#input").val();
			if($.trim(item)==''){
				alert("请输入正确的格式");
			}
			else{		
			 if(window.localStorage) {		//支持localstorage
			 	var list=localStorage.getItem("itemlist");
			 	var num=parseInt(localStorage.getItem("num"));
			 	var id=parseInt(localStorage.getItem("id"));
			 	if(list && list!='null' ){   //localstorge不为空
					var jsonarray = $.parseJSON(list);
					var newitem={
						"item"   :item,
						"status" :"false",
						"id"     : ++id
					}
					jsonarray.push(newitem);
					localStorage.setItem("itemlist",JSON.stringify(jsonarray));
					localStorage.setItem("num",++num);
					localStorage.setItem("id",id);
			 	}
			 	else{		//localstorge为空
			 		var itemlist=[{
			 			"item"   : item,
			 			"status" : "false",
			 			"id"     : 1 
			 		}];
			 		localStorage.setItem("itemlist",JSON.stringify(itemlist));
			 		localStorage.setItem("num",1);
			 		localStorage.setItem("checknum",0);
			 		localStorage.setItem("id",1);
			 	}
				}
			$("#input").val("");
			update();
			}
		}
		
		function update(){   //更新项目
			var tmpl='';
			var list=$.parseJSON(localStorage.getItem("itemlist"));
			var num=parseInt(localStorage.getItem("num"));
			var checknum=parseInt(localStorage.getItem("checknum"));
			if("Active"==$('.active').html()){
				for(var o in list){
					if(list[o].status=="false"){
						tmpl+='<li data-id="'+list[o].id+'">'+
						  '<i class="icon-ok-circle icon-2x '+(list[o].status=="true"?'checked' :'')+'"></i>'+
						  '<input type="text" value="'+list[o].item+'" class="'+(list[o].status=="true"?'done' :'')+'">'+
						  '<span class="close_svg"></span>'+
						  '</li>';
					}
				}
			}
			else if("Completed"==$('.active').html()){
				for(var o in list){
					if(list[o].status=="true"){
						tmpl+='<li data-id="'+list[o].id+'">'+
						  '<i class="icon-ok-circle icon-2x '+(list[o].status=="true"?'checked' :'')+'"></i>'+
						  '<input type="text" value="'+list[o].item+'" class="'+(list[o].status=="true"?'done' :'')+'">'+
						  '<span class="close_svg"></span>'+
						  '</li>';
					}
				}
			}
			else{
				for(var o in list){  
					tmpl+='<li data-id="'+list[o].id+'">'+
						  '<i class="icon-ok-circle icon-2x '+(list[o].status=="true"?'checked' :'')+'"></i>'+
						  '<input type="text" value="'+list[o].item+'" class="'+(list[o].status=="true"?'done' :'')+'">'+
						  '<span class="close_svg"></span>'+
						  '</li>';
      			}  
      		}
			$(".listarea ul").html(tmpl);
			if(isNaN(num)) num=0;
			$(".info").html(num+' items');
			if(num==checknum&&num!=0) $("#allbtn").addClass('checked');
			else  $("#allbtn").removeClass('checked');
		}
		
		function deleteitem(obj){   //删除项目
			var $this=obj;
			var list=$.parseJSON(localStorage.getItem("itemlist"));
			var num=parseInt(localStorage.getItem("num"));
			var checknum=parseInt(localStorage.getItem("checknum"));
			var id=$this.parent().attr("data-id");
			for(var i in list){
				if(list[i].id==id){
					list.splice(i,1); 					//删除i位置的1个元素
				}
			}
			localStorage.setItem("itemlist",JSON.stringify(list));
			localStorage.setItem("num",--num);
			if($this.siblings("i").hasClass("checked")){
				localStorage.setItem("checknum",--checknum);
			}
			update();	
		}
		
		function allcheck(obj){    //全选
			var $this=obj;
			var list=$.parseJSON(localStorage.getItem("itemlist"));
			var num=parseInt(localStorage.getItem("num"));
			if($this.hasClass('checked')){
				for(var i in list){
					list[i].status="false";
				}
				$this.removeClass('checked');		  //dom操作
				localStorage.setItem("checknum",0);
			}
			else{
				for(var i in list){
					list[i].status="true";
				}
				$this.addClass('checked'); 	     	  //dom操作
				localStorage.setItem("checknum",num);
			}
			localStorage.setItem("itemlist",JSON.stringify(list));
			update();
		}
		
		function checkone(obj){    //完成一项
			var $this=obj;
			if($this.attr("id")=="allbtn"){
				return;
			}
			$this.toggleClass("checked");
			$this.siblings("input").toggleClass("done");	//dom操作
			
			var id=$this.parent().attr("data-id");
			var list=$.parseJSON(localStorage.getItem("itemlist"));
			var checknum=parseInt(localStorage.getItem("checknum"));
			for(var i in list){									//后台操作
				if(list[i].id==id){
					if(list[i].status=="true") {
						list[i].status="false";
						localStorage.setItem("checknum",--checknum);
					}
					else {
						list[i].status="true";
						localStorage.setItem("checknum",++checknum);
					}
				}
			}
			localStorage.setItem("itemlist",JSON.stringify(list));
			update();
		}
		
		function clearcompleted(){     //清除已完成
			var list=$.parseJSON(localStorage.getItem("itemlist"));
			var num=parseInt(localStorage.getItem("num"));
			var checknum=parseInt(localStorage.getItem("checknum"));
			for(var i =list.length-1;i>=0;i--){
				if(list[i].status=="true"){
					list.splice(i,1); 
					num--;
					checknum--;
				}
			}
			localStorage.setItem("itemlist",JSON.stringify(list));
			localStorage.setItem("num",num);
			localStorage.setItem("checknum",checknum);
			update();
		}
		
		function modify(obj){            //更改内容
			var $this=obj;
			if($this.val()==''){
				deleteitem($this);
			}
			else{
				var id=$this.parent().attr("data-id");
				var list=$.parseJSON(localStorage.getItem("itemlist"));
				for(var i in list){
					if(list[i].id==id){
						list[i].item=$this.val();
					}
				}
				localStorage.setItem("itemlist",JSON.stringify(list));
				update();
			}
		}
		
	})
	