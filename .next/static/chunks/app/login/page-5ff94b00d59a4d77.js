(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2626],{40861:function(e,t,s){Promise.resolve().then(s.bind(s,71193))},78030:function(e,t,s){"use strict";s.d(t,{Z:function(){return o}});var r=s(2265);let a=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),l=function(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];return t.filter((e,t,s)=>!!e&&s.indexOf(e)===t).join(" ")};var n={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let i=(0,r.forwardRef)((e,t)=>{let{color:s="currentColor",size:a=24,strokeWidth:i=2,absoluteStrokeWidth:o,className:d="",children:c,iconNode:u,...m}=e;return(0,r.createElement)("svg",{ref:t,...n,width:a,height:a,stroke:s,strokeWidth:o?24*Number(i)/Number(a):i,className:l("lucide",d),...m},[...u.map(e=>{let[t,s]=e;return(0,r.createElement)(t,s)}),...Array.isArray(c)?c:[c]])}),o=(e,t)=>{let s=(0,r.forwardRef)((s,n)=>{let{className:o,...d}=s;return(0,r.createElement)(i,{ref:n,iconNode:t,className:l("lucide-".concat(a(e)),o),...d})});return s.displayName="".concat(e),s}},71976:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});let r=(0,s(78030).Z)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},66648:function(e,t,s){"use strict";s.d(t,{default:function(){return a.a}});var r=s(55601),a=s.n(r)},87138:function(e,t,s){"use strict";s.d(t,{default:function(){return a.a}});var r=s(231),a=s.n(r)},16463:function(e,t,s){"use strict";var r=s(71169);s.o(r,"usePathname")&&s.d(t,{usePathname:function(){return r.usePathname}}),s.o(r,"useRouter")&&s.d(t,{useRouter:function(){return r.useRouter}}),s.o(r,"useSearchParams")&&s.d(t,{useSearchParams:function(){return r.useSearchParams}})},55601:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var s in t)Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}(t,{default:function(){return o},getImageProps:function(){return i}});let r=s(99920),a=s(80497),l=s(38173),n=r._(s(21241));function i(e){let{props:t}=(0,a.getImgProps)(e,{defaultLoader:n.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,s]of Object.entries(t))void 0===s&&delete t[e];return{props:t}}let o=l.Image},71193:function(e,t,s){"use strict";s.r(t);var r=s(57437),a=s(71976),l=s(87138),n=s(14245),i=s(17821),o=s(2265),d=s(30998),c=s(16463),u=s(66648),m=s(95956);t.default=()=>{let{data:e}=(0,d.useSession)(),t=(0,c.useRouter)();(0,o.useEffect)(()=>{(null==e?void 0:e.user)&&t.push("/")},[e,t]);let s=(0,n.Ry)({email:(0,n.Z_)().email("Invalid Email Address").required("Email is required"),password:(0,n.Z_)().min(8,"Password must be at least 8 characters").matches(/[a-zA-Z]/,"Password must contain at least one letter").matches(/[0-9]/,"Password must contain at least one number").required("Password is required")}),h=(0,i.TA)({validationSchema:s,initialValues:{email:"",password:""},onSubmit:(e,t)=>{let{resetForm:s}=t;v(e,s)}}),{errors:f,getFieldProps:x,touched:g}=h;(0,o.useEffect)(()=>{},[f]);let[p,w]=(0,o.useState)(!1),v=async(e,s)=>{try{var r;let a=await (0,d.signIn)("credentials",{...e,redirect:!1});if(null==a?void 0:a.error){console.error("Login failed:",a.error),m.Am.error("Login Failed");return}let l=await fetch("/api/auth/session"),n=await l.json();(null==n?void 0:null===(r=n.user)||void 0===r?void 0:r.role)==="Admin"?(t.push("/dashboard"),m.Am.success("Redirecting to the dashboard")):(t.push("/"),m.Am.success("Redirecting to Homepage")),s()}catch(e){m.Am.error("Backend error")}};return(0,r.jsx)("section",{className:"min-h-screen",children:(0,r.jsxs)("div",{className:"grid min-h-screen grid-cols-1 lg:grid-cols-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24",children:(0,r.jsxs)("div",{className:"xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md",children:[(0,r.jsx)("h2",{className:"text-3xl font-bold leading-tight text-orange-500 sm:text-4xl",children:"Sign in"}),(0,r.jsxs)("p",{className:"mt-2 text-sm text-gray-600",children:["Don't have an account?"," ",(0,r.jsx)(l.default,{href:"/register",title:"",className:"font-semibold text-orange-600 transition-all duration-200 hover:underline",children:"Create a free account"})]}),(0,r.jsx)("form",{noValidate:!0,onSubmit:h.handleSubmit,className:"mt-8",children:(0,r.jsxs)("div",{className:"space-y-5",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("label",{htmlFor:"",className:"text-base font-medium text-gray-900",children:[" ","Email address"," "]}),(0,r.jsxs)("div",{className:"mt-2",children:[(0,r.jsx)("input",{className:"flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",type:"email",placeholder:"Email",id:"email",...x("email")}),g.email&&f.email&&(0,r.jsx)("span",{className:"text-red-500 text-sm",children:f.email})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("label",{htmlFor:"",className:"text-base font-medium text-gray-900",children:[" ","Password"," "]}),(0,r.jsxs)(l.default,{href:"forgot-password",title:"",className:"text-sm font-semibold text-orange-600 hover:underline",children:[" ","Forgot password?"," "]})]}),(0,r.jsxs)("div",{className:"mt-2",children:[(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)("input",{className:"flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",type:p?"text":"password",placeholder:"Password",id:"password",...x("password")}),(0,r.jsx)("button",{type:"button",onClick:()=>{w(e=>!e)},className:"absolute right-3 top-1/2 transform -translate-y-1/2","aria-label":p?"Hide password":"Show password",children:p?(0,r.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",className:"size-6 text-gray-700",children:[(0,r.jsx)("path",{d:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"}),(0,r.jsx)("path",{fillRule:"evenodd",d:"M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z",clipRule:"evenodd"})]}):(0,r.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",className:"size-6 text-gray-700",children:[(0,r.jsx)("path",{d:"M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z"}),(0,r.jsx)("path",{d:"M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z"}),(0,r.jsx)("path",{d:"M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z"})]})})]}),g.password&&f.password&&(0,r.jsx)("span",{className:"text-red-500 text-sm mt-1 block",children:f.password})]})]}),(0,r.jsx)("div",{children:(0,r.jsxs)("button",{type:"submit",disabled:!h.isValid||!h.dirty,className:"inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white ".concat(h.isValid&&h.dirty?"bg-orange-500 hover:bg-orange-600":"bg-gray-300 cursor-not-allowed"),children:["Get started ",(0,r.jsx)(a.Z,{className:"ml-2",size:16})]})})]})})]})}),(0,r.jsx)("div",{className:"hidden lg:block h-full w-full",children:(0,r.jsx)(u.default,{className:"mx-auto h-full w-full rounded-md object-cover",src:"/login.svg",alt:"Login page illustration",height:200,width:200})})]})})}}},function(e){e.O(0,[8173,998,5956,231,7475,2971,7023,1744],function(){return e(e.s=40861)}),_N_E=e.O()}]);