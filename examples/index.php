<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ytils Yupput</title>
    <link href="css/ytils.yupput.css<?php echo "?".time(); ?>" rel="stylesheet" type="text/css" media="screen" />
</head>
<body>
<h1>Welcome to Ytils Yupput</h1>
<script src="../ytils.yupput.out.js<?php echo "?".time(); ?>"></script>
<script>

    var ready = function () {

        /*
        var yupput = new Ytils.Yupput( { foo: "bar" } );
        yupput.show("hello world");
        */
    };

    document.addEventListener("DOMContentLoaded", function(event) {
        ready();
    });

</script>
</body>
</html>