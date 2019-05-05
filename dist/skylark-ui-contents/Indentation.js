/**
 * skylark-ui-contents - A dom plugin for  editing  the content of html element.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/query","./contents"],function(t,e,n,i){var r=t.Evented.inherit({});return r.pluginName="Indentation",r.prototype.opts={tabIndent:!0,indentWidth:40},r.prototype.init=function(e,n){var i;this.editor=e,this.opts=t.extend({},this.opts,n),this.editor.keystroke.add("tab","*",(i=this,function(t){var e;if(e=i.editor.toolbar.findButton("code"),i.opts.tabIndent||e&&e.active)return i.indent(t.shiftKey)}))},r.prototype.indent=function(t){var i,r,s,o;return this.editor.selection.startNodes(),this.editor.selection.endNodes(),i=this.editor.selection.blockNodes(),r=[],i=i.each(function(t,n){var i,s,o,d,a;for(i=!0,s=o=0,d=r.length;o<d;s=++o){if(a=r[s],e.contains(n,a)){i=!1;break}if(e.contains(a,n)){r.splice(s,1,n),i=!1;break}}if(i)return r.push(n)}),i=n(r),s=!1,i.each((o=this,function(e,n){var i;if(i=t?o.outdentBlock(n):o.indentBlock(n))return s=i})),s},r.prototype.indentBlock=function(t){var e,i,r,s,o,d,a,l,h,c;if((e=n(t)).length){if(e.is("pre")){if(!(d=this.editor.selection.containerNode()).is(e)&&!d.closest("pre").is(e))return;this.indentText(this.editor.selection.range())}else if(e.is("li")){if((o=e.prev("li")).length<1)return;this.editor.selection.save(),c=e.parent()[0].tagName,(i=o.children("ul, ol")).length>0?i.append(e):n("<"+c+"/>").append(e).appendTo(o),this.editor.selection.restore()}else if(e.is("p, h1, h2, h3, h4"))h=parseInt(e.css("margin-left"))||0,h=(Math.round(h/this.opts.indentWidth)+1)*this.opts.indentWidth,e.css("margin-left",h);else{if(!e.is("table")&&!e.is("."+this.opts.classPrefix+"table"))return!1;if((r=(a=this.editor.selection.containerNode().closest("td, th")).next("td, th")).length>0||((s=(l=a.parent("tr")).next("tr")).length<1&&l.parent().is("thead")&&(s=l.parent("thead").next("tbody").find("tr:first")),r=s.find("td:first, th:first")),!(a.length>0&&r.length>0))return;this.editor.selection.setRangeAtEndOf(r)}return!0}},r.prototype.indentText=function(t){var e,n;return e=t.toString().replace(/^(?=.+)/gm,"  "),n=document.createTextNode(e||"  "),t.deleteContents(),t.insertNode(n),e?(t.selectNode(n),this.editor.selection.range(t)):this.editor.selection.setRangeAfter(n)},r.prototype.outdentBlock=function(t){var e,i,r,s,o,d,a,l,h,c;if((e=n(t))&&e.length>0){if(e.is("pre")){if(!(s=this.editor.selection.containerNode()).is(e)&&!s.closest("pre").is(e))return;this.outdentText(c)}else if(e.is("li"))r=(i=e.parent()).parent("li"),this.editor.selection.save(),r.length<1?((c=document.createRange()).setStartBefore(i[0]),c.setEndBefore(e[0]),i.before(c.extractContents()),n("<p/>").insertBefore(i).after(e.children("ul, ol")).append(e.contents()),e.remove()):(e.next("li").length>0&&n("<"+i[0].tagName+"/>").append(e.nextAll("li")).appendTo(e),e.insertAfter(r),i.children("li").length<1&&i.remove()),this.editor.selection.restore();else if(e.is("p, h1, h2, h3, h4"))h=parseInt(e.css("margin-left"))||0,h=Math.max(Math.round(h/this.opts.indentWidth)-1,0)*this.opts.indentWidth,e.css("margin-left",0===h?"":h);else{if(!e.is("table")&&!e.is("."+this.opts.classPrefix+"table"))return!1;if((o=(a=this.editor.selection.containerNode().closest("td, th")).prev("td, th")).length>0||((d=(l=a.parent("tr")).prev("tr")).length<1&&l.parent().is("tbody")&&(d=l.parent("tbody").prev("thead").find("tr:first")),o=d.find("td:last, th:last")),!(a.length>0&&o.length>0))return;this.editor.selection.setRangeAtEndOf(o)}return!0}},r.prototype.outdentText=function(t){},i.Indentation=r});
//# sourceMappingURL=sourcemaps/Indentation.js.map