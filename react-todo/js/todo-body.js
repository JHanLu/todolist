
class TodoApp extends React.Component{
	constructor(){
		super();
		this.state = {
			list: [{title:"点我进入编辑模式",status: false}],
			num: 1,
			checknum: 0,
			type: "All"
		}		
	}
	addHandle(e){
		let val=$.trim(e.target.value);
		if(val=='') {alert("请输入正确的格式")}
		else{
			let list=this.state.list;
			list=list.concat([{title: val,status: false}]);
			this.setState({
				list: list,
				num: ++this.state.num
			})
			e.target.value="";
		}
	}
	checkHandle(index){
		let list=this.state.list;
		list[index].status=!list[index].status;
		this.setState({
			list: list,
			checknum: list[index].status?(++this.state.checknum):(--this.state.checknum)
		})
	}
	delHandle(index){
		let list=this.state.list;
		let checknum=list[index].status==true?(--this.state.checknum):(this.state.checknum);
		console.log(checknum)
		list=list.splice(index,1);
		this.setState({
			//list: list,
			num: --this.state.num,
			checknum: checknum
		})
	}
	switchHandle(type){
		this.setState({
			type: type
		})
	}
	delAllHandle(){
		let list=this.state.list;
		for(let i=list.length-1;i>=0;i--){
			if(list[i].status==true){
				list.splice(i,1);
				this.setState({
					list: list,
					num: --this.state.num,
					checknum: --this.state.checknum
				})
			}
		}
	}
	allHandle(){
		//全选按钮目前为绿色
		if(this.state.num==this.state.checknum&&this.state.num!=0){
			let list=this.state.list;
			list.map((item,index) => {
				item.status=false;
			})
			this.setState({
				list: list,
				checknum: 0
			})
		}
		//全选按钮目前为灰色
		else{
			let list=this.state.list;
			list.map((item,index) => {
				item.status=true;
			})
			this.setState({
				list: list,
				checknum: this.state.num
			})
		}
	}
	render(){
		return(
			<div className="main">
				{/*输入框*/}
				<div className="inputline">
        			<i className={"icon-ok-circle icon-2x " + ((this.state.num==this.state.checknum&&this.state.num!=0)?"checked":"")} onClick={this.allHandle.bind(this)} ref="allbtn" 
        			id="allbtn" />
       				<form>
          			<input type="text" id="input" placeholder="What Needs To Be Done" autoComplete="off" onKeyDown={(e)=>{e.keyCode==13?this.addHandle(e):undefined}} />
          			<input type="text" style={{display: 'none'}} />
        			</form>
     			</div>
     			{/*待办事项*/}
     			<div className="listarea">
				{
					this.state.list.map((item,index) => {
						if(this.state.type=="All"){
						return(
						      <li key={index}>
						      		<i className={"icon-ok-circle icon-2x " + (item.status==true?"checked":"")} onClick={this.checkHandle.bind(this,index)}/>
						     		<input type="text" defaultValue={item.title} className={(item.status==true?"done":"")} />
						     		<i className="icon-remove icon-2x close_svg" onClick={this.delHandle.bind(this,index)}/>
						      </li>
						)}
						else if(this.state.type=="Completed"){
							if(item.status==true){
								return(
								      <li key={index}>
								      		<i className={"icon-ok-circle icon-2x " + (item.status==true?"checked":"")} onClick={this.checkHandle.bind(this,index)}/>
								     		<input type="text" defaultValue={item.title} className={(item.status==true?"done":"")} />
								     		<i className="icon-remove icon-2x close_svg" onClick={this.delHandle.bind(this,index)}/>
								      </li>
								)}		
						}
						else if(this.state.type=="Active"){
							if(item.status==false){
								return(
								      <li key={index}>
								      		<i className={"icon-ok-circle icon-2x " + (item.status==true?"checked":"")} onClick={this.checkHandle.bind(this,index)}/>
								     		<input type="text" defaultValue={item.title} className={(item.status==true?"done":"")} />
								     		<i className="icon-remove icon-2x close_svg" onClick={this.delHandle.bind(this,index)}/>
								      </li>
								)}									
						}
					})
				}
				</div>
     			{/*页脚选项*/}
				<footer>
		        	<span className="info">{this.state.checknum} items left</span>
		        	<ul>
		          		<li><a href="javascript:" className={"search-type "+(this.state.type=="All"?"active":"")} onClick={this.switchHandle.bind(this,"All")}>All</a></li>
		          		<li><a href="javascript:" className={"search-type "+(this.state.type=="Active"?"active":"")} onClick={this.switchHandle.bind(this,"Active")}>Active</a></li>
		          		<li><a href="javascript:" className={"search-type "+(this.state.type=="Completed"?"active":"")} onClick={this.switchHandle.bind(this,"Completed")}>Completed</a></li>	
		        	</ul>
		        		<a href="javascript:" className="clear" onClick={this.delAllHandle.bind(this)}>Clear completed</a>
		      	</footer>     			   			
			</div>
		)
	}
}
class TodoBody extends React.Component{
	render(){
		return(
			<div>
				<h1>TODOS</h1>
				<TodoApp />
			</div>
		)
	}
}

ReactDOM.render(
	<TodoBody />,
	document.getElementById("root")
);