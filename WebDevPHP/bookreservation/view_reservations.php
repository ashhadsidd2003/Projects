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

$username = $_SESSION["username"];
$message = "";

// Handle unreserve request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $isbn = $_POST["isbn"];
    
    $stmt = $conn->prepare("DELETE FROM Reserved_Books WHERE isbn = ? AND username = ?");
    $stmt->bind_param("ss", $isbn, $username);
    
    if ($stmt->execute()) {
        $message = "Book unreserved successfully!";
    } else {
        $message = "Error: " . $stmt->error;
    }

    $stmt->close();
}

// Fetch all reserved books, including the reservation date
$stmt = $conn->prepare("SELECT b.title, b.author, rb.isbn, rb.reservation_date 
                        FROM Reserved_Books rb 
                        JOIN Books b ON rb.isbn = b.isbn 
                        WHERE rb.username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$reserved_books = $result->fetch_all(MYSQLI_ASSOC);
$stmt->close();

$conn->close();
?>

<?php include 'header.php'; ?>

<h2>Your Reserved Books</h2>
<?php if ($message) { ?>
    <p><?php echo $message; ?></p>
<?php } ?>
<?php if (!empty($reserved_books)) { ?>
    <ul>
        <?php foreach ($reserved_books as $book) { ?>
            <li>
                <?php echo $book["title"] . " by " . $book["author"] . " (Reserved on: " . $book["reservation_date"] . ")"; ?>
                <form method="post" action="" style="display:inline;">
                    <input type="hidden" name="isbn" value="<?php echo $book['isbn']; ?>">
                    <button type="submit">Unreserve</button>
                </form>
            </li>
        <?php } ?>
    </ul>
<?php } else { ?>
    <p>You have no reserved books.</p>
<?php } ?>

<a href="dashboard.php">Back to Dashboard</a>

<?php include 'footer.php'; ?>
