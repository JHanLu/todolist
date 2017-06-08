	function update(){//更新item数量
				var list=document.getElementById("listdiv");
				var childs=list.childNodes;
				var j=0;
				for(var i=0;i<childs.length;i++){
					if(childs[i].childNodes[0].style.color!="green")
					{
						j++;
					}
				}
				var items=document.getElementById("items");
				if(j>1){
				items.innerHTML=j+" items left";
				}else{
					items.innerHTML=j+" item left";
					if(j==0){
						document.getElementById("allbtn").style.color="green";
					}
				}
				if(childs.length==0){
					document.getElementById("allbtn").style.color="grey";
				}
			}
			function addlist(){//添加list
				var listdiv=document.getElementById("listdiv");
				var input=document.getElementById("input");
				var compelete=document.getElementsByTagName("a")[2];
				var text=input.value;
				if(text!=""){
					var newline=document.createElement("div");
					newline.setAttribute("class","listline");
					var newicon=document.createElement("i");
					newicon.setAttribute("class","icon-ok-circle icon-2x");
					newicon.setAttribute("onclick","check(this)");
					var newtext=document.createElement("input");
					newtext.setAttribute("type","text");
					newtext.setAttribute("value",text);
					newtext.setAttribute("onblur","modify(this)")
					//newtext.setAttribute("readonly","true");
					var deletebtn=document.createElement("div");
					deletebtn.setAttribute("class","delete");
					deletebtn.setAttribute("onclick","deletelist(this)");
					deletebtn.innerHTML="x";
					newline.appendChild(newicon);
					newline.appendChild(newtext);
					newline.appendChild(deletebtn);
					listdiv.appendChild(newline);
					document.getElementById("allbtn").style.color="grey";
					if(compelete.className=="selected"){
						select(compelete);
					}
				}
				input.value="";		
				update();
			}
			function check(obj){
				var parent=obj.parentNode;
				var childs=parent.childNodes;
				var active=document.getElementsByTagName("a")[1];
				var compelete=document.getElementsByTagName("a")[2];
				if(obj.style.color!="green")
				{
					childs[1].setAttribute("class","done");
					obj.style.color="green";
					if(active.className=="selected"){
						obj.parentNode.style.display="none";
					}

				}else{
					childs[1].setAttribute("class","undone");
					obj.style.color="grey";
					document.getElementById("allbtn").style.color="grey";
					if(compelete.className=="selected"){
						obj.parentNode.style.display="none";
					}
				}
				update();
			}
			function checkall(obj){
				var list=document.getElementById("listdiv");
				var listchilds=list.childNodes;
				var active=document.getElementsByTagName("a")[1];
				var compelete=document.getElementsByTagName("a")[2];
				if(obj.style.color!="green"){
				for(var i=0;i<listchilds.length;i++){
					childs=listchilds[i].childNodes;
					childs[1].setAttribute("class","done");
					childs[0].style.color="green";
					obj.style.color="green";
					}
					if(active.className=="selected"){
						select(active);
					}
					else if(compelete.className=="selected"){
						select(compelete);
					}
				}else{
						for(var i=0;i<listchilds.length;i++){
						childs=listchilds[i].childNodes;
						childs[1].setAttribute("class","undone");
						childs[0].style.color="grey";
						obj.style.color="grey";
						}
						if(active.className=="selected"){
							select(active);
						}
						else if(compelete.className=="selected"){
							select(compelete);
						}
					}
				update();
				}
			function select(obj){//选择分类
				var alist=document.getElementsByTagName("a");
				for(var i=0;i<alist.length;i++){
					alist[i].setAttribute("class","unselected");
				}
				obj.setAttribute("class","selected");
				if(obj.innerHTML=="All"){
					var lists=document.getElementsByClassName("listline");
					for(var i=0;i<lists.length;i++){
						lists[i].style.display="block";
					}
				}
				else if(obj.innerHTML=="Active"){
					var lists=document.getElementsByClassName("listline");
					for(var i=0;i<lists.length;i++){
						if(lists[i].childNodes[1].className=="done"){
							lists[i].style.display="none";
						}
						else{
							lists[i].style.display="block";
						}
					}
				}
				else if(obj.innerHTML=="Compeleted"){
					var lists=document.getElementsByClassName("listline");
					for(var i=0;i<lists.length;i++){
						if(lists[i].childNodes[1].className!="done"){
							lists[i].style.display="none";
						}
						else{
							lists[i].style.display="block";
						}
					}
				}
			}
			function deletelist(obj){//删除
				var parent=obj.parentNode;
				parent.parentNode.removeChild(parent);
				update();
			}
			function modify(obj){//更改
				if(obj.value==""){
					var parent=obj.parentNode;
					parent.parentNode.removeChild(parent);
					update();
				}
			}