<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ytils Yupput</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="./css/ytils.yupput.examples.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="../ytils.yupput-0.9.css" rel="stylesheet" type="text/css" media="screen" />
</head>
<body>
<div id="ytilsYupputPresentation">
    <div id="ytilsYupputPresentationSpacing">
        <h1>Hello Ytils Yupput</h1>
        <div id="yupputOptions">
            <p>
                Press <strong>Ctrl+Shift+Y</strong> or <a href="#" id="yupputTouchOpener">tap</a> to open Yupput.<br />
                Double tapping input will close Yupput.
            </p>
        </div>
        <div class="fullLineSpacerOuter">
            <div class="fullLineSpacerInner"></div>
        </div>
        <p>All config options are default.</p>
    </div>
</div>
<div id="ytilsYupputActionFooterStick">
    <div id="ytilsYupputPresentationFooter">
        <div id="ytilsYupputPresentationSpacingFooter">
            <label for="yupputFeedback">Latest callback by Yupput</label><br /><input type="text" name="yupputFeedback" id="yupputFeedback" value="" readonly="readonly" />
        </div>
    </div>
</div>
<script src="../ytils.yupput-0.9.js"></script>
<script src="https://opendata.ytils.com/example/yupput/default.js"></script>
<script>

    var ready = function () {

        var yupput;
        var sampleData = Ytils.YupputOpenData.YtilsYupputDataDefault;
        var yupputSelectionCallback = function(selectedYupputItem, inputValue) {

            document.getElementById("yupputFeedback").value = "Selected item with value: " + selectedYupputItem.value;
            yupput.hide();
        };

        yupput = new Ytils.Yupput(sampleData, yupputSelectionCallback, { });

        document.getElementById("yupputTouchOpener").onclick = function() {

            yupput.show();
        };
    };

    document.addEventListener("DOMContentLoaded", function() {

        ready();
    });

</script>
</body>
</html>