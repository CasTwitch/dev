let count = 0;

 <script src="https://cdn.jsdelivr.net/npm/comfy.js@latest/dist/comfy.min.js"></script>


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
    document.getElementById("countLabel").innerHTML = count;

          console.log( "!test COUNTING was typed in chat" );
        }
            }
      
     ComfyJS.Init( "casthekingofawesomeness", null, [ "Castheking02", "Djzandr", "option4" ] );



