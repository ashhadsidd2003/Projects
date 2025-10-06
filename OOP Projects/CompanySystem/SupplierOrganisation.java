package lab11.company;

// this is the SupplierOrganisation class (2d)
// this is a type of organisation that is also a supplier ie a child of organisation class that implements
// supplier interface.

import lab11.emails.EmailSystem;
import lab11.suppliers.Supplier;

public class SupplierOrganisation extends Organisation implements Supplier{

    public SupplierOrganisation(String name, String email, String contactname){
        super(name, email, contactname);
        
    }

    @Override
    public int getId(){
        return super.getId();
    }


    @Override // (4b i) using Emailsystem to send orders
    public void sendOrder(String item, int quantity) {
        String subject = "Placing Order";
        String body = "Contact: " + getContactName() + "\n" //(4b iv) supllierorganisation's order has contactname
                    + "Item: " + item + "\n" // item name
                    + "Quantity: " + quantity; // quantity

        EmailSystem.sendEmail(getEmail(), subject, body);
    }
    
}
