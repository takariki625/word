"use strict;"
let target;
document.querySelector("header").addEventListener("click", e =>{
  if(e.target.tagName !== "BUTTON")return;
  e.target.parentNode.remove();
  target=document.getElementById(e.target.textContent);
  target.style.display="block";
  const reBtn=document.createElement("span");
  reBtn.id="reBtn";
  document.querySelector("body").appendChild(reBtn);
  switch(e.target.textContent){
    case "add":
      add();
      break;
    case "edit":
      edit();
      break;
    case "start":
      start();
      break;
  }
  document.getElementById("reBtn").addEventListener("click",e =>{
    window.location.reload();
  })
})
let i=0;
let q=[];
let a=[];
function start(){
  const flame=document.createElement("ul");
  flame.id="flame";
  //選択欄
  const list=["all","html","css","js","php","java","mysql","github"];
  list.forEach(li =>{
    const contents=document.createElement("li");
    contents.textContent=li;
    flame.appendChild(contents);
  })
  target.appendChild(flame);
  document.getElementById("flame").addEventListener("click", e =>{
    if(e.target.tagName === "LI"){
      flame.remove();
      fetch("?action=contents",{
        method:"POST",
        body:new URLSearchParams({
          text:e.target.textContent
        })
      })
      .then(response =>{
        return response.json();
      })
      .then(json =>{
        if(json[0] === undefined){
          alert("該当なし");
          return;
        }
        json.forEach(li =>{
          q.push(li.q);
          a.push(li.a);
        })
        const question=document.createElement("div");
        question.textContent=q[i];
        question.id="question";
        const count=document.createElement("span");
        count.id="count";
        count.textContent=(i+1)+"/"+(q.length);
        const nextBtn=document.createElement("button");
        nextBtn.id="nextBtn";
        nextBtn.textContent="next";
        const answereBtn=document.createElement("button");
        answereBtn.id="answereBtn";
        answereBtn.textContent="answere";
        target.appendChild(question);
        target.appendChild(count);
        target.appendChild(nextBtn);
        target.appendChild(answereBtn);
        document.getElementById("answereBtn").addEventListener("click", e=>{
          if(e.target.parentNode.childElementCount === 5)return;
          createAnswere();
        })
        document.getElementById("nextBtn").addEventListener("click", e =>{
          i++;
          if(q.length <= i){
            alert("終了");
            window.location.reload();
          }
          count.textContent=(i+1)+"/"+(q.length);
          question.textContent=q[i];
          if(document.getElementById("answere") !== null){
            document.getElementById("answere").remove();
          }
        })
      })
    }
  })
}
function createAnswere(){
  const answere=document.createElement("div");
  answere.id="answere";
  answere.textContent=a[i];
  target.insertBefore(answere,target.children[1]);
}





//add
function add(){
  document.querySelector("form").addEventListener("submit", e =>{
    e.preventDefault();
    const q=document.querySelector("input[type='text']");
    const a=document.querySelector("textarea");
    if(q.value === "" || a.value === ""){
      alert("入力できてません");
      return;
    }
    fetch("?action=add",{
      method:"POST",
      body:new URLSearchParams({
        q:q.value,
        a:a.value
      })
    })
    q.value="";
    a.value="";
  })
}

