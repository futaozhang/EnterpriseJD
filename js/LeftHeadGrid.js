var LeftHeadGrid = function(config) {
	this.rowHeads = config.rowHeads != null ? config.rowHeads: [];//name
	this.columnDatas = config.columnDatas != null ? config.columnDatas: [];
	this.width = config.width != null ? config.width: "";
	this.id = config.id != null ? config.id: "TreGrid";
	this.perUnitWidth = config.perUnitWidth != null ? config.perUnitWidth: 10;
	this.innerWidth = 0;
	this.innerLWidth = 0;
	this.height = 0;
	this.title = config.title != null ? config.title: "";
	this.noDataStr = config.noDataStr != null ? config.noDataStr: "no data";
}
LeftHeadGrid.prototype.createGrid = function(){
	var totalwidth = 0;
	var tableHtml = "<table>";
	for(var i=0;i<this.rowHeads.length;i++){
		 var obj = this.rowHeads[i];
		 var width = obj.width;
		 totalwidth = totalwidth + parseInt(width);
		 var rownameobj = obj.rowname;
		 
		 for(var j=0;j<rownameobj.length;j++){
		 	   var nameobj = rownameobj[j];
		 	   if(j==rownameobj.length-1){ 
		 	   	  tableHtml = tableHtml + "<tr><td class='bluelast' width='" + width + "px'>" + nameobj.name + "</td></tr>";
			 	 }else{
				   tableHtml = tableHtml + "<tr><td class='bluefirst' width='" + width + "px'>" + nameobj.name + "</td></tr>";
				 }
				 this.height = this.height + 40;
		 }
	}
	tableHtml = tableHtml + "</table>";
	var	headHtml = "<div class='leftheadcss' style='width:" + totalwidth + "px;'>";
	headHtml = headHtml + tableHtml + "</div>";
	this.innerLWidth = totalwidth;
	this.innerWidth = this.width-totalwidth-5;
	return headHtml;
}
LeftHeadGrid.prototype.RenderTo =function(divId){
	
  //var innerWidth = this.width-100;
	var headHtml = this.createGrid();
	var html = "<div id='outframe' class='outframecss' style='width:" + this.width + "px;'>"
		     + headHtml 
				+ "<div id='dataframe' class='dataframecss' style='width:" + this.innerWidth + "px;'>"
					+ "<div id='leftgriddataview' class='innerdivcss'>"
					+ "</div>"
			  + "</div>"
	  + "</div>"
	html = "<div id='divtitle' class='grittitle' style='width:" + this.width + "px;height:30px'><big>" + this.title + "</big></div>"
	   + html + "</div>";
	document.getElementById(divId).innerHTML = html;
	this.show();
}
LeftHeadGrid.prototype.show = function(){
	if(this.columnDatas && this.columnDatas.length>0){
		 var obj = this.columnDatas[0];
		 var widthArr = obj.width;
		 var rows = obj.rows;
		 var totalWidth = 0;
		 for(var i=0;i<widthArr.length;i++){
		 	   widthArr[i] = parseInt(widthArr[i])*this.perUnitWidth;
		 	   totalWidth = totalWidth + widthArr[i];
		 }
		 var tableHtml = "<table width='"+totalWidth +"'>";
	   for(var i=0;i<rows.length;i++){
	   	   var rowvalueArr = rows[i];
	   	   tableHtml = tableHtml + "<tr>";
	   	   for(var j=0;j<rowvalueArr.length;j++){
	   	   	  tableHtml = tableHtml + "<td width='"+widthArr[j]+"px'>" + rowvalueArr[j] + "</td>";
	   	   }
	   	   tableHtml = tableHtml + "</tr>";
	   }
	   tableHtml = tableHtml + "</table>";
	   if(this.innerWidth>totalWidth){
	   	  document.getElementById("dataframe").style.width=(parseInt(totalWidth))+"px";
	   	  document.getElementById("divtitle").style.width=(parseInt(this.innerLWidth)+parseInt(totalWidth))+"px";
	   	  document.getElementById("outframe").style.width=(parseInt(this.innerLWidth)+parseInt(totalWidth)+4)+"px";
	   }
	   document.getElementById("leftgriddataview").innerHTML = tableHtml;
  }else{
  	 document.getElementById("leftgriddataview").style.height=(this.height+4)+"px";
  	 document.getElementById("leftgriddataview").innerHTML = this.noDataStr;
  }
}
LeftHeadGrid.prototype.addData = function(data){
	this.columnDatas = data;
	this.show();
}
LeftHeadGrid.prototype.getData = function(){
	var rtnObj = new Array();
	if(this.columnDatas && this.columnDatas.length>0){
		 var obj = this.columnDatas[0];
		 var widthArr = obj.width;
		 var rows = obj.rows;
		 for(var i=0;i<rows.length;i++){
	   	   var rowvalueArr = rows[i];
	   	   for(var j=0;j<rowvalueArr.length;j++){
	   	   	  if(j==0){
	   	   	  	 rtnObj[i] = rowvalueArr[j];
	   	   	  }else{
	   	   	  	 rtnObj[i] = rtnObj[i] + "," + rowvalueArr[j];
	   	   	  }
	   	   }
	   }
	}
	return rtnObj;
}
LeftHeadGrid.prototype.getHead = function(){
	var rtnObj = new Array();
	for(var i=0;i<this.rowHeads.length;i++){
		 var obj = this.rowHeads[i];
		 var rownameobj = obj.rowname;
		 
		 for(var j=0;j<rownameobj.length;j++){
		 	   var nameobj = rownameobj[j];
		 	   if(j==0){
 	   	  	  rtnObj[i] = nameobj.name;
 	   	   }else{
 	   	  	  rtnObj[i] = rtnObj[i] + "," + nameobj.name;
 	   	   } 
		 }
  }
	return rtnObj;
}