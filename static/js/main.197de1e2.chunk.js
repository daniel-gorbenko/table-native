(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,n){e.exports=n(18)},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(9),s=n.n(r),l=(n(17),n(10)),u=n(1),i=n(2),c=n(4),h=n(3),p=n(5),m=function(e){return a.a.createElement("div",{className:"page-create-table"},a.a.createElement("h1",null,"\u041f\u043e\u0441\u0442\u0440\u043e\u0438\u0442\u044c \u0442\u0430\u0431\u043b\u0438\u0446\u0443"),a.a.createElement("form",{onSubmit:e.onSubmit},a.a.createElement("input",{onChange:function(t){return e.onChange(t,"rows")},value:e.values.rows,type:"number",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0441\u0442\u0440\u043e\u043a"}),a.a.createElement("input",{onChange:function(t){return e.onChange(t,"cols")},value:e.values.cols,type:"number",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0441\u0442\u043e\u043b\u0431\u0446\u043e\u0432"}),a.a.createElement("input",{onChange:function(t){return e.onChange(t,"x")},value:e.values.x,type:"number",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0447\u0438\u0441\u043b\u043e X"}),a.a.createElement("input",{type:"submit",value:"\u041f\u043e\u0441\u0442\u0440\u043e\u0438\u0442\u044c"})))},v=n(7),g=n(6),f=function(e){return a.a.createElement("td",{className:e.className,onClick:e.onClick,onMouseEnter:e.onMouseOver,onMouseLeave:e.onMouseOut},a.a.createElement("span",{className:"amount"},e.value),e.children)},d=function(e){function t(e){return Object(u.a)(this,t),Object(c.a)(this,Object(h.a)(t).call(this,e))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"shouldComponentUpdate",value:function(e){return e.changed}},{key:"render",value:function(){return a.a.createElement("tr",null,this.props.children)}}]),t}(a.a.Component),C=function(e){function t(e){return Object(u.a)(this,t),Object(c.a)(this,Object(h.a)(t).call(this,e))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=[this.props.higlight?"higlight":"",this.props.over?"over":""].join(" "),t={height:this.props.percentValue+"%"};return a.a.createElement(f,{className:e,value:this.props.value,onClick:this.props.onClick,onMouseOver:this.props.onMouseOver,onMouseOut:this.props.onMouseOut},a.a.createElement("span",{className:"percent_value"},this.props.percentValue,"%"),a.a.createElement("div",{className:"percent",style:t}))}}]),t}(a.a.Component),b=function(e){function t(e){return Object(u.a)(this,t),Object(c.a)(this,Object(h.a)(t).call(this,e))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"shouldComponentUpdate",value:function(e){return e.higlight!==this.props.higlight||e.amount!==this.props.amount||e.over!==this.props.over}},{key:"render",value:function(){var e=this;return a.a.createElement(C,{percentValue:this.props.getPercent(this.props.rowIndex,this.props.amount),onClick:function(t){return e.props.onCellClick(t,e.props.rowIndex,e.props.colIndex)},onMouseOver:function(t){return e.props.onCellOver(t,e.props.rowIndex,e.props.colIndex)},onMouseOut:function(t){return e.props.onCellOut(t,e.props.rowIndex,e.props.colIndex)},over:this.props.over,value:this.props.amount,higlight:this.props.higlight})}}]),t}(a.a.Component),O=function(e){return a.a.createElement(f,{className:"sum_cell",value:e.value,onMouseOver:e.onMouseOver,onMouseOut:e.onMouseOut},a.a.createElement("span",{onClick:e.onRowRemove,className:"delete_row"},a.a.createElement("span",null,"\u0423\u0434\u0430\u043b\u0438\u0442\u044c")))},w=function(e){function t(e){return Object(u.a)(this,t),Object(c.a)(this,Object(h.a)(t).call(this,e))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return a.a.createElement(O,{onMouseOver:function(t){return e.props.onSumCellOver(e.props.index)},onMouseOut:function(t){return e.props.onSumCellOut(e.props.index)},onRowRemove:function(t){return e.props.onRowRemove(t,e.props.index)},value:this.props.sumCellValue})}}]),t}(a.a.Component),R=function(e){function t(e){return Object(u.a)(this,t),Object(c.a)(this,Object(h.a)(t).call(this,e))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"shouldComponentUpdate",value:function(e){return e.changed}},{key:"render",value:function(){var e=this;return a.a.createElement("tr",null,this.props.cells.map(function(t,n){return a.a.createElement(b,{key:n,rowIndex:e.props.index,colIndex:n,getPercent:e.props.getPercent,onCellClick:e.props.onCellClick,onCellOver:e.props.onCellOver,onCellOut:e.props.onCellOut,over:t.over,amount:t.amount,higlight:t.higlight})}),a.a.createElement(w,{index:this.props.index,onSumCellOver:this.props.onSumCellOver,onSumCellOut:this.props.onSumCellOut,onRowRemove:this.props.onRowRemove,sumCellValue:this.props.sumCellValue}))}}]),t}(a.a.Component),k=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(c.a)(this,Object(h.a)(t).call(this,e))).getPercent=function(e,t){return(t/n.calcSumByRow(e,n.state.table,n.props.cols)*100).toFixed(2)},n.onRowAdd=function(e){e.preventDefault(),n.setState(function(e){var t=Object(v.a)(e.table);return t[t.length]=n.generateRowData(e.table.length),n.rowIdList[n.rowIdList.length]=n.getNextRowId(),n.rowChanges[n.rowChanges.length]=!0,{table:t,sums:n.getSums(t,t.length,n.props.cols)}}),n.props.onRowAdd(e)},n.onRowRemove=function(e,t){e.preventDefault(),n.props.onRowRemove(e),n.setState(function(e){var o=Object(v.a)(e.table);o.splice(t,1),n.rowIdList.splice(t,1),n.rowChanges.splice(t,1);for(var a=t,r=o.length;a<r;a++)n.markChangedRows(a);return{table:o,sums:n.getSums(o,o.length,n.props.cols)}})},n.amountDigitsIndex=e.amountDigits+2,n.higlighted=[],n.rowIdList=[],n.rowChanges=[],n._currentRowId=-1,n.state={table:n.generateTableData()},n.state.sums=n.getSums(n.state.table,e.rows,e.cols),n.getPercent=n.getPercent.bind(Object(g.a)(n)),n.onCellClick=n.onCellClick.bind(Object(g.a)(n)),n.onCellOver=n.onCellOver.bind(Object(g.a)(n)),n.onCellOut=n.onCellOut.bind(Object(g.a)(n)),n.onSumCellOver=n.onSumCellOver.bind(Object(g.a)(n)),n.onSumCellOut=n.onSumCellOut.bind(Object(g.a)(n)),n.onRowRemove=n.onRowRemove.bind(Object(g.a)(n)),n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"getNextRowId",value:function(){return++this._currentRowId}},{key:"generateTableData",value:function(){for(var e=[],t=0;t<this.props.rows;t++)e[t]=this.generateRowData(t),this.rowIdList[t]=this.getNextRowId(),this.rowChanges[t]=!0;return e}},{key:"generateRowData",value:function(e){for(var t=[],n=0;n<this.props.cols;n++)t[n]=this.generateCellData(e,n);return t}},{key:"generateCellData",value:function(e,t){return{id:"".concat(e).concat(t),amount:this.generateAmount()}}},{key:"generateAmount",value:function(){return parseInt(Math.random().toString().substring(2,this.amountDigitsIndex))}},{key:"getSums",value:function(e,t,n){return{rows:this.getRowsSums(e,t,n),cols:this.getColsSums(e,t,n)}}},{key:"getRowsSums",value:function(e,t,n){for(var o=[],a=0;a<t;a++)o[a]=this.calcSumByRow(a,e,n);return o}},{key:"getColsSums",value:function(e,t,n){for(var o=[],a=0;a<n;a++)o[a]=this.calcSumByCol(a,e,t);return o}},{key:"calcSumByRow",value:function(e,t,n){for(var o=t||this.state.table,a=0,r=0;r<n;r++)a+=o[e][r].amount;return a}},{key:"calcSumByCol",value:function(e,t,n){for(var o=t||this.state.table,a=0,r=0;r<n;r++)a+=o[r][e].amount;return a}},{key:"markChangedRows",value:function(e){this.rowChanges[e]=!0}},{key:"unmarkChangedRows",value:function(){this.rowChanges=this.rowChanges.map(function(){return!1})}},{key:"onCellClick",value:function(e,t,n){var o=this;this.markChangedRows(t),this.setState(function(e){var a=Object(v.a)(o.state.table);return a[t]=Object(v.a)(a[t]),a[t][n]=Object.assign({},a[t][n],{amount:a[t][n].amount+1}),a=o.unHiglightProcess(a),{table:a=o.higlightProcess(a,t,n),sums:o.getSums(a,o.props.rows,o.props.cols)}})}},{key:"onCellOver",value:function(e,t,n){var o=this;this.setState(function(e){return{table:o.higlightProcess(e.table,t,n)}})}},{key:"onCellOut",value:function(e,t,n){var o=this;this.setState(function(e){return{table:o.unHiglightProcess(e.table)}})}},{key:"higlightProcess",value:function(e,t,n){var o=e[t][n],a=e.reduce(function(e,t,n){return t.forEach(function(t,a){e.push({row:n,col:a,amountDiff:Math.abs(o.amount-t.amount),cell:t})}),e},[]);a=a.sort(function(e,t){return e.amountDiff<t.amountDiff?-1:e.amountDiff>t.amountDiff?1:e.amountDiff===t.amountDiff?0:void 0}),this.higlighted=[];for(var r=a.length,s=0,l=0;s<this.props.x;l++){if(r===l)return;a[l].cell!==o&&(this.higlighted[s]=a[l],this.markChangedRows(a[l].row),e[a[l].row][a[l].col].higlight=!0,s++)}return e}},{key:"unHiglightProcess",value:function(e){for(var t=this.higlighted.length,n=0;n<this.props.x;n++){if(t===n)return;this.markChangedRows(this.higlighted[n].row),e[this.higlighted[n].row][this.higlighted[n].col].higlight=!1}return e}},{key:"onSumCellOver",value:function(e){this.markChangedRows(e),this.setState(function(t){return t.table[e].forEach(function(e){e.over=!0}),{}})}},{key:"onSumCellOut",value:function(e){this.markChangedRows(e),this.setState(function(t){return t.table[e].forEach(function(e){e.over=!1}),{}})}},{key:"render",value:function(){for(var e=[],t=0;t<this.props.rows;t++)e.push(a.a.createElement(R,{index:t,cells:this.state.table[t],key:this.rowIdList[t],changed:this.rowChanges[t],getPercent:this.getPercent,onCellClick:this.onCellClick,onCellOver:this.onCellOver,onCellOut:this.onCellOut,onSumCellOver:this.onSumCellOver,onSumCellOut:this.onSumCellOut,onRowRemove:this.onRowRemove,sumCellValue:this.state.table[t].reduce(function(e,t){return e+t.amount},0)}));return a.a.createElement("table",null,a.a.createElement("caption",null,a.a.createElement("h2",null,"\u0421\u0433\u0435\u043d\u0435\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u0430\u044f \u0442\u0430\u0431\u043b\u0438\u0446\u0430"),a.a.createElement("a",{href:"#",className:"table-btn",onClick:this.onRowAdd},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0441\u0442\u0440\u043e\u043a\u0443")),a.a.createElement("thead",null),a.a.createElement("tbody",null,e),a.a.createElement("tfoot",null,a.a.createElement(d,{changed:!0},this.state.sums.cols.map(function(e,t){return a.a.createElement(f,{key:t,value:e})}))))}},{key:"componentDidUpdate",value:function(){this.unmarkChangedRows()}},{key:"componentDidMount",value:function(){this.unmarkChangedRows()}}]),t}(a.a.Component),j=function(e){return a.a.createElement(k,{cols:e.cols,rows:e.rows,x:e.x,amountDigits:e.amountDigits,onRowAdd:e.onRowAdd,onRowRemove:e.onRowRemove})},S=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(c.a)(this,Object(h.a)(t).call(this,e))).onSubmit=function(e){e.preventDefault(),n.togglePage("Table")},n.togglePage=function(e){n.setState({page:e})},n.onChange=function(e,t){n.setState({values:Object.assign({},n.state.values,Object(l.a)({},t,parseInt(e.target.value)))})},n.onRowAdd=function(e){n.setState(function(e,t){return{values:Object.assign({},e.values,{rows:e.values.rows+1})}})},n.onRowRemove=function(e){n.setState(function(e,t){return{values:Object.assign({},e.values,{rows:e.values.rows-1})}})},n.state={values:{rows:"",cols:"",x:""},page:"CreateTable"},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e;switch(this.state.page){case"CreateTable":e=a.a.createElement(m,{onSubmit:this.onSubmit,onChange:this.onChange,values:this.state.values});break;case"Table":e=a.a.createElement(j,{rows:this.state.values.rows,cols:this.state.values.cols,x:this.state.values.x,amountDigits:3,onRowAdd:this.onRowAdd,onRowRemove:this.onRowRemove})}return e}}]),t}(a.a.Component);s.a.render(a.a.createElement(S,null),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.197de1e2.chunk.js.map