package com.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "about")
public class About {
    @Id
    public String id;

    public String username;
    public String work;
    public String education;
    public String sec_email;
    public String mobile;
    public String music;
    public String sports;
    public String food;
    public String shows;

    public About(String username, String work, String education, String sec_email,String mobile,String music,String sports,String food,String shows ) {
        this.username = username;
        this.work = work;
        this.education = education;
        this.sec_email = sec_email;
        this.mobile = mobile;
        this.music = music;
        this.sports = sports;
        this.food = food;
        this.shows = shows;
    }

}
