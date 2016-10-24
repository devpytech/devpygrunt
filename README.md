# devpygrunt
DevPy mailserver using mailgun and a post api.
This is a hack to use mailgun newsletters (made for ghost, but will work wherever with a ajax request).
See the example code (for ghost) here: https://gist.github.com/rawsh/554d3aa0d8519816c891ac4021ffc11f

Alternatively just make an ajax request with js.

```javascript
<script type="text/rocketscript">
    function doSub(elem,res) {
        var em = document.getElementById(elem).value;
        //get the email
        fetch('http://grunt.devpy.me/subscribe', {method: 'POST',body: JSON.stringify({email: em}), headers: {"Content-Type": "application/json"}}).then(function(response) {
            return response.json();
        }).then(function(data) {
          if(data.success) {
              document.getElementById(res).innerHTML = "You are now subscribed.";
          } else {
              document.getElementById(res).innerHTML = data.error;
          }
        }).catch(function(ex) {
            document.getElementById(res).innerHTML = ex;
        });
  }
</script>
```

elem and res are the string id's of the email textinput and div for output respectfully.
See my example here (view source) www.devpy.me/subscribe/
