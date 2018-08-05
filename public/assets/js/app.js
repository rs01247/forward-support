
    $(document).ready(function() {
        var token = window.localStorage.getItem("token");
        if(token) {
            axios({
                url: "/api/user",
                headers: {
                    "key":"Content-Type","value":"application/json",
                    "Authorization": "Bearer " + token
                }
            })
            .then(function(resp) {
                console.log(resp)
            })
            .catch(function(err) {
                console.error(err);
            })
        }
        $("#submit-login").on("click", function(e) {
          e.preventDefault();
          alert("hi")
            axios.post("/auth/index", {
                email: $("#email").val(),
                password: $("#password").val(),
            })
            .then(function(resp) {
                console.log(resp)
                window.localStorage.setItem("token", resp.data.token)
                document.cookie += "token="+resp.data.token;
                window.location.assign("/api/user");
            })
            .catch(function(err) {
                console.error(err);
            })
        })
        $("#submit").on("click", function(e) {
            e.preventDefault();
            alert("test")
            axios.post("/auth/register", {
                email: $("#email").val(),
                password: $("#password").val(),
                name: $("#name").val(),
            })
            .then(function(resp) {
                console.log(resp)
                window.location.assign("/");
            })
            .catch(function(err) {
                console.error(err);
            })
        })
    })
