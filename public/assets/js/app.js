
$(document).ready(function () {
    var token = window.localStorage.getItem("token");
    if (token) {
        axios({
            url: "/api/user",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(function (resp) {
                console.log(resp)
            })
            .catch(function (err) {
                console.error(err);
            })

    }
    $("#logout").on("click", function (e) {
        e.preventDefault();

       // var token = window.localStorage.getItem("token");
        window.localStorage.clear();
       axios.get("/auth/logout").then(function(resp){
            window.location.assign("/");
       }) .catch(function (err) {
        console.error(err);
    })

      
       
    })

    $("#submit-login").on("click", function (e) {
        e.preventDefault();
        axios.post("/auth/index", {
            email: $("#email").val(),
            password: $("#password").val(),
        })
            .then(function (resp) {
              //  console.log("hi"+resp.data.token)
                window.localStorage.setItem("token", resp.data.token)
                document.cookie += "token=" + resp.data.token;
                // var decoded = jwtDecode(resp.data.token.split(" ")[1]);
                // console.log(decoded)
               window.location.assign("/api/user");
            })
            .catch(function (err) {
                console.error(err);
            })
    })
    $("#submit").on("click", function (e) {
        e.preventDefault();
        axios.post("/auth/register", {
            email: $("#email").val(),
            password: $("#password").val(),
            name: $("#name").val(),
            role:$("#role").val()
        })
            .then(function (resp) {
                console.log(resp)
                window.location.assign("/");
            })
            .catch(function (err) {
                console.error(err);
            })
    })


    $(".closeTicket").on("click", function (event) {
        var id = $(this).data("id");
        // Send the PUT request.
        axios.put("/api/user/", {
            status: "close",
            isOpen:false,
            isInProgress:false,
            id: id
        })
            .then(function (resp) {
                console.log("changed status to close");
                // Reload the page to get the updated list
                location.reload();
            })
            .catch(function (err) {
                console.error(err);
            })

    });

    
    $(".changeToInProgress").on("click", function (event) {
        var id = $(this).data("id");
       // Send the PUT request.
        axios.put("/api/user/", {
            status: "inProgress",
            isOpen:false,
            isInProgress:true,
            id: id
        })
            .then(function (resp) {
                console.log("changed status to in Progress");
                // Reload the page to get the updated list
                location.reload();
            })
            .catch(function (err) {
                console.error(err);
            })

    });


    $(".changeToComplete").on("click", function (event) {
        var id = $(this).data("id");
       // Send the PUT request.
        axios.put("/api/user/", {
            status: "completed",
            isOpen:false,
            isInProgress:false,
            id: id
        })
            .then(function (resp) {
                console.log("changed status to in Progress");
                // Reload the page to get the updated list
                location.reload();
            })
            .catch(function (err) {
                console.error(err);
            })

    });

})

