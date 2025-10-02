// Exercise to separate ADT Queue from its implementation
// and to provide 2 implementations. Also exception handling.

class QueueException extends Exception {
    public QueueException(String s){
        super(s);
    }
}    

// In Java an interface can often be the best way to 
// describe an Abstract Data Type (ADT) such as Queue or Stack
interface Queue {
    public void enQueue(int x) throws QueueException;
    public int deQueue() throws QueueException;
    public boolean isEmpty();   
}


class QueueLL implements Queue {
    private class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    Node head, tail;

    public QueueLL(){
        head = tail = null;
    }

    public void enQueue(int x){
        Node node = new Node(x);

        if(this.isEmpty()){
            head = node;
        }
        else{
            tail.next = node;
        }
        tail = node;
    }
    
    // assume the queue is non-empty when this method is called, otherwise throw exception
    public int deQueue() throws QueueException {
        if (isEmpty()){
            throw new QueueException("Queue is empty");
        }

        int removedValue = head.data;
        head = head.next;
        if (head == null) {
            tail = null;
        }
        return removedValue;
    }

    public boolean isEmpty(){
        return head == null;
    }

} // end of QueueLL class



class QueueCB implements Queue {
    private int q[], back, front;
    private int qmax, size;

    public QueueCB() {
        qmax = 4;
        size = front = back = 0;
        q = new int[qmax];
    }

    public void enQueue(int x) throws QueueException {
        if (size == qmax) {
            throw new QueueException("Queue is full");
        }
        q[back] = x;
        back = (back + 1) % qmax;
        size++;
    }
  
    public int deQueue() throws QueueException {
        if (this.isEmpty()) {
            throw new QueueException("Queue is empty");
        }

        int removedValue = q[front];
        front = (front + 1) % qmax;
        size--;
        return removedValue;
    }

    public boolean isEmpty() {
        return size == 0;
    }
}


public class QueueMain {
    public static void main(String[] arg) {
        Queue q1, q2;
        q1 = new QueueLL();
        q2 = new QueueCB();
        
        System.out.println("Enqueuing elements into QueueLL (Linked List Implementation):");
        for (int i = 1; i < 6; ++i) {
            try { 
                q1.enQueue(i);  
                System.out.println("Enqueued: " + i);
            } catch (QueueException e) {
                System.out.println("Exception thrown: " + e); 
            }
        }
        
        System.out.println("\nDequeuing elements from QueueLL:");
        for (int i = 1; i < 8; ++i){
            try {
                System.out.println("Dequeued: " + q1.deQueue());
            } catch (QueueException e) {
                System.out.println("Exception thrown: " + e);
            }
        }

        // Testing Circular Buffer Queue
        System.out.println("\nEnqueuing elements into QueueCB (Circular Buffer Implementation):");
        for (int i = 1; i < 6; ++i) {
            try { 
                q2.enQueue(i);  
                System.out.println("Enqueued: " + i);
            } catch (QueueException e) {
                System.out.println("Exception thrown: " + e); 
            }
        }
        
        System.out.println("\nDequeuing elements from QueueCB:");
        for (int i = 1; i < 6; ++i){
            try {
                System.out.println("Dequeued: " + q2.deQueue());
            } catch (QueueException e) {
                System.out.println("Exception thrown: " + e);
            }
        }
    }   
}
