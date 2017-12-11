package com.service;
import com.entity.Customer;
import com.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository CustomerRepository;

    public Iterable<Customer> getAllUsers(){
        return CustomerRepository.findAll();
    }

    public List<Customer> login(String username,String password){
        System.out.println("User name in login "+username);
        System.out.println("password in login "+password);
        return CustomerRepository.findByUsernameAndPassword(username,password);
    }

    public void addUser(Customer user){
        CustomerRepository.save(user);
    }

    public Customer findUsername(String username){
        CustomerRepository.findByUsername(username);
        return null;
    }
}
