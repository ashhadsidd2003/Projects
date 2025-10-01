#include <stdio.h>
#include <stdlib.h>

#define MAX_PRODUCT_ID 9999  // Adjusted for 4-digit product IDs
#define MAX_LINE_CODE 10
#define MAX_ISSUE_CODE 300

int issueCodes[MAX_PRODUCT_ID + 1][MAX_LINE_CODE + 1][MAX_ISSUE_CODE + 1] = {0};

typedef struct {
    int line_code;
    int product_id;
    int issue_code;
} QA_Log;

void prepareReport(QA_Log logs[], int numLogs) {
    // Record issue codes for each product ID, line code, and issue code
    for (int i = 0; i < numLogs; i++) {
        int productId = logs[i].product_id;
        int lineCode = logs[i].line_code;
        int issueCode = logs[i].issue_code;
        issueCodes[productId][lineCode][issueCode]++;
    }

    // Print the report
    printf("Issue Code | No Of Faulty Products | Line Code | Product ID\n");
    for (int i = 0; i < MAX_PRODUCT_ID; i++) {
        for (int j = 0; j < MAX_LINE_CODE; j++) {
            for (int k = 0; k < MAX_ISSUE_CODE; k++) {
                if (issueCodes[i][j][k] > 0) {
                    printf("%10d | %21d | %9d | %10d\n", k,issueCodes[i][j][k], j, i);
                }
            }
        }
    }
}

int main() {
    QA_Log logs[] = {
        {1, 1001, 201},
        {3, 1001, 203},
        {2, 1002, 204},
        {1, 1009, 201},
        {1, 1002, 202},
    };
    int numLogs = sizeof(logs) / sizeof(logs[0]);

    prepareReport(logs, numLogs);

    return 0;
}




