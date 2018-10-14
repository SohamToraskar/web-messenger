var userEmail;
var userPass;
var email_id;
var msgScroll = 200;
var msg_id;
var test_id;




firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
    // User is signed in.



    var user = firebase.auth().currentUser;

    if(user != null){

      email_id = user.email;

      document.getElementById("show_name").innerHTML = ""+ email_id +"";

    }

  } else {
    // No user is signed in.
    document.getElementById("upload").style.display = 'none';
    document.getElementById("login_div").style.display = "block";

  }
});

function sendmsg(){

  var firebasemsg = firebase.database().ref().child("group");
  var msg_text = document.getElementById("msginput").value;
  var date = Date.now();





  if (email_id == "" || msg_text == "" ) {

    window.alert("msg not sent");

  }else

  var newMsgRef = firebasemsg.push();
  var msg_id = newMsgRef.key;
  newMsgRef.set({
    msg: msg_text,
    sender: email_id,
    time: date,
    id: msg_id
  });

  msginput.value = "";


}



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

function logout(){
  firebase.auth().signOut();
  window.open("login.html","_self");
}



function update(){


  var myDataRef = firebase.database().ref().child("group").limitToLast(msgScroll);
  myDataRef.on('child_added', snap => {

  var nm = snap.child("sender").val();
  var ti = snap.child("time").val();
  var ms = snap.child("msg").val();
  var id = snap.child("id").val();

  // setTimeout(update, 5000);




  if (nm == email_id) {
    test_id = id;
   $("#msg-area").append("<div class=\"msgc\" style=\"margin-bottom: 30px;\"><div class=\"msg msgfrom\">" + ms + "</div> <div class=\"msgarr msgarrfrom\"></div><div class=\"msgsentby msgsentbyfrom\">Sent by " + nm + "        <button id=\"del\" value=\" "+ test_id +" \" onclick=\"delete_msg()\">X</button></div></div>");

    }else {
   $("#msg-area").append("<div class=\"msgc\"><div class=\"msg\">" + ms + "</div><div class=\"msgarr\"></div><div class=\"msgsentby\">Sent by " + nm + "</div></div>");

}

  var textarea = document.getElementById("msg-area");
  textarea.scrollTop = textarea.scrollHeight;


  });

  myDataRef.on('child_changed', snap => {
    location.reload();
  var nm = snap.child("sender").val();
  var ti = snap.child("time").val();
  var ms = snap.child("msg").val();
  var id = snap.child("id").val();

  // setTimeout(update, 5000);




  if (nm == email_id) {
    test_id = id;
   $("#msg-area").append("<div class=\"msgc\" style=\"margin-bottom: 30px;\"><div class=\"msg msgfrom\">" + ms + "</div> <div class=\"msgarr msgarrfrom\"></div><div class=\"msgsentby msgsentbyfrom\">Sent by " + nm + "        <button id=\"del\" value=\" "+ test_id +" \" onclick=\"delete_msg()\">X</button></div></div>");

    }else {
   $("#msg-area").append("<div class=\"msgc\"><div class=\"msg\">" + ms + "</div><div class=\"msgarr\"></div><div class=\"msgsentby\">Sent by " + nm + "</div></div>");

}

  var textarea = document.getElementById("msg-area");
  textarea.scrollTop = textarea.scrollHeight;


  });

}


function delete_msg(){


  var myDataRef = firebase.database().ref().child("group").child(test_id);
  var myDelRef = firebase.database().ref().child("group");
  var del_text= "Msg has been deleted";

      myDataRef.set({
        msg: del_text,
        sender: email_id,
        // time: date,
        // id: msg_id

});
alert("" + del_text +"");
deletion();


}

var modal = document.getElementsByClassName("modal")[0];

function showmodal() {
  modal.style.bottom = "60px";
}
function hidemodal() {
  modal.style.bottom = "-355px";
}

var overlay = document.getElementById("overlay");

window.addEventListener('load', function(){
  overlay.style.display = 'none';
})

function deletion(){
  location.reload();
}
