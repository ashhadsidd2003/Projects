package lab11.company;

//This is the Person class (2b)
// It is a child class of Involvedparty class ie a type of involved party


public class Person extends Involvedparty {
    private String dateOfBirth; // (3c), a person has a date of birth

    public Person(String name, String email, String date){
        super(name, email);
        this.dateOfBirth = date;
    }


    public String getDateOfBirth() {
         return dateOfBirth;
    }
    
}
