
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
    $("#submit-login").on("click", function (e) {
        e.preventDefault();
        axios.post("/auth/index", {
            email: $("#email").val(),
            password: $("#password").val(),
        })
            .then(function (resp) {
                console.log(resp)
                window.localStorage.setItem("token", resp.data.token)
                document.cookie += "token=" + resp.data.token;
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

