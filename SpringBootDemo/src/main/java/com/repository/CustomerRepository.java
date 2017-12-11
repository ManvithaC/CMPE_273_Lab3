package com.repository;
import com.entity.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CustomerRepository extends MongoRepository<Customer, String> {

//    public Customer findByFirstName(String firstName);
//    public List<Customer> findByLastName(String lastName);
    public List<Customer> findByUsernameAndPassword(String username,String password);

    public Customer findByUsername(String username);



}
