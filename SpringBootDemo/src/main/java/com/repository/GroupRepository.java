package com.repository;
import com.entity.Group;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GroupRepository extends MongoRepository<Group, String>  {
    Iterable<Group> findByUsername(String username);

    Iterable<Group> findByGroupName(String GroupName);

    List<Group> deleteByGroupNameAndUsername(String GroupName, String username);
}
