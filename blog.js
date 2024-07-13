const addAPost = document.getElementById('addAPost'); //the button
//const enterBlog = document.getElementById('enterBlog'); // the window
const enterBlog = document.querySelector('#enterBlog');
const closeBlog = document.querySelector('.closeWindow'); // x button
const imagePreview = document.getElementById('imagePreview');
const fileInput = document.getElementById('file-input');
const blogSpot = document.getElementById('blogSpot');
const blogText = document.getElementById('blogText');
const addPost = document.getElementById('addPost');
const blogImage = document.querySelector('.blogImage');
const yt_link = document.querySelector('#yt-link');
const ytButton = document.querySelector('.yt-button');

let allBlogPosts = [];
let html = ``;
let d;
let currentimage = "";
let editingBool = false;
let currentIndex = 0;


function openAddPost(){
    enterBlog.style.display = 'block';
    currentimage = "";
    yt_link.style.display = '';
    yt_link.value = '';
}
addAPost.addEventListener('click', openAddPost);


function closeAddPost(){
    enterBlog.style.display = 'none';
    imagePreview.src = "";
    currentimage = "";
    yt_link.style.display = '';
    yt_link.value = '';
}
closeBlog.addEventListener('click', closeAddPost);


function uploadImage(){
    //console.log("clicked");
    imagePreview.src = ``;
    if(URL.createObjectURL(fileInput.files[0]) != null){
    imagePreview.src = URL.createObjectURL(fileInput.files[0]);
    currentimage = URL.createObjectURL(fileInput.files[0]);
    imagePreview.style.display = 'inline';
    } else {

        imagePreview.style.display = 'none';
    }
}
fileInput.addEventListener('change', uploadImage);


function addURL(){   
    if(yt_link.style.display == ''){
        yt_link.style.display = 'inline';
    } else if(yt_link.style.display == 'inline') {

        yt_link.style.display = '';
    }
    

}
ytButton.addEventListener('click',addURL);


// function addBlogPosts(){ // MM/DD/YYYY HH:MM

//     html += `<div class="blogContainer">
//                 <div class="blogCards">
//                 <img class="blogImage" src="${currentimage}">
//                 <div class="blogInfoText">
//                     <h3 class="blogFinishText">${blogText.value}
//                     </h3>
//                     <div class="blogFooter">
//                         <div class="yt-container">
//                         <a href="${yt_link.value}" target="_blank" id="yt-link-attached"><i class="fa-brands fa-youtube yt-post-link" ></i></a>
//                         </div>
//                     <p class="dateInfo">${d.getMonth()}/${d.getDate()}/${d.getFullYear()} - ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}</p>
//                     </div>
//                 </div>
//                 </div>
//                 <div class="blogIconsContainer">
//                 <i class="fa-solid fa-trash-can blogIcons"></i>
//                 <i class="fa-solid fa-pencil blogIcons"></i>
//                 </div>
//             </div>`;


//     if(currentimage == null){
//         blogImage.style.display = 'none';
//     }
    

//     blogSpot.innerHTML += html;
//     html = ``;
//     imagePreview.src = "";  
//     blogText.value = "";
//     enterBlog.style.display = 'none';
//     currentimage = "";
    

    
//     const blogCard_yt_link = document.querySelectorAll('#yt-link-attached');
//     const yt_container = document.querySelectorAll('.yt-container');

//     //console.log(yt_container.length);
//     //console.log(yt_link.value.length);

//     if(yt_link.value.length == 0){
//         //console.log("working here");
//         for(var i=0;i < yt_container.length;i++){
//             //console.log(`${i} - ${blogCard_yt_link[i].href}`);
//              if(blogCard_yt_link[i].href.value === undefined){ //check if the index is same when there is no container
//                  yt_container[i].style.display = 'none';
//              }
//         }
//     }
//     yt_link.value = '';
//     removeBlogPosts();
//     editBlogPostsIndex();
//     saveData();

// }


// addPost.addEventListener('click', addBlogPosts);

