(function(){"use strict";var t={6746:function(t,e,i){var s=i(9963),r=i(6252);const o={class:"app"};function n(t,e,i,s,n,c){const h=(0,r.up)("VueCube");return(0,r.wg)(),(0,r.iD)("div",o,[(0,r.Wm)(h)])}const c=t=>((0,r.dD)("data-v-d92530fa"),t=t(),(0,r.Cn)(),t),h={class:"cube-simulator"},a={style:{"user-select":"none"},class:"scene"},u={style:{"user-select":"none"},ref:"cube",class:"cube"},b={class:"cube__face cube__face--front"},l={class:"cube__face cube__face--back"},d={class:"cube__face cube__face--right"},f={class:"cube__face cube__face--left"},p={class:"cube__face cube__face--top"},m={class:"cube__face cube__face--bottom"},g={class:"slider-wrapper"},w=c((()=>(0,r._)("label",null,"x:",-1))),v={class:"slider-wrapper-vertical"},k=c((()=>(0,r._)("label",null,"y:",-1))),y={class:"slider-wrapper"},_=c((()=>(0,r._)("label",null,"z:",-1))),C=["disabled"],S=["disabled"];function P(t,e,i,o,n,c){const P=(0,r.up)("CubeFace2x2");return(0,r.wg)(),(0,r.iD)("div",h,[(0,r._)("div",a,[(0,r._)("div",u,[(0,r._)("div",b,[(0,r.Wm)(P,{onStartSwipe:e[0]||(e[0]=t=>c.startSwipe("front",t)),onEndSwipe:e[1]||(e[1]=t=>c.endSwipe("front",t)),face:n.cube.front},null,8,["face"])]),(0,r._)("div",l,[(0,r.Wm)(P,{onStartSwipe:e[2]||(e[2]=t=>c.startSwipe("back",t)),onEndSwipe:e[3]||(e[3]=t=>c.endSwipe("back",t)),face:n.cube.back},null,8,["face"])]),(0,r._)("div",d,[(0,r.Wm)(P,{onStartSwipe:e[4]||(e[4]=t=>c.startSwipe("right",t)),onEndSwipe:e[5]||(e[5]=t=>c.endSwipe("right",t)),face:n.cube.right},null,8,["face"])]),(0,r._)("div",f,[(0,r.Wm)(P,{onStartSwipe:e[6]||(e[6]=t=>c.startSwipe("left",t)),onEndSwipe:e[7]||(e[7]=t=>c.endSwipe("left",t)),face:n.cube.left},null,8,["face"])]),(0,r._)("div",p,[(0,r.Wm)(P,{onStartSwipe:e[8]||(e[8]=t=>c.startSwipe("top",t)),onEndSwipe:e[9]||(e[9]=t=>c.endSwipe("top",t)),face:n.cube.top},null,8,["face"])]),(0,r._)("div",m,[(0,r.Wm)(P,{onStartSwipe:e[10]||(e[10]=t=>c.startSwipe("bottom",t)),onEndSwipe:e[11]||(e[11]=t=>c.endSwipe("bottom",t)),face:n.cube.bottom},null,8,["face"])])],512)]),(0,r._)("div",g,[w,(0,r.wy)((0,r._)("input",{class:"slider","onUpdate:modelValue":e[12]||(e[12]=t=>n.x=t),type:"range",min:"-360",max:"360"},null,512),[[s.nr,n.x]])]),(0,r._)("div",v,[k,(0,r.wy)((0,r._)("input",{class:"slider vertical","onUpdate:modelValue":e[13]||(e[13]=t=>n.y=t),orient:"vertical",type:"range",min:"-360",max:"360"},null,512),[[s.nr,n.y]])]),(0,r._)("div",y,[_,(0,r.wy)((0,r._)("input",{class:"slider","onUpdate:modelValue":e[14]||(e[14]=t=>n.z=t),type:"range",min:"-360",max:"360"},null,512),[[s.nr,n.z]])]),(0,r._)("div",null,[(0,r._)("button",{class:"button",onClick:e[15]||(e[15]=(...t)=>c.scramble&&c.scramble(...t))},"Scramble"),(0,r._)("button",{class:"button",onClick:e[16]||(e[16]=(...t)=>c.reset&&c.reset(...t))},"Reset")]),(0,r._)("div",null,[(0,r._)("button",{disabled:!n.history.length,class:"button",onClick:e[17]||(e[17]=(...t)=>c.undo&&c.undo(...t))},"Undo",8,C),(0,r._)("button",{disabled:!n.undoHistory.length,class:"button",onClick:e[18]||(e[18]=(...t)=>c.redo&&c.redo(...t))},"Redo",8,S)])])}i(560);var x=i(3577);const M={style:{display:"flex"}};function F(t,e,i,s,o,n){return(0,r.wg)(),(0,r.iD)("div",M,[(0,r._)("div",null,[(0,r._)("div",{ref:"c0","data-corner":"0",onMousedown:e[0]||(e[0]=e=>t.$emit("start-swipe",0)),onMouseup:e[1]||(e[1]=e=>t.$emit("end-swipe",0)),onTouchmove:e[2]||(e[2]=t=>n.touchMove(t)),class:(0,x.C_)(["square",i.face[0]])},null,34),(0,r._)("div",{ref:"c3","data-corner":"3",onMousedown:e[3]||(e[3]=e=>t.$emit("start-swipe",3)),onMouseup:e[4]||(e[4]=e=>t.$emit("end-swipe",3)),onTouchmove:e[5]||(e[5]=t=>n.touchMove(t)),class:(0,x.C_)(["square",i.face[3]])},null,34)]),(0,r._)("div",null,[(0,r._)("div",{ref:"c1","data-corner":"1",onMousedown:e[6]||(e[6]=e=>t.$emit("start-swipe",1)),onMouseup:e[7]||(e[7]=e=>t.$emit("end-swipe",1)),onTouchmove:e[8]||(e[8]=t=>n.touchMove(t)),class:(0,x.C_)(["square",i.face[1]])},null,34),(0,r._)("div",{ref:"c2","data-corner":"2",onMousedown:e[9]||(e[9]=e=>t.$emit("start-swipe",2)),onMouseup:e[10]||(e[10]=e=>t.$emit("end-swipe",2)),onTouchmove:e[11]||(e[11]=t=>n.touchMove(t)),class:(0,x.C_)(["square",i.face[2]])},null,34)])])}var O=i(8743),E=i(2262),N={name:"CubeFace2x2",props:{face:Array},methods:{touchMove(t){let e=t.touches[0].pageX,i=t.touches[0].pageY;window.document.elementFromPoint(e,i).dataset&&window.document.elementFromPoint(e,i).dataset.corner&&(this.end=window.document.elementFromPoint(e,i).dataset.corner)}},setup(t,e){const i=(0,E.iH)(-1),s=(0,E.iH)(null),{isSwiping:r,direction:o}=(0,O.YvF)(s,{onSwipeEnd(t,s){console.log("Swipe ending on: "+i.value),e.emit("start-swipe",0),e.emit("end-swipe",Number(i.value))}}),n=(0,E.iH)(null),{isSwiping1:c,direction1:h}=(0,O.YvF)(n,{onSwipeEnd(t,s){console.log("Swipe ending on: "+i.value),e.emit("start-swipe",1),e.emit("end-swipe",Number(i.value))}}),a=(0,E.iH)(null),{isSwiping2:u,direction2:b}=(0,O.YvF)(a,{onSwipeEnd(t,s){console.log("Swipe ending on: "+i.value),e.emit("start-swipe",2),e.emit("end-swipe",Number(i.value))}}),l=(0,E.iH)(null),{isSwiping3:d,direction3:f}=(0,O.YvF)(l,{onSwipeEnd(t,s){console.log("Swipe ending on: "+i.value),e.emit("start-swipe",3),e.emit("end-swipe",Number(i.value))}});return{c0:s,isSwiping:r,direction:o,c1:n,isSwiping1:c,direction1:h,c2:a,isSwiping2:u,direction2:b,c3:l,isSwiping3:d,direction3:f,end:i}}},$=i(3744);const H=(0,$.Z)(N,[["render",F],["__scopeId","data-v-25038a67"]]);var j=H,z={name:"VueCube",mounted(){this.showFront()},components:{CubeFace2x2:j},data(){return{cube:{front:["red","red","red","red"],back:["orange","orange","orange","orange"],right:["green","green","green","green"],left:["blue","blue","blue","blue"],top:["yellow","yellow","yellow","yellow"],bottom:["white","white","white","white"]},history:[],undoHistory:[],start:{face:null,corner:null},end:{face:null,corner:null},red:"red",blue:"blue",green:"green",orange:"orange",yellow:"yellow",black:"black",white:"white",loading:!1,x:0,y:0,z:0}},watch:{x(t,e){t!==e&&this.rotateCube(t,this.y,this.z)},y(t,e){t!==e&&this.rotateCube(this.x,t,this.z)},z(t,e){t!==e&&this.rotateCube(this.x,this.y,t)}},methods:{rotateCube(t,e,i){this.x=t,this.y=e,this.z=i;let s="";s+=" rotateY("+t+"deg)",s+=" rotateX("+e+"deg)",s+=" rotateZ("+i+"deg)",this.$refs.cube.style.transform=s},startSwipe(t,e){console.log("starting: "+e),this.start.face=t,this.start.corner=e},endSwipe(t,e){console.log("ending: "+e),this.end.face=t,this.end.corner=e,"top"!==this.start.face&&"bottom"!==this.start.face&&this.handleUandD(),"front"===this.start.face&&this.handleFront(),"back"===this.start.face&&this.handleBack(),"left"===this.start.face&&this.handleLeft(),"right"===this.start.face&&this.handleRight(),"top"===this.start.face&&this.handleTop(),"bottom"===this.start.face&&this.handleBottom(),this.start.face="front",this.start.corner=0},handleUandD(){0==this.start.corner&&1==this.end.corner?this.uPrime():1===this.start.corner&&0===this.end.corner?this.u():3===this.start.corner&&2===this.end.corner?this.d():2===this.start.corner&&3===this.end.corner&&this.dPrime()},handleFront(){1===this.start.corner&&2===this.end.corner?this.rPrime():2===this.start.corner&&1===this.end.corner?this.r():0===this.start.corner&&3===this.end.corner?this.l():3===this.start.corner&&0===this.end.corner&&this.lPrime()},handleBack(){1===this.start.corner&&2===this.end.corner?this.lPrime():2===this.start.corner&&1===this.end.corner?this.l():0===this.start.corner&&3===this.end.corner?this.r():3===this.start.corner&&0===this.end.corner&&this.rPrime()},handleLeft(){1===this.start.corner&&2===this.end.corner?this.fPrime():2===this.start.corner&&1===this.end.corner?this.f():0===this.start.corner&&3===this.end.corner?this.b():3===this.start.corner&&0===this.end.corner&&this.bPrime()},handleRight(){1===this.start.corner&&2===this.end.corner?this.bPrime():2===this.start.corner&&1===this.end.corner?this.b():0===this.start.corner&&3===this.end.corner?this.f():3===this.start.corner&&0===this.end.corner&&this.fPrime()},handleTop(){1===this.start.corner&&2===this.end.corner?this.rPrime():2===this.start.corner&&1===this.end.corner?this.r():0===this.start.corner&&3===this.end.corner?this.l():3===this.start.corner&&0===this.end.corner?this.lPrime():0===this.start.corner&&1===this.end.corner?this.bPrime():1===this.start.corner&&0===this.end.corner?this.b():3===this.start.corner&&2===this.end.corner?this.f():2===this.start.corner&&3===this.end.corner&&this.fPrime()},handleBottom(){1===this.start.corner&&2===this.end.corner?this.rPrime():2===this.start.corner&&1===this.end.corner?this.r():0===this.start.corner&&3===this.end.corner?this.l():3===this.start.corner&&0===this.end.corner?this.lPrime():0===this.start.corner&&1===this.end.corner?this.fPrime():1===this.start.corner&&0===this.end.corner?this.f():3===this.start.corner&&2===this.end.corner?this.b():2===this.start.corner&&3===this.end.corner&&this.bPrime()},showFront(){this.rotateCube(-20,-20,0)},reset(){this.cube={front:["red","red","red","red"],back:["orange","orange","orange","orange"],right:["green","green","green","green"],left:["blue","blue","blue","blue"],top:["yellow","yellow","yellow","yellow"],bottom:["white","white","white","white"]}},solve(){let t=new Worker("solver.js");console.log("Starting up the worker..."),t.postMessage(this.getCubeCopy()),this.loading=!0,t.onmessage=t=>{console.log("Response from solver worker: "+t.data),this.loading=!1}},getCubeCopy(){return JSON.parse(JSON.stringify(this.cube))},clockwise(t){let e=JSON.parse(JSON.stringify(t));return e[0]=t[3],e[1]=t[0],e[2]=t[1],e[3]=t[2],e},counterclockwise(t){let e=JSON.parse(JSON.stringify(t));return e[0]=t[1],e[1]=t[2],e[2]=t[3],e[3]=t[0],e},save(){this.history.push(this.getCubeCopy())},undo(){this.undoHistory.push(this.getCubeCopy()),this.cube=this.history.pop()},redo(){this.history.push(this.getCubeCopy()),this.cube=this.undoHistory.pop()},u(){this.save();let t=this.getCubeCopy();t.front[0]=this.cube.right[0],t.front[1]=this.cube.right[1],t.back[0]=this.cube.left[0],t.back[1]=this.cube.left[1],t.left[0]=this.cube.front[0],t.left[1]=this.cube.front[1],t.right[0]=this.cube.back[0],t.right[1]=this.cube.back[1],t.top=this.clockwise(t.top),this.cube=t},uPrime(){this.save();let t=this.getCubeCopy();t.front[0]=this.cube.left[0],t.front[1]=this.cube.left[1],t.back[0]=this.cube.right[0],t.back[1]=this.cube.right[1],t.left[0]=this.cube.back[0],t.left[1]=this.cube.back[1],t.right[0]=this.cube.front[0],t.right[1]=this.cube.front[1],t.top=this.counterclockwise(t.top),this.cube=t},r(){this.save(),this.history.push(this.getCubeCopy());let t=this.getCubeCopy();t.front[1]=this.cube.bottom[1],t.front[2]=this.cube.bottom[2],t.back[0]=this.cube.top[2],t.back[3]=this.cube.top[1],t.top[1]=this.cube.front[1],t.top[2]=this.cube.front[2],t.bottom[1]=this.cube.back[3],t.bottom[2]=this.cube.back[0],t.right=this.clockwise(t.right),this.cube=t},rPrime(){this.save();let t=this.getCubeCopy();t.front[1]=this.cube.top[1],t.front[2]=this.cube.top[2],t.back[0]=this.cube.bottom[2],t.back[3]=this.cube.bottom[1],t.bottom[1]=this.cube.front[1],t.bottom[2]=this.cube.front[2],t.top[1]=this.cube.back[3],t.top[2]=this.cube.back[0],t.right=this.counterclockwise(t.right),this.cube=t},f(){this.save();let t=this.getCubeCopy();t.bottom[0]=this.cube.right[3],t.bottom[1]=this.cube.right[0],t.top[2]=this.cube.left[1],t.top[3]=this.cube.left[2],t.left[1]=this.cube.bottom[0],t.left[2]=this.cube.bottom[1],t.right[0]=this.cube.top[3],t.right[3]=this.cube.top[2],t.front=this.clockwise(this.cube.front),this.cube=t},fPrime(){this.save();let t=this.getCubeCopy();t.bottom[0]=this.cube.left[1],t.bottom[1]=this.cube.left[2],t.top[2]=this.cube.right[3],t.top[3]=this.cube.right[0],t.left[1]=this.cube.top[2],t.left[2]=this.cube.top[3],t.right[0]=this.cube.bottom[1],t.right[3]=this.cube.bottom[0],t.front=this.counterclockwise(this.cube.front),this.cube=t},l(){this.save();let t=this.getCubeCopy();t.front[0]=this.cube.top[0],t.front[3]=this.cube.top[3],t.back[1]=this.cube.bottom[3],t.back[2]=this.cube.bottom[0],t.bottom[0]=this.cube.front[0],t.bottom[3]=this.cube.front[3],t.top[0]=this.cube.back[2],t.top[3]=this.cube.back[1],t.left=this.clockwise(this.cube.left),this.cube=t},lPrime(){this.save();let t=this.getCubeCopy();t.front[0]=this.cube.bottom[0],t.front[3]=this.cube.bottom[3],t.back[1]=this.cube.top[3],t.back[2]=this.cube.top[0],t.bottom[0]=this.cube.back[2],t.bottom[3]=this.cube.back[1],t.top[0]=this.cube.front[0],t.top[3]=this.cube.front[3],t.left=this.counterclockwise(this.cube.left),this.cube=t},b(){this.save();let t=this.getCubeCopy();t.bottom[2]=this.cube.left[3],t.bottom[3]=this.cube.left[0],t.top[0]=this.cube.right[1],t.top[1]=this.cube.right[2],t.left[0]=this.cube.top[1],t.left[3]=this.cube.top[0],t.right[1]=this.cube.bottom[2],t.right[2]=this.cube.bottom[3],t.back=this.clockwise(this.cube.back),this.cube=t},bPrime(){this.save();let t=this.getCubeCopy();t.bottom[2]=this.cube.right[1],t.bottom[3]=this.cube.right[2],t.top[0]=this.cube.left[3],t.top[1]=this.cube.left[0],t.left[0]=this.cube.bottom[3],t.left[3]=this.cube.bottom[2],t.right[1]=this.cube.top[0],t.right[2]=this.cube.top[1],t.back=this.counterclockwise(this.cube.back),this.cube=t},d(){this.save();let t=this.getCubeCopy();t.front[2]=this.cube.left[2],t.front[3]=this.cube.left[3],t.back[2]=this.cube.right[2],t.back[3]=this.cube.right[3],t.left[2]=this.cube.back[2],t.left[3]=this.cube.back[3],t.right[2]=this.cube.front[2],t.right[3]=this.cube.front[3],t.bottom=this.clockwise(this.cube.bottom),this.cube=t},dPrime(){this.save();let t=this.getCubeCopy();t.front[2]=this.cube.right[2],t.front[3]=this.cube.right[3],t.back[2]=this.cube.left[2],t.back[3]=this.cube.left[3],t.left[2]=this.cube.front[2],t.left[3]=this.cube.front[3],t.right[2]=this.cube.back[2],t.right[3]=this.cube.back[3],t.bottom=this.counterclockwise(this.cube.bottom),this.cube=t},makeMove(t){switch(t){case"u":this.u();case"U":this.uPrime();case"d":this.d();case"D":this.dPrime();case"l":this.l();case"L":this.lPrime();case"r":this.r();case"R":this.rPrime();case"f":this.f();case"F":this.fPrime();case"b":this.b();case"B":this.bPrime()}},scramble(){let t=["u","U","d","D","l","L","r","R","f","F","b","B"];for(let e=0;e<12;e++)this.makeMove(t[Math.floor(Math.random()*t.length)])}}};const D=(0,$.Z)(z,[["render",P],["__scopeId","data-v-d92530fa"]]);var T=D,U={name:"App",components:{VueCube:T}};const W=(0,$.Z)(U,[["render",n]]);var R=W;window.$=window.jQuery=i(9755),(0,s.ri)(R).mount("#app")}},e={};function i(s){var r=e[s];if(void 0!==r)return r.exports;var o=e[s]={exports:{}};return t[s].call(o.exports,o,o.exports,i),o.exports}i.m=t,function(){var t=[];i.O=function(e,s,r,o){if(!s){var n=1/0;for(u=0;u<t.length;u++){s=t[u][0],r=t[u][1],o=t[u][2];for(var c=!0,h=0;h<s.length;h++)(!1&o||n>=o)&&Object.keys(i.O).every((function(t){return i.O[t](s[h])}))?s.splice(h--,1):(c=!1,o<n&&(n=o));if(c){t.splice(u--,1);var a=r();void 0!==a&&(e=a)}}return e}o=o||0;for(var u=t.length;u>0&&t[u-1][2]>o;u--)t[u]=t[u-1];t[u]=[s,r,o]}}(),function(){i.d=function(t,e){for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};i.O.j=function(e){return 0===t[e]};var e=function(e,s){var r,o,n=s[0],c=s[1],h=s[2],a=0;if(n.some((function(e){return 0!==t[e]}))){for(r in c)i.o(c,r)&&(i.m[r]=c[r]);if(h)var u=h(i)}for(e&&e(s);a<n.length;a++)o=n[a],i.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return i.O(u)},s=self["webpackChunkvue_cubes"]=self["webpackChunkvue_cubes"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=i.O(void 0,[998],(function(){return i(6746)}));s=i.O(s)})();
//# sourceMappingURL=app.d80fda5b.js.map