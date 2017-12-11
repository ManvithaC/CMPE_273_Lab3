package com.entity;
import org.springframework.data.annotation.Id;
public class Customer {

    @Id
    public String id;

    public String username;
    public String password;
    public String firstname;
    public String lastname;

    public Customer() {}

    public Customer(String username, String password, String firstname, String lastname) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    @Override
    public String toString() {
        return String.format(
                "Customer[id=%s, username=%s, password='%s', firstname='%s', lastname='%s']",
                id, username, password, firstname, lastname);
    }

    public String getUsername() {
        return username;
    }
    public String getPassword() {
        return password;
    }

}
