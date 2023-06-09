

document.querySelector("#btnSearch").addEventListener("click", function(){
    let text =  document.querySelector("#txtSearch").value;
    console.log(text);
    getCountry(text);
 });
 
 const getCountry= (country) => {
     const request = new XMLHttpRequest();
     request.open('GET','https://restcountries.com/v3.1/name/' + country)
     request.send();
     //Sonuçta bu bir asenkron işlem olduğu için dolayısıyla ne zaman biteceğini biliyor olmamız lazım bu yüzden callback
 
     request.addEventListener('load',function() {
         const data = JSON.parse(request.responseText)
         renderCountry(data[0]);
         const countries = data[0].borders.toString();
         //load neighbors (girdğimiz ülkenin komşularını getirsin bize)
         const req = new XMLHttpRequest();
         req.open('GET','https://restcountries.com/v3.1/alpha?codes=' + countries)
         req.send(); 
         req.addEventListener('load',function(){
             const data = JSON.parse(req.responseText);
             console.log(data)
             renderNeighbors(data);
         })
     })
 }
 
 
 const renderCountry = (data) => {
 let html = `
     <div class="card mb-3" id="country-details">
     <div class="card-header">
     Arama Sonucu
     </div>
     <div class="card-body">
     <div class="row">
         <div class="col-4">
         <img src="${data.flags.png}" class="img-fluid" alt="">
         </div>
         <div class="col-8">
         <h3 class="card-title">${data.name.common}</h3>
         <hr>
         <div class="row">
             <div class="col-4">Nüfus</div>
             <div class="col-8">${(data.population/1000000).toFixed(1)} </div>
         </div>
         <div class="row">
             <div class="col-4">Resmi Dili</div>
             <div class="col-8">${Object.values(data.languages)} </div>
         </div>
         <div class="row">
             <div class="col-4">Başkent</div>
             <div class="col-8">${(data.capital[0])}<div/>
         </div>
         </div>
     </div>
     </div>
     
     </div>
 `;
 
         document.querySelector('#country-details').innerHTML = html; 
 } 
 
 const renderNeighbors = (data) => {
     for(let country of data) {
         let html = `
             <div class="col-2 mt-2">
                 <div class="card">
                     <img src="${country.flags.png}" class= "card-img-top">
                     <div class="card-body">
                         <h6 class="card-title">${country.name.common}</h6>
                     </div>    
                 </div>
             <div/>
         `
         document.querySelector('#neighbors').insertAdjacentHTML("beforeend", html);
     }
 }