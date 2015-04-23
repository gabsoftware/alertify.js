!function(global,undefined){"use strict";var Alertify,document=global.document;Alertify=function(){function getStyleRuleValue(style,selector,sheet){for(var sheets="undefined"!=typeof sheet?[sheet]:document.styleSheets,i=0,l=sheets.length;l>i;i++){sheet=sheets[i];try{if("undefined"==typeof sheet.cssRules||!sheet.cssRules)continue}catch(err){continue}for(var j=0,k=sheet.cssRules.length;k>j;j++){var rule=sheet.cssRules[j];if(rule.selectorText&&-1!==rule.selectorText.split(",").indexOf(selector))return rule.style[style]}}return null}var $,btnCancel,btnOK,btnReset,btnResetBack,btnFocus,elCallee,elCover,elDialog,elLog,form,input,getTransitionEvent,_alertify={},dialogs={},isopen=!1,keys={ENTER:13,ESC:27,SPACE:32},queue=[];return dialogs={buttons:{holder:'<nav class="alertify-buttons">{{buttons}}</nav>',submit:'<button type="submit" class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</button>',ok:'<button class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</button>',cancel:'<button class="alertify-button alertify-button-cancel" id="alertify-cancel">{{cancel}}</button>'},input:'<div class="alertify-text-wrapper"><input type="text" class="alertify-text" id="alertify-text"></div>',message:'<p class="alertify-message">{{message}}</p>',log:'<article class="alertify-log{{class}}">{{message}}</article>'},getTransitionEvent=function(){var t,type,supported=!1,el=document.createElement("fakeelement"),transitions={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"};for(t in transitions)if(transitions.hasOwnProperty(t)&&el.style[t]!==undefined){type=transitions[t],supported=!0;break}return{type:type,supported:supported}},$=function(id){return document.getElementById(id)},_alertify={labels:{ok:"OK",cancel:"Cancel"},delay:5e3,buttonReverse:!1,buttonFocus:"ok",transition:undefined,keydown:!1,addListeners:function(fn){var keydown,ok,cancel,common,key,reset,hasOK="undefined"!=typeof btnOK,hasCancel="undefined"!=typeof btnCancel,hasInput="undefined"!=typeof input,val="",self=this;ok=function(event){event.preventDefault(),common(event),"undefined"!=typeof input&&(val=input.value),"function"==typeof fn&&("undefined"!=typeof input?fn(!0,val):fn(!0))},cancel=function(event){event.preventDefault(),common(event),"function"==typeof fn&&fn(!1)},common=function(){self.hide(),global.removeEventListener("keyup",key),global.removeEventListener("keydown",keydown),global.removeEventListener("focus",reset),hasOK&&btnOK.removeEventListener("click",ok),hasCancel&&btnCancel.removeEventListener("click",cancel)},key=function(event){var keyCode=event.keyCode;self.keydown=!1,keyCode===keys.SPACE&&!hasInput||hasInput&&keyCode===keys.ENTER?ok(event):keyCode===keys.ESC&&hasCancel&&cancel(event)},keydown=function(){self.keydown=!0},reset=function(){hasInput?input.focus():!hasCancel||self.buttonReverse?btnOK.focus():btnCancel.focus()},btnReset.addEventListener("focus",reset),btnResetBack.addEventListener("focus",reset),hasOK&&btnOK.addEventListener("click",ok),hasCancel&&btnCancel.addEventListener("click",cancel),global.addEventListener("keyup",key),global.addEventListener("keydown",keydown),this.transition.supported||this.setFocus()},handleErrors:function(){if("undefined"!=typeof global.onerror){var self=this;return global.onerror=function(msg,url,line){self.error("["+msg+" on line "+line+" of "+url+"]",0)},!0}return!1},appendButtons:function(secondary,primary){return this.buttonReverse?primary+secondary:secondary+primary},build:function(item){var html="",type=item.type,message=item.message,css=item.cssClass||"";switch(html+='<div class="alertify-dialog">',html+='<a id="alertify-resetFocusBack" class="alertify-resetFocus" href="#">Reset Focus</a>',"none"===_alertify.buttonFocus&&(html+='<a href="#" id="alertify-noneFocus" class="alertify-hidden"></a>'),"prompt"===type&&(html+='<div id="alertify-form">'),html+='<article class="alertify-inner">',html+=dialogs.message.replace("{{message}}",message),"prompt"===type&&(html+=dialogs.input),html+=dialogs.buttons.holder,html+="</article>","prompt"===type&&(html+="</div>"),html+='<a id="alertify-resetFocus" class="alertify-resetFocus" href="#">Reset Focus</a>',html+="</div>",type){case"confirm":html=html.replace("{{buttons}}",this.appendButtons(dialogs.buttons.cancel,dialogs.buttons.ok)),html=html.replace("{{ok}}",this.labels.ok).replace("{{cancel}}",this.labels.cancel);break;case"prompt":html=html.replace("{{buttons}}",this.appendButtons(dialogs.buttons.cancel,dialogs.buttons.submit)),html=html.replace("{{ok}}",this.labels.ok).replace("{{cancel}}",this.labels.cancel);break;case"alert":html=html.replace("{{buttons}}",dialogs.buttons.ok),html=html.replace("{{ok}}",this.labels.ok)}return elDialog.className="alertify alertify-"+type+" "+css,elCover.className="alertify-cover",html},close:function(elem,wait){var hideElement,transitionDone,timer=wait&&!isNaN(wait)?+wait:this.delay,self=this;elem.addEventListener("click",function(){hideElement(elem)}),transitionDone=function(event){event.stopPropagation(),this.removeEventListener(self.transition.type,transitionDone),elLog.removeChild(this),elLog.hasChildNodes()||(elLog.className+=" alertify-logs-hidden")},hideElement=function(el){if("undefined"!=typeof el&&el.parentNode===elLog)if(self.transition.supported){el.addEventListener(self.transition.type,transitionDone),el.className+=" alertify-log-hide";var dur=(getStyleRuleValue("transition-duration",".alertify-log-hide")||getStyleRuleValue("-webkit-transition-duration",".alertify-log-hide")||getStyleRuleValue("-moz-transition-duration",".alertify-log-hide")||getStyleRuleValue("-o-transition-duration",".alertify-log-hide")||"0").toLowerCase(),time=parseInt(dur),offset=1;(!time||isNaN(time))&&(time=500),dur.indexOf("ms")>-1?time+=offset:dur.indexOf("s")>-1&&(time*=1e3,time+=offset),setTimeout(function(){"undefined"!=typeof el&&el.parentNode===elLog&&elLog.removeChild(el)},time)}else elLog.removeChild(el),elLog.hasChildNodes()||(elLog.className+=" alertify-logs-hidden")},0!==wait&&setTimeout(function(){hideElement(elem)},timer)},dialog:function(message,type,fn,placeholder,cssClass){elCallee=document.activeElement;var check=function(){elLog&&null!==elLog.scrollTop&&elCover&&null!==elCover.scrollTop||check()};if("string"!=typeof message)throw new Error("message must be a string");if("string"!=typeof type)throw new Error("type must be a string");if("undefined"!=typeof fn&&"function"!=typeof fn)throw new Error("fn must be a function");return this.init(),check(),queue.push({type:type,message:message,callback:fn,placeholder:placeholder,cssClass:cssClass}),isopen||this.setup(),this},extend:function(type){if("string"!=typeof type)throw new Error("extend method must have exactly one parameter");return function(message,wait){return this.log(message,type,wait),this}},hide:function(){var transitionDone,self=this;queue.splice(0,1),queue.length>0?this.setup(!0):(isopen=!1,transitionDone=function(event){event.stopPropagation(),elDialog.removeEventListener(self.transition.type,transitionDone)},this.transition.supported?(elDialog.addEventListener(this.transition.type,transitionDone),elDialog.className="alertify alertify-hide alertify-hidden"):elDialog.className="alertify alertify-hide alertify-hidden alertify-isHidden",elCover.className="alertify-cover alertify-cover-hidden",setTimeout(function(){self.keydown?document.body.focus():elCallee.focus()}))},init:function(){null==$("alertify-cover")&&(elCover=document.createElement("div"),elCover.setAttribute("id","alertify-cover"),elCover.className="alertify-cover alertify-cover-hidden",document.body.appendChild(elCover)),null==$("alertify")&&(isopen=!1,queue=[],elDialog=document.createElement("section"),elDialog.setAttribute("id","alertify"),elDialog.className="alertify alertify-hidden",document.body.appendChild(elDialog)),null==$("alertify-logs")&&(elLog=document.createElement("section"),elLog.setAttribute("id","alertify-logs"),elLog.className="alertify-logs alertify-logs-hidden",document.body.appendChild(elLog)),document.body.setAttribute("tabindex","0"),this.transition=getTransitionEvent()},log:function(message,type,wait,click){var check=function(){elLog&&null!==elLog.scrollTop||check()};return this.init(),check(),elLog.className="alertify-logs",this.notify(message,type,wait,click),this},notify:function(message,type,wait,click){var log=document.createElement("article");log.className="alertify-log"+("string"==typeof type&&""!==type?" alertify-log-"+type:""),log.innerHTML=message,"function"==typeof click&&log.addEventListener("click",click),elLog.appendChild(log),setTimeout(function(){log.className=log.className+" alertify-log-show"},50),this.close(log,wait)},set:function(args){var k;if("object"!=typeof args&&args instanceof Array)throw new Error("args must be an object");for(k in args)args.hasOwnProperty(k)&&(this[k]=args[k])},setFocus:function(){input?(input.focus(),input.select()):btnFocus.focus()},setup:function(fromQueue){var transitionDone,item=queue[0],self=this;isopen=!0,transitionDone=function(event){event.stopPropagation(),self.setFocus(),elDialog.removeEventListener(self.transition.type,transitionDone)},this.transition.supported&&!fromQueue&&elDialog.addEventListener(this.transition.type,transitionDone),elDialog.innerHTML=this.build(item),btnReset=$("alertify-resetFocus"),btnResetBack=$("alertify-resetFocusBack"),btnOK=$("alertify-ok")||undefined,btnCancel=$("alertify-cancel")||undefined,btnFocus="cancel"===_alertify.buttonFocus?btnCancel:"none"===_alertify.buttonFocus?$("alertify-noneFocus"):btnOK,input=$("alertify-text")||undefined,form=$("alertify-form")||undefined,"string"==typeof item.placeholder&&""!==item.placeholder&&(input.value=item.placeholder),fromQueue&&this.setFocus(),this.addListeners(item.callback)}},{alert:function(message,fn,cssClass){return _alertify.dialog(message,"alert",fn,"",cssClass),this},confirm:function(message,fn,cssClass){return _alertify.dialog(message,"confirm",fn,"",cssClass),this},extend:_alertify.extend,init:_alertify.init,log:function(message,type,wait,click){return _alertify.log(message,type,wait,click),this},prompt:function(message,fn,placeholder,cssClass){return _alertify.dialog(message,"prompt",fn,placeholder,cssClass),this},success:function(message,wait,click){return _alertify.log(message,"success",wait,click),this},error:function(message,wait,click){return _alertify.log(message,"error",wait,click),this},warning:function(message,wait,click){return _alertify.log(message,"warning",wait,click),this},set:function(args){_alertify.set(args)},labels:_alertify.labels,debug:_alertify.handleErrors}},"function"==typeof define?define([],function(){return new Alertify}):"undefined"==typeof global.alertify&&(global.alertify=new Alertify)}(window);
//# sourceMappingURL=alertify.js.map