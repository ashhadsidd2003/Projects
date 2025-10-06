package lab11.company;

//This is a CustomerOrganisation class (2e)
// It is a type of Organisation that is also a customer ie a child of Organisation class that implements
// customer interface

import lab11.customers.Customer;
import lab11.emails.*;

public class CustomerOrganisation extends Organisation implements Customer {
    private int VAT;//(3e) an organisation that is a customer has a VAT number

    public CustomerOrganisation(String name, String email, String contactname, int vat){
        super(name, email, contactname);
        this.VAT = vat;
    
    }

    @Override // (4b i) using Emailsystem to send receipts
    public void sendReceipt(String item, int price) {
        double priceExVat = price * 0.8;
        double vatAmount = price * 0.2;

        String subject = "VAT Receipt for your purchase";
        String body = "Item: " + item + "\n" +  //( 4 b ii), organisationcustomer's receipt include item
                    "Price (Excl. VAT): " + priceExVat + "\n" +  // price excluding VAT
                    "VAT: " + vatAmount + "\n" +  //VAT
                    "Total: " + price + "\n" + // total price
                    "VAT Number: " + VAT; // VAT number

        EmailSystem.sendEmail(getEmail(), subject, body);
    }


    @Override
    public int getId(){
        return super.getId();
    }

}
