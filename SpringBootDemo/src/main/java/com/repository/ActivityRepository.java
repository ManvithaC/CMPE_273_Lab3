package com.repository;
import com.entity.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ActivityRepository extends MongoRepository<Activity, String> {

    List<Activity> findByUsername(String username);


}
