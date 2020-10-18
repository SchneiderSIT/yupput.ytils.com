<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ytils Yupput</title>
    <link href="css/examples.css<?php echo "?".time(); ?>" rel="stylesheet" type="text/css" media="screen" />
</head>
<body>
<div id="ytilsYupputOuterContainer">
    <div id="ytilsYupputInputContainer">
        <label>
            <input id="ytilsYupputInput" type="text" name="ytilsYupputInput" value="" placeholder="Medienpool-Suche" />
        </label>
        <div id="ytilsYupputFindingsUpIndicator">
            <img src="img/yupput.findings-down.png" alt="" />
        </div>
        <div id="ytilsYupputFindings">
            <div class="ytilsYupputFinding">
                <div class="ytilsYupputFindingLeft" style="background-image: url(img/kiel.jpg); "></div>
                <div class="ytilsYupputFindingRight">
                    <div class="ytilsYupputFindingMainLine"><span class="ytilsYupputFindingRightTextInner">Kiel</span></div>
                    <div class="ytilsYupputFindingSubLine"><span class="ytilsYupputFindingRightTextInner">25.02.2020 | Ostsee, Wahlheimat</span></div>
                </div>
                <div class="ytilsYupputClearance"></div>
            </div>

            <div class="ytilsYupputFinding ytilsYupputFindingHighlighted">
                <div class="ytilsYupputFindingLeft" style="background-image: url(img/flensburg.jpg); "></div>
                <div class="ytilsYupputFindingRight">
                    <div class="ytilsYupputFindingMainLine"><span class="ytilsYupputFindingRightTextInner">Flensburg</div>
                    <div class="ytilsYupputFindingSubLine"><span class="ytilsYupputFindingRightTextInner">25.02.2019 | Ostsee, Studienstadt</span></div>
                </div>
                <div class="ytilsYupputClearance"></div>
            </div>

            <div class="ytilsYupputFinding">
                <div class="ytilsYupputFindingLeft" style="background-image: url(img/eckernfoerde.jpg); "></div>
                <div class="ytilsYupputFindingRight">
                    <div class="ytilsYupputFindingMainLine"><span class="ytilsYupputFindingRightTextInner">Eckernförde</div>
                    <div class="ytilsYupputFindingSubLine"><span class="ytilsYupputFindingRightTextInner">25.02.2018 | Ostsee, schöne Kleinstadt</span></div>
                </div>
                <div class="ytilsYupputClearance"></div>
            </div>

            <div class="ytilsYupputFinding">
                <div class="ytilsYupputFindingLeft" style="background-image: url(img/danzig.jpg); "></div>
                <div class="ytilsYupputFindingRight">
                    <div class="ytilsYupputFindingMainLine"><span class="ytilsYupputFindingRightTextInner">Danzig</div>
                    <div class="ytilsYupputFindingSubLine"><span class="ytilsYupputFindingRightTextInner">25.02.2017 | Ostsee, schönste Stadt Polens</span></div>
                </div>
                <div class="ytilsYupputClearance"></div>
            </div>

            <div class="ytilsYupputFinding">
                <div class="ytilsYupputFindingLeft" style="background-image: url(img/schleswig.jpg); "></div>
                <div class="ytilsYupputFindingRight">
                    <div class="ytilsYupputFindingMainLine"><span class="ytilsYupputFindingRightTextInner">Schleswig</div>
                    <div class="ytilsYupputFindingSubLine"><span class="ytilsYupputFindingRightTextInner">25.02.2016 | Schlei, Wikingerstadt</span></div>
                </div>
                <div class="ytilsYupputClearance"></div>
            </div>
        </div>
        <div id="ytilsYupputFindingsDownIndicator">
            <img src="img/yupput.findings-up.png" alt="" />
        </div>
    </div>
</div>
<script src="../yupput.out.js<?php echo "?".time(); ?>"></script>
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