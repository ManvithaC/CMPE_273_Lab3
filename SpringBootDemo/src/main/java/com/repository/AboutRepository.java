package com.repository;
import com.entity.About;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface AboutRepository extends MongoRepository<About, String>  {

    List<About> findByUsername(String username);
}
