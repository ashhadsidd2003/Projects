// Sorted linked list with a sentinel node
import java.util.Scanner;

public class SortedLL {
    // Node class
    public class Node {
        int data;
        Node next;
        Node prev;

        Node(int x) {
            data = x;
            next = null;
            prev = null;
        }
    }

    Node head, z;

    SortedLL() {
        z = new Node(Integer.MAX_VALUE); // sentinel node
        head = z;
    }

    // insert while maintaining sorted order
    public void insert(int x) {
        Node prev = null, curr = head, t = new Node(x);

        while (curr != z && curr.data < x) {
            prev = curr;
            curr = curr.next;
        }

        if (prev == null) {
            // inserting at head
            head = t;
            t.prev = null;
            t.next = curr;
            if (curr != null) {
                curr.prev = t; // fix for prev pointer
            }
        } else {
            prev.next = t;
            t.prev = prev;
            t.next = curr;
            curr.prev = t;
        }
    }

    public boolean remove(int x) {
        Node prev, curr;

        if (this.isEmpty()) {
            return false;
        }

        if (head.data == x) {
            head = head.next;
            if (head != null) head.prev = null;
            return true;
        }
        prev = head;
        curr = head.next;

        while (curr != z && curr.data != x) {
            prev = curr;
            curr = curr.next;
        }

        if (curr == z) {
            return false;
        } else {
            prev.next = curr.next;
            curr.next.prev = prev;
            return true;
        }
    }

    public boolean isEmpty() {
        return head == z;
    }

    public void display() {
        Node t = head;
        System.out.print("\nHead -> ");
        while (t != z) {
            System.out.print(t.data + " -> ");
            t = t.next;
        }
        System.out.println("Z\n");
    }

    public static void main(String args[]) {
        SortedLL list = new SortedLL();
        Scanner in = new Scanner(System.in);

        double x;
        int i, r;

        for (i = 1; i <= 5; ++i) {
            x = (Math.random() * 100.0);
            r = (int) x;
            System.out.println("Inserting " + r);
            list.insert(r);
            list.display();
        }

        while (!list.isEmpty()) {
            System.out.println("\nInput a value to remove: ");
            r = in.nextInt();
            if (list.remove(r)) {
                System.out.println("\nSuccessfully removed: " + r);
                list.display();
            } else {
                System.out.println("\nValue not in list");
            }
        }

        in.close();
    }
}
