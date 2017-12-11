package com.controller;

import com.entity.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import com.service.ActivityService;
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

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/user")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @PostMapping(path="/getActivity",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> getFiles( HttpSession session) {

        System.out.println("User name in getActivity - session "+ session.getAttribute("name"));
        String userInsession=(String)session.getAttribute("name");
        System.out.println("User name in getActivity "+userInsession);
        List<Activity> activity = activityService.getActivity(userInsession);
        System.out.println("User Activity:  "+ activity);
        return new ResponseEntity(activity, HttpStatus.OK);
    }
}
