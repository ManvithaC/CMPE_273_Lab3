package com.controller;
import com.entity.Activity;
import com.entity.Fileslist;
import com.service.ActivityService;
import com.service.FileslistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;
import java.io.File;
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
@RequestMapping(path="/upload")
public class uploadFileController {

    //Save the uploaded file to this folder
    @Autowired
    private static String UPLOADED_FOLDER = "H:\\SpringBootDemoCode\\SpringBootDemoCode\\SpringBootDemo\\src\\main\\java\\com\\storage\\";
    @Autowired
    private FileslistService fileslistService;

    @Autowired
    private ActivityService activityService;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    MongoOperations mongoOperations;
    @PostMapping(path="/all")
    public @ResponseBody  ResponseEntity<?> singleFileUpload(@RequestParam(name="file", required=false) MultipartFile file, HttpSession session) throws IOException  {
        System.out.println("In upload ");
        if (file.isEmpty()) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        else {
            String userInsession = (String) session.getAttribute("name");
            System.out.println("User Session " + userInsession);
            System.out.println("File name in body ----" + file);

            System.out.println("File name " + file.getOriginalFilename());
            byte[] bytes = file.getBytes();

            Path path = Paths.get(UPLOADED_FOLDER + userInsession + "\\" + file.getOriginalFilename());
            System.out.println("path to upload the file " + path);
            Files.write(path, bytes);
            //save the details and path name in mongo
            fileslistService.createFile(userInsession,file.getOriginalFilename(),path.toString());
            List<Activity> userActivity = activityService.getActivity(userInsession);
            Activity userAct = userActivity.get(0);
            System.out.println("User Activity Before Upload" + userAct.getUploadedFiles());
            mongoOperations.updateFirst(query(where("username").is(userInsession)),update("uploadedFiles", userAct.getUploadedFiles()+1),Activity.class);
            return new ResponseEntity(HttpStatus.CREATED);
        }
    }
}
