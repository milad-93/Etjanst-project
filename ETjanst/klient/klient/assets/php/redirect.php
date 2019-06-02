<?php
    //Tar användaren tillbaka till starten
    function redirectToStart($jumps){
        $url = "";
        for ($i = 0; $i >= $jumps; $i++){
            $url += "../";
        }
        $url += "index.php";
        header('Location: '.$url);
    }
?>