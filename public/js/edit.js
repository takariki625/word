"use strict;"
function edit(){
  const checkbox=document.querySelectorAll("input[type='checkbox']");
  const ul=document.querySelector("ul");
  ul.addEventListener("click", e =>{
    const q=e.target.parentNode.children[0];
    const a=e.target.parentNode.children[2];
    if(e.target.type === "checkbox"){
      if(e.target.checked){
        const li=e.target.parentNode;
        deployment(q,a,li);
      }else{
        undo(q,a);
      }
    }
    if(e.target.classList.contains("update")){
      fetch("?action=update",{
        method:"POST",
        body:new URLSearchParams({
          id:e.target.parentNode.dataset.id,
          q:q.value,
          a:a.value
        })
      })
      e.target.parentNode.children[1].checked=false;
      undo(q,a);
    }
    if(e.target.classList.contains("del")){
      if(!confirm(q.value+"を削除しますか？"))return;
      fetch("?action=del",{
        method:"POST",
        body:new URLSearchParams({
          id:e.target.parentNode.dataset.id
        })
      })
      e.target.parentNode.remove();
    }
  })
  document.getElementById("serch").addEventListener("submit", e =>{
    e.preventDefault();
    const text=e.target.children[0];
    fetch("?action=serch",{
      method:"POST",
      body:new URLSearchParams({
        text:text.value
      })
    })
    .then(response =>{
      return response.json();
    })
    .then(json =>{
      if(json[0] === undefined){
        alert("検索結果がありません");
        text.value="";
        return;
      }
      json.forEach(list =>{
        checkbox.forEach(check =>{
          if(list.id === check.parentNode.dataset.id){
            ul.insertBefore(check.parentNode,ul.firstChild);
          }
        })
      })
      text.value="";
    })
  })
}


function undo(q,a){
  q.parentNode.children[4].remove();
  q.parentNode.children[3].remove();
  const qSpan=document.createElement("span");
  qSpan.textContent=q.value;
  qSpan.classList.add("q");
  const aSpan=document.createElement("span");
  aSpan.textContent=a.value;
  aSpan.classList.add("a");
  q.replaceWith(qSpan);
  a.replaceWith(aSpan);
}
function deployment(q,a,li){
  const text=document.createElement("input");
  text.type="text";
  text.autocomplete="off";
  text.value=q.textContent;
  text.classList.add("q");
  const textarea=document.createElement("textarea");
  textarea.autocomplete="off";
  textarea.value=a.textContent;
  textarea.classList.add("adm");
  const update=document.createElement("span");
  update.textContent="@";
  update.classList.add("update");
  const del=document.createElement("span");
  del.textContent="x";
  del.classList.add("del");
  //tagを変えられる
  q.replaceWith(text);
  a.replaceWith(textarea);
  //
  li.appendChild(update);
  li.appendChild(del);
}