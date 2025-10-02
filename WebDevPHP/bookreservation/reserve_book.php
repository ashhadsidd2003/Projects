<?php
// Start the session
session_start();

// Check if the user is logged in
if (!isset($_SESSION["username"])) {
    header("Location: login.php");
    exit();
}

// Connect to the database
$conn = new mysqli("localhost", "root", "", "book_reservation");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$message = "";

// Handle reservation request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $isbn = $_POST["isbn"];
    $username = $_SESSION["username"];

    // Check if the book is already reserved
    $stmt = $conn->prepare("SELECT * FROM Reserved_Books WHERE isbn = ?");
    $stmt->bind_param("s", $isbn);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $message = "This book is already reserved.";
    } else {
        // Reserve the book
        $stmt = $conn->prepare("INSERT INTO Reserved_Books (username, isbn, reservation_date) VALUES (?, ?, NOW())");
        $stmt->bind_param("ss", $username, $isbn);
        
        if ($stmt->execute()) {
            $message = "Book reserved successfully!";
        } else {
            $message = "Error: " . $stmt->error;
        }
    }

    $stmt->close();
}

$conn->close();
?>

<?php include 'header.php'; ?>

<main>
    <h2>Reserve Book</h2>
    <p><?php echo $message; ?></p>
    <a href="book_search.php">Back to Search</a>
</main>

<?php include 'footer.php'; ?>
