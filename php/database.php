<?php
$server = "localhost";
$username = "root";
$password = "";
$database = "marshall";

// Crear conexcion
$db = new mysqli($server, $username, $password, $database);

// Check conexion
if ($db->connect_error) {
    die("Error al conectar con la base de datos: " . $db->connect_error);
}