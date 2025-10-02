<?php
session_start();
if (!isset($_SESSION["username"])) {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>
    <?php include 'header.php'; ?>
    <h2>Welcome, <?php echo $_SESSION["username"]; ?></h2>
    <a href="book_search.php">Search Books</a> | 
    <a href="view_reservations.php">View Reservations</a> | 
    <a href="logout.php">Logout</a>
    <?php include 'footer.php'; ?>
</body>
</html>
