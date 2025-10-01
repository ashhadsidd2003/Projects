#include<stdio.h>

typedef struct {
    int line_code;
    int year;
    int month;
    int date;
    int product_id;
    int issue_code;
} QA_Logs;

void binarysearch(QA_Logs arr[], int target, int size){
    int low = 0;
    int high = size - 1;
    int earliestIndex = -1;

    while(low <= high){
        int middle = low + (high - low) / 2;
        
        if (arr[middle].issue_code < target){
            low = middle + 1;
        }
        else if(arr[middle].issue_code > target){
            high = middle - 1;
        }
        else{
            if(arr[middle].issue_code == arr[middle - 1].issue_code){
                int i = 1;
                while (arr[middle].issue_code == arr[middle - i].issue_code)
                {
                    i--;
                }
                printf("earliest occurance is on %d/%d/%d \n", arr[middle - i + 1].date, arr[middle - i + 1].month, arr[middle - i + 1].year);
            }else{
                printf("Earliest occurrence is on %d/%d/%d \n", arr[middle].date, arr[middle].month, arr[middle].year);
            }
            break;
   
        }

    }
    
}


void merge(QA_Logs arr[], QA_Logs left[], QA_Logs right[], int leftSize, int rightSize){
    int i = 0;
    int j = 0;
    int k = 0;

    while (i < leftSize && j < rightSize){
        if(left[i].issue_code < right[j].issue_code || 
           (left[i].issue_code == right[j].issue_code && left[i].year < right[j].year) ||
           (left[i].issue_code == right[j].issue_code && left[i].year == right[j].year && left[i].month < right[j].month) ||
           (left[i].issue_code == right[j].issue_code && left[i].year == right[j].year && left[i].month == right[j].month && left[i].date < right[j].date)){
            arr[k] = left[i];
            k++;
            i++;
        }
        else{
            arr[k] = right[j];
            k++;
            j++;
        }
    }

    while (i < leftSize) {
        arr[k] = left[i];
        k++;
        i++;
    }

    while (j < rightSize) {
        arr[k] = right[j];
        k++;
        j++;
    }
}


void mergeSort(QA_Logs arr[], int size){
    if (size <= 1) {
        return; // base case
    }

    int leftSize = size / 2;
    int rightSize = size - leftSize;

    QA_Logs left[leftSize], right[rightSize];

    for (int i = 0; i < leftSize; i++) {
        left[i] = arr[i];
    }
    for (int i = leftSize; i < size; i++) {
        right[i - leftSize] = arr[i];
    }

    mergeSort(left, leftSize);
    mergeSort(right, rightSize);

    merge(arr, left, right, leftSize, rightSize);
}

int main(){

    QA_Logs logs[]={
        {1, 2020, 12, 24, 1001, 204},
        {1, 2020, 03, 25, 1003, 201},
        {1, 2018, 12, 07, 1009, 202},
        {1, 2020, 12, 11, 1005, 204},
        {1, 2011, 11, 27, 1001, 209},
    };

    int numLogs = sizeof(logs) / sizeof(logs[0]);

    int target;

    printf("Enter issue code to search\n");
    scanf("%d", &target);

    mergeSort(logs, numLogs);

   binarysearch(logs, target, numLogs);

    return 0;
}
