<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ytils Yupput</title>
    <link href="css/examples.css" rel="stylesheet" type="text/css" media="screen" />
</head>
<body>
<h1>Welcome to Ytils Yupput</h1>
<div id="ytilsYupputOuterContainer">
    <div id="ytilsYupputInputContainer">
        <label>
            <input type="text" name="ytilsYupputInput" value="" />
        </label>
    </div>
</div>
<script src="../yupput.out.js"></script>
<script>

    var ready = function () {

        var yupput = new Ytils.Yupput( { foo: "bar" } );
        yupput.show("hello world");
    };

    document.addEventListener("DOMContentLoaded", function(event) {
        ready();
    });

</script>
</body>
</html>