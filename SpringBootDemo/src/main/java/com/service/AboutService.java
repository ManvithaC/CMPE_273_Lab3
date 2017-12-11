package com.service;
import com.entity.About;
import com.repository.AboutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AboutService {

    @Autowired
    private AboutRepository aboutRepository;

    public List getUserAbout(String username){

        return aboutRepository.findByUsername(username);
    }
    public About submitUserDetails(String username,String work,String education,String sec_email,String mobile,String music,String sports,String food,String shows){

        return aboutRepository.insert(new About(username,work,education,sec_email,mobile,music,sports,food,shows));
    }

}
