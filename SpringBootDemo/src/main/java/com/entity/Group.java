package com.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Groups")
public class Group {

    @Id
    public String id;

    public String username;
    public String groupName;
    public String owner;
    public String addedBy;
    public String addedDate;
    public String access;

    public Group(String username, String groupName, String owner, String addedBy, String addedDate,String access ) {
        this.username = username;
        this.groupName = groupName;
        this.owner = owner;
        this.addedBy = addedBy;
        this.addedDate = addedDate;
        this.access = access;

    }
}
