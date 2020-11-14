<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ytils Yupput</title>
    <link href="../ytils.yupput-0.8.css<?php echo "?".time(); ?>" rel="stylesheet" type="text/css" media="screen" />
</head>
<body>
<h1>Welcome to Ytils Yupput</h1>
<script src="../ytils.yupput-0.8.js<?php /* echo "?".time(); */ ?>"></script>
<script>

    var sampleData = [
        {
            headline: "Kiel",
            metaData: "25.02.2020, Ostseee, Wahlheimat, Deutschland",
            thumbnail: "https://rexmd.ytils.com/yupput/examples/img/kiel.jpg",
            value: "https://rexmd.ytils.com/yupput/examples/img/kiel.jpg"
        }, {
            headline: "Flensburg 1/7",
            metaData: "25.02.2019, Ostseee, Studienstadt, Deutschland",
            thumbnail: "https://rexmd.ytils.com/yupput/examples/img/flensburg.jpg",
            value: "https://rexmd.ytils.com/yupput/examples/img/flensburg.jpg"
        }, {
            headline: "Flensburg 2/7",
            metaData: "25.02.2019, Ostseee, Studienstadt, Deutschland",
            thumbnail: "https://rexmd.ytils.com/yupput/examples/img/flensburg.jpg",
            value: "https://rexmd.ytils.com/yupput/examples/img/flensburg.jpg"
        }, {
            headline: "Flensburg 3/7",
            metaData: "25.02.2019, Ostseee, Studienstadt, Deutschland",
            thumbnail: "https://rexmd.ytils.com/yupput/examples/img/flensburg.jpg",
            value: "https://rexmd.ytils.com/yupput/examples/img/flensburg.jpg"
        }, {
            headline: "Flensburg 4/7",
            metaData: "25.02.2019, Ostseee, Studienstadt, Deutschland",
            thumbnail: "https://rexmd.ytils.com/yupput/examples/img/flensburg.jpg",
            value: "https://rexmd.ytils.com/yupput/examples/img/flensburg.jpg"
        }, {
            headline: "Flensburg 5/7",
            metaData: "25.02.2019, Ostseee, Studienstadt, Deutschland",
            thumbnail: "https://rexmd.ytils.com/yupput/examples/img/flensburg.jpg",
            value: "https://rexmd.ytils.com/yupput/examples/img/flensburg.jpg"
        }, {
            headline: "Flensburg 6/7",
            metaData: "25.02.2019, Ostseee, Studienstadt, Deutschland",
            thumbnail: "https://rexmd.ytils.com/yupput/examples/img/flensburg.jpg",
            value: "https://rexmd.ytils.com/yupput/examples/img/flensburg.jpg"
        }, {
            headline: "Flensburg 7/7",
            metaData: "25.02.2019, Ostseee, Studienstadt, Deutschland",
            thumbnail: "https://rexmd.ytils.com/yupput/examples/img/flensburg.jpg",
            value: "https://rexmd.ytils.com/yupput/examples/img/flensburg.jpg"
        }, {
            headline: "Eckernförde",
            metaData: "25.02.2018, Ostseee, Schönste Kleinstadt, Deutschland",
            thumbnail: "https://rexmd.ytils.com/yupput/examples/img/eckernfoerde.jpg",
            value: "https://rexmd.ytils.com/yupput/examples/img/eckernfoerde.jpg"
        }, {
            headline: "Danzig",
            metaData: "25.02.2018, Ostseee, Schönste Stadt Polens, Polen",
            thumbnail: "https://rexmd.ytils.com/yupput/examples/img/danzig.jpg",
            value: "https://rexmd.ytils.com/yupput/examples/img/danzig.jpg"
        }
    ];

    var ready = function () {

        var yupput = new Ytils.Yupput(sampleData, function(value, inputValue) { alert(inputValue); }, {
            placeholder: "Suchbegriff",
            maxItemCount: 5,
            preloadImages: true,
            containsForMetaMatches: true
        });
        // yupput.show();
    };

    document.addEventListener("DOMContentLoaded", function(event) {
        ready();
    });

</script>
</body>
</html>