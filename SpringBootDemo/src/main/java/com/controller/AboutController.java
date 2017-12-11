package com.controller;

import com.entity.About;
import com.service.AboutService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/about")
public class AboutController {

    @Autowired
    private AboutService aboutService;

    @PostMapping(path = "/getDetails", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getDetails(HttpSession session) {
        String userInsession = (String) session.getAttribute("name");
        List<About> userDetails = aboutService.getUserAbout(userInsession);
        System.out.println("User details " + userDetails);

        if (userDetails.isEmpty()) {
            System.out.println("User has not updated the details yet");
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            System.out.println("user details found");
            return new ResponseEntity(userDetails, HttpStatus.OK);
        }
    }
    @PostMapping(path="/submitDetails",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> submitDetails(@RequestBody String about, HttpSession session)
    {
        String userInsession=(String)session.getAttribute("name");
        JSONObject jsonObject = new JSONObject(about);
        String shows =(String)jsonObject.getString("about_shows");
        String work =(String)jsonObject.getString("about_work");
        String education =(String)jsonObject.getString("about_education");
        String sec_email =(String)jsonObject.getString("about_secEmail");
        String mobile =(String)jsonObject.getString("about_mobile");
        String music =(String)jsonObject.getString("about_music");
        String sports =(String)jsonObject.getString("about_sports");
        String food =(String)jsonObject.getString("about_food");


        aboutService.submitUserDetails(userInsession,work,education,sec_email,mobile,music,sports,food,shows);

        return new ResponseEntity(HttpStatus.CREATED);
    }
}
