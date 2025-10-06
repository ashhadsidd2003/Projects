package lab11.company;

// This is the involved party class (2a)
// it is the parent class

public class Involvedparty {
    private String name; //(3b), involvedparty has an email and name
    private String emailAddress;
    private int id;  // (3a) , it has an id 
    static int nextId = 1;

    
    public Involvedparty(String name, String email) {
        this.name = name;
        this.emailAddress = email;
        this.id = nextId++; //(3a), id is allocated automatically, each time an involvedparty object is created, the nextId counter is incremented by one and allocated to it.
    }

    
    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    public String getEmail(){
        return this.emailAddress;
    }


}
