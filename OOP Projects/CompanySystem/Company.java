package lab11.company;

import lab11.customers.*;
import lab11.orders.*;
import lab11.suppliers.*;

//This is a Company class (2g)
// It has customers and suppliers as its fields


//(3f) all fields in all classes are private

//(4a) constructors for all classes can be found in their specific files



public class Company {
    private static final int VAT_NUMBER = 123456; // (3g) constant VAT number for company

    private Customers customers;
    private Suppliers suppliers;

    public Company() {
        customers = new Customers();
        suppliers = new Suppliers();
    }

    public void addCustomer(String name, String email) { //(4c) adding cutomer person , information as arguments
        customers.add(new CustomerPerson(name, email));
    }

    public void addCustomer(String name, String email, String contactName) { //(4c) adding customer organisation , information as arguments
        customers.add(new CustomerOrganisation(name, email, contactName, Company.getVatNumber()));
    }

    public void addSupplier(String name, String email, String contactName) { //(4c) adding supplier organisation , information as arguments
        suppliers.add(new SupplierOrganisation(name, email, contactName));
    }

    public void sendReceipts(IncomingOrder[] orders) {
        customers.sendReceipts(orders);
    }

    public void sendOrders(OutgoingOrder[] orders) {
        suppliers.sendOrders(orders);
    }

    public static int getVatNumber() {
        return VAT_NUMBER;
    }


public static void main(String[] args) {
    // 5a. Creating the company object
    Company company = new Company();

    // 5b. Adding customers
    company.addCustomer("Joe Bloggs", "jb@gm.com"); // Person
    company.addCustomer("Jane Cloggs", "jc@hy.ie"); // Person
    company.addCustomer("Cards", "mm@cards.com", "Minnie Moggs"); // Organisation

    // 5c. Adding suppliers
    company.addSupplier("WoodCo", "bb@wood.com", "Bobby Briggs");
    company.addSupplier("Glue", "info@glue.com", "Maxie Maggs");

    // 5d. Sending receipts
    IncomingOrder[] incomingOrders = {
        new IncomingOrder(1, "Card 100 10x15", 7),
        new IncomingOrder(2, "Card 100 10x15", 7),
        new IncomingOrder(3, "Card 1000 10x15", 50)
    };
    company.sendReceipts(incomingOrders);

    // 5e. Sending orders
    OutgoingOrder[] outgoingOrders = {
        new OutgoingOrder(4, "Wood 1x3", 10),
        new OutgoingOrder(5, "Glue 5l", 2)
    };
    company.sendOrders(outgoingOrders);
}

}


