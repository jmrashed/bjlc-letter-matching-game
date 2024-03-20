$(document).ready(function () {
  $("#DrawLetter").click(function () {
    var video = $("video")[0]; // Get the video element
    var videoSrc = $(this).data("video-src"); // Get the video source from data attribute

    if (video.paused) {
      // If video is paused, play it
      video.src = videoSrc;
      video.play();
      $(this).text("Stop"); // Change button label to "Stop"
    } else {
      // If video is playing, pause it
      video.pause();
      $(this).text("Draw"); // Change button label to "Draw"
    }
  });
});



 $(document).ready(function () {
   var letters = [
     { name: "a", imagePath: "assets/letters/a.png" },
     { name: "e", imagePath: "assets/letters/e.png" },
     { name: "i", imagePath: "assets/letters/i.png" },
     { name: "o", imagePath: "assets/letters/o.png" },
     { name: "u", imagePath: "assets/letters/u.png" },
   ];

   var currentIndex = -1; // Start with -1 so that first letter will be 0 when randomized
   var shuffledLetters = shuffleArray(letters);
   var totalSubmissions = 0;
   var successfulMatches = 0;
   var failures = 0;

   displayNextLetter();

   $("#submit-btn").click(function () {
     totalSubmissions++;
     var inputLetter = $("#input-letter").val().trim().toLowerCase();
     var currentLetter = shuffledLetters[currentIndex].name;
     if (inputLetter === currentLetter) {
       successfulMatches++;
       Swal.fire({
         icon: "success",
         title: "Correct!",
         text: "Well done!",
         showConfirmButton: false,
         timer: 1500,
       }).then(function () {
         displayNextLetter();
         playSuccessAudio();
       });
     } else {
       failures++;
       Swal.fire({
         icon: "error",
         title: "Wrong answer!",
         text: "Try again.",
       });
       $("#input-letter").val("").focus();
       playFailureAudio();
     }
     updateResultBox();
   });

   function displayNextLetter() {
     currentIndex++;
     if (currentIndex >= shuffledLetters.length) {
       currentIndex = 0; // Loop back to the beginning if all letters have been displayed
       shuffledLetters = shuffleArray(letters); // Shuffle the array for the next round
     }
     $("#letter-image").attr("src", shuffledLetters[currentIndex].imagePath);
     $("#input-letter").val("").focus();
   }

   function shuffleArray(array) {
     var currentIndex = array.length,
       temporaryValue,
       randomIndex;
     // While there remain elements to shuffle...
     while (0 !== currentIndex) {
       // Pick a remaining element...
       randomIndex = Math.floor(Math.random() * currentIndex);
       currentIndex -= 1;
       // And swap it with the current element.
       temporaryValue = array[currentIndex];
       array[currentIndex] = array[randomIndex];
       array[randomIndex] = temporaryValue;
     }
     return array;
   }

   function playSuccessAudio() {
     document.getElementById("successAudio").play();
   }

   function playFailureAudio() {
     document.getElementById("failureAudio").play();
   }

   function updateResultBox() {
     $("#result-content").html(`Total Submissions: ${totalSubmissions}<br>
                                              Successful Matches: ${successfulMatches}<br>
                                              Failures: ${failures}`);
     $("#result-box").removeClass("d-none");
   }
 });