(function(){var a,b,c,d,e=function(a,b){return function(){return a.apply(b,arguments)}};a=jQuery,b={},b.Line=function(){function c(c){this.updateHilight=e(this.updateHilight,this),this.hilight=e(this.hilight,this),this.updateHover=e(this.updateHover,this),this.transY=e(this.transY,this),this.transX=e(this.transX,this);if(!(this instanceof b.Line))return new b.Line(c);typeof c.element=="string"?this.el=a(document.getElementById(c.element)):this.el=a(c.element),this.options=a.extend({},this.defaults,c);if(this.options.data===void 0||this.options.data.length===0)return;this.el.addClass("graph-initialised"),this.precalc(),this.redraw()}return c.prototype.defaults={lineWidth:3,pointSize:4,lineColors:["#0b62a4","#7A92A3","#4da74d","#afd8f8","#edc240","#cb4b4b","#9440ed"],ymax:"auto",ymin:"auto 0",marginTop:25,marginRight:25,marginBottom:30,marginLeft:25,numLines:5,gridLineColor:"#aaa",gridTextColor:"#888",gridTextSize:12,gridStrokeWidth:.5,hoverPaddingX:10,hoverPaddingY:5,hoverMargin:10,hoverFillColor:"#fff",hoverBorderColor:"#ccc",hoverBorderWidth:2,hoverOpacity:.95,hoverLabelColor:"#444",hoverFontSize:12,smooth:!0,hideHover:!1,parseTime:!0,units:"",dateFormat:function(a){return(new Date(a)).toString()},xLabels:"auto"},c.prototype.precalc=function(){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r=this;this.options.data.sort(function(a,b){return(a[r.options.xkey]<b[r.options.xkey])-(b[r.options.xkey]<a[r.options.xkey])}),this.columnLabels=a.map(this.options.data,function(a){return a[r.options.xkey]}),this.seriesLabels=this.options.labels,this.series=[],n=this.options.ykeys;for(i=0,l=n.length;i<l;i++){f=n[i],d=[],o=this.options.data;for(j=0,m=o.length;j<m;j++)c=o[j],d.push(c[f]);this.series.push(d)}return this.options.parseTime?this.xvals=a.map(this.columnLabels,function(a){return b.parseDate(a)}):this.xvals=function(){q=[];for(var a=p=this.columnLabels.length-1;p<=0?a<=0:a>=0;p<=0?a++:a--)q.push(a);return q}.apply(this),this.options.parseTime&&(this.columnLabels=a.map(this.columnLabels,function(a){return typeof a=="number"?r.options.dateFormat(a):a})),this.xmin=Math.min.apply(null,this.xvals),this.xmax=Math.max.apply(null,this.xvals),this.xmin===this.xmax&&(this.xmin-=1,this.xmax+=1),typeof this.options.ymax=="string"&&this.options.ymax.slice(0,4)==="auto"&&(g=Math.max.apply(null,Array.prototype.concat.apply([],this.series)),this.options.ymax.length>5?this.options.ymax=Math.max(parseInt(this.options.ymax.slice(5),10),g):this.options.ymax=g),typeof this.options.ymin=="string"&&this.options.ymin.slice(0,4)==="auto"&&(h=Math.min.apply(null,Array.prototype.concat.apply([],this.series)),this.options.ymin.length>5?this.options.ymin=Math.min(parseInt(this.options.ymin.slice(5),10),h):this.options.ymin=h),this.pointGrow=Raphael.animation({r:this.options.pointSize+3},25,"linear"),this.pointShrink=Raphael.animation({r:this.options.pointSize},25,"linear"),this.elementWidth=null,this.elementHeight=null,this.prevHilight=null,this.el.mousemove(function(a){return r.updateHilight(a.pageX)}),this.options.hideHover&&this.el.mouseout(function(a){return r.hilight(null)}),e=function(a){var b;return b=a.originalEvent.touches[0]||a.originalEvent.changedTouches[0],r.updateHilight(b.pageX),b},this.el.bind("touchstart",e),this.el.bind("touchmove",e),this.el.bind("touchend",e)},c.prototype.calc=function(){var b,c,d,e,f,g,h,i,j=this;e=this.el.width(),b=this.el.height();if(this.elementWidth!==e||this.elementHeight!==b){this.maxYLabelWidth=Math.max(this.measureText(this.options.ymin+this.options.units,this.options.gridTextSize).width,this.measureText(this.options.ymax+this.options.units,this.options.gridTextSize).width),this.left=this.maxYLabelWidth+this.options.marginLeft,this.width=this.el.width()-this.left-this.options.marginRight,this.height=this.el.height()-this.options.marginTop-this.options.marginBottom,this.dx=this.width/(this.xmax-this.xmin),this.dy=this.height/(this.options.ymax-this.options.ymin),this.columns=function(){var a,b,c,d;c=this.xvals,d=[];for(a=0,b=c.length;a<b;a++)f=c[a],d.push(this.transX(f));return d}.call(this),this.seriesCoords=[],i=this.series;for(g=0,h=i.length;g<h;g++)c=i[g],d=[],a.each(c,function(a,b){return b===null?d.push(null):d.push({x:j.columns[a],y:j.transY(b)})}),this.seriesCoords.push(d);return this.hoverMargins=a.map(this.columns.slice(1),function(a,b){return(a+j.columns[b])/2})}},c.prototype.transX=function(a){return this.xvals.length===1?this.left+this.width/2:this.left+(a-this.xmin)*this.dx},c.prototype.transY=function(a){return this.options.marginTop+this.height-(a-this.options.ymin)*this.dy},c.prototype.redraw=function(){return this.el.empty(),this.r=new Raphael(this.el[0]),this.calc(),this.drawGrid(),this.drawSeries(),this.drawHover(),this.hilight(this.options.hideHover?null:0)},c.prototype.drawGrid=function(){var a,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u=this;m=(this.options.ymax-this.options.ymin)/(this.options.numLines-1),c=Math.ceil(this.options.ymin/m)*m,g=Math.floor(this.options.ymax/m)*m;for(h=c;c<=g?h<=g:h>=g;h+=m)j=Math.floor(h),l=this.transY(j),this.r.text(this.left-this.options.marginLeft/2,l,b.commas(j)+this.options.units).attr("font-size",this.options.gridTextSize).attr("fill",this.options.gridTextColor).attr("text-anchor","end"),this.r.path("M"+this.left+","+l+"H"+(this.left+this.width)).attr("stroke",this.options.gridLineColor).attr("stroke-width",this.options.gridStrokeWidth);n=this.options.marginTop+this.height+this.options.marginBottom/2,k=50,i=null,a=function(a,b){var c,d;return c=u.r.text(u.transX(b),n,a).attr("font-size",u.options.gridTextSize).attr("fill",u.options.gridTextColor),d=c.getBBox(),i===null||i<=d.x?i=d.x+d.width+k:c.remove()};if(this.options.parseTime){if(this.columnLabels.length===1&&this.options.xLabels==="auto")return a(this.columnLabels[0],this.xvals[0]);q=b.labelSeries(this.xmin,this.xmax,this.width,this.options.xLabels),s=[];for(o=0,p=q.length;o<p;o++)e=q[o],s.push(a(e[0],e[1]));return s}t=[];for(d=0,r=this.columnLabels.length;0<=r?d<=r:d>=r;0<=r?d++:d--)f=this.columnLabels[this.columnLabels.length-d-1],t.push(a(f,d));return t},c.prototype.drawSeries=function(){var a,b,c,d,e,f,g,h;for(d=f=this.seriesCoords.length-1;f<=0?d<=0:d>=0;f<=0?d++:d--)c=this.seriesCoords[d],c.length>1&&(e=this.createPath(c,this.options.marginTop,this.left,this.options.marginTop+this.height,this.left+this.width),this.r.path(e).attr("stroke",this.options.lineColors[d]).attr("stroke-width",this.options.lineWidth));this.seriesPoints=function(){var a,b;b=[];for(d=0,a=this.seriesCoords.length-1;0<=a?d<=a:d>=a;0<=a?d++:d--)b.push([]);return b}.call(this),h=[];for(d=g=this.seriesCoords.length-1;g<=0?d<=0:d>=0;g<=0?d++:d--)h.push(function(){var c,e,f,g;f=this.seriesCoords[d],g=[];for(c=0,e=f.length;c<e;c++)a=f[c],a===null?b=null:b=this.r.circle(a.x,a.y,this.options.pointSize).attr("fill",this.options.lineColors[d]).attr("stroke-width",1).attr("stroke","#ffffff"),g.push(this.seriesPoints[d].push(b));return g}.call(this));return h},c.prototype.createPath=function(b,c,d,e,f){var g,h,i,j,k,l,m,n,o,p,q,r,s,t;o="",h=a.map(b,function(a){return a});if(this.options.smooth){j=this.gradients(h);for(k=0,t=h.length-1;0<=t?k<=t:k>=t;0<=t?k++:k--)g=h[k],k===0?o+="M"+g.x+","+g.y:(i=j[k],m=h[k-1],n=j[k-1],l=(g.x-m.x)/4,p=m.x+l,r=Math.min(e,m.y+l*n),q=g.x-l,s=Math.min(e,g.y-l*i),o+="C"+p+","+r+","+q+","+s+","+g.x+","+g.y)}else o="M"+a.map(h,function(a){return""+a.x+","+a.y}).join("L");return o},c.prototype.gradients=function(b){return a.map(b,function(a,c){return c===0?(b[1].y-a.y)/(b[1].x-a.x):c===b.length-1?(a.y-b[c-1].y)/(a.x-b[c-1].x):(b[c+1].y-b[c-1].y)/(b[c+1].x-b[c-1].x)})},c.prototype.drawHover=function(){var a,b,c,d;this.hoverHeight=this.options.hoverFontSize*1.5*(this.series.length+1),this.hover=this.r.rect(-10,-this.hoverHeight/2-this.options.hoverPaddingY,20,this.hoverHeight+this.options.hoverPaddingY*2,10).attr("fill",this.options.hoverFillColor).attr("stroke",this.options.hoverBorderColor).attr("stroke-width",this.options.hoverBorderWidth).attr("opacity",this.options.hoverOpacity),this.xLabel=this.r.text(0,this.options.hoverFontSize*.75-this.hoverHeight/2,"").attr("fill",this.options.hoverLabelColor).attr("font-weight","bold").attr("font-size",this.options.hoverFontSize),this.hoverSet=this.r.set(),this.hoverSet.push(this.hover),this.hoverSet.push(this.xLabel),this.yLabels=[],d=[];for(a=0,c=this.series.length-1;0<=c?a<=c:a>=c;0<=c?a++:a--)b=this.r.text(0,this.options.hoverFontSize*1.5*(a+1.5)-this.hoverHeight/2,"").attr("fill",this.options.lineColors[a]).attr("font-size",this.options.hoverFontSize),this.yLabels.push(b),d.push(this.hoverSet.push(b));return d},c.prototype.updateHover=function(c){var d,e,f,g,h,i=this;this.hoverSet.show(),this.xLabel.attr("text",this.columnLabels[c]);for(d=0,h=this.series.length-1;0<=h?d<=h:d>=h;0<=h?d++:d--)this.yLabels[d].attr("text",""+this.seriesLabels[d]+": "+b.commas(this.series[d][c])+this.options.units);return e=Math.max.apply(null,a.map(this.yLabels,function(a){return a.getBBox().width})),e=Math.max(e,this.xLabel.getBBox().width),this.hover.attr("width",e+this.options.hoverPaddingX*2),this.hover.attr("x",-this.options.hoverPaddingX-e/2),g=Math.min.apply(null,a.map(this.series,function(a){return i.transY(a[c])})),g>this.hoverHeight+this.options.hoverPaddingY*2+this.options.hoverMargin+this.options.marginTop?g=g-this.hoverHeight/2-this.options.hoverPaddingY-this.options.hoverMargin:g=g+this.hoverHeight/2+this.options.hoverPaddingY+this.options.hoverMargin,g=Math.max(this.options.marginTop+this.hoverHeight/2+this.options.hoverPaddingY,g),g=Math.min(this.options.marginTop+this.height-this.hoverHeight/2-this.options.hoverPaddingY,g),f=Math.min(this.left+this.width-e/2-this.options.hoverPaddingX,this.columns[c]),f=Math.max(this.left+e/2+this.options.hoverPaddingX,f),this.hoverSet.attr("transform","t"+f+","+g)},c.prototype.hideHover=function(){return this.hoverSet.hide()},c.prototype.hilight=function(a){var b,c,d;if(this.prevHilight!==null&&this.prevHilight!==a)for(b=0,c=this.seriesPoints.length-1;0<=c?b<=c:b>=c;0<=c?b++:b--)this.seriesPoints[b][this.prevHilight]&&this.seriesPoints[b][this.prevHilight].animate(this.pointShrink);if(a!==null&&this.prevHilight!==a){for(b=0,d=this.seriesPoints.length-1;0<=d?b<=d:b>=d;0<=d?b++:b--)this.seriesPoints[b][a]&&this.seriesPoints[b][a].animate(this.pointGrow);this.updateHover(a)}this.prevHilight=a;if(a===null)return this.hideHover()},c.prototype.updateHilight=function(a){var b,c,d;a-=this.el.offset().left,d=[];for(b=c=this.hoverMargins.length;c<=0?b<=0:b>=0;c<=0?b++:b--){if(b===0||this.hoverMargins[b-1]>a){this.hilight(b);break}d.push(void 0)}return d},c.prototype.measureText=function(a,b){var c,d;return b==null&&(b=12),d=this.r.text(100,100,a).attr("font-size",b),c=d.getBBox(),d.remove(),c},c}(),b.parseDate=function(a){var b,c,d,e,f,g,h,i,j,k;return typeof a=="number"?a:(c=a.match(/^(\d+) Q(\d)$/),e=a.match(/^(\d+)-(\d+)$/),f=a.match(/^(\d+)-(\d+)-(\d+)$/),g=a.match(/^(\d+) W(\d+)$/),h=a.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)Z?$/),i=a.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+):(\d+(\.\d+)?)Z?$/),c?(new Date(parseInt(c[1],10),parseInt(c[2],10)*3-1,1)).getTime():e?(new Date(parseInt(e[1],10),parseInt(e[2],10)-1,1)).getTime():f?(new Date(parseInt(f[1],10),parseInt(f[2],10)-1,parseInt(f[3],10))).getTime():g?(j=new Date(parseInt(g[1],10),0,1),j.getDay()!==4&&j.setMonth(0,1+(4-j.getDay()+7)%7),j.getTime()+parseInt(g[2],10)*6048e5):h?(new Date(parseInt(h[1],10),parseInt(h[2],10)-1,parseInt(h[3],10),parseInt(h[4],10),parseInt(h[5],10))).getTime():i?(k=parseFloat(i[6]),b=Math.floor(k),d=Math.round((k-b)*1e3),(new Date(parseInt(i[1],10),parseInt(i[2],10)-1,parseInt(i[3],10),parseInt(i[4],10),parseInt(i[5],10),b,d)).getTime()):(new Date(parseInt(a,10),0,1)).getTime())},b.commas=function(a){var b,c,d,e;return a===null?"n/a":(d=a<0?"-":"",b=Math.abs(a),c=Math.floor(b).toFixed(0),d+=c.replace(/(?=(?:\d{3})+$)(?!^)/g,","),e=b.toString(),e.length>c.length&&(d+=e.slice(c.length)),d)},b.pad2=function(a){return(a<10?"0":"")+a},b.labelSeries=function(a,c,d,e){var f,g,h,i,j,k,l,m,n,o,p;h=200*(c-a)/d,g=new Date(a),l=b.LABEL_SPECS[e];if(l===void 0){p=b.AUTO_LABEL_ORDER;for(n=0,o=p.length;n<o;n++){i=p[n],k=b.LABEL_SPECS[i];if(h>=k.span){l=k;break}}}l===void 0&&(l=b.LABEL_SPECS.second),f=l.start(g),j=[];while((m=f.getTime())<=c)m>=a&&j.push([l.fmt(f),m]),l.incr(f);return j},c=function(a){return{span:a*60*1e3,start:function(a){return new Date(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours())},fmt:function(a){return""+b.pad2(a.getHours())+":"+b.pad2(a.getMinutes())},incr:function(b){return b.setMinutes(b.getMinutes()+a)}}},d=function(a){return{span:a*1e3,start:function(a){return new Date(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours(),a.getMinutes())},fmt:function(a){return""+b.pad2(a.getHours())+":"+b.pad2(a.getMinutes())+":"+b.pad2(a.getSeconds())},incr:function(b){return b.setSeconds(b.getSeconds()+a)}}},b.LABEL_SPECS={year:{span:1728e7,start:function(a){return new Date(a.getFullYear(),0,1)},fmt:function(a){return""+a.getFullYear()},incr:function(a){return a.setFullYear(a.getFullYear()+1)}},month:{span:24192e5,start:function(a){return new Date(a.getFullYear(),a.getMonth(),1)},fmt:function(a){return""+a.getFullYear()+"-"+b.pad2(a.getMonth()+1)},incr:function(a){return a.setMonth(a.getMonth()+1)}},day:{span:864e5,start:function(a){return new Date(a.getFullYear(),a.getMonth(),a.getDate())},fmt:function(a){return""+a.getFullYear()+"-"+b.pad2(a.getMonth()+1)+"-"+b.pad2(a.getDate())},incr:function(a){return a.setDate(a.getDate()+1)}},hour:c(60),"30min":c(30),"15min":c(15),"10min":c(10),"5min":c(5),minute:c(1),"30sec":d(30),"15sec":d(15),"10sec":d(10),"5sec":d(5),second:d(1)},b.AUTO_LABEL_ORDER=["year","month","day","hour","30min","15min","10min","5min","minute","30sec","15sec","10sec","5sec","second"],window.Morris=b}).call(this);