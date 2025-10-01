/*Program to create a word guessing game with 7 attempts to guess the characters in the game
Muhammad Ashhad Sidiqui
9/04/2024
*/

#include<stdio.h>
#include<string.h>

// define max attempts and size of sting
#define ATTEMPTS 7
#define SIZE 7

int main(){
    char word[SIZE]="coding";
    char guess;
    char *ptr;
    char *first;
    int remaining = 0;
    int yes;
    int i;
    int attempts = 0;
    int found[SIZE - 1] = {0};
    int sum;
    int won = 0;
    
    //getting the memory address of the start of string stored permanently
    first = word;

    // while loop to keep the code running until user wins or runs out of attempts
    while(attempts < ATTEMPTS && won == 0){

        //asking the user to enter character
        printf("\nguess character\n"); 
        scanf("%c", &guess);

        // clearing the input buffer
        while(getchar() != '\n');
        
        // setting ptr to memory address of start of string
        ptr = word;

        // loop to keep running through the string until null character reached (string finished)
        while(*ptr != '\0'){

            // variable yes to check if the character entered by user is found in the string or not
            yes = 0;

            //if block to check if guess is present in string
            if(*ptr == guess){

                // printing you guessed correctly upon finding the character
                printf("\nyou guessed correctly\n");

                // setting the variable remaining to ptr - first(first is the memory address of first character and ptr has the memory address of the correct character found)
                remaining = ptr - first;
                // in remaining variable we got the order of the correctly guessed character

                //we set the element of found[] corresponding to the order as 1
                found[remaining] = 1;

                // for loop to iterate through found[] array
                for(i = 0; i < SIZE - 1; i++){

                    // if block to check if element is 0 then _ is printed
                    if(found[i] == 0){
                        printf("_ ");

                    }
                    // else the corresponding character is printed
                    else{
                        printf("%c", *(first + i));
                    }
                }// for loop end

                // if found, we set yes to 1
                yes = 1;

                // we break out of loop upon finding character
                break;
            }
            
            // incrementing ptr
            ptr++;
        
        }// end inner while

        // if block to check if we found the character or not
        if(yes == 0){
            attempts++;
            printf("\ntry again, attempts remaining are %d\n",ATTEMPTS - attempts);
            
        }

        // setting sum to zero
        sum = 0;

        //for loop to loop through the array found[] and calculate sum
        for(i = 0; i < SIZE - 1; i++){
            sum += found[i];
        }

        // if sum is 6 it means all characters are guessed
        if(sum == 6){
            won = 1;
        }       
        
    }// end outer loop

    // if block to check weather the loop ended because of attempts or otherwise
    if(won == 1){
        printf("\nYou win\n");
    }
    else{
        printf("game over, the correct word is %s", word);
    }

    

    return 0;

} // end main