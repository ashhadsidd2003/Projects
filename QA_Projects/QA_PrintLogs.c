#include <stdio.h>
#include <stdlib.h>

// Structure to represent a QA log entry
typedef struct {
    int line_code;
    int batch_code;
    long long int batch_datetime; // Changed data type to long long int
    int product_id;
    int issue_code;
} QA_Log;

// function signatures
void merge(QA_Log arr[], QA_Log left[], QA_Log right[], int leftSize, int rightSize);
void mergeSort(QA_Log arr[], int size);
void printLogs(QA_Log arr[], int n, int line_code);

// function to merge two sorted arrays
void merge(QA_Log arr[], QA_Log left[], QA_Log right[], int leftSize, int rightSize) {
    int i = 0;
    int j = 0;
    int k = 0;

    // loop to merge elements from left and right arrays into arr after sorting based on id/issuecode etc
    while (i < leftSize && j < rightSize) {
        if (left[i].product_id < right[j].product_id ||
            (left[i].product_id == right[j].product_id && left[i].issue_code < right[j].issue_code) ||
            (left[i].product_id == right[j].product_id && left[i].issue_code == right[j].issue_code 
            && left[i].batch_datetime < right[j].batch_datetime)) {
            arr[k] = left[i];
            k++;
            i++;
        } else {
            arr[k] = right[j];
            k++;
            j++;
        }
    }

    // copying remaining elements if any
    while (i < leftSize) {
        arr[k] = left[i];
        k++;
        i++;
    }

    // copying remaining elements if any
    while (j < rightSize) {
        arr[k] = right[j];
        k++;
        j++;
    }
}

// Merge Sort function
void mergeSort(QA_Log arr[], int size) {
    if (size <= 1) {
        return; // base case
    }

    // Calculate the size of left and right arrays
    int leftSize = size / 2;
    int rightSize = size - leftSize;

    // create temporary arrays for left and right halves.. i find this way to be easy
    QA_Log left[leftSize], right[rightSize];

    // copy elements to left and right arrays
    for (int i = 0; i < leftSize; i++) {
        left[i] = arr[i];
    }
    for (int i = leftSize; i < size; i++) {
        right[i - leftSize] = arr[i];
    }

    // recursive calls
    mergeSort(left, leftSize);
    mergeSort(right, rightSize);

    // calling merge function
    merge(arr, left, right, leftSize, rightSize);
}

// Function to print QA logs for a specific line
void printLogs(QA_Log arr[], int n, int line_code) {
    printf("Line Code | Product ID | Issue Code | Date | Time\n");
    for (int i = 0; i < n; i++) {
        if (arr[i].line_code == line_code) {
            long long int datetime = arr[i].batch_datetime;
            int year = datetime / 100000000LL;
            int month = (datetime / 1000000) % 100; // Extracting month directly
            int day = (datetime / 10000) % 100;
            int hour = (datetime / 100) % 100;
            int minute = (datetime) % 100;

            
            

            

            printf("%9d | %10d | %10d | %02d/%02d/%04d | %02d:%02d\n", arr[i].line_code, arr[i].product_id,
             arr[i].issue_code, day, month, year, hour, minute);
        }
    }
}

int main() {
    // Sample QA logs
    QA_Log logs[] = {
        {1, 101, 202203041200LL, 1002, 202}, // Using LL suffix for long long int
        {2, 102, 202203011300LL, 1001, 203},
        {2, 103, 202203021100LL, 1002, 201}, // Sample log for line code 2
        {1, 104, 202203031400LL, 1001, 201},
        {1, 105, 202203031500LL, 1002, 202},
        // Add more logs as needed
    };
    int numLogs = sizeof(logs) / sizeof(logs[0]);

    // Sort the QA logs using Merge Sort
    mergeSort(logs, numLogs);

    // Print the sorted logs for each line
    for (int line = 1; line <= 2; line++) { 
        printf("\nQA Logs for Line %d:\n", line);
        printLogs(logs, numLogs, line);
    }

    return 0;
}
