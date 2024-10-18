(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3403],{45677:function(e,s,a){Promise.resolve().then(a.bind(a,41468)),Promise.resolve().then(a.bind(a,29122)),Promise.resolve().then(a.bind(a,96124)),Promise.resolve().then(a.bind(a,7077)),Promise.resolve().then(a.bind(a,89112))},41468:function(e,s,a){"use strict";var t=a(57437),l=a(87138),i=a(2265),r=a(95956);let d=()=>(0,t.jsxs)("div",{className:"rounded-md p-4 bg-gray-100 animate-pulse",children:[(0,t.jsx)("div",{className:"h-4 bg-gray-300 rounded w-3/4 mb-2"}),(0,t.jsx)("div",{className:"h-4 bg-gray-300 rounded w-1/4 mb-4"}),(0,t.jsx)("div",{className:"h-4 bg-gray-300 rounded w-full"}),(0,t.jsx)("div",{className:"h-4 bg-gray-300 rounded w-full mb-2"}),(0,t.jsx)("div",{className:"h-4 bg-gray-300 rounded w-full"})]});s.default=()=>{let[e,s]=(0,i.useState)([]),[a,n]=(0,i.useState)(!0);return((0,i.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/blogs/dashboard");if(!e.ok)throw Error("Failed to fetch data");let a=await e.json();s(a)}catch(e){r.Am.error(e.message)}finally{n(!1)}})()},[]),a)?(0,t.jsxs)("div",{className:"bg-white p-4 rounded-md",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("h1",{className:"text-xl font-semibold",children:"Blogs"}),(0,t.jsx)(l.default,{href:"/dashboard/blogs",className:"text-xs text-gray-400",children:"View All"})]}),(0,t.jsx)("div",{className:"flex flex-col gap-4 mt-4",children:Array.from({length:5}).map((e,s)=>(0,t.jsx)(d,{},s))})]}):(0,t.jsxs)("div",{className:"bg-white p-4 rounded-md",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("h1",{className:"text-xl font-semibold",children:"Blogs"}),(0,t.jsx)(l.default,{href:"/dashboard/blogs",className:"text-xs text-gray-400",children:"View All"})]}),(0,t.jsx)("div",{className:"flex flex-col gap-4 mt-4",children:e.map(e=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"rounded-md p-4 ",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("h2",{className:"font-medium",children:e.title}),(0,t.jsx)("span",{className:"text-xs text-gray-400 bg-white rounded-md px-1 py-1",children:new Date(e.createdAt).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})})]}),(0,t.jsxs)("p",{className:"text-sm text-gray-400 mt-1",children:[e.description.substring(0,80),e.description.length>80?"...":""]})]},e.id),(0,t.jsx)("hr",{})]}))})]})}},29122:function(e,s,a){"use strict";var t=a(57437),l=a(35231),i=a(23909),r=a(85369),d=a(68295),n=a(63550),c=a(95956),o=a(2265);let x=["#0088FE","#00C49F","#FFBB28","#FF8042"],h=Math.PI/180,m=e=>{let{cx:s,cy:a,midAngle:l,innerRadius:i,outerRadius:r,percent:d,index:n,value:c}=e;if(0===c||!s||!a||!d)return null;let o=i+(r-i)*.5,x=s+o*Math.cos(-l*h);return(0,t.jsx)("text",{x:x,y:a+o*Math.sin(-l*h),fill:"white",textAnchor:x>s?"start":"end",dominantBaseline:"central",children:"".concat((100*d).toFixed(0),"%")})},u=()=>(0,t.jsxs)("div",{className:"bg-white rounded-xl w-full h-full p-4",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,t.jsx)("div",{className:"h-6 bg-gray-300 rounded w-1/4"}),(0,t.jsx)("div",{className:"h-6 bg-gray-300 rounded w-4"})]}),(0,t.jsx)("div",{className:"relative w-full h-[75%]",children:(0,t.jsx)("div",{className:"animate-pulse w-full h-full bg-gray-200 rounded"})}),(0,t.jsx)("div",{className:"flex justify-center gap-12 mt-4",children:Array.from({length:4}).map((e,s)=>(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsx)("div",{className:"w-5 h-5 bg-gray-300 rounded-full"}),(0,t.jsx)("div",{className:"h-4 bg-gray-300 rounded w-3/4"}),(0,t.jsx)("div",{className:"h-3 bg-gray-300 rounded w-1/2"})]},s))})]});s.default=()=>{let[e,s]=(0,o.useState)([]),[a,h]=(0,o.useState)(!0);return((0,o.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/category/count-category");e.ok||c.Am.error("Failed to fetch Count Data");let a=(await e.json()).map(e=>({name:e.category_name,value:e._count.products}));s(a)}catch(e){c.Am.error(e.message)}finally{h(!1)}})()},[]),a)?(0,t.jsx)(u,{}):(0,t.jsxs)("div",{className:"bg-white rounded-xl w-full h-full p-4",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center",children:[(0,t.jsx)("h1",{className:"text-lg font-semibold",children:"Category"}),(0,t.jsx)(n.Z,{})]}),(0,t.jsx)("div",{className:"relative w-full h-[75%]",children:(0,t.jsx)(l.h,{width:"100%",height:"100%",children:(0,t.jsx)(i.u,{width:800,height:800,children:(0,t.jsx)(r.b,{data:e,cx:"50%",cy:"50%",labelLine:!1,label:e=>m({...e,value:e.value}),outerRadius:100,fill:"#8884d8",dataKey:"value",children:e.map((e,s)=>(0,t.jsx)(d.b,{fill:x[s%x.length]},"cell-".concat(s)))})})})}),(0,t.jsx)("div",{className:"flex justify-center gap-12",children:e.map((s,a)=>(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsx)("div",{className:"w-5 h-5 ".concat(x[a%x.length]," rounded-full")}),(0,t.jsx)("h1",{className:"font-bold",children:s.value}),(0,t.jsxs)("h2",{className:"text-xs text-gray-300",children:[s.name," (",(s.value/e.reduce((e,s)=>e+s.value,0)*100).toFixed(0),"%)"]})]},s.name))})]})}},96124:function(e,s,a){"use strict";var t=a(57437),l=a(63550),i=a(35231),r=a(92566),d=a(54142),n=a(2842),c=a(9542),o=a(85475),x=a(20153),h=a(16638),m=a(2265),u=a(95956);let f=()=>(0,t.jsxs)("div",{className:"bg-white rounded-xl w-full h-full p-4",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,t.jsx)("div",{className:"h-6 bg-gray-300 rounded w-1/4"}),(0,t.jsx)("div",{className:"h-6 bg-gray-300 rounded w-4"})]}),(0,t.jsx)("div",{className:"relative w-full h-[90%]",children:(0,t.jsx)("div",{className:"animate-pulse w-full h-full bg-gray-300 rounded"})})]});s.default=()=>{let[e,s]=(0,m.useState)([]),[a,g]=(0,m.useState)(!0);return((0,m.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/bookings/booking-dashboard");if(!e.ok)throw Error("Failed to fetch data");let a=await e.json();s(a)}catch(e){u.Am.error(e.message)}finally{g(!1)}})()},[]),a)?(0,t.jsx)(f,{}):(0,t.jsxs)("div",{className:"bg-white rounded-xl w-full h-full p-4",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center",children:[(0,t.jsx)("h1",{className:"text-lg font-semibold",children:"Bookings"}),(0,t.jsx)(l.Z,{})]}),e&&0===e.length?(0,t.jsx)("h1",{children:"No upcoming bookings available!"}):(0,t.jsx)(i.h,{width:"100%",height:"90%",children:(0,t.jsxs)(r.w,{data:e,margin:{top:5,right:30,left:20,bottom:5},children:[(0,t.jsx)(d.q,{strokeDasharray:"3 3",stroke:"#ddd"}),(0,t.jsx)(n.K,{dataKey:"month",axisLine:!1,tick:{fill:"#d1d5db"},tickLine:!1,tickMargin:10}),(0,t.jsx)(c.B,{axisLine:!1,tick:{fill:"#d1d5db"},tickLine:!1,tickMargin:20}),(0,t.jsx)(o.u,{}),(0,t.jsx)(x.D,{align:"center",verticalAlign:"top",wrapperStyle:{paddingTop:"10px",paddingBottom:"30px"}}),(0,t.jsx)(h.x,{type:"monotone",dataKey:"approved",stroke:"#4caf50",strokeWidth:5,name:"Approved"}),(0,t.jsx)(h.x,{type:"monotone",dataKey:"notApproved",stroke:"#f44336",strokeWidth:5,name:"Not Approved"})]})})]})}},7077:function(e,s,a){"use strict";var t=a(57437),l=a(35231),i=a(25974),r=a(54142),d=a(2842),n=a(9542),c=a(85475),o=a(20153),x=a(45745),h=a(63550),m=a(2265);let u=()=>(0,t.jsxs)("div",{className:"animate-pulse bg-gray-200 rounded-lg h-64 w-full",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center p-4",children:[(0,t.jsx)("div",{className:"h-6 bg-gray-300 rounded w-1/3"}),(0,t.jsx)("div",{className:"h-6 bg-gray-300 rounded w-6"})]}),(0,t.jsx)("div",{className:"h-full bg-gray-300 rounded m-4"})]});s.default=()=>{let[e,s]=(0,m.useState)([]),[a,f]=(0,m.useState)(!0);(0,m.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/user/topusers"),a=await e.json();s(a)}catch(e){console.error("Error fetching top users:",e)}finally{f(!1)}})()},[]);let g=e.map((e,s)=>({name:"".concat(e.firstname," ").concat(e.lastname),events:e.events_booked.length}));return(0,t.jsxs)("div",{className:"bg-white rounded-lg p-4 h-full",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center",children:[(0,t.jsx)("h1",{className:"text-lg font-semibold",children:"Top 3 Bookers"}),(0,t.jsx)(h.Z,{})]}),a?(0,t.jsx)(u,{}):(0,t.jsx)(l.h,{width:"100%",height:"90%",children:(0,t.jsxs)(i.v,{width:500,height:300,data:g,barSize:20,children:[(0,t.jsx)(r.q,{strokeDasharray:"3 3",vertical:!1,stroke:"#ddd"}),(0,t.jsx)(d.K,{dataKey:"name",axisLine:!1,tick:{fill:"#d1d5db"},tickLine:!1}),(0,t.jsx)(n.B,{axisLine:!1,tick:{fill:"#d1d5db"},tickLine:!1}),(0,t.jsx)(c.u,{contentStyle:{borderRadius:"10px",borderColor:"lightgray"}}),(0,t.jsx)(o.D,{align:"left",verticalAlign:"top",wrapperStyle:{paddingTop:"20px",paddingBottom:"40px"}}),(0,t.jsx)(x.$,{dataKey:"events",fill:"#f05252",legendType:"circle",radius:[10,10,0,0]})]})})]})}},89112:function(e,s,a){"use strict";var t=a(57437),l=a(2265),i=a(95956),r=a(38133),d=a(6649),n=a(4622),c=a(7929),o=a(63550),x=a(87138);let h=[{id:1,type:"Users",icon:(0,t.jsx)(r.Z,{}),key:"users",link:"/dashboard/users"},{id:2,type:"Blogs",icon:(0,t.jsx)(d.Z,{}),key:"blogs",link:"/dashboard/blogs"},{id:3,type:"Event Types",icon:(0,t.jsx)(n.Z,{}),key:"eventTypes",link:"/dashboard/eventtype"},{id:4,type:"Products",icon:(0,t.jsx)(c.Z,{}),key:"products",link:"/dashboard/products"}],m=()=>(0,t.jsx)("div",{className:"flex flex-wrap gap-4",children:Array.from({length:4}).map((e,s)=>(0,t.jsxs)("div",{className:"rounded-2xl p-4 flex-1 min-w-[130px] bg-gray-200 animate-pulse",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,t.jsx)("div",{className:"h-4 bg-gray-300 rounded w-20"}),(0,t.jsx)("div",{className:"h-4 bg-gray-300 rounded w-4"})]}),(0,t.jsx)("div",{className:"h-10 bg-gray-300 rounded mb-2"}),(0,t.jsx)("div",{className:"flex items-center",children:(0,t.jsx)("div",{className:"h-4 bg-gray-300 rounded w-3/4"})})]},s))});s.default=()=>{let[e,s]=(0,l.useState)({users:0,blogs:0,eventTypes:0,products:0}),[a,r]=(0,l.useState)(!0);return((0,l.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/cards/users");if(e.ok){let a=await e.json();s(a)}else i.Am.error("Failed to fetch data")}catch(e){i.Am.error(e.message)}finally{r(!1)}})()},[]),a)?(0,t.jsx)(m,{}):(0,t.jsx)(t.Fragment,{children:h.map((s,a)=>(0,t.jsx)("div",{className:"rounded-2xl p-4 flex-1 min-w-[130px] ".concat(a%2==0?"bg-orange-500":"bg-orange-300"),children:(0,t.jsxs)(x.default,{href:s.link,children:[(0,t.jsxs)("div",{className:"flex justify-between items-center",children:[(0,t.jsx)("span",{className:"text-[10px] bg-white px-2 py-1 rounded-full text-green-600",children:"2024/25"}),(0,t.jsx)(o.Z,{})]}),(0,t.jsx)("h1",{className:"text-2xl font-semibold my-4 ".concat(a%2==0?"text-white":"text-black"),children:e[s.key]}),(0,t.jsxs)("h2",{className:"capitalize text-sm font-medium ".concat(a%2==0?"text-gray-100":"text-gray-500"," "),children:[s.icon,s.type]})]})},s.id))})}}},function(e){e.O(0,[5956,231,8912,2971,7023,1744],function(){return e(e.s=45677)}),_N_E=e.O()}]);