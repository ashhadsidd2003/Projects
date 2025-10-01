#include<stdio.h>
#define SIZE 10

void merge(float arr[], int low, int mid, int high) {
    int left = low;
    int right = mid + 1;
    int temp = low;
    float tempA[SIZE];

    // Merge the two halves into tempA[]
    while (left <= mid && right <= high) {
        if (arr[left] <= arr[right]) {
            tempA[temp++] = arr[left++];
        } else {
            tempA[temp++] = arr[right++];
        }
    }

    // Copy the remaining elements of the left half, if any
    while (left <= mid) {
        tempA[temp++] = arr[left++];
    }

    // Copy the remaining elements of the right half, if any
    while (right <= high) {
        tempA[temp++] = arr[right++];
    }

    // Copy the sorted subarray back into the original array
    for (int i = low; i <= high; i++) {
        arr[i] = tempA[i];
    }
}

void mergeSort(float arr[], int low, int high) {
    if (low < high) {
        int mid = (low + high) / 2;

        // Sort first and second halves
        mergeSort(arr, low, mid);
        mergeSort(arr, mid + 1, high);

        // Merge the sorted halves
        merge(arr, low, mid, high);
    }
}

int main() {
    float arr1[SIZE] = {4.4, 5.7, 9.9, 2.0, 1.9, 0.01, 7.0, 7.7, 9.0, 9.2};
    float diff = 0;
    float least = arr1[1] - arr1[0];
    float num1 = arr1[0];
    float num2 = arr1[1];

    mergeSort(arr1, 0, SIZE - 1);

    printf("Sorted array is: \n");
    for (int i = 0; i < SIZE; i++)
        printf("%.2f ", arr1[i]);
    printf("\n");

    // Find the pair with the smallest difference
    for(int i = 1; i < SIZE; i++){
        diff = arr1[i] - arr1[i - 1];  // Calculate the difference correctly

        if(diff < least){
            least = diff;
            num1 = arr1[i - 1];
            num2 = arr1[i];
        }
    }

    printf("Closest numbers are %.2f and %.2f\n", num1, num2);

    return 0;
}
