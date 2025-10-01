#include <stdio.h>

// Define the maximum product ID
#define MAX_PRODUCT_ID 2000

// Structure to represent a QA log entry
typedef struct {
    int product_id;
    int issue_code;
} QA_Log;

// Function to process the QA logs and generate a report
void processLogs(QA_Log logs[], int numLogs) {
    // Array to store the count of issues reported for each product
    int issueCounts[MAX_PRODUCT_ID + 1] = {0};

    // Process each log entry
    for (int i = 0; i < numLogs; i++) {
         int productId = logs[i].product_id;
         int issueCode = logs[i].issue_code;
        if (issueCode > 0) { // Check if an issue is reported
            issueCounts[productId]++;
        }
    }


   


    // Print the report
    printf("Product ID | Issue Count\n");
    for (int i = 1; i <= MAX_PRODUCT_ID; i++) {
        if (issueCounts[i] > 0) {
            printf("%10d | %11d\n", i, issueCounts[i]);
        }
    }
}

int main() {
    // Sample QA logs
    QA_Log logs[] = {
        {1001, 205},
        {1001, 203},
        {1002, 201},
        {1001, 201},
        {1002, 202},
        // Add more logs as needed
    };
    int numLogs = sizeof(logs) / sizeof(logs[0]);

    // Process the logs and generate the report
    processLogs(logs, numLogs);

    return 0;
}
