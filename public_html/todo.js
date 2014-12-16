var btnNew =document.getElementById("newItem");
var taskList="";

function addNewItem(list, itemNext){
    if (itemNext==="")
        return;
    var listItem=document.createElement("li"); 
    listItem.innerText=itemNext;
    list.appendChild(listItem);
    taskList=taskList+itemNext+"*";
    //alert(taskList);
    setCookie("taskList","",-1);
    //alert(document.cookie);
    setCookie("taskList",taskList,30);
    //alert(document.cookie);    
};

btnNew.onclick=function(){
    var itemNext=document.getElementById("TaskName").value;
    addNewItem(document.getElementById("todoList"),itemNext);

};

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

//returns empty string if the enntry  does not exist
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)=== ' ') c = c.substring(1);
        if (c.indexOf(name) !== -1) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function checkCookie() {
    var user=getCookie("username");
    if (user !== "") {
        //alert("Welcome again " + user);
        getSavedTasks(document.getElementById("todoList"));
    } else {
       user = prompt("Please enter your name:","");
       if (user !== "" && user !== null) {
           setCookie("username", user, 30);
       }
    }
}

function getSavedTasks(list) {
    taskList=getCookie("taskList");
    //alert("taskList="+taskList);  
    var savedTasks=taskList.split('*');
    for(var i=0; i<savedTasks.length; i++) {
        var c = savedTasks[i];
        var listItem=document.createElement("li"); 
        listItem.innerText=c;
        list.appendChild(listItem);
    }    
}

window.onunload = function () {
    setCookie("taskList", taskList, 30);   
}