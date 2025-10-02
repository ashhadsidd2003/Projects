<<?php
$conn = new mysqli("localhost", "root", "", "book_reservation");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$message = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];
    $first_name = $_POST["first_name"];
    $last_name = $_POST["last_name"];
    $address = $_POST["address"];
    $city = $_POST["city"];

    $stmt = $conn->prepare("INSERT INTO Users (username, password, first_name, last_name, address, city) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $username, $password, $first_name, $last_name, $address, $city);
    
    if ($stmt->execute()) {
        $message = "Registration successful!";
        header("Location: index.php");
        exit();
    } else {
        $message = "Error: " . $stmt->error;
    }
    $stmt->close();
}
$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Register</title>
</head>
<body>
    <?php include 'header.php'; ?>
    <h2>Register</h2>
    <form method="post">
        <label>Username:</label><input type="text" name="username" required><br>
        <label>Password:</label><input type="password" name="password" required><br>
        <label>First Name:</label><input type="text" name="first_name" required><br>
        <label>Last Name:</label><input type="text" name="last_name" required><br>
        <label>Address:</label><input type="text" name="address" required><br>
        <label>City:</label><input type="text" name="city" required><br>
        <button type="submit">Register</button>
    </form>
    <p><?php echo $message; ?></p>
    <?php include 'footer.php'; ?>
</body>
</html>

