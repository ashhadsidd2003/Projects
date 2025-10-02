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
$books = [];
$categories = [];

// Fetch categories for dropdown
$category_query = "SELECT * FROM Categories";
$category_result = $conn->query($category_query);

if ($category_result->num_rows > 0) {
    while ($row = $category_result->fetch_assoc()) {
        $categories[] = $row;
    }
}

// Handle search form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST["title"];
    $author = $_POST["author"];
    $category_code = $_POST["category_code"];

    // Build the SQL query dynamically
    $query = "SELECT * FROM Books WHERE 1=1";
    $params = [];
    $types = "";

    if (!empty($title)) {
        $query .= " AND title LIKE ?";
        $params[] = "%" . $title . "%";
        $types .= "s";
    }
    if (!empty($author)) {
        $query .= " AND author LIKE ?";
        $params[] = "%" . $author . "%";
        $types .= "s";
    }
    if (!empty($category_code)) {
        $query .= " AND category_code = ?";
        $params[] = $category_code;
        $types .= "i";
    }

    // Prepare and execute the query
    $stmt = $conn->prepare($query);

    if (!empty($params)) {
        $stmt->bind_param($types, ...$params);
    }

    $stmt->execute();
    $result = $stmt->get_result();
    $books = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
}

$conn->close();
?>

<?php include 'header.php'; ?>

<h2>Search for Books</h2>
<form method="post" action="">
    <label for="title">Title:</label>
    <input type="text" id="title" name="title"><br><br>
    
    <label for="author">Author:</label>
    <input type="text" id="author" name="author"><br><br>
    
    <label for="category_code">Category:</label>
    <select id="category_code" name="category_code">
        <option value="">-- Select Category --</option>
        <?php foreach ($categories as $category) { ?>
            <option value="<?php echo $category['category_code']; ?>">
                <?php echo $category['category_name']; ?>
            </option>
        <?php } ?>
    </select><br><br>
    
    <button type="submit">Search</button>
</form>

<?php if (!empty($books)) { ?>
    <h3>Search Results:</h3>
    <ul>
        <?php foreach ($books as $book) { ?>
            <li>
                <?php echo $book["title"] . " by " . $book["author"]; ?>
                <form method="post" action="reserve_book.php" style="display:inline;">
                    <input type="hidden" name="isbn" value="<?php echo $book['isbn']; ?>">
                    <button type="submit">Reserve</button>
                </form>
            </li>
        <?php } ?>
    </ul>
<?php } elseif ($_SERVER["REQUEST_METHOD"] == "POST") { ?>
    <p>No books found matching your criteria.</p>
<?php } ?>

<a href="dashboard.php">Back to Dashboard</a>

<?php include 'footer.php'; ?>
