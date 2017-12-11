package com.controller;
import com.entity.Activity;
import com.entity.Fileslist;
import com.entity.Group;
import com.service.ActivityService;
import com.service.FileslistService;
import com.service.GroupService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.data.mongodb.core.query.Update.update;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/files")
public class FileslistController{

    @Autowired
    private FileslistService fileslistService;

    @Autowired
    private ActivityService activityService;

    @Autowired
    MongoOperations mongoOperations;

    @PostMapping(path="/getFiles",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> getFiles( HttpSession session) {

        //JSONObject jsonObject = new JSONObject(user);
        System.out.println("User name in getFiles - session "+ session.getAttribute("name"));
        String userInsession=(String)session.getAttribute("name");
        System.out.println("User name in getFiles Fileslist "+userInsession);
        Iterable<Fileslist> file = fileslistService.getFiles(userInsession);
        System.out.println("List of Files in Fileslist "+ file);
        return new ResponseEntity(file,HttpStatus.OK);
    }

    @PostMapping(path="/deleteFile",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> deleteFile(@RequestBody String filename, HttpSession session) {
        JSONObject jsonObject = new JSONObject(filename);
        System.out.println("User name in deleteFile - session "+ session.getAttribute("name"));
        String userInsession=(String)session.getAttribute("name");
        String filename1 =(String)jsonObject.getString("fileName");
        fileslistService.deleteFile(filename1,userInsession);
        List<Activity> userActivity = activityService.getActivity(userInsession);
        Activity userAct = userActivity.get(0);
        System.out.println("User Activity Before Upload" + userAct.getDeletedFiles());
        mongoOperations.updateFirst(query(where("username").is(userInsession)),update("deletedFiles", userAct.getDeletedFiles()+1),Activity.class);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path="/starFile",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> starFile(@RequestBody String filename, HttpSession session) {
        JSONObject jsonObject = new JSONObject(filename);
        System.out.println("User name in starFile - session "+ session.getAttribute("name"));
        String userInsession=(String)session.getAttribute("name");
        String filename1 =(String)jsonObject.getString("fileName");
        fileslistService.starFile(filename1,userInsession);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path="/unstarFile",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> unstarFile(@RequestBody String filename, HttpSession session) {
        JSONObject jsonObject = new JSONObject(filename);
        System.out.println("User name in unstarFile - session "+ session.getAttribute("name"));
        String userInsession=(String)session.getAttribute("name");
        String filename1 =(String)jsonObject.getString("fileName");
        fileslistService.unstarFile(filename1,userInsession);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path="/createFolder",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> createFolder(@RequestBody String folder, HttpSession session) throws IOException {
        JSONObject folder1 = new JSONObject(folder);
        System.out.println("User name in createFolder - session "+ session.getAttribute("name"));
        String userInsession=(String)session.getAttribute("name");
        String folderName =(String)folder1.getString("folderName");
        String folderPath =(String)folder1.getString("folderPath");
        System.out.println("Folder Details" + folderName + folderPath );
        Path path = Paths.get("H:\\SpringBootDemoCode\\SpringBootDemoCode\\SpringBootDemo\\src\\main\\java\\com\\storage\\"+userInsession+"\\"+folderName);
        Files.createDirectories(path);
        boolean created = fileslistService.createFolder(userInsession,folderName,folderPath);
        if(created){
            return new ResponseEntity(HttpStatus.OK);
        }
        else{
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

    }
    @PostMapping(path="/shareFolder",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> shareFolder(@RequestBody String folderShare, HttpSession session) throws IOException {
        JSONObject folderShare1 = new JSONObject(folderShare);
        System.out.println("User name in shareFile - session "+ session.getAttribute("name"));
        String userInsession=(String)session.getAttribute("name");
        String shareToEmail =(String)folderShare1.getString("shareToEmail");
        String foldername =(String)folderShare1.getString("foldername");
        System.out.println("File To Share" + shareToEmail + foldername );

        boolean shared = fileslistService.shareFile(userInsession,foldername,shareToEmail);
        if(shared){
            return new ResponseEntity(HttpStatus.OK);
        }
        else{
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

    }
    @PostMapping(path="/shareFile",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> shareFile(@RequestBody String fileShare, HttpSession session) throws IOException {
        JSONObject fileShare1 = new JSONObject(fileShare);
        System.out.println("User name in shareFile - session "+ session.getAttribute("name"));
        String userInsession=(String)session.getAttribute("name");
        String shareToEmail =(String)fileShare1.getString("shareToEmail");
        String filename =(String)fileShare1.getString("filename");
        System.out.println("File To Share" + shareToEmail + filename );

        boolean shared = fileslistService.shareFile(userInsession,filename,shareToEmail);
        if(shared){
            return new ResponseEntity(HttpStatus.OK);
        }
        else{
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

    }



}