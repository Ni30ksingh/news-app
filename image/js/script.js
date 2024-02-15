const API_KEY="59e2b24539d545bd87541acb5a14e4fc";
const url ="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("india"));
function relode(){
    window.location.relode();
}

async function fetchNews(query){
    const res =await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    bindData(data.articles);


}
function bindData(articles){
    const cardcontainer=document.getElementById("cards-container");
    const newscardtemplet=document.getElementById("templet-news-card");

    cardcontainer.innerHTML="";

    articles.forEach((article) => {
      if(!article.urlToImage) return;
      const cardclone= newscardtemplet.content.cloneNode(true);
      filldataincard(cardclone,article);
      cardcontainer.appendChild(cardclone);  
    });
}
function filldataincard(cardclone,article){
    const newsImage= cardclone.querySelector("#news-img");
    const newsTitle= cardclone.querySelector("#news-title");
    const newsSourse= cardclone.querySelector("#news-source");
    const newsDesc= cardclone.querySelector("#news-desc");
    newsImage.src=article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleDateString("en-us",{
        timeZone:"Asia/jakarta",
    });
    newsSourse.innerHTML=`${article.source.name} . ${date}`;
    
    cardclone.firstElementChild.addEventListener("click", () =>{
        window.open(article.url, "_blank");

  });
}
let curSelectedNav = null;

function onNavItemClick(id) {

 fetchNews(id);
 
 const navItem =document.getElementById(id);

 curSelectedNav?.classList.remove("active");

 curSelectedNav= navItem;

 curSelectedNav.classList.add("active");}

const searchButton = document.getElementById("search-button");

const searchText = document.getElementById("search-text");
searchButton.addEventListener("click", ()=>{

 const query=searchText.value;

if (!query) return;

fetchNews(query);

curSelectedNav?.classList.remove("active");

curSelectedNav = null ;});  


