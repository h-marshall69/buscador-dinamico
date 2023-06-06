<?php
require_once "database.php";

$search_criteria = $_POST['search_criteria'];

// Cadena consulta
/*$query = "SELECT id, first_name, last_name, email, birthdate FROM authors 
        WHERE fist_name LIKE '%".$search_criteria."%' OR last_name LIKE '%".$search_criteriar."%'";*/

$query = "SELECT id, nombre FROM localidades WHERE nombre LIKE '%".$search_criteria."%'";

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