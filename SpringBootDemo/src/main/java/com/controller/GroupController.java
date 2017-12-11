package com.controller;
import com.entity.Group;
import com.service.GroupService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping(path="/group")
@CrossOrigin(origins = "http://localhost:3000")
public class GroupController{

    @Autowired
    private GroupService groupService;

    @GetMapping(path="/getGroups")
    public ResponseEntity<?> getGroups(HttpSession session) {

        //JSONObject jsonObject = new JSONObject(user);
        System.out.println("User name in getGroups - session "+ session.getAttribute("name"));
        String userInsession=(String)session.getAttribute("name");
        System.out.println("User name in getGroups "+userInsession);
        Iterable<Group> file = groupService.getGroups(userInsession);
        System.out.println("List of groups user is in "+ file);

        return new ResponseEntity(file,HttpStatus.OK);
    }

    @PostMapping(path="/getMembers",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> getFiles(@RequestBody String Group, HttpSession session) {

        JSONObject jsonObject = new JSONObject(Group);
        System.out.println("Group name to list members "+jsonObject.getString("groupName"));
        String groupName =(String)jsonObject.getString("groupName");
        System.out.println("User name in getMembers - session "+ session.getAttribute("name"));
        String userInsession=(String)session.getAttribute("name");
        Iterable<Group> group = groupService.getMembers(groupName);
        System.out.println("Members in the group "+ group);

        return new ResponseEntity(group,HttpStatus.OK);
    }

    @PostMapping(path="/addMember",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> addMember(@RequestBody String Group, HttpSession session) {

        JSONObject addMember = new JSONObject(Group);
        System.out.println("member details to add "+addMember.getString("groupName"));
        System.out.println("group details to add member "+addMember.getString("memberName"));
        System.out.println("User name in addMember - session "+ session.getAttribute("name"));
        String userInsession=(String)session.getAttribute("name");
        String memberName =(String)addMember.getString("memberName");
        String groupName =(String)addMember.getString("groupName");
        groupService.addMember(memberName, groupName,userInsession);

        return new ResponseEntity(HttpStatus.CREATED);
    }
    @PostMapping(path="/deleteMember",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> deleteMember(@RequestBody String Group, HttpSession session) {

        JSONObject deleteMember = new JSONObject(Group);
        System.out.println("member details to add "+deleteMember.getString("groupName"));
        System.out.println("group details to add member "+deleteMember.getString("memberName"));
        System.out.println("User name in addMember - session "+ session.getAttribute("name"));
        String userInsession=(String)session.getAttribute("name");
        String memberName =(String)deleteMember.getString("memberName");
        String groupName =(String)deleteMember.getString("groupName");
        groupService.deleteMember(memberName, groupName,userInsession);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PostMapping(path="/delGroup",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> delGroup(@RequestBody String Group, HttpSession session) {

        JSONObject jsonObject = new JSONObject(Group);
        System.out.println("Group name to delete "+jsonObject.getString("groupName"));

        System.out.println("User name in delGroup - session "+ session.getAttribute("name"));
        String userInsession=(String)session.getAttribute("name");
        String groupToDelete =(String)jsonObject.getString("groupName");
        System.out.println("Group to delete and username"+ groupToDelete + userInsession );
        groupService.delGroup(groupToDelete, userInsession);

        return new ResponseEntity(HttpStatus.OK);
    }
    @PostMapping(path="/createGroup",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> createGroup(@RequestBody String Group, HttpSession session) {

        JSONObject jsonObject = new JSONObject(Group);
        System.out.println("Group name to create "+jsonObject.getString("groupName"));

        System.out.println("User name creating the group - session "+ session.getAttribute("name"));
        String userInsession=(String)session.getAttribute("name");
        String groupToCreate =(String)jsonObject.getString("groupName");
        System.out.println("Group to delete and username"+ groupToCreate + userInsession );
        groupService.createGroup(groupToCreate, userInsession);
        return new ResponseEntity(HttpStatus.CREATED);
    }
}
