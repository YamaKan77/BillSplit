(this.webpackJsonpbillsplit=this.webpackJsonpbillsplit||[]).push([[0],{111:function(e,t,l){},128:function(e,t,l){},129:function(e,t,l){},255:function(e,t,l){"use strict";l.r(t);var s=l(1),n=l(0),r=l.n(n),a=l(112),i=l.n(a),c=(l(128),l(16)),o=(l(129),l(3)),u=l.n(o),d=l(9),p=l(5),h=l(6),b=l(19),j=l(10),m=l(11),f=l(259);function O(e){var t=e.users,l=(e.currentUser,e.selectedUsers),n=e.handleUserSelect;return Object(s.jsx)("div",{children:t.map((function(e){return Object(s.jsx)(s.Fragment,{children:Object(s.jsx)("div",{children:Object(s.jsx)(f.a.Check,{type:"checkbox",value:e,onChange:n,checked:l.includes(e),label:e})},e)})}))})}var v=l(121),g=l(260),x=l(63);function y(e){var t=e.handleAdd,l=e.users,n=e.currentUser,r=e.selectedUsers,a=e.handleUserSelect,i=e.handleSelectAll,c=e.handleSplitType,o=x.b().shape({billName:x.c().required("Required"),billAmt:x.a().required("Required").positive("Amount must be postive.").integer()});return Object(s.jsx)(v.a,{validationSchema:o,onSubmit:function(e){t()},initialValues:{billName:"",billAmt:""},children:function(e){var t=e.handleSubmit,o=e.handleChange,u=e.handleBlur,d=e.values,p=e.touched,h=(e.isValid,e.errors);return Object(s.jsxs)(f.a,{className:"col-sm-2 addBill",autoComplete:"off",onSubmit:t,id:"add-bill",children:[Object(s.jsx)(f.a.Label,{children:"Bill Name"}),Object(s.jsx)(f.a.Control,{className:"billInput",id:"billName",name:"billName",type:"text",onChange:o,onBlur:u,value:d.billName,isValid:p.billName&&!h.billName}),p.billName&&h.billName&&Object(s.jsx)("div",{children:h.billName}),Object(s.jsx)("br",{}),Object(s.jsx)(f.a.Label,{children:"Bill Amount"}),Object(s.jsx)(f.a.Control,{className:"billInput",id:"billAmt",name:"billAmt",type:"text",onChange:o,onBlur:u,value:d.billAmt,isValid:p.billAmt&&!h.billAmt}),p.billAmt&&h.billAmt&&Object(s.jsx)("div",{children:h.billAmt}),Object(s.jsx)("br",{}),Object(s.jsxs)(f.a.Control,{className:"splitType",id:"splitType",onChange:c,as:"select",size:"sm",children:[Object(s.jsx)("option",{children:"Split Bill Amount"}),Object(s.jsx)("option",{children:"Charge Each Amount"})]}),Object(s.jsx)(O,{name:"selectedUsers",id:"selectedUsers",value:d.selectedUsers,users:l,currentUser:n,selectedUsers:r,handleUserSelect:a}),Object(s.jsx)(g.a,{variant:"outline-dark",type:"submit",className:"button",children:"Add"}),Object(s.jsx)(g.a,{variant:"outline-dark",type:"button",onClick:i,className:"button",children:l.length===r.length?"Clear":"Select All"})]})}})}var w=l(23);function A(e){var t,l=e.totalOwedBills,n=e.user,r=l[n]&&l[n].covered?l[n].covered:new Map,a=l[n]&&l[n].owes?l[n].owes:new Map,i=[],o=0,u=Object(w.a)(r.entries());try{for(u.s();!(t=u.n()).done;){var d=Object(c.a)(t.value,2),p=d[0],h=d[1],b=Object(s.jsxs)("div",{style:{backgroundColor:"green"},children:[p," owes you $",h," total"]},o++);i.push(b)}}catch(x){u.e(x)}finally{u.f()}var j,m=Object(w.a)(a.entries());try{for(m.s();!(j=m.n()).done;){var f=Object(c.a)(j.value,2),O=f[0],v=f[1],g=Object(s.jsxs)("div",{style:{backgroundColor:"red"},children:["You owe ",O," $",v," total"]},o++);i.push(g)}}catch(x){m.e(x)}finally{m.f()}return Object(s.jsx)("div",{className:"owedList col-sm-4",children:Object(s.jsx)("ul",{children:i})})}var N=l(258);function k(e){var t=e.owedBills;return Object(s.jsx)("div",{className:"totalSplit col-sm-6",children:Object(s.jsx)(N.a,{className:"splitList",children:t?t.map((function(e,t){return Object(s.jsxs)(N.a.Item,{action:!0,children:[e.billTo," owes ",e.billFrom," : $",e.billAmount," for ",e.billName]},t)})):Object(s.jsx)("br",{})})})}var B=l(30),U=l(14),S=function(){var e=new B.a({id:"billsplit-enxhm"}),t=Object(U.f)();return Object(s.jsx)(g.a,{onClick:function(){return e.currentUser.logOut(),void t.push("/login")},children:"Log Out"})},L=function(){return Object(s.jsx)(S,{})},C=l(26),I=function(){var e=new B.a({id:"billsplit-enxhm"}),t=r.a.useState(e.currentUser),l=Object(c.a)(t,1)[0];return l&&Object(s.jsxs)("div",{className:"profile",children:[Object(s.jsx)("h4",{children:l.name}),Object(s.jsx)("p",{children:l.profile.email}),Object(s.jsx)(L,{}),Object(s.jsx)(C.b,{to:"/",children:Object(s.jsx)(g.a,{type:"button",children:"Home"})})]})},T=(l(237),l(256)),F=l(257),G=l(113),E=l(120),P=l.n(E).a.create({baseURL:"http://localhost:3000/api",headers:{"Content-type":"application/json"}}),M=new(function(){function e(){Object(p.a)(this,e)}return Object(h.a)(e,[{key:"getAll",value:function(e){return P.post("/bills",e)}},{key:"get",value:function(e){return P.get("/bill/".concat(e))}},{key:"insert",value:function(e){return P.post("/bills/insert",e)}},{key:"update",value:function(e,t){return P.put("/bill/".concat(e),t)}},{key:"delete",value:function(e){return P.delete("/bill/".concat(e))}},{key:"deleteAll",value:function(){return P.delete("/bill")}}]),e}()),_=new(function(){function e(){Object(p.a)(this,e)}return Object(h.a)(e,[{key:"findUserList",value:function(e){return P.post("/groups",e)}},{key:"findUserGroups",value:function(e){return P.get("/groups/getGroups",e)}},{key:"insert",value:function(e){return P.post("/groups/insert",e)}},{key:"update",value:function(e,t){return P.put("/groups/".concat(e),t)}},{key:"delete",value:function(e){return P.delete("/groups/".concat(e))}},{key:"deleteAll",value:function(){return P.delete("/groups")}}]),e}()),q=(l(111),function(e){Object(j.a)(l,e);var t=Object(m.a)(l);function l(e){var s;return Object(p.a)(this,l),(s=t.call(this,e)).state={selectedUsers:[]},s.handleAdd=s.handleAdd.bind(Object(b.a)(s)),s.handleUserSelect=s.handleUserSelect.bind(Object(b.a)(s)),s.getOwedBills=s.getOwedBills.bind(Object(b.a)(s)),s.getTotalOwed=s.getTotalOwed.bind(Object(b.a)(s)),s.handleSelectAll=s.handleSelectAll.bind(Object(b.a)(s)),s.handleSplitType=s.handleSplitType.bind(Object(b.a)(s)),s}return Object(h.a)(l,[{key:"componentDidMount",value:function(){var e=Object(d.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.getOwedBills(),this.getUserList();case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getOwedBills",value:function(){var e=this,t={email:this.props.user.profile.email,groupName:this.props.match.params.groupName};M.getAll(t).then((function(t){e.setState({owedBills:t.data},(function(){this.getTotalOwed()}))}))}},{key:"calculateTotalOwedBills",value:function(e,t,l){var s="covered"===l?e.billFrom:e.billTo,n="covered"===l?e.billTo:e.billFrom;if(t.hasOwnProperty(s))if(t[s].hasOwnProperty(l)){var r=t[s][l];if(r.has(n)){var a=r.get(n);a+=parseInt(e.billAmount),r.set(n,a)}else r.set(n,parseInt(e.billAmount))}else{var i=t[s],c="covered"===l?"owes":"covered";if(t[s].hasOwnProperty(c)){var o=t[s][c];if(o.has(n)){var u=o.get(n);if(u-e.billAmount>0)o.set(n,u-e.billAmount);else if(u-e.billAmount<0){var d=new Map;d.set(n,parseInt(e.billAmount)-u),i[l]=d}else o.delete(n)}else{var p=new Map;p.set(n,parseInt(e.billAmount));var h=t[s];h[l]=p,t[s]=h}}else{var b=new Map;b.set(n,parseInt(e.billAmount));var j={};j[l]=b,t[s]=j}}else{var m=new Map;m.set(n,parseInt(e.billAmount));var f={};f[l]=m,t[s]=f}}},{key:"getTotalOwed",value:function(){var e=this,t=this.state.owedBills,l={};t.forEach((function(t){e.props.user.profile.email===t.billFrom&&e.calculateTotalOwedBills(t,l,"covered"),e.props.user.profile.email===t.billTo&&e.calculateTotalOwedBills(t,l,"owes")})),this.setState({totalOwedBills:l})}},{key:"getUserList",value:function(){var e=Object(d.a)(u.a.mark((function e(){var t,l=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t={_partition:"Group",groupName:this.props.match.params.groupName},_.findUserList(t).then((function(e){l.setState({allUsers:e.data[0].participants,selectUserList:e.data[0].participants})}));case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"insertBills",value:function(){var e=Object(d.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{M.insert(t)}catch(l){console.log(l)}case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleAdd",value:function(){var e=this,t=document.getElementById("billName").value,l=parseInt(document.getElementById("billAmt").value),s=this.state.selectedUsers,n=document.getElementById("splitType").value,r=this.props.user;"Split Bill Amount"===n&&(s.includes(r.profile.email)?(l/=s.length-1,s=s.filter((function(t){return t!==e.props.user.profile.email}))):l/=s.length);for(var a=[],i=this.state.owedBills,c=this.state.totalOwedBills,o=0;o<s.length;o++){var u={billFromId:r.id,billName:t,billTo:s[o],billFrom:this.props.user.profile.email,billAmount:l.toFixed(2),groupName:this.props.match.params.groupName,_partition:"Bill"};this.calculateTotalOwedBills(u,c,"covered"),a.push(u),i.push(u)}this.insertBills(a),this.setState({owedBills:i,totalOwedBills:c}),document.getElementById("add-bill").reset(),this.setState({selectedUsers:[]})}},{key:"handleUserSelect",value:function(e){var t,l=this.state.selectedUsers;e.target.checked?l.push(e.target.value):(t=l.indexOf(e.target.value),l.splice(t,1)),this.setState({selectedUsers:l})}},{key:"handleSelectAll",value:function(){var e=this.state.selectedUsers,t=this.state.selectUserList;t.length===e.length?e=[]:t.filter((function(t){return!e.includes(t)})).map((function(t){return e.push(t)})),this.setState({selectedUsers:e})}},{key:"handleSplitType",value:function(){var e=document.getElementById("splitType").value,t=this.props.user,l=t.profile?t.profile.email:"";if("Charge Each Amount"===e){var s=this.state.selectUserList;s=s.filter((function(e){return e!==l})),this.setState({selectUserList:s})}else{var n=this.state.allUsers;this.setState({selectUserList:n})}}},{key:"render",value:function(){return Object(s.jsxs)(T.a,{fluid:!0,className:"container-fluid",children:[Object(s.jsxs)(F.a,{className:"row",children:[Object(s.jsx)(G.a,{children:Object(s.jsx)("h1",{className:"groupName",children:this.props.match.params.groupName})}),Object(s.jsx)(G.a,{md:"auto",children:Object(s.jsx)(I,{})})]}),Object(s.jsx)("br",{}),Object(s.jsxs)(F.a,{className:"row",children:[Object(s.jsx)(y,{handleAdd:this.handleAdd,users:this.state.selectUserList?this.state.selectUserList:[],currentUser:this.props.user.profile?this.props.user.profile.email:"",selectedUsers:this.state.selectedUsers,handleUserSelect:this.handleUserSelect,handleSelectAll:this.handleSelectAll,handleSplitType:this.handleSplitType}),Object(s.jsx)(k,{className:"col-sm-6",owedBills:this.state.owedBills}),Object(s.jsx)(A,{className:"col-sm-3",totalOwedBills:this.state.totalOwedBills||{},user:this.props.user.profile.email||{}})]})]})}}]),l}(r.a.Component)),D=Object(U.g)(q),R=function(e){Object(j.a)(l,e);var t=Object(m.a)(l);function l(e){var s;return Object(p.a)(this,l),(s=t.call(this,e)).state={groupList:[]},s.getGroupList=s.getGroupList.bind(Object(b.a)(s)),s.handleAddGroup=s.handleAddGroup.bind(Object(b.a)(s)),s}return Object(h.a)(l,[{key:"componentDidMount",value:function(){var e=Object(d.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.getGroupList();case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getGroupList",value:function(){var e=Object(d.a)(u.a.mark((function e(){var t,l,s,n,r=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.user.mongoClient("mongodb-atlas"),l=t.db("BillSplit").collection("Bills"),s={_partition:"userInfo",name:this.props.user.profile.email},e.next=5,l.findOne(s);case 5:n=e.sent,Promise.resolve(Promise.resolve(n)).then((function(e){r.setState({groupList:e.groupList})})),_.findUserGroups(this.props.user.profile.email).then((function(e){console.log(e)}));case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"handleAddGroup",value:function(){var e=Object(d.a)(u.a.mark((function e(){var t,l,s,n,r,a,i,c,o,d;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=document.getElementById("groupName").value,(l=this.state.groupList).push(t),s=this.props.user.mongoClient("mongodb-atlas"),n=s.db("BillSplit").collection("Bills"),r={_partition:"userInfo",name:this.props.user.profile.email},a={_partition:"userInfo",name:this.props.user.profile.email,groupList:l},i={upsert:!0},e.next=10,n.updateOne(r,a,i);case 10:return c={_partition:"group",groupName:t},o=[this.props.user.profile.email],d={_partition:"group",groupName:t,participants:o},e.next=15,n.updateOne(c,d,i);case 15:this.setState({groupList:l}),document.getElementById("groupForm").reset();case 17:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(s.jsxs)(T.a,{fluid:!0,className:"container-fluid",children:[Object(s.jsxs)(F.a,{children:[Object(s.jsx)(G.a,{children:Object(s.jsx)("h1",{className:"groupName",children:"Bill Split"})}),Object(s.jsx)(G.a,{md:"auto",children:Object(s.jsx)(I,{})})]}),Object(s.jsx)(F.a,{className:"groupList",children:this.state.groupList.map((function(e){return Object(s.jsx)(C.b,{to:"/".concat(e),children:e})}))}),Object(s.jsxs)(f.a,{className:"addGroup",id:"groupForm",inline:!0,children:[Object(s.jsxs)(f.a.Row,{children:[Object(s.jsx)(f.a.Label,{srOnly:!0,children:"New Group"}),Object(s.jsx)(f.a.Control,{id:"groupName",size:"sm",type:"text",placeholder:"New Group"})]}),Object(s.jsx)(g.a,{className:"addButton",variant:"outline-dark",type:"button",onClick:this.handleAddGroup,children:"Add"})]})]})}}]),l}(r.a.Component);function V(e){var t=e.setUser,l=new B.a({id:"billsplit-enxhm"}),n=Object(U.f)();function r(e){var t=document.getElementById("email").value,s=document.getElementById("password").value,r=B.b.emailPassword(t,s);try{e(l.logIn(r)),n.push("/")}catch(a){console.error("Failed log in",a)}}return Object(s.jsxs)("div",{children:[Object(s.jsx)("input",{type:"text",id:"email",placeholder:"Email"}),Object(s.jsx)("br",{}),Object(s.jsx)("input",{type:"text",id:"password",placeholder:"Password",onKeyDown:function(e){13===e.keyCode&&r(t)}}),Object(s.jsx)("br",{}),Object(s.jsx)(g.a,{onClick:function(){r(t)},children:"Log In"})]})}var $=new B.a({id:"billsplit-enxhm"});var z=function(){var e=r.a.useState($.currentUser),t=Object(c.a)(e,2),l=t[0],n=t[1];return Object(s.jsx)("div",{className:"App",children:Object(s.jsxs)(U.c,{children:[Object(s.jsx)(U.a,{path:"/Login",children:Object(s.jsx)(V,{setUser:n})}),Object(s.jsx)(U.a,{path:"/:groupName",children:Object(s.jsx)(D,{user:l})}),Object(s.jsx)(U.a,{path:"/",children:Object(s.jsx)(R,{user:l})})]})})},J=function(e){e&&e instanceof Function&&l.e(3).then(l.bind(null,261)).then((function(t){var l=t.getCLS,s=t.getFID,n=t.getFCP,r=t.getLCP,a=t.getTTFB;l(e),s(e),n(e),r(e),a(e)}))};i.a.render(Object(s.jsx)(C.a,{children:Object(s.jsx)(z,{})}),document.getElementById("root")),J()}},[[255,1,2]]]);
//# sourceMappingURL=main.ff8cd4b8.chunk.js.map