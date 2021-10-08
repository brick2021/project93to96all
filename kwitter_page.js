// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCUIuxmKHXNN142e6QguW-cG13OYCgvyXw",
    authDomain: "project93to96.firebaseapp.com",
    databaseURL: "https://project93to96-default-rtdb.firebaseio.com",
    projectId: "project93to96",
    storageBucket: "project93to96.appspot.com",
    messagingSenderId: "621355045321",
    appId: "1:621355045321:web:5b07dddebe60ddb0efd818"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

room_name = localStorage.getItem("Roomname");
user_name = localStorage.getItem("user_name");

console.log("room name " + room_name);
console.log("user name " + user_name);

function logout() {
    localStorage.removeItem("Roomname");
    localStorage.removeItem("user_name");
    window.location.replace("index.html");
}

function send() {
    msg = document.getElementById("msg").value;
    console.log("Message " + msg);
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4> " + name + "<img class='user_tick' src='Chat Box.gif'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function updateLike(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });
}