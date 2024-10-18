(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4011],{48063:function(e,s,t){Promise.resolve().then(t.bind(t,23488))},78030:function(e,s,t){"use strict";t.d(s,{Z:function(){return o}});var r=t(2265);let a=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),n=function(){for(var e=arguments.length,s=Array(e),t=0;t<e;t++)s[t]=arguments[t];return s.filter((e,s,t)=>!!e&&t.indexOf(e)===s).join(" ")};var l={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let i=(0,r.forwardRef)((e,s)=>{let{color:t="currentColor",size:a=24,strokeWidth:i=2,absoluteStrokeWidth:o,className:d="",children:c,iconNode:u,...m}=e;return(0,r.createElement)("svg",{ref:s,...l,width:a,height:a,stroke:t,strokeWidth:o?24*Number(i)/Number(a):i,className:n("lucide",d),...m},[...u.map(e=>{let[s,t]=e;return(0,r.createElement)(s,t)}),...Array.isArray(c)?c:[c]])}),o=(e,s)=>{let t=(0,r.forwardRef)((t,l)=>{let{className:o,...d}=t;return(0,r.createElement)(i,{ref:l,iconNode:s,className:n("lucide-".concat(a(e)),o),...d})});return t.displayName="".concat(e),t}},71976:function(e,s,t){"use strict";t.d(s,{Z:function(){return r}});let r=(0,t(78030).Z)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},66648:function(e,s,t){"use strict";t.d(s,{default:function(){return a.a}});var r=t(55601),a=t.n(r)},87138:function(e,s,t){"use strict";t.d(s,{default:function(){return a.a}});var r=t(231),a=t.n(r)},16463:function(e,s,t){"use strict";var r=t(71169);t.o(r,"usePathname")&&t.d(s,{usePathname:function(){return r.usePathname}}),t.o(r,"useRouter")&&t.d(s,{useRouter:function(){return r.useRouter}}),t.o(r,"useSearchParams")&&t.d(s,{useSearchParams:function(){return r.useSearchParams}})},55601:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),function(e,s){for(var t in s)Object.defineProperty(e,t,{enumerable:!0,get:s[t]})}(s,{default:function(){return o},getImageProps:function(){return i}});let r=t(99920),a=t(80497),n=t(38173),l=r._(t(21241));function i(e){let{props:s}=(0,a.getImgProps)(e,{defaultLoader:l.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,t]of Object.entries(s))void 0===t&&delete s[e];return{props:s}}let o=n.Image},23488:function(e,s,t){"use strict";t.r(s);var r=t(57437),a=t(71976),n=t(87138),l=t(14245),i=t(17821),o=t(2265),d=t(16463),c=t(30998),u=t(66648),m=t(95956);s.default=()=>{let{data:e,status:s}=(0,c.useSession)(),t=(0,d.useRouter)();(0,o.useEffect)(()=>{(null==e?void 0:e.user)&&t.push("/")},[e,t]);let x=(0,l.Ry)({firstname:(0,l.Z_)().required("FirstName is required"),lastname:(0,l.Z_)().required("LastName is required"),email:(0,l.Z_)().email("Invalid Email Address").required("Email is required"),phone_number:(0,l.Z_)().required("Phone number is required").matches(/^(?:\+?(\d{1,3}))?[-. ]?(\d{1,4})[-. ]?(\d{1,4})[-. ]?(\d{1,9})$/,"Invalid phone number format. Please enter a valid phone number."),password:(0,l.Z_)().min(8,"Password must be at least 8 characters").matches(/[a-zA-Z]/,"Password must contain at least one letter").matches(/[0-9]/,"Password must contain at least one number").required("Password is required")}),h=(0,i.TA)({validationSchema:x,initialValues:{firstname:"",lastname:"",email:"",password:"",phone_number:"",role:"User"},onSubmit:(e,s)=>{let{resetForm:t}=s;w(e,t)}}),{errors:f,getFieldProps:p,touched:g}=h;(0,o.useEffect)(()=>{},[f]);let[b,y]=(0,o.useState)(!1),w=async(e,s)=>{try{let r=await fetch("/api/user",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});m.Am.success("User Successfully Created"),r.ok?t.push("/login"):m.Am.error("Registration Failed"),s()}catch(e){m.Am.error("Backend Error")}};return(0,r.jsx)("section",{className:"h-screen",children:(0,r.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 min-h-screen",children:[(0,r.jsx)("div",{className:"relative hidden lg:flex items-end h-[900px] w-[700px] px-4 pb-5 pt-5 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24",children:(0,r.jsx)(u.default,{className:"h-full w-full rounded-md object-cover object-top",src:"/register.svg",alt:"Register Illustration",width:100,height:100})}),(0,r.jsx)("div",{className:"flex items-center justify-center px-4 py-5 sm:px-6 sm:py-16 lg:px-8 lg:py-24",children:(0,r.jsxs)("div",{className:"xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md",children:[(0,r.jsx)("h2",{className:"text-3xl font-bold leading-tight text-orange-500 sm:text-4xl",children:"Sign up"}),(0,r.jsxs)("p",{className:"mt-2 text-base text-gray-600",children:["Already have an account?"," ",(0,r.jsx)(n.default,{href:"/login",title:"",className:"font-medium text-orange-600 transition-all duration-200 hover:underline",children:"Sign In"})]}),(0,r.jsx)("form",{noValidate:!0,onSubmit:h.handleSubmit,className:"mt-8",children:(0,r.jsxs)("div",{className:"space-y-5",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("label",{htmlFor:"name",className:"text-base font-medium text-gray-900",children:[" ","First Name"," "]}),(0,r.jsxs)("div",{className:"mt-2",children:[(0,r.jsx)("input",{className:"flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",type:"text",placeholder:"First Name",id:"firstname",...p("firstname")}),g.firstname&&f.firstname&&(0,r.jsx)("span",{className:"text-red-500 text-sm",children:f.firstname})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("label",{htmlFor:"name",className:"text-base font-medium text-gray-900",children:[" ","Last Name"," "]}),(0,r.jsxs)("div",{className:"mt-2",children:[(0,r.jsx)("input",{className:"flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",type:"text",placeholder:"Last Name",id:"lastname",...p("lastname")}),g.lastname&&f.lastname&&(0,r.jsx)("span",{className:"text-red-500 text-sm",children:f.lastname})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("label",{htmlFor:"email",className:"text-base font-medium text-gray-900",children:[" ","Email address"," "]}),(0,r.jsxs)("div",{className:"mt-2",children:[(0,r.jsx)("input",{className:"flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",type:"email",placeholder:"Email",id:"email",...p("email")}),g.email&&f.email&&(0,r.jsx)("span",{className:"text-red-500 text-sm",children:f.email})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("label",{htmlFor:"phone_number",className:"text-base font-medium text-gray-900",children:[" ","Phone Number"," "]}),(0,r.jsxs)("div",{className:"mt-2",children:[(0,r.jsx)("input",{className:"flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",type:"text",placeholder:"Phone Number",id:"phone_number",...p("phone_number")}),g.phone_number&&f.phone_number&&(0,r.jsx)("span",{className:"text-red-500 text-sm",children:f.phone_number})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsxs)("label",{htmlFor:"password",className:"text-base font-medium text-gray-900",children:[" ","Password"," "]})}),(0,r.jsxs)("div",{className:"mt-2",children:[(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)("input",{className:"flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",type:b?"text":"password",placeholder:"Password",id:"password",...p("password")}),(0,r.jsx)("button",{type:"button",onClick:()=>{y(e=>!e)},className:"absolute right-3 top-1/2 transform -translate-y-1/2","aria-label":b?"Hide password":"Show password",children:b?(0,r.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",className:"size-6 text-gray-700",children:[(0,r.jsx)("path",{d:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"}),(0,r.jsx)("path",{fillRule:"evenodd",d:"M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z",clipRule:"evenodd"})]}):(0,r.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",className:"size-6 text-gray-700",children:[(0,r.jsx)("path",{d:"M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z"}),(0,r.jsx)("path",{d:"M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z"}),(0,r.jsx)("path",{d:"M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z"})]})})]}),g.password&&f.password&&(0,r.jsx)("span",{className:"text-orange-500 text-sm mt-1 block",children:f.password})]})]}),(0,r.jsx)("div",{children:(0,r.jsxs)("button",{type:"submit",disabled:!h.isValid||!h.dirty,className:"inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white ".concat(h.isValid&&h.dirty?"bg-orange-500 hover:bg-orange-600":"bg-gray-300 cursor-not-allowed"),children:["Get started ",(0,r.jsx)(a.Z,{className:"ml-2",size:16})]})})]})})]})})]})})}}},function(e){e.O(0,[8173,998,5956,231,7475,2971,7023,1744],function(){return e(e.s=48063)}),_N_E=e.O()}]);