document.addEventListener("DOMContentLoaded",function(){var e=document.querySelector("#temp-value"),t=document.querySelector("#speed-value"),a=document.querySelector("#low-speed-status"),r=document.querySelector("#hight-speed-status"),n=document.querySelector("#low-speed-value"),l=document.querySelector("#hight-speed-value"),s=document.querySelector("#setpont-value"),u=document.querySelector("#error_status"),o=document.querySelectorAll("button[value]"),c=document.querySelector("#low-speed-request"),i=document.querySelector("#hight-speed-request");setInterval(function n(){var l=new XMLHttpRequest;l.open("GET","/?get_data"),l.onload=()=>{if(200===l.status){let n=JSON.parse(l.responseText.replace(/'/g,'"'));switch(e.innerHTML=((parseInt(n.collant_temp,16)-50)/.78431373).toFixed(1),t.innerHTML=parseInt(n.fan_speed),n.ac_state){case"0x00":a.innerHTML="OFF",r.innerHTML="OFF";break;case"0x4":a.innerHTML="ON",r.innerHTML="OFF";break;case"0x8":a.innerHTML="OFF",r.innerHTML="ON"}u.innerHTML=({"0x65":" Code 101 - sensor error"})[n.error_code]}},l.send()},1e3);var $=new XMLHttpRequest;function d(e,t=["0x00","0x00","0x00"]){var a={req_flaq:e,req_data:t},r=new XMLHttpRequest;r.open("POST",`/?req_flag:${a.req_flaq};req_data:${a.req_data}`),r.onload=()=>{if(200===r.status)switch(r.responseText){case"0xFF":alert("New data saved");break;case"0x85":window.location.reload();break;case"0x11":c.value="ON";break;case"0x10":c.value="OFF";break;case"0x21":i.value="ON";break;case"0x20":i.value="OFF"}},r.send()}$.open("GET","/?get_settings"),$.onload=()=>{if(200===$.status){let e=JSON.parse($.responseText.replace(/'/g,'"'));n.value=parseInt(e.low_speed).toString(),l.value=parseInt(e.hight_speed).toString(),s.value=parseInt(e.setpoint).toString()}},$.send(),o[1].addEventListener("click",function(){let e="",t=[n.value,l.value,s.value];for(let a=0;a<t.length;a++)if(""===t[a]){alert('Error: Input value = " "');return}"NaN"!==n.value&&"NaN"!==l.value&&"NaN"!==s.value?(e=[n.value,l.value,s.value],parseInt(n.value)>100|parseInt(l.value)>100?alert("Input value >100"):parseInt(l.value)<=parseInt(n.value)?alert("Error: A/C Low speed >= A/C Hight speed! Pleace input correct value"):d(this.value,e)):alert("Pleace input correct value")}),o[0].addEventListener("click",function(){d(this.value)}),o[2].addEventListener("click",function(){d(this.value)}),c.addEventListener("change",function(){0==this.selectedIndex?d("0x4"):d("0x28"),c.value=""}),i.addEventListener("change",function(){0==this.selectedIndex?d("0x8"):d("0x50"),i.value=""})});