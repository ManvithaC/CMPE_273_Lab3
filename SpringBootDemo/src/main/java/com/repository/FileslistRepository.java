package com.repository;
import com.entity.Fileslist;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface FileslistRepository extends MongoRepository<Fileslist, String> {

    Iterable<Fileslist> findByUsername(String username);

    List<Fileslist> deleteByUsernameAndFilename(String username, String fileName);

   Fileslist findByUsernameAndFilename(String username, String fileName);
}
