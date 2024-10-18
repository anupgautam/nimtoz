"use strict";(()=>{var e={};e.id=1946,e.ids=[1946],e.modules={53524:e=>{e.exports=require("@prisma/client")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},32081:e=>{e.exports=require("child_process")},6113:e=>{e.exports=require("crypto")},9523:e=>{e.exports=require("dns")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},41808:e=>{e.exports=require("net")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},12781:e=>{e.exports=require("stream")},24404:e=>{e.exports=require("tls")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},1986:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>x,patchFetch:()=>v,requestAsyncStorage:()=>m,routeModule:()=>c,serverHooks:()=>g,staticGenerationAsyncStorage:()=>h});var o={};r.r(o),r.d(o,{POST:()=>l});var i=r(49303),a=r(88716),n=r(60670),s=r(87070),d=r(75748);function p(e,t){if(!t)return null;let[r,o]=t.split(":").map(Number),i=new Date(e);return i.setHours(r),i.setMinutes(o),i.setSeconds(0),i.setMilliseconds(0),i}let u=r(55245).createTransport({host:"smtp.gmail.com",port:587,secure:!1,auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASS}});async function l(e){try{let{start_date:t,end_date:r,start_time:o,end_time:i,userId:a,productId:n,events:l,Hall:c}=await e.json(),m=new Date(t),h=new Date(r),g=p(t,o),x=p(r,i);if(await d.Z.event.findFirst({where:{productId:n,OR:[{start_date:{lt:h},end_date:{gt:m}}]}})){let e=new Date(m).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),t=new Date(h).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});return s.NextResponse.json({message:`Booking already exists from ${e} ${g} to ${t} ${x}`},{status:409})}let v=await d.Z.event.create({data:{start_date:new Date(t),end_date:new Date(r),start_time:g,end_time:x,userId:parseInt(a),productId:parseInt(n),is_approved:!1,is_rejected:!1,EventType:{connect:l.map(e=>({id:parseInt(e.id)}))},Hall:{connect:c.map(e=>({id:parseInt(e)}))}}}),b=await d.Z.product.findUnique({where:{id:parseInt(n)},select:{title:!0}}),f=await d.Z.user.findUnique({where:{id:parseInt(a)},select:{email:!0}}),q={from:process.env.EMAIL_USER,to:process.env.EMAIL_USER,subject:"New Venue Booking Request",text:"You have received a new venue booking request.",html:`
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 20px;
                            background-color: #f4f4f4;
                        }
                        .container {
                            background-color: #fff;
                            padding: 20px;
                            border-radius: 5px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color: #333;
                        }
                        .details {
                            margin-top: 20px;
                        }
                        .details th {
                            text-align: left;
                            padding: 5px;
                        }
                        .details td {
                            padding: 5px;
                        }
                        .footer {
                            margin-top: 20px;
                            font-size: 12px;
                            color: #777;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>New Venue Booking Request</h1>
                        <p>You have received a new booking request. Here are the details:</p>
                        <table class="details">
                            <tr>
                                <th>Start Date:</th>
                                <td>${v.start_date.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}</td>
                            </tr>
                            <tr>
                                <th>End Date:</th>
                                <td>${v.end_date.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}</td>
                            </tr>
                            <tr>
                                <th>Start Time:</th>
                                <td>${v.start_time?v.start_time.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):""}</td>
                            </tr>
                            <tr>
                                <th>End Time:</th>
                                <td>${v.end_time?v.end_time.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):""} </td>
                    </tr>
                    <tr>
                    <th>User Name: </th>
                        <td> ${f?.email}</td>
                            </tr>
                            <tr>
                            <th>Product Name: </th>
                                <td> ${b?.title} </td>
                                    </tr>
                                    </table>
                                    <p> Please review and approve the booking at your earliest convenience.</p>
                                        <div class="footer">
                                            <p>Thank you! </p>
                                                </div>
                                                </div>
                                                </body>
                                                </html>
                                                    `};return await u.sendMail(q),s.NextResponse.json({booking:v},{status:201})}catch(e){return console.error("Error creating booking:",e),s.NextResponse.json({error:"Error creating booking"},{status:500})}}let c=new i.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/bookings/route",pathname:"/api/bookings",filename:"route",bundlePath:"app/api/bookings/route"},resolvedPagePath:"C:\\Users\\Legion\\OneDrive\\Desktop\\Nimto NextJS\\src\\app\\api\\bookings\\route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:m,staticGenerationAsyncStorage:h,serverHooks:g}=c,x="/api/bookings/route";function v(){return(0,n.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:h})}},75748:(e,t,r)=>{r.d(t,{Z:()=>i});var o=r(53524);let i=globalThis.prismaGlobal??new o.PrismaClient}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[8948,5972,5245],()=>r(1986));module.exports=o})();