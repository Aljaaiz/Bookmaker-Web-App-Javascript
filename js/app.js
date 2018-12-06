document.getElementById("myForm").addEventListener('submit',saveBookmark);

function saveBookmark(e){
   // get form value
   var siteName = document.getElementById('siteName').value;
   var siteUrl = document.getElementById('siteUrl').value;

 if(!validateForm(siteName,siteUrl)){
    return false
 }

   var bookmark = {
       name : siteName,
       url : siteUrl
   }
  
   // Test if Bookmark is null
   if(localStorage.getItem('bookmarks') === null){
       //init array
       var bookmarks = [];
       // Add to Array
       bookmarks.push(bookmark)
       //set to Local Storage
       localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
   }
    else{
        // Get bookmarks from Local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add book to Array
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    }
    // Reset the filed 
     document.getElementById("myForm").reset();

        fecthBookmarks()
    // Prevent form fro defualt behaviour
    e.preventDefault();
}

// Delete bookmarks
function deleteBookmark(url){
    // Get bookmarks fro LocalStoarage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through boommarks
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // Remove from Array
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fecthBookmarks()
}
//Fecth Bookmarks
function fecthBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // get input Id
    var result = document.getElementById('results');
    result.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name
        var url = bookmarks[i].url;

        result.innerHTML += '<div class="cardCont">' +
                            '<div class="card card-body p-4 m-3 bg-light text-dark">'    
                           + '<h6> ' + name + " " +
                             '<a class="btn btn-primary" target="_blank" href=" '+ url +'">visit</a>' + " " +
                             '<a onClick="deleteBookmark(\''+ url + '\')"class="btn btn-danger"  href="#">Delete</a>' +
                             '</h6>'
                
                            '</div> '
                             '</div>'
    }
   
}


function validateForm(siteName,siteUrl){

 if(!siteName || !siteUrl){
    alert('Fill the form correctly')
    return false
    
}

var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);
if(!siteUrl.match(regex)){
    alert("Please Enter Valid Url");
    return false;
   
    }

 return true;
}