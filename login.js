var userEmail;
var userPass;
var msg_text;
var email_id;
var check = 1;



firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
    // User is signed in.



    var user = firebase.auth().currentUser;

    if(user != null){



      email_id = user.email;
      window.open("index.html","_self");



      document.getElementById("show_name").innerHTML = ""+ email_id +"";

    }

  } else {
    // No user is signed in.


    document.getElementById("login_div").style.display = "block";

  }
});

check = 0;


function login(){

  userEmail = document.getElementById("email_field").value;
  userPass = document.getElementById("password_field").value;



  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...

  });

}

function create_account(){


  userEmail = document.getElementById("email_field").value;
  userPass = document.getElementById("password_field").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert("Error : " + errorMessage);
  // ...
});
}



function logout(){
  firebase.auth().signOut();
  window.open("login.html","_self");
}

function sendmsg(){

  var firebasemsg = firebase.database().ref().child("group").push();
  msg_text = document.getElementById("msginput").value;
  var date = firebase.database.ServerValue.TIMESTAMP();



  if (msg_text != "" && userEmail != "") {
    firebasemsg.child("msg").set(""+msg_text+"");
    firebasemsg.child("sender").set(""+email_id+"");
    firebasemsg.child("time").set(""+date+"");
    window.alert("msg sent");
    msginput.value = "";
  }else

    window.alert("msg not sent");


}

function update(){

  var ms,nm,ti;
  var myDataRef = firebase.database().ref().child("group");
  myDataRef.on('child_added', snap => {
  ms = snap.child("msg").val();
  nm = snap.child("sender").val();
  ti = snap.child("time").val();

  if (nm != email_id) {
  $("#msg-area").append("<div class=\"msgc\" style=\"margin-bottom: 30px;\"> <div class=\"msg msgfrom\">" + ms + "</div> <div class=\"msgarr msgarrfrom\"></div> <div class=\"msgsentby msgsentbyfrom\">Sent by " + nm + "</div> </div>");

}else {
  $("#msg-area").append("<div class=\"msgc\"> <div class=\"msg\">" + ms + "</div> <div class=\"msgarr\"></div> <div class=\"msgsentby\">Sent by " + nm + "</div> </div>");

}
  });

}

function anonymous(){
  window.open("index.html","_self");
}

//setInterval(function() { update(); }, 5000);