function addBlogPosts(e){
    e.preventDefault();

    d = new Date();
    let textValue = blogText.value;
    if(imagePreview.src != window.location.href){
    currentimage = imagePreview.src;
    }
    let imageValue = currentimage;
    let ytValue = yt_link.value;
    if(!editingBool){
    allBlogPosts.push({image: imageValue, text: textValue,yt_link: ytValue, date: d.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
});
    }
    console.log(allBlogPosts);
    // console.log(allBlogPosts[0].image);
    blogSpot.innerHTML = '';
    editingBool = false;
    renderBlogPosts();
}



function renderBlogPosts(){ // MM/DD/YYYY HH:MM
allBlogPosts.forEach((blogPost,i) => {
    let currentHTML = blogSpot.innerHTML;
    
    let newHTML = `<div class="blogContainer">
                <div class="blogCards">
                <img class="blogImage image_${i}" src="${blogPost.image}">
                <div class="blogInfoText">
                    <h3 class="blogFinishText text_${i}">${blogPost.text}
                    </h3>
                    <div class="blogFooter">
                        <div class="yt-container">
                        <a href="${blogPost.yt_link}" target="_blank" id="yt-link-attached" class="youtube_${i}"><i class="fa-brands fa-youtube yt-post-link" ></i></a>
                        </div>
                    <p class="dateInfo date_${i}">${blogPost.date}</p>
                    </div>
                </div>
                </div>
                <div class="blogIconsContainer">
                <i onclick="removeBlogPosts(${i});" class="fa-solid fa-trash-can blogIcons"></i>
                <i onclick="editBlogPosts(${i});" class="fa-solid fa-pencil blogIcons"></i>
                </div>
            </div>`;

            let amendedHTML = currentHTML + newHTML;
    if(currentimage == null){
        blogImage.style.display = 'none';
    }

     blogSpot.innerHTML = amendedHTML;
        });
        

    html = ``;
    imagePreview.src = "";  
    blogText.value = "";
    enterBlog.style.display = 'none';
    currentimage = "";
    
    //const blogCard_yt_link = document.querySelectorAll('#yt-link-attached');
    const yt_container = document.querySelectorAll('.yt-container');
    const allBlogCards = document.querySelectorAll('.blogCards');
    

        for(var i = 0;i < allBlogCards.length;i++){
            const findYoutube = document.querySelector(`.youtube_${i}`);
            const checkImage = document.querySelector(`.image_${i}`);
            if(findYoutube.href == undefined || findYoutube.href == window.location.href){ //can turn into possible ternary operator
                yt_container[i].style.display = 'none';
            }
            if(checkImage.src == undefined || checkImage.src == window.location.href){
                checkImage.style.display = 'none';
            }
        }



    yt_link.value = '';
    clearLocalStorage();
    saveData();

}


// https://stackoverflow.com/questions/67427370/is-there-a-way-to-identify-the-index-of-one-button-among-a-list-of-many-buttons
// Used code in order to find the index at clicked button.
// function removeBlogPosts(){ 
//     const allDeleteButtons = document.querySelectorAll('.fa-trash-can');
//     const allBlogContainers = document.querySelectorAll('.blogContainer');
//     allDeleteButtons.forEach(btn => {
//         btn.addEventListener('click', (e) => {
//             const index = Array.from(allDeleteButtons).indexOf(e.target);
//             allBlogContainers[index].remove();
//             saveData();
//         });
//     });
// }

function removeBlogPosts(index){ 
            allBlogPosts = allBlogPosts.filter((blogPost, i) => {
                return i === index ? false : true;
            });
            blogSpot.innerHTML = '';
            renderBlogPosts();
            clearLocalStorage();
            saveData();
}

// function editDeletePost(index){
//     const allBlogContainers = document.querySelectorAll('.blogContainer');
//     allBlogContainers[index].remove();
//     saveData();
// }

// function editBlogPostsIndex(){
//     const allEditButtons = document.querySelectorAll('.fa-pencil');
//     allEditButtons.forEach(btn => {
//         btn.addEventListener('click', (e) => {
//             const index = Array.from(allEditButtons).indexOf(e.target);
//             const allBlogImages = document.querySelectorAll('.blogImage');
//             const allBlogTexts = document.querySelectorAll('.blogFinishText');
//             const blogCard_yt_link = document.querySelectorAll('#yt-link-attached');
//             enterBlog.style.display = 'block';

