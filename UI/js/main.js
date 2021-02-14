const submitbtn = document.querySelector("#submitid");
const getmemebtn = document.querySelector('#getmemeid');
const memelist = document.querySelector('#memelistid');

const domain = `${window.location.protocol}//${window.location.host}`;
// const domain = 'https://xmeme-stream-1899.herokuapp.com';

console.log(domain);
submitbtn.addEventListener('click',postmeme);
getmemebtn.addEventListener('click',getmeme);

function showstatus(status,message){
    let classname='success';
    if(status=='fail'){
        classname='danger';
    }
    const div = document.createElement('div');
    div.className=`alert alert-${classname}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#formid');
    container.insertBefore(div,form);

    setTimeout(() => document.querySelector('.alert').remove(),3000);
}

function getmeme(){
    const request = new Request(`${domain}/memes`,{
        method:'GET',
        headers:{
            "Content-Type":"application/json"
        }
    });

    fetch(request).then((resp)=>resp.json().then((res)=>{
        var memes = '';
        res.meme.forEach(meme=> {
            // const id = meme._id.toString();
            memes+=`
            <div class="col-sm-7">
            <div class="card border-dark">
            <div class="card-body">
            <h5 class="card-title">${meme.name}</h5>
            <p class="card-text">${meme.caption}</p>
            </div>
            <img src=${meme.url} class="card-img-bottom" alt="image not loaded">
            <div class="card-footer">
            <button type="button" class="btn btn-outline-primary" onclick="showmodal('${meme._id}')">Edit</button>
            <button type="button" class="btn btn-outline-danger" onclick="deletememe('${meme._id}')">Delete</button>
            </div>
            </div>
            </div>
            `
        });
        memelist.innerHTML=memes;
        showstatus(res.status,res.message);
    })).catch((err)=>{
        console.log('failed to fetch the memes\n',err);
        showstatus('fail','Some error occured');
    })
}

function postmeme(){
    const namedata = document.querySelector("#nameid");
    const urldata = document.querySelector("#urlid");
    const captiondata = document.querySelector("#captionid");
    if(urldata.value==''||namedata.value==''||captiondata.value==''){
       showstatus('fail','fill all details first');
        return ;
    }
    
    const name=namedata.value;
    const url=urldata.value;
    const caption=captiondata.value;
    const request = new Request(`${domain}/memes`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({name,url,caption})
    });

    fetch(request).then((resp)=>resp.json().then((res)=>{
        console.log('fetch api returned a response');
        //vanishing 3 seconds
        showstatus(res.status,res.message);
    })).catch((err)=>{
      console.log('failed to fetch\n',err);
      showstatus('fail','Some error occured');
    });
}

function showmodal(id){
    $("#updateModal").modal();
    const submitmodal=document.querySelector('#submitupdated');
    submitmodal.addEventListener('click',updatememe,false);
    submitmodal.myParam=id;
}

function updatememe(e){
        const url=document.querySelector('#updateurl');
        const caption=document.querySelector('#updatecaption');
        if(url.value=='' && caption.value==''){
            console.log('fill atleast one entry');
            return ;
        }
        var obj={};
        if(url.value!=''){
            obj.url=url.value;
        }
        if(caption.value!=''){
            obj.caption=caption.value;
        }
        url.value='';
        caption.value='';
        const id = e.currentTarget.myParam;
        const request= new Request(`${domain}/memes/${id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        });
    
        fetch(request).then((resp)=>resp.json().then((res)=>{
            window.scrollTo(0,0);
            showstatus(res.status,res.message);
            getmeme();
        })).catch((err)=>{
            window.scrollTo(0,0);
            console.log('failed to fetch');
            showstatus('fail','Some eror occured');
        });

}

function deletememe(id){
    const request= new Request(`${domain}/memes/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    });

    fetch(request).then((resp)=>resp.json().then((res)=>{
        console.log(res);
        window.scrollTo(0,0);
        showstatus(res.status,res.message);
        getmeme();
    })).catch((err)=>{
        window.scrollTo(0,0);
        console.log('failed to fetch');
        showstatus('fail','Some error occured');
    });
}