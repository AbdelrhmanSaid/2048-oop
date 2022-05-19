var T=Object.defineProperty;var b=(i,e,t)=>e in i?T(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var n=(i,e,t)=>(b(i,typeof e!="symbol"?e+"":e,t),t);const w=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}};w();class d{constructor(e,t=Math.random()>.8?4:2){n(this,"_element");n(this,"_value");n(this,"_x");n(this,"_y");this._element=document.createElement("li"),this._element.setAttribute("data-tile",""),e.element.append(this._element),this.value=t}get value(){return this._value}set value(e){this._value=e,this.element.textContent=`${e}`,this.element.setAttribute("data-value",`${e}`)}get element(){return this._element}get x(){return this._x}set x(e){this._x=e,this.element.style.setProperty("--x",`${e}`)}get y(){return this._y}set y(e){this._y=e,this.element.style.setProperty("--y",`${e}`)}waitForTransition(e=!1){return new Promise(t=>{this.element.addEventListener(e?"animationend":"transitionend",t,{once:!0})})}remove(){this.element.remove()}}const m={down:i=>i.cellsByColumn.map(e=>[...e].reverse()),right:i=>i.cellsByRow.map(e=>[...e].reverse()),up:i=>i.cellsByColumn,left:i=>i.cellsByRow};class f{constructor(e){n(this,"_board");n(this,"_events",{});this._board=e,this.bindEvents()}bindEvents(){window.addEventListener("keydown",e=>this.move(e.key.replace("Arrow","").toLowerCase()),{once:!0})}async move(e){if(this.isEnded())return this.trigger("gameEnded");e in m?await this.slide(m[e](this._board)):this.bindEvents(),this.trigger("moved")}isEnded(){return Object.keys(m).every(e=>!this.canMove(m[e](this._board)))}canMove(e){return e.some(t=>t.some((l,r)=>r===0||l.tile===null?!1:t[r-1].canAccept(l.tile)))}async slide(e){this.canMove(e)&&(await f.slideTiles(e),this._board.cells.forEach(t=>{const l=t.mergeTiles();l!==0&&this.trigger("scoreUp",l)}),this._board.randomEmptyCell().tile=new d(this._board)),this.bindEvents()}static slideTiles(e){return Promise.all(e.flatMap(t=>{const l=[];for(let r=1;r<t.length;r++){const s=t[r];if(s.tile===null)continue;let a;for(let g=r-1;g>=0;g--){const p=t[g];if(!p.canAccept(s.tile))break;a=p}a&&(l.push(s.tile.waitForTransition()),a.tile?a.tileToMerge=s.tile:a.tile=s.tile,s.tile=null)}return l}))}on(e,t){this._events[e]=t}trigger(e,...t){this._events[e]&&this._events[e](...t)}}class E{constructor(e,t){n(this,"_x");n(this,"_y");n(this,"_element");n(this,"_tile",null);n(this,"_tileToMerge",null);this._x=e,this._y=t;const l=document.createElement("li");l.setAttribute("data-cell",""),this._element=l}get x(){return this._x}get y(){return this._y}get element(){return this._element}get tile(){return this._tile}set tile(e){this._tile=e,this.tile!==null&&(this.tile.x=this.x,this.tile.y=this.y)}get tileToMerge(){return this._tileToMerge}set tileToMerge(e){this._tileToMerge=e,this.tileToMerge!==null&&(this.tileToMerge.x=this.x,this.tileToMerge.y=this.y)}canAccept(e){return this.tile===null||this.tileToMerge===null&&this.tile.value===e.value}mergeTiles(){return this.tile==null||this.tileToMerge==null?0:(this.tile.value+=this.tileToMerge.value,this.tileToMerge.remove(),this.tileToMerge=null,this.tile.value)}removeTiles(){var e,t;(e=this.tile)==null||e.remove(),(t=this.tileToMerge)==null||t.remove(),this.tileToMerge=null,this.tile=null}}const c=class{constructor(e){n(this,"_cells",[]);n(this,"_element");if(e==null)throw new Error("Board cannot be null");e.style.setProperty("--grid-size",`${c.gridSize}`),document.body.style.setProperty("--f-size",`${c.gridSize/(c.gridSize-2.4)}rem`),this._element=e,Array(c.gridSize*c.gridSize).fill(0).map((t,l)=>{const r=new E(l%c.gridSize,Math.floor(l/c.gridSize));this._element.append(r.element),this._cells.push(r)})}get element(){return this._element}get cells(){return this._cells}get emptyCells(){return this.cells.filter(e=>e.tile===null)}randomEmptyCell(){const e=Math.floor(Math.random()*this.emptyCells.length);return this.emptyCells[e]}get cellsByRow(){return this.cells.reduce((e,t)=>(e[t.y]=e[t.y]||[],e[t.y][t.x]=t,e),[])}get cellsByColumn(){return this.cells.reduce((e,t)=>(e[t.x]=e[t.x]||[],e[t.x][t.y]=t,e),[])}};let h=c;n(h,"gridSize",4);localStorage.getItem("gridSize")&&(h.gridSize=+localStorage.getItem("gridSize"));const u=document.querySelector("[data-score]"),M=document.querySelector("[data-best]"),v=document.querySelector("[data-message]"),S=v.querySelector("button"),o=new h(document.querySelector("[data-board]")),y=new f(o);o.randomEmptyCell().tile=new d(o);o.randomEmptyCell().tile=new d(o);S.addEventListener("click",()=>{v.classList.remove("visible"),o.cells.forEach(i=>i.removeTiles()),o.randomEmptyCell().tile=new d(o),o.randomEmptyCell().tile=new d(o),u.innerHTML=`${0}`});y.on("scoreUp",i=>{u.innerHTML=`${+u.innerHTML+i}`});y.on("gameEnded",()=>{+u.innerHTML>+localStorage.getItem("best-score")&&(localStorage.setItem("best-score",u.innerHTML),M.innerHTML=u.innerHTML),v.classList.add("visible"),y.bindEvents()});var _;M.innerHTML=(_=localStorage.getItem("best-score"))!=null?_:"0";