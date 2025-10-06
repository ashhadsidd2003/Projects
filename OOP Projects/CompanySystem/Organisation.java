package lab11.company;

//This is the organisation class (2c)
// It is a type of involvedparty ie a child of involveparty class

public class Organisation extends Involvedparty {
    private String contactName;// (3d), an organisation has a contactname.

    public Organisation(String name, String email, String contactname){
        super(name, email);
        this.contactName = contactname;
    }

    public String getContactName() {
        return contactName;
    }
    
}
