package com.service;
import com.entity.Customer;
import com.entity.Fileslist;
import com.repository.CustomerRepository;
import com.repository.FileslistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.data.mongodb.core.query.Update.update;
import static org.springframework.util.ObjectUtils.isEmpty;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class FileslistService {
    @Autowired
    private FileslistRepository fileslistRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    MongoOperations mongoOperations;

    @Autowired
    private static String UPLOADED_FOLDER = "H:\\SpringBootDemoCode\\SpringBootDemoCode\\SpringBootDemo\\src\\main\\java\\com\\storage\\";
    public Iterable<Fileslist> getFiles(String username){
        return fileslistRepository.findByUsername(username);
    }

    public Fileslist createFile(String username, String fileName, String path){
        Date todaysDate = new Date();
        DateFormat df2 = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        String createdDate = df2.format(todaysDate);
        return fileslistRepository.insert(new Fileslist(username, fileName,path , "false",createdDate,createdDate,"File","true","view" ));
    }

    public List deleteFile(String fileName, String username){
        System.out.println("path Name and file to delete"+ fileName  + username );
        Path path = Paths.get(UPLOADED_FOLDER + username+ "\\" +fileName);
        File file = new File(path.toString());
        file.delete();
        return fileslistRepository.deleteByUsernameAndFilename(username,fileName);
    }

    public Fileslist starFile(String fileName, String username){

        Fileslist file = fileslistRepository.findByUsernameAndFilename(username,fileName);
        System.out.println("filepath and createddate"+file.getId()+file.getFilepath()+ file.getFilepath()  + file.getCreateddate()+file.getType()+file.getOwner()+file.getModifieddate() );

        mongoOperations.updateFirst(query(where("_id").is(file.getId())),update("starred", "true"),Fileslist.class);
        return file ;
    }

    public Fileslist unstarFile(String fileName, String username){

        Fileslist file = fileslistRepository.findByUsernameAndFilename(username,fileName);
        System.out.println("filepath and createddate"+file.getId()+file.getFilepath()+ file.getFilepath()  + file.getCreateddate()+file.getType()+file.getOwner()+file.getModifieddate() );

        mongoOperations.updateFirst(query(where("_id").is(file.getId())),update("starred", "false"),Fileslist.class);
        return file ;
    }
    public boolean createFolder(String username,String folderName,String folderPath ){

        Fileslist file = fileslistRepository.findByUsernameAndFilename(username,folderName);
        if(isEmpty(file)){
            Date todaysDate = new Date();
            DateFormat df2 = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
            String createdDate = df2.format(todaysDate);
            fileslistRepository.insert(new Fileslist(username, folderName,folderPath , "false",createdDate,createdDate,"Folder","true","view" ));
            return true;
        }
        else{
            return false;
        }

    }
    public boolean shareFile(String username,String filename,String shareToEmail ){

        Customer user = customerRepository.findByUsername(username);
        Fileslist file = fileslistRepository.findByUsernameAndFilename(username,filename);
        if(isEmpty(user)){

            return false;
        }
        else{
            Date todaysDate = new Date();
            DateFormat df2 = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
            String createdDate = df2.format(todaysDate);
            fileslistRepository.insert(new Fileslist(shareToEmail, filename,file.getFilepath() , "false",file.getCreateddate(),createdDate,"File","false","view"));
            return true;
        }

    }
    public boolean AssignEditAccess(String username,String filename,String shareToEmail ){

        Customer user = customerRepository.findByUsername(username);
        Fileslist file = fileslistRepository.findByUsernameAndFilename(username,filename);
        if(isEmpty(user)){

            return false;
        }
        else{
            mongoOperations.updateFirst(query(where("username").is(file.getUsername())),update("access", "edit"),Fileslist.class);
            return true;
        }

    }
    public boolean AssignViewAccess(String username,String filename,String shareToEmail ){

        Customer user = customerRepository.findByUsername(username);
        Fileslist file = fileslistRepository.findByUsernameAndFilename(username,filename);
        if(isEmpty(user)){

            return false;
        }
        else{
            mongoOperations.updateFirst(query(where("username").is(file.getUsername())),update("access", "view"),Fileslist.class);
            return true;
        }

    }
}
