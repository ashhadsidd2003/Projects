/*Program to genrate a random number and give 5 attempts to the user for guessing it
Muhammad Ashhad Siddiqui
28 Nov 2023
*/

#include <stdio.h>
#include <stdlib.h> // this header file is required for the rand() function
#include <time.h> // used in srand() for seeding purposes

#define MAX_ATTEMPTS 5

int main()
{
    int num = 0;
    int guessHistory[MAX_ATTEMPTS];
    int attempts = 0;
    // place any extra variables here
    int userinput;
    int correct = 0;
    int i;
    

    printf("Generating a random number between 1 – 25 \n");
    
    // seed the random number generator with a range 0 – large number
    srand(time(NULL));
    
    // num is assigned a random number between 1 – 10 
    num = (rand() % 25) + 1;
    
    // Enter your code here and onward (declare any extra variables above)
    // …
    // …
    printf("%d\n",num);// prints the random number for us to check if the program runs correctly
    
    // while loop to keep the code running until attempts are finished or user guesses correctly
    while(attempts < 5 && correct == 0){

        printf("guess the number\n");
        // scanf to take userinput
        scanf("%d", &userinput);

        // storing the attempts in the array
        guessHistory[attempts] = userinput;

       // if block checks for valid entries
       if(userinput > 25 || userinput < 1){
        printf("invalid entry\n");
       }// end if

        // else block contains code for a valid entry
       else{
         // if block checks if guess is too high
         if (userinput > num){
            printf("too high\n");
            attempts++;
            
        }// end if

        // else if block checks if guess is too low
        else if(userinput < num){
            printf("too low\n");
            attempts++;
        }// end else if

        // else condition displays code for a correct guess
        else{
            correct = 1;
            attempts++;
        }//end else

       }//end else
    }
      
    // if else block checks if the loop has stopped due to correct entry or maximum attempts    
    if(correct == 0){
        printf("you failed\n");
        printf("Your guess history is\n");

        //for loop to display guess history
        for(i = 0; i < MAX_ATTEMPTS; i++){
            printf("%d\n", guessHistory[i]);
        }// end for loop

    }// end if

    else{
        printf("you guessed it right\n");
        printf("Your guess history is\n");

        // for loop to display guess history
        for(i = 0; i < attempts; i++){
            printf("%d  ", guessHistory[i]);
        }//end for
            
    }//end else

    return 0;
    
} // end main


