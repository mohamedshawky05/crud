let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('totel');
let count=document.getElementById('count');
let calegory=document.getElementById('calegory');
let submit=document.getElementById('submit');
let mood='create';
let tap;


//get total
function gettotal()
{
    if(price.value !='')
    {
        let result= (+price.value+ +taxes.value+ +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.background='#040'
    }else{
        total.innerHTML=''
        total.style.background='#ff0000cd'
    }
}


//create product
let datapro;  // مكان تخزين بيانات = localstorge وتخزن فيه
if(localStorage.product!=null)
{
    datapro=JSON.parse(localStorage.product)
}else{
    datapro=[]; // no data
}

submit.onclick=function()
{
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,  //small no input
        count:count.value,
        calegory:calegory.value.toLowerCase(),
    }
    if(title.value !='' &&price.value!=''&&calegory.value!=''&&newpro.count<100)
    {   if(mood=='create')
        {    if(newpro.count>1)
         {
             for(let i=0 ; i<newpro.count ;i++)
             {
                 datapro.push(newpro)
             }
         }else{
             datapro.push(newpro);
         }
        }else{
         datapro[tap]=newpro;
         mood='create';
         submit.innerHTML='create';
         count.style.display='block';
        }
        cleardata();
     }


 //   datapro.push(newpro) //add object in array 
    localStorage.setItem('product', JSON.stringify(datapro)) //save localastroge
 
    showdata();    

}

//create inputs
function cleardata()
{
      title.value='';
      price.value='';
      taxes.value='';
      ads.value='';
      discount.value='';
      total.innerHTML='';
      count.value='';
      calegory.value='';
}

//read

function showdata()
{ 
    gettotal();
    let table='';
    for(let i=0; i<datapro.length;i++)
    {
        table +=`<tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].calegory}</td>
                    <td><button onclick="updatedata(${i})" id="update">update</button></td>
                    <td><button onclick="delatedata(${i})" id="delate">delate</button></td>
                </tr>
    `
        
    }

    document.getElementById('tbody').innerHTML=table;
    let btndeleta=document.getElementById('deleteall');
        if(datapro.length>0)
        {
           btndeleta.innerHTML=`<button onclick="deleteall(${datapro.length})">deleteall</button>`
        }else{
            btndeleta.innerHTML='';
        }

}

showdata();



//count 

//delate
function delatedata(i)
{
   datapro.splice(i,1);
   localStorage.product=JSON.stringify(datapro);
   showdata();
}
function deleteall(){
    localStorage.clear();
    datapro.splice(0);
    showdata();
}
//update

function updatedata(i)
{
    console.log(i)
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    calegory.value=datapro[i].calegory;
    gettotal();
    count.style.display='none';
    submit.innerHTML='update'
    mood='update';
    tap=i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}


//search

let searchmood='title';
function getsearchmood(id)
{
    let search=document.getElementById('search');

   if(id=='Searchbytitle')
   {
    searchmood='title';
    
   }else{
    searchmood='calegory';
   
   }
   search.placeholder='Searchby'+searchmood;
   search.focus();
   search.value='';
   showdata();
}
function searchdata(value)
{
    let table='';
  if(searchmood=='title')
  {
    for(let i=0; i<datapro.length;  i++)
    {
        if(datapro[i].title.includes(value.toLowerCase())){
            table +=`<tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].calegory}</td>
            <td><button onclick="updatedata(${i})" id="update">update</button></td>
            <td><button onclick="delatedata(${i})" id="delate">delate</button></td>
        </tr>
` 
          }
    }
  }else{
    for(let i=0; i<datapro.length;  i++)
        {
            if(datapro[i].calegory.includes(value.toLowerCase())){
                table +=`<tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].calegory}</td>
                <td><button onclick="updatedata(${i})" id="update">update</button></td>
                <td><button onclick="delatedata(${i})" id="delate">delate</button></td>
            </tr>
    ` 
              }
        }
  }
  document.getElementById('tbody').innerHTML=table;
}

//clean date
