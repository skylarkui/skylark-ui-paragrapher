/**
 * skylark-ui-contents - A dom plugin for  editing  the content of html element.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/query","./contents","./hotkeys","./Util","./InputManager","./Selection","./UndoManager","./Keystroke","./Formatter","./Indentation","./Clipboard"],function(t,i,n,s,r,o,l,a,c,h,u,d,f){var g=t.Evented.inherit({init:function(t,i){this.el=t,this.textarea=n(i.textarea),this.body=n(i.body);var s={classPrefix:i.classPrefix};if(this.util=new o(this,s),!r)throw new Error("simditor: simple-hotkeys is required.");if(this.hotkeys=r({el:this.body}),this.inputManager=new l(this,s),this.selection=new a(this,s),this.undoManager=new c(this,s),this.keystroke=new h(this,s),this.formatter=new u(this,s),this.indentation=new d(this,s),this.clipboard=new f(this,s),this.util.os.mac?this.el.addClass(i.classPrefix+"mac"):this.util.os.linux&&this.el.addClass(i.classPrefix+"linux"),this.util.os.mobile&&this.el.addClass(i.classPrefix+"mobile"),this.util.browser.mozilla){this.util.reflow();try{return document.execCommand("enableObjectResizing",!1,!1),document.execCommand("enableInlineTableEditing",!1,!1)}catch(t){e=t}}},setValue:function(t){this.textarea.val(t),this.body.get(0).innerHTML=t,this.formatter.format(),this.formatter.decorate(),this.util.reflow(this.body),this.inputManager.lastCaretPosition=null},getValue:function(){return this.sync()},sync:function(){var e,i,n,s,r,o;for(i=this.body.clone(),this.formatter.undecorate(i),this.formatter.format(i),this.formatter.autolink(i),r=(e=i.children()).last("p"),s=e.first("p");r.is("p")&&this.util.isEmptyNode(r);)n=r,r=r.prev("p"),n.remove();for(;s.is("p")&&this.util.isEmptyNode(s);)n=s,s=r.next("p"),n.remove();return i.find("img.uploading").remove(),o=t.trim(i.html()),this.textarea.val(o),o},focus:function(){var t,e;if(this.body.is(":visible")&&this.body.is("[contenteditable]"))return this.inputManager.lastCaretPosition?(this.undoManager.caretPosition(this.inputManager.lastCaretPosition),this.inputManager.lastCaretPosition=null):((t=this.body.children().last()).is("p")||(t=n("<p/>").append(this.util.phBr).appendTo(this.body)),e=document.createRange(),this.selection.setRangeAtEndOf(t,e));this.el.find("textarea:visible").focus()},blur:function(){return this.body.is(":visible")&&this.body.is("[contenteditable]")?this.body.blur():this.body.find("textarea:visible").blur()},isActive:function(t){return!0===document.queryCommandState(t)},status:function(t,e){if("alignment"===t){var i=this.selection.nodes().filter(e);return i.length<1?null:i.first().css("text-align")}},alignment:function(t,e){if("left"!==t&&"center"!==t&&"right"!==t)throw new Error("simditor alignment button: invalid align "+t);return this.selection.nodes().filter(e).css({"text-align":"left"===t?"":t}),this.trigger("valuechanged"),this.inputManager.throttledSelectionChanged()},blockquote:function(t,e){var i,s,r,o;return i=(i=this.selection.rootNodes()).filter(function(t,e){return!n(e).parent().is("blockquote")}),this.selection.save(),r=[],o=this,s=function(){if(r.length>0)return n("<"+o.htmlTag+"/>").insertBefore(r[0]).append(r),r.length=0},i.each(function(i){return function(o,l){var a;if((a=n(l)).parent().is(i.body))return a.is(t)?(s(),a.children().unwrap()):a.is(e)||i.util.isDecoratedNode(a)?s():r.push(l)}}(this)),s(),this.selection.restore(),this.trigger("valuechanged")},blockCode:function(t,e){var i,s,r,o,l;return i=this.selection.rootNodes(),r=[],o=[],l=this,s=function(){var e;if(r.length>0)return e=n("<"+t+"/>").insertBefore(r[0]).text(l.formatter.clearHtml(r)),o.push(e[0]),r.length=0},i.each(function(i){return function(l,a){var c,h;return(c=n(a)).is(t)?(s(),h=n("<p/>").append(c.html().replace("\n","<br/>")).replaceAll(c),o.push(h[0])):c.is(e)||i.util.isDecoratedNode(c)||c.is("blockquote")?s():r.push(a)}}(this)),s(),this.selection.setRangeAtEndOf(n(o).last()),this.trigger("valuechanged")},fontColor:function(t,e,i){var n=this.selection.range();if(!e&&n.collapsed&&(textNode=document.createTextNode(i),n.insertNode(textNode),n.selectNodeContents(textNode)),this.selection.range(n),document.execCommand("styleWithCSS",!1,!0),document.execCommand("foreColor",!1,t),document.execCommand("styleWithCSS",!1,!1),!this.util.support.oninput)return this.trigger("valuechanged")},fontScale:function(t,e){var i,s;if(e||(e={"x-large":"1.5em",large:"1.25em",small:".75em","x-small":".5em"}),!(s=this.selection.range()).collapsed)return this.selection.range(s),document.execCommand("styleWithCSS",!1,!0),document.execCommand("fontSize",!1,t),document.execCommand("styleWithCSS",!1,!1),this.selection.reset(),this.selection.range(),((i=this.selection.containerNode())[0].nodeType===Node.TEXT_NODE?i.closest('span[style*="font-size"]'):i.find('span[style*="font-size"]')).each(function(t,i){var s,r;return s=n(i),r=i.style.fontSize,/large|x-large|small|x-small/.test(r)?s.css("fontSize",e[r]):"medium"===r?s[0].style.length>1?s.css("fontSize",""):s.replaceWith(s.contents()):void 0}),this.trigger("valuechanged")},hr:function(){var t,e,i;return(i=this.selection.rootNodes().first()).next().length>0?this.selection.save():e=n("<p/>").append(this.util.phBr),t=n("<hr/>").insertAfter(i),e?(e.insertAfter(t),this.selection.setRangeAtStartOf(e)):this.selection.restore(),this.trigger("valuechanged")},inlineCode:function(t){var e,i,s;return s=this.selection.range(),this.active?(s.selectNodeContents(this.node[0]),this.selection.save(s),this.node.contents().unwrap(),this.selection.restore()):(i=n(s.extractContents()),e=n("<"+this.htmlTag+"/>").append(i.contents()),s.insertNode(e[0]),s.selectNodeContents(e[0]),this.selection.range(s)),this.trigger("valuechanged")},indent:function(){return this.indentation.indent()},link:function(t,e){var i,s,r,o,l,a;if(l=this.selection.range(),t){var c=this.selection.startNodes();a=document.createTextNode(c.text()),c.replaceWith(a),l.selectNode(a)}else i=n(l.extractContents()),o=this.formatter.clearHtml(i.contents(),!1),s=n("<a/>",{href:"",target:"_blank",text:o||e}),this.selection.blockNodes().length>0?l.insertNode(s[0]):(r=n("<p/>").append(s),l.insertNode(r[0])),l.selectNodeContents(s[0]);return this.selection.range(l),this.trigger("valuechanged")},list:function(t,e,s){var r,o,l,a;return o=this.selection.blockNodes(),l="ul"===t?"ol":"ul",this.selection.save(),r=null,o.each((a=this,function(e,o){var c;if(!((c=n(o)).is("blockquote, li")||c.is(s)||a.util.isDecoratedNode(c))&&i.contains(document,o))return c.is(t)?(c.children("li").each(function(t,e){return n(e).children("ul, ol").insertAfter(c),n("<p/>").append(n(e).html()||a.util.phBr).insertBefore(c)}),c.remove()):c.is(l)?n("<"+t+"/>").append(c.contents()).replaceAll(c):r&&c.prev().is(r)?(n("<li/>").append(c.html()||a.util.phBr).appendTo(r),c.remove()):((r=n("<"+t+"><li></li></"+t+">")).find("li").append(c.html()||a.util.phBr),r.replaceAll(c))})),this.selection.restore(),this.trigger("valuechanged")},outdent:function(){return this.indentation.indent(!0)},title:function(t,e){var i,s;return i=this.selection.rootNodes(),this.selection.save(),i.each((s=this,function(i,r){var o;if(!((o=n(r)).is("blockquote")||o.is(t)||o.is(e)||s.util.isDecoratedNode(o)))return n("<"+t+"/>").append(o.contents()).replaceAll(o)})),this.selection.restore(),this.trigger("valuechanged")}});return["bold","insertImage","insertorderedlist","insertunorderedlist","italic","justifyLeft","justifyCenter","justifyFull","justifyRight","strikethrough","underline","undo"].forEach(function(t){g.prototype[t]=function(){return document.execCommand(t,!1,null),this.util.support.oninput||this.trigger("valuechanged"),n(document).trigger("selectionchange")}}),s.editable=function(t,e){return new g(t,e)}});
//# sourceMappingURL=sourcemaps/editable.js.map