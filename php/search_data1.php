<?php
require_once "database.php";

$search_criteria = $_POST['search_criteria'];
$start_index = $_POST['start_index'];
$end_index = $_POST['end_index'];

$query = "SELECT id, nombre FROM localidades WHERE nombre LIKE '%".$search_criteria."%' LIMIT ".$start_index.", ".$end_index;

$authors = [];
$errors = ['data' => false];

$getAuthors = $db->query($query);

if ($getAuthors->num_rows > 0) {
    while($data = $getAuthors->fetch_assoc()){
        $authors[] = $data;
    }
    header('Content-Type: application/json');
    echo json_encode($authors);
} else {
    header('Content-Type: application/json');
    echo json_encode($errors);
}

?>