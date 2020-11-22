<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ytils Yupput</title>
    <link href="../ytils.yupput-0.9.css<?php echo "?".time(); ?>" rel="stylesheet" type="text/css" media="screen" />
</head>
<body>
<h1>Welcome to Ytils Yupput</h1>
<script src="../ytils.yupput-0.9.js<?php /* echo "?".time(); */ ?>"></script>
<script src="https://opendata.ytils.com/example/yupput/default.js"></script>
<script>

    var ready = function () {

        var yupput;
        var sampleData = Ytils.YupputOpenData.YtilsYupputDataDefault;
        var yupputSelectionCallback = function(selectedYupputItem, inputValue) {

            console.log("yupputSelectionCallback: " + selectedYupputItem.value + " current input value: " + inputValue);
            yupput.hide();
        };

        yupput = new Ytils.Yupput(sampleData, yupputSelectionCallback, {

            placeholder: "Suchbegriff",
            maxItemCount: 5,
            preloadImages: true,
            containsForMetaMatches: true
        });
    };

    document.addEventListener("DOMContentLoaded", function(event) {
        ready();
    });

</script>
</body>
</html>