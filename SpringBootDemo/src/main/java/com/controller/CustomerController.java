package com.controller;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import com.entity.Customer;
import com.service.ActivityService;
import com.service.CustomerService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;
import java.nio.file.Paths;
import java.nio.file.Files;


@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private ActivityService activityService;

    @PostMapping(path="/all",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Iterable<Customer> getAllUsers() {
        // This returns a JSON with the users
        System.out.println("All the Users "+customerService.getAllUsers());
        return customerService.getAllUsers();
    }

    @PostMapping(path="/login",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody String user, HttpSession session)
    {
        JSONObject jsonObject = new JSONObject(user);
        System.out.println("User name in login "+jsonObject.getString("username"));
        System.out.println("password in login "+jsonObject.getString("password"));

        session.setAttribute("name",jsonObject.getString("username"));

        List<Customer> user1 = customerService.login(jsonObject.getString("username"), jsonObject.getString("password"));
        System.out.println("User details after logging in "+user1);

        if(user1.isEmpty()){
            System.out.println("no user found");
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        else {
            System.out.println("user found");
            return new ResponseEntity(HttpStatus.OK);
        }

    }
    @PostMapping(path="/add",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public  ResponseEntity<?> addNewUser (@RequestBody Customer user) throws IOException {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        System.out.println("Saved it"+user);
        Path path = Paths.get("H:\\SpringBootDemoCode\\SpringBootDemoCode\\SpringBootDemo\\src\\main\\java\\com\\storage\\"+user.getUsername());
        System.out.println("Username to add "+user.getUsername());
        Files.createDirectories(path);
        customerService.addUser(user);
        activityService.SignupActivity(user.getUsername());
        System.out.println("Saved it");
        return new ResponseEntity(null,HttpStatus.CREATED);
    }

    @PostMapping(value = "/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> logout(HttpSession session) {
        System.out.println("User name before logout "+ session.getAttribute("name"));
        session.invalidate();
        System.out.println("User name after logout "+ session.getAttribute("name"));
        return  new ResponseEntity(HttpStatus.OK);
    }
}
