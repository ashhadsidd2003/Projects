package lab11.company; 
import lab11.customers.Customer;
import lab11.emails.*;

//This is a CustomerPerson Class (2f)
//This is a type of person that is also a customer ie it is a child of Person class and implements
// customer interface


public class CustomerPerson extends Person implements Customer {

    public CustomerPerson(String name, String email){
        super(name, email, ""); //(3f), a person that is a customer has its dob set to empty string

    }

    @Override // (4b i) using Emailsystem to send receipts
    public void sendReceipt(String item, int price) {
        String subject = "Receipt for your purchase";
        String body = "Item: " + item + "\nTotal Price: " + price; // (4b iii) personcutomer's recipt has item and total price
        EmailSystem.sendEmail(getEmail(), subject, body);
}

    @Override
    public int getId(){
        return super.getId();
    }
    
}