//             let imagesrc = allBlogImages[index].src;
//             if(imagesrc != window.location.href){
//                 imagePreview.src = imagesrc;
//             } else {
//                 imagePreview.src = '';
//             }

//             blogText.value = allBlogTexts[index].innerText;
//             console.log("card index: " + index + " - Link index: " + blogCard_yt_link[index]); //fix this to show yt link index number.
//             //editDeletePost(index);
//         });
//     });
//     saveData();
// }


// function editBlogPosts(index) {
//     console.log("editing");
//     editingBool = true;
//     // Get the elements corresponding to the blog post
//     const findImage = document.querySelector(`.image_${index}`);
//     const findText = document.querySelector(`.text_${index}`);
//     const findYoutube = document.querySelector(`.youtube_${index}`);


//         enterBlog.style.display = 'block';

//         blogText.value = findText.innerText.slice(3);
//         imagePreview.src = findImage.src;

//         if(findYoutube.href != window.location.href){
//                 yt_link.value = findYoutube.href;
//                 }
//                 else{
//                     yt_link.value = '';
//                 }

//         const updatedText = blogText.value;
//         const updatedImage = imagePreview.src;
//         const updatedLink = yt_link.value;

//         allBlogPosts[index] = {
//             image: updatedImage,
//             text: updatedText,
//             yt_link: updatedLink
//         };



//         // removeBlogPosts(index); // doesn't work. I'm guessing it is because it is deleting and re-rendering the DOM.
//         //allBlogPosts = allBlogPosts.filter((blogPost, i) => i !== index);
//         saveData();
    
// }

function editBlogPosts(index) {
    editingBool = true;
    // Get the elements corresponding to the blog post
    const findImage = document.querySelector(`.image_${index}`);
    const findText = document.querySelector(`.text_${index}`);
    const findYoutube = document.querySelector(`.youtube_${index}`);

        enterBlog.style.display = 'block';

        blogText.value = findText.innerText;
        if(findImage.src != window.location.href){
        imagePreview.src = findImage.src;
        } else{
            imagePreview.style.display = 'none';
        }

        if(findYoutube.href != window.location.href){
                yt_link.value = findYoutube.href;
                }
                else{
                    yt_link.value = '';
                }

    currentIndex = index;

    }

function saveEdit(){
    //console.log("going through");
    // console.log(editingBool);
    if(editingBool){
        console.log(d);
        const updatedText = blogText.value;
        const updatedImage = imagePreview.src;
        const updatedLink = yt_link.value;
        const editTime = allBlogPosts[currentIndex].date.toLocaleString();

        allBlogPosts[currentIndex] = {
            image: updatedImage,
            text: updatedText,
            yt_link: updatedLink,
            date: editTime
        };

        document.querySelector(`.text_${currentIndex}`).innerText = `${currentIndex}. ${updatedText}`;
        document.querySelector(`.image_${currentIndex}`).src = updatedImage;
        document.querySelector(`date_${currentIndex}`).innerText = `${editTime.getMonth()}/${editTime.getDate()}/${editTime.getFullYear()} - ${editTime.getHours().toString().padStart(2,'0')}:${editTime.getMinutes().toString().padStart(2,'0')}`;
        const updatedYoutube = document.querySelector(`.youtube_${currentIndex}`);
        if(updatedLink){
            updatedYoutube.href = updatedLink;
        } else{
            updatedYoutube.removeAttribute('href');
        }
    }

        // removeBlogPosts(index); // doesn't work. I'm guessing it is because it is deleting and re-rendering the DOM.
        //allBlogPosts = allBlogPosts.filter((blogPost, i) => i !== index);
        clearLocalStorage();
        saveData();
    
}
addPost.addEventListener('click', saveEdit);
addPost.addEventListener('click', addBlogPosts);

function saveData(){
    localStorage.setItem("data", blogSpot.innerHTML);
    let datastring = JSON.stringify(allBlogPosts);
    localStorage.setItem("array", datastring);
}

function showData(){
    blogSpot.innerHTML = localStorage.getItem("data");
    let retString = localStorage.getItem("array");
    //console.log(retString);
    allBlogPosts = JSON.parse(retString);

    // removeBlogPosts();
    // editBlogPostsIndex();
}

function clearLocalStorage(){
    localStorage.clear();
}

showData();

