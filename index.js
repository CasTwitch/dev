let count = 0;



document.getElementById("resetBtn").onclick = function(){
    count=0;
    document.getElementById("countLabel").innerHTML = count;
}

document.getElementById("increaseBtn").onclick = function(){
    count+=1;
    document.getElementById("countLabel").innerHTML = count;
}

 ComfyJS.onCommand = ( user, command, message, extra ) => {
        if( command === "test" ) {
    count+=1;
    document.getElementById("countLabel").innerHTML = count()
        }
    }
        
      
     ComfyJS.Init( "casthekingofawesomeness", null, [ "Castheking02", "Djzandr", "casthekingofawesomeness" ] );
