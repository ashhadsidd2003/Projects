QA Projects in C

This folder contains C programs for analyzing QA (Quality Assurance) logs.  
Each program focuses on a different type of operation like sorting, searching, and report generation.  



Files and Details

1. QA_PrintLogs.c
- Purpose: Reads QA log entries and prints them in a human-readable format (Line Code, Product ID, Issue Code, Date, Time).
- Techniques used:
- Merge Sort to sort logs based on:
- Product ID  
- Issue Code  
- Batch datetime (year → month → day → time)  
- Custom formatting to display logs neatly.



2. QA_IssueReport.c
- Purpose: Generates a detailed report of issue codes across multiple products and lines.
- Techniques used:
- 3D Array: `issueCodes[productId][lineCode][issueCode]` to count occurrences.  
- Efficiently records how many times each issue occurred for each product-line combination.  
- Loops through and prints the full report.



3. QA_EarliestOccurance.c
- Purpose: Finds the earliest occurrence of a specific issue code in the logs.  
- Techniques used:
- Merge Sort: Sorts logs by:
- Issue Code  
- Year → Month → Date (for chronological order).  
- Binary Search: Quickly finds the first (earliest) occurrence of the target issue code after sorting.  
- Outputs the earliest date that issue was seen.


4. QA_IssueCount.c
- Purpose: Counts how many issues were reported for each product.  
- Techniques used:
- Array-based counting: `issueCounts[productId]` tracks how many issues a product has.  
- Simple linear traversal through logs.  
- Outputs product-wise issue counts.



Concepts Covered
- Sorting Algorithms: Merge Sort for log ordering.  
- Searching: Binary Search for earliest occurrence.  
- Data Structures: Arrays (1D, 3D), Structs for log entries.  
- Report Generation: Printing clean tabular QA reports.  



