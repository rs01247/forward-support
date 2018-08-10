function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
};

function deleteCookie(name, path, domain) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
};

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

function isExpired() {
    if (isLoggedIn()) {
        var storageToken = localStorage.getItem("token");
        var cookieToken = getCookie("token")
        if (storageToken) {
            return parseJwt(storageToken).exp > Date.now / 1000;
        }
        else if (cookieToken) {
            return parseJwt(cookieToken).exp > Date.now / 1000;
        }

    }
    else {
        return true;
    }
};

function removeAuthTokens() {
    deleteCookie("token", "/", "");
    console.log("removing")
    localStorage.removeItem("token");
};

function isLoggedIn() {
    if (localStorage.getItem("token") || getCookie("token")) {
        return true
    }
    else {
        return false;
    }
};

function handlePageAuth() {
    console.log(window.location.pathname)
    if (window.location.pathname === "/api/admin") {
        var token = localStorage.getItem("token");
        if (parseJwt(token).role === "Employee") {
            window.location.assign("/api/user")
        }

    }
    if (window.location.pathname === "/api/user") {
        var token = localStorage.getItem("token");
        if (parseJwt(token).role !== "Employee") {
            window.location.assign("/api/admin")
        }

    }
    if (window.location.pathname === "/" || window.location.pathname === "/register") {
        if (isLoggedIn()) {
            window.location.assign("/api/user")
        }
    }
    else if (isExpired()) {
        console.log("exp")
        window.location.assign("/")
        removeAuthTokens();
    }
};

handlePageAuth();
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
        removeAuthTokens();
        window.location.assign("/");
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
                if (parseJwt(resp.data.token).role === "Employee") {
                    window.location = "/api/user";
                }
                else {
                    window.location = "/api/admin";
                }
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
            role: $("#role").val()
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
        var email = $(this).data("email");
        console.log(email);
        // Send the PUT request.
        axios.put("/api/user/", {
            status: "close",
            isOpen: false,
            isInProgress: false,
            id: id,
            email: email
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
        var email = $(this).data("email");
        console.log(email);
        // Send the PUT request.
        axios.put("/api/user/", {
            status: "inProgress",
            isOpen: false,
            isInProgress: true,
            id: id,
            email: email
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
        var email = $(this).data("email");
        console.log(email);
        // Send the PUT request.
        axios.put("/api/user/", {
            status: "completed",
            isOpen: false,
            isInProgress: false,
            id: id,
            email: email
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

});

