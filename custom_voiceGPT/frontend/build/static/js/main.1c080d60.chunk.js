(this.webpackJsonpstreamlit_custom_voice_gpt=this.webpackJsonpstreamlit_custom_voice_gpt||[]).push([[0],{20:function(e,t){function a(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}a.keys=function(){return[]},a.resolve=a,e.exports=a,a.id=20},25:function(e,t,a){e.exports=a(43)},43:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(21),c=a.n(o),l=a(8),s=a(54),i=a(6),u=a.n(i);let d;var p=e=>{let{commands:t,myFunc:a,listenAfterRelpy:o,noResponseTime:c=1,show_conversation:l=!0}=e;const[s,u]=Object(n.useState)(!0),[p,m]=Object(n.useState)(!0),{transcript:g,interimTranscript:f,finalTranscript:b,resetTranscript:h,listening:E,browserSupportsSpeechRecognition:y,isMicrophoneAvailable:w}=Object(i.useSpeechRecognition)({transcribing:s,clearTranscriptOnListen:p}),[_,v]=Object(n.useState)("");return Object(n.useEffect)(()=>{},[f]),Object(n.useEffect)(()=>{""!=b&&(console.log("Got final result:",b),d&&clearTimeout(d),d=setTimeout(()=>{v(b);for(let e=0;e<t.length;e++){const{keywords:n,api_body:r}=t[e];for(let o=0;o<n.length;o++){const r=new RegExp(n[o],"i");if(-1!=b.search(r))return a(b,t[e],1),void h()}}if(o)return a(b,{api_body:{keyword:""}},3),void h();console.log("waiting for keyword"),h()},1e3*c)),""==b||o||(v(b),h())},[b,o,t]),y?w?r.a.createElement(r.a.Fragment,null,l&&r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("span",null,"you said: ",_),r.a.createElement("span",null,"listening: ",E?"on":"off"),r.a.createElement("span",null,"clearTranscriptOnListen: ",p?"on":"off"))):r.a.createElement("span",null,"Please allow access to the microphone"):r.a.createElement("span",null,"No browser support")},m=a(3);let g=[],f=!1;var b=e=>{const{api:t,kwargs:a={}}=e,{commands:o,height:c,width:i,show_conversation:d,show_video:b,input_text:h,no_response_time:E,face_recon:y}=a,[w,_]=Object(n.useState)(a.self_image),[v,O]=Object(n.useState)(""),[x,k]=Object(n.useState)([]),[j,F]=Object(n.useState)(!1),[R,S]=Object(n.useState)(!1),[T,N]=Object(n.useState)(!1),[C,L]=Object(n.useState)(""),D=Object(n.useRef)([]),A=Object(n.useRef)(!1),U=Object(n.useRef)(),M=Object(n.useRef)(),I=Object(n.useRef)(null),P=async(e,a,n)=>{O(" (".concat(a.api_body.keyword,") ").concat(e,","));const r=[...g,{user:e}];k([...r]);try{console.log("api call on listen...",a);const e={tigger_type:n,api_key:"api_key",text:r,self_image:w,face_data:D.current};console.log("api");const{data:o}=await s.a.post(t,e);console.log("data :>> ",o,e),o.self_image&&_(o.self_image),o.audio_path?(I.current&&I.current.pause(),I.current=new Audio(o.audio_path),I.current.play(),I.current.onended=()=>{console.log("Audio playback finished."),o.listen_after_reply&&F(o.listen_after_reply),k(o.text),g=[...o.text],!0===o.page_direct&&(console.log("api has page direct",o.page_direct),window.location.reload())}):(o.listen_after_reply&&F(o.listen_after_reply),k(o.text),g=[...o.text],!0===o.page_direct&&(console.log("api has page direct",o.page_direct),window.location.reload()))}catch(o){console.log("api call on listen failded!",o)}};return Object(n.useEffect)(()=>l.a.setFrameHeight()),Object(n.useEffect)(()=>{},[e]),Object(n.useEffect)(()=>{(async()=>{Promise.all([m.f.tinyFaceDetector.loadFromUri("./models"),m.f.faceLandmark68Net.loadFromUri("./models"),m.f.faceRecognitionNet.loadFromUri("./models"),m.f.faceExpressionNet.loadFromUri("./models")]).then(S(!0))})();const e=setInterval(()=>{console.log("faceData.current :>> ",D.current)},3e3);return()=>clearInterval(e)},[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"p-2"},r.a.createElement("div",null,r.a.createElement("img",{src:w,height:c||100,width:i||100})),r.a.createElement("div",{className:"p-2"},r.a.createElement(p,{commands:o,myFunc:P,listenAfterRelpy:j,noResponseTime:E,show_conversation:d})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-primary",onClick:()=>u.a.startListening({continuous:!0,language:"en-GB"})},"Listen continuously")),h&&r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{className:"form-control",type:"text",placeholder:"Chat with chatGPT",value:C,onChange:e=>{const{value:t}=e.target;L(t)},onKeyDown:e=>{"Enter"===e.key&&(console.log("textString :>> ",C),P(C,{api_body:{keyword:""}},4),L(""))}})),!0===d&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null," You: ",v),x.map((e,t)=>r.a.createElement("div",{key:t},r.a.createElement("div",null,"-user: ",e.user),r.a.createElement("div",null,"-resp: ",e.resp?e.resp:"thinking..."))))),r.a.createElement("div",null),r.a.createElement("div",null,y&&r.a.createElement("div",{style:{textAlign:"center",padding:"10px"}},T&&R?r.a.createElement("button",{onClick:()=>{U.current.pause(),U.current.srcObject.getTracks()[0].stop(),N(!1)},style:{cursor:"pointer",backgroundColor:"green",color:"white",padding:"15px",fontSize:"25px",border:"none",borderRadius:"10px"}},"Close Webcam"):r.a.createElement("button",{onClick:()=>{N(!0),navigator.mediaDevices.getUserMedia({video:{width:300}}).then(e=>{let t=U.current;t.srcObject=e,t.play()}).catch(e=>{console.error("error:",e)})},style:{cursor:"pointer",backgroundColor:"green",color:"white",padding:"15px",fontSize:"25px",border:"none",borderRadius:"10px"}},"Open Webcam")),T?R?r.a.createElement("div",null,r.a.createElement("div",{style:{display:"flex",justifyContent:"center",padding:"10px",position:b?"":"absolute",opacity:b?1:.3}},r.a.createElement("video",{ref:U,height:480,width:640,onPlay:()=>{setInterval(async()=>{if(M&&M.current){M.current.innerHTML=m.b(U.current);const e={width:640,height:480};m.e(M.current,e);const t=await m.c(U.current,new m.a).withFaceLandmarks().withFaceExpressions(),n=m.g(t,e);if(n.length>0?(D.current=n,!A.current&&y&&(P("",{api_body:{keyword:""}},2),A.current=!0)):setTimeout(()=>{D.current=[]},1e3),n.length>0&&!f&&(f=!0,a.hello_audio)){new Audio(a.hello_audio).play()}M&&M.current&&M.current.getContext("2d").clearRect(0,0,640,480),M&&M.current&&m.d.drawDetections(M.current,n),M&&M.current&&m.d.drawFaceLandmarks(M.current,n),M&&M.current&&m.d.drawFaceExpressions(M.current,n)}},300)},style:{borderRadius:"10px"}}),r.a.createElement("canvas",{ref:M,style:{position:"absolute"}}))):r.a.createElement("div",null,"loading..."):r.a.createElement(r.a.Fragment,null)))};var h=Object(l.b)(e=>{const{api:t,kwargs:a}=e.args;return Object(n.useEffect)(()=>l.a.setFrameHeight()),r.a.createElement(r.a.Fragment,null,r.a.createElement(b,{api:t,kwargs:a}))}),E=a(55),y=a(24),w=a(53),_=a(44);const v=new E.a;c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y.a,{value:v},r.a.createElement(w.a,{theme:_.a},r.a.createElement(h,null)))),document.getElementById("root"))}},[[25,1,2]]]);
//# sourceMappingURL=main.1c080d60.chunk.js.map